import os
import openai
import psycopg2
import numpy as np
from dotenv import load_dotenv
from psycopg2.extras import Json

# Load environment variables
load_dotenv()
SUPABASE_DB_URL = os.getenv("SUPABASE_DB_URL")  # e.g. postgres://user:pass@host:port/db
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

openai.api_key = OPENAI_API_KEY

# Connect to Supabase (PostgreSQL backend)
conn = psycopg2.connect(SUPABASE_DB_URL)
cur = conn.cursor()

# Fetch entries without embedding
cur.execute("""
    SELECT id, description FROM funding
    WHERE embedding IS NULL
""")
rows = cur.fetchall()

def get_embedding(text):
    response = openai.Embedding.create(
        model="text-embedding-3-small",
        input=text,
    )
    return response['data'][0]['embedding']

# Update embeddings
for row in rows:
    funding_id, description = row
    if not description:
        continue
    embedding = get_embedding(description)
    cur.execute("""
        UPDATE funding
        SET embedding = %s
        WHERE id = %s
    """, (embedding, funding_id))
    print(f"✅ Embedded and updated funding ID: {funding_id}")

conn.commit()
cur.close()
conn.close()
print("🔄 Embedding update complete.")
