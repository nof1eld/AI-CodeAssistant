# AI Code Assistant

A simple Node.js terminal-based coding assistant powered by Cohere's AI API. This tool allows you to interact with an AI assistant, providing code snippets and receiving helpful responses directly in your terminal, free and lightweight.

## Features

- Chat with an AI coding assistant in your terminal
- Optionally provide a code snippet for context
- Maintains conversation history for context-aware responses

## Prerequisites

- Node.js (v14 or higher recommended)
- A Cohere API key ([Get one here](https://dashboard.cohere.com/api-keys))
    >You can choose a trial key for quick usage

## Installation

1. Clone this repository or download the files.
2. Install dependencies:
   ```sh
   npm install
   ```

## Usage

1. Replace the placeholder API key in `main.js` with your Cohere API key:
   ```js
   token: "YOUR_COHERE_API_KEY_HERE";
   ```
2. Run the assistant:
   ```sh
   node main.js
   ```
3. Follow the prompts:
   - Enter your question or prompt.
   - Provide a file path to a code snippet (only on the first prompt, an empty file means no code assistance and only regular chat).
   - Continue chatting with the AI assistant.

## Example

```
Enter your prompt: How do I reverse a string in JavaScript?
Enter a code snippet file path (e.g., ./code.js): ./code.js
Cohere: You can reverse a string in JavaScript by...
```

## Notes

- The conversation history is preserved for context.
- If the code snippet file does not exist, the program will exit.

## License

MIT License
