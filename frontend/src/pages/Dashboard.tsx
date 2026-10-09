import { useState, useEffect } from "react";
import { ReviewForm } from "../components/ReviewForm";
import { Analytics } from "../components/Analytics";
import type { BusinessAnalytics } from "../types";
import { analyticsService } from "../services/api";

export function Dashboard() {
    const [businessId] = useState("550e8400-e29b-41d4-a716-446655440000");
    const [analytics, setAnalytics] = useState<BusinessAnalytics | null>(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

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

    return (
        <div className="min-h-screen" style={{ background: "var(--kraft)" }}>
            {/* Top bar — kraft ledger */}
            <header className="sticky top-0 z-30 border-b" style={{ background: "var(--kraft)", borderColor: "var(--sepia-20)" }}>
                <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-[64px] flex items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="flex items-baseline gap-2">
                            <span className="text-[28px] leading-none" style={{ fontFamily: '"Instrument Serif", Georgia, serif', letterSpacing: "-0.03em" }}>
                                ChullaVoz
                            </span>
                            <span className="hidden sm:inline text-[10px] tracking-[0.18em] uppercase px-2 py-0.5 rounded-full border" style={{ color: "var(--sepia)", borderColor: "var(--sepia-20)", background: "var(--paper)" }}>SentimentHub</span>
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-[11px] tabular" style={{ color: "var(--ink-40)" }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--success)" }} />
                            <span className="tracking-[0.08em] uppercase">Negocio</span>
                            <span className="px-2 py-1 rounded bg-white border text-[11px]" style={{ borderColor: "var(--sepia-20)", color: "var(--ink-60)" }}>{businessId.slice(0, 8)}…</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <a href="https://chullavoz-api.onrender.com/swagger/index.html" target="_blank" rel="noreferrer" className="hidden lg:inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] uppercase px-3 py-2 rounded-full border bg-white hover:bg-[var(--paper)] transition-colors" style={{ borderColor: "var(--sepia-20)", color: "var(--ink-60)" }}>
                            <span className="w-1 h-1 rounded-full" style={{ background: "var(--ledger)" }} /> Swagger
                        </a>
                        <button onClick={() => setShowForm(v => !v)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium tracking-[0.02em] text-white transition-colors hover:opacity-90" style={{ background: "var(--ink)" }}>
                            <span className="w-5 h-5 rounded-full grid place-items-center text-[14px] leading-none bg-white text-black">+</span>
                            {showForm ? "Cerrar" : "Agregar Review"}
                        </button>
                    </div>
                </div>
                {/* manuscript underline */}
                <div className="h-[3px] w-full" style={{ background: `repeating-linear-gradient(90deg, var(--sepia-20) 0 8px, transparent 8px 14px)` }} />
            </header>

            <main className="max-w-[1280px] mx-auto px-6 lg:px-8 py-8">
                {/* Title block — the thesis */}
                <div className="mb-6">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <h1 className="text-[40px] lg:text-[52px] leading-[0.9] tracking-[-0.03em]" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>
                                Cuaderno
                                <span className="relative inline-block ml-3">
                                    de cuentas
                                    <svg className="absolute left-0 -bottom-1 w-full h-[8px]" viewBox="0 0 200 8" preserveAspectRatio="none" aria-hidden>
                                        <path d="M2 6 Q 60 1 100 4 T 198 3" fill="none" stroke="var(--clay)" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                                    </svg>
                                </span>
                            </h1>
                            <p className="mt-3 text-[14px] leading-relaxed max-w-[52ch]" style={{ color: "var(--ink-60)" }}>
                                Análisis de sentimiento para pequeños negocios ecuatorianos — centraliza Google/IG/FB, analiza con IA y devuelve <span style={{ color: "var(--ink)", fontWeight: 500 }}>qué hacer mañana</span>.
                            </p>
                        </div>
                        <div className="hidden lg:flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase" style={{ color: "var(--ink-40)" }}>
                            <span className="px-3 py-1.5 rounded-full bg-white border" style={{ borderColor: "var(--sepia-20)" }}>Operativo</span>
                            <span className="px-3 py-1.5 rounded-full" style={{ background: "var(--ink)", color: "white" }}>Tiempo real</span>
                        </div>
                    </div>
                </div>

                {/* Review form — ledger sheet */}
                {showForm && (
                    <div className="mb-6 animate-[in_0.25s_ease]">
                        <ReviewForm businessId={businessId} onReviewCreated={() => { loadAnalytics(); setShowForm(false); }} onCancel={() => setShowForm(false)} />
                    </div>
                )}

                {/* Loading / empty / analytics */}
                {loading ? (
                    <div className="bg-white border rounded-[16px] p-10 lg:p-14 text-center" style={{ borderColor: "var(--sepia-20)", background: "var(--paper)" }}>
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border bg-white" style={{ borderColor: "var(--sepia-20)" }}>
                            <span className="w-4 h-4 rounded-full border-2 border-[var(--sepia-20)] border-t-[var(--ledger)] animate-spin" />
                            <span className="text-[13px] tracking-[0.04em]" style={{ color: "var(--ink-60)" }}>Cargando cuaderno...</span>
                        </div>
                        <p className="mt-3 text-[13px]" style={{ color: "var(--ink-40)" }}>El servidor en Render puede tardar ~30s la primera vez</p>
                        <div className="mt-6 h-[1px] w-full max-w-[360px] mx-auto" style={{ background: "var(--sepia-20)" }} />
                    </div>
                ) : analytics ? (
                    <Analytics data={analytics} />
                ) : (
                    <div className="bg-white border rounded-[16px] p-10 text-center" style={{ borderColor: "var(--sepia-20)", background: "var(--paper)" }}>
                        <p className="text-[15px] font-medium" style={{ color: "var(--ink)" }}>Aún no hay información</p>
                        <p className="mt-1 text-[13px]" style={{ color: "var(--ink-40)" }}>Agrega el primer review para abrir el cuaderno. Si acabas de desplegar, espera 30s y recarga.</p>
                        <button onClick={() => setShowForm(true)} className="mt-4 px-5 py-2 rounded-full text-sm font-medium border bg-white hover:bg-[var(--kraft)]" style={{ borderColor: "var(--sepia-20)" }}>Agregar primer review</button>
                    </div>
                )}

                <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 text-[11px] tracking-[0.08em] uppercase" style={{ color: "var(--ink-40)" }}>
                    <span>ChullaVoz · SentimentHub · Hecho en Ecuador para la hueca y la tienda</span>
                    <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--clay)" }} /> kraft · sepia · tinta</span>
                </footer>
            </main>

            <style>{`@keyframes in { from { opacity:0; transform: translateY(4px)} to {opacity:1; transform:none}}`}</style>
        </div>
    );
}
