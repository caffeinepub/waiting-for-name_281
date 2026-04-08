import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Star } from "lucide-react";

interface VipPackage {
  name: string;
  price: number;
  dailyAds: number;
  dailyIncome: number;
  validity: number;
  multiplier: string;
  borderColor: string;
  bgTint: string;
  iconBg: string;
  badgeColor: string;
  badgeBg: string;
}

const packages: VipPackage[] = [
  {
    name: "VIP2",
    price: 500,
    dailyAds: 3,
    dailyIncome: 300,
    validity: 60,
    multiplier: "3x",
    borderColor: "#3b82f6",
    bgTint: "#eff6ff",
    iconBg: "#3b82f6",
    badgeColor: "#1d4ed8",
    badgeBg: "#dbeafe",
  },
  {
    name: "VIP3",
    price: 1000,
    dailyAds: 6,
    dailyIncome: 600,
    validity: 60,
    multiplier: "3x",
    borderColor: "#8b5cf6",
    bgTint: "#f5f3ff",
    iconBg: "#8b5cf6",
    badgeColor: "#6d28d9",
    badgeBg: "#ede9fe",
  },
  {
    name: "VIP4",
    price: 2000,
    dailyAds: 12,
    dailyIncome: 1200,
    validity: 60,
    multiplier: "3x",
    borderColor: "#f97316",
    bgTint: "#fff7ed",
    iconBg: "#f97316",
    badgeColor: "#c2410c",
    badgeBg: "#ffedd5",
  },
  {
    name: "VIP5",
    price: 3000,
    dailyAds: 20,
    dailyIncome: 2000,
    validity: 60,
    multiplier: "3x",
    borderColor: "#ec4899",
    bgTint: "#fdf2f8",
    iconBg: "#ec4899",
    badgeColor: "#be185d",
    badgeBg: "#fce7f3",
  },
  {
    name: "VIP6",
    price: 5000,
    dailyAds: 30,
    dailyIncome: 3000,
    validity: 60,
    multiplier: "3x",
    borderColor: "#06b6d4",
    bgTint: "#ecfeff",
    iconBg: "#06b6d4",
    badgeColor: "#0e7490",
    badgeBg: "#cffafe",
  },
  {
    name: "VIP7",
    price: 10000,
    dailyAds: 60,
    dailyIncome: 6000,
    validity: 60,
    multiplier: "3x",
    borderColor: "#ef4444",
    bgTint: "#fef2f2",
    iconBg: "#ef4444",
    badgeColor: "#b91c1c",
    badgeBg: "#fee2e2",
  },
  {
    name: "VIP8",
    price: 20000,
    dailyAds: 120,
    dailyIncome: 12000,
    validity: 60,
    multiplier: "3x",
    borderColor: "#16a34a",
    bgTint: "#f0fdf4",
    iconBg: "#16a34a",
    badgeColor: "#15803d",
    badgeBg: "#dcfce7",
  },
  {
    name: "VIP9",
    price: 25000,
    dailyAds: 150,
    dailyIncome: 15000,
    validity: 60,
    multiplier: "3x",
    borderColor: "#f59e0b",
    bgTint: "#fffbeb",
    iconBg: "#f59e0b",
    badgeColor: "#b45309",
    badgeBg: "#fef3c7",
  },
];

export default function PlanPage() {
  const navigate = useNavigate();

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
        data-ocid="plan-header"
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
          data-ocid="plan-back-btn"
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
          Packages
        </span>
      </header>

      {/* Hero Section */}
      <div
        data-ocid="plan-hero"
        style={{
          background: "linear-gradient(160deg, #16a34a 0%, #065f46 100%)",
          padding: "28px 16px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #065f46 100%)",
            border: "4px solid rgba(255,255,255,0.85)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Star size={32} color="#fef08a" fill="#fef08a" />
        </div>
        <div
          style={{
            color: "#fff",
            fontWeight: 800,
            fontSize: 22,
            textShadow: "0 1px 4px rgba(0,0,0,0.3)",
          }}
        >
          প্যাকেজ সমূহ
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: 13,
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          আপনার পছন্দের প্যাকেজটি বেছে নিন এবং আজই আয় শুরু করুন
        </div>
      </div>

      {/* Package Cards */}
      <div
        data-ocid="plan-cards-section"
        style={{
          padding: "16px 12px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          flex: 1,
        }}
      >
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            data-ocid={`plan-card-${pkg.name.toLowerCase()}`}
            style={{
              background: pkg.bgTint,
              borderRadius: 14,
              border: `1px solid ${pkg.borderColor}30`,
              borderLeft: `5px solid ${pkg.borderColor}`,
              boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {/* Top Row: Name badge + price + multiplier */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* VIP Name badge */}
                <span
                  style={{
                    background: pkg.iconBg,
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 15,
                    borderRadius: 8,
                    padding: "4px 14px",
                    letterSpacing: "0.04em",
                    boxShadow: `0 2px 8px ${pkg.iconBg}60`,
                  }}
                >
                  {pkg.name}
                </span>
                {/* 3x multiplier badge */}
                <span
                  style={{
                    background: pkg.badgeBg,
                    color: pkg.badgeColor,
                    fontWeight: 700,
                    fontSize: 12,
                    borderRadius: 6,
                    padding: "3px 10px",
                    border: `1px solid ${pkg.borderColor}50`,
                  }}
                >
                  {pkg.multiplier}
                </span>
              </div>
              {/* Price */}
              <div
                style={{
                  color: pkg.badgeColor,
                  fontWeight: 800,
                  fontSize: 20,
                  lineHeight: 1,
                }}
              >
                {pkg.price.toLocaleString()} Taka
              </div>
            </div>

            {/* Details Row */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                paddingLeft: 4,
              }}
            >
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: pkg.borderColor,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{ color: "#374151", fontSize: 13, fontWeight: 500 }}
                >
                  <span style={{ color: "#6b7280" }}>দৈনিক বিজ্ঞাপন: </span>
                  <strong style={{ color: "#111827" }}>
                    Daily {pkg.dailyAds} Ads
                  </strong>
                </span>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: pkg.borderColor,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{ color: "#374151", fontSize: 13, fontWeight: 500 }}
                >
                  <span style={{ color: "#6b7280" }}>দৈনিক আয়: </span>
                  <strong style={{ color: "#111827" }}>
                    Daily Income {pkg.dailyIncome.toLocaleString()} Taka
                  </strong>
                </span>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: pkg.borderColor,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{ color: "#374151", fontSize: 13, fontWeight: 500 }}
                >
                  <span style={{ color: "#6b7280" }}>মেয়াদ: </span>
                  <strong style={{ color: "#111827" }}>
                    Validity {pkg.validity} days
                  </strong>
                </span>
              </div>
            </div>

            {/* BUY NOW button */}
            <button
              type="button"
              data-ocid={`plan-buy-btn-${pkg.name.toLowerCase()}`}
              onClick={() => {
                alert(`${pkg.name} প্যাকেজ কিনতে আপনার অ্যাকাউন্টে ডিপোজিট করুন।`);
              }}
              style={{
                marginTop: 4,
                background: "linear-gradient(135deg, #16a34a 0%, #065f46 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "12px 0",
                fontWeight: 800,
                fontSize: 15,
                cursor: "pointer",
                letterSpacing: "0.04em",
                boxShadow: "0 3px 12px rgba(22,163,74,0.35)",
                width: "100%",
                transition: "opacity 0.15s",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              }}
            >
              BUY NOW · ক্রয় করুন
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
