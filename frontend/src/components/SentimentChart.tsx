import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { SentimentSummary } from "../types";

interface SentimentChartProps {
    data: SentimentSummary;
}

export function SentimentChart({ data }: SentimentChartProps) {
    const chartData = [
        { name: "Positivo", value: data.positivePercentage, count: data.positiveCount },
        { name: "Neutral", value: data.neutralPercentage, count: data.neutralCount },
        { name: "Negativo", value: data.negativePercentage, count: data.negativeCount },
    ];
    const COLORS = ["#1B7A4D", "#8B6F4E", "#C84B31"];

    return (
        <div className="rounded-[16px] border p-6" style={{ borderColor: "var(--sepia-20)", background: "var(--paper)" }}>
            <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                    <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: "var(--sepia)" }}>Distribución</p>
                    <h3 className="text-[18px] leading-none mt-1" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>Sentimientos</h3>
                </div>
                <span className="text-[11px] tabular px-2 py-1 rounded-full border bg-white" style={{ borderColor: "var(--sepia-20)", color: "var(--ink-40)" }}>{data.positiveCount + data.neutralCount + data.negativeCount} total</span>
            </div>

            <div className="relative">
                <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={62}
                            outerRadius={88}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="var(--paper)"
                            strokeWidth={2}
                        >
                            {chartData.map((_, i) => (
                                <Cell key={`c-${i}`} fill={COLORS[i]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ borderRadius: 12, borderColor: "var(--sepia-20)", fontSize: 12 }}
                            formatter={(value: any, _n: any, p: any) => [`${Number(value).toFixed(1)}% · ${p.payload.count}`, p.payload.name]}
                        />
                    </PieChart>
                </ResponsiveContainer>
                {/* center label */}
                <div className="absolute inset-0 grid place-items-center pointer-events-none">
                    <div className="text-center">
                        <p className="text-[10px] tracking-[0.14em] uppercase" style={{ color: "var(--ink-40)" }}>Balance</p>
                        <p className="tabular text-[16px] font-medium" style={{ color: "var(--ink)" }}>{Math.max(...chartData.map(d => d.value)).toFixed(0)}%</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="rounded-[10px] border bg-white p-2.5 text-center" style={{ borderColor: "var(--sepia-20)" }}>
                    <p className="text-[10px] tracking-[0.1em] uppercase" style={{ color: "var(--ink-40)" }}>Positivos</p>
                    <p className="tabular text-[18px] font-medium leading-none mt-1" style={{ color: "#1B7A4D" }}>{data.positiveCount}</p>
                    <p className="tabular text-[11px]" style={{ color: "var(--ink-40)" }}>{data.positivePercentage.toFixed(1)}%</p>
                </div>
                <div className="rounded-[10px] border bg-white p-2.5 text-center" style={{ borderColor: "var(--sepia-20)" }}>
                    <p className="text-[10px] tracking-[0.1em] uppercase" style={{ color: "var(--ink-40)" }}>Neutral</p>
                    <p className="tabular text-[18px] font-medium leading-none mt-1" style={{ color: "#8B6F4E" }}>{data.neutralCount}</p>
                    <p className="tabular text-[11px]" style={{ color: "var(--ink-40)" }}>{data.neutralPercentage.toFixed(1)}%</p>
                </div>
                <div className="rounded-[10px] border bg-white p-2.5 text-center" style={{ borderColor: "var(--sepia-20)" }}>
                    <p className="text-[10px] tracking-[0.1em] uppercase" style={{ color: "var(--ink-40)" }}>Negativos</p>
                    <p className="tabular text-[18px] font-medium leading-none mt-1" style={{ color: "#C84B31" }}>{data.negativeCount}</p>
                    <p className="tabular text-[11px]" style={{ color: "var(--ink-40)" }}>{data.negativePercentage.toFixed(1)}%</p>
                </div>
            </div>
        </div>
    );
}
