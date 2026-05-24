import {
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  FaPlus,
  FaArrowLeft,
  FaTicketAlt,
} from "react-icons/fa";
import { useGuests } from "../../hooks/guests/useGuests";
import { createInvitations} from "../../services/invitation.service";
import { toast } from "react-toastify";

function getTodayDate() {

  return new Date()
    .toISOString()
    .split("T")[0];

}

export default function Guests() {

  const { guests, loading } = useGuests();

  const navigate = useNavigate();

  const inviteSectionRef =
    useRef<HTMLDivElement | null>(null);

  const listSectionRef =
    useRef<HTMLDivElement | null>(null);

  const [search, setSearch] = useState("");

  const [selectedGuest, setSelectedGuest] =
    useState<any>(null);

  const [startDate, setStartDate] =  useState(getTodayDate());

  const [endDate, setEndDate] =  useState(getTodayDate());
  
  const [observation, setObservation] =
    useState("");
  const [saving, setSaving] = useState(false);

  const filteredGuests = useMemo(() => {

    return [...guests]

      .sort((a, b) =>
        a.nome.localeCompare(
          b.nome,
          "pt-BR"
        )
      )

      .filter((guest) =>
        guest.nome
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

  }, [guests, search]);

  function handleSelectGuest(guest: any) {

    setSelectedGuest(guest);

    setTimeout(() => {

      inviteSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    }, 100);

  }

  function handleBackToList() {

    setSelectedGuest(null);

    setTimeout(() => {

      listSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    }, 100);

  }

 async function handleCreateInvites() {

  try {

    if (!selectedGuest) return;

    if (!startDate || !endDate) {

      toast.warning("Informe as datas.");
      return;

    }

    setSaving(true);

    await createInvitations({

      cpf_convidado:
        selectedGuest.cpf,

      data_inicial:
        startDate,

      data_final:
        endDate

    });

    toast.success(
      "Convites gerados com sucesso!"
    );

    setStartDate(
      getTodayDate()
    );

    setEndDate(
      getTodayDate()
    );

    setObservation("");

  } catch (error: any) {

    console.error(error);

    toast.error(

      error?.response?.data?.message ||

      "Erro ao gerar convites"

    );

  } finally {

    setSaving(false);

  }

}

  return (

    <div style={{ padding: "24px" }}>

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >

        <h1
          style={{
            margin: 0,
          }}
        >
          Convidados
        </h1>

        <button
          onClick={() => navigate("/guests/new")}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FaPlus />
          Novo Convidado
        </button>

      </div>

      {/* BUSCA */}

      <input
        type="text"
        placeholder="Buscar convidado por nome"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "24px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          fontSize: "14px",
          boxSizing: "border-box",
        }}
      />

      {/* LOADING */}

      {loading && <p>Carregando...</p>}

      {/* EMPTY */}

      {!loading &&
        filteredGuests.length === 0 && (
          <p>
            Nenhum convidado encontrado.
          </p>
        )}

      {/* LISTA */}

      <div
        ref={listSectionRef}
        style={{
          display: "grid",
          gap: "16px",
        }}
      >

        {filteredGuests.map((guest) => (

          <div
            key={guest.cpf}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
              gap: "16px",
              padding: "16px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              background: "#fff",
              flexWrap: "wrap",
            }}
          >

            {/* ESQUERDA */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                minWidth: 0,
                flex: 1,
              }}
            >

              {/* FOTO */}

              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${guest.foto}`}
                alt={guest.nome}
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "12px",
                  objectFit: "cover",
                  background: "#f3f4f6",
                  flexShrink: 0,
                }}
              />

              {/* DADOS */}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  minWidth: 0,
                }}
              >

                <h3
                  style={{
                    margin: 0,
                    fontSize: "16px",
                  }}
                >
                  {guest.nome}
                </h3>

                <div
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                  }}
                >
                  CPF: {guest.cpf}
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                  }}
                >
                  Telefone:{" "}
                  {guest.telefone || "-"}
                </div>

              </div>

            </div>

            {/* BOTÃO */}

            <button
              onClick={() =>
                handleSelectGuest(guest)
              }



              style={{
                padding: "10px 16px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaTicketAlt />
              Criar Convite
            </button>

          </div>

        ))}

      </div>

      {/* ÁREA CRIAR CONVITES */}

      {selectedGuest && (

        <div
          ref={inviteSectionRef}
          style={{
            marginTop: "40px",
            paddingTop: "32px",
            borderTop: "2px solid #e5e7eb",
          }}
        >

          {/* HEADER CONVITES */}

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              marginBottom: "24px",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >

            <h2
              style={{
                margin: 0,
              }}
            >
              Criar Convites
            </h2>

            <button
              onClick={handleBackToList}
              style={{
                padding: "8px 14px",
                border:
                  "1px solid #d1d5db",
                borderRadius: "8px",
                background: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaArrowLeft />
              Voltar para Lista
            </button>

          </div>

          {/* CARD */}

          <div
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "24px",
            }}
          >

            {/* CONVIDADO */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "24px",
                flexWrap: "wrap",
              }}
            >

              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${selectedGuest.foto}`}
                alt={selectedGuest.nome}
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "12px",
                  objectFit: "cover",
                  background: "#f3f4f6",
                }}
              />

              <div>

                <h3
                  style={{
                    margin: 0,
                    marginBottom: "6px",
                  }}
                >
                  {selectedGuest.nome}
                </h3>

                <div
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                  }}
                >
                  CPF:{" "}
                  {selectedGuest.cpf}
                </div>

              </div>

            </div>

            {/* FORM */}

            <div
              style={{
                display: "grid",
                gap: "16px",
              }}
            >

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "16px",
                }}
              >

                <div>

                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Data Inicial
                  </label>

                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) =>
                      setStartDate(
                        e.target.value
                      )
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      border:
                        "1px solid #d1d5db",
                      borderRadius: "8px",
                      boxSizing:
                        "border-box",
                    }}
                  />

                </div>

                <div>

                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Data Final
                  </label>

                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) =>
                      setEndDate(
                        e.target.value
                      )
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      border:
                        "1px solid #d1d5db",
                      borderRadius: "8px",
                      boxSizing:
                        "border-box",
                    }}
                  />

                </div>

              </div>

              <div>

                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Observação
                </label>

                <textarea
                  value={observation}
                  onChange={(e) =>
                    setObservation(
                      e.target.value
                    )
                  }
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border:
                      "1px solid #d1d5db",
                    borderRadius: "8px",
                    resize: "vertical",
                    boxSizing:
                      "border-box",
                  }}
                />

              </div>
    
              <button onClick={handleCreateInvites} disabled={saving}
                  style={{
                  padding: "14px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  opacity: saving ? 0.7 : 1,
                  pointerEvents:
                  saving ? "none" : "auto",
                }}
              >
                <FaTicketAlt />
                          {saving ? "Gerando...":"Gerar Convites"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}