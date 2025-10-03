# Data - Airography

## Purpose
This folder contains **sample datasets** that illustrate the structure of the inputs used by Airography.  
For privacy, licensing, and file size reasons, we do not store full NASA or third-party datasets in this repository. Instead, we provide small CSV examples so that reviewers and developers can understand the expected schema, test the workflow, and run lightweight demos.

## Sources Represented
- **NASA TEMPO** — hourly satellite measurements of pollutants (e.g., NO₂, HCHO, O₃).  
- **NASA Pandora Project** — ground-based spectrometer data for validation of satellite observations.  
- **OpenAQ** — aggregated real-time and historical ground monitor data (PM₂.₅, PM₁₀, NO₂, SO₂, CO, O₃).  

## What the Sample Files Show
- `sample-tempo-data.csv`  
  Example rows of TEMPO satellite output. Includes time, location (lat/lon), and pollutant concentrations.  

- `sample-pandora-data.csv`  
  Illustrates how Pandora ground station measurements are represented. Contains station ID, timestamps, and key pollutant values.  

- `sample-openaq-data.csv`  
  Demonstrates OpenAQ air quality observations. Shows typical pollutants with units aligned to standard reporting (µg/m³ or ppb, depending on parameter).  

## How They Are Used
1. **Data Integration**  
   The backend API ingests data from multiple sources (TEMPO, Pandora, OpenAQ, weather APIs).  

2. **Feature Engineering**  
   Key features (e.g., lagged pollutant values, weather conditions, temporal markers) are extracted from these inputs.  

3. **Forecasting**  
   The processed features feed into **XGBoost regressors**, which generate pollutant forecasts up to seven days ahead.  

4. **Validation**  
   Ground data (Pandora, OpenAQ) is cross-checked against satellite observations (TEMPO) to ensure consistency and reliability.  

## Notes
- The CSVs here are **tiny, illustrative samples only**. They are not sufficient for training models.  
- Full-scale datasets can be accessed directly from the official providers:  
  - [NASA TEMPO](https://tempo.si.edu/)  
  - [NASA Pandora Project](https://pandora.gsfc.nasa.gov/)  
  - [OpenAQ](https://openaq.org/)  

---

By including structured examples here, we make it easy for others to understand how the system works without requiring large data downloads. This ensures transparency, reproducibility, and accessibility for hackathon review.
