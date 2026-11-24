import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ErrorFallback from "../ErrorFallback";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border bg-white px-3 py-2 text-sm shadow">
      <p className="font-medium">{label}</p>
      <p className="text-blue-600">
        {payload[0].value}
      </p>
    </div>
  );
};

export default function NiceLineChart({ data,title,error }: { data: any[],title:string,error:Error }) {
    if(error)return <ErrorFallback message={error.message}/>
    return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-medium text-gray-700">
        {title}
      </h3>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          {/* Gradient */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="total"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
            fill="url(#lineGradient)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}