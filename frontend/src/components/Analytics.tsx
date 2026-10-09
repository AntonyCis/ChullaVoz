import type { BusinessAnalytics } from "../types";
import { SentimentChart } from "./SentimentChart";
import { TopicsChart } from "./TopicsChart";

interface AnalyticsProps {
    data: BusinessAnalytics;
}

export function Analytics({ data }: AnalyticsProps) {
    const sentimentLabel = data.sentimentSummary.positiveCount > data.sentimentSummary.negativeCount ? "Positivo" : data.sentimentSummary.negativeCount > data.sentimentSummary.positiveCount ? "Negativo" : "Mixto";
    const sentimentColor = sentimentLabel === "Positivo" ? "var(--success)" : sentimentLabel === "Negativo" ? "var(--clay)" : "var(--sepia)";

    return (
        <div className="space-y-6">
            {/* Tira contable — 3 métricas en papel encalado */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-[14px] border bg-white p-5 relative overflow-hidden" style={{ borderColor: "var(--sepia-20)", background: "var(--paper)" }}>
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "var(--sepia-20)" }} />
                    <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: "var(--sepia)" }}>Total asientos</p>
                    <p className="tabular text-[36px] leading-none mt-2 tracking-[-0.02em]" style={{ fontFamily: '"JetBrains Mono", monospace', color: "var(--ink)" }}>{data.totalReviews}</p>
                    <p className="text-[12px] mt-1" style={{ color: "var(--ink-40)" }}>reviews centralizados</p>
                    <div className="mt-3 h-[1px] w-full" style={{ background: "var(--sepia-20)" }} />
                    <p className="tabular text-[11px] mt-2" style={{ color: "var(--ink-40)" }}>ID {data.businessId.slice(0, 8)}</p>
                </div>
                <div className="rounded-[14px] border bg-white p-5 relative overflow-hidden" style={{ borderColor: "var(--sepia-20)", background: "var(--paper)" }}>
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "var(--ledger)" }} />
                    <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: "var(--sepia)" }}>Rating promedio</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <p className="tabular text-[36px] leading-none tracking-[-0.02em]" style={{ fontFamily: '"JetBrains Mono", monospace' }}>{data.averageRating.toFixed(1)}</p>
                        <span className="text-[16px]" style={{ color: "var(--clay)" }}>★</span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded border" style={{ borderColor: "var(--sepia-20)", color: "var(--ink-40)", background: "white" }}>sobre 5</span>
                    </div>
                    <div className="mt-3 flex gap-1">
                        {[1,2,3,4,5].map(i => (
                            <span key={i} className="h-1 flex-1 rounded-full" style={{ background: i <= Math.round(data.averageRating) ? "var(--clay)" : "var(--sepia-20)" }} />
                        ))}
                    </div>
                </div>
                <div className="rounded-[14px] border bg-white p-5 relative overflow-hidden" style={{ borderColor: "var(--sepia-20)", background: "var(--paper)" }}>
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: sentimentColor }} />
                    <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: "var(--sepia)" }}>Sentimiento principal</p>
                    <p className="text-[28px] leading-none mt-2" style={{ fontFamily: '"Instrument Serif", Georgia, serif', color: sentimentColor }}>{sentimentLabel}</p>
                    <p className="tabular text-[12px] mt-1" style={{ color: "var(--ink-40)" }}>
                        {data.sentimentSummary.positiveCount} pos · {data.sentimentSummary.neutralCount} neu · {data.sentimentSummary.negativeCount} neg
                    </p>
                    <div className="mt-3 h-[1px] w-full" style={{ background: "var(--sepia-20)" }} />
                    <p className="text-[11px] mt-2" style={{ color: "var(--ink-40)" }}>Actualizado {new Date(data.analyzedAt).toLocaleDateString("es-EC")}</p>
                </div>
            </div>

            {/* Dos paneles 50/50 — mundo entra solo por tipo/paleta/densidad/manuscript */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <SentimentChart data={data.sentimentSummary} />
                <TopicsChart data={data.topTopics} />
            </div>

            {/* Recomendaciones — notas manuscritas */}
            <div className="rounded-[16px] border p-6 lg:p-7" style={{ borderColor: "var(--sepia-20)", background: "var(--paper)" }}>
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                        <p className="text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--sepia)" }}>Cuaderno · Qué hacer mañana</p>
                        <h3 className="text-[22px] leading-none mt-1" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>Recomendaciones</h3>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] tracking-[0.08em] uppercase px-2.5 py-1 rounded-full border bg-white" style={{ borderColor: "var(--sepia-20)", color: "var(--ink-40)" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--ledger)" }} /> IA
                    </span>
                </div>
                {data.actionRecommendations.length === 0 ? (
                    <p className="text-sm" style={{ color: "var(--ink-40)" }}>Sin recomendaciones aún.</p>
                ) : (
                    <ul className="grid gap-3">
                        {data.actionRecommendations.map((rec, idx) => (
                            <li key={idx} className="flex gap-3 p-3 rounded-[12px] border bg-white" style={{ borderColor: "var(--sepia-20)" }}>
                                <span className="shrink-0 w-6 h-6 rounded-full grid place-items-center text-[11px] tabular font-medium text-white mt-0.5" style={{ background: "var(--ledger)" }}>{idx + 1}</span>
                                <span className="text-[13px] leading-relaxed" style={{ color: "var(--ink-60)" }}>{rec}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
