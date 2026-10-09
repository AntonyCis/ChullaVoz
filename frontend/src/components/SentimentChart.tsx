import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import type { SentimentSummary } from "../types";

interface SentimentChartProps {
    data: SentimentSummary;
}

export function SentimentChart({data}: SentimentChartProps) {
    const chartData = [
        { name: "Positivo", value: data.positivePercentage },
        { name: "Neutral", value:  data.neutralPercentage },
        { name: "Negativo", value: data.negativePercentage },
    ];

    const COLORS = ["#10b981", "#6b7280", "#ef4444"];

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Distribución de Sentimientos</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]}/>
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${(value as number).toFixed(1)}%`}/>
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="p-2 bg-green-50 rounded">
                    <p className="text-sm text-gray-600">Positivos</p>
                    <p className="text-2xl font-bold text-green-600">
                        {data.positiveCount}
                    </p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600">Neutral</p>
                    <p className="text-2xl font-bold text-gray-600">
                        {data.neutralCount}
                    </p>
                </div>
                <div className="p-2 bg-red-50 rounded">
                    <p className="text-sm text-gray-600">Negativos</p>
                    <p className="text-2xl font-bold text-red-600">
                        {data.negativeCount}
                    </p>
                </div>
            </div>
        </div>
    );
}