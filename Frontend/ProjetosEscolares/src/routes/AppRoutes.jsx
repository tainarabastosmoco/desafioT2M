import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import CriarNovoProjeto from "../pages/CriarNovoProjeto";
import ListarProjetos from "../pages/ListarProjetos";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Home />
      </div>
    ),
  },
  {
    path: "/criarprojeto",
    element: (
      <div>
        <CriarNovoProjeto />
      </div>
    ),
  },
  {
    path: "/listarprojetos",
    element: (
      <div>
        <ListarProjetos />
      </div>
    ),
  },
]);

// Corrigido para exportar o router como default
export default router;
