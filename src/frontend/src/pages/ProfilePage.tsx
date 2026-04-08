import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { createActor } from "../backend";

interface ProfileField {
  labelBn: string;
  labelEn: string;
  value: string;
  icon: string;
  iconBg: string;
  borderColor: string;
  bgTint: string;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [balance, setBalance] = useState(100);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    const storedName = localStorage.getItem("userName") ?? "";

    if (!storedId) {
      navigate({ to: "/login" });
      return;
    }

    setName(storedName);

    if (!actor) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const userResult = await actor.getUser(BigInt(storedId));
        if (userResult.__kind__ === "ok") {
          setName(userResult.ok.name);
          setMobile(userResult.ok.mobile);
        }
        const balResult = await actor.getBalance(BigInt(storedId));
        if (balResult.__kind__ === "ok") {
          setBalance(Number(balResult.ok));
        }
      } catch {
        // fallback to localStorage values
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [actor, navigate]);

  const initials = name
    ? name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const fields: ProfileField[] = [
    {
      labelBn: "নাম",
      labelEn: "Name",
      value: name || "—",
      icon: "👤",
      iconBg: "#3b82f6",
      borderColor: "#3b82f6",
      bgTint: "#eff6ff",
    },
    {
      labelBn: "মোবাইল নম্বর",
      labelEn: "Mobile Number",
      value: mobile || "—",
      icon: "📱",
      iconBg: "#16a34a",
      borderColor: "#16a34a",
      bgTint: "#f0fdf4",
    },
    {
      labelBn: "মেইন ব্যালেন্স",
      labelEn: "Main Balance",
      value: `${balance} Taka`,
      icon: "💰",
      iconBg: "#f59e0b",
      borderColor: "#f59e0b",
      bgTint: "#fffbeb",
    },
    {
      labelBn: "ডিপোজিট ব্যালেন্স",
      labelEn: "Deposit Balance",
      value: "0 Taka",
      icon: "🏦",
      iconBg: "#8b5cf6",
      borderColor: "#8b5cf6",
      bgTint: "#f5f3ff",
    },
    {
      labelBn: "প্যাকেজ",
      labelEn: "Package",
      value: "No Package",
      icon: "📦",
      iconBg: "#ec4899",
      borderColor: "#ec4899",
      bgTint: "#fdf2f8",
    },
    {
      labelBn: "রেফার কোড",
      labelEn: "Refer Code",
      value: mobile || "—",
      icon: "🔗",
      iconBg: "#06b6d4",
      borderColor: "#06b6d4",
      bgTint: "#ecfeff",
    },
    {
      labelBn: "মোট রেফার",
      labelEn: "Total Refer",
      value: "0",
      icon: "👥",
      iconBg: "#f97316",
      borderColor: "#f97316",
      bgTint: "#fff7ed",
    },
    {
      labelBn: "টাস্ক",
      labelEn: "Task",
      value: "0",
      icon: "✅",
      iconBg: "#10b981",
      borderColor: "#10b981",
      bgTint: "#ecfdf5",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Green Header */}
      <header
        data-ocid="profile-header"
        style={{
          background: "#16a34a",
          minHeight: 52,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          aria-label="Back to dashboard"
          data-ocid="profile-back-btn"
          onClick={() => navigate({ to: "/dashboard" })}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            padding: "4px 2px",
            borderRadius: 6,
            flexShrink: 0,
            zIndex: 1,
          }}
        >
          <ChevronLeft size={22} />
        </button>
        <span
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: "0.01em",
          }}
        >
          Profile
        </span>
      </header>

      {/* Avatar Section */}
      <div
        data-ocid="profile-avatar-section"
        style={{
          background: "linear-gradient(160deg, #16a34a 0%, #065f46 100%)",
          padding: "28px 16px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Avatar circle */}
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #065f46 100%)",
            border: "4px solid rgba(255,255,255,0.85)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "0.02em",
            flexShrink: 0,
          }}
        >
          {loading ? "…" : initials}
        </div>

        {/* Name */}
        <div style={{ textAlign: "center" }}>
          <div
            data-ocid="profile-name-display"
            style={{
              color: "#fff",
              fontWeight: 800,
              fontSize: 20,
              lineHeight: 1.3,
              textShadow: "0 1px 4px rgba(0,0,0,0.3)",
            }}
          >
            {loading ? "লোড হচ্ছে..." : name || "—"}
          </div>
          {mobile && (
            <div
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: 13,
                marginTop: 4,
                fontWeight: 500,
              }}
            >
              {mobile}
            </div>
          )}
        </div>

        {/* Balance badge */}
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: 24,
            padding: "6px 20px",
            color: "#fef08a",
            fontWeight: 700,
            fontSize: 14,
            backdropFilter: "blur(4px)",
          }}
        >
          💰 {balance} Taka
        </div>
      </div>

      {/* Info Cards */}
      <div
        data-ocid="profile-info-section"
        style={{
          padding: "16px 12px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
        }}
      >
        {fields.map((field) => (
          <div
            key={field.labelEn}
            data-ocid={`profile-field-${field.labelEn.toLowerCase().replace(/\s+/g, "-")}`}
            style={{
              background: field.bgTint,
              borderRadius: 12,
              border: `1px solid ${field.borderColor}30`,
              borderLeft: `4px solid ${field.borderColor}`,
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* Icon badge */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: field.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
                boxShadow: `0 2px 8px ${field.iconBg}50`,
              }}
            >
              {field.icon}
            </div>

            {/* Label + Value */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 11,
                  color: "#6b7280",
                  fontWeight: 500,
                  lineHeight: 1.3,
                  marginBottom: 2,
                }}
              >
                {field.labelBn} · {field.labelEn}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1.3,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {loading &&
                (field.labelEn === "Name" ||
                  field.labelEn === "Mobile Number" ||
                  field.labelEn === "Main Balance" ||
                  field.labelEn === "Refer Code")
                  ? "..."
                  : field.value}
              </div>
            </div>

            {/* Arrow */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              style={{ flexShrink: 0, opacity: 0.35 }}
            >
              <path
                d="M5 3l5 5-5 5"
                stroke={field.borderColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
