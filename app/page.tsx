"use client"

import {
  Camera,
  ArrowRight,
  Zap,
  Leaf,
  ShieldCheck,
  CircleHelp,
  BadgeCheck,
  CircleCheck,
  BarChart3,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 max-w-12xl mx-auto">

      {/* ── HERO BANNER ── */}
      <section className="relative rounded-2xl overflow-hidden min-h-[260px] flex items-center bg-[#f0f7f0]">
        {/* Background photo – right half */}
        <div className="absolute inset-0">
          <Image
            src="/sugarcane_banner.png"
            alt="Hojas de caña de azúcar"
            fill
            className="object-cover object-center"
            priority
          />
          {/* gradient overlay so left side text remains readable */}
          <div className="absolute inset-0" />
        </div>

        {/* Left: text */}
        <div className="relative z-10 p-8 max-w-lg">
          <h1 className="text-3xl md:text-3xl font-extrabold text-[#1a3a1a] leading-tight mb-4">
            Diagnostica enfermedades en hojas de caña de azúcar
          </h1>
          <p className="text-[#3d5c3d] text-base mb-6 leading-relaxed">
            Sube una fotografía de una hoja y obtén un diagnóstico acompañado de posibles causas, tratamiento y recomendaciones para el manejo del cultivo.
          </p>
          <Link
            href="/diagnostico"
            id="btn-comenzar-diagnostico"
            className="inline-flex items-center gap-2 bg-[#1a7a3a] hover:bg-[#155f2e] text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md text-base"
          >
            <Camera size={20} />
            Comenzar diagnóstico
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Bottom-right badge */}
        <div className="absolute bottom-5 right-5 z-10 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3 shadow border border-gray-100">
          <ShieldCheck size={22} className="text-[#1a7a3a]" />
          <div className="text-right">
            <p className="text-xs font-bold text-[#1a3a1a] leading-tight">Inteligencia Artificial</p>
            <p className="text-xs text-gray-500">al servicio del campo</p>
          </div>
        </div>
      </section>

      {/* ── FEATURE CARDS ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white border border-gray-100 rounded-2xl py-3 px-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#eaf5ee] flex items-center justify-center shrink-0">
            <Zap size={22} className="text-[#1a7a3a]" />
          </div>
          <div>
            <h3 className="font-bold text-[#1a3a1a] mb-1">Diagnóstico rápido</h3>
            <p className="text-xs text-gray-500">Obtén resultados en pocos segundos.</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-gray-100 rounded-2xl py-3 px-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#eaf5ee] flex items-center justify-center shrink-0">
            <Camera size={22} className="text-[#1a7a3a]" />
          </div>
          <div>
            <h3 className="font-bold text-[#1a3a1a] mb-1">Solo necesitas<br />una fotografía</h3>
            <p className="text-xs text-gray-500">No se requiere ningún equipo especializado.</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-gray-100 rounded-2xl py-3 px-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#eaf5ee] flex items-center justify-center shrink-0">
            <Leaf size={22} className="text-[#1a7a3a]" />
          </div>
          <div>
            <h3 className="font-bold text-[#1a3a1a] mb-1">Recomendaciones<br />inteligentes</h3>
            <p className="text-xs text-gray-500">Recibe información sobre posibles causas, tratamiento y prevención.</p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS + WHY TRUST ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Cómo funciona */}
        <div className="bg-white border border-gray-100 rounded-2xl py-4 px-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CircleHelp size={20} className="text-[#1a7a3a]" />
            <h2 className="font-bold text-[#1a3a1a] text-base">¿Cómo funciona?</h2>
          </div>

          {/* Single grid: each column = circle + label + icon, all perfectly aligned */}
          <div className="grid grid-cols-4 gap-3">
            {[
              {
                num: 1, label: "Toma una\nfotografía",
                icon: <Camera size={38} className="text-[#1a7a3a]" />,
              },
              {
                num: 2, label: "Sube la\nimagen",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a7a3a]">
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m16 16-4-4-4 4" />
                  </svg>
                ),
              },
              {
                num: 3, label: "La IA analiza\nla hoja",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a7a3a]">
                    <circle cx="12" cy="12" r="3" /><path d="M12 1v4" /><path d="M12 19v4" /><path d="M4.22 4.22l2.83 2.83" /><path d="M16.95 16.95l2.83 2.83" /><path d="M1 12h4" /><path d="M19 12h4" /><path d="M4.22 19.78l2.83-2.83" /><path d="M16.95 7.05l2.83-2.83" />
                  </svg>
                ),
              },
              {
                num: 4, label: "Obtén el diagnóstico\ny recomendaciones",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a7a3a]">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="12" y2="17" /><path d="m9 13 1.5 1.5L13 12" />
                  </svg>
                ),
              },
            ].map((step, i, arr) => (
              <div key={step.num} className="flex flex-col items-center gap-2 relative">
                {/* Dashed connector to next step */}
                {i < arr.length - 1 && (
                  <div className="absolute top-5 left-1/2 w-full border-t-2 border-dashed border-[#1a7a3a] z-0" />
                )}
                {/* Circle */}
                <div className="relative z-10 w-10 h-10 rounded-full border-2 border-[#1a7a3a] text-[#1a7a3a] font-bold text-sm flex items-center justify-center bg-white shrink-0">
                  {step.num}
                </div>
                {/* Label */}
                <p className="text-[10px] text-gray-500 leading-tight text-center whitespace-pre-line">
                  {step.label}
                </p>
                {/* Icon */}
                <div className="flex items-center justify-center h-14 mt-1">
                  {step.icon}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Por qué confiar */}
        <div className="bg-white border border-gray-100 rounded-2xl py-4 px-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <ShieldCheck size={20} className="text-[#1a7a3a]" />
            <h2 className="font-bold text-[#1a3a1a] text-base">¿Por qué confiar en Sugarcane AI?</h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Bullet list */}
            <ul className="flex-1 space-y-1 text-xs text-gray-600">
              {[
                "Modelo entrenado con miles de imágenes de hojas de caña.",
                <span key="prec">Precisión promedio del <strong className="text-[#1a7a3a]">99.77%</strong> en pruebas experimentales.</span>,
                "Diagnóstico acompañado por recomendaciones generadas mediante Inteligencia Artificial.",
                "Herramienta diseñada para apoyar al agricultor en el cuidado de su cultivo.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CircleCheck size={19} className="text-[#1a7a3a] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Accuracy circle — fully circular, larger */}
            <div className="flex flex-col items-center justify-center bg-[#eaf5ee] rounded-full w-36 h-36 text-center shrink-0">
              <BarChart3 size={32} className="text-[#1a7a3a] mb-1" />
              <p className="text-3xl font-extrabold text-[#1a3a1a] leading-none">99.77%</p>
              <p className="text-[11px] text-gray-500 mt-1 leading-tight">Precisión del<br />modelo</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER TIP BAR ── */}
      <div className="bg-[#f0f7f0] border border-[#c6e6c6] rounded-2xl px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm text-[#2d5a2d]">
          <Leaf size={18} className="text-[#1a7a3a] shrink-0" />
          <p>
            <strong>Recuerda:</strong> una buena fotografía nos ayuda a darte un diagnóstico más preciso.
          </p>
        </div>
        <Link
          href="/diagnostico"
          id="btn-ver-recomendaciones"
          className="inline-flex items-center gap-2 border border-[#1a7a3a] text-[#1a7a3a] hover:bg-[#1a7a3a] hover:text-white transition-colors rounded-xl px-4 py-2 text-sm font-medium whitespace-nowrap"
        >
          <BookOpen size={16} />
          Ver recomendaciones para fotos
        </Link>
      </div>

    </div>
  )
}