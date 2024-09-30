import csv
import requests
from bs4 import BeautifulSoup
import psycopg2
import urllib.parse as up

# Database connection string
DB_URL = "replace with your database url"
url = 'https://www.lego.com/en-us/themes/star-wars'

# Function to connect to the database
def connect_db():
    try:
        up.uses_netloc.append("postgres")
        url = up.urlparse(DB_URL)

        conn = psycopg2.connect(
            database=url.path[1:],  # Removing the leading '/'
            user=url.username,
            password=url.password,
            host=url.hostname,
            port=url.port,
            sslmode='require'
        )
        return conn
    except Exception as e:
        print(f"Failed to connect to the database: {e}")
        return None

# Function to insert data into the database
def insert_data(set_number, name, piece_count, image_url):
    print("connecting to database")
    conn = connect_db()
    if conn is None:
        print("Failed to connect to the database.")
        return

    cursor = conn.cursor()
    
    cursor.execute(
        """
        INSERT INTO "Lego" (id, name, piece, img)
        VALUES (%s, %s, %s, %s)
        """,
        (set_number, name, piece_count, image_url)
    )
    
    conn.commit()
    cursor.close()
    conn.close()
    print("Updated Database")

# Function to read data from CSV and upload to the database
def upload_data_from_csv(csv_file_path):
    with open(csv_file_path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            set_number = row['set_number']
            name = row['name']
            piece_count = int(row['piece_count'])
            image_url = row.get('image_url', '')  # Default to empty string if image_url is not in CSV
            insert_data(set_number, name, piece_count, image_url)

# Example usage
csv_file_path = r'C:\react\blogr-nextjs-prisma\starwarsSets2.csv'
upload_data_from_csv(csv_file_path)