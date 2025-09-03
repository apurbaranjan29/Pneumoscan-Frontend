import { motion } from "framer-motion";
import { BrainCircuit, RefreshCw } from "lucide-react";

export default function Header({ onReset }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between mb-6"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-2xl bg-white/10 backdrop-blur">
          <BrainCircuit className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            PneumoScan – X-ray Classifier
          </h1>
          <p className="text-sm text-white/80">
            Upload a chest X-ray and get instant predictions.
          </p>
        </div>
      </div>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition shadow-lg"
      >
        <RefreshCw className="w-4 h-4" /> Reset
      </button>
    </motion.header>
  );
}
