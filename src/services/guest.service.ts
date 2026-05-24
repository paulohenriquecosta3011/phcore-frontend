//guest.service.ts

import { api } from "./api";
import type { Guest } from "../types/guest";

type GuestsResponse = {
  convidados: Guest[];
};

export async function getMyGuests(): Promise<Guest[]> {
  const response = await api.get<{
    data: GuestsResponse;
  }>("/api/v1/guests/mine");

  return response.data.data.convidados || [];
}


export async function createGuest(formData: FormData) {
  const response = await api.post(
    "/api/v1/guests",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}


export async function findGuestByCpf(cpf: string) {

  const response = await api.get(
    `/api/v1/guests/cpf/${cpf}`
  );

  return response.data.data;
}