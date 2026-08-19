import { Clock, Image as ImageIcon } from "lucide-react"

export default function RecentHistory() {
  const history = [
    { id: "1", date: "Hace 10 min", result: "Hoja Sana", conf: "98%", status: "healthy" },
    { id: "2", date: "Hace 45 min", result: "Roya", conf: "92%", status: "warning" },
    { id: "3", date: "Hace 2 horas", result: "Hoja Sana", conf: "99%", status: "healthy" },
    { id: "4", date: "Hace 3 horas", result: "Tizón Bacteriano", conf: "87%", status: "danger" },
  ]

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "healthy":
        return { background: "var(--accent-light)", color: "var(--accent)" }
      case "warning":
        return { background: "#fff8e1", color: "#e65100" }
      case "danger":
        return { background: "#ffebee", color: "#c62828" }
      default:
        return { background: "#f5f5f5", color: "#757575" }
    }
  }

  return (
    <div className="bg-card border border-border rounded-2xl flex flex-col h-full shadow-sm">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2" style={{ color: "var(--foreground)" }}>
          <Clock size={18} style={{ color: "var(--accent)" }} />
          Historial Reciente
        </h3>
        <button
          className="text-sm font-medium hover:underline transition-colors"
          style={{ color: "var(--accent)" }}
        >
          Ver todo
        </button>
      </div>

      <div className="flex-1 p-5 overflow-y-auto">
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="flex items-center gap-4 group">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                style={{ background: "var(--accent-light)", color: "var(--accent)" }}
              >
                <ImageIcon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>
                  {item.result}
                </p>
                <p className="text-xs" style={{ color: "var(--accent-mid)" }}>
                  {item.date}
                </p>
              </div>
              <div className="text-right">
                <span
                  className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full"
                  style={getStatusStyle(item.status)}
                >
                  {item.conf}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="p-4 border-t border-border rounded-b-2xl text-center"
        style={{ background: "var(--accent-light)" }}
      >
        <p className="text-xs" style={{ color: "var(--accent-mid)" }}>
          Última sincronización hace 2 min
        </p>
      </div>
    </div>
  )
}
