import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

const columns = [
  { label: "তারিখ", labelEn: "Date" },
  { label: "ধরন", labelEn: "Type" },
  { label: "পরিমাণ", labelEn: "Amount" },
  { label: "স্ট্যাটাস", labelEn: "Status" },
];

export default function TransactionPage() {
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
        data-ocid="transaction-header"
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
          data-ocid="transaction-back-btn"
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
          Transaction
        </span>
      </header>

      {/* Hero / Summary Section */}
      <div
        data-ocid="transaction-hero"
        style={{
          background: "linear-gradient(160deg, #16a34a 0%, #065f46 100%)",
          padding: "28px 16px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        {/* Icon circle */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            border: "4px solid rgba(255,255,255,0.75)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            flexShrink: 0,
          }}
        >
          💳
        </div>

        <div
          style={{
            color: "#fff",
            fontWeight: 800,
            fontSize: 20,
            textShadow: "0 1px 4px rgba(0,0,0,0.3)",
          }}
        >
          Transaction History
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: 24,
            padding: "5px 18px",
            color: "#fef08a",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          ট্রানজেকশন হিস্ট্রি
        </div>
      </div>

      {/* Table Header + Empty State */}
      <div
        data-ocid="transaction-list-section"
        style={{ padding: "16px 12px 24px", flex: 1 }}
      >
        {/* Table header row */}
        <div
          style={{
            background: "linear-gradient(90deg, #16a34a 0%, #059669 100%)",
            borderRadius: "12px 12px 0 0",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            padding: "10px 12px",
          }}
        >
          {columns.map((col) => (
            <div
              key={col.labelEn}
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 12,
                textAlign: "center",
                letterSpacing: "0.03em",
              }}
            >
              {col.label}
              <div
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontWeight: 400,
                  fontSize: 10,
                  marginTop: 1,
                }}
              >
                {col.labelEn}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state card */}
        <div
          data-ocid="transaction-empty-state"
          style={{
            background: "#fff",
            borderRadius: "0 0 12px 12px",
            border: "1px solid #d1fae5",
            borderTop: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
            padding: "40px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 52, lineHeight: 1 }}>📋</div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#111827",
              textAlign: "center",
            }}
          >
            কোনো ট্রানজেকশন পাওয়া যায়নি
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#6b7280",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            আপনার ট্রানজেকশন হিস্ট্রি এখানে দেখা যাবে
          </div>
        </div>

        {/* Info cards row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginTop: 16,
          }}
        >
          {[
            {
              label: "মোট ডিপোজিট",
              labelEn: "Total Deposit",
              value: "0 Taka",
              icon: "💰",
              iconBg: "#16a34a",
              borderColor: "#16a34a",
              bgTint: "#f0fdf4",
            },
            {
              label: "মোট উইথড্র",
              labelEn: "Total Withdraw",
              value: "0 Taka",
              icon: "🏧",
              iconBg: "#f59e0b",
              borderColor: "#f59e0b",
              bgTint: "#fffbeb",
            },
            {
              label: "পেন্ডিং",
              labelEn: "Pending",
              value: "0",
              icon: "⏳",
              iconBg: "#8b5cf6",
              borderColor: "#8b5cf6",
              bgTint: "#f5f3ff",
            },
            {
              label: "সফল",
              labelEn: "Success",
              value: "0",
              icon: "✅",
              iconBg: "#10b981",
              borderColor: "#10b981",
              bgTint: "#ecfdf5",
            },
          ].map((card) => (
            <div
              key={card.labelEn}
              data-ocid={`transaction-stat-${card.labelEn.toLowerCase().replace(/\s+/g, "-")}`}
              style={{
                background: card.bgTint,
                borderRadius: 12,
                border: `1px solid ${card.borderColor}30`,
                borderLeft: `4px solid ${card.borderColor}`,
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: card.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  flexShrink: 0,
                  boxShadow: `0 2px 8px ${card.iconBg}50`,
                }}
              >
                {card.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 10,
                    color: "#6b7280",
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  {card.label} · {card.labelEn}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#111827",
                    lineHeight: 1.3,
                  }}
                >
                  {card.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
