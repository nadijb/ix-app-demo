export interface ChatRequest {
  session_id: string;
  message: string;
  user_id: number;
}

// Element types for UI components
export interface CareTeamMember {
  name: string;
  role: string;
  roleColor: string;
  specialty: string;
}

export interface LabResultData {
  name: string;
  formattedValue: string;
  unit: string;
  flag: string;
  date: string;
}

export interface LabTrendPoint {
  value: string;
  label: string;
}

export interface LabTrendData {
  testName: string;
  points: LabTrendPoint[];
  analysis: string;
}

export interface ElementComponent {
  id: 'CareTeamDirectory' | 'LabResultView' | 'LabTrendViewer';
  component: Record<string, unknown>;
}

export interface ElementItem {
  components: ElementComponent[];
  data: Record<string, unknown>;
}

export interface ChatResponse {
  status: 'success' | 'error';
  results: {
    type: 'text' | 'element';
    text?: { content: string };
    element?: ElementItem[];
  };
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  elements?: ElementItem[];
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_MESSAGES' };
