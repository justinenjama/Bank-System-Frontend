import { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import { getMyTrustedDevices } from '../service/Service';
import type { TrustedDeviceType } from '../types/TrustedDeviceType';

const TrustedDevicesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [devices, setDevices] = useState<TrustedDeviceType[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await getMyTrustedDevices();
        console.log("Trusted devices response content:", res.content);
        if (res && Array.isArray(res.content)) {
          setDevices(res.content);
        } else {
          console.warn('Unexpected response structure:', res);
        }
      } catch (err) {
        console.error('Failed to load trusted devices:', err);
      }
    };
    fetchDevices();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <main className="flex-1 p-6 mt-16 md:mt-0 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">Trusted Devices</h2>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-auto rounded shadow bg-white dark:bg-gray-800">
            <table className="w-full text-sm">
                <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                    <th className="p-2 text-left">Device Info</th>
                    <th className="text-left">IP Address</th>
                    <th className="text-left">Location</th>
                    <th className="text-left">Date Trusted</th>
                </tr>
                </thead>
                <tbody>
                {devices.map((d, i) => (
                    <tr key={i} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-2">{d.userAgent}</td>
                    <td>{d.ip}</td>
                    <td>{d.location}</td>
                    <td>{new Date(d.trustedAt).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {devices.map((d, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <p className="text-sm"><span className="font-semibold">Device:</span> {d.userAgent}</p>
                <p className="text-sm"><span className="font-semibold">IP:</span> {d.ip}</p>
                <p className="text-sm"><span className="font-semibold">Location:</span> {d.location}</p>
                <p className="text-sm"><span className="font-semibold">Trusted At:</span> {new Date(d.trustedAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default TrustedDevicesPage;
