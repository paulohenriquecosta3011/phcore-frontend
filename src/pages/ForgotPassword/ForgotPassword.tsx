import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  generateCode,
  validateCode,
  setPassword
} from "../../services/password.service";

import { getCompaniesByEmail } from "../../services/company.service";
import "./ForgotPassword.css";

export default function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [token, setToken] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);


  async function handleSetPassword() {

    try {

      await setPassword(
        newPassword,
        token
      );

      navigate("/");

    } catch (err:any) {

      console.log(err);

      setError(
        err?.response?.data?.message ||
        "Erro ao alterar senha."
      );
    }
  }


  async function handleValidate() {

    try {

      await validateCode(
        code,
        token
      );

      setStep(3);

    } catch (err:any) {

      console.log(err);

      setError(
        err?.response?.data?.message ||
        "Erro ao validar código."
      );
    }
  }


  async function resolveCompany() {

    const companies = await getCompaniesByEmail(email);


    if (companies.length === 0) {

      throw new Error(
        "Nenhuma empresa encontrada."
      );

    }


    if (companies.length > 1) {

      throw new Error(
        "Usuário possui mais de uma empresa."
      );

    }


    return companies[0].id_empresa;
  }



  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();


    setError("");


    try {

      setLoading(true);


      const empresaId = await resolveCompany();


      const response = await generateCode(
        email,
        empresaId
      );


      setToken(response.token);

      setStep(2);


    } catch (err:any) {


      console.log(err);


      setError(
        err?.response?.data?.message ||
        "Erro ao gerar código."
      );


    } finally {

      setLoading(false);

    }
  }



  return (

    <div className="forgot-password-container">


      <div className="forgot-password-box">


        <h2>
          Recuperação de Senha
        </h2>



        <form
          onSubmit={handleSubmit}
          className="forgot-password-form"
        >



          {step === 1 && (

            <>

              <input

                type="email"

                placeholder="Email"

                value={email}

                onChange={(e) =>
                  setEmail(e.target.value)
                }

                required

              />



              <button
                type="submit"
                disabled={loading}
              >

                {loading
                  ? "Enviando..."
                  : "Gerar código"}

              </button>


            </>

          )}




          {step === 2 && (

            <>

              <input

                type="text"

                placeholder="Código recebido no email"

                value={code}

                onChange={(e) =>
                  setCode(e.target.value)
                }

              />



              <button

                type="button"

                onClick={handleValidate}

                disabled={!token}

              >

                Validar código

              </button>


            </>

          )}




          {step === 3 && (

            <>

              <input

                type="password"

                placeholder="Nova senha"

                value={newPassword}

                onChange={(e) =>
                  setNewPassword(e.target.value)
                }

              />



              <button

                type="button"

                onClick={handleSetPassword}

              >

                Alterar senha

              </button>


            </>

          )}



        </form>




        {error && (

          <div className="forgot-password-error">

            {error}

          </div>

        )}



      </div>


    </div>

  );

}