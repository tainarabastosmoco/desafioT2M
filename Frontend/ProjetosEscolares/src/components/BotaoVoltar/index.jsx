import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";

function BotaoVoltar({ caminho = "/" }) {
  const navigate = useNavigate();

  return (
    <button className="botao-voltar" onClick={() => navigate(caminho)}>
      ← Voltar
    </button>
  );
}

BotaoVoltar.propTypes = {
  caminho: PropTypes.string, // Define que 'caminho' é uma string
};

export default BotaoVoltar;
