using SentimentHub.Core.Enums;

namespace SentimentHub.API.DTOs;

public class SentimentAnalysisResponse
{
    public Guid Id {get; set;}
    public string Sentiment {get; set;} = string.Empty;
    public double Confidence {get; set;}
    public List<string> Topics {get; set;} = new();
}