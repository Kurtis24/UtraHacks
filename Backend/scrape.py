import urllib.request
from datetime import datetime

import urllib.request
import csv
from datetime import datetime

def main():
    link = 'http://172.20.10.10:8080/GET_HEART_RATES'
    
    # Fetch data from the API
    with urllib.request.urlopen(link) as f:
        myfile = f.read().decode('utf-8')  # Decode bytes to string

    # Process data (assuming heart rates are comma-separated in the response)
    heart_rates = myfile.strip().split(',')  # Adjust this based on your API response format
    
    data = []
    
    for count, hr in enumerate(heart_rates, start=1):  
        try:
            HR = int(hr.strip())  # Convert to integer
            age = 18
            bed = f'Bed {count}'
            last_checked = datetime.now().strftime('%H:%M:%S')  # Format timestamp
            status = 'active' if 30 < HR < 120 else 'inactive'
            data.append([count, HR, age, bed, last_checked, status])
        except ValueError:
            print(f"Skipping invalid HR value: {hr}")

    # Save to CSV (open file once, outside the loop)
    with open("./Frontend/my-react-app/src/Data/output.csv", 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['ID', 'HR', 'Age', 'Bed', 'LastChecked', 'Status'])  # Header row
        writer.writerows(data)
    
        
    

if __name__ == '__main__':
    main()
