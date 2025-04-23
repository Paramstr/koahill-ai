import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Define the structure of your funding item based on your schema
interface FundingItem {
  id: string; // uuid
  title: string | null;
  description: string | null;
  tags: string[] | null; // _text
  region: string | null;
  entity_type: string | null;
  source: string | null;
  funding_type: string | null;
  amount_min: number | null; // numeric
  amount_max: number | null; // numeric
  deadline: string | null; // date
  recurring: boolean | null; // bool
  url: string | null;
  // embedding: number[] | null; // vector - Likely not needed for display
  created_at: string; // timestamp
}

export async function POST(req: NextRequest) {
  try {
    const { extractedData } = await req.json()

    if (!extractedData || typeof extractedData !== 'string') {
      return NextResponse.json({ error: 'Invalid input: extractedData string is required' }, { status: 400 })
    }

    console.log("Received extracted data for Supabase query:", extractedData);

    // --- Placeholder Logic: Simple text search (replace with vector search above) ---
    // Assuming a 'description' or similar text field for basic search
    const { data, error } = await supabase
        .from('funding') // Updated table name
        .select('*') // Select desired columns
        // .textSearch('description', extractedData, { // Basic text search - replace with vector search
        //     type: 'plain',
        //     config: 'english'
        // })
        .limit(3); // Limit to top 3 for now
    // --- End Placeholder Logic ---


    if (error) {
      console.error('Supabase query error:', error);
      // Don't expose detailed error messages to the client
      return NextResponse.json({ error: 'Failed to fetch funding data' }, { status: 500 })
    }

    console.log("Fetched funding data:", data);

    // Ensure data conforms to the FundingItem interface if needed, or adjust interface
    const fundingItems: FundingItem[] = data || [];

    return NextResponse.json(fundingItems)
  } catch (error) {
    console.error('API route error:', error);
    // Catch potential JSON parsing errors or other unexpected issues
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}

// Optional: Add GET or other methods if needed 