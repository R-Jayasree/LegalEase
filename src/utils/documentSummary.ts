import { Clause } from '../types';

export interface DocumentSummary {
  overview: string;
  keyTerms: {
    rentAmount: string;
    leaseDuration: string;
    securityDeposit: string;
    lateFeePenalty: string;
  };
  majorRisks: string[];
  yourObligations: string[];
  landlordObligations: string[];
  importantDates: string[];
  financialImpact: {
    monthlyCommitment: string;
    potentialPenalties: string;
    totalCostEstimate: string;
  };
}

export const generateDocumentSummary = (clauses: Clause[]): DocumentSummary => {
  // In a real app, this would use AI to analyze the document
  // For demo purposes, we'll return a comprehensive summary
  
  return {
    overview: "This is a residential lease agreement for a property at 123 Main Street. The lease establishes a landlord-tenant relationship with specific terms for rent, maintenance, and termination. The document contains several important clauses that define your rights and responsibilities as a tenant.",
    
    keyTerms: {
      rentAmount: "$2,500 per month",
      leaseDuration: "12 months (renewable)",
      securityDeposit: "$2,500 (refundable)",
      lateFeePenalty: "5% of rent + $25/day"
    },
    
    majorRisks: [
      "High early termination penalty (2 months' rent = $5,000)",
      "Daily late fees can accumulate quickly ($25/day + 5%)",
      "Rent can be increased up to 10% annually with 60 days notice",
      "You're responsible for advertising costs if you break the lease",
      "Limited protection against frequent rent increases"
    ],
    
    yourObligations: [
      "Pay $2,500 rent by the 1st of each month",
      "Maintain the property in good condition",
      "Report repair issues promptly to landlord",
      "Give proper notice before moving out",
      "Pay all utilities and services as specified",
      "Follow all building rules and regulations"
    ],
    
    landlordObligations: [
      "Provide 60 days written notice for rent increases",
      "Handle major structural repairs and maintenance",
      "Maintain appliances in working condition",
      "Return security deposit if lease terms are met",
      "Ensure property meets habitability standards",
      "Respect tenant privacy and provide proper notice for entry"
    ],
    
    importantDates: [
      "Rent due: 1st of each month",
      "Late fees start: After the 1st of the month",
      "Rent increase notice: 60 days minimum",
      "Lease renewal: 30 days before expiration"
    ],
    
    financialImpact: {
      monthlyCommitment: "$2,500 (rent) + utilities + potential fees",
      potentialPenalties: "Up to $5,000 for early termination + daily late fees",
      totalCostEstimate: "$30,000 annually (rent only) + $2,500 deposit"
    }
  };
};