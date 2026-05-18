const axios = require('axios');

// @desc    Get AI Recommendation for employees
// @route   POST /api/ai/recommend
// @access  Private
exports.getRecommendation = async (req, res) => {
  try {
    const { employees, actionType } = req.body;
    // actionType can be: 'promotion', 'ranking', 'training', 'feedback'

    if (!employees || employees.length === 0) {
      return res.status(400).json({ message: 'No employee data provided' });
    }

    let prompt = '';

    if (actionType === 'ranking') {
      prompt = `Rank the following employees based on their performance score, skills, and experience. Provide a brief justification for the ranking.\n\nEmployees Data:\n${JSON.stringify(employees, null, 2)}`;
    } else {
      // Single or multiple employees feedback/promotion/training
      prompt = `Analyze the following employee(s) and provide ${actionType} suggestions. 
      Consider their performance score (out of 100), experience (in years), and skills. 
      - High performance (>80) should get promotion suggestions.
      - Low performance (<50) should get improvement feedback.
      - If skills are lacking for their experience, provide training suggestions.
      
      Employees Data:\n${JSON.stringify(employees, null, 2)}`;
    }

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo', // Or any other openrouter model
        messages: [
          {
            role: 'system',
            content: 'You are an expert HR AI assistant. Provide concise, professional, and insightful recommendations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5000', 
          'X-Title': 'MERN HR App'
        }
      }
    );

    const aiMessage = response.data.choices[0].message.content;

    res.json({ recommendation: aiMessage });

  } catch (error) {
    console.error('AI API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to generate AI recommendation' });
  }
};
