from firecrawl import FirecrawlApp, ScrapeOptions
from pydantic import BaseModel, Field
import time


app = FirecrawlApp(api_key="fc-cbae004ceed347069c005726f7dab307")

# Crawl a website:
class ExtractSchema(BaseModel):
    company_name: str = Field(description="The legal or brand name of the company.")
    mission: str = Field(description="A brief description of the company's mission, purpose, or what it does.")
    location: str = Field(description="The primary physical location or headquarters of the company.")
    tags: list[str] = Field(description="Relevant tags or keywords describing the company")

start_time = time.time()

extract_job = app.extract([
  'https://www.sync.so/*',
],
    prompt='Extract the company name, its mission or purpose, its primary location, and relevant tags or keywords about the company.',
    schema=ExtractSchema.model_json_schema())

end_time = time.time()
duration = end_time - start_time

# Print the extracted data in a styled way
# Access the data via the .data attribute
print(f"Company Name: {extract_job.data['company_name']}")
print(f"Mission: {extract_job.data['mission']}")
print(f"Location: {extract_job.data['location']}")
print(f"Tags: {', '.join(extract_job.data['tags'])}")

print(f"\nExtraction took: {duration:.2f} seconds")