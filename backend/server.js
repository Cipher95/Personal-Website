// Import necessary libraries
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); // --- NEW ---
require('dotenv').config(); // Loads environment variables from a .env file

// Initialize the Express app
const app = express();

// --- NEW --- Add the CORS middleware
app.use(cors({
	origin: "*"
}));

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Get the API key from environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`;

// Define the API endpoint that the frontend will call
app.post('/api/gemini', async (req, res) => {
    // Log the incoming request body to see the prompt
    console.log('Received prompt:', req.body.prompt);

    const { prompt } = req.body;

    try {
        // Make the actual call to the Google Gemini API
        const apiResponse = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            }),
        });

        if (!apiResponse.ok) {
            // If Google's API returns an error, forward that information
            const errorText = await apiResponse.text();
            throw new Error(`Gemini API Error: ${errorText}`);
        }

        const data = await apiResponse.json();

        // Extract the text response from the complex object Google sends back
        const responseText = data.candidates[0].content.parts[0].text;

        // Send the extracted text back to our frontend
        res.json({ response: responseText });

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to fetch response from Gemini API' });
    }
});

// Start the server on a specified port (e.g., 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
