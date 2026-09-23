using SentimentHub.Core.Entities;

namespace SentimentHub.API.Services;

public interface ISentimentAnalysisService
{
    Task<SentimentAnalysis> AnalyzeReviewAsync(string content);
}