using SentimentHub.Core.Models;
using SentimentHub.Core.Enums;

namespace SentimentHub.Core.Entities;

public class SentimentAnalysis : BaseEntity
{
    public Guid ReviewId { get; set; }
    public SentimentType Sentiment { get; set; }
    public double Confidence { get; set; } //0.0 - 1.0
    public List<string> Topics { get; set;} = new(); // "Atencion", "Precio", "Calidad"

    //Relacion
    public Review? Review {get; set; }
}