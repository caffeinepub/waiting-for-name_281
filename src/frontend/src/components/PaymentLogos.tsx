export function PaymentLogos() {
  return (
    <div
      style={{ marginTop: 20, borderTop: "1px solid #e5e7eb", paddingTop: 16 }}
    >
      <p
        style={{
          textAlign: "center",
          fontSize: 11,
          color: "#6b7280",
          marginBottom: 10,
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        We Accept
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* bKash logo card */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            background: "#fff",
            border: "2px solid #e2136e",
            borderRadius: 8,
            padding: "5px 12px",
            minWidth: 82,
            height: 38,
          }}
        >
          {/* bKash stylized "b" mark */}
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            aria-hidden="true"
          >
            {/* Bold pink letter b */}
            <path
              d="M3 1 L3 19 M3 9 Q3 5 7 5 Q12 5 12 9.5 Q12 14 7 14 L3 14"
              stroke="#e2136e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Swoosh / checkmark accent */}
            <path
              d="M10 7 Q15 6 14 11"
              stroke="#e2136e"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: "#e2136e",
              letterSpacing: "-0.3px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            bKash
          </span>
        </div>

        {/* Nagad logo card */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            background: "#fff",
            border: "2px solid #f7941d",
            borderRadius: 8,
            padding: "5px 12px",
            minWidth: 82,
            height: 38,
          }}
        >
          {/* Nagad crescent/arc mark */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="9" cy="9" r="8" fill="#f7941d" />
            <circle cx="11" cy="9" r="6" fill="#fff" />
            <circle cx="9" cy="9" r="4" fill="#f7941d" />
            <circle cx="11" cy="9" r="3" fill="#fff" />
          </svg>
          <span
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: "#f7941d",
              letterSpacing: "-0.3px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Nagad
          </span>
        </div>

        {/* Rocket logo card */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            background: "#fff",
            border: "2px solid #6b2d8b",
            borderRadius: 8,
            padding: "5px 12px",
            minWidth: 82,
            height: 38,
          }}
        >
          {/* Rocket icon */}
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            aria-hidden="true"
          >
            {/* Rocket body */}
            <path
              d="M8 1 C8 1 13 4 13 9 L13 13 L8 16 L3 13 L3 9 C3 4 8 1 8 1 Z"
              fill="#6b2d8b"
            />
            {/* Window */}
            <circle cx="8" cy="8" r="2" fill="#fff" />
            {/* Left fin */}
            <path d="M3 11 L1 14 L4 13 Z" fill="#9b59b6" />
            {/* Right fin */}
            <path d="M13 11 L15 14 L12 13 Z" fill="#9b59b6" />
            {/* Exhaust flame */}
            <path
              d="M6 16 Q8 18.5 10 16"
              stroke="#f97316"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: "#6b2d8b",
              letterSpacing: "-0.3px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Rocket
          </span>
        </div>
      </div>
    </div>
  );
}
