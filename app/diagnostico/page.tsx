"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import ImageUploader from "../components/ImageUploader"
import ResultCard from "../components/ResultCard"
import PhotoTips from "../components/PhotoTips"
import { classifyImage } from "../lib/api"
import { ClassifyResponse } from "../types"

export default function DiagnosticoPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ClassifyResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (file: File) => {
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const data = await classifyImage(file)
      setResult(data)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al conectar con el servidor"
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-12xl mx-auto">
      {/* Page header */}
      <div className="mb-2">
        <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--foreground)" }}>
          Nuevo Diagnóstico
        </h1>
        <p className="mt-1" style={{ color: "var(--accent-mid)" }}>
          Sube una imagen para análisis inmediato mediante IA
        </p>
      </div>

      {/* Main card */}
      <div
        className="rounded-3xl p-6 md:p-8 shadow-sm flex flex-col relative overflow-hidden border"
        style={{ background: "#fff", borderColor: "var(--border-color)" }}
      >
        {/* Decoration blob */}
        <div
          className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: "var(--accent-light)" }}
        />

        {/* Uploader */}
        <div className="relative z-10">
          <ImageUploader
            onFileSelected={handleFile}
            onClear={() => {
              setResult(null)
              setError(null)
            }}
            loading={loading}
          />
        </div>

        {/* Loading state */}
        {loading && (
          <div
            className="mt-6 flex items-center justify-center gap-3 p-6 rounded-2xl border relative z-10"
            style={{ background: "var(--accent-light)", borderColor: "var(--border-color)" }}
          >
            <div
              className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
            />
            <span className="text-sm font-medium" style={{ color: "var(--accent)" }}>
              Procesando imagen con IA...
            </span>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-4 text-red-600 text-sm flex items-center gap-2 relative z-10">
            <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ResultCard result={result} />
          </div>
        )}

        <br />
        <PhotoTips />

        <br />

        {/* Info tip */}
        <div
          className="flex items-center gap-3 rounded-2xl px-5 py-4 border"
          style={{ background: "var(--accent-light)", borderColor: "var(--border-color)" }}
        >
          <Info size={18} className="shrink-0" style={{ color: "var(--accent)" }} />
          <p className="text-sm font-medium" style={{ color: "var(--accent)" }}>
            Una buena fotografía nos ayuda a darte un diagnóstico más preciso.
          </p>
        </div>
      </div>
    </div>
  )
}
