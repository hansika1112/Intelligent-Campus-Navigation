import os
import joblib
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, root_mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline

DATA_PATH = "data/crowd_demo.csv"
MODEL_PATH = "models/random_forest_crowd.joblib"

if not os.path.exists(DATA_PATH):
    raise FileNotFoundError(
        "Dataset not found. Run: python data/generate_demo_data.py"
    )

df = pd.read_csv(DATA_PATH)

features = [
    "day_of_week",
    "hour",
    "facility",
    "previous_occupancy",
    "event",
]

X = df[features]
y = df["occupancy"]

preprocessor = ColumnTransformer(
    transformers=[
        ("facility", OneHotEncoder(handle_unknown="ignore"), ["facility"]),
    ],
    remainder="passthrough",
)

pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("model", RandomForestRegressor(
        n_estimators=150,
        max_depth=12,
        random_state=42,
        n_jobs=-1,
    )),
])

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

pipeline.fit(X_train, y_train)

predictions = pipeline.predict(X_test)

mae = mean_absolute_error(y_test, predictions)
rmse = root_mean_squared_error(y_test, predictions)

os.makedirs("models", exist_ok=True)

joblib.dump(pipeline, MODEL_PATH)

print("Random Forest model trained successfully.")
print(f"Training records: {len(X_train)}")
print(f"Testing records: {len(X_test)}")
print(f"MAE: {mae:.2f}")
print(f"RMSE: {rmse:.2f}")
print(f"Model saved to: {MODEL_PATH}")
print("Note: Metrics are based on synthetic demonstration data.")
