import axios from 'axios';
import type { LoanApplicationRequest } from '../types/LoanApplicationRequest';
import type { ResetType } from '../types/ResetType';
import type { PayBillRequestType } from '../types/PayBillRequestType';
import type { TillRequestType } from '../types/TillRequestType';
import type { AgentRequestType } from '../types/AgentRequestType';
import type { TrustedDeviceType } from '../types/TrustedDeviceType';
import { toast } from 'react-toastify';

const API = axios.create({
  baseURL: 'https://bank-system-backend-production.up.railway.app/',
  withCredentials: true, 
});

// ====================== AUTH =======================

export const signUp = async (payload: any) => {
    const response = await API.post('/user/signup', payload);
    return response.data;
};

export const login = async (payload: any) => {
    const response = await API.post('/user/login', payload);
    return response.data;
};

export const getSessionUser = async () => {
  const response = await API.get('/user/session');
  return response.data;
};

export const logoutService = async () => {
    const response = await API.post('/user/logout');
    return response.data;
};
export const verifyOtp = async (payload: {
    email: string;
    otp: string;
    ipAddress: string;
    userAgent: string;
    deviceId: string;
}) => {
    const response = await API.post('/user/verify-otp', payload);
    return response.data;
};

export const resendOtp = async (email: string) => {
    try {
        const response = await API.post('/user/resend-otp', { email });
        return response.data;
    } catch (error: any) {
        console.error("Resend OTP error:", error?.response?.data || error.message);
        throw error?.response?.data || { responseCode: '500', responseMessage: 'Unexpected error' };
    }
};


// ====================== TRANSACTIONS =======================

export const creditAccount = async (data: { amount: number; accountNumber: string; pin: number }) => {
    const response = await API.post('/account/credit', data);
    return response.data;
};
export const debitAccount = async (data: { agentNumber: string; amount: number; pin: number }) => {
    const response = await API.post("/account/debit", data);
    return response.data;
};
export const transfer = async (data: {
    destinationAccount: string; amount: number; pin: number
}) => {
    const response = await API.post("/account/transfer", data);
    return response.data;
};
export const payBills = async (data: { payBillNumber: string; amount: number; pin: number }) => {
    const response = await API.post("/account/pay-bills", data);
    return response.data;
};

export const buyGoods = async (data: { tillNumber: string; amount: number; pin: number }) => {
    const response = await API.post("/account/buy-goods", data);
    return response.data;
};
export const addSavings = async (data: { amount: number; lockPeriodDays: number; pin: number; }) => {
    const response = await API.post("/account/savings", data);
    return response.data;
};

export const withdrawSavings = async (amount: number, pin: number) => {
    const response = await API.post(`/account/savings/withdraw?amount=${amount}&pin=${pin}`);
    return response.data;
};

export const viewSavingsBalance = async () => {
    const response = await API.get('/account/savings/balance');
    return response.data;
};

export const getRecentTransactions = async () => {
    const response = await API.get("/account/recent-transactions");
    return response.data;
};
// ====================== PROFILE =======================
export const fetchUserProfile = async () => {
  const response = await API.get('/user/profile');
  return response.data;
};

export const updateUserProfile = async (payload: {
  phoneNumber?: string;
  alternativePhoneNumber?: string;
  address?: string;
  city?: string;
  country?: string;
  job?: string;
  nextOfKin?: string;
  nextOfKinRelationship?: string;
}) => {
  const response = await API.put('/user/update', payload);
  return response.data;
};


// ====================== LOGIN HISTORY =======================

export const fetchLoginHistory = async (page: number = 0, size: number = 10) => {
    const response = await API.get(`/user-management/login-history?page=${page}&size=${size}`);
    return response.data;
};

// ====================== NOTIFICATIONS =======================

export const getUserNotifications = async (
    userId: number,
    page: number = 0,
    size: number = 10
) => {
    try {
        const params = { page, size };
        const response = await API.get(`/notifications/${userId}`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching user notifications:', error);
        throw error;
    }
};

export const getUnreadNotifications = async (userId: number) => {
    try {
        const response = await API.get(`/notifications/unread/${userId}`);
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error('Error fetching unread notifications:', error);
        throw error;
    }
};

export const markNotificationsAsRead = async (ids: number[]) => {
    try {
        if (!ids || ids.length === 0) return null;
        const response = await API.post(`/notifications/mark-as-read`, ids);
        return response.data;
    } catch (error) {
        console.error('Error marking notifications as read:', error);
        throw error;
    }
};

// ====================== SERVER VALIDATION =======================
export const validateEmail = async (email: string) => {
    const response = await API.get<boolean>(`/user/checkemail?email=${encodeURIComponent(email)}`);
    return { exists: response.data };
};

export const validatePhoneNumber = async (phoneNumber: string) => {
    const response = await API.get<boolean>(`/user/checkcontact?contactNumber=${encodeURIComponent(phoneNumber)}`);
    return { exists: response.data };
};
export const validateAccountNumber = async (accountNumber: string) => {
    const response = await API.get<boolean>(
        `/user/checkaccount?accountNumber=${encodeURIComponent(accountNumber)}`
    );
    return { exists: response.data };
};
export const validateAgentNumber = async (agentNumber: string) => {
    const response = await API.get<boolean>(
        `/user/checkagent?agentNumber=${encodeURIComponent(agentNumber)}`
    );
    return { exists: response.data };
};
export const validatePayBillNumber = async (payBillNumber: string) => {
    const response = await API.get<boolean>(
        `/user/checkpaybill?payBillNumber=${encodeURIComponent(payBillNumber)}`
    );
    return { exists: response.data };
};
export const validateTillNumber = async (tillNumber: string) => {
    const response = await API.get<boolean>(
        `/user/checktill?tillNumber=${encodeURIComponent(tillNumber)}`
    );
    return { exists: response.data };
};
// ====================== Forgot Password ====================
export const requestResetCode = async (email: string) => {
    const response = await API.post('/user/forgotpassword', null, {
        params: { email },
    });
    return response.data;
};

export const verifyResetCode = async (email: string, code: number) => {
    const response = await API.post('/user/forgotpassword/verify', null, {
        params: { email, code },
    });
    return response.data;
};

export const resetPassword = async (data: ResetType) => {
    const response = await API.post('/user/forgotpassword/reset', data);
    return response.data;
};
// ====================== ALERTS =======================
export const fetchAlertCounts = async () => {
    const [fraud, update, failure, attack] = await Promise.all([
        API.get('/bank/fraud-alerts-count'),
        API.get('/bank/system-update-alerts-count'),
        API.get('/bank/system-failure-alerts-count'),
        API.get('/bank/system-attack-alerts-count'),
    ]);
    return {
        fraud: fraud.data,
        systemUpdate: update.data,
        systemFailure: failure.data,
        systemAttack: attack.data,
    };
};
export const fetchFraudAlerts = async (page = 0, size = 10) => {
    const response = await API.get('/bank/fraud-alerts', {
        params: { pageNo: page, pageSize: size }
    });
    return response.data;
};
export const fetchFraudAlertById = async (id: number) => {
    const response = await API.get(`/bank/fraud-alert/${id}`);
    return response.data;
};
export const fetchSystemUpdateAlerts = async (page = 0, size = 10) => {
    const response = await API.get('/bank/system-update-alerts', {
        params: { pageNo: page, pageSize: size }
    });
    return response.data;
};
export const addSystemUpdateAlert = async (alertData: any) => {
    const response = await API.post('/bank/system-update-alerts/add', alertData);
    return response.data;
};
export const fetchSystemFailureAlerts = async (page = 0, size = 10) => {
    const response = await API.get('/bank/system-failure-alerts', {
        params: { pageNo: page, pageSize: size }
    });
    return response.data;
};
export const fetchSystemAttackAlerts = async (page = 0, size = 10) => {
    const response = await API.get('/bank/system-attack-alerts', {
        params: { pageNo: page, pageSize: size }
    });
    return response.data;
};
//================== TRUSTED DEVICE =============
export const getMyTrustedDevices = async (): Promise<{ content: TrustedDeviceType[] }> => {
  const response = await API.get('/user/trusted-devices', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  console.log("Trusted devices raw response:", response);

  return response.data;
};


// Get all trusted devices with pagination and optional filter
export const getAllTrustedDevices = async (page: number, filter: string = '') => {
    const response = await API.get(`/admin/trusted-devices`, {
        params: { page, size: 5, filter }
    });
    return response.data;
};

// Count of all trusted devices
export const adminTrustedDeviceCount = async () => {
    const response = await API.get("/admin/trusted-devices/count");
    return response.data;
};

// Revoke (delete) a specific trusted device by ID
export const revokeTrustedDevice = async (id: number) => {
    const response = await API.delete(`/admin/trusted-device/${id}`);
    return response.data;
};

// Export trusted devices as CSV (triggers browser download)
export const exportTrustedDevicesCSV = () => {
    window.open('/admin/trusted-devices/export', '_blank');
};

//============ ADMIN DASHBOARD ===============
export const approveTransaction = async (transactionId: Number) => {
    const response = await API.post(`/account/admin/approve/${transactionId}`);
    return response.data;
};

export const getPendingTransactions = async (page = 0, size = 5) => {
    const response = await API.get(`/account/admin/transactions/pending?page=${page}&size=${size}`);
    return response.data;
};

export const totalSavings = async () => {
    const response = await API.get('/account/total');
    return response.data;
};

export const rejectTransaction = async (transactionId: number) => {
    const response = await API.post(`/account/admin/transaction/reject/${transactionId}`);
    return response.data;
};

export const getPendingApplications = async (page = 0, size = 5) => {
    const response = await API.get(`/apply/admin/applications/pending?page=${page}&size=${size}`);
    return response.data;
};

export const approveApplication = async (id: number) => {
    const response = await API.post(`/apply/approve/${id}`);
    return response.data;
};
export const rejectApplication = async (id: number) => {
    const response = await API.post(`/apply/reject/${id}`);
    return response.data;
};
export const getPendingSignups = async (page: number = 0, size: number = 5) => {
    const response = await API.get(`/admin/users/pending-signups?page=${page}&size=${size}`);
    return response.data;
};
export const approveSignup = async (id: number) => {
    const response = await API.put(`/admin/users/activate/pending-signup/${id}`);
    return response.data;
};

// =================== ANOMALY AI SERVICE ENDPOINTS ======================

export const detectAllAnomalies = async () => {
    const response = await API.get(`/ai/anomalies/all`);
    return response.data;
};

export const detectRecentAnomalies = async () => {
    const response = await API.get(`/ai/anomalies/recent`);
    return response.data;
};

export const getAnomalyMap = async (page = 0, size = 5) => {
    const response = await API.get(`/ai/anomalies/map`, {
        params: { page, size },
    });
    return response.data;
};

export const getAIFlaggedTransactions = async (page = 0, size = 5) => {
    const response = await API.get(`/ai/anomalies`, {
        params: { page, size },
    });
    return response.data;
};

export const clearAnomalyFlag = async (id: number) => {
    const response = await API.put(`/ai/anomalies/${id}/clear`);
    return response.data;
};

export const getAnomalyStats = async () => {
    const response = await API.get(`/ai/anomalies/stats/daily`);
    return response.data;
};

export const getLatestAnomaly = async () => {
    const response = await API.get(`/ai/anomalies/recent/latest`);
    return response.data;
};

//=========================== LOAN ==================
export const fetchActiveLoans = async (page: number, size: number) => {
    const response = await API.get(`/loans/active?page=${page}&size=${size}`);
    return response.data;
};
export const activateLoan = async (loanId: number) => {
    const response = await API.put(`/loan/activate/${loanId}`);
    return response.data;
};
export const getLoanDetails = async (loanId: number) => {
    const response = await API.get(`/loan/${loanId}`);
    return response.data;
};
export const repayLoan = async (data: {
    amount: number;
    pin: number;
}) => {
    const response = await API.post("/loan/repay", data);
    return response.data;
};
export const getActiveLoans = async (page: number, size: number) => {
    const res = await axios.get(`/loan/active?page=${page}&size=${size}`);
    return res.data;
};

//=========================== APPLICATIONS ==================
export const applyForPayBill = async (data: PayBillRequestType) => {
    const response = await API.post("/apply/pay-bill", data);
    return response.data;
};

export const applyForTill = async (data: TillRequestType) => {
    const response = await API.post("/apply/till", data);
    return response.data;
};

export const applyForAgent = async (data: AgentRequestType) => {
    const response = await API.post("/apply/agent", data);
    return response.data;
};
export const applyForLoan = async (data: LoanApplicationRequest) => {
    const response = await API.post("/loan/apply", data);
    return response.data;
};

// ====================== BANK STATEMENTS =======================
export const downloadBankStatement = (from?: string, to?: string) => {
    const queryParams = new URLSearchParams();
    if (from) queryParams.append('from', from);
    if (to) queryParams.append('to', to);

    const url = `/user/statement/download?${queryParams.toString()}`;
    // Open in new tab to trigger browser preview/download
    window.open(`http://localhost:8080${url}`, '_blank');
};
export const emailBankStatement = async (from?: string, to?: string) => {
    const queryParams = new URLSearchParams();
    if (from) queryParams.append('from', from);
    if (to) queryParams.append('to', to);

    const response = await API.post(`/user/statement/email?${queryParams.toString()}`);
    return response.data;
};

// ====================== SETTINGS =======================

export interface PasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface PinPayload {
  oldPin: string;
  newPin: string;
  confirmNewPin: string;
}

export interface OldPasswordPayload {
  oldPassword: string;
}

export interface OldPinPayload {
  oldPin: string;
}

// ====================== PASSWORD =======================

// Step 1: Verify old password and send OTP (sent in body)
export const verifyOldPassword = async (payload: OldPasswordPayload) => {
  const response = await API.post('/settings/verify-old-password', payload);
  return response.data;
};

// Step 2: Verify OTP for password (sent as query param)
export const verifyPasswordOtp = async (otp: string) => {
  const response = await API.post(`/settings/verify-password-otp?otp=${encodeURIComponent(otp)}`);
  return response.data;
};

// Step 3: Change password
export const changePassword = async (payload: PasswordPayload) => {
  const response = await API.post('/settings/change-password', payload);
  return response.data;
};

// ====================== PIN =======================

// Step 1: Verify old PIN and send OTP
export const verifyOldPin = async (payload: OldPinPayload) => {
  const response = await API.post('/settings/verify-old-pin', payload);
  return response.data;
};

// Step 2: Verify OTP for PIN (sent as query param)
export const verifyPinOtp = async (otp: string) => {
  const response = await API.post(`/settings/verify-pin-otp?otp=${encodeURIComponent(otp)}`);
  return response.data;
};

// Step 3: Change PIN
export const changePin = async (payload: PinPayload) => {
  const response = await API.post('/settings/change-pin', payload);
  return response.data;
};

// ====================== AGENTS =======================

export const fetchAllAgents = async () => {
  const response = await API.get('/agents/all');
  return response.data;
};

export const fetchWeeklyTransactions = async () => {
  const response = await API.get('/agents/weekly-transactions');
  return response.data;
};

// ================= TILL ====================
export const getAllTills = async () =>{
    const response = await API.get('/tills/all');
    return response.data;
} 
export const getWeeklyTillSales = async () =>{
    const response = await API.get('/tills/weekly-sales');
    return response.data;
} 

// ================== SAVING =======================
export const getMonthlySavings = async (accountNumber: string) => {
  const response = await API.get(`/savings/monthly-balance?accountNumber=${accountNumber}`);
  return response.data;
};

export const getSavingsTransactions = async (accountNumber: string) => {
  const response = await API.get(`/savings/transactions?accountNumber=${accountNumber}`);
  return response.data;
};

// ================== PAYBILL =======================
export const getPaybillMonthlyUsage = async (accountNumber: string) => {
  const response = await API.get(`/paybill/monthly-usage?accountNumber=${accountNumber}`);
  return response.data;
};

export const getPaybillTransactions = async (accountNumber: string) => {
  const response = await API.get(`/paybill/transactions?accountNumber=${accountNumber}`);
  return response.data;
};
