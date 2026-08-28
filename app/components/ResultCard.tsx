import { ClassifyResponse } from "../types"
import { CheckCircle, AlertTriangle, Bug, HelpCircle, ClipboardList } from "lucide-react"

// Nombres normalizados sin tilde, para que coincidan exactamente con lo que
// envía el backend (ver CLASS_NAMES en app/services/model.py).
const DISEASE_COLORS: Record<string, { bg: string; text: string }> = {
  "Hoja Sana":          { bg: "var(--accent-light)", text: "var(--accent)" },
  "Roya":               { bg: "#fff8e1", text: "#e65100" },
  "Carbon":             { bg: "#f5f5f5", text: "#424242" },
  "Mosaico":            { bg: "#fffde7", text: "#f9a825" },
  "Hoja Amarilla":      { bg: "#fffde7", text: "#f57f17" },
  "Pudricion Roja":     { bg: "#ffebee", text: "#c62828" },
  "Tizon Bacteriano":   { bg: "#fff3e0", text: "#e65100" },
  "Mancha Parda":       { bg: "#fff8e1", text: "#bf360c" },
  "Mancha de Anillo":   { bg: "#f3e5f5", text: "#6a1b9a" },
  "Hoja Seca":          { bg: "#efebe9", text: "#4e342e" },
}

interface Props {
  result: ClassifyResponse
}

export default function ResultCard({ result }: Props) {
  const { prediction, disease_info } = result
  const colors = DISEASE_COLORS[prediction.class] ?? { bg: "var(--accent-light)", text: "var(--accent)" }
  const isHealthy = prediction.class === "Hoja Sana"
  const confidence = Math.round(prediction.confidence * 100)

  const top3 = Object.entries(prediction.all_probabilities)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  const barColor =
    confidence > 80
      ? "var(--accent)"
      : confidence > 50
      ? "#e65100"
      : "#c62828"

  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-5 shadow-sm">
      {/* Header diagnóstico */}
      <div className="flex items-center gap-3">
        {isHealthy ? (
          <CheckCircle style={{ color: "var(--accent)" }} size={24} />
        ) : (
          <AlertTriangle style={{ color: "#e65100" }} size={24} />
        )}
        <div>
          <p className="text-xs uppercase tracking-wide" style={{ color: "var(--accent-mid)" }}>
            Diagnóstico
          </p>
          <span
            className="inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium"
            style={{ background: colors.bg, color: colors.text }}
          >
            {prediction.class}
          </span>
        </div>
        {prediction.simulated && (
          <span
            className="ml-auto text-xs px-2 py-1 rounded-full"
            style={{ background: "var(--accent-light)", color: "var(--accent-mid)" }}
          >
            Simulado
          </span>
        )}
      </div>

      {/* Barra de confianza */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span style={{ color: "var(--accent-mid)" }}>Confianza</span>
          <span className="font-medium" style={{ color: "var(--foreground)" }}>
            {confidence}%
          </span>
        </div>
        <div className="w-full rounded-full h-2" style={{ background: "var(--accent-light)" }}>
          <div
            className="h-2 rounded-full transition-all"
            style={{ width: `${confidence}%`, background: barColor }}
          />
        </div>
      </div>

      {/* Otras probabilidades */}
      <div>
        <p className="text-xs uppercase tracking-wide mb-2" style={{ color: "var(--accent-mid)" }}>
          Otras probabilidades
        </p>
        <div className="space-y-2">
          {top3.map(([cls, prob]) => (
            <div key={cls} className="flex items-center gap-2 text-sm">
              <span className="w-36 truncate" style={{ color: "var(--foreground)" }}>
                {cls}
              </span>
              <div
                className="flex-1 rounded-full h-1.5"
                style={{ background: "var(--accent-light)" }}
              >
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${Math.round(prob * 100)}%`,
                    background: "var(--accent)",
                  }}
                />
              </div>
              <span className="text-xs w-8 text-right" style={{ color: "var(--accent-mid)" }}>
                {Math.round(prob * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Información complementaria generada por el módulo LLM */}
      <div className="pt-2 border-t" style={{ borderColor: "var(--border-color)" }}>
        <p className="text-xs uppercase tracking-wide mb-3" style={{ color: "var(--accent-mid)" }}>
          Información complementaria
        </p>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Bug size={16} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
            <div>
              <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
                Síntomas
              </p>
              <p className="text-sm" style={{ color: "var(--accent-mid)" }}>
                {disease_info.sintomas}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <HelpCircle size={16} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
            <div>
              <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
                Causas
              </p>
              <p className="text-sm" style={{ color: "var(--accent-mid)" }}>
                {disease_info.causas}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <ClipboardList size={16} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
            <div>
              <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
                Recomendaciones
              </p>
              <p className="text-sm" style={{ color: "var(--accent-mid)" }}>
                {disease_info.recomendaciones}
              </p>
            </div>
          </div>
        </div>

        {!disease_info.generated && (
          <p className="text-xs mt-3 italic" style={{ color: "#c62828" }}>
            Esta información no pudo generarse automáticamente. Intenta nuevamente más tarde.
          </p>
        )}
      </div>

      <p className="text-xs" style={{ color: "var(--accent-mid)" }}>
        Archivo: {result.filename}
      </p>
    </div>
  )
}