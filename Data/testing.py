import pandas as pd
import random

# Generate random sample data
data = [
    {"name": f"Patient {i+1}", "time": f"{random.randint(1, 12)}:{random.randint(10, 59)} {random.choice(['AM', 'PM'])}"}
    for i in range(10)
]

# Save to CSV
df = pd.DataFrame(data)
df.to_csv("last_checked.csv", index=False)

print("CSV file 'last_checked.csv' created successfully.")
