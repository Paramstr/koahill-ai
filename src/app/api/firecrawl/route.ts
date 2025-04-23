import { NextRequest, NextResponse } from 'next/server';
import FirecrawlApp from '@mendable/firecrawl-js';

// Initialize FirecrawlApp with API key from environment variables
const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    if (!process.env.FIRECRAWL_API_KEY) {
      return NextResponse.json({ error: 'Firecrawl API key is not configured' }, { status: 500 });
    }

    console.log(`Starting Firecrawl extraction for: ${url}`);

    // Perform extraction using Firecrawl
    const extractResult = await app.extract(
      [url],
      {
        schema: jsonSchema
      }
    );

    if (!extractResult.success) {
      console.error(`Firecrawl extraction failed: ${extractResult.error}`);
      return NextResponse.json({ error: `Firecrawl extraction failed: ${extractResult.error}` }, { status: 500 });
    }

    console.log("Firecrawl extraction successful!");
    console.log(extractResult.data);
    // Assuming the result data structure matches the schema and you want the first result
    const extractedData = extractResult.data;

    // Set any missing fields to "Empty"
    if (extractedData) {
      const requiredFields = ["company_name", "mission", "location", "tags"];
      for (const field of requiredFields) {
        if (!extractedData[field] || 
            (Array.isArray(extractedData[field]) && extractedData[field].length === 0)) {
          extractedData[field] = field === "tags" ? ["Not Found"] : "Not Found";
        }
      }
    }

    // --- End detailed logging ---

    if (!extractedData) {
        console.log("API Route: Condition is true, returning 404.");
        return NextResponse.json({ error: 'No data extracted' }, { status: 404 });
    }

    return NextResponse.json(extractedData); // Default status is 200

  } catch (error) {
    console.error('Error processing request:', error);
    // Check if error is an instance of Error to access message property safely
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';  
    return NextResponse.json({ error: `Internal Server Error: ${errorMessage}` }, { status: 500 });
  }
} 