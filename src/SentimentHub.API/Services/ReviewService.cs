using SentimentHub.API.Data;
using SentimentHub.API.DTOs;
using SentimentHub.Core.Entities;
using SentimentHub.Core.Enums;
using Microsoft.EntityFrameworkCore;

namespace SentimentHub.API.Services;

public class ReviewService : IReviewService
{
    private readonly ApplicationDbContext _context;
    private readonly ISentimentAnalysisService _sentimentService;

    public ReviewService(ApplicationDbContext context, ISentimentAnalysisService sentimentService)
    {
        _context = context;
        _sentimentService = sentimentService;
    }

    public async Task<ReviewResponse> CreateReviewAsync(CreateReviewRequest request)
    {
        var review = new Review
        {
            BusinessId = request.BusinessId,
            Author = request.Author,
            Content = request.Content,
            Source = request.Source,
            Rating = request.Rating,
            ReviewDate = DateTime.UtcNow
        };

        // Analizar Sentimientos
        var analysis = await _sentimentService.AnalyzeReviewAsync(request.Content);
        analysis.ReviewId = review.Id;
        review.Analysis = analysis;

        _context.Reviews.Add(review);
        await _context.SaveChangesAsync();

        return MapToResponse(review);
    }

    public async Task<ReviewResponse?> GetReviewByIdAsync(Guid id)
    {
        var review = await _context.Reviews
            .Include(r => r.Analysis)
            .FirstOrDefaultAsync(r => r.Id == id);

        return review != null ? MapToResponse(review) : null;
    }

    public async Task<List<ReviewResponse>> GetBusinessReviewsAsync(Guid businessId)
    {
        var reviews = await _context.Reviews
            .Where(r => r.BusinessId == businessId)
            .Include(r => r.Analysis)
            .ToListAsync();

        return reviews.Select(MapToResponse).ToList();
    }

    private ReviewResponse MapToResponse(Review review)
    {
        return new ReviewResponse
        {
            Id = review.Id,
            BusinessId = review.BusinessId,
            Author = review.Author,
            Content = review.Content,
            Source = review.Source,
            Rating = review.Rating,
            ReviewDate = review.ReviewDate,
            Analysis = review.Analysis != null ? new SentimentAnalysisResponse
            {
                Id = review.Analysis.Id,
                Sentiment = review.Analysis.Sentiment.ToString(),
                Confidence = review.Analysis.Confidence,
                Topics = review.Analysis.Topics
            } : null
        };
    }
}