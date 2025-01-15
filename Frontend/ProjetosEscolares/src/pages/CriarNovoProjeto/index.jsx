import "./style.css";
import { useRef, useState } from "react";
import api from "../../services/api";
import BotaoVoltar from "../../components/BotaoVoltar";
import Modal from "../../components/Modal";

function CriarNovoProjeto() {
  const inputNome = useRef();
  const inputTurma = useRef();
  const inputTarefas = useRef();
  const inputPrazos = useRef();
  const inputResponsavel = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function createProjetos() {
    try {
      await api.post("/api/Projeto", {
        NomeDoProjeto: inputNome.current.value,
        Turma: inputTurma.current.value,
        TarefasAssociadas: inputTarefas.current.value,
        Prazos: inputPrazos.current.value,
        Responsavel: inputResponsavel.current.value,
      });

      inputNome.current.value = "";
      inputTurma.current.value = "";
      inputTarefas.current.value = "";
      inputPrazos.current.value = "";
      inputResponsavel.current.value = "";

      setIsModalOpen(true);
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
          placeholder="Turma na qual o projeto será realizado"
          className="turma"
          type="text"
          ref={inputTurma}
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

      <Modal
        mensagem="O projeto foi cadastrado com sucesso."
        visivel={isModalOpen}
        onClose={closeModal}
      />

      <div className="botao-voltar-container">
        <BotaoVoltar caminho="/" />
      </div>
    </div>
  );
}

export default CriarNovoProjeto;
