import numpy as np
import pandas as pd

rng = np.random.default_rng(42)

facilities = {
    "Central Library": 80,
    "Campus Cafeteria": 120,
    "Administration Block": 35,
    "Main Academic Block": 150,
    "Medical Center": 20,
    "Hostel Block A": 100,
}

rows = []

for _ in range(2000):
    facility = rng.choice(list(facilities.keys()))
    day_of_week = int(rng.integers(0, 7))
    hour = int(rng.integers(7, 22))
    previous_occupancy = int(rng.integers(0, facilities[facility] + 1))
    event = int(rng.choice([0, 1], p=[0.9, 0.1]))

    baseline = facilities[facility]

    if 9 <= hour <= 12:
        time_factor = 0.75
    elif 13 <= hour <= 16:
        time_factor = 0.9
    elif 17 <= hour <= 19:
        time_factor = 0.65
    else:
        time_factor = 0.3

    weekend_factor = 0.7 if day_of_week >= 5 else 1.0
    event_factor = 1.25 if event else 1.0

    predicted_pattern = (
        baseline
        * time_factor
        * weekend_factor
        * event_factor
        * 0.65
        + previous_occupancy * 0.35
    )

    actual_occupancy = int(
        np.clip(
            predicted_pattern + rng.normal(0, 5),
            0,
            baseline
        )
    )

    rows.append({
        "day_of_week": day_of_week,
        "hour": hour,
        "facility": facility,
        "previous_occupancy": previous_occupancy,
        "event": event,
        "occupancy": actual_occupancy,
    })

df = pd.DataFrame(rows)
df.to_csv("data/crowd_demo.csv", index=False)

print("Synthetic demonstration dataset created.")
print(f"Total records: {len(df)}")
print(df.head())
