import { Activity, CheckCircle, AlertTriangle } from "lucide-react"

export default function StatsCards() {
  const stats = [
    {
      title: "Diagnósticos realizados",
      value: "24",
      change: "+12%",
      isPositive: true,
      icon: Activity,
      bg: "var(--accent-light)",
      color: "var(--accent)",
    },
    {
      title: "Hojas Sanas",
      value: "18",
      change: "+4%",
      isPositive: true,
      icon: CheckCircle,
      bg: "var(--accent-light)",
      color: "var(--accent)",
    },
    {
      title: "Alertas Detectadas",
      value: "6",
      change: "-2%",
      isPositive: true,
      icon: AlertTriangle,
      bg: "#fff3e0",
      color: "#e65100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: "var(--accent-mid)" }}>
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
                  {stat.value}
                </h3>
              </div>
              <div
                className="p-2 rounded-xl"
                style={{ background: stat.bg }}
              >
                <Icon style={{ color: stat.color }} size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span
                className="text-xs font-semibold px-2 py-1 rounded-full"
                style={{
                  background: stat.isPositive ? "var(--accent-light)" : "#ffebee",
                  color: stat.isPositive ? "var(--accent)" : "#c62828",
                }}
              >
                {stat.change}
              </span>
              <span className="text-xs" style={{ color: "var(--accent-mid)" }}>
                vs ayer
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
