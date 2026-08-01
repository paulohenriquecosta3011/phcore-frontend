
import { passwordApi } from "./passwordApi";

export async function generateCode(
  email: string,
  id_empresa: number
) {
  const response = await passwordApi.post(
    "/api/v1/users/generate-code",
    {
      email,
      id_empresa,
    }
  );

  return response.data.data;
}


export async function validateCode(
  code: string,
  token: string
) {
  const response = await passwordApi.post(
    "/api/v1/users/validate-code",
    {
      code,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}


export async function setPassword(
  password: string,
  token: string
) {
  const response = await passwordApi.post(
    "/api/v1/users/set-password",
    {
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}