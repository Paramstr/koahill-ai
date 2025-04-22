# PRD: Instant Grant Match via Website URL

**Goal**  
Let users input their website and instantly see 3 relevant grants using scraping + LLM-based search on Supabase.

---

## Section 1 – Scrape Website Metadata

**Todo**
- [ ] Accept user input for website URL (HeroSection.tsx we take input)
- [ ] Call external API to scrape site (e.g. BrowseAI, Diffbot, Puppeteer service)
- [ ] Extract the following fields:
  - [ ] Company name
  - [ ] Description / what they do 
  - [ ] Location
  - [ ] Inferred sector tag (e.g., "AI", "Crypto", "Biotech", etc.)
- [ ] If any field is missing, expose manual input fields for the user to fill

---

## Section 2 – Generate Search Query

**Todo**
- [ ] Send scraped/confirmed data to LLM
- [ ] Generate natural language or structured query for grant lookup
  - e.g., `"Public grants for an Australian crypto startup focused on infrastructure"`

---

## Section 3 – Match Grants from Supabase

**Todo**
- [ ] Query `grants` table in Supabase using:
  - [ ] SQL `ILIKE` keyword match on tags/title/description
  - [ ] (Optional) pgvector similarity search on embedded descriptions
- [ ] Return top 3 matched grants with:
  - [ ] Title
  - [ ] Region
  - [ ] Max funding amount
  - [ ] 1-line summary

---

## Section 4 – Display and CTA

**Todo**
- [ ] Render 3 grant result cards in the UI
- [ ] Each card has a **“Find out more”** button
- [ ] On click, route user to `/signup` for onboarding
