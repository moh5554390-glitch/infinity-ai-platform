"use client";

import { useState, useCallback, useRef } from "react";

type PageId = "home" | "features" | "pricing" | "gallery" | "faq" | "contact" | "download";

const NAV: { id: PageId; label: string; icon: string }[] = [
  { id: "home", label: "الرئيسية", icon: "∞" },
  { id: "features", label: "المميزات", icon: "✦" },
  { id: "pricing", label: "الاشتراكات", icon: "◈" },
  { id: "gallery", label: "معرض الأعمال", icon: "▣" },
  { id: "faq", label: "الأسئلة الشائعة", icon: "?" },
  { id: "contact", label: "التواصل والدعم", icon: "✉" },
  { id: "download", label: "تحميل التطبيق", icon: "↓" },
];

export default function LandingPlatform() {
  const [page, setPage] = useState<PageId>("home");
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const [displayPage, setDisplayPage] = useState<PageId>("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("الرئيسية");
  const transitioning = useRef(false);
  const [secretStep, setSecretStep] = useState(0);
  const secretTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminStep, setAdminStep] = useState<1 | 2 | 3>(1);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [adminError, setAdminError] = useState("");

  const navigate = useCallback((id: PageId) => {
    if (id === page || transitioning.current) return;
    transitioning.current = true;
    setDrawerOpen(false);
    setPhase("out");
    setTimeout(() => {
      setDisplayPage(id);
      setPage(id);
      setHeaderTitle(NAV.find((n) => n.id === id)?.label || "");
      setPhase("in");
      window.scrollTo({ top: 0 });
      setTimeout(() => { setPhase("idle"); transitioning.current = false; }, 420);
    }, 280);
  }, [page]);

  const handleSecret = (word: "Infinity" | "Beyond" | "Intelligence") => {
    if (secretTimer.current) clearTimeout(secretTimer.current);
    if (word === "Infinity") setSecretStep(1);
    else if (word === "Beyond" && secretStep >= 1) setSecretStep(secretStep + 1);
    else if (word === "Intelligence" && secretStep >= 2) { setShowAdmin(true); setSecretStep(0); return; }
    else setSecretStep(word === "Infinity" ? 1 : 0);
    secretTimer.current = setTimeout(() => setSecretStep(0), 4000);
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError("");
    if (adminStep === 1) {
      if (adminEmail === "moh5554390@gmail.com" && adminPass === "Admin password") setAdminStep(2);
      else setAdminError("بيانات الدخول غير صحيحة");
    } else if (adminStep === 2) {
      if (adminCode.length >= 4) setAdminStep(3);
      else setAdminError("رمز التحقق غير صحيح");
    } else if (adminStep === 3) {
      if (adminSecret === "Admin password") {
        alert("تم الدخول إلى لوحة الإدارة");
        setShowAdmin(false); setAdminStep(1);
      } else setAdminError("المفتاح السري غير صحيح");
    }
  };

  const contentStyle: React.CSSProperties = {
    transition: "opacity 0.28s ease, transform 0.28s ease, filter 0.28s ease",
    opacity: phase === "out" ? 0 : 1,
    transform: phase === "out" ? "scale(0.97) translateY(8px)" : "scale(1) translateY(0)",
    filter: phase === "out" ? "blur(4px)" : "blur(0)",
    pointerEvents: phase === "out" ? "none" : "auto",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(106,45,255,0.22), transparent), #05050a" }}>
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, height: 56, zIndex: 40, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", background: "rgba(8,8,14,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(139,92,255,0.2)" }}>
        <button type="button" className="infinity-menu-btn" onClick={() => setDrawerOpen(true)} style={{ background: "transparent", border: "none", color: "#ccc", fontSize: 20, cursor: "pointer", padding: 8 }}>☰</button>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>∞ Infinity AI</span>
          <span style={{ fontSize: 13, color: "#9ca3af" }}>{headerTitle}</span>
        </div>
        <button type="button" onClick={() => navigate("download")} style={{ padding: "8px 16px", borderRadius: 999, border: "none", background: "linear-gradient(to left, #6a2dff, #00afff)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>ابدأ مجاناً</button>
      </header>

      <aside className="infinity-sidebar" style={{ position: "fixed", top: 56, right: 0, bottom: 0, width: 240, zIndex: 30, background: "rgba(10,10,18,0.95)", borderLeft: "1px solid rgba(139,92,255,0.15)", display: "flex", flexDirection: "column", padding: "16px 0" }}>
        <div style={{ padding: "8px 20px 20px", fontWeight: 700, fontSize: 18 }}>∞ Infinity</div>
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, padding: "0 8px" }}>
          {NAV.map((item) => {
            const active = page === item.id;
            return (
              <button key={item.id} type="button" onClick={() => navigate(item.id)} style={{
                display: "flex", alignItems: "center", width: "100%", textAlign: "right", padding: "12px 14px", border: "none", borderRadius: 10,
                background: active ? "rgba(106,45,255,0.25)" : "transparent", color: active ? "#c4b5fd" : "#9ca3af",
                boxShadow: active ? "inset -3px 0 0 #8b5cff" : "none", fontSize: 14, cursor: "pointer",
              }}>
                <span style={{ marginLeft: 10 }}>{item.icon}</span>{item.label}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: 16 }}>
          <button type="button" onClick={() => navigate("download")} style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "linear-gradient(to left, #6a2dff, #00afff)", color: "#fff", fontWeight: 600, cursor: "pointer" }}>تحميل التطبيق</button>
        </div>
      </aside>

      {drawerOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 50, display: "flex", justifyContent: "flex-end" }} onClick={() => setDrawerOpen(false)}>
          <div style={{ width: 280, height: "100%", background: "#0d0d16", padding: "24px 12px" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "8px 12px 20px", fontWeight: 700, fontSize: 18 }}>∞ Infinity</div>
            {NAV.map((item) => (
              <button key={item.id} type="button" onClick={() => navigate(item.id)} style={{
                display: "block", width: "100%", textAlign: "right", padding: "12px 14px", border: "none", borderRadius: 10,
                background: page === item.id ? "rgba(106,45,255,0.25)" : "transparent", color: page === item.id ? "#c4b5fd" : "#9ca3af", cursor: "pointer", fontSize: 14,
              }}>{item.icon} {item.label}</button>
            ))}
          </div>
        </div>
      )}

      <main className="infinity-main" style={{ flex: 1, marginTop: 56, padding: "32px 24px 48px", minHeight: "calc(100vh - 156px)" }}>
        <div style={contentStyle}>
          {displayPage === "home" && (
            <div>
              <section style={{ textAlign: "center", padding: "48px 0 32px", maxWidth: 800, margin: "0 auto" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(15,15,25,0.8)", border: "1px solid rgba(139,92,255,0.3)", fontSize: 13, color: "#c4b5fd", marginBottom: 24 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                  مدعوم بأقوى نماذج الذكاء الاصطناعي
                </div>
                <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, margin: "0 0 20px", lineHeight: 1.25 }}>
                  Infinity AI<br />
                  <span style={{ background: "linear-gradient(135deg, #8b5cff, #00afff, #ffb545)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ذكاء اصطناعي بلا حدود</span>
                </h1>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "#a1a1aa", maxWidth: 640, margin: "0 auto 12px" }}>
                  منصة ذكاء اصطناعي متكاملة تجمع عشرات النماذج الذكية داخل مكان واحد، وتمنحك القدرة على إنشاء الصور، الفيديوهات، المواقع، التطبيقات، الأكواد البرمجية، المحتوى، وتحليل الملفات والأبحاث.
                </p>
                <p style={{ fontSize: 15, color: "#9ca3af", maxWidth: 640, margin: "0 auto" }}>
                  ابدأ مشروعك من فكرة بسيطة وحوّله إلى منتج احترافي خلال دقائق، مع نظام ذكي يحلّل نتائج عدة نماذج ويختار أفضل إجابة موحدة لك.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 28 }}>
                  <button type="button" onClick={() => navigate("download")} style={{ padding: "14px 28px", borderRadius: 999, border: "none", background: "linear-gradient(to left, #6a2dff, #00afff)", color: "#fff", fontWeight: 600, cursor: "pointer" }}>ابدأ مجاناً</button>
                  <button type="button" onClick={() => navigate("features")} style={{ padding: "14px 28px", borderRadius: 999, border: "1px solid rgba(139,92,255,0.4)", background: "rgba(15,15,25,0.6)", color: "#fff", cursor: "pointer" }}>اكتشف المميزات</button>
                </div>
                <div style={{ marginTop: 48, fontSize: 80, background: "linear-gradient(135deg, #8b5cff, #00afff, #ffb545)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>∞</div>
              </section>
              <section style={{ padding: "40px 0", maxWidth: 1100, margin: "0 auto" }}>
                <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: "center", marginBottom: 28 }}>لماذا Infinity؟</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                  {["السرعة|تنفيذ المهام خلال ثوانٍ.", "الجودة|دمج نتائج عدة نماذج للحصول على أفضل نتيجة.", "الاحترافية|تصميم عصري وأدوات للمحترفين والمبتدئين.", "الأمان|حفظ بياناتك ومشاريعك داخل حسابك.", "التخزين السحابي|الوصول إلى ملفاتك من أي جهاز.", "التحديث المستمر|إضافة أدوات جديدة باستمرار."].map((x) => {
                    const [t, d] = x.split("|");
                    return (
                      <div key={t} style={{ background: "rgba(15,15,25,0.75)", border: "1px solid rgba(139,92,255,0.22)", borderRadius: 16, padding: 20 }}>
                        <h3 style={{ margin: "0 0 8px", fontSize: 16, color: "#c4b5fd" }}>{t}</h3>
                        <p style={{ margin: 0, fontSize: 14, color: "#9ca3af", lineHeight: 1.7 }}>{d}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}

          {displayPage === "features" && (
            <div style={{ padding: "40px 0", maxWidth: 1100, margin: "0 auto" }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: "center", marginBottom: 16 }}>المميزات والخدمات</h2>
              <p style={{ textAlign: "center", color: "#a1a1aa", marginBottom: 32, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
                المنصة التعريفية تعرض الإمكانيات. التنفيذ من خلال التطبيق. المتجر داخل التطبيق فقط وليس هنا.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                {["إنشاء الصور", "تعديل الصور", "إنشاء الفيديوهات", "تعديل الفيديو", "إنشاء المواقع", "إنشاء التطبيقات", "كتابة الأكواد", "تحليل الملفات", "البحث الذكي", "كتابة المحتوى", "تصميم الشعارات", "إنشاء الإعلانات", "AI Agents", "الشات الذكي", "تحسين البرومبت"].map((t) => (
                  <div key={t} style={{ background: "rgba(15,15,25,0.75)", border: "1px solid rgba(139,92,255,0.22)", borderRadius: 16, padding: 20 }}>
                    <h3 style={{ margin: 0, fontSize: 16, color: "#c4b5fd" }}>{t}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {displayPage === "pricing" && (
            <div style={{ padding: "40px 0", maxWidth: 1100, margin: "0 auto" }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: "center", marginBottom: 28 }}>الاشتراكات</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                {[{
                  name: "Infinity Free", price: "مجاني", f: ["20 صورة يومياً", "10 فيديوهات", "شات بلا حدود"]
                }, {
                  name: "Infinity Plus", price: "قريباً", f: ["حدود أعلى", "أولوية", "دعم أولوية"]
                }, {
                  name: "Infinity Pro", price: "قريباً", f: ["أعلى الحدود", "تعاون فرق", "دعم مخصص"]
                }].map((p) => (
                  <div key={p.name} style={{ background: "rgba(15,15,25,0.75)", border: "1px solid rgba(139,92,255,0.22)", borderRadius: 16, padding: 20 }}>
                    <h3 style={{ color: "#c4b5fd" }}>{p.name}</h3>
                    <p style={{ fontSize: 28, fontWeight: 700 }}>{p.price}</p>
                    <ul style={{ color: "#9ca3af", fontSize: 14 }}>{p.f.map((x) => <li key={x}>{x}</li>)}</ul>
                    <button type="button" onClick={() => navigate("download")} style={{ width: "100%", marginTop: 12, padding: 12, borderRadius: 10, border: "none", background: "linear-gradient(to left, #6a2dff, #00afff)", color: "#fff", cursor: "pointer" }}>ابدأ الآن</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {displayPage === "gallery" && (
            <div style={{ padding: "40px 0", maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>معرض الأعمال</h2>
              <p style={{ color: "#a1a1aa", marginBottom: 32 }}>نماذج من إمكانيات Infinity AI</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
                {["صور", "فيديوهات", "مواقع", "شعارات", "إعلانات", "تطبيقات"].map((t) => (
                  <div key={t} style={{ background: "rgba(15,15,25,0.75)", border: "1px solid rgba(139,92,255,0.22)", borderRadius: 16, padding: 40, color: "#c4b5fd", fontWeight: 600 }}>{t}</div>
                ))}
              </div>
            </div>
          )}

          {displayPage === "faq" && (
            <div style={{ padding: "40px 0", maxWidth: 720, margin: "0 auto" }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: "center", marginBottom: 28 }}>الأسئلة الشائعة</h2>
              {[{
                q: "كيف أبدأ؟", a: "حمّل التطبيق أو افتحه كـ Web App من صفحة التحميل."
              }, {
                q: "أين المتجر؟", a: "المتجر داخل التطبيق فقط، وليس في هذه المنصة التعريفية."
              }, {
                q: "هل الشات محدود؟", a: "لا — الشات والكتابة بلا حدود في الخطة المجانية."
              }, {
                q: "كيف أدفع؟", a: "عبر المحفظة الإلكترونية من داخل التطبيق."
              }].map((f) => (
                <details key={f.q} style={{ background: "rgba(15,15,25,0.75)", border: "1px solid rgba(139,92,255,0.22)", borderRadius: 16, padding: 16, marginBottom: 12 }}>
                  <summary style={{ cursor: "pointer", fontWeight: 600 }}>{f.q}</summary>
                  <p style={{ color: "#9ca3af", marginTop: 10 }}>{f.a}</p>
                </details>
              ))}
            </div>
          )}

          {displayPage === "contact" && (
            <div style={{ padding: "40px 0", maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>التواصل والدعم</h2>
              <div style={{ background: "rgba(15,15,25,0.75)", border: "1px solid rgba(139,92,255,0.22)", borderRadius: 16, padding: 24, textAlign: "right" }}>
                <p style={{ color: "#9ca3af" }}>• بوت تيليجرام الرسمي (يُعلن لاحقاً)</p>
                <p style={{ color: "#9ca3af" }}>• من داخل التطبيق: قسم المساعدة</p>
                <p style={{ color: "#9ca3af" }}>• البريد: moh5554390@gmail.com</p>
              </div>
            </div>
          )}

          {displayPage === "download" && (
            <div style={{ padding: "40px 0", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>تحميل التطبيق</h2>
              <p style={{ color: "#a1a1aa", marginBottom: 32 }}>Android · iPhone · iPad · Windows · macOS · Web App</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginBottom: 24 }}>
                {["Android", "iPhone", "iPad", "Windows", "macOS", "Web App"].map((p) => (
                  <div key={p} style={{ background: "rgba(15,15,25,0.75)", border: "1px solid rgba(139,92,255,0.22)", borderRadius: 12, padding: 16, fontWeight: 600 }}>{p}</div>
                ))}
              </div>
              <button type="button" style={{ padding: "14px 28px", borderRadius: 999, border: "none", background: "linear-gradient(to left, #6a2dff, #00afff)", color: "#fff", fontWeight: 600, cursor: "pointer" }}>فتح التطبيق الآن</button>
            </div>
          )}
        </div>
      </main>

      <footer className="infinity-footer" style={{ borderTop: "1px solid rgba(139,92,255,0.15)", padding: "24px 16px", textAlign: "center", color: "#888", fontSize: 14 }}>
        <p style={{ margin: 0 }}>
          <span style={{ cursor: "default", userSelect: "none" }} onClick={() => handleSecret("Infinity")}>Infinity</span>{" "}
          <span style={{ color: "#8b5cff" }}>AI</span>{" — "}
          <span style={{ cursor: "default", userSelect: "none" }} onClick={() => handleSecret("Beyond")}>Beyond</span>{" "}
          <span style={{ cursor: "default", userSelect: "none" }} onClick={() => handleSecret("Intelligence")}>Intelligence</span>
        </p>
        <p style={{ margin: "8px 0 0", fontSize: 12, color: "#555" }}>© {new Date().getFullYear()} Infinity AI</p>
      </footer>

      {showAdmin && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <form onSubmit={handleAdminSubmit} style={{ background: "#12121c", border: "1px solid rgba(139,92,255,0.4)", borderRadius: 16, padding: 24, width: "100%", maxWidth: 400 }}>
            <h2 style={{ margin: "0 0 8px", fontSize: 18 }}>لوحة الإدارة</h2>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 16 }}>
              {adminStep === 1 ? "أدخل بيانات الدخول" : adminStep === 2 ? "أدخل رمز التحقق" : "أدخل المفتاح السري"}
            </p>
            {adminStep === 1 && (
              <>
                <input style={inp} type="email" placeholder="البريد" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required />
                <input style={inp} type="password" placeholder="كلمة المرور" value={adminPass} onChange={(e) => setAdminPass(e.target.value)} required />
              </>
            )}
            {adminStep === 2 && <input style={inp} type="text" placeholder="رمز التحقق" value={adminCode} onChange={(e) => setAdminCode(e.target.value)} required />}
            {adminStep === 3 && <input style={inp} type="password" placeholder="المفتاح السري" value={adminSecret} onChange={(e) => setAdminSecret(e.target.value)} required />}
            {adminError && <p style={{ color: "#f66", fontSize: 13 }}>{adminError}</p>}
            <div style={{ display: "flex", gap: 8 }}>
              <button type="submit" style={{ flex: 1, padding: 12, borderRadius: 10, border: "none", background: "linear-gradient(to left, #6a2dff, #00afff)", color: "#fff", fontWeight: 600, cursor: "pointer" }}>{adminStep === 3 ? "دخول" : "التالي"}</button>
              <button type="button" onClick={() => { setShowAdmin(false); setAdminStep(1); }} style={{ padding: "12px 16px", borderRadius: 10, border: "1px solid #444", background: "transparent", color: "#ccc", cursor: "pointer" }}>إلغاء</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

const inp: React.CSSProperties = {
  width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(139,92,255,0.3)",
  background: "#0a0a12", color: "#fff", marginBottom: 10, boxSizing: "border-box", fontSize: 14,
};
