import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { UploadCloud } from "lucide-react";

export default function App() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState({
    top: "—",
    confidence: "—",
    pneumonia: 0,
    normal: 0,
  });
  const innerRef = useRef(null);

  // tilt using pointer (framer-motion values)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [12, -12]);
  const rotateY = useTransform(x, [-50, 50], [-12, 12]);

  function handlePointer(e) {
    const rect = innerRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    x.set(px / 100);
    y.set(py / 100);
  }
  function resetPointer() {
    x.set(0);
    y.set(0);
  }

  const onSelect = (ev) => {
    const f = ev.target.files?.[0];
    if (!f) return;
    setFile(Object.assign(f, { preview: URL.createObjectURL(f) }));
  };
//run prediction
const runPrediction = async () => {
  if (!file) return alert("Please upload an image first.");

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch("https://pneumoscanbackendapurba.onrender.com", {
    method: "POST",
    body: formData,
    });


    // <-- Add here, immediately after getting response
    const data = await res.json();
console.log("Backend response:", data); // logs backend response
console.log(data.probability);
console.log(data.result);
setPrediction({
  top: data.result,
  confidence: `${(data.probability * 100).toFixed(0)}%`, // overall confidence of the predicted class
  pneumonia: data.pneumonia_probability.toFixed(0),
  normal: data.normal_probability.toFixed(0),
});


  } catch (err) {
    console.error(err);
    alert("Prediction failed");
  }
};


  

  const resetPrediction = () => {
    setFile(null);
    setPrediction({
      top: "—",
      confidence: "—",
      pneumonia: 0,
      normal: 0,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      {/* floating blobs */}
      <div className="blob b1"></div>
      <div className="blob b2"></div>
      <div className="blob b3"></div>

      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-md">
            PneumoScan
          </h1>
          <p className="mt-2 small-muted">
            Upload a frontal chest X-ray — instant, beautiful predictions.
          </p>
        </div>

        <div className="p-card">
          <motion.div
            ref={innerRef}
            onPointerMove={handlePointer}
            onPointerLeave={resetPointer}
            style={{ rotateX, rotateY, translateY: y, translateX: x }}
            className="p-card-inner p-8"
          >
            <div className="grid md:grid-cols-2 gap-6 items-center">
              {/* left: preview + info */}
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden" style={{ borderRadius: 16 }}>
                  <div className="h-64 w-full bg-gradient-to-br from-black/40 to-black/20 flex items-center justify-center">
                    {file ? (
                      <img src={file.preview} alt="preview" className="object-contain h-full w-full" />
                    ) : (
                      <div className="text-center px-6">
                        <svg width="96" height="96" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4 opacity-90">
                          <path d="M12 3v12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M21 15v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M16 3l-4 4-4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="text-white font-semibold text-lg">No image yet</div>
                        <div className="small-muted mt-2">Drag & drop or click to upload</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="drop-area cursor-pointer flex items-center gap-3">
                    <input type="file" accept="image/*" className="hidden" onChange={onSelect}/>
                    <div className="btn-primary inline-flex items-center gap-3">
                      <UploadCloud className="w-5 h-5" />
                      <span>Choose Image</span>
                    </div>
                  </label>

                  <button className="px-4 py-2 rounded-lg bg-white/6 text-white font-medium hover:bg-white/9 transition">
                    Advanced Options
                  </button>
                </div>

                <div className="small-muted">
                  Supported: PNG, JPG. Recommended: single frontal chest X-ray, <span className="text-white">≤ 5MB</span>
                </div>
              </div>

              {/* right: card with predictions / CTA */}
              <div className="space-y-4">
                <div className="rounded-xl p-6" style={{background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", border:"1px solid rgba(255,255,255,0.06)"}}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm small-muted">Top prediction</div>
                      <div className="text-2xl font-bold text-white mt-1">{prediction.top}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm small-muted">Confidence</div>
                      <div className="text-xl font-semibold text-white mt-1">{prediction.confidence}</div>
                    </div>
                  </div>

                  {/* fancy progress bars */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between small-muted">
                      <div>Pneumonia</div><div>{prediction.pneumonia}%</div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/6 overflow-hidden">
                      <div style={{width: `${prediction.pneumonia}%`}} className="h-full rounded-full bg-green-400"/>
                    </div>
                    <div className="flex items-center justify-between small-muted">
                      <div>Normal</div><div>{prediction.normal}%</div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/6 overflow-hidden">
                      <div style={{width: `${prediction.normal}%`}} className="h-full rounded-full bg-blue-400"/>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button onClick={runPrediction} className="btn-primary flex-1">Run Prediction</button>
                    <button onClick={resetPrediction} className="px-4 py-2 rounded-lg bg-white/6 text-white">Reset</button>
                  </div>
                </div>

                <div className="rounded-xl p-4 small-muted" style={{border:"1px solid rgba(255,255,255,0.03)"}}>
                  <div className="text-white font-semibold">Quick Tips</div>
                  <ul className="mt-2 list-disc ml-5">
                    <li>Use clear frontal X-rays</li>
                    <li>Crop out borders / markings</li>
                    <li>For best results, keep file size moderate</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* subtle footer */}
            <div className="mt-6 text-center small-muted">
              <span>Model endpoint: </span><code className="text-white/70">http://localhost:5000/predict</code>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
