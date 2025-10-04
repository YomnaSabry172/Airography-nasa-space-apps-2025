using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

public class OpenAQSensorResponse
{

    [JsonPropertyName("results")]
    public List<MeasurementResult> Results { get; set; }
}

public class MeasurementResult
{
    [JsonPropertyName("value")]
    public double Value { get; set; }

    [JsonPropertyName("period")]
    public Period Period { get; set; }
}

public class Period
{
    [JsonPropertyName("label")]
    public string Label { get; set; }

    [JsonPropertyName("interval")]
    public string Interval { get; set; }

    [JsonPropertyName("datetimeFrom")]
    public DateTimeInfo DatetimeFrom { get; set; }

    [JsonPropertyName("datetimeTo")]
    public DateTimeInfo DatetimeTo { get; set; }
}


public class DateTimeInfo
{
    [JsonPropertyName("utc")]
    public DateTime Utc { get; set; }

    [JsonPropertyName("local")]
    public DateTime Local { get; set; }
}
