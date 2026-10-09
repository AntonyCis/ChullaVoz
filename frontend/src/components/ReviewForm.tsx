import { useState } from "react";
import type { CreateReviewRequest } from "../types";
import { reviewService } from "../services/api";

interface ReviewFormProps {
    businessId: string;
    onReviewCreated: () => void;
    onCancel?: () => void;
}

export function ReviewForm({ businessId, onReviewCreated, onCancel }: ReviewFormProps) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        author: "",
        content: "",
        source: "GoogleMaps",
        rating: 5,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await reviewService.createReview({
                businessId,
                ...form,
            } as CreateReviewRequest);
            setForm({ author: "", content: "", source: "GoogleMaps", rating: 5 });
            onReviewCreated();
        } catch (error) {
            console.error("Error creating review:", error);
            alert("Error al crear el review");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-[16px] border bg-white overflow-hidden"
            style={{ borderColor: "var(--sepia-20)", background: "var(--paper)" }}
        >
            {/* ledger header */}
            <div className="px-6 lg:px-7 pt-6 pb-4 flex items-start justify-between gap-4 border-b" style={{ borderColor: "var(--sepia-20)" }}>
                <div>
                    <p className="text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--sepia)" }}>Nuevo asiento</p>
                    <h2 className="text-[24px] leading-none mt-1" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>Agregar review</h2>
                    <p className="text-[12px] mt-1" style={{ color: "var(--ink-40)" }}>Se analiza automáticamente con Hugging Face y entra al cuaderno.</p>
                </div>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="w-8 h-8 rounded-full grid place-items-center border bg-white hover:bg-[var(--kraft)]" style={{ borderColor: "var(--sepia-20)", color: "var(--ink-60)" }}>×</button>
                )}
            </div>

            <div className="px-6 lg:px-7 py-6">
                {/* rule lines */}
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-4 mb-4">
                    <label className="block">
                        <span className="text-[11px] tracking-[0.12em] uppercase" style={{ color: "var(--sepia)" }}>Autor</span>
                        <input
                            type="text"
                            placeholder="Ej. María, cliente frecuente"
                            value={form.author}
                            onChange={(e) => setForm({ ...form, author: e.target.value })}
                            className="mt-1.5 w-full h-10 px-3 rounded-[10px] border bg-white text-[14px] outline-none focus:border-[var(--ledger)]"
                            style={{ borderColor: "var(--sepia-20)" }}
                            required
                        />
                    </label>
                    <label className="block">
                        <span className="text-[11px] tracking-[0.12em] uppercase" style={{ color: "var(--sepia)" }}>Fuente</span>
                        <div className="mt-1.5 relative">
                            <select
                                value={form.source}
                                onChange={(e) => setForm({ ...form, source: e.target.value })}
                                className="w-full h-10 px-3 pr-8 rounded-[10px] border bg-white text-[14px] outline-none focus:border-[var(--ledger)] appearance-none"
                                style={{ borderColor: "var(--sepia-20)" }}
                            >
                                <option>GoogleMaps</option>
                                <option>Instagram</option>
                                <option>Facebook</option>
                                <option>Twitter</option>
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[12px]" style={{ color: "var(--ink-40)" }}>▾</span>
                        </div>
                    </label>
                </div>

                <label className="block mb-4">
                    <span className="text-[11px] tracking-[0.12em] uppercase" style={{ color: "var(--sepia)" }}>Contenido del review</span>
                    <textarea
                        placeholder="Escribe lo que dijo el cliente, tal cual..."
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        className="mt-1.5 w-full min-h-[96px] p-3 rounded-[12px] border bg-white text-[14px] leading-relaxed outline-none focus:border-[var(--ledger)] resize-y"
                        style={{ borderColor: "var(--sepia-20)" }}
                        rows={4}
                        required
                    />
                    <span className="mt-1 block text-[11px]" style={{ color: "var(--ink-40)" }}>{form.content.length} caracteres · se guardará con fecha y rating</span>
                </label>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t" style={{ borderColor: "var(--sepia-20)" }}>
                    <div className="flex items-center gap-4">
                        <span className="text-[11px] tracking-[0.12em] uppercase" style={{ color: "var(--sepia)" }}>Rating</span>
                        <div className="flex items-center gap-2">
                            <input
                                type="range"
                                min={1}
                                max={5}
                                value={form.rating}
                                onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
                                className="w-[140px] accent-[var(--ink)]"
                            />
                            <span className="tabular inline-flex items-center gap-1 px-2.5 py-1 rounded-full border bg-white text-[13px] font-medium" style={{ borderColor: "var(--sepia-20)" }}>
                                {form.rating}
                                <span style={{ color: "var(--clay)" }}>★</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {onCancel && (
                            <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-full text-[13px] font-medium border bg-white hover:bg-[var(--kraft)]" style={{ borderColor: "var(--sepia-20)", color: "var(--ink-60)" }}>Cancelar</button>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 rounded-full text-[13px] font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                            style={{ background: "var(--clay)" }}
                        >
                            {loading ? "Asentando..." : "Asentar en cuaderno"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
