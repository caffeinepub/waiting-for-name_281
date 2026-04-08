import type React from "react";

interface AuthCardProps {
  children: React.ReactNode;
}

export function AuthLogo() {
  return (
    <div className="flex justify-center mb-6">
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          border: "5px solid #22c55e",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(34,197,94,0.18)",
          position: "relative",
        }}
      >
        {/* Top black arc SVG */}
        <svg
          width="72"
          height="24"
          viewBox="0 0 72 24"
          fill="none"
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -2,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <path
            d="M6 22 Q36 2 66 22"
            stroke="#1a1a1a"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        {/* Orange D letter */}
        <span
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: "#f97316",
            lineHeight: 1,
            letterSpacing: "-2px",
            fontFamily: "Arial Black, Arial, sans-serif",
            position: "relative",
            zIndex: 1,
            marginTop: 6,
          }}
        >
          D
        </span>
      </div>
    </div>
  );
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: 16,
          boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
          padding: "36px 28px 28px",
          width: "100%",
          maxWidth: 380,
        }}
      >
        <AuthLogo />
        {children}
      </div>
    </div>
  );
}
