import type { BusinessAnalytics } from "../types";
import { SentimentChart } from "./SentimentChart";
import { TopicsChart } from "./TopicsChart";

interface AnalyticsProps {
    data: BusinessAnalytics;
}

export function Analytics({ data }: AnalyticsProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6">
                    <p className="text-sm opacity-90">Total Reviews</p>
                    <p className="text-3xl font-bold">{data.totalReviews}</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg p-6">
                    <p className="text-sm opacity-90">Rating Promedio</p>
                    <p className="text-3xl font-bold">{data.averageRating.toFixed(1)} ⭐</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6">
                    <p className="text-sm opacity-90">Sentimiento Principal</p>
                    <p className="text-2xl font-bold">
                        {data.sentimentSummary.positiveCount > data.sentimentSummary.negativeCount
                            ? "Positivo"
                            : "Negativo"}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SentimentChart data={data.sentimentSummary} />
                <TopicsChart data={data.topTopics} />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Recomendaciones</h3>
                <ul className="space-y-2">
                    {data.actionRecommendations.map((rec, idx) => (
                        <li key={idx} className="text-gray-700">
                            {rec}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}