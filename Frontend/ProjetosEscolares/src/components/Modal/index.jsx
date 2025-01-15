import PropTypes from "prop-types";
import "./style.css";

function Modal({ mensagem, visivel, onClose }) {
  if (!visivel) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <p>{mensagem}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </>
  );
}

Modal.propTypes = {
  mensagem: PropTypes.string.isRequired,
  visivel: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
