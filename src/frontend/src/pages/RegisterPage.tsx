import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import { Lock, Phone, User } from "lucide-react";
import { useRef, useState } from "react";
import { createActor } from "../backend";
import { AuthCard } from "../components/AuthCard";
import { PaymentLogos } from "../components/PaymentLogos";

const iconStyle: React.CSSProperties = {
  padding: "0 12px",
  color: "#9ca3af",
  display: "flex",
  alignItems: "center",
  borderRight: "1px solid #e5e7eb",
  height: 46,
};

const inputFieldStyle: React.CSSProperties = {
  flex: 1,
  padding: "12px 14px",
  border: "none",
  background: "transparent",
  outline: "none",
  fontSize: 14,
  color: "#374151",
};

const inputWrapStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #d1d5db",
  borderRadius: 8,
  background: "#f9fafb",
  overflow: "hidden",
};

function getFriendlyError(e: unknown): string {
  const raw = e instanceof Error ? e.message : String(e);
  const lower = raw.toLowerCase();
  if (
    lower.includes("ic0508") ||
    lower.includes("stopped") ||
    lower.includes("rejected") ||
    lower.includes("network") ||
    lower.includes("fetch") ||
    lower.includes("failed to fetch") ||
    lower.includes("connection")
  ) {
    return "সংযোগ সমস্যা হচ্ছে, একটু পরে চেষ্টা করুন";
  }
  return "একটি সমস্যা হয়েছে, পুনরায় চেষ্টা করুন";
}

function getFriendlyBackendError(err: string): string {
  const lower = err.toLowerCase();
  if (
    lower.includes("already registered") ||
    lower.includes("already exists")
  ) {
    return "এই নম্বরটি ইতিমধ্যে নিবন্ধিত";
  }
  if (lower.includes("not found")) {
    return "মোবাইল নম্বর পাওয়া যায়নি";
  }
  if (lower.includes("invalid password") || lower.includes("wrong password")) {
    return "পাসওয়ার্ড সঠিক নয়";
  }
  return "একটি সমস্যা হয়েছে, পুনরায় চেষ্টা করুন";
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const actorRef = useRef(actor);
  actorRef.current = actor;

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [hover, setHover] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getActorWithRetry = async () => {
    if (actorRef.current) return actorRef.current;
    // Wait 1.5 seconds and retry — actor may still be initializing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return actorRef.current;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !mobile || !password) {
      setError("সকল তথ্য পূরণ করুন।");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const resolvedActor = await getActorWithRetry();
      if (!resolvedActor) {
        setError("সংযোগ সমস্যা হচ্ছে, একটু পরে চেষ্টা করুন");
        setLoading(false);
        return;
      }

      const result = await resolvedActor.register(fullName, mobile, password);

      if (result.__kind__ === "ok") {
        localStorage.setItem("userId", String(Number(result.ok.id)));
        localStorage.setItem("userName", result.ok.name);
        navigate({ to: "/dashboard" });
      } else {
        setError(getFriendlyBackendError(result.err || ""));
      }
    } catch (e: unknown) {
      console.error("Registration error:", e);
      setError(getFriendlyError(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <form
        onSubmit={handleRegister}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
      >
        {/* Full Name Input */}
        <div style={inputWrapStyle}>
          <span style={iconStyle}>
            <User size={18} />
          </span>
          <input
            data-ocid="register-name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter Full Name"
            style={inputFieldStyle}
          />
        </div>

        {/* Mobile Number Input */}
        <div style={inputWrapStyle}>
          <span style={iconStyle}>
            <Phone size={18} />
          </span>
          <input
            data-ocid="register-mobile"
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter Mobile Number"
            style={inputFieldStyle}
          />
        </div>

        {/* Password Input */}
        <div style={inputWrapStyle}>
          <span style={iconStyle}>
            <Lock size={18} />
          </span>
          <input
            data-ocid="register-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            style={inputFieldStyle}
          />
        </div>

        {/* Error Message */}
        {error && (
          <p
            data-ocid="register-error"
            style={{
              color: "#dc2626",
              fontSize: 13,
              margin: 0,
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        {/* REGISTER Button */}
        <button
          data-ocid="register-submit"
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "13px",
            background: hover ? "#16a34a" : "#22c55e",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.08em",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: 4,
            transition: "background 0.2s",
            opacity: loading ? 0.75 : 1,
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {loading ? "রেজিস্ট্রেশন হচ্ছে..." : "REGISTER"}
        </button>
      </form>

      <PaymentLogos />

      {/* Login Link */}
      <p
        style={{
          textAlign: "center",
          marginTop: 18,
          fontSize: 13,
          color: "#374151",
        }}
      >
        Have an account?{" "}
        <Link
          to="/login"
          data-ocid="register-login-link"
          style={{ color: "#f97316", fontWeight: 700, textDecoration: "none" }}
        >
          Login now
        </Link>
      </p>
    </AuthCard>
  );
}
