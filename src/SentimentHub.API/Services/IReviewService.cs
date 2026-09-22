using SentimentHub.API.DTOs;

namespace SentimentHub.API.Services;

public interface IReviewService
{
    Task<ReviewResponse> CreateReviewAsync(CreateReviewRequest request);
    Task<ReviewResponse?> GetReviewByIdAsync(Guid id);
    Task<List<ReviewResponse>> GetBusinessReviewsAsync(Guid businessId);
}

