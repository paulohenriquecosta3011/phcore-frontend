//auth.service.ts
import { api } from "./api";

type LoginResponse = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export async function login(
  email: string,
  password: string,
  id_empresa: number
): Promise<LoginResponse> {
   console.log("API URL:", import.meta.env.VITE_API_URL);

  console.log("Tentando login:", {
    email,
    id_empresa,
  });
  const response = await api.post("/api/v1/users/login", {
    email,
    password,
    id_empresa,
  });

  return response.data.data;
}