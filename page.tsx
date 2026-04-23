"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { t } from "@/lib/i18n"

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [breakpoint])
  return isMobile
}

const BG = "#0d0d12"
const BG2 = "#111118"
const BORDER = "rgba(255,255,255,0.06)"
const os = "'Oswald', sans-serif"
const it = "'Inter', sans-serif"
const ACCENT = "#5aa0dc"
const S3 = "https://gaiprod-videos.s3.eu-north-1.amazonaws.com"

// ── Media assets (not translatable) ──────────────────────────────────────────
const FOR_WHO_ACCENTS = ["#5aa0dc", "#5ac878", "#dc785a", "#b478dc"]
const FOR_WHO_VIDEOS = [
  `${S3}/IMG_3909.MOV`,
  `${S3}/IMG_5083.MOV`,
  `${S3}/IMG_4939.MOV`,
  `${S3}/IMG_5576.MP4`,
]
const TRAINER_ACCENTS = ["#b478dc", "#dc78b4"]
const PROCESS_ICONS = ["📱", "▶️", "♾️"]
const PLAN_ACCENTS = ["#5aa0dc", "#5ac878", "#b478dc"]

const TRAINER_PHOTOS = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D1%85%D0%B0%D0%BD%D0%BD%D0%B0-8NOlR8Lhg5jAb1Ab3IBjpHmeKVnxwg.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BB%D0%B8%D0%B7%D0%B0%20%D0%BE%D0%B1%D1%8B%D1%87%D0%BD%D0%B0%D1%8F-pTu9zBrXdFBMaWG9XaWM9jneusyjtl.jpg",
]

const STACK_CARDS = [
  { bg: "#0a0a18", skewY: -14, dx: 0, dy: 120, w: 160, h: 280, z: 1, opacity: 0.5, video: `${S3}/IMG_3909.MOV` },
  { bg: "#0f1a30", skewY: -14, dx: 80, dy: 80, w: 185, h: 310, z: 2, opacity: 0.6, video: `${S3}/IMG_5576.MP4` },
  { bg: "#1a0f35", skewY: -14, dx: 168, dy: 40, w: 210, h: 340, z: 3, opacity: 0.7, video: `${S3}/IMG_5083.MOV` },
  { bg: "#0f2018", skewY: -14, dx: 265, dy: 10, w: 230, h: 365, z: 4, opacity: 0.8, video: `${S3}/IMG_4939.MOV` },
  { bg: "#102030", skewY: -14, dx: 370, dy: -20, w: 250, h: 390, z: 5, opacity: 0.9, video: `${S3}/IMG_2702.MP4` },
]

// ── Module videos (content comes from t.video.program.modules) ────────────────
const MODULE_VIDEOS = [
  `${S3}/IMG_3673.MP4`,
  `${S3}/IMG_2664.MP4`,
  `${S3}/IMG_5071.MP4`,
  `${S3}/IMG_3673.MP4`,
  `${S3}/IMG_4968.MOV`,
  `${S3}/Video+Editor+in+Action+_+Premiere+Pro+Timeline+Stock+Footage.mp4`,
  `${S3}/IMG_5259.MP4`,
  `${S3}/IMG_4080.MOV`,
  `${S3}/IMG_4080.MOV`,
  `${S3}/IMG_4080.MOV`,
  `${S3}/IMG_4080.MOV`,
  `${S3}/IMG_4080.MOV`,
  `${S3}/IMG_4080.MOV`,
  `${S3}/IMG_4080.MOV`,
  `${S3}/IMG_4080.MOV`,
  `${S3}/IMG_4080.MOV`,
]

const CTA_URL = "https://t.me/generationai_support"

// ── VideoInline ───────────────────────────────────────────────────────────────
function VideoInline({ src, style = {} }: { src: string; style?: React.CSSProperties }) {
  const [playing, setPlaying] = useState(false)
  const ref = useRef<HTMLVideoElement>(null)
  const toggle = () => {
    if (!ref.current) return
    if (playing) { ref.current.pause(); setPlaying(false) }
    else { ref.current.play().catch(() => { }); setPlaying(true) }
  }
  return (
    <div onClick={toggle} style={{ position: "relative", overflow: "hidden", cursor: "pointer", background: "#0a0a0a", ...style }}>
      <video ref={ref} src={src} loop muted playsInline preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      {!playing && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.35)" }}>
          <div style={{ width: "40px", height: "40px", border: "1.5px solid rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(4px)" }}>
            <div style={{ width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderLeft: "11px solid white", marginLeft: "2px" }} />
          </div>
        </div>
      )}
    </div>
  )
}

// ── CoursesDropdown ───────────────────────────────────────────────────────────
function CoursesDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handle(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener("mousedown", handle)
    return () => document.removeEventListener("mousedown", handle)
  }, [])
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)} style={{ background: "none", border: "none", fontFamily: it, fontSize: "13px", color: "rgba(255,255,255,0.6)", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", padding: "8px 18px", letterSpacing: "0.03em" }}>
        {t.common.nav.courses}
        <span style={{ fontSize: "8px", opacity: 0.45, display: "inline-block", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: "#15151f", border: `1px solid ${BORDER}`, borderRadius: "4px", padding: "6px 0", minWidth: "180px", zIndex: 60, boxShadow: "0 16px 40px rgba(0,0,0,0.7)" }}>
          <Link href="/photo" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: it, fontSize: "13px", color: "rgba(255,255,255,0.75)", textDecoration: "none", padding: "10px 16px" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#5aa0dc" }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#5aa0dc", flexShrink: 0 }} />
            {t.common.coursesDropdown.aiPhoto}
          </Link>
          <Link href="/video" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: it, fontSize: "13px", color: "rgba(255,255,255,0.75)", textDecoration: "none", padding: "10px 16px" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#5ac878" }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#5ac878", flexShrink: 0 }} />
            {t.common.coursesDropdown.aiCreator}
          </Link>
        </div>
      )}
    </div>
  )
}

// ── HeroCard ──────────────────────────────────────────────────────────────────
function HeroCard({ card }: { card: typeof STACK_CARDS[0] }) {
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => { if (videoRef.current) videoRef.current.play().catch(() => { }) }, [])
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "absolute", bottom: `${card.dy + (hovered ? 40 : 0)}px`, left: `${card.dx}px`, width: `${card.w}px`, height: `${card.h}px`, cursor: "pointer", zIndex: hovered ? 30 : card.z, transition: "bottom 0.3s cubic-bezier(0.25,0.46,0.45,0.94)" }}
    >
      <div style={{ width: "100%", height: "100%", borderRadius: "14px", background: card.bg, opacity: card.opacity, transform: `skewY(${card.skewY}deg)`, boxShadow: hovered ? "0 40px 70px rgba(0,0,0,0.9)" : "0 8px 24px rgba(0,0,0,0.5)", transition: "box-shadow 0.3s", overflow: "hidden", position: "relative" as const }}>
        <div style={{ position: "absolute", inset: 0, transform: `skewY(${-card.skewY}deg) scaleY(1.15)`, overflow: "hidden" }}>
          <video ref={videoRef} src={card.video} loop muted playsInline autoPlay preload="auto" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: hovered ? 0.8 : 0.5, transition: "opacity 0.4s" }} />
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "1px", background: "rgba(255,255,255,0.08)" }} />
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function VideoPage() {
  const isMobile = useIsMobile()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main style={{ overflowX: "hidden", fontFamily: it, background: BG }}>

      {/* ══ NAV ══ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "0 20px" : "0 56px", height: isMobile ? "56px" : "68px", background: "rgba(10,10,20,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <Link href="/" style={{ fontFamily: os, fontSize: isMobile ? "12px" : "15px", letterSpacing: "0.22em", color: "white", textTransform: "uppercase" as const, fontWeight: 700, textDecoration: "none" }}>{t.common.nav.logo}</Link>
        {isMobile ? (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer", padding: "8px" }}>{menuOpen ? "✕" : "☰"}</button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <CoursesDropdown />
            {[
              { label: t.common.nav.trainings, href: "/corporate" },
              { label: t.common.nav.production, href: "/production" },
              { label: t.common.nav.contact, href: CTA_URL, external: true },
            ].map((item, i) => (
              <a key={item.label} href={item.href} target={(item as any).external ? "_blank" : undefined} rel={(item as any).external ? "noopener noreferrer" : undefined}
                style={{ fontFamily: it, fontSize: "13px", color: i === 2 ? "#111" : "rgba(255,255,255,0.6)", textDecoration: "none", padding: "8px 18px", background: i === 2 ? "white" : "transparent", letterSpacing: "0.03em" }}>{item.label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* Mobile menu */}
      {isMobile && menuOpen && (
        <div style={{ position: "fixed", top: "56px", left: 0, right: 0, background: "rgba(10,10,20,0.97)", backdropFilter: "blur(12px)", zIndex: 49, borderBottom: `1px solid ${BORDER}`, padding: "20px" }}>
          {[
            { label: t.common.coursesDropdown.aiPhoto, href: "/photo" },
            { label: t.common.coursesDropdown.aiCreator, href: "/video" },
            { label: t.common.nav.trainings, href: "/corporate" },
            { label: t.common.nav.production, href: "/production" },
            { label: t.common.nav.contact, href: CTA_URL },
          ].map((item, i) => (
            <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} style={{ display: "block", fontFamily: it, fontSize: "14px", color: "rgba(255,255,255,0.7)", textDecoration: "none", padding: "14px 0", borderBottom: i < 4 ? `1px solid ${BORDER}` : "none" }}>{item.label}</Link>
          ))}
        </div>
      )}

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", height: "100vh", minHeight: isMobile ? "600px" : "800px", background: "#08080f", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: isMobile ? "56px" : "68px" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        {!isMobile && (
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "58%", overflow: "hidden" }}>
            <div style={{ position: "absolute", bottom: "15%", left: "0", right: "0", display: "flex", justifyContent: "center", paddingLeft: "200px" }}>
              {STACK_CARDS.map((card, i) => <HeroCard key={i} card={card} />)}
            </div>
            <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, transparent, #08080f)", zIndex: 20 }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to bottom, transparent, #08080f)", zIndex: 20 }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to top, transparent, #08080f)", zIndex: 20 }} />
          </div>
        )}

        {isMobile && (
          <div style={{ position: "absolute", inset: 0 }}>
            <video src={STACK_CARDS[4].video} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,8,15,0.5) 0%, rgba(8,8,15,0.3) 50%, rgba(8,8,15,0.8) 100%)" }} />
          </div>
        )}

        <div style={{ position: "relative", zIndex: 10, width: isMobile ? "100%" : "42%", marginLeft: isMobile ? "0" : "auto", paddingRight: isMobile ? "20px" : "80px", paddingLeft: isMobile ? "20px" : "0", textAlign: isMobile ? "center" : "left" as const }}>
          <div style={{ display: "inline-block", fontFamily: it, fontSize: isMobile ? "12px" : "11px", color: ACCENT, border: "0.5px solid rgba(90,160,220,0.33)", padding: "3px 12px", marginBottom: "20px", letterSpacing: "0.14em" }}>
            {t.video.hero.badge}
          </div>
          <h1 style={{ fontFamily: os, fontSize: isMobile ? "42px" : "60px", color: "white", textTransform: "uppercase" as const, lineHeight: 0.88, marginBottom: "22px", fontWeight: 700 }}>
            {t.video.hero.title}
          </h1>
          <p style={{ fontFamily: it, fontSize: isMobile ? "15px" : "16px", color: "rgba(255,255,255,0.5)", marginBottom: "36px", lineHeight: 1.65, maxWidth: isMobile ? "100%" : "420px" }}>
            {t.video.hero.subtitle}
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" as const, justifyContent: isMobile ? "center" : "flex-start", flexDirection: isMobile ? "column" : "row", width: isMobile ? "100%" : "auto" }}>
            <a href={CTA_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: ACCENT, color: "white", padding: isMobile ? "16px 32px" : "15px 36px", fontFamily: os, fontSize: isMobile ? "14px" : "13px", letterSpacing: "0.1em", textDecoration: "none", textAlign: "center" as const, minHeight: isMobile ? "48px" : "auto" }}>{t.video.hero.ctaPrimary}</a>
            <a href="#program" style={{ display: "inline-block", background: "transparent", border: "1px solid rgba(255,255,255,0.22)", color: "white", padding: isMobile ? "16px 32px" : "15px 36px", fontFamily: os, fontSize: isMobile ? "14px" : "13px", letterSpacing: "0.1em", textDecoration: "none", textAlign: "center" as const, minHeight: isMobile ? "48px" : "auto" }}>{t.video.hero.ctaSecondary}</a>
          </div>
          <div style={{ display: "flex", gap: "40px", marginTop: "48px", paddingTop: "40px", borderTop: `1px solid ${BORDER}`, justifyContent: isMobile ? "center" : "flex-start" }}>
            {t.video.stats.map((s, i) => (
              <div key={i} style={{ textAlign: isMobile ? "center" : "left" as const }}>
                <div style={{ fontFamily: os, fontSize: isMobile ? "28px" : "32px", color: "white", lineHeight: 1, fontWeight: 700 }}>{s.n}</div>
                <div style={{ fontFamily: it, fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "4px" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MARQUEE ══ */}
      <div style={{ background: ACCENT, overflow: "hidden", height: "56px", display: "flex", alignItems: "center", flexShrink: 0 }}>
        <div style={{ display: "flex", animation: "marquee 30s linear infinite", whiteSpace: "nowrap" as const, flexShrink: 0 }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} style={{ fontFamily: os, fontSize: "20px", letterSpacing: "0.08em", color: "white", marginRight: "48px", flexShrink: 0 }}>
              {t.video.marquee}
            </span>
          ))}
        </div>
      </div>

      {/* ══ ДЛЯ КОГО ══ */}
      <section style={{ background: BG2, padding: isMobile ? "60px 20px" : "120px 56px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{ fontFamily: os, fontSize: isMobile ? "38px" : "80px", color: "white", lineHeight: 0.9, marginBottom: isMobile ? "40px" : "64px", textTransform: "uppercase" as const, fontWeight: 700 }}
            dangerouslySetInnerHTML={{ __html: t.video.forWho.heading }}
          />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4,1fr)", gap: "1px", background: BORDER }}>
            {t.video.forWho.items.map((item, i) => (
              <div key={i} style={{ background: BG, display: "flex", flexDirection: "column" as const, overflow: "hidden", position: "relative" as const, transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#16161e")}
                onMouseLeave={e => (e.currentTarget.style.background = BG)}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: FOR_WHO_ACCENTS[i], zIndex: 1 }} />
                <div style={{ width: "100%", height: isMobile ? "180px" : "220px", flexShrink: 0, overflow: "hidden", position: "relative" as const }}>
                  <VideoInline src={FOR_WHO_VIDEOS[i]} style={{ width: "100%", height: "100%" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(13,13,18,0.7))", pointerEvents: "none" }} />
                </div>
                <div style={{ padding: isMobile ? "20px" : "24px 28px 32px" }}>
                  <h3 style={{ fontFamily: os, fontSize: isMobile ? "16px" : "18px", color: "white", marginBottom: "10px", fontWeight: 700 }}>{item.title}</h3>
                  <p style={{ fontFamily: it, fontSize: isMobile ? "12px" : "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ТРЕНЕРЫ ══ */}
      <section style={{ background: BG, padding: isMobile ? "60px 20px" : "120px 56px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ fontFamily: it, fontSize: isMobile ? "12px" : "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.28em", textTransform: "uppercase" as const, marginBottom: "16px" }}>{t.video.trainers.label}</div>
          <h2 style={{ fontFamily: os, fontSize: isMobile ? "38px" : "80px", color: "white", lineHeight: 0.9, marginBottom: isMobile ? "40px" : "72px", textTransform: "uppercase" as const, fontWeight: 700 }}>{t.video.trainers.heading}</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1px", background: BORDER }}>
            {t.video.trainers.items.map((trainer, i) => (
              <div key={i} style={{ background: BG2, overflow: "hidden", position: "relative" as const }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: TRAINER_ACCENTS[i], zIndex: 1 }} />
                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", height: isMobile ? "auto" : "420px" }}>
                  <div style={{ flexShrink: 0, width: isMobile ? "100%" : "45%", height: isMobile ? "260px" : "100%", position: "relative", overflow: "hidden", background: "#0a0a16" }}>
                    <img src={TRAINER_PHOTOS[i]} alt={trainer.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                    <div style={{ position: "absolute", inset: 0, background: isMobile ? "linear-gradient(to bottom, transparent 50%, rgba(17,17,24,0.9))" : "linear-gradient(to right, transparent 60%, rgba(17,17,24,0.95))" }} />
                  </div>
                  <div style={{ flex: 1, padding: isMobile ? "24px 20px 32px" : "40px 36px", display: "flex", flexDirection: "column" as const, justifyContent: "center" }}>
                    <div style={{ fontFamily: it, fontSize: "11px", color: TRAINER_ACCENTS[i], letterSpacing: "0.14em", textTransform: "uppercase" as const, marginBottom: "8px" }}>{trainer.role}</div>
                    <h3 style={{ fontFamily: os, fontSize: isMobile ? "28px" : "40px", color: "white", fontWeight: 700, lineHeight: 1, marginBottom: "24px" }}>{trainer.name}</h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column" as const, gap: "12px" }}>
                      {trainer.facts.map((fact, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: TRAINER_ACCENTS[i], flexShrink: 0, marginTop: "7px" }} />
                          <span style={{ fontFamily: it, fontSize: isMobile ? "13px" : "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ИНСТРУМЕНТЫ ══ */}
      <section style={{ background: BG2, padding: isMobile ? "60px 20px" : "120px 56px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{ fontFamily: os, fontSize: isMobile ? "36px" : "80px", color: "white", lineHeight: 0.9, marginBottom: isMobile ? "40px" : "64px", textTransform: "uppercase" as const, fontWeight: 700 }}
            dangerouslySetInnerHTML={{ __html: t.video.tools.heading }}
          />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5,1fr)", gap: "1px", background: BORDER }}>
            {t.video.tools.items.map((tool, i) => (
              <div key={i} style={{ background: BG, padding: isMobile ? "20px 16px" : "28px 24px", position: "relative" as const }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `${ACCENT}50` }} />
                <div style={{ fontFamily: it, fontSize: "10px", color: ACCENT, border: `0.5px solid ${ACCENT}40`, padding: "2px 8px", marginBottom: "12px", display: "inline-block", letterSpacing: "0.08em" }}>{tool.tag}</div>
                <h3 style={{ fontFamily: os, fontSize: isMobile ? "14px" : "16px", color: "white", marginBottom: "8px", fontWeight: 700 }}>{tool.name}</h3>
                <p style={{ fontFamily: it, fontSize: isMobile ? "11px" : "12px", color: "rgba(255,255,255,0.38)", lineHeight: 1.6 }}>{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ПРОГРАММА ══ */}
      <section id="program" style={{ background: BG, padding: isMobile ? "60px 20px" : "120px 56px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{ fontFamily: os, fontSize: isMobile ? "36px" : "80px", color: "white", lineHeight: 0.9, marginBottom: isMobile ? "40px" : "64px", textTransform: "uppercase" as const, fontWeight: 700 }}
            dangerouslySetInnerHTML={{ __html: t.video.program.heading }}
          />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1px", background: BORDER }}>
            {t.video.program.modules.map((mod, i) => (
              <div key={i} style={{ background: i % 2 === 0 ? BG2 : BG, display: "flex", flexDirection: isMobile ? "column" : (i % 2 === 0 ? "row" : "row-reverse"), overflow: "hidden", position: "relative" as const, minHeight: "180px", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#16161e")}
                onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? BG2 : BG)}
              >
                <div style={{ flexShrink: 0, width: isMobile ? "100%" : "140px", height: isMobile ? "160px" : "auto", position: "relative", overflow: "hidden" }}>
                  <VideoInline src={MODULE_VIDEOS[i] ?? MODULE_VIDEOS[MODULE_VIDEOS.length - 1]} style={{ width: "100%", height: "100%" }} />
                  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: isMobile ? "linear-gradient(to bottom, transparent 50%, rgba(13,13,18,0.7))" : (i % 2 === 0 ? "linear-gradient(to right, transparent 50%, rgba(13,13,18,0.9))" : "linear-gradient(to left, transparent 50%, rgba(13,13,18,0.9))") }} />
                </div>
                <div style={{ padding: isMobile ? "20px" : "24px 28px", flex: 1, display: "flex", flexDirection: "column" as const, justifyContent: "center" }}>
                  <div style={{ fontFamily: it, fontSize: "10px", color: mod.tag === "PRO" ? ACCENT : "rgba(255,255,255,0.2)", marginBottom: "6px", letterSpacing: "0.1em", border: mod.tag === "PRO" ? `0.5px solid ${ACCENT}40` : "none", display: "inline-block", padding: mod.tag === "PRO" ? "2px 8px" : "0", alignSelf: "flex-start" }}>{mod.tag}</div>
                  <h3 style={{ fontFamily: os, fontSize: isMobile ? "15px" : "17px", color: "white", marginBottom: "8px", fontWeight: 700, lineHeight: 1.2 }}>{mod.title}</h3>
                  <p style={{ fontFamily: it, fontSize: isMobile ? "12px" : "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.65, margin: 0 }}>{mod.content}</p>
                  {mod.result && <p style={{ fontFamily: it, fontSize: isMobile ? "11px" : "12px", color: ACCENT, lineHeight: 1.5, marginTop: "10px" }}>→ {mod.result}</p>}
                </div>
              </div>
            ))}

            {/* PRO бонус */}
            <div style={{ background: `${ACCENT}08`, border: `1px solid ${ACCENT}20`, padding: isMobile ? "20px" : "24px 28px", display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontFamily: it, fontSize: "10px", color: ACCENT, border: `1px solid ${ACCENT}40`, padding: "3px 10px", letterSpacing: "0.1em", flexShrink: 0 }}>PRO</span>
              <span style={{ fontFamily: os, fontSize: isMobile ? "14px" : "16px", color: "rgba(255,255,255,0.5)" }}>
                {t.video.program.proBonus.label} · {t.video.program.proBonus.items[0].title}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ КАК ПРОХОДИТ ОБУЧЕНИЕ ══ */}
      <section style={{ background: BG2, padding: isMobile ? "60px 20px" : "120px 56px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ fontFamily: it, fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.28em", textTransform: "uppercase" as const, marginBottom: "16px" }}>{t.video.process.label}</div>
          <h2
            style={{ fontFamily: os, fontSize: isMobile ? "36px" : "80px", color: "white", lineHeight: 0.9, marginBottom: isMobile ? "40px" : "0", textTransform: "uppercase" as const, fontWeight: 700 }}
            dangerouslySetInnerHTML={{ __html: t.video.process.heading }}
          />
          <div style={{ display: "flex", flexDirection: "column" as const }}>
            {t.video.process.items.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? "20px" : "48px", padding: isMobile ? "28px 0" : "40px 0", borderBottom: `1px solid ${BORDER}` }}>
                {!isMobile && <span style={{ fontFamily: os, fontSize: "120px", color: "rgba(255,255,255,0.04)", lineHeight: 1, fontWeight: 700, flexShrink: 0, width: "140px", textAlign: "right" as const }}>{item.num}</span>}
                <div style={{ width: isMobile ? "48px" : "64px", height: isMobile ? "48px" : "64px", border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: isMobile ? "20px" : "26px" }}>{PROCESS_ICONS[i]}</div>
                <div>
                  <h3 style={{ fontFamily: os, fontSize: isMobile ? "20px" : "32px", color: "white", marginBottom: "8px", fontWeight: 700 }}>{item.title}</h3>
                  <p style={{ fontFamily: it, fontSize: isMobile ? "13px" : "15px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, maxWidth: "540px" }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ РЕЗУЛЬТАТЫ ══ */}
      <section style={{ background: BG, padding: isMobile ? "60px 20px" : "120px 56px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ fontFamily: it, fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.28em", textTransform: "uppercase" as const, marginBottom: "16px" }}>{t.video.results.label}</div>
          <h2
            style={{ fontFamily: os, fontSize: isMobile ? "36px" : "80px", color: "white", lineHeight: 0.9, marginBottom: isMobile ? "40px" : "64px", textTransform: "uppercase" as const, fontWeight: 700 }}
            dangerouslySetInnerHTML={{ __html: t.video.results.heading }}
          />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: "1px", background: BORDER }}>
            {t.video.results.items.map((item, i) => (
              <div key={i} style={{ background: i % 2 === 0 ? BG2 : BG, padding: isMobile ? "24px 20px" : "36px 40px", position: "relative" as const }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "40px", height: "2px", background: ACCENT }} />
                <h3 style={{ fontFamily: os, fontSize: isMobile ? "16px" : "20px", color: "white", marginBottom: "10px", fontWeight: 700 }}>{item.title}</h3>
                <p style={{ fontFamily: it, fontSize: isMobile ? "13px" : "15px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ТАРИФЫ ══ */}
      <section style={{ background: BG2, padding: isMobile ? "60px 20px" : "120px 56px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{ fontFamily: os, fontSize: isMobile ? "36px" : "80px", color: "white", lineHeight: 0.9, marginBottom: isMobile ? "40px" : "64px", textTransform: "uppercase" as const, fontWeight: 700 }}
            dangerouslySetInnerHTML={{ __html: t.video.plans.heading }}
          />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: isMobile ? "16px" : "1px", background: isMobile ? "transparent" : BORDER }}>
            {t.video.plans.items.map((plan, i) => {
              const isCenter = i === 1
              return (
                <div key={i} style={{ background: isCenter ? `${PLAN_ACCENTS[i]}12` : BG, padding: isMobile ? "28px 20px" : (isCenter ? "48px 36px" : "40px 36px"), position: "relative" as const, display: "flex", flexDirection: "column" as const, transform: !isMobile && isCenter ? "scaleY(1.03)" : "none", transformOrigin: "top", boxShadow: isCenter ? `0 0 0 1px ${PLAN_ACCENTS[i]}40, 0 24px 48px rgba(0,0,0,0.4)` : "none", zIndex: isCenter ? 2 : 1, border: isMobile ? `1px solid ${isCenter ? PLAN_ACCENTS[i] + "50" : BORDER}` : "none" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: isCenter ? "3px" : "2px", background: isCenter ? PLAN_ACCENTS[i] : `${PLAN_ACCENTS[i]}40` }} />
                  {isCenter && (
                    <div style={{ position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)", background: PLAN_ACCENTS[i], color: "#0a1a0a", fontFamily: os, fontSize: "10px", letterSpacing: "0.12em", padding: "4px 14px", fontWeight: 700 }}>{t.video.plans.items[1].badge ?? "ПОПУЛЯРНЫЙ"}</div>
                  )}
                  {plan.badge && !isCenter && (
                    <div style={{ display: "inline-block", fontFamily: it, fontSize: "10px", color: PLAN_ACCENTS[i], border: `0.5px solid ${PLAN_ACCENTS[i]}`, padding: "3px 8px", marginBottom: "12px", alignSelf: "flex-start", opacity: 0.8 }}>{plan.badge}</div>
                  )}
                  <h3 style={{ fontFamily: os, fontSize: isCenter ? "40px" : "32px", color: "white", fontWeight: 700, marginBottom: "8px" }}>{plan.name}</h3>
                  <p style={{ fontFamily: it, fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "32px", lineHeight: 1.5 }}>{plan.subtitle}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px 0", flex: 1 }}>
                    {plan.features.map((f, j) => (
                      <li key={j} style={{ fontFamily: it, fontSize: "13px", color: "rgba(255,255,255,0.5)", padding: "8px 0", borderBottom: `1px solid ${BORDER}`, display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <span style={{ color: PLAN_ACCENTS[i], flexShrink: 0 }}>✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ fontFamily: os, fontSize: isCenter ? "52px" : "44px", color: isCenter ? PLAN_ACCENTS[i] : "white", fontWeight: 700, marginBottom: "24px" }}>{plan.price}</div>
                  <a href={CTA_URL} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center" as const, background: isCenter ? PLAN_ACCENTS[i] : "transparent", border: isCenter ? "none" : "1px solid rgba(255,255,255,0.2)", color: isCenter ? "#0a1a0a" : "white", padding: isCenter ? "16px 24px" : "14px 24px", fontFamily: os, fontSize: "13px", letterSpacing: "0.1em", textDecoration: "none", fontWeight: isCenter ? 700 : 400 }}>{plan.cta}</a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ background: BG, padding: isMobile ? "60px 20px" : "120px 56px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {isMobile ? (
            <>
              <h2
                style={{ fontFamily: os, fontSize: "36px", color: "white", lineHeight: 0.9, textTransform: "uppercase" as const, fontWeight: 700, marginBottom: "36px" }}
                dangerouslySetInnerHTML={{ __html: t.video.faq.heading }}
              />
              {t.video.faq.items.map((item, i) => (
                <div key={i} style={{ borderTop: `1px solid ${BORDER}` }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", cursor: "pointer", background: "none", border: "none", textAlign: "left" as const }}>
                    <span style={{ fontFamily: os, fontSize: "16px", color: "white", maxWidth: "85%" }}>{item.q}</span>
                    <span style={{ fontFamily: os, fontSize: "26px", color: openFaq === i ? ACCENT : "rgba(255,255,255,0.2)", flexShrink: 0, marginLeft: "16px", lineHeight: 1, transition: "color 0.2s" }}>{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && <p style={{ fontFamily: it, fontSize: "14px", color: "rgba(255,255,255,0.38)", lineHeight: 1.85, paddingBottom: "20px" }}>{item.a}</p>}
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${BORDER}` }} />
            </>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "80px", alignItems: "start" }}>
              <div style={{ position: "sticky", top: "96px" }}>
                <h2
                  style={{ fontFamily: os, fontSize: "80px", color: "white", lineHeight: 0.88, textTransform: "uppercase" as const, fontWeight: 700, marginBottom: "28px" }}
                  dangerouslySetInnerHTML={{ __html: t.video.faq.heading }}
                />
                <p style={{ fontFamily: it, fontSize: "15px", color: "rgba(255,255,255,0.25)", lineHeight: 1.7 }}>{t.corporate.faq.moreQuestionsLabel}</p>
                <a href={CTA_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "24px", fontFamily: it, fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: "2px" }}>{t.common.cta.writeTelegram}</a>
              </div>
              <div>
                {t.video.faq.items.map((item, i) => (
                  <div key={i} style={{ borderTop: `1px solid ${BORDER}` }}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 0", cursor: "pointer", background: "none", border: "none", textAlign: "left" as const }}>
                      <span style={{ fontFamily: os, fontSize: "19px", color: "white", maxWidth: "85%" }}>{item.q}</span>
                      <span style={{ fontFamily: os, fontSize: "28px", color: openFaq === i ? ACCENT : "rgba(255,255,255,0.2)", flexShrink: 0, marginLeft: "20px", lineHeight: 1, transition: "color 0.2s" }}>{openFaq === i ? "−" : "+"}</span>
                    </button>
                    {openFaq === i && <p style={{ fontFamily: it, fontSize: "15px", color: "rgba(255,255,255,0.38)", lineHeight: 1.85, paddingBottom: "28px", maxWidth: "520px" }}>{item.a}</p>}
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${BORDER}` }} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══ ФИНАЛЬНЫЙ CTA ══ */}
      <section style={{ background: BG2, padding: isMobile ? "60px 20px" : "160px 56px 140px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "80px", alignItems: "center" }}>
          <h2 style={{ fontFamily: os, fontSize: isMobile ? "36px" : "80px", color: "white", lineHeight: 0.9, textTransform: "uppercase" as const, fontWeight: 700 }}>
            {t.video.finalCta.heading}
          </h2>
          <div>
            <p style={{ fontFamily: it, fontSize: isMobile ? "15px" : "17px", color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginBottom: isMobile ? "28px" : "40px" }}>
              {t.video.finalCta.body}
            </p>
            <a href={CTA_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "white", color: "#111110", padding: isMobile ? "14px 32px" : "18px 44px", fontFamily: os, fontSize: "14px", letterSpacing: "0.14em", textDecoration: "none", textTransform: "uppercase" as const }}>
              {t.video.finalCta.button}
            </a>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: BG, padding: isMobile ? "28px 20px" : "40px 56px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "center", gap: isMobile ? "20px" : "0", marginBottom: "20px" }}>
            <Link href="/" style={{ fontFamily: os, fontSize: isMobile ? "14px" : "16px", color: "white", letterSpacing: "0.15em", textDecoration: "none" }}>
              {t.common.nav.logo}
            </Link>
            <div style={{ display: "flex", gap: isMobile ? "20px" : "32px" }}>
              {[
                { href: "https://t.me/thegenerationai", label: "Telegram" },
                { href: "https://www.instagram.com/thegenerationai", label: "Instagram" },
                { href: "https://youtube.com/@the-generationai", label: "YouTube" },
                { href: "mailto:info@newgeneraition.ai", label: "Email" },
              ].map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: it, fontSize: "12px", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{item.label}</a>
              ))}
            </div>
          </div>
          <div style={{ height: "1px", background: BORDER, marginBottom: "20px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: it, fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>{t.common.footer.copyrightFull}</span>
            <span style={{ fontFamily: it, fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>{t.video.footer.tagline}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "20px", paddingTop: "16px", borderTop: `1px solid ${BORDER}` }}>
            <Link href="/terms" style={{ fontFamily: it, fontSize: "11px", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>Условия использования</Link>
            <Link href="/privacy" style={{ fontFamily: it, fontSize: "11px", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>Политика конфиденциальности</Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Inter:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </main>
  )
}