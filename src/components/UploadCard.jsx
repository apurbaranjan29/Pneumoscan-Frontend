import { motion } from "framer-motion";
import { Upload, Activity } from "lucide-react";

export default function UploadCard({ file, preview, onSelect, onPredict, loading, error }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className="rounded-3xl bg-white/10 backdrop-blur shadow-2xl overflow-hidden"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">1) Upload Image</h2>
        <p className="text-sm text-white/80 mb-4">
          PNG/JPG up to 5MB. The model expects a single frontal chest X-ray.
        </p>

        <label htmlFor="file" className="block">
          <div className="cursor-pointer border-2 border-dashed border-white/30 hover:border-white/60 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-center">
            <Upload className="w-8 h-8" />
            <div>
              <p className="font-medium">Click to choose an image</p>
              <p className="text-xs text-white/70">or drag & drop (browser dialog)</p>
            </div>
          </div>
          <input id="file" type="file" accept="image/*" className="hidden" onChange={onSelect} />
        </label>

        {preview && (
          <div className="mt-5">
            <p className="text-sm text-white/80 mb-2">Preview</p>
            <div className="rounded-2xl overflow-hidden bg-black/30 border border-white/10">
              <img src={preview} alt="preview" className="w-full object-contain max-h-80" />
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={onPredict}
            disabled={loading || !file}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-fuchsia-500/90 hover:bg-fuchsia-400 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Activity className="w-4 h-4" />
            {loading ? "Predicting…" : "Run Prediction"}
          </button>
          {error && <span className="text-sm text-red-200">{error}</span>}
        </div>
      </div>
    </motion.div>
  );
}
