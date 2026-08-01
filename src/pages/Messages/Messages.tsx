import "./Messages.css";

export default function Messages() {
  return (
    <div className="messages-container">

      <div className="messages-box">

        <div className="messages-header">

          <h1>
            Comunicação
          </h1>

          <h2>
            Recados do Clube
          </h2>

          <p>
            Módulo destinado à comunicação interna
            do clube com os associados.
          </p>

        </div>


        <h3>
          Funcionalidades previstas
        </h3>


        <div className="messages-cards">


          <div className="messages-card">

            <div className="messages-icon">
              📢
            </div>

            <h4>
              Avisos e comunicados
            </h4>

            <p>
              Publicação de informações importantes
              para os associados.
            </p>

          </div>


          <div className="messages-card">

            <div className="messages-icon">
              🎉
            </div>

            <h4>
              Eventos do clube
            </h4>

            <p>
              Divulgação de eventos e atividades.
            </p>

          </div>


          <div className="messages-card">

            <div className="messages-icon">
              💬
            </div>

            <h4>
              Mensagens importantes
            </h4>

            <p>
              Comunicação direta com os associados.
            </p>

          </div>


          <div className="messages-card">

            <div className="messages-icon">
              📱
            </div>

            <h4>
              Comunicação centralizada
            </h4>

            <p>
              Todas as informações pelo aplicativo.
            </p>

          </div>


        </div>


        <div className="messages-status">

          <h3>
            Status
          </h3>

          <p>
            🟡 Módulo planejado para próxima etapa
            do desenvolvimento.
          </p>

        </div>


      </div>

    </div>
  );
}

