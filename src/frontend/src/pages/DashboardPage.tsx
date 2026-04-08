import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { createActor } from "../backend";

const menuItems = [
  { label: "Task", gif: "/assets/task.gif" },
  { label: "Deposit", gif: "/assets/deposit.gif" },
  { label: "Withdraw", gif: "/assets/withdraw.gif" },
  { label: "Plan", gif: "/assets/plan.gif" },
  { label: "Profile", gif: "/assets/profile.gif" },
  { label: "Transaction", gif: "/assets/transaction.gif" },
  { label: "Refer", gif: "/assets/refer.gif" },
  { label: "HelpLine", gif: "/assets/helpline.gif" },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [showBalance, setShowBalance] = useState(false);
  const [loadingBalance, setLoadingBalance] = useState(false);

  const { actor } = useActor(createActor);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    const storedName = localStorage.getItem("userName");
    if (!storedId || !storedName) {
      navigate({ to: "/login" });
      return;
    }
    setUserId(Number(storedId));
    setUserName(storedName);
  }, [navigate]);

  const handleTapBalance = async () => {
    if (showBalance) return; // once shown, stays visible
    if (!actor || userId === null) {
      setShowBalance(true);
      return;
    }
    setLoadingBalance(true);
    setShowBalance(true);
    try {
      const result = await actor.getBalance(BigInt(userId));
      if (result.__kind__ === "ok") {
        setBalance(Number(result.ok));
      } else {
        setBalance(100);
      }
    } catch {
      setBalance(100);
    } finally {
      setLoadingBalance(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate({ to: "/login" });
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
      {/* Header */}
      <header
        data-ocid="dashboard-header"
        style={{
          background: "#16a34a",
          minHeight: 60,
          display: "flex",
          alignItems: "center",
          padding: "10px 16px",
          gap: 10,
          flexShrink: 0,
        }}
      >
        {/* Logo Circle */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "#fff",
            border: "2px solid rgba(255,255,255,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            aria-label="AdsBD366 logo"
          >
            <title>AdsBD366 logo</title>
            <circle cx="14" cy="14" r="14" fill="#16a34a" />
            <text
              x="14"
              y="19"
              textAnchor="middle"
              fill="#fff"
              fontSize="13"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              AD
            </text>
          </svg>
        </div>

        {/* Profile group: name + balance pill + tap button — stacked in column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 6,
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* Name */}
          <span
            data-ocid="dashboard-username"
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              lineHeight: 1.2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {userName}
          </span>

          {/* Tap to Balance button — hidden once balance is shown */}
          {!showBalance && (
            <button
              type="button"
              data-ocid="tap-for-balance"
              onClick={handleTapBalance}
              style={{
                background: "transparent",
                border: "2px solid rgba(255,255,255,0.7)",
                borderRadius: 20,
                color: "#fef08a",
                fontWeight: 600,
                fontSize: 12,
                padding: "5px 12px",
                cursor: "pointer",
                transition: "background 0.2s",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              💰 Tap to Balance
            </button>
          )}

          {/* Balance pill — shown after tap */}
          {showBalance && (
            <div
              data-ocid="balance-pill"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#e879a0",
                  flexShrink: 0,
                  boxShadow: "0 0 0 2px rgba(232,121,160,0.35)",
                }}
              />
              <span
                data-ocid="balance-amount"
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  lineHeight: 1,
                }}
              >
                {loadingBalance ? "..." : `${balance ?? 100} Taka`}
              </span>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          type="button"
          data-ocid="logout-btn"
          onClick={handleLogout}
          aria-label="Logout"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            padding: 6,
            borderRadius: 6,
            flexShrink: 0,
          }}
        >
          <LogOut size={20} />
        </button>
      </header>

      {/* Promotional Banner */}
      <div
        data-ocid="promo-banner"
        style={{
          background:
            "linear-gradient(135deg, #1a0a4a 0%, #0d1b6e 50%, #1a0a4a 100%)",
          width: "100%",
          minHeight: 200,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 20px",
          boxSizing: "border-box",
        }}
      >
        {/* Corner L-brackets */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            width: 24,
            height: 24,
            borderTop: "3px solid #facc15",
            borderLeft: "3px solid #facc15",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 24,
            height: 24,
            borderTop: "3px solid #facc15",
            borderRight: "3px solid #facc15",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            width: 24,
            height: 24,
            borderBottom: "3px solid #facc15",
            borderLeft: "3px solid #facc15",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            width: 24,
            height: 24,
            borderBottom: "3px solid #facc15",
            borderRight: "3px solid #facc15",
          }}
        />

        {/* Corner Badges */}
        <span
          style={{
            position: "absolute",
            top: 14,
            left: 16,
            color: "#facc15",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          LIMITED OFFER
        </span>
        <span
          style={{
            position: "absolute",
            top: 14,
            right: 16,
            color: "#facc15",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          EXTRA BONUS
        </span>
        <span
          style={{
            position: "absolute",
            bottom: 14,
            left: 16,
            color: "#facc15",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          EXTRA BONUS
        </span>
        <span
          style={{
            position: "absolute",
            bottom: 14,
            right: 16,
            color: "#facc15",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          LIMITED OFFER
        </span>

        {/* Center Content */}
        <div style={{ textAlign: "center", zIndex: 1 }}>
          <p
            style={{
              color: "#facc15",
              fontWeight: 800,
              fontSize: 18,
              margin: "0 0 8px",
              textShadow: "0 1px 4px rgba(0,0,0,0.6)",
              lineHeight: 1.4,
            }}
          >
            ১০০০ টাকা ডিপজিট করলে ১০০০ টাকা বোনাস
          </p>
          <p
            style={{
              color: "#f97316",
              fontWeight: 800,
              fontSize: 17,
              margin: "0 0 14px",
              textShadow: "0 1px 4px rgba(0,0,0,0.6)",
              lineHeight: 1.4,
            }}
          >
            ৫০০০ টাকা ডিপজিট করলে ৫০০০ টাকা বোনাস
          </p>
          <span
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,215,0,0.5)",
              color: "#fef3c7",
              fontWeight: 700,
              fontSize: 14,
              padding: "5px 24px",
              borderRadius: 20,
              letterSpacing: "0.04em",
            }}
          >
            Jobkori.com
          </span>
        </div>
      </div>

      {/* Scrolling Ticker */}
      <div
        data-ocid="ticker-strip"
        style={{
          background: "#111827",
          overflow: "hidden",
          padding: "8px 0",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            display: "inline-block",
            animation: "marquee 28s linear infinite",
            color: "#fef08a",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          &nbsp;&nbsp;&nbsp;AdsBD366.unaux.com এ আপনাকে স্বাগতম। আমাদের ওয়েবসাইটে ১
          হাজার টাকা ডিপজিট করলে পাবেন ১ হাজার টাকা বোনাস।এবং ৫ হাজার টাকা ডিপজিট করলে পাবেন ৫
          হাজার টাকা বোনাস। ❤️&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AdsBD366.unaux.com এ
          আপনাকে স্বাগতম। আমাদের ওয়েবসাইটে ১ হাজার টাকা ডিপজিট করলে পাবেন ১ হাজার টাকা
          বোনাস।এবং ৫ হাজার টাকা ডিপজিট করলে পাবেন ৫ হাজার টাকা বোনাস। ❤️
        </div>
      </div>

      {/* Animated Menu Grid */}
      <div
        data-ocid="menu-grid-section"
        style={{
          background: "#e0f7fa",
          padding: "16px 12px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            padding: "16px 8px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px 4px",
            }}
          >
            {menuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                data-ocid={`menu-item-${item.label.toLowerCase()}`}
                onClick={
                  item.label === "Task"
                    ? () => navigate({ to: "/task" })
                    : item.label === "Deposit"
                      ? () => navigate({ to: "/deposit" })
                      : item.label === "Withdraw"
                        ? () => navigate({ to: "/withdraw" })
                        : item.label === "Profile"
                          ? () => navigate({ to: "/profile" })
                          : item.label === "Refer"
                            ? () => navigate({ to: "/refer" })
                            : item.label === "Transaction"
                              ? () => navigate({ to: "/transaction" })
                              : item.label === "Plan"
                                ? () => navigate({ to: "/plan" })
                                : item.label === "HelpLine"
                                  ? () =>
                                      window.open(
                                        "https://wa.me/8801994180912",
                                        "_blank",
                                      )
                                  : undefined
                }
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px 2px",
                  borderRadius: 10,
                  transition: "transform 0.18s ease, opacity 0.18s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "scale(1.08)";
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "scale(1)";
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                }}
              >
                <img
                  src={item.gif}
                  alt={item.label}
                  style={{
                    width: 52,
                    height: 52,
                    objectFit: "contain",
                    borderRadius: 8,
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#374151",
                    textAlign: "center",
                    lineHeight: 1.2,
                  }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* How To Work Section */}
      <div
        style={{
          background: "#e0f7fa",
          padding: "0 12px 16px",
        }}
      >
        <button
          type="button"
          data-ocid="how-to-work-btn"
          style={{
            width: "100%",
            background: "#fff",
            borderRadius: 14,
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            border: "none",
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            cursor: "pointer",
            transition: "transform 0.18s ease, box-shadow 0.18s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "scale(1.02)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 4px 18px rgba(0,0,0,0.13)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 2px 10px rgba(0,0,0,0.08)";
          }}
        >
          {/* YouTube-style play button */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#ff0000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(255,0,0,0.35)",
            }}
          >
            {/* Play triangle */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <polygon points="6,4 17,10 6,16" fill="#fff" />
            </svg>
          </div>
          {/* Text */}
          <div style={{ textAlign: "left", flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: "#111827",
                lineHeight: 1.3,
              }}
            >
              How To Work
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#6b7280",
                marginTop: 2,
                lineHeight: 1.4,
              }}
            >
              Click here to see youtube video tutorial
            </div>
          </div>
          {/* Arrow */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <path
              d="M6 3l6 6-6 6"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
