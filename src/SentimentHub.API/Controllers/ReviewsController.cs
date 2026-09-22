using Microsoft.AspNetCore.Mvc;
using SentimentHub.API.DTOs;
using SentimentHub.API.Services;

namespace SentimentHub.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReviewsController : ControllerBase
{
    private readonly IReviewService _reviewService;

    public ReviewsController(IReviewService reviewService)
    {
        _reviewService = reviewService;
    }

    [HttpPost]
    public async Task<ActionResult<ReviewResponse>> CreateReview([FromBody] CreateReviewRequest request)
    {
        var review = await _reviewService.CreateReviewAsync(request);
        return CreatedAtAction(nameof(GetReview), new { id = review.Id}, review);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ReviewResponse>> GetReview(Guid id)
    {
        var review = await _reviewService.GetReviewByIdAsync(id);
        if (review == null)
            return NotFound();
        
        return Ok(review);
    }

    [HttpGet("business/{businessId}")]
    public async Task<ActionResult<List<ReviewResponse>>> GetBusinessReviews(Guid businessId)
    {
        var reviews = await _reviewService.GetBusinessReviewsAsync(businessId);
        return Ok(reviews);
    }
}