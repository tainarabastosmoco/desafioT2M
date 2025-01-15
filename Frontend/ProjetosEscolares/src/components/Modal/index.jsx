import "./style.css"; // Arquivo de estilo para o Footer

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

export default Modal;
