namespace SentimentHub.API.DTOs;

public class ReviewResponse
{
    public Guid Id { get; set;}
    public Guid BusinessId { get; set; }
    public string Author { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string Source { get; set; } = string.Empty;
    public int Rating { get; set; }
    public DateTime ReviewDate {get; set;}
    
    public SentimentAnalysisResponse? Analysis {get; set;}
}