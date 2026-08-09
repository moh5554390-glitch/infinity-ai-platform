"use client";

import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "";

export default function AdminPage() {
  const [view, setView] = useState<"login" | "dash" | "payments">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [fromSecret, setFromSecret] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const q = new URLSearchParams(window.location.search);
      if (q.get("from") === "secret") {
        setFromSecret(true);
        window.history.replaceState({}, "", "/admin");
      }
    }
    const t = localStorage.getItem("infinity_admin_token");
    if (t) {
      setToken(t);
      setView("dash");
    }
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!API) {
        if (email === "moh5554390@gmail.com" && password === "Admin password") {
          localStorage.setItem("infinity_admin_token", "demo-admin");
          setToken("demo-admin");
          setView("dash");
        } else setError("بيانات غير صحيحة");
        setLoading(false);
        return;
      }
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل الدخول");
      if (data.user?.role !== "admin") throw new Error("ليس أدمن");
      localStorage.setItem("infinity_admin_token", data.token);
      setToken(data.token);
      setView("dash");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "خطأ");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("infinity_admin_token");
    setToken("");
    setView("login");
  }

  if (view === "login") {
    return (
      <div style={wrap}>
        <form onSubmit={login} style={card}>
          <h1 style={{ margin: "0 0 8px", fontSize: 22 }}>لوحة إدارة Infinity AI</h1>
          <p style={{ color: "#888", fontSize: 14, marginBottom: 16 }}>
            {fromSecret ? "تم التحقق من التسلسل السري — أكمل الدخول" : "دخول الأدمن فقط"}
          </p>
          {fromSecret && (
            <div style={badge}>✓ Infinity → Beyond → Intelligence</div>
          )}
          <input type="email" placeholder="البريد" value={email} onChange={(e) => setEmail(e.target.value)} required style={input} />
          <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} required style={input} />
          {error && <p style={{ color: "#f66", fontSize: 13 }}>{error}</p>}
          <button type="submit" disabled={loading} style={btn}>
            {loading ? "جاري..." : "دخول"}
          </button>
          <p style={{ textAlign: "center", marginTop: 16, fontSize: 12 }}>
            <a href="/" style={{ color: "#8b5cff" }}>العودة للمنصة</a>
          </p>
        </form>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={aside}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 24 }}>∞ Infinity Admin</div>
        <button type="button" onClick={() => setView("dash")} style={nav(view === "dash")}>نظرة عامة</button>
        <button type="button" onClick={() => setView("payments")} style={nav(view === "payments")}>طلبات الدفع</button>
        <div style={{ flex: 1 }} />
        <a href="/" style={{ color: "#888", fontSize: 13, marginBottom: 12, textDecoration: "none" }}>المنصة التعريفية</a>
        <button type="button" onClick={logout} style={{ background: "none", border: "none", color: "#f66", cursor: "pointer", textAlign: "right" }}>خروج</button>
      </aside>
      <main style={{ flex: 1, padding: 28 }}>
        {view === "dash" && (
          <>
            <h2 style={{ marginTop: 0 }}>نظرة عامة</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 16 }}>
              <div style={stat}><div style={{ color: "#888", fontSize: 13 }}>الحالة</div><div style={{ color: "#4ade80", fontWeight: 700, fontSize: 20, marginTop: 6 }}>يعمل</div></div>
              <div style={stat}><div style={{ color: "#888", fontSize: 13 }}>Backend</div><div style={{ color: API ? "#4ade80" : "#fbbf24", fontWeight: 700, fontSize: 18, marginTop: 6 }}>{API ? "مربوط" : "تجريبي"}</div></div>
              <div style={stat}><div style={{ color: "#888", fontSize: 13 }}>الوضع</div><div style={{ fontWeight: 700, fontSize: 18, marginTop: 6 }}>{token === "demo-admin" ? "Demo" : "Live"}</div></div>
            </div>
            <div style={{ ...stat, marginTop: 24 }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 15 }}>خريطة الربط</h3>
              <ul style={{ margin: 0, paddingRight: 18, color: "#9ca3af", fontSize: 14, lineHeight: 1.9 }}>
                <li>المنصة → التسلسل السري → /admin</li>
                <li>التطبيق → Auth/Chat → Backend API</li>
                <li>بوت تيليجرام → مهام ودعم وتفعيل دفع</li>
                <li>واتساب → WhatsApp Business API</li>
                <li>قاعدة البيانات → PostgreSQL</li>
              </ul>
            </div>
          </>
        )}
        {view === "payments" && (
          <>
            <h2 style={{ marginTop: 0 }}>طلبات الدفع</h2>
            <p style={{ color: "#888" }}>
              اربط Backend (NEXT_PUBLIC_API_URL) لعرض الطلبات الحقيقية وتفعيلها.
            </p>
          </>
        )}
      </main>
    </div>
  );
}

const wrap: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: 20,
  background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(106,45,255,0.2), transparent), #0a0a12",
};
const card: React.CSSProperties = {
  background: "#12121c",
  padding: 32,
  borderRadius: 16,
  width: "100%",
  maxWidth: 400,
  border: "1px solid #2c1758",
};
const badge: React.CSSProperties = {
  background: "rgba(106,45,255,0.15)",
  border: "1px solid rgba(139,92,255,0.4)",
  borderRadius: 10,
  padding: 12,
  marginBottom: 16,
  fontSize: 13,
  color: "#c4b5fd",
};
const input: React.CSSProperties = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "1px solid #2c1758",
  background: "#0a0a12",
  color: "#fff",
  marginBottom: 12,
  boxSizing: "border-box",
  fontSize: 14,
};
const btn: React.CSSProperties = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(to left, #6a2dff, #00afff)",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};
const aside: React.CSSProperties = {
  width: 220,
  background: "#0d0d16",
  borderLeft: "1px solid #1e1e2e",
  padding: 16,
  display: "flex",
  flexDirection: "column",
};
const nav = (active: boolean): React.CSSProperties => ({
  display: "block",
  width: "100%",
  textAlign: "right",
  padding: "10px 12px",
  border: "none",
  borderRadius: 8,
  background: active ? "#1a1030" : "transparent",
  color: active ? "#c4b5fd" : "#aaa",
  cursor: "pointer",
  marginBottom: 4,
  fontSize: 14,
});
const stat: React.CSSProperties = {
  background: "#12121c",
  border: "1px solid #2c1758",
  borderRadius: 12,
  padding: 20,
};
