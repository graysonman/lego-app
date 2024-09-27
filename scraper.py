import requests
from bs4 import BeautifulSoup
import psycopg2
import urllib.parse as up

# Database connection string
DB_URL = "postgres://default:IPMCW8NH6iRa@ep-lucky-hall-46830104.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
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
    print("failed to connect")
    cursor = conn.cursor()
    
    cursor.execute(
        """
        INSERT INTO Lego (id, name, piece, img)
        VALUES (%s, %s, %s, %s)
        """,
        (set_number, name, piece_count, image_url)
    )
    
    conn.commit()
    cursor.close()
    conn.close()

# Function to scrape LEGO Star Wars sets
current_page_url = url  # Initial URL
while current_page_url:
    response = requests.get(current_page_url)
    if response.status_code != 200:
        print(f"Failed to retrieve page with status code {response.status_code}")
        break

    soup = BeautifulSoup(response.content, 'html.parser')
    sets = soup.find_all('div', class_='product-card')

    for set_item in sets:
        set_number = set_item['data-set-number']
        name = set_item.find('h2').text.strip()
        image_url = set_item.find('img')['src']
        piece_count = int(set_item.find('span', class_='pieces').text.strip())
        print(f"Adding: {set_number}, {name}, {piece_count}, {image_url}")
        insert_data(set_number, name, piece_count, image_url)

    next_page = soup.find('a', {'data-test': 'pagination-next'})
    if next_page and 'href' in next_page.attrs:
        next_page_url = next_page['href']
        current_page_url = f'{url}{next_page_url}'
    else:
        current_page_url = None  # No more pages


if __name__ == "__main__":
    scrape_star_wars_sets()
