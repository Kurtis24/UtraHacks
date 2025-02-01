import pandas as pd

# Generate random sample data
data = [
    {"name": f"Patient {i+1}", "time": f"{random.randint(1, 12)}:{random.randint(10, 59)} {random.choice(['AM', 'PM'])}"}
    for i in range(10)
]

# Convert to DataFrame and save as CSV
df = pd.DataFrame(data)
df.to_csv("last_checked.csv", index=False)