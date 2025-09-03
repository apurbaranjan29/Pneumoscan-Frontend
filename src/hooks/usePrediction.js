import { useState } from "react";

export default function usePrediction() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const predict = async (file) => {
    if (!file) {
      setError("Please choose an image first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const body = new FormData();
      body.append("image", file);

      const res = await fetch("http://localhost:4000/api/predict", {
        method: "POST",
        body,
      });

      if (!res.ok) throw new Error(await res.text() || "Prediction failed");

      setResult(await res.json());
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError("");
  };

  return { predict, reset, loading, result, error };
}
