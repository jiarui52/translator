import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: `You are a translator that translates text into ${targetLanguage}.` },
          { role: 'user', content: text }
        ],
        max_tokens: 60,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('API Response:', response);

    if (response.status === 200 && response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error('Translation failed');
    }
  } catch (error:any) {
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};
