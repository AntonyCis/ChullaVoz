import { useState, useEffect } from "react";
import { ReviewForm } from "../components/ReviewForm";
import { Analytics } from "../components/Analytics";
import type { BusinessAnalytics } from "../types";
import { analyticsService } from "../services/api";

export function Dashboard() {
    const [businessId] = useState("550e8400-e29b-41d4-a716-446655440000");
    const [analytics, setAnalytics] = useState<BusinessAnalytics | null>(null);
    const [loading, setLoading] = useState(true);

    const loadAnalytics = async () => {
        setLoading(true);
        try {
            const response = await analyticsService.getBusinessAnalytics(businessId);
            setAnalytics(response.data);
        } catch (error) {
            console.error("Error loading analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAnalytics();
    }, [businessId]);

    return(
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-2">SentimentHub</h1>
                <p className="text-gray-600 mb-8">
                    Análisis de sentimiento para pequeños negocios ecuatorianos
                </p>

                <ReviewForm businessId={businessId} onReviewCreated={loadAnalytics} />
                
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600 mb-4"></div>
                        <p className="text-gray-600">Cargando análisis...</p>
                        <p className="text-sm text-gray-400 mt-2">El servidor puede tardar ~30s en despertar la primera vez (Render free tier)</p>
                    </div>
                ) : analytics ? (
                    <Analytics data={analytics} />
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-2">No hay información disponible</p>
                        <p className="text-sm text-gray-400">Si acabas de desplegar, espera 30s y recarga. El API está despertando.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
