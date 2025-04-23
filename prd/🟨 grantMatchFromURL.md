# PRD: Instant Grant Match via Website URL

**Goal**
Let users input their website and instantly see 3 relevant grants using scraping + LLM-based search on Supabase.

---

## Section 1 – Scrape Website Metadata & Display

**Completed**

- [X] Accept user input for website URL (HeroSection.tsx).
- [X] Call internal `/api/firecrawl` API which uses Firecrawl to scrape the site.
- [X] Extract the following fields:
  - [X] Company name
  - [X] Description / what they do (Mission)
  - [X] Location
  - [X] Inferred sector tags
- [X] Display the extracted data in the UI (`HeroSection.tsx`).
- [X] Allow users to edit the extracted fields directly in the UI if incorrect or "Not Found".

**Next Steps**

- [ ] Implement Section 3: Match Grants from Supabase using the extracted (and potentially user-corrected) data.

---

## Section 2 – Generate Search Query (Potentially Deprecated/Simplified)

*Note: Depending on the Supabase query method (e.g., direct keyword/vector search based on extracted fields), explicit query generation might be less critical. Re-evaluate need after Section 3 implementation.*

**Todo**

- [ ] Send scraped/confirmed data to LLM (If needed for complex query generation).
- [ ] Generate natural language or structured query for grant lookup (If needed).
  - e.g., `"Public grants for an Australian crypto startup focused on infrastructure"`

---

## Section 3 – Match Grants from Supabase

**Completed (Backend Setup)**

- ✅ Enabled `pgvector` extension
- ✅ Created `funding` table with structured fields and `embedding vector(1536)` column
- ✅ Created `ivfflat` index on `embedding` for fast vector similarity search

**Todo**

- [ ] Implement API endpoint (e.g., `/api/find-grants`) that takes the extracted data as input.
- [ ] Query `grants` table in Supabase using:
  - [ ] SQL `ILIKE` keyword match on tags/title/description based on extracted `company_name`, `mission`, `location`, and `tags`.
  - [ ] (Optional) pgvector similarity search on embedded descriptions.
- [ ] Return top 3 matched grants with:
  - [ ] Title
  - [ ] Region
  - [ ] Max funding amount
  - [ ] 1-line summary

---

## Section 4 – Display and CTA

**Todo**

- [ ] Once Section 3 is implemented, render 3 grant result cards in the UI below the extracted data.
- [ ] Each card has a **"Find out more"** button.
- [ ] On click, route user to `/signup` for onboarding.
