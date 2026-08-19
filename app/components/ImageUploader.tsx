"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { UploadCloud, Image as ImageIcon, X } from "lucide-react"
import Image from "next/image"

interface Props {
  onFileSelected: (file: File) => void
  onClear?: () => void
  loading: boolean
}

export default function ImageUploader({ onFileSelected, onClear, loading }: Props) {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const onDrop = useCallback(
    (accepted: File[]) => {
      const file = accepted[0]
      if (!file) return
      setPreview(URL.createObjectURL(file))
      setFileName(file.name)
      onFileSelected(file)
    },
    [onFileSelected]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    maxFiles: 1,
    disabled: loading,
  })

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPreview(null)
    setFileName(null)
    if (onClear) onClear()
  }

  return (
    <div
      {...getRootProps()}
      className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      style={{
        background: isDragActive ? "var(--accent-light)" : "rgba(234,245,238,0.5)",
        borderColor: isDragActive ? "var(--accent)" : "rgba(26,122,58,0.35)",
      }}
    >
      <input {...getInputProps()} />

      {preview ? (
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-48 h-48">
            <Image src={preview} alt="preview" fill className="object-cover rounded-xl" />
          </div>
          <p className="text-sm" style={{ color: "var(--accent-mid)" }}>
            {fileName}
          </p>
          {!loading && (
            <button
              onClick={clear}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700"
            >
              <X size={14} /> Cambiar imagen
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
            style={{ background: "var(--accent-light)", color: "var(--accent)" }}
          >
            <UploadCloud size={36} />
          </div>
          <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
            Arrastra una imagen aquí
          </h2>
          <p className="mt-1" style={{ color: "var(--accent-mid)" }}>
            o selecciona un archivo desde tu dispositivo
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--accent-mid)", opacity: 0.7 }}>
            JPG, PNG o WEBP — máx. 5MB
          </p>

          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors bg-white"
            style={{
              border: "1.5px solid var(--accent)",
              color: "var(--accent)",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--accent-light)")}
            onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
          >
            <ImageIcon size={18} />
            Seleccionar imagen
          </button>
        </div>
      )}
    </div>
  )
}