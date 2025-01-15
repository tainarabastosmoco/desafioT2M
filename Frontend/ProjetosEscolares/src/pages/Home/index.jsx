import { Link } from "react-router-dom";
import "./style.css";
import { PiPaintBrushDuotone } from "react-icons/pi";

function Home() {
  return (
    <div className="containerHome">
      <h1 className="titulo">
        Gerenciador de Projetos Escolares <PiPaintBrushDuotone />
      </h1>
      <div className="button-container">
        <Link to="/criarprojeto">
          <button className="buttonHome">Criar Novo Projeto</button>
        </Link>
        <Link to="/listarprojetos">
          <button className="buttonHome">Listar Todos os Projetos</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
