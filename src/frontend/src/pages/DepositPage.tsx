import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Check, ChevronLeft, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { createActor } from "../backend";

const QUICK_AMOUNTS = [500, 1000, 2000, 3000, 5000, 9000, 15000, 18000, 25000];
const PAYMENT_NUMBER = "01951779618";

type PaymentMethod = "Bkash" | "Nagad" | "Rocket";
type SendMoneyTab = "সেন্ড মানি" | "ক্যাশ আউট" | "পেমেন্ট";

const PAYMENT_STYLES: Record<
  PaymentMethod,
  { bg: string; border: string; label: string }
> = {
  Bkash: { bg: "#fce7f3", border: "#ec4899", label: "বিকাশ" },
  Nagad: { bg: "#fff7ed", border: "#f97316", label: "নগদ" },
  Rocket: { bg: "#f3e8ff", border: "#9333ea", label: "রকেট" },
};

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

function RocketIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="18" cy="18" r="18" fill="#7c3aed" />
      <text
        x="18"
        y="23"
        textAnchor="middle"
        fill="#fff"
        fontSize="10"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        Rocket
      </text>
    </svg>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      data-ocid="copy-btn"
      style={{
        background: copied ? "#16a34a" : "#e5e7eb",
        border: "none",
        borderRadius: 6,
        padding: "4px 10px",
        cursor: "pointer",
        color: copied ? "#fff" : "#374151",
        fontSize: 12,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: 4,
        transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function DepositPage() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<SendMoneyTab>("সেন্ড মানি");
  const [trnxNumber, setTrnxNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);

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

  const activeAmount =
    selectedAmount ?? (customAmount ? Number(customAmount) : null);

  const handleAmountSelect = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount(String(amt));
  };

  const handleCustomAmountChange = (val: string) => {
    setCustomAmount(val);
    const num = Number(val);
    if (QUICK_AMOUNTS.includes(num)) setSelectedAmount(num);
    else setSelectedAmount(null);
  };

  const handleNext = () => {
    if (!activeAmount || activeAmount < 500 || !selectedMethod) return;
    setStep(2);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSuccess(false);
      setTrnxNumber("");
    } else {
      navigate({ to: "/dashboard" });
    }
  };

  const handleAddDeposit = async () => {
    if (!trnxNumber.trim()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSuccess(true);
  };

  const methodTitle = selectedMethod
    ? `${selectedMethod === "Bkash" ? "Bkash" : selectedMethod === "Nagad" ? "Nagad" : "Rocket"} Send Money`
    : "Send Money";

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
        data-ocid="deposit-header"
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
          data-ocid="deposit-back-btn"
          onClick={handleBack}
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
          {step === 1 ? "Deposit" : methodTitle}
        </span>
      </header>

      {step === 1 ? (
        <Step1
          balance={balance}
          selectedAmount={selectedAmount}
          customAmount={customAmount}
          selectedMethod={selectedMethod}
          activeAmount={activeAmount}
          onAmountSelect={handleAmountSelect}
          onCustomAmountChange={handleCustomAmountChange}
          onMethodSelect={setSelectedMethod}
          onNext={handleNext}
        />
      ) : (
        <Step2
          method={selectedMethod!}
          amount={activeAmount!}
          activeTab={activeTab}
          trnxNumber={trnxNumber}
          submitting={submitting}
          success={success}
          onTabChange={setActiveTab}
          onTrnxChange={setTrnxNumber}
          onSubmit={handleAddDeposit}
        />
      )}
    </div>
  );
}

interface Step1Props {
  balance: number | null;
  selectedAmount: number | null;
  customAmount: string;
  selectedMethod: PaymentMethod | null;
  activeAmount: number | null;
  onAmountSelect: (amt: number) => void;
  onCustomAmountChange: (val: string) => void;
  onMethodSelect: (method: PaymentMethod) => void;
  onNext: () => void;
}

function Step1({
  balance,
  selectedAmount,
  customAmount,
  selectedMethod,
  activeAmount,
  onAmountSelect,
  onCustomAmountChange,
  onMethodSelect,
  onNext,
}: Step1Props) {
  const canNext = !!activeAmount && activeAmount >= 500 && !!selectedMethod;

  return (
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
        data-ocid="deposit-notice"
        style={{
          background: "#1f2937",
          borderRadius: 10,
          padding: "10px 14px",
          borderLeft: "4px solid #f59e0b",
        }}
      >
        <span style={{ color: "#fbbf24", fontWeight: 600, fontSize: 13 }}>
          নোটিশ: মিনিমাম ডিপোজিট ৫০০ টাকা।
        </span>
      </div>

      {/* Balance */}
      <div
        data-ocid="deposit-balance"
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

      {/* Quick amount buttons */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: "14px 12px",
          boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
            marginBottom: 10,
          }}
        >
          {QUICK_AMOUNTS.map((amt) => (
            <button
              key={amt}
              type="button"
              data-ocid={`amount-btn-${amt}`}
              onClick={() => onAmountSelect(amt)}
              style={{
                background: selectedAmount === amt ? "#16a34a" : "#f3f4f6",
                color: selectedAmount === amt ? "#fff" : "#374151",
                border:
                  selectedAmount === amt
                    ? "2px solid #16a34a"
                    : "2px solid transparent",
                borderRadius: 20,
                padding: "8px 0",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.15s ease",
                textAlign: "center",
              }}
            >
              {amt.toLocaleString()}
            </button>
          ))}
        </div>
        <p
          style={{
            textAlign: "center",
            color: "#9ca3af",
            fontSize: 11,
            margin: "0 0 10px",
          }}
        >
          Minimum deposit 500 BDT
        </p>
        {/* Manual input */}
        <input
          type="number"
          data-ocid="deposit-amount-input"
          placeholder="Enter Amount"
          value={customAmount}
          onChange={(e) => onCustomAmountChange(e.target.value)}
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

      {/* Payment method selection */}
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
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
          }}
        >
          {(["Bkash", "Nagad", "Rocket"] as PaymentMethod[]).map((method) => {
            const style = PAYMENT_STYLES[method];
            const isSelected = selectedMethod === method;
            return (
              <button
                key={method}
                type="button"
                data-ocid={`payment-method-${method.toLowerCase()}`}
                onClick={() => onMethodSelect(method)}
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
                {method === "Bkash" ? (
                  <BkashIcon />
                ) : method === "Nagad" ? (
                  <NagadIcon />
                ) : (
                  <RocketIcon />
                )}
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

      {/* NEXT button */}
      <button
        type="button"
        data-ocid="deposit-next-btn"
        onClick={onNext}
        disabled={!canNext}
        style={{
          width: "100%",
          background: canNext ? "#16a34a" : "#d1d5db",
          color: canNext ? "#fff" : "#9ca3af",
          border: "none",
          borderRadius: 10,
          padding: "14px",
          fontWeight: 800,
          fontSize: 15,
          cursor: canNext ? "pointer" : "not-allowed",
          letterSpacing: "0.05em",
          transition: "background 0.2s",
          marginTop: 4,
        }}
      >
        NEXT
      </button>
    </div>
  );
}

const SEND_TABS: SendMoneyTab[] = ["সেন্ড মানি", "ক্যাশ আউট", "পেমেন্ট"];

interface Step2Props {
  method: PaymentMethod;
  amount: number;
  activeTab: SendMoneyTab;
  trnxNumber: string;
  submitting: boolean;
  success: boolean;
  onTabChange: (tab: SendMoneyTab) => void;
  onTrnxChange: (val: string) => void;
  onSubmit: () => void;
}

function Step2({
  method,
  amount,
  activeTab,
  trnxNumber,
  submitting,
  success,
  onTabChange,
  onTrnxChange,
  onSubmit,
}: Step2Props) {
  return (
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
        data-ocid="deposit-step2-notice"
        style={{
          background: "#1f2937",
          borderRadius: 10,
          padding: "12px 14px",
          borderLeft: "4px solid #f59e0b",
        }}
      >
        <p
          style={{
            color: "#fbbf24",
            fontWeight: 600,
            fontSize: 13,
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          সফলভাবে ডিপোজিট সম্পন্ন করতে আপনার একাউন্ট থেকে সঠিকভাবে এবং সঠিক এমাউন্ট নিচের
          নাম্বারটিতে অবশ্যই সেন্ড মানি করে ট্রানজেকশন আইডিটি নিচের বক্সে দিয়ে ADD
          DEPOSIT এ ক্লিক করুন।
        </p>
      </div>

      {/* Tabs */}
      <div
        data-ocid="send-money-tabs"
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: "6px",
          display: "flex",
          gap: 4,
          boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
        }}
      >
        {SEND_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            data-ocid={`tab-${tab}`}
            onClick={() => onTabChange(tab)}
            style={{
              flex: 1,
              background: activeTab === tab ? "#16a34a" : "transparent",
              color: activeTab === tab ? "#fff" : "#6b7280",
              border: "none",
              borderRadius: 7,
              padding: "8px 4px",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              transition: "all 0.15s ease",
              whiteSpace: "nowrap",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Payment details card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
        }}
      >
        {/* Number row */}
        <div
          data-ocid="payment-number-row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 14px",
            borderBottom: "1px solid #f3f4f6",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 0,
            }}
          >
            <span style={{ color: "#6b7280", fontSize: 11, fontWeight: 500 }}>
              {method}:
            </span>
            <span style={{ color: "#111827", fontWeight: 700, fontSize: 16 }}>
              {PAYMENT_NUMBER}
            </span>
          </div>
          <CopyButton text={PAYMENT_NUMBER} />
        </div>

        {/* Amount row */}
        <div
          data-ocid="payment-amount-row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 14px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 0,
            }}
          >
            <span style={{ color: "#6b7280", fontSize: 11, fontWeight: 500 }}>
              Amount:
            </span>
            <span style={{ color: "#16a34a", fontWeight: 700, fontSize: 16 }}>
              {amount.toLocaleString()} Taka
            </span>
          </div>
          <CopyButton text={String(amount)} />
        </div>
      </div>

      {/* Transaction ID input */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: "14px 12px",
          boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
        }}
      >
        <label
          htmlFor="trnx-input"
          style={{
            display: "block",
            color: "#374151",
            fontWeight: 700,
            fontSize: 13,
            marginBottom: 8,
          }}
        >
          Trnx number
        </label>
        <input
          id="trnx-input"
          type="text"
          data-ocid="trnx-input"
          placeholder="Trnx number"
          value={trnxNumber}
          onChange={(e) => onTrnxChange(e.target.value)}
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

      {/* Info text */}
      <p
        style={{
          color: "#6b7280",
          fontSize: 12,
          lineHeight: 1.6,
          margin: 0,
          textAlign: "center",
        }}
      >
        You must correctly enter the Transaction ID, Amount and Method. Of
        course within 1 minute automatically the Deposit will be successful and
        the balance will be added.
      </p>

      {/* Success message */}
      {success && (
        <div
          data-ocid="deposit-success-msg"
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
            ✅ আপনার ডিপোজিট রিকোয়েস্ট সফলভাবে জমা হয়েছে! ১ মিনিটের মধ্যে ব্যালেন্স যোগ
            হবে।
          </p>
        </div>
      )}

      {/* ADD DEPOSIT button */}
      <button
        type="button"
        data-ocid="add-deposit-btn"
        onClick={onSubmit}
        disabled={submitting || success || !trnxNumber.trim()}
        style={{
          width: "100%",
          background: success
            ? "#6b7280"
            : submitting || !trnxNumber.trim()
              ? "#d1d5db"
              : "#16a34a",
          color:
            success || submitting || !trnxNumber.trim() ? "#9ca3af" : "#fff",
          border: "none",
          borderRadius: 10,
          padding: "14px",
          fontWeight: 800,
          fontSize: 15,
          cursor:
            submitting || success || !trnxNumber.trim()
              ? "not-allowed"
              : "pointer",
          letterSpacing: "0.05em",
          transition: "background 0.2s",
          marginTop: 4,
        }}
      >
        {submitting ? "প্রক্রিয়া হচ্ছে..." : success ? "জমা হয়েছে ✓" : "ADD DEPOSIT"}
      </button>
    </div>
  );
}
