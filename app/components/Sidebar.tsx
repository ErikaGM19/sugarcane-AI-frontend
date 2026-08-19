"use client"

import { useState } from "react"
import { Home, Menu, Leaf, Scan } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Inicio", href: "/" },
    { icon: Scan, label: "Nuevo Diagnóstico", href: "/diagnostico" },
  ]

  return (
    <aside
      className={`bg-sidebar border-r border-border transition-all duration-300 flex flex-col ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 ">
        {!collapsed && (
          <div className="flex items-center gap-2 font-bold text-lg overflow-hidden whitespace-nowrap" style={{ color: "var(--accent)" }}>
            <Leaf size={24} />
            <span>Sugarcane AI</span>
          </div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center" style={{ color: "var(--accent)" }}>
            <Leaf size={24} />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg transition-colors"
          style={{ color: "var(--accent-mid)" }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--accent-light)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium ${
                collapsed ? "justify-center" : ""
              }`}
              style={
                isActive
                  ? {
                      background: "var(--accent)",
                      color: "#fff",
                      boxShadow: "0 2px 8px rgba(26,122,58,0.25)",
                    }
                  : { color: "var(--accent-mid)" }
              }
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.background = "var(--accent-light)"
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.background = "transparent"
              }}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} />
              {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer badge */}
      <div className="p-4 border-t border-border">
        {!collapsed ? (
          <div
            className="rounded-xl p-4 text-center space-y-2 border"
            style={{
              background: "var(--accent-light)",
              borderColor: "var(--border-color)",
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mx-auto"
              style={{ background: "rgba(26,122,58,0.15)", color: "var(--accent)" }}
            >
              <Leaf size={20} />
            </div>
            <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
              Modelo v1.2 Activo
            </p>
            <p className="text-[10px]" style={{ color: "var(--accent-mid)" }}>
              Última actualización: Hoy
            </p>
          </div>
        ) : (
          <div className="flex justify-center opacity-50" style={{ color: "var(--accent)" }}>
            <Leaf size={20} />
          </div>
        )}
      </div>
    </aside>
  )
}
