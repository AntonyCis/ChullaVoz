export interface Review {
    id: string;
    businessId: string;
    author: string;
    content: string;
    source: string;
    rating: number;
    reviewDate: string;
    analysis?: SentimentAnalysis;
}

export interface SentimentAnalysis {
    id: string;
    sentiment: "Positive" | "Neutral" | "Negative";
    confidence: number;
    topics: string[];
}

export interface BusinessAnalytics {
    businessId: string;
    totalReviews: number;
    averageRating: number;
    sentimentSummary: SentimentSummary;
    topTopics: TopicCount[];
    actionRecommendations: string[];
    analyzedAt: string;
}

export interface SentimentSummary {
    positiveCount: number;
    neutralCount: number;
    negativeCount: number;
    positivePercentage: number;
    neutralPercentage: number;
    negativePercentage: number;
}

export interface TopicCount {
    topic: string;
    count: number;
    percentage: number;
}

export interface CreateReviewRequest {
    businessId: string;
    author: string;
    content: string;
    source: string;
    rating: number;
}