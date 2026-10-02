import { useState } from "react";
import type { CreateReviewRequest } from "../types";
import { reviewService } from "../services/api";

interface ReviewFormProps {
    businessId: string;
    onReviewCreated: () => void;
}

export function ReviewForm({ businessId, onReviewCreated }: ReviewFormProps) {
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

            setForm({ author: "", content: "", source: "GoogleMaps", rating: 5});
            onReviewCreated();
            alert("Review creado exitosamente!");
        } catch (error) {
            console.error("Error creating review:", error);
            alert("Error al crear el review")
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md p-6 mb-6"
        >
            <h2 className="text-2xl font-bold mb-4">Agregar Reviews</h2>

            <div className="grid gird-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Nombre del autor"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value})}
                    className="border rounded px-3 py-2"
                    required
                />
                <select
                    value={form.source}
                    onChange={(e) => setForm({ ...form, source: e.target.value })}
                    className="border rounded px-3 py-2"
                >
                    <option>GoogleMaps</option>
                    <option>Instagram</option>
                    <option>Facebook</option>
                    <option>Twitter</option>
                </select>
            </div>

            <textarea
                placeholder="Contenido del review"
                value = {form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full border rounded px-3 py-2 mb-4"
                rows={4}
                required
            />

            <div className="flex gap-4 items-center">
                <label className="flex items-center gap-2">
                    Rating:
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={form.rating}
                        onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
                        className="w-24"
                    />
                    <span className="font-bold text-lg">{form.rating} ⭐</span>
                </label>
                
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? "Enviando..." : "Enviar Review"}
                </button>
            </div>
        </form>
    );
}