# Backend - Airography

## Purpose
The backend is responsible for **aggregating, validating, and serving data** that powers the Airography platform. It connects external sources (satellite, ground, and weather) with the forecasting models and delivers structured outputs to the frontend dashboard.

## Responsibilities
- **Data integration**: Collect data from NASA TEMPO, Pandora, OpenAQ, and weather APIs.  
- **Standardization**: Convert heterogeneous inputs into a consistent format.  
- **Validation**: Cross-check satellite and ground values to flag anomalies.  
- **Forecast delivery**: Provide endpoints that serve predictions from the XGBoost models.  
- **Scalability**: Handle multiple concurrent requests while remaining lightweight for demos.  

## Tech Stack
- **Framework**: ASP.NET Core (C#)  
- **Architecture**: RESTful API design  
- **Features**: modular controllers, service-based data adapters, model inference endpoints  

## Demo Endpoints (planned)
- `/api/health` — health check  
- `/api/data/sample` — returns sample sensor data  
- `/api/forecast/no2/d1` — returns a one-day NO₂ prediction from the ML model  

---

This backend layer is designed to be minimal for the hackathon submission while still reflecting a scalable architecture for real-world deployment.
