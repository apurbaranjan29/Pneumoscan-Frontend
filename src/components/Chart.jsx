import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function Chart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="label" tick={{ fill: "#fff" }} />
        <YAxis tick={{ fill: "#fff" }} unit="%" domain={[0, 100]} />
        <Tooltip
          contentStyle={{
            background: "#0b1020",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
          }}
          labelStyle={{ color: "#fff" }}
        />
        <Bar dataKey="probability" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
