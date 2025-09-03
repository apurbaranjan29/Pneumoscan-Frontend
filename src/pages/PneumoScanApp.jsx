import { useMemo, useState } from "react";
import Header from "../components/Header";
import UploadCard from "../components/UploadCard";
import ResultCard from "../components/ResultCard";
import usePrediction from "../hooks/usePrediction";

export default function PneumoScanApp() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const { predict, reset, loading, result, error } = usePrediction();

  const onSelect = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    reset();
  };

  const chartData = useMemo(() => {
    if (!result?.probs) return [];
    return result.probs.map((d) => ({
      label: d.label,
      probability: +(d.prob * 100).toFixed(2),
    }));
  }, [result]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-900 via-indigo-900 to-fuchsia-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Header onReset={() => { setFile(null); setPreview(""); reset(); }} />

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <UploadCard
            file={file}
            preview={preview}
            onSelect={onSelect}
            onPredict={() => predict(file)}
            loading={loading}
            error={error}
          />
          <ResultCard result={result} loading={loading} chartData={chartData} />
        </div>

        <footer className="mt-8 text-center text-white/70 text-xs">
          <p>
            Backend expected at <code>http://localhost:4000/api/predict</code>.
            Replace labels to match your model.
          </p>
        </footer>
      </div>
    </div>
  );
}
