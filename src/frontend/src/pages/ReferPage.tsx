import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Check, ChevronLeft, Copy, Gift, Link, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { createActor } from "../backend";

export default function ReferPage() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);

  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const referLink = mobile
    ? `https://AdsBD366.unaux.com/register/${mobile}`
    : "লোড হচ্ছে...";

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (!storedId) {
      navigate({ to: "/login" });
      return;
    }
    if (!actor) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const userResult = await actor.getUser(BigInt(storedId));
        if (userResult.__kind__ === "ok") {
          setMobile(userResult.ok.mobile);
        }
      } catch {
        // fallback — mobile stays empty
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [actor, navigate]);

  const handleCopy = async () => {
    if (!mobile) return;
    try {
      await navigator.clipboard.writeText(referLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard not available
    }
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
        data-ocid="refer-header"
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
          data-ocid="refer-back-btn"
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
          Refer
        </span>
      </header>

      {/* Hero Banner */}
      <div
        data-ocid="refer-hero"
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
            background: "rgba(255,255,255,0.18)",
            border: "3px solid rgba(255,255,255,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}
        >
          🤝
        </div>
        <div
          style={{
            color: "#fff",
            fontWeight: 800,
            fontSize: 20,
            textShadow: "0 1px 4px rgba(0,0,0,0.3)",
          }}
        >
          বন্ধুকে রেফার করুন
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: 13,
            fontWeight: 500,
            textAlign: "center",
            maxWidth: 280,
          }}
        >
          প্রতিটি রেফারে ১০% কমিশন পান
        </div>
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
          💰 ১০% ইন্সট্যান্ট কমিশন
        </div>
      </div>

      {/* Cards section */}
      <div
        style={{
          padding: "16px 12px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          flex: 1,
        }}
      >
        {/* Referral Link Card */}
        <div
          data-ocid="refer-link-card"
          style={{
            background: "#f5f3ff",
            borderRadius: 14,
            border: "1px solid #c4b5fd40",
            borderLeft: "4px solid #7c3aed",
            boxShadow: "0 2px 10px rgba(124,58,237,0.08)",
            padding: "16px 14px",
          }}
        >
          {/* Card Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "#7c3aed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 2px 8px rgba(124,58,237,0.4)",
              }}
            >
              <Link size={18} color="#fff" />
            </div>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#5b21b6",
                  lineHeight: 1.3,
                }}
              >
                Your Reference Link
              </div>
              <div style={{ fontSize: 11, color: "#7c3aed", fontWeight: 500 }}>
                আপনার রেফারেল লিংক
              </div>
            </div>
          </div>

          {/* Link display box */}
          <div
            data-ocid="refer-link-display"
            style={{
              background: "#fff",
              border: "1.5px solid #c4b5fd",
              borderRadius: 10,
              padding: "10px 12px",
              fontSize: 13,
              color: "#4c1d95",
              fontWeight: 600,
              wordBreak: "break-all",
              lineHeight: 1.5,
              marginBottom: 12,
            }}
          >
            {loading ? "লোড হচ্ছে..." : referLink}
          </div>

          {/* COPY button */}
          <button
            type="button"
            data-ocid="refer-copy-btn"
            onClick={handleCopy}
            disabled={loading || !mobile}
            style={{
              width: "100%",
              background: copied
                ? "linear-gradient(135deg, #16a34a, #065f46)"
                : "linear-gradient(135deg, #7c3aed, #5b21b6)",
              border: "none",
              borderRadius: 10,
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              padding: "12px 0",
              cursor: loading || !mobile ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "background 0.25s ease, transform 0.15s ease",
              opacity: loading || !mobile ? 0.6 : 1,
              letterSpacing: "0.04em",
            }}
          >
            {copied ? (
              <>
                <Check size={16} />
                COPIED!
              </>
            ) : (
              <>
                <Copy size={16} />
                COPY
              </>
            )}
          </button>
        </div>

        {/* Commission Description Card */}
        <div
          data-ocid="refer-description-card"
          style={{
            background: "#fffbeb",
            borderRadius: 14,
            border: "1px solid #fcd34d40",
            borderLeft: "4px solid #f59e0b",
            boxShadow: "0 2px 10px rgba(245,158,11,0.08)",
            padding: "16px 14px",
          }}
        >
          {/* Card Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "#f59e0b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 2px 8px rgba(245,158,11,0.4)",
              }}
            >
              <Gift size={18} color="#fff" />
            </div>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#92400e",
                  lineHeight: 1.3,
                }}
              >
                কমিশন তথ্য
              </div>
              <div style={{ fontSize: 11, color: "#d97706", fontWeight: 500 }}>
                Commission Details
              </div>
            </div>
          </div>

          {/* English description */}
          <p
            style={{
              fontSize: 13,
              color: "#78350f",
              lineHeight: 1.65,
              margin: "0 0 10px",
              fontWeight: 500,
            }}
          >
            You will get{" "}
            <strong style={{ color: "#b45309" }}>10% commission</strong> on the
            amount deposited by the person you refer. If your refer joiner
            deposits <strong style={{ color: "#b45309" }}>50,000 BDT</strong>{" "}
            then you will get instant{" "}
            <strong style={{ color: "#b45309" }}>5,000 BDT</strong> and you can
            withdraw that money instantly.
          </p>

          {/* Bengali description */}
          <div
            style={{
              background: "#fef3c7",
              border: "1px solid #fcd34d",
              borderRadius: 8,
              padding: "10px 12px",
              fontSize: 13,
              color: "#78350f",
              lineHeight: 1.7,
              fontWeight: 500,
            }}
          >
            আপনি যাকে রেফার করবেন সে যে পরিমাণ ডিপোজিট করবে তার{" "}
            <strong style={{ color: "#b45309" }}>১০% কমিশন</strong> আপনি পাবেন।
            আপনার রেফার জয়েনার{" "}
            <strong style={{ color: "#b45309" }}>৫০,০০০ টাকা</strong> ডিপোজিট করলে
            আপনি তাৎক্ষণিক <strong style={{ color: "#b45309" }}>৫,০০০ টাকা</strong>{" "}
            পাবেন এবং সেই টাকা তাৎক্ষণিকভাবে উইথড্র করতে পারবেন।
          </div>
        </div>

        {/* Stats Card */}
        <div
          data-ocid="refer-stats-card"
          style={{
            background: "#f0fdf4",
            borderRadius: 14,
            border: "1px solid #86efac40",
            borderLeft: "4px solid #16a34a",
            boxShadow: "0 2px 10px rgba(22,163,74,0.08)",
            padding: "16px 14px",
          }}
        >
          {/* Card Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "#16a34a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 2px 8px rgba(22,163,74,0.4)",
              }}
            >
              <Users size={18} color="#fff" />
            </div>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#14532d",
                  lineHeight: 1.3,
                }}
              >
                রেফার পরিসংখ্যান
              </div>
              <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 500 }}>
                Refer Statistics
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div
            style={{
              background: "#fff",
              border: "1.5px solid #86efac",
              borderRadius: 10,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>👥</span>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  মোট রেফার · All Refer
                </div>
              </div>
            </div>
            <div
              data-ocid="refer-total-count"
              style={{
                background: "#dcfce7",
                border: "1.5px solid #86efac",
                borderRadius: 20,
                padding: "4px 16px",
                fontSize: 16,
                fontWeight: 800,
                color: "#14532d",
              }}
            >
              0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
