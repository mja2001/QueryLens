export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  visualization?: VisualizationData;
}

export interface VisualizationData {
  type: ChartType;
  data: DataPoint[];
  title: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  description?: string;
}

export type ChartType = 
  | 'bar'
  | 'line'
  | 'pie'
  | 'area'
  | 'scatter'
  | 'composed';

export interface DataPoint {
  [key: string]: string | number;
}

export interface QueryResult {
  explanation: string;
  visualization?: VisualizationData;
  suggestions?: string[];
}

export interface QueryIntent {
  action: string;
  metrics: string[];
  dimensions: string[];
  timeframe?: string;
  filters?: Record<string, any>;
  chartType?: ChartType;
}

export interface ClaudeResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
  model: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}
