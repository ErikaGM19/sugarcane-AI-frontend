"use client"

import { useState } from "react"
import { Info, AlertCircle, RefreshCw, X, LogIn } from "lucide-react"
import Link from "next/link"
import ImageUploader from "../components/ImageUploader"
import ResultCard from "../components/ResultCard"
import PhotoTips from "../components/PhotoTips"
import { classifyImage } from "../lib/api"
import { parseApiError, ParsedError } from "../lib/errorUtils"
import { ClassifyResponse } from "../types"

export default function DiagnosticoPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ClassifyResponse | null>(null)
  const [error, setError] = useState<ParsedError | null>(null)
  const [lastFile, setLastFile] = useState<File | null>(null)

  const handleFile = async (file: File) => {
    setLoading(true)
    setResult(null)
    setError(null)
    setLastFile(file)

    try {
      const data = await classifyImage(file)
      setResult(data)
    } catch (err: unknown) {
      const parsed = parseApiError(err)
      setError(parsed)
    } finally {
      setLoading(false)
    }
  }

  const handleUploadError = (message: string) => {
    setError({
      title: "Archivo no admitido",
      message: message,
      actionHint: "Selecciona una fotografía en formato JPG, PNG, WEBP, GIF, BMP o TIFF con un peso menor a 30MB.",
      status: 400,
    })
  }

  const retry = () => {
    if (lastFile) {
      handleFile(lastFile)
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
            onError={handleUploadError}
            onClear={() => {
              setResult(null)
              setError(null)
              setLastFile(null)
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
          <div
            className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-5 text-red-900 relative z-10 animate-in fade-in duration-300"
            role="alert"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm text-red-800">
                    {error.title}
                  </h3>
                  <p className="text-sm text-red-700 leading-relaxed">
                    {error.message}
                  </p>
                  {error.actionHint && (
                    <p className="text-xs text-red-600/90 pt-1">
                      💡 {error.actionHint}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-700 transition-colors p-1"
                title="Cerrar notificación"
              >
                <X size={16} />
              </button>
            </div>

            {/* Acciones contextuales */}
            <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-red-200/60">
              {error.status === 401 ? (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
                >
                  <LogIn size={14} />
                  Iniciar sesión
                </Link>
              ) : (
                lastFile && (
                  <button
                    type="button"
                    onClick={retry}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-red-700 hover:bg-red-100/70 border border-red-300 transition-colors"
                  >
                    <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
                    Reintentar análisis
                  </button>
                )
              )}
            </div>
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
