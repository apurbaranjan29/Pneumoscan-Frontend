import { motion } from "framer-motion";
import Chart from "./Chart";

export default function ResultCard({ result, loading, chartData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-3xl bg-white/10 backdrop-blur shadow-2xl overflow-hidden"
    >
      <div className="p-6 h-full flex flex-col">
        <h2 className="text-xl font-semibold mb-2">2) Results</h2>
        {!result && !loading && (
          <p className="text-white/80 text-sm">Predictions will appear here once you run inference.</p>
        )}

        {result && (
          <div className="space-y-4">
            <div className="rounded-2xl p-4 bg-black/30 border border-white/10">
              <p className="text-sm text-white/70">Top Prediction</p>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="text-2xl font-bold">{result.top1?.label ?? "—"}</span>
                <span className="text-white/80">
                  {result.top1 ? (result.top1.prob * 100).toFixed(2) : "0.00"}%
                </span>
              </div>
            </div>

            <div className="h-64 w-full rounded-2xl bg-black/30 border border-white/10 p-3">
              <Chart data={chartData} />
            </div>
          </div>
        )}

        {loading && (
          <div className="mt-4 animate-pulse text-white/80">Running model…</div>
        )}
      </div>
    </motion.div>
  );
}
