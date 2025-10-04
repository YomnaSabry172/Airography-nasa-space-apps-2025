import pandas as pd
import numpy as np
import modal
import fastapi
import pyproj
import os
import xarray as xr
import pyrsig
import pycno
import matplotlib.pyplot as plt
from fastapi.middleware.cors import CORSMiddleware
image = modal.Image.debian_slim().pip_install("fastapi[standard]", "pyrsig", "numpy", "pandas", "pyproj", "pycno", "netcdf4", "matplotlib")
vol = modal.Volume.from_name("mainVolume")
fastapi_app = fastapi.FastAPI()

fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # allow all HTTP methods
    allow_headers=["*"],  # allow all headers
)

app = modal.App("nasa-data-retrieval")
@app.function(image=image, volumes={"/data" : vol})
@modal.fastapi_endpoint(method="POST"
                        )
def airnow_endpoint(
        longitude: float,
        latitude: float,
        date: str
):
    def GetLocationData(latitude: float, longitude: float, date: str):
        bbox = (longitude - 1, latitude - 1, longitude + 1, latitude + 1)
        directory = "/data/"

        # Loop through all files in the directory
        for filename in os.listdir(directory):
            file_path = os.path.join(directory, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.remove(file_path)  # Remove file or symlink
                elif os.path.isdir(file_path):
                    # If you also want to remove subfolders
                    import shutil
                    shutil.rmtree(file_path)
            except Exception as e:
                print(f"Failed to delete {file_path}. Reason: {e}")
        api = pyrsig.RsigApi(bdate=date, bbox=bbox, workdir="/data", gridfit=True)
        # api_key = getpass.getpass('Enter TEMPO key (anonymous if unknown):')
        api_key = "eyJ0eXAiOiJKV1QiLCJvcmlnaW4iOiJFYXJ0aGRhdGEgTG9naW4iLCJzaWciOiJlZGxqd3RwdWJrZXlfb3BzIiwiYWxnIjoiUlMyNTYifQ.eyJ0eXBlIjoiVXNlciIsInVpZCI6ImFobWVkX2V6emF0IiwiZXhwIjoxNzY0NjgwNTQzLCJpYXQiOjE3NTk0OTY1NDMsImlzcyI6Imh0dHBzOi8vdXJzLmVhcnRoZGF0YS5uYXNhLmdvdiIsImlkZW50aXR5X3Byb3ZpZGVyIjoiZWRsX29wcyIsImFjciI6ImVkbCIsImFzc3VyYW5jZV9sZXZlbCI6M30.IMHG02NhfCM0uIW_Vd4FZ0yglcIi9Gx9IF1p_I0yO6bAUf2vz5ngA8GIBAHHEANHT3_nkBNFaFIRdqaYtpkm8mDDiA5nMoze7QcPr9JwPkQFFbZtpSlnr2UIBJ2av5wq3b9kQWGcnYa2D90ZxXBxQo8UcQwdtPvWeIB6l7qnLXCsbdksrrRdksOpm48tQRpZCkWyi9QQrpYgfNF9MLtW8iKDq4UMgrkf60jc7y_xcT_lydzJwU2KixS8IitLMu2TRzTMy3lWvs1y8cpmd4DtvutRgYC1cdlVJfnWtwCcPiquaCa9fHUtj_RgewrG_tR7HRbp_PhCdCVzESCqr1vK1w"  # using public, so using anonymous
        api.tempo_kw["api_key"] = api_key
        descdf = api.descriptions()

        keys_of_data = [
            "airnow.pm25",
            "airnow.pm10",
            "airnow.ozone",
            "airnow.no2",
        ]

        def haversine(lat1, lon1, lat2, lon2):
            R = 6371  # Earth radius in km
            phi1, phi2 = np.radians(lat1), np.radians(lat2)
            dphi = np.radians(lat2 - lat1)
            dlambda = np.radians(lon2 - lon1)

            a = np.sin(dphi / 2.0) ** 2 + np.cos(phi1) * np.cos(phi2) * np.sin(dlambda / 2.0) ** 2
            return 2 * R * np.arcsin(np.sqrt(a))

        dfs = []
        try:
            for data_key in keys_of_data:
                df = api.to_dataframe(data_key, backend="xdr")
                df = df.dropna()
                df["distance"] = haversine(latitude, longitude, df["LATITUDE(deg)"], df["LONGITUDE(deg)"])
                df_sorted = df.sort_values("distance").reset_index(drop=True)
                df_sorted = df_sorted[(df_sorted["LONGITUDE(deg)"] == df_sorted.iloc[0]["LONGITUDE(deg)"]) & (
                        df_sorted["LATITUDE(deg)"] == df_sorted.iloc[0]["LATITUDE(deg)"])]
                df_sorted = df_sorted.drop(["distance"], axis=1)
                df_sorted = df_sorted.sort_values("Timestamp(UTC)").reset_index(drop=True)
                pollutant_col = [c for c in df.columns if
                                 c not in ["Timestamp(UTC)", "LONGITUDE(deg)", "LATITUDE(deg)", "STATION(-)", "SITE_NAME",
                                           "ELEVATION(m)", "NOTE"]][0]
                df_sorted = df_sorted[["Timestamp(UTC)", pollutant_col]]
                df_sorted["Timestamp(UTC)"] = pd.to_datetime(df_sorted["Timestamp(UTC)"], utc=True)
                dfs.append(df_sorted)
        except:
            currDate = pd.to_datetime(date)  # parse string to datetime
            previous_day = currDate - pd.Timedelta(days=1)
            GetLocationData(latitude, longitude, previous_day.strftime("%Y-%m-%d"))
            return
        df_merged = dfs[0]
        for d in dfs[1:]:
            df_merged = pd.merge(df_merged, d, on="Timestamp(UTC)", how="outer")

        # Add fixed latitude & longitude
        df_merged["LATITUDE"] = latitude
        df_merged["LONGITUDE"] = longitude
        df_merged = (
            df_merged
            .groupby("Timestamp(UTC)", as_index=False)
            .mean(numeric_only=True)  # average only numeric columns
        )

        # Re-add fixed latitude and longitude
        df_merged["LATITUDE"] = latitude
        df_merged["LONGITUDE"] = longitude

        df_merged.to_csv("/data/data_downloaded.csv")
    # Call your method to generate the CSV
    GetLocationData(latitude, longitude, date)

    # Read the file content
    with open("/data/data_downloaded.csv", "rb") as f:
        csv_content = f.read()

    # Return as response with proper headers
    return fastapi.Response(
        content=csv_content,
        media_type="text/csv",
        headers={
            "Content-Disposition": "attachment; filename=data_downloaded.csv"
        }
    )

@app.function(image=image, volumes={"/data" : vol})
@modal.fastapi_endpoint(method="POST")
def pandora_endpoint(
        longitude: float,
        latitude: float,
        date: str
):
    def GetLocationData(latitude: float, longitude: float, date: str):
        bbox = (longitude - 1, latitude - 1, longitude + 1, latitude + 1)
        directory = "/data/"

        # Loop through all files in the directory
        for filename in os.listdir(directory):
            file_path = os.path.join(directory, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.remove(file_path)  # Remove file or symlink
                elif os.path.isdir(file_path):
                    # If you also want to remove subfolders
                    import shutil
                    shutil.rmtree(file_path)
            except Exception as e:
                print(f"Failed to delete {file_path}. Reason: {e}")
        api = pyrsig.RsigApi(bdate=date, bbox=bbox, workdir="/data", gridfit=True)
        # api_key = getpass.getpass('Enter TEMPO key (anonymous if unknown):')
        api_key = "eyJ0eXAiOiJKV1QiLCJvcmlnaW4iOiJFYXJ0aGRhdGEgTG9naW4iLCJzaWciOiJlZGxqd3RwdWJrZXlfb3BzIiwiYWxnIjoiUlMyNTYifQ.eyJ0eXBlIjoiVXNlciIsInVpZCI6ImFobWVkX2V6emF0IiwiZXhwIjoxNzY0NjgwNTQzLCJpYXQiOjE3NTk0OTY1NDMsImlzcyI6Imh0dHBzOi8vdXJzLmVhcnRoZGF0YS5uYXNhLmdvdiIsImlkZW50aXR5X3Byb3ZpZGVyIjoiZWRsX29wcyIsImFjciI6ImVkbCIsImFzc3VyYW5jZV9sZXZlbCI6M30.IMHG02NhfCM0uIW_Vd4FZ0yglcIi9Gx9IF1p_I0yO6bAUf2vz5ngA8GIBAHHEANHT3_nkBNFaFIRdqaYtpkm8mDDiA5nMoze7QcPr9JwPkQFFbZtpSlnr2UIBJ2av5wq3b9kQWGcnYa2D90ZxXBxQo8UcQwdtPvWeIB6l7qnLXCsbdksrrRdksOpm48tQRpZCkWyi9QQrpYgfNF9MLtW8iKDq4UMgrkf60jc7y_xcT_lydzJwU2KixS8IitLMu2TRzTMy3lWvs1y8cpmd4DtvutRgYC1cdlVJfnWtwCcPiquaCa9fHUtj_RgewrG_tR7HRbp_PhCdCVzESCqr1vK1w"  # using public, so using anonymous
        api.tempo_kw["api_key"] = api_key
        descdf = api.descriptions()

        keys_of_data = [
            "pandora.L2_rsus1p1_8.sulfur_dioxide_vertical_column_amount"
        ]

        def haversine(lat1, lon1, lat2, lon2):
            R = 6371  # Earth radius in km
            phi1, phi2 = np.radians(lat1), np.radians(lat2)
            dphi = np.radians(lat2 - lat1)
            dlambda = np.radians(lon2 - lon1)

            a = np.sin(dphi / 2.0) ** 2 + np.cos(phi1) * np.cos(phi2) * np.sin(dlambda / 2.0) ** 2
            return 2 * R * np.arcsin(np.sqrt(a))

        dfs = []
        try:
            for data_key in keys_of_data:
                df = api.to_dataframe(data_key, backend="xdr")
                df = df.dropna()
                df["distance"] = haversine(latitude, longitude, df["LATITUDE(deg)"], df["LONGITUDE(deg)"])
                df_sorted = df.sort_values("distance").reset_index(drop=True)
                df_sorted = df_sorted[(df_sorted["LONGITUDE(deg)"] == df_sorted.iloc[0]["LONGITUDE(deg)"]) & (
                        df_sorted["LATITUDE(deg)"] == df_sorted.iloc[0]["LATITUDE(deg)"])]
                df_sorted = df_sorted.drop(["distance"], axis=1)
                df_sorted = df_sorted.sort_values("Timestamp(UTC)").reset_index(drop=True)
                pollutant_col = [c for c in df.columns if
                                 c not in ["Timestamp(UTC)", "LONGITUDE(deg)", "LATITUDE(deg)", "STATION(-)", "SITE_NAME",
                                           "ELEVATION(m)", "NOTE"]][0]
                df_sorted = df_sorted[["Timestamp(UTC)", pollutant_col]]
                df_sorted[pollutant_col] = df_sorted[pollutant_col] / (2.46 * 1e16)
                df_sorted["Timestamp(UTC)"] = pd.to_datetime(df_sorted["Timestamp(UTC)"], utc=True)
                if data_key == "pandora.L2_rsus1p1_8.direct_sulfur_dioxide_air_mass_factor" or data_key == "pandora.L2_rsus1p1_8.sulfur_dioxide_vertical_column_amount":
                    df_sorted["Timestamp(UTC)"] = df_sorted["Timestamp(UTC)"].dt.floor("H")
                    df_sorted = df_sorted.groupby("Timestamp(UTC)").mean(numeric_only=True).reset_index()
                dfs.append(df_sorted)
        except:
            currDate = pd.to_datetime(date)  # parse string to datetime
            previous_day = currDate - pd.Timedelta(days=1)
            GetLocationData(latitude, longitude, previous_day.strftime("%Y-%m-%d"))
            return
        df_merged = dfs[0]
        for d in dfs[1:]:
            df_merged = pd.merge(df_merged, d, on="Timestamp(UTC)", how="outer")

        # Add fixed latitude & longitude
        df_merged["LATITUDE"] = latitude
        df_merged["LONGITUDE"] = longitude
        df_merged = (
            df_merged
            .groupby("Timestamp(UTC)", as_index=False)
            .mean(numeric_only=True)  # average only numeric columns
        )

        # Re-add fixed latitude and longitude
        df_merged["LATITUDE"] = latitude
        df_merged["LONGITUDE"] = longitude

        df_merged.to_csv("/data/data_downloaded.csv")
    # Call your method to generate the CSV
    GetLocationData(latitude, longitude, date)

    # Read the file content
    with open("/data/data_downloaded.csv", "rb") as f:
        csv_content = f.read()

    # Return as response with proper headers
    return fastapi.Response(
        content=csv_content,
        media_type="text/csv",
        headers={
            "Content-Disposition": "attachment; filename=data_downloaded.csv"
        }
    )