export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string;
  uploadDate: Date;
  processed: boolean;
}

export interface Clause {
  id: string;
  original: string;
  simplified: string;
  riskLevel: 'low' | 'medium' | 'high';
  category: 'risk' | 'obligation' | 'important';
  section: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  relatedClause?: string;
}

export interface RiskHighlight {
  text: string;
  type: 'risk' | 'obligation' | 'important';
  severity: 'low' | 'medium' | 'high';
  explanation: string;
}