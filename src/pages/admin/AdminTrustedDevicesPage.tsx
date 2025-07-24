import { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import { toast } from 'react-toastify';
import { exportTrustedDevicesCSV, getAllTrustedDevices, revokeTrustedDevice } from '../../service/Service';

const AdminTrustedDevicesPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [devices, setDevices] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        loadDevices();
    }, [page, filter]);

    const loadDevices = async () => {
        try {
            const res = await getAllTrustedDevices(page, filter);
            console.log(res);
            setDevices(res.content);        
            setTotalPages(res.totalPages);
        } catch (err) {
            console.error("Failed to fetch devices", err);
            toast.error("Error loading devices.");
        }
    };

    const revokeDevice = async (id: number) => {
        try {
            await revokeTrustedDevice(id);
            toast.success("Device revoked successfully.");
            loadDevices();
        } catch (err) {
            console.error("Failed to revoke device", err);
            toast.error("Failed to revoke device.");
        }
    };

    const exportCSV = () => {
        exportTrustedDevicesCSV();
    };

    return (
        <div className="h-screen flex flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
            <Header sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
                <main className="flex-1 p-6 mt-16 md:mt-0 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">All Trusted Devices</h2>
                        <button
                            onClick={exportCSV}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Export CSV
                        </button>
                    </div>

                    <div className="mb-4 flex items-center gap-2">
                        <input
                            type="text"
                            value={filter}
                            onChange={(e) => {
                                setPage(0); // Reset to first page
                                setFilter(e.target.value);
                            }}
                            placeholder="Search by email or IP"
                            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                        />
                        <button
                            onClick={loadDevices}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Search
                        </button>
                    </div>

                    <div className="overflow-auto rounded shadow bg-white dark:bg-gray-800">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-200 dark:bg-gray-700">
                                    <th className="p-2">User</th>
                                    <th>Email</th>
                                    <th>Device Info</th>
                                    <th>IP Address</th>
                                    <th>Location</th>
                                    <th>Trusted At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {devices.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center p-4">No devices found.</td>
                                    </tr>
                                ) : (
                                    devices.map((d, i) => (
                                        <tr key={i} className="border-b border-gray-100 dark:border-gray-700">
                                            <td className="p-2">{d.user?.firstName} {d.user?.otherName}</td>
                                            <td>{d.user?.email}</td>
                                            <td className="truncate max-w-xs">{d.userAgent}</td>
                                            <td>{d.ip}</td>
                                            <td>{d.location}</td>
                                            <td>{new Date(d.trustedAt).toLocaleString()}</td>
                                            <td>
                                                <button
                                                    onClick={() => revokeDevice(d.id)}
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Revoke
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between mt-4">
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                            onClick={() => setPage((p) => Math.max(p - 1, 0))}
                            disabled={page === 0}
                        >
                            Previous
                        </button>
                        <span className="text-sm mt-2">Page {page + 1} of {totalPages}</span>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                            disabled={page >= totalPages - 1}
                        >
                            Next
                        </button>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default AdminTrustedDevicesPage;
