import requests
from bs4 import BeautifulSoup
import csv
import re

# Function to scrape image URLs from a given page URL
def scrape_image_urls(soup):
    sets = soup.find_all('article', class_='set')
    
    image_urls = []
    for set in sets:
        img_tag = set.find('img')
        if img_tag:
            image_url = img_tag['src']
            image_urls.append(image_url)
    
    return image_urls

# Function to get the next page URL
def get_next_page_url(current_url):
    if current_url == 'https://brickset.com/sets/theme-Star-Wars':
        return 'https://brickset.com/sets/theme-Star-Wars/page-2'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-2':
        return 'https://brickset.com/sets/theme-Star-Wars/page-3'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-3':
        return 'https://brickset.com/sets/theme-Star-Wars/page-4'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-4':
        return 'https://brickset.com/sets/theme-Star-Wars/page-5'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-5':
        return 'https://brickset.com/sets/theme-Star-Wars/page-6'   
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-6':
        return 'https://brickset.com/sets/theme-Star-Wars/page-7'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-7':
        return 'https://brickset.com/sets/theme-Star-Wars/page-8'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-8':
        return 'https://brickset.com/sets/theme-Star-Wars/page-9'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-9':
        return 'https://brickset.com/sets/theme-Star-Wars/page-10'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-10':
        return 'https://brickset.com/sets/theme-Star-Wars/page-11'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-11':
        return 'https://brickset.com/sets/theme-Star-Wars/page-12'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-12':
        return 'https://brickset.com/sets/theme-Star-Wars/page-13'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-13':
        return 'https://brickset.com/sets/theme-Star-Wars/page-14'  
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-14':
        return 'https://brickset.com/sets/theme-Star-Wars/page-15'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-15':
        return 'https://brickset.com/sets/theme-Star-Wars/page-16'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-16':
        return 'https://brickset.com/sets/theme-Star-Wars/page-17'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-17':
        return 'https://brickset.com/sets/theme-Star-Wars/page-18'      
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-18':
        return 'https://brickset.com/sets/theme-Star-Wars/page-19'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-19':
        return 'https://brickset.com/sets/theme-Star-Wars/page-20'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-20':
        return 'https://brickset.com/sets/theme-Star-Wars/page-21'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-21':
        return 'https://brickset.com/sets/theme-Star-Wars/page-22'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-22':
        return 'https://brickset.com/sets/theme-Star-Wars/page-23'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-23':
        return 'https://brickset.com/sets/theme-Star-Wars/page-24'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-24':
        return 'https://brickset.com/sets/theme-Star-Wars/page-25'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-25':
        return 'https://brickset.com/sets/theme-Star-Wars/page-26'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-26':
        return 'https://brickset.com/sets/theme-Star-Wars/page-27'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-27':
        return 'https://brickset.com/sets/theme-Star-Wars/page-28' 
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-28':
        return 'https://brickset.com/sets/theme-Star-Wars/page-29'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-29':
        return 'https://brickset.com/sets/theme-Star-Wars/page-30'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-30':
        return 'https://brickset.com/sets/theme-Star-Wars/page-31'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-31':
        return 'https://brickset.com/sets/theme-Star-Wars/page-32'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-32':
        return 'https://brickset.com/sets/theme-Star-Wars/page-33'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-33':
        return 'https://brickset.com/sets/theme-Star-Wars/page-34'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-34':
        return 'https://brickset.com/sets/theme-Star-Wars/page-35'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-35':
        return 'https://brickset.com/sets/theme-Star-Wars/page-36'
    if current_url == 'https://brickset.com/sets/theme-Star-Wars/page-36':
        return 'https://brickset.com/sets/theme-Star-Wars/page-37'  
    return None
        

# Function to scrape all pages and collect image URLs
def scrape_all_pages(start_url):
    current_url = start_url
    all_image_urls = []
    
    while current_url:
        print(f"Scraping {current_url}")
        response = requests.get(current_url)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        image_urls = scrape_image_urls(soup)
        all_image_urls.extend(image_urls)

        next_page_url = get_next_page_url(current_url)
        if next_page_url:
            current_url = next_page_url
        else:
            current_url = None
    
    return all_image_urls

# Function to write image URLs to a CSV file
def write_to_csv(image_urls, csv_file_path):
    with open(csv_file_path, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['image_url'])
        for url in image_urls:
            writer.writerow([url])

# Main function
def main():
    start_url = 'https://brickset.com/sets/theme-Star-Wars'
    csv_file_path = 'starwarsSets.csv'
    
    image_urls = scrape_all_pages(start_url)
    write_to_csv(image_urls, csv_file_path)
    print(f"Scraped {len(image_urls)} image URLs and saved to {csv_file_path}")

if __name__ == '__main__':
    main()