import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { TopicCount } from "../types";

interface TopicsChartProps {
    data: TopicCount[];
}

export function TopicsChart({ data }: TopicsChartProps) {
    const ledger = "#2B5A83";
    const sepia = "#E8DDD0";

    if (!data || data.length === 0) {
        return (
            <div className="rounded-[16px] border p-6" style={{ borderColor: "var(--sepia-20)", background: "var(--paper)" }}>
                <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: "var(--sepia)" }}>Tópicos</p>
                <h3 className="text-[18px] leading-none mt-1" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>Principales</h3>
                <p className="text-[13px] mt-6" style={{ color: "var(--ink-40)" }}>Sin topics aún — agrega reviews.</p>
            </div>
        );
    }

    return (
        <div className="rounded-[16px] border p-6" style={{ borderColor: "var(--sepia-20)", background: "var(--paper)" }}>
            <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                    <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: "var(--sepia)" }}>Tópicos</p>
                    <h3 className="text-[18px] leading-none mt-1" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>Principales</h3>
                </div>
                <span className="text-[11px] tabular px-2 py-1 rounded-full border bg-white" style={{ borderColor: "var(--sepia-20)", color: "var(--ink-40)" }}>{data.length} temas</span>
            </div>

            <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data} barCategoryGap={20}>
                    <CartesianGrid stroke={sepia} strokeDasharray="2 4" vertical={false} />
                    <XAxis dataKey="topic" tick={{ fontSize: 11, fill: "#5C5C59" }} axisLine={{ stroke: sepia }} tickLine={false} interval={0} angle={-12} dy={10} height={46} />
                    <YAxis tick={{ fontSize: 11, fill: "#9A9A96", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} width={28} />
                    <Tooltip
                        cursor={{ fill: "#F0E8DC", opacity: 0.6 }}
                        contentStyle={{ borderRadius: 12, borderColor: "var(--sepia-20)", fontSize: 12 }}
                        formatter={(value: any, _n: any, p: any) => [`${value} · ${Number(p.payload.percentage).toFixed(1)}%`, p.payload.topic]}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                        {data.map((_, i) => (
                            <Cell key={i} fill={i === 0 ? ledger : i === 1 ? "#3D6F9A" : "#5A8AB5"} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            <ul className="mt-2 grid gap-1.5">
                {[...data].sort((a, b) => b.count - a.count).slice(0, 3).map((t, i) => (
                    <li key={t.topic} className="flex items-center justify-between gap-3 text-[12px] tabular border-b last:border-0 py-1.5" style={{ borderColor: "var(--sepia-20)", color: i === 0 ? "var(--ink)" : "var(--ink-60)" }}>
                        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full" style={{ background: i === 0 ? ledger : "var(--sepia)" }} />{t.topic}</span>
                        <span>{t.count} · {t.percentage.toFixed(0)}%</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
