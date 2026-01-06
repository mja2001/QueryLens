import axios from 'axios';
import { ClaudeResponse, Message } from '../types';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const API_KEY = process.env.REACT_APP_CLAUDE_API_KEY;
const MODEL = process.env.REACT_APP_CLAUDE_MODEL || 'claude-sonnet-4-20250514';

export async function callClaude(
  userQuery: string,
  conversationHistory: Message[]
): Promise<ClaudeResponse> {
  if (!API_KEY) {
    throw new Error('Claude API key not configured');
  }

  const systemPrompt = `You are QueryLens, an AI analytics assistant that helps users understand their data through natural language queries.

Your role:
1. Interpret the user's natural language question about data
2. Determine what type of visualization would best answer their question
3. Identify the metrics, dimensions, and filters needed
4. Provide a clear explanation of what you're showing them

Respond in JSON format with this structure:
{
  "chartType": "bar|line|pie|area|scatter",
  "title": "Clear chart title",
  "explanation": "Brief explanation of what you're showing",
  "metrics": ["metric1", "metric2"],
  "dimensions": ["dimension1"],
  "timeframe": "optional timeframe",
  "xAxisLabel": "X axis label",
  "yAxisLabel": "Y axis label"
}

Available data context:
- Sales data (revenue, units, profit)
- Geographic data (regions, countries, cities)
- Product data (categories, names, SKUs)
- Time data (daily, monthly, quarterly, yearly)
- Customer data (segments, acquisition channels)

Keep explanations concise and friendly. Always respond with valid JSON only.`;

  const messages = conversationHistory
    .filter(msg => msg.type === 'user')
    .slice(-3)
    .map(msg => ({
      role: 'user',
      content: msg.content
    }));

  messages.push({
    role: 'user',
    content: userQuery
  });

  try {
    const response = await axios.post(
      CLAUDE_API_URL,
      {
        model: MODEL,
        max_tokens: 1000,
        system: systemPrompt,
        messages: messages
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01'
        },
        timeout: 30000
      }
    );

    return response.data;
  } catch (error) {
    console.error('Claude API error:', error);
    throw new Error('Failed to process query with AI');
  }
}
