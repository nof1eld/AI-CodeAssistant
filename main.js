const { CohereClientV2 } = require("cohere-ai");
const readline = require("readline");
const fs = require("fs");
const { get } = require("http");
let history = "";
const codeSnippet = (filePath) => {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error("Error reading file:", error);
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const cohere = new CohereClientV2({
  token: "YOUR_COHERE_API_KEY_HERE", // Get one from https://dashboard.cohere.com/api-keys
});

const getAIResponse = async (prompt) => {
  const response = await cohere.chat({
    model: "command-a-03-2025",
    messages: [
      {
        role: "system",
        content:
          "You are a coding assistant. Each user prompt includes the full conversation history and the current question, along with an optional code snippet. If the code snippet is empty, respond based only on the user's question or message.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  console.log(
    "\x1b[32m%s\x1b[0m",
    "Cohere: " + response.message.content[0].text
  );

  history += "response: " + response.message.content[0].text + "\n";
};

function startChat() {
  rl.question("Enter your prompt: ", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("Exiting chat. Goodbye!");
      rl.close();
      return;
    }
    if (input.length === 0) {
      console.error("Input cannot be empty. Please enter a valid prompt.");
      startChat();
      return;
    }
    if (history.length === 0) {
      rl.question(
        "Enter a code snippet file path (e.g., ./code.js): ", async (filePath) => {
          if (!fs.existsSync(filePath)) {
            console.error(
              "File does not exist. Please provide a valid file path."
            );
            rl.close();
            return;
          }
          userPrompt =
            "initial message: " +
            input +
            "\n" +
            "code snippet: " +
            codeSnippet(filePath);
          history += userPrompt;
          await getAIResponse(history);
          startChat();
        }
      );
    } else {
      userPrompt = "message: " + input + "\n";
      history += userPrompt;
      await getAIResponse(history);
      startChat();
    }
  });
}
startChat();
