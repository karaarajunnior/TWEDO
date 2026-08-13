# TEWOYEI Website

This repository contains the source code for the TEWOYEI (Teso Women and Youth Empowerment Initiatives) website.

## Setup Instructions

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Set up environment variables:
   - Copy \`.env.example\` to \`.env\`.
   - Get a Gemini API key from Google AI Studio.
   - Add your API key to the \`.env\` file as \`VITE_GEMINI_API_KEY=your_key\`.

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Features

### AI Chat Widget
The website includes a floating AI chat assistant powered by Gemini 2.5 Flash.
- The system instructions for the AI are located in \`src/data/tewoyeiPrompt.js\`. If TEWOYEI's facts, statistics, or contact details change, update this file to ensure the AI provides accurate answers.
- The widget code is located in \`src/components/ChatWidget.jsx\`.

### WhatsApp Button
A floating WhatsApp button is available for direct messaging.
- To update the WhatsApp number, modify the \`href\` attribute in \`src/components/WhatsAppButton.jsx\`.
