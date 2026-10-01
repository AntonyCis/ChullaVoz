using SentimentHub.API.Data;
using SentimentHub.API.DTOs;
using SentimentHub.Core.Enums;
using Microsoft.EntityFrameworkCore;
using System.CodeDom.Compiler;

namespace SentimentHub.API.Services;

public class AnalyticsService : IAnalyticsService
{
    private readonly ApplicationDbContext _context;

    public AnalyticsService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<BusinessAnalyticsResponse> GetBusinessAnalyticsAsync(Guid businessId)
    {
        var reviews = await _context.Reviews
            .Where(r => r.BusinessId == businessId)
            .Include(r => r.Analysis)
            .ToListAsync();

        if (reviews.Count == 0)
            return new BusinessAnalyticsResponse { BusinessId = businessId };

        //Calculo de sentimientos pa
        var sentiments = reviews
            .Where(r => r.Analysis != null)
            .GroupBy(r => r.Analysis!.Sentiment)
            .ToDictionary(g => g.Key, g => g.Count());

        var totalWithAnalysis = reviews.Count(r => r.Analysis != null);

        var positiveCount = sentiments.GetValueOrDefault(SentimentType.Positive, 0);
        var neutralCount = sentiments.GetValueOrDefault(SentimentType.Neutral, 0);
        var negativeCount = sentiments.GetValueOrDefault(SentimentType.Negative, 0);

        // Calcular Topics
        var allTopics = reviews
            .Where(r => r.Analysis != null)
            .SelectMany(r => r.Analysis!.Topics)
            .GroupBy(t => t)
            .Select(g => new TopicCountResponse
            {
                Topic = g.Key,
                Count = g.Count(),
                Percentage = Math.Round((double)g.Count() / reviews.Count * 100, 2)
            })
            .OrderByDescending(t => t.Count)
            .Take(5)
            .ToList();

        //Generar Recomendaciones
        var recommendations = GenerateRecommendations(positiveCount, negativeCount, allTopics);

        return new BusinessAnalyticsResponse
        {
            BusinessId = businessId,
            TotalReviews = reviews.Count,
            AverageRating = reviews.Average(r => r.Rating),
            SentimentSummary = new SentimentSummaryResponse
            {
                PositiveCount = positiveCount,
                NeutralCount = neutralCount,
                NegativeCount = negativeCount,
                PositivePercentage = Math.Round((double)positiveCount / totalWithAnalysis * 100, 2),
                NeutralPercentage = Math.Round((double)neutralCount / totalWithAnalysis * 100, 2),
                NegativePercentage = Math.Round((double)negativeCount / totalWithAnalysis * 100, 2)

            },
            TopTopics = allTopics,
            ActionRecommendations = recommendations
        };
    }

    private List<string> GenerateRecommendations(int positive, int negative, List<TopicCountResponse> topics)
    {
        var recommendations = new List<string>();
        
        // Análisis de sentimientos (Buenos emojis jaja)
        if (negative > positive)
            recommendations.Add("⚠️ Hay más sentimientos negativos que positivos. Enfócate en resolver los problemas identificados.");

        if (positive > negative * 2)
            recommendations.Add("✅ Excelente feedback positivo. Mantén los estándares actuales.");

        // Análisis de tópicos
        if (topics.Any(t => t.Topic == "Atención"))
            recommendations.Add("🎯 Prioritario: Mejora la atención al cliente. Es un tema recurrente en comentarios.");

        if (topics.Any(t => t.Topic == "Precio"))
            recommendations.Add("💰 El precio es un factor importante. Considera revisar tu estrategia de precios.");

        if (topics.Any(t => t.Topic == "Rapidez"))
            recommendations.Add("⏱️ Optimiza los tiempos de servicio. Los clientes mencionan demoras frecuentemente.");

        if (topics.Any(t => t.Topic == "Calidad"))
            recommendations.Add("🏆 La calidad es crítica para tu negocio. Sigue monitoreando este aspecto.");

        if (topics.Any(t => t.Topic == "Ambiente"))
            recommendations.Add("🎨 El ambiente/decoración influye en la experiencia. Considera mejoras visuales.");

        if (recommendations.Count == 0)
            recommendations.Add("📊 Recopila más datos para obtener recomendaciones más precisas.");

        return recommendations;
    }
}