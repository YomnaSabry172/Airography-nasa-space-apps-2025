namespace AppCore.JSONTemplates
{
    using System;
    using System.Collections.Generic;
    using System.Text.Json.Serialization;

    public class OpenAQAPIResponse
    {
        [JsonPropertyName("meta")]
        public Meta Meta { get; set; }

        [JsonPropertyName("results")]
        public List<Result> Results { get; set; }
    }

    public class Meta
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("website")]
        public string Website { get; set; }

        [JsonPropertyName("page")]
        public int Page { get; set; }

        [JsonPropertyName("limit")]
        public int Limit { get; set; }

        [JsonPropertyName("found")]
        public int Found { get; set; }
    }

    public class Result
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("locality")]
        public string Locality { get; set; }

        [JsonPropertyName("timezone")]
        public string Timezone { get; set; }

        [JsonPropertyName("country")]
        public Country Country { get; set; }

        [JsonPropertyName("owner")]
        public Owner Owner { get; set; }

        [JsonPropertyName("provider")]
        public Provider Provider { get; set; }

        [JsonPropertyName("isMobile")]
        public bool IsMobile { get; set; }

        [JsonPropertyName("isMonitor")]
        public bool IsMonitor { get; set; }

        [JsonPropertyName("instruments")]
        public List<Instrument> Instruments { get; set; }

        [JsonPropertyName("sensors")]
        public List<Sensor> Sensors { get; set; }

        [JsonPropertyName("coordinates")]
        public Coordinates Coordinates { get; set; }

        [JsonPropertyName("licenses")]
        public List<License> Licenses { get; set; }

        [JsonPropertyName("bounds")]
        public List<double> Bounds { get; set; }

        [JsonPropertyName("distance")]
        public double? Distance { get; set; }

        [JsonPropertyName("datetimeFirst")]
        public DateTimeInfo DatetimeFirst { get; set; }

        [JsonPropertyName("datetimeLast")]
        public DateTimeInfo DatetimeLast { get; set; }
    }

    public class Country
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("code")]
        public string Code { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }
    }

    public class Owner
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }
    }

    public class Provider
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }
    }

    public class Instrument
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }
    }

    public class Sensor
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("parameter")]
        public Parameter Parameter { get; set; }
    }

    public class Parameter
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("units")]
        public string Units { get; set; }

        [JsonPropertyName("displayName")]
        public string DisplayName { get; set; }
    }

    public class Coordinates
    {
        [JsonPropertyName("latitude")]
        public double Latitude { get; set; }

        [JsonPropertyName("longitude")]
        public double Longitude { get; set; }
    }

    public class License
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("attribution")]
        public Attribution Attribution { get; set; }

        [JsonPropertyName("dateFrom")]
        public DateTime DateFrom { get; set; }

        [JsonPropertyName("dateTo")]
        public DateTime? DateTo { get; set; }
    }

    public class Attribution
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; }
    }

    public class DateTimeInfo
    {
        [JsonPropertyName("utc")]
        public DateTime Utc { get; set; }

        [JsonPropertyName("local")]
        public DateTime Local { get; set; }
    }

}
