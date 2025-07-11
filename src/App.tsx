import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import AdminDashboard from './pages/admin/AdminDashboard';
import AuthProvider from './components/AuthContext';
import AuthGuard from './components/AuthGuard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Account from './pages/account/Account';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import PendingTransactions from './pages/admin/PendingTransactions';
import Unauthorized from './pages/Unauthorized';

import { NotificationProvider } from './common/NotificationProvider';
import NotFound from './pages/NotFound';
import ActiveLoans from './pages/admin/ActiveLoans';
import Applications from './pages/applications/Applications';
import VerifyOtp from './components/auth/VerifyOtp';
import UserHistoryPage from './pages/UserHistoryPage';
import PendingApplicationsPage from './pages/admin/PendingApplicationsPage';
import PendingSignup from './pages/admin/PendingSignup';
import FlaggedTransactions from './pages/admin/FlaggedTransactions';
import Loan from './pages/loan/Loan';
import TrustedDevicesPage from './pages/TrustedDevicesPage';
import StatementDownloader from './components/StatementDownloader';
import AdminTrustedDevicesPage from './pages/admin/AdminTrustedDevicesPage';
import TillAccountPage from './pages/till/TillAccountPage';
import SavingAccountPage from './pages/saving/SavingAccountPage';
import PaybillAccountPage from './pages/paybill/PaybillAccountPage';
import CheckAccountPage from './pages/cheque/CheckAccountPage';
import AgentAccountPage from './pages/agent/AgentAccountPage';
import CombinedDashboard from './pages/CombinedDashboard';

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <NotificationProvider>
                    <Routes>
                        {/* Public routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path='/verify-otp' element={<VerifyOtp />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />

                        {/* Protected routes */}
                        <Route path="/" element={
                            <AuthGuard>
                                <Home />
                            </AuthGuard>
                        }
                        />
                        <Route path="/notifications" element={
                            <AuthGuard>
                                <Notifications />
                            </AuthGuard>
                        }
                        />
                        <Route path='/history' element={
                            <AuthGuard>
                                <UserHistoryPage />
                            </AuthGuard>
                        }
                        />
                        <Route path="/trusted-devices" element={
                            <AuthGuard>
                                <TrustedDevicesPage />
                            </AuthGuard>
                        }
                        />
                        <Route path="/account/statement" element={
                            <AuthGuard>
                                <StatementDownloader />
                            </AuthGuard>
                        } 
                        />

                        <Route path="/admin/pending-transactions" element={
                            <AuthGuard>
                                <PendingTransactions />
                            </AuthGuard>
                        }
                        />
                        <Route path="/admin/pending-applications" element={
                            <AuthGuard>
                                <PendingApplicationsPage />
                            </AuthGuard>
                        }
                        />
                        <Route path='/admin/pending-signups' element={
                            <AuthGuard>
                                <PendingSignup />
                            </AuthGuard>
                        }/>
                        <Route path='/admin/flagged-transactions' element={
                            <AuthGuard>
                                <FlaggedTransactions />
                            </AuthGuard>
                        }/>

                        <Route path="/admin/loans/active" element={
                            <AuthGuard>
                                <ActiveLoans />
                            </AuthGuard>
                        }
                        />
                        <Route path="/unauthorized" element={
                            <AuthGuard>
                                <Unauthorized />
                            </AuthGuard>
                        }
                        />
                        <Route path="/not-found" element={
                            <AuthGuard>
                                <NotFound />
                            </AuthGuard>
                        }
                        />
                        <Route path="/admin" element={
                            <AuthGuard>
                                <AdminDashboard />
                            </AuthGuard>
                        }
                        />
                        <Route path="/admin/trusted-devices" element={
                            <AuthGuard>
                                <AdminTrustedDevicesPage />
                            </AuthGuard>
                        } 
                        />
                        <Route path="/account" element={
                            <AuthGuard>
                                <Account />
                            </AuthGuard>
                        }
                        />
                        <Route path="/applications" element={
                            <AuthGuard>
                                <Applications />
                            </AuthGuard>
                        }
                        />
                        <Route path="/agent-account" element={
                            <AuthGuard>
                                <AgentAccountPage />
                            </AuthGuard>
                        } 
                        />
                        <Route path="/till-account" element={
                            <AuthGuard>
                                <TillAccountPage />
                            </AuthGuard>
                            
                        } 
                        />
                        <Route path="/saving-account" element={
                            <AuthGuard>
                                <SavingAccountPage />
                            </AuthGuard>
                        } 
                        />
                        <Route path="/paybill-account" element={
                            <AuthGuard>
                                <PaybillAccountPage />  
                            </AuthGuard>
                        } 
                        />
                        <Route path="/check-account" element={
                            <AuthGuard>
                                <CheckAccountPage />
                            </AuthGuard>
                        } 
                        />
                        <Route path="/statement" element={
                            <AuthGuard>
                                <StatementDownloader />
                            </AuthGuard>
                        } 
                        />
                        <Route path="/dashboard" element={
                            <AuthGuard>
                                <CombinedDashboard />
                            </AuthGuard>
                        } 
                        />
                        <Route path="/loan" element={
                            <AuthGuard>
                                <Loan />
                            </AuthGuard>
                        } />

                        <Route path="*" element={
                            <AuthGuard>
                                <NotFound />
                            </AuthGuard>
                        }
                        />
                        {/*<Route path="/repay-loan" element={<LoanRepayment />} />
                        <Route path="/loan/activate" element={<LoanActivation />} />
                        <Route path="/loan/details" element={<LoanDetails />} />*/}

                    </Routes>
                    {/* Toast container */}
                    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
                </NotificationProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
