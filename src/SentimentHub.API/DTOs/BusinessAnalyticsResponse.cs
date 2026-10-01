namespace SentimentHub.API.DTOs;

public class BusinessAnalyticsResponse
{
    public Guid BusinessId { get; set; }
    public int TotalReviews { get; set; }
    public double AverageRating { get; set; }
    public SentimentSummaryResponse SentimentSummary { get; set; } = new();
    public List<TopicCountResponse> TopTopics { get; set; } = new();
    public List<String> ActionRecommendations { get; set; } = new();
    public DateTime AnalyzedAt { get; set; } = DateTime.UtcNow;
}

public class TopicCountResponse
{
    public string Topic { get; set; } = string.Empty;
    public int Count { get; set; }
    public double Percentage { get; set; }
}