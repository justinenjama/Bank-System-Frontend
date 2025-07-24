export interface LoanApplicationRequest {
    gender: string;
    married: string;
    education: string;
    selfEmployed: string;
    applicantIncome: string | number;
    coapplicantIncome: string | number;
    loanAmount: string | number;
    loanAmountTerm: string | number;
    creditHistory: string | number;
    propertyArea: string;
}
