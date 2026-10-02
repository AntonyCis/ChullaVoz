import axios from "axios";
import type { CreateReviewRequest, Review, BusinessAnalytics } from "../types";

const API_BASE_URL = "http://localhost:5189/api"

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const reviewService = {
    createReview: (data: CreateReviewRequest) =>
        api.post<Review>("/reviews", data),

    getReview: (id: string) =>
        api.get<Review>(`/reviews/${id}`),

    getBusinessReviews: (businessId: string) =>
        api.get<Review[]>(`/reviews/business/${businessId}`),
};

export const analyticsService = {
    getBusinessAnalytics: (businessId: string) =>
        api.get<BusinessAnalytics>(`/analytics/business/${businessId}`),
}