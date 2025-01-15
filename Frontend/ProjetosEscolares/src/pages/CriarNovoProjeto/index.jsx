import "./style.css";
import { useRef, useState } from "react";
import api from "../../services/api";
import BotaoVoltar from "../../components/BotaoVoltar"; // Importe o BotaoVoltar
import Modal from "../../components/Modal"; // Importe o Modal

function CriarNovoProjeto() {
  const inputNome = useRef();
  const inputTarefas = useRef();
  const inputPrazos = useRef();
  const inputResponsavel = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function createProjetos() {
    try {
      await api.post("/api/Projeto", {
        NomeDoProjeto: inputNome.current.value,
        TarefasAssociadas: inputTarefas.current.value,
        Prazos: inputPrazos.current.value,
        Responsavel: inputResponsavel.current.value,
      });
      setIsModalOpen(true); // Abre o modal ao concluir o cadastro
    } catch (error) {
      console.error("Erro ao criar o projeto:", error);
    }
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="container">
      <form className="formCadastro">
        <h1>Cadastro de Projetos</h1>
        <input
          placeholder="Nome do Projeto"
          className="nome"
          type="text"
          ref={inputNome}
        />
        <input
          placeholder="Tarefas Associadas"
          className="tarefas"
          type="text"
          ref={inputTarefas}
        />
        <input
          placeholder="Prazo"
          className="prazos"
          type="text"
          ref={inputPrazos}
        />
        <input
          placeholder="Responsável"
          className="responsavel"
          type="text"
          ref={inputResponsavel}
        />
        <button type="button" onClick={createProjetos}>
          Cadastrar
        </button>
      </form>

      {/* Usando o Modal */}
      <Modal
        mensagem="O projeto foi cadastrado com sucesso."
        visivel={isModalOpen}
        onClose={closeModal}
      />

      {/* Adicionando o botão de voltar */}
      <div className="botao-voltar-container">
        <BotaoVoltar caminho="/" />
      </div>
    </div>
  );
}

export default CriarNovoProjeto;
