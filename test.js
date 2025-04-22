import FirecrawlApp from '@mendable/firecrawl-js';
import { performance } from 'perf_hooks';

// Initialize the FirecrawlApp with your API key
// It's recommended to use an environment variable in production
const app = new FirecrawlApp({ apiKey: "fc-cbae004ceed347069c005726f7dab307" });

// Define the JSON schema for extraction
const jsonSchema = {
  type: "object",
  properties: {
    company_name: { type: "string", description: "The legal or brand name of the company." },
    mission: { type: "string", description: "A brief description of the company's mission, purpose, or what it does in third person." },
    location: { type: "string", description: "The country and/or state of the headquarters of the company" },
    tags: { type: "array", items: { type: "string" }, description: "Relevant tags or keywords describing the company" }
  },
  required: ["company_name", "mission", "location", "tags"]
};

// Function to perform the extraction
async function extractData() {
  try {
    console.log("Starting extraction for sync.so/*...");
    const startTime = performance.now(); // Record start time
    const scrapeResult = await app.extract(
      ['https://sync.so/*'], 
      {
        // You can optionally provide a prompt to guide the LLM
        // prompt: "Extract the company name, mission, location, and relevant tags from the page.",
        schema: jsonSchema // Use the defined JSON schema
      }
    );

    if (!scrapeResult.success) {
      console.error(`Failed to extract data: ${scrapeResult.error}`);
      return;
    }

    const endTime = performance.now(); // Record end time
    const duration = endTime - startTime;

    console.log("Extraction successful!");
    console.log(JSON.stringify(scrapeResult.data, null, 2));
    console.log(`Extraction took ${(duration / 1000).toFixed(2)} seconds.`); // Log duration

  } catch (error) {
    console.error("An error occurred during extraction:", error);
  }
}

extractData();
