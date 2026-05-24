import { api } from "./api";

import type { Invitation } from "../types/invitation";

export async function getMyInvitations(): Promise<Invitation[]> {

  const response = await api.get(
    "/api/v1/invitations/mine"
  );

  return response.data.data || [];
}


// ====================
// CRIAR CONVITES
// ====================

interface CreateInvitationsDTO {

  cpf_convidado: string;

  data_inicial: string;

  data_final: string;

}

export async function createInvitations(
  data: CreateInvitationsDTO
) {

  const response = await api.post(
    "/api/v1/invitations",
    data
  );

  return response.data;

}