export interface StudentVerification {
  id: string;
  studentName: string;
  collegeName: string;
  role: string;
  documentType: "Offer Letter" | "Certificate of Completion" | "NOC Recommendation" | "Internship Clearance";
  issueDate: string;
  duration: string;
  status: "Verified & Valid" | "Pending Review" | "Expired";
  verificationHash: string;
  performanceGrade: string;
  skillsAcquired: string[];
}

// Authoritative registry records are queried when connected to the verified credential backend.
// Do not populate with placeholder or sample student names in production.
export const VERIFICATION_DATABASE: StudentVerification[] = [];
