

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 export   const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Reference to : {\n   \"time\": 1550476186479,\n   \"blocks\": [\n      {\n         \"id\": \"oUq2g_tl8y\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Editor.js\",\n            \"level\": 2\n         }\n      },\n      {\n         \"id\": \"zbGZFPM-iI\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.\"\n         }\n      },\n      {\n         \"id\": \"qYIGsjS5rt\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Key features\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"XV87kJS_H1\",\n         \"type\": \"list\",\n         \"data\": {\n            \"style\": \"unordered\",\n            \"items\": [\n               \"It is a block-styled editor\",\n               \"It returns clean data output in JSON\",\n               \"Designed to be extendable and pluggable with a simple API\"\n            ]\n         }\n      },\n      {\n         \"id\": \"AOulAjL8XM\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"What does it mean «block-styled editor»\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"cyZjplMOZ0\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\\\"cdx-marker\\\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.\"\n         }\n      }\n   ],\n   \"version\": \"2.8.1\"\n}\n\n\n\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"time\": 1678867722965,\n  \"blocks\": [\n    {\n      \"id\": \"header-1\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Grocery Todo List\",\n        \"level\": 1\n      }\n    },\n    {\n      \"id\": \"paragraph-1\",\n      \"type\": \"paragraph\",\n      \"data\": {\n        \"text\": \"Keep track of your groceries with this handy todo list!\"\n      }\n    },\n    {\n      \"id\": \"list-1\",\n      \"type\": \"list\",\n      \"data\": {\n        \"style\": \"unordered\",\n        \"items\": []\n      }\n    },\n    {\n      \"id\": \"paragraph-2\",\n      \"type\": \"paragraph\",\n      \"data\": {\n        \"text\": \"Add items to your list below:\"\n      }\n    },\n    {\n      \"id\": \"input-1\",\n      \"type\": \"input\",\n      \"data\": {\n        \"placeholder\": \"Enter item\",\n        \"label\": \"Grocery Item\",\n        \"value\": \"\",\n        \"type\": \"text\"\n      }\n    },\n    {\n      \"id\": \"button-1\",\n      \"type\": \"button\",\n      \"data\": {\n        \"text\": \"Add Item\",\n        \"url\": \"#\"\n      }\n    }\n  ],\n  \"version\": \"2.8.1\"\n}\n```\n\n**Explanation of the blocks:**\n\n* **header-1:** A level 1 heading with the text \"Grocery Todo List\".\n* **paragraph-1:** A paragraph explaining the purpose of the list.\n* **list-1:** An unordered list where the grocery items will be added. The `items` array will hold the actual grocery items.\n* **paragraph-2:** A paragraph prompting the user to add items to the list.\n* **input-1:** An input field for the user to enter grocery items.\n* **button-1:** A button that triggers the addition of the entered item to the list.\n\n**How to use this template:**\n\n1. **Import the template:** Load the JSON data into your Editor.js instance.\n2. **Add functionality:**  \n   - Use your programming language (JavaScript, Python, etc.) to implement the functionality for adding items to the list when the button is clicked.\n   - Connect the button to the `list-1` block to dynamically add items to the list.\n3. **Store and retrieve data:**  Implement a mechanism to store the list data (e.g., using local storage or a database) and retrieve it when the user revisits the page.\n\n**Remember to install and configure necessary Editor.js plugins (like the List plugin and Input plugin) for this template to work correctly.** \n"},
          ],
        },
      ],
    });
  
