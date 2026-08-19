import { Image as ImageIcon, Sun, Leaf, Focus, Sparkles, Camera } from "lucide-react"
import Image from "next/image"

const tips = [
  {
    icon: Sun,
    title: "Buena iluminación",
    description: "Usa luz natural y evita sombras o reflejos",
  },
  {
    icon: Leaf,
    title: "Enfoca la enfermedad",
    description: "Asegúrate de que la zona afectada se vea clara y nítida",
  },
  {
    icon: Focus,
    title: "Muestra bien la hoja",
    description: "Evita tomar la fotografía muy lejos o demasiado cerca de la hoja",
  },
  {
    icon: Sparkles,
    title: "Fondo limpio y simple",
    description: "Evita manos, otras hojas u objetos que oculten la hoja",
  },
]

export default function PhotoTips() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon size={20} style={{ color: "var(--accent)" }} />
        <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>
          Recomendaciones para una buena fotografía
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {tips.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="border rounded-2xl p-5 flex flex-col items-center text-center"
            style={{
              background: "var(--accent-light)",
              borderColor: "var(--border-color)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
              style={{ background: "rgba(26,122,58,0.15)", color: "var(--accent)" }}
            >
              <Icon size={20} />
            </div>
            <p className="text-sm font-semibold leading-tight" style={{ color: "var(--foreground)" }}>
              {title}
            </p>
            <p className="text-xs mt-1 leading-snug" style={{ color: "var(--accent-mid)" }}>
              {description}
            </p>
          </div>
        ))}

        {/* Ejemplo de toma ideal */}
        <div
          className="border rounded-2xl p-5 flex flex-col"
          style={{ background: "var(--accent-light)", borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "rgba(26,122,58,0.15)", color: "var(--accent)" }}
            >
              <Camera size={18} />
            </div>
            <p className="text-sm font-semibold leading-tight" style={{ color: "var(--foreground)" }}>
              Ejemplo de toma ideal
            </p>
          </div>
          <div
            className="relative flex-1 min-h-[120px] rounded-xl overflow-hidden border border-dashed flex items-center justify-center"
            style={{ background: "rgba(26,122,58,0.05)", borderColor: "var(--accent)" }}
          >
            <Image src="/ejemplo_hoja.png" alt="Ejemplo de toma ideal" fill className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  )
}