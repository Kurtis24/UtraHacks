import requests
from bs4 import BeautifulSoup
from datetime import datetime
import csv
from flask import Flask, send_file, jsonify
from flask_cors import CORS

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
            name = f'Name {count}'
            hr = int(item.find('pre', class_='hr').text.strip()) if item.find('pre', class_='hr') else 120
            age = 18
            bed = f'Bed {count}'
            last_checked = 'now = datetime.now()'
            status = 'active' if 30 < hr < 120 else 'inactive'
            data.append([count, hr, age, bed, last_checked, status])
            count += 1

        # Save to CSV
        with open(output_file, 'w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(['ID', 'HR', 'Age', 'Bed', 'LastChecked', 'Status'])  # Header row
            writer.writerows(data)

        print(f"Data successfully saved to {output_file}")
    except Exception as e:
        print(f"Error: {e}")

# Flask API to serve the CSV file and JSON data
app = Flask(__name__)
CORS(app)

@app.route('/download_csv', methods=['GET'])
def download_csv():
    return send_file('output.csv', as_attachment=True)

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        with open('output.csv', newline='', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            data = [row for row in reader]
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    scrape_website('http://172.20.10.10:8080/GET_HEART_RATES', './Frontend/my-react-app/src/Data/output.csv')
    app.run(debug=True)
