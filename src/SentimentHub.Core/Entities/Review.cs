using SentimentHub.Core.Enums;
using SentimentHub.Core.Models;

namespace SentimentHub.Core.Entities;

public class Review : BaseEntity
{
    public Guid BusinessId { get; set; }
    public string Author { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string Source { get; set; } = string.Empty;
    public int Rating { get; set; } // El rating va a ir de 1 a 5 estrellas
    public DateTime ReviewDate { get; set; }

    // Relacion
    public SentimentAnalysis? Analysis { get; set; }
}