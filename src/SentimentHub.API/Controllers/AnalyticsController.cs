using Microsoft.AspNetCore.Mvc;
using SentimentHub.API.DTOs;
using SentimentHub.API.Services;

namespace SentimentHub.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalyticsController : ControllerBase
{
    private readonly IAnalyticsService _analyticsService;

    public AnalyticsController(IAnalyticsService analyticsService)
    {
        _analyticsService = analyticsService;
    }

    [HttpGet("business/{businessId}")]
    public async Task<ActionResult<BusinessAnalyticsResponse>> GetBusinessAnalytics(Guid businessId)
    {
        var analytics = await _analyticsService.GetBusinessAnalyticsAsync(businessId);
        return Ok(analytics);
    }
}