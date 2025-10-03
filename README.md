# Airography

**AI-Powered Air Quality Forecasting Platform**

Airography transforms air quality monitoring from reactive reporting to proactive protection by forecasting pollution levels up to seven days in advance using NASA TEMPO satellite data, ground station networks, and advanced machine learning.

**NASA Space Apps Challenge 2025 Submission**  
**Team:** Far from Blur  
**Challenge:** Air Quality Forecasting  

---

## Overview

Air pollution kills 4.2 million people annually, yet most communities only learn about dangerous pollution levels after exposure has occurred. Airography addresses this critical gap by providing predictive air quality intelligence that enables proactive health decisions.

Our platform integrates NASA's TEMPO satellite observations with ground-based sensor networks and weather data, processing everything through **XGBoost models** to generate accurate forecasts. The system validates data across multiple sources and delivers personalized insights through intuitive dashboards tailored to different user needs.

---

## The Problem

- **Reactive not predictive**: Most platforms only report current conditions, leaving no time to prepare.  
- **Lack of personalization**: Asthma patients, farmers, and industrial workers need different metrics and alerts.  
- **Complex data presentation**: Scientific pollutant metrics are hard to interpret without context.  

---

## Our Solution

Airography provides four core capabilities:

1. **Predictive Forecasting**  
   - 7-day forecasts of multiple pollutants using XGBoost.  
   - Short-term and medium-term predictions with uncertainty estimates.  

2. **Personalized Dashboards**  
   - Patients: alerts, inhaler reminders.  
   - Farmers: acid rain warnings.  
   - Industrial workers: toxic gas tracking.  
   - Policymakers & researchers: validated trend data.  

3. **Intuitive Visualization**  
   - 2D maps and 3D globe views.  
   - Easy-to-read heatmaps and plain-language alerts.  

4. **Multi-Source Validation**  
   - Cross-checks TEMPO with Pandora and OpenAQ.  
   - Flags inconsistencies for review.  

---

## How It Works

**Architecture Layers**  

1. **Data Integration Layer (Backend)**  
   - ASP.NET Core API  
   - Aggregates TEMPO, Pandora, OpenAQ, and weather data  

2. **Forecasting Layer (AI/ML)**  
   - **XGBoost regressors** for pollutant prediction  
   - Specialized models per parameter (NO₂, SO₂, PM₂.₅, O₃, CO, formaldehyde)  
   - Feature engineering from time, weather, and satellite-ground data  

3. **Presentation Layer (Frontend)**  
   - React-based dashboard  
   - Map visualizations, charts, and alerts  

---

## Technology Stack

- **Data Sources**: NASA TEMPO, Pandora, OpenAQ, WAQI, weather APIs  
- **Backend**: ASP.NET Core (C#), RESTful APIs  
- **Frontend**: React, MapGL, React Charts  
- **AI/ML**: Python, Pandas, Scikit-learn, **XGBoost**  

---

## Data Sources

- **NASA TEMPO**: hourly satellite air quality data  
- **NASA Pandora**: ground validation stations  
- **OpenAQ**: aggregated ground monitors  
- **Weather APIs**: wind, temperature, humidity  

---

## Impact

- **Health**: early warnings reduce asthma attacks and hospital visits  
- **Agriculture**: crop damage prevention from acid rain events  
- **Environmental justice**: empowers communities near industrial zones  
- **Science**: provides validated datasets for researchers  

---

## Team

**Far from Blur**  
- Zyad Mohammed Hamed Abdelfattah – Backend Development & API  
- Malak Sherif Abdallah El-Hamshary – ML Engineering (short-term forecasts)  
- Rowida Mohammed Reda – ML Engineering (long-term methods & validation)  
- Yomna Sabry Farouk Hendy – Data QA & validation  
- Youssef Magdy Abdelkhalek Kottb – Frontend & UX  
- Mohammed Badawy Nasr-Eldeen – Data Engineering  

---

## Documentation

- `docs/high-level-summary.md` – 150–200 word summary  
- `docs/detailed-description.md` – Detailed write-up  
- `docs/presentation.pdf` – 7-slide demo deck  
- `docs/proposal.pdf` – Original proposal  
- `models/xgboost-model.md` – Model description and training approach  

---

## Getting Started

**Clone the repository**  
```bash
git clone https://github.com/[your-username]/airography-nasa-space-apps-2025.git
cd airography-nasa-space-apps-2025
