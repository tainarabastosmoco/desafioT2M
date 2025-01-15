import "./style.css";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";
import BotaoVoltar from "../../../src/components/BotaoVoltar";
import Modal from "../../components/Modal";

function ListarProjetos() {
  const [projetos, setProjetos] = useState([]);
  const [projetoEditando, setProjetoEditando] = useState(null);
  const [dadosEdicao, setDadosEdicao] = useState({});
  const [modalExclusaoVisivel, setModalExclusaoVisivel] = useState(false);
  const [modalEdicaoVisivel, setModalEdicaoVisivel] = useState(false);

  async function getProjetos() {
    try {
      const projetosFromApi = await api.get("/api/Projeto");
      const projetosArray = projetosFromApi.data.dados;
      setProjetos(Array.isArray(projetosArray) ? projetosArray : []);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  }

  async function atualizarProjeto(id) {
    try {
      await api.put(`/api/Projeto/${id}`, dadosEdicao);
      console.log(`Projeto com ID ${id} atualizado com sucesso.`);
      setProjetos((prevProjetos) =>
        prevProjetos.map((projeto) =>
          projeto.id === id ? { ...projeto, ...dadosEdicao } : projeto
        )
      );
      setProjetoEditando(null);
      setModalEdicaoVisivel(true);
      setTimeout(() => setModalEdicaoVisivel(false), 3000);
    } catch (error) {
      console.error("Erro ao atualizar o projeto:", error);
    }
  }

  async function deletarProjeto(id) {
    try {
      await api.delete(`/api/Projeto/${id}`);
      setProjetos((prevProjetos) =>
        prevProjetos.filter((projeto) => projeto.id !== id)
      );
      setModalExclusaoVisivel(true);
      setTimeout(() => setModalExclusaoVisivel(false), 3000);
    } catch (error) {
      console.error("Erro ao excluir o projeto:", error);
    }
  }

  useEffect(() => {
    getProjetos();
  }, []);

  function iniciarEdicao(projeto) {
    setProjetoEditando(projeto.id);
    setDadosEdicao(projeto);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setDadosEdicao((prevDados) => ({ ...prevDados, [name]: value }));
  }

  return (
    <div>
      <Modal
        mensagem="Projeto excluído com sucesso!"
        visivel={modalExclusaoVisivel}
        onClose={() => setModalExclusaoVisivel(false)}
      />

      <Modal
        mensagem="Projeto editado com sucesso!"
        visivel={modalEdicaoVisivel}
        onClose={() => setModalEdicaoVisivel(false)}
      />

      {projetos.length > 0 ? (
        projetos.map((projeto) => (
          <div key={projeto.id} className="card">
            {projetoEditando === projeto.id ? (
              <form
                className="formEdicao"
                onSubmit={(e) => {
                  e.preventDefault();
                  atualizarProjeto(projeto.id);
                }}
              >
                <label>
                  Nome do Projeto:
                  <input
                    className="editarprojeto"
                    type="text"
                    name="nomeDoProjeto"
                    value={dadosEdicao.nomeDoProjeto || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Turma na qual o projeto será realizado:
                  <input
                    className="editarprojeto"
                    type="text"
                    name="turma"
                    value={dadosEdicao.turma || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Tarefas Associadas:
                  <input
                    className="editarprojeto"
                    type="text"
                    name="tarefasAssociadas"
                    value={dadosEdicao.tarefasAssociadas || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Prazo:
                  <input
                    className="editarprojeto"
                    type="text"
                    name="prazos"
                    value={dadosEdicao.prazos || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Responsável:
                  <input
                    className="editarprojeto"
                    type="text"
                    name="responsavel"
                    value={dadosEdicao.responsavel || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setProjetoEditando(null)}>
                  Cancelar
                </button>
              </form>
            ) : (
              <div>
                <div className="lista">
                  <p>
                    Nome do Projeto: <span>{projeto.nomeDoProjeto}</span>
                  </p>
                  <p>
                    Turma na qual o projeto será realizado: <span>{projeto.turma}</span>
                  </p>
                  <p>
                    Tarefas Associadas: <span>{projeto.tarefasAssociadas}</span>
                  </p>
                  <p>
                    Prazo: <span>{projeto.prazos}</span>
                  </p>
                  <p>
                    Responsável: <span>{projeto.responsavel}</span>
                  </p>
                </div>
                <div className="iconsC">
                  <button
                    className="buttonIcons"
                    style={{ marginRight: "10px" }}
                    onClick={() => deletarProjeto(projeto.id)}
                  >
                    <FaTrashAlt />
                  </button>
                  <button
                    className="buttonIcons"
                    onClick={() => iniciarEdicao(projeto)}
                  >
                    <BiSolidPencil />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>
          {projetos.length === 0
            ? "Nenhum projeto encontrado."
            : "Carregando projetos..."}
        </p>
      )}
      <BotaoVoltar caminho="/" />
    </div>
  );
}

export default ListarProjetos;
