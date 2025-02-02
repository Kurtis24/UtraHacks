import requests
from bs4 import BeautifulSoup
import csv

def scrape_website(url, output_file):
    try:
        # Fetch the website content
        response = requests.get(url)
        response.raise_for_status()  # Raise error for bad responses

        # Parse the HTML
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract data (Modify this section based on the webpage structure)
        data = []
        count = 1
        for item in soup.find_all('div', class_='data-class'):  # Adjust selector accordingly
            name = item.find('h2').text.strip() if item.find('h2') else 'N/A'
            hr = int(item.find('span', class_='hr').text.strip()) if item.find('span', class_='hr') else 0
            age = int(item.find('span', class_='age').text.strip()) if item.find('span', class_='age') else 0
            bed = int(item.find('span', class_='bed').text.strip()) if item.find('span', class_='bed') else 0
            last_checked = item.find('span', class_='last-checked').text.strip() if item.find('span', class_='last-checked') else 'N/A'
            status = 'active' if 30 < hr < 120 else 'inactive'
            data.append([count, name, hr, age, bed, last_checked, status])
            count += 1

        # Save to CSV
        with open(output_file, 'w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(['ID', 'Name', 'HR', 'Age', 'Bed', 'LastChecked', 'Status'])  # Header row
            writer.writerows(data)

        print(f"Data successfully saved to {output_file}")
    except Exception as e:
        print(f"Error: {e}")

# Example usage
scrape_website('https://example.com', './Frontend/my-react-app/src/Data/output.csv')
