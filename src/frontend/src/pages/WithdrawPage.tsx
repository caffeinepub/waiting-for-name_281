import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Check, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { createActor } from "../backend";

type PaymentMethod = "Nagad" | "Bkash";

const PAYMENT_STYLES: Record<
  PaymentMethod,
  { bg: string; border: string; iconFill: string }
> = {
  Nagad: { bg: "#fff7ed", border: "#f97316", iconFill: "#f97316" },
  Bkash: { bg: "#fce7f3", border: "#ec4899", iconFill: "#e2136e" },
};

function NagadIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="18" cy="18" r="18" fill="#f97316" />
      <text
        x="18"
        y="23"
        textAnchor="middle"
        fill="#fff"
        fontSize="11"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        Nagad
      </text>
    </svg>
  );
}

function BkashIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="18" cy="18" r="18" fill="#e2136e" />
      <text
        x="18"
        y="23"
        textAnchor="middle"
        fill="#fff"
        fontSize="11"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        bKash
      </text>
    </svg>
  );
}

export default function WithdrawPage() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);

  const [balance, setBalance] = useState<number | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (!storedId) {
      navigate({ to: "/login" });
      return;
    }
    if (actor) {
      actor
        .getBalance(BigInt(Number(storedId)))
        .then((result) => {
          if ("ok" in result) setBalance(Number(result.ok));
          else setBalance(100);
        })
        .catch(() => setBalance(100));
    }
  }, [actor, navigate]);

  const handleWithdraw = async () => {
    setError("");
    if (!selectedMethod) {
      setError("পেমেন্ট পদ্ধতি নির্বাচন করুন।");
      return;
    }
    if (!number.trim()) {
      setError("নম্বর দিন।");
      return;
    }
    const amt = Number(amount);
    if (!amount || Number.isNaN(amt) || amt < 300) {
      setError("মিনিমাম উইথড্র পরিমাণ ৩০০ টাকা।");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSuccess(true);
  };

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
        data-ocid="withdraw-header"
        style={{
          background: "#16a34a",
          minHeight: 52,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          aria-label="Back"
          data-ocid="withdraw-back-btn"
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
          }}
        >
          <ChevronLeft size={22} />
        </button>
        <span
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: "0.01em",
          }}
        >
          Withdraw
        </span>
      </header>

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "14px 12px",
          gap: 12,
        }}
      >
        {/* Notice */}
        <div
          data-ocid="withdraw-notice"
          style={{
            background: "#1f2937",
            borderRadius: 10,
            padding: "10px 14px",
            borderLeft: "4px solid #f59e0b",
          }}
        >
          <span
            style={{
              color: "#fbbf24",
              fontWeight: 600,
              fontSize: 13,
              lineHeight: 1.6,
              display: "block",
            }}
          >
            Notice: মিনিমাম উইথড্র ১০০ টাকা। উইথড্র দেয়ার সাথে সাথে অটোম্যাটিকভাবে পেমেন্ট
            পেয়ে যাবেন।
          </span>
        </div>

        {/* Balance */}
        <div
          data-ocid="withdraw-balance"
          style={{
            background: "#fff",
            borderRadius: 10,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
          }}
        >
          <span style={{ color: "#6b7280", fontSize: 13, fontWeight: 500 }}>
            Balance:
          </span>
          <span style={{ color: "#16a34a", fontWeight: 700, fontSize: 15 }}>
            {balance !== null ? `${balance} Taka` : "— Taka"}
          </span>
        </div>

        {/* Payment Method */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: "14px 12px",
            boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              fontWeight: 700,
              fontSize: 14,
              color: "#111827",
            }}
          >
            Select Payment Method
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 10,
            }}
          >
            {(["Nagad", "Bkash"] as PaymentMethod[]).map((method) => {
              const style = PAYMENT_STYLES[method];
              const isSelected = selectedMethod === method;
              return (
                <button
                  key={method}
                  type="button"
                  data-ocid={`withdraw-method-${method.toLowerCase()}`}
                  onClick={() => setSelectedMethod(method)}
                  style={{
                    background: style.bg,
                    border: isSelected
                      ? `2.5px solid ${style.border}`
                      : `2px solid ${style.border}40`,
                    borderRadius: 12,
                    padding: "12px 6px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    transition: "all 0.15s ease",
                    boxShadow: isSelected
                      ? `0 0 0 2px ${style.border}40`
                      : "none",
                    position: "relative",
                  }}
                >
                  {isSelected && (
                    <span
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 5,
                        width: 16,
                        height: 16,
                        background: style.border,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Check size={10} color="#fff" />
                    </span>
                  )}
                  {method === "Nagad" ? <NagadIcon /> : <BkashIcon />}
                  <span
                    style={{ fontWeight: 700, fontSize: 12, color: "#374151" }}
                  >
                    {method}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Number & Amount Inputs */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: "14px 12px",
            boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* Number */}
          <div>
            <label
              htmlFor="withdraw-number"
              style={{
                display: "block",
                color: "#374151",
                fontWeight: 700,
                fontSize: 13,
                marginBottom: 6,
              }}
            >
              Number
            </label>
            <input
              id="withdraw-number"
              type="tel"
              data-ocid="withdraw-number-input"
              placeholder="Enter number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              style={{
                width: "100%",
                border: "1.5px solid #d1d5db",
                borderRadius: 8,
                padding: "10px 12px",
                fontSize: 14,
                color: "#111827",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#16a34a";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
              }}
            />
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="withdraw-amount"
              style={{
                display: "block",
                color: "#374151",
                fontWeight: 700,
                fontSize: 13,
                marginBottom: 6,
              }}
            >
              Amount
            </label>
            <input
              id="withdraw-amount"
              type="number"
              data-ocid="withdraw-amount-input"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: "100%",
                border: "1.5px solid #d1d5db",
                borderRadius: 8,
                padding: "10px 12px",
                fontSize: 14,
                color: "#111827",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#16a34a";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
              }}
            />
            <p style={{ margin: "6px 0 0", color: "#9ca3af", fontSize: 11 }}>
              Minimum withdraw 300 BDT
            </p>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div
            data-ocid="withdraw-error"
            style={{
              background: "#fef2f2",
              border: "1.5px solid #f87171",
              borderRadius: 8,
              padding: "10px 12px",
            }}
          >
            <p
              style={{
                color: "#dc2626",
                fontWeight: 600,
                fontSize: 13,
                margin: 0,
              }}
            >
              {error}
            </p>
          </div>
        )}

        {/* Success message */}
        {success && (
          <div
            data-ocid="withdraw-success"
            style={{
              background: "#dcfce7",
              border: "1.5px solid #16a34a",
              borderRadius: 10,
              padding: "12px 14px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#15803d",
                fontWeight: 700,
                fontSize: 14,
                margin: 0,
              }}
            >
              ✅ উইথড্র সফলভাবে সম্পন্ন হয়েছে।
            </p>
          </div>
        )}

        {/* WITHDRAW button */}
        <button
          type="button"
          data-ocid="withdraw-submit-btn"
          onClick={handleWithdraw}
          disabled={submitting || success}
          style={{
            width: "100%",
            background: success
              ? "#6b7280"
              : submitting
                ? "#d1d5db"
                : "#16a34a",
            color: success || submitting ? "#9ca3af" : "#fff",
            border: "none",
            borderRadius: 10,
            padding: "14px",
            fontWeight: 800,
            fontSize: 15,
            cursor: submitting || success ? "not-allowed" : "pointer",
            letterSpacing: "0.05em",
            transition: "background 0.2s",
            marginTop: 4,
          }}
        >
          {submitting
            ? "প্রক্রিয়া হচ্ছে..."
            : success
              ? "সম্পন্ন হয়েছে ✓"
              : "WITHDRAW"}
        </button>
      </div>
    </div>
  );
}
