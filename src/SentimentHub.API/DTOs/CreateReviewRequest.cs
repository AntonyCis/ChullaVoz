namespace SentimentHub.API.DTOs;

public class CreateReviewRequest
{
    public Guid BusinessId { get; set;}
    public string Author {get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string Source { get; set; } = string.Empty;
    public int Rating { get; set;} // 1 -5
}