import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export default function TaskPage() {
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
        data-ocid="task-header"
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
          aria-label="Back to dashboard"
          data-ocid="task-back-btn"
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
          Layout Options
        </span>
      </header>

      {/* Breadcrumb */}
      <div
        data-ocid="task-breadcrumb"
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <button
          type="button"
          data-ocid="breadcrumb-home"
          onClick={() => navigate({ to: "/dashboard" })}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#16a34a",
            fontWeight: 600,
            fontSize: 13,
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 6.5L7 1.5L13 6.5V13H9.5V9.5H4.5V13H1V6.5Z"
              stroke="#16a34a"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          Home
        </button>
      </div>

      {/* Table Section */}
      <div
        data-ocid="task-table-section"
        style={{
          padding: "14px 12px",
          flex: 1,
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Table Head */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              background: "#16a34a",
              padding: "10px 16px",
              gap: 12,
            }}
          >
            <span
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.02em",
              }}
            >
              Title
            </span>
            <span
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.02em",
                minWidth: 60,
                textAlign: "center",
              }}
            >
              Action
            </span>
          </div>

          {/* Table Row */}
          <div
            data-ocid="task-row-ad-not-loading"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              padding: "14px 16px",
              gap: 12,
              borderTop: "1px solid #f0f0f0",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 14,
                color: "#374151",
                fontWeight: 500,
                lineHeight: 1.5,
              }}
            >
              বিজ্ঞাপন লোড হচ্ছে না
            </span>
            <span
              style={{
                minWidth: 60,
                textAlign: "center",
                fontSize: 13,
                color: "#9ca3af",
              }}
            >
              —
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
