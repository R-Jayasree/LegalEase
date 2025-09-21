import { Clause, ChatMessage } from '../types';

export const mockClauses: Clause[] = [
  {
    id: '1',
    original: 'The Tenant shall pay rent in the amount of $2,500 per calendar month, due and payable in advance on or before the first day of each month. Late payment shall incur a penalty of 5% of the monthly rent amount plus $25 administrative fee for each day the payment is delinquent.',
    simplified: 'You must pay $2,500 rent by the 1st of each month. If you\'re late, you\'ll pay an extra 5% of your rent ($125) plus $25 for each day you\'re late.',
    riskLevel: 'high',
    category: 'risk',
    section: 'Payment Terms'
  },
  {
    id: '2',
    original: 'Landlord reserves the right to increase rent with sixty (60) days written notice to Tenant, provided such increase does not exceed ten percent (10%) of the current monthly rental amount in any twelve (12) month period.',
    simplified: 'Your landlord can raise your rent with 60 days notice, but not more than 10% per year (maximum $250 increase from current rent).',
    riskLevel: 'medium',
    category: 'important',
    section: 'Rent Increases'
  },
  {
    id: '3',
    original: 'Tenant acknowledges responsibility for maintaining the premises in good condition and shall promptly notify Landlord of any necessary repairs or maintenance issues.',
    simplified: 'You need to keep the apartment clean and tell your landlord about any repairs needed quickly.',
    riskLevel: 'low',
    category: 'obligation',
    section: 'Maintenance Responsibilities'
  }
];

export const mockChatResponses = {
  'penalties': 'Based on your lease agreement, if you cancel early, you may be required to pay a penalty equal to two months\' rent ($5,000). The lease also mentions you\'re responsible for advertising costs to find a new tenant. This is found in the "Early Termination" clause.',
  'rent increase': 'According to your lease, your landlord can increase rent with 60 days written notice, but the increase cannot exceed 10% of your current rent in any 12-month period. For your $2,500/month rent, this means a maximum increase of $250 per year.',
  'late payment': 'If you pay rent late, you\'ll be charged a penalty of 5% of your monthly rent ($125) plus an additional $25 for each day you\'re late. For example, if you\'re 3 days late, you\'d pay $125 + $75 = $200 in penalties.',
  'maintenance': 'You are responsible for keeping the apartment clean and reporting any repair issues to your landlord promptly. Your landlord handles major structural repairs and appliance maintenance. This means you handle day-to-day upkeep while they handle big repairs.',
  'security deposit': 'You paid a $2,500 security deposit. This can be used to cover unpaid rent, damages beyond normal wear and tear, or cleaning costs when you move out. You should get it back if you leave the place in good condition.',
  'termination': 'To end your lease early, you\'ll need to pay a penalty equal to two months\' rent ($5,000) and cover any advertising costs your landlord incurs to find a new tenant. The exact amount depends on how much it costs to re-rent the unit.',
  'repairs': 'For repairs, you need to notify your landlord promptly about any issues. You\'re responsible for minor maintenance and keeping the place clean, while your landlord handles major structural repairs and appliance problems.',
  'fees': 'The main fees in your lease are: 1) Late payment penalty of 5% + $25/day if rent is late, 2) Early termination penalty of 2 months\' rent, 3) Potential advertising costs if you break the lease early.',
  'obligations': 'Your main responsibilities include: paying $2,500 rent by the 1st of each month, maintaining the property in good condition, promptly reporting repair needs, and following all lease terms to avoid penalties.',
  'rights': 'Your rights include: 60 days notice before any rent increase, rent increases limited to 10% per year, landlord responsibility for major repairs, and return of your security deposit if you meet lease terms.',
  'default': 'I can help you understand any part of your legal document. Try asking about specific terms like "What happens if I break the lease?", "What are my maintenance responsibilities?", or "What fees should I know about?"'
};

export const sampleDocument = `
RESIDENTIAL LEASE AGREEMENT

This Lease Agreement ("Agreement") is entered into on January 1, 2024, between John Smith ("Landlord") and Jane Doe ("Tenant") for the property located at 123 Main Street, Anytown, ST 12345.

RENT PAYMENT TERMS
The Tenant shall pay rent in the amount of $2,500 per calendar month, due and payable in advance on or before the first day of each month. Late payment shall incur a penalty of 5% of the monthly rent amount plus $25 administrative fee for each day the payment is delinquent.

RENT INCREASES  
Landlord reserves the right to increase rent with sixty (60) days written notice to Tenant, provided such increase does not exceed ten percent (10%) of the current monthly rental amount in any twelve (12) month period.

MAINTENANCE AND REPAIRS
Tenant acknowledges responsibility for maintaining the premises in good condition and shall promptly notify Landlord of any necessary repairs or maintenance issues. Landlord shall be responsible for major structural repairs and appliance maintenance.

EARLY TERMINATION
In the event Tenant terminates this lease prior to the expiration date, Tenant shall pay a penalty equal to two (2) months' rent and shall be responsible for advertising costs incurred by Landlord to secure a replacement tenant.

SECURITY DEPOSIT
Tenant has deposited $2,500 as security for performance of Tenant's obligations. This deposit may be applied toward unpaid rent, damages, or cleaning costs upon termination of tenancy.
`;