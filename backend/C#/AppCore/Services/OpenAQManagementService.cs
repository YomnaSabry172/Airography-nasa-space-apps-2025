using AppCore.DTOs;
using AppCore.JSONTemplates;
using System.Text.Json;

namespace AppCore.Services
{
    public class OpenAQManagementService
    {
        public async Task<double> GetSensorValue(int sensorId)
        {
            HttpClient httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("X-API-Key", "adb0498d221e7343797959d9c3c0b39dff08dfc55a76a29b84e46b2a85e10b11");
            string requestURL = $"https://api.openaq.org/v3/sensors/{sensorId}/measurements?limit=1000";
            var response = await httpClient.GetAsync(requestURL);
            string responseBody = await response.Content.ReadAsStringAsync();
            var jsonResponse = JsonSerializer.Deserialize<OpenAQSensorResponse>(responseBody);
            if (jsonResponse.Results.Count == 0)
                return -1.1995;
            List<MeasurementResult> sortedResults = jsonResponse.Results.OrderBy(measrumentResult => (DateTime.UtcNow - measrumentResult.Period.DatetimeFrom.Utc).Seconds).ToList();
            return sortedResults.First().Value;
        }
        public async Task<AirDataDTO> GetOpenAQDataForLocation(float latitude, float longitude)
        {

            HttpClient httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("X-API-Key", "adb0498d221e7343797959d9c3c0b39dff08dfc55a76a29b84e46b2a85e10b11");
            string requestURL = $"https://api.openaq.org/v3/locations?bbox={longitude - 1},{latitude - 1},{longitude + 1},{latitude + 1}&limit=1000";
            var response = await httpClient.GetAsync(requestURL);
            string responseBody = await response.Content.ReadAsStringAsync();
            var jsonResponse = JsonSerializer.Deserialize<OpenAQAPIResponse>(responseBody);
            if(jsonResponse.Results.Count == 0)
            {
                return null;
            }
            int topResultsSelection;
            IEnumerable<Result> sortedResults = jsonResponse.Results.OrderByDescending(result => result.Sensors.Count);
            int maxSensors = sortedResults.First().Sensors.Count;
            if (maxSensors > 10)
                topResultsSelection = 10;
            else
                topResultsSelection = maxSensors;
            sortedResults = sortedResults.Take(topResultsSelection);
            sortedResults = sortedResults.OrderBy(result => Math.Abs(result.Coordinates.Latitude - latitude) + Math.Abs(result.Coordinates.Longitude - longitude));
            Result bestOpenAPIResult = sortedResults.First();
            AirDataDTO airDataDTO = new AirDataDTO();
            foreach (Sensor sensor in bestOpenAPIResult.Sensors)
            {
                int sensorId = sensor.Id;
                double sensorValue = await GetSensorValue(sensorId);
                    if(sensor.Parameter.Name == "no")
                {
                    airDataDTO.NO = sensorValue;
                } 
                else if (sensor.Parameter.Name == "no2")
                {
                    airDataDTO.NO2 = sensorValue;
                }
                else if (sensor.Parameter.Name == "nox")
                {
                    airDataDTO.NOx = sensorValue;
                }
                else if (sensor.Parameter.Name == "pm25")
                {
                    airDataDTO.PM25 = sensorValue;
                }
                else if (sensor.Parameter.Name == "so2")
                {
                    airDataDTO.SO2 = sensorValue;
                }
                else if (sensor.Parameter.Name == "o3")
                {
                    airDataDTO.O3 = sensorValue;
                }
                else if (sensor.Parameter.Name == "relativehumidity")
                {
                    airDataDTO.RelativeHumidity = sensorValue;
                }
                else if (sensor.Parameter.Name == "temperature")
                {
                    airDataDTO.Temperature = sensorValue;
                }
                else if (sensor.Parameter.Name == "pm0.3")
                {
                    airDataDTO.PM03 = sensorValue;
                }
            }
            return airDataDTO;
        }

    }
}
