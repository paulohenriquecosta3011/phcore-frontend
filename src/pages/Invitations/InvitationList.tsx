import {
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import { useInvitationList } from "../../hooks/invites/useInvitationList";
import "./InvitationList.css";

import { QRCode } from "react-qr-code";

import {
  FaWhatsapp,
} from "react-icons/fa";

const formatInvitationDate = (
date: string
) => {

const [year, month, day] =
date
.split("T")[0]
.split("-");

return day + "/" + month + "/" + year;

};

export default function InvitationList() {

  const { invitations, loading } =
    useInvitationList();

  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

  const [filterDate, setFilterDate] =
    useState("");
  const [openedQr, setOpenedQr] =
  useState<number | null>(null);

  const filteredInvitations =
    useMemo(() => {

      return [...invitations]

        .filter((invitation) => {

          const matchesName =
            invitation.nome_convidado
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const invitationDate =
            new Date(
              invitation.dataconvite
            )
              .toISOString()
              .split("T")[0];

          const matchesDate =
            !filterDate ||
            invitationDate ===
              filterDate;

          return (
            matchesName &&
            matchesDate
          );

        })

        .sort((a, b) => {

          const dateDiff =

            new Date(
              b.dataconvite
            ).getTime()

            -

            new Date(
              a.dataconvite
            ).getTime();

          if (dateDiff !== 0)
            return dateDiff;

          return a.nome_convidado.localeCompare(
            b.nome_convidado,
            "pt-BR"
          );

        });

    }, [
      invitations,
      search,
      filterDate,
    ]);
  
  return (

    <div className="invitation-page">

      {/* HEADER */}

      <div className="invitation-header">

        <h1>Convites</h1>

       

      </div>

      {/* FILTROS */}

      <div className="invitation-filters">

        <input
          type="text"
          placeholder="Buscar por nome"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <input
          type="date"
          value={filterDate}
          onChange={(e) =>
            setFilterDate(
              e.target.value
            )
          }
        />

      </div>

      {/* LOADING */}

      {loading && (
        <p>Carregando...</p>
      )}

      {/* EMPTY */}

      {!loading &&
        filteredInvitations.length === 0 && (
          <p>
            Nenhum convite encontrado.
          </p>
        )}

      {/* LISTA */}

      <div className="invitation-list">

        {filteredInvitations.map(
          (invitation) => (

            <div
              key={
                invitation.id_convite
              }
              className="invitation-card"
            >

              {/* FOTO */}

              {invitation.foto_convidado ? (

                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${invitation.foto_convidado}`}
                  alt={
                    invitation.nome_convidado
                  }
                  className="invitation-photo"
                />

              ) : (

                <div className="invitation-photo-placeholder">
                  Sem foto
                </div>

              )}

              {/* INFO */}

              <div className="invitation-info">

                <h3>
                  {
                    invitation.nome_convidado
                  }
                </h3>

                <div>
                  CPF:
                  {" "}
                  {
                    invitation.cpf_convidado
                  }
                </div>

                <div>
                  Telefone:
                  {" "}
                  {
                    invitation.telefone_convidado
                  }
                </div>

                <div>                
                  Período:{" "}
                    {formatInvitationDate(invitation.dataconvite)}{" "}
                    até{" "}
                    {formatInvitationDate(invitation.data_Final)}
                </div>

                <div
                  className={
                    invitation.status_portaria ===
                    "AGUARDANDO_PORTARIA"

                      ? "status-waiting"

                      : "status-ok"
                  }
                >

                  {
                    invitation.status_portaria
                  }

                </div>
                  <div className="invitation-actions">

                    <button
                      className="qr-button"
                      onClick={() =>

                        setOpenedQr(
                          openedQr ===
                            invitation.id_convite

                            ? null

                            : invitation.id_convite
                        )

                      }
                    >
                      
                      QRCode
                    </button>
              <button
                className="whatsapp-button"
                onClick={() => {

                  const inviteLink =
                    `${window.location.origin}/convite/${invitation.token}`;
                  const message =
                    `Olá ${invitation.nome_convidado},

                    Este é seu convite para o clube.

                    Período:
                      ${formatInvitationDate(invitation.dataconvite)} até
                      ${formatInvitationDate(invitation.data_Final)}                   
                    Acesse seu QRCode:
                  ${inviteLink}`;

                  const phone =
                    invitation.telefone_convidado
                      ?.replace(/\D/g, "");

                  const whatsappUrl =
                    `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;

                  window.open(
                    whatsappUrl,
                    "_blank"
                  );

                }}
              >
                <FaWhatsapp />
                WhatsApp
              </button>
                </div>
                {openedQr === invitation.id_convite &&
                  invitation.token && (

                  <div className="qrcode-container">

                    <QRCode
                      value={
                `${window.location.origin}/convite/${invitation.token}`
                      }
                      size={180}
                    />

                    <div className="qrcode-date">

                       Válido de{" "}
                    {formatInvitationDate(invitation.dataconvite)}{" "}
                    até{" "}
                    {formatInvitationDate(invitation.data_Final)}

                    </div>

                  </div>

                )}

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );

}