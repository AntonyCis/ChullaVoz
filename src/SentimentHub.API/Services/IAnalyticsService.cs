using SentimentHub.API.DTOs;

namespace SentimentHub.API.Services;

public interface IAnalyticsService
{
    Task<BusinessAnalyticsResponse> GetBusinessAnalyticsAsync(Guid businessId);
}