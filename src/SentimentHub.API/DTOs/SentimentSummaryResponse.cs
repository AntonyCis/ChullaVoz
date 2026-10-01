namespace SentimentHub.API.DTOs;

public class SentimentSummaryResponse
{
    public int PositiveCount { get; set; }
    public int NeutralCount { get; set; }
    public int NegativeCount { get; set; }
    public double PositivePercentage { get; set; }
    public double NeutralPercentage { get; set;}
    public double NegativePercentage { get; set; }
}