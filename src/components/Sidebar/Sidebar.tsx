import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { spacing }
  from "../../styles/theme/spacing";

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({
  onNavigate,
}: SidebarProps) {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const isActive = (
    path: string
  ) => location.pathname === path;

  function handleNavigate(
    path: string
  ) {

    navigate(path);

    onNavigate?.();

  }

  const buttonStyle = (
    active: boolean
  ) => ({

    width: "100%",

    textAlign: "left" as const,

    padding: "10px 12px",

    background: active

      ? "rgba(29, 78, 216, 0.12)"

      : "transparent",

    transform: active
      ? "translateX(2px)"
      : "none",

    transition: "0.2s",

    border: "none",

    color: "#e5e7eb",

    cursor: "pointer",

    borderRadius: "6px",

    fontSize: "14px",

  });

  return (

    <div
      style={{
        width: "240px",
        height: "100vh",
        background: "#111827",
        color: "#e5e7eb",
        display: "flex",
        flexDirection: "column",
      }}
    >

      {/* HEADER */}

      <div
        style={{
          padding: "16px",
          borderBottom:
            "1px solid #2a3550",
        }}
      >

        <h2
          style={{
            margin: 0,
            fontSize: "18px",
          }}
        >
          Clube App
        </h2>

      </div>

      {/* MENU */}

      <div
        style={{
          flex: 1,
          padding: "12px",
          overflowY: "auto",
        }}
      >

        {/* DASHBOARD */}

        <button
          style={buttonStyle(
            isActive("/dashboard")
          )}
          onClick={() =>
            handleNavigate(
              "/dashboard"
            )
          }
        >
          Sobre o App
        </button>

        {/* CONVITES */}

        <div
          style={{
            marginTop:
              spacing.md,

            marginBottom:
              spacing.xs,

            fontSize: "12px",

            opacity: 0.7,
          }}
        >
          Convites
        </div>

        <button
          style={buttonStyle(
            isActive(
              "/invitations/list"
            )
          )}
          onClick={() =>
            handleNavigate(
              "/invitations/list"
            )
          }
        >
          Lista de Convites
        </button>

       

        {/* CONVIDADOS */}

        <div
          style={{
            marginTop:
              spacing.md,

            marginBottom:
              spacing.xs,

            fontSize: "12px",

            opacity: 0.7,
          }}
        >
          Convidados
        </div>

        <button
          style={buttonStyle(
            isActive("/guests")
          )}
          onClick={() =>
            handleNavigate(
              "/guests"
            )
          }
        >
          Lista de Convidados
        </button>

        {/* COMUNICAÇÃO */}

        <div
          style={{
            marginTop:
              spacing.md,

            marginBottom:
              spacing.xs,

            fontSize: "12px",

            opacity: 0.7,
          }}
        >
          Comunicação
        </div>

        <button
          style={buttonStyle(
            isActive("/messages")
          )}
          onClick={() =>
            handleNavigate(
              "/messages"
            )
          }
        >
          Recados
        </button>

      </div>

    </div>

  );

}