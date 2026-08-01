import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">

      <div className="dashboard-box">

        <div className="dashboard-header">
          <h1>CLUBE UVA</h1>

          <h2>
            Bem-vindo ao Clube App
          </h2>

          <p>
            Sistema de gestão do clube
          </p>
        </div>


        <h3>
          Módulos disponíveis
        </h3>


        <div className="dashboard-cards">

          <div className="dashboard-card">
            <div className="dashboard-icon">
              👥
            </div>

            <h4>
              Cadastro de convidados
            </h4>

            <p>
              Gerencie os convidados do clube.
            </p>
          </div>


          <div className="dashboard-card">
            <div className="dashboard-icon">
              🎟️
            </div>

            <h4>
              Geração de convites
            </h4>

            <p>
              Crie e acompanhe convites.
            </p>
          </div>


          <div className="dashboard-card">
            <div className="dashboard-icon">
              QR
            </div>

            <h4>
              QR Code de acesso
            </h4>

            <p>
              Controle de entrada dos visitantes.
            </p>
          </div>


          <div className="dashboard-card">
            <div className="dashboard-icon">
              📱
            </div>

            <h4>
              WhatsApp
            </h4>

            <p>
              Compartilhamento rápido de convites.
            </p>
          </div>

        </div>


        <div className="dashboard-status">

          <h3>
            Status do projeto
          </h3>

          <p>
            🟢 Em fase final de desenvolvimento
          </p>

        </div>


      </div>

    </div>
  );
}
