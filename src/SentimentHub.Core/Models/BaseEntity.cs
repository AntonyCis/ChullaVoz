namespace SentimentHub.Core.Models;

public abstract class BaseEntity
{
    public Guid Id { get; set;} = Guid.NewGuid();
    public DateTime CreateAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } 
}