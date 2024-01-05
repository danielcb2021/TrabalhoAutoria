import UsuarioView from "../view/UsuarioView.js";
import { API_BASE_URL } from "../config/config.js";

/**
 * Renderiza o formulário de tarefa.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde o formulário será renderizado.
 */
function renderizarUsuarioFormulario(componentePrincipal) {
  componentePrincipal.innerHTML = UsuarioView.renderizarFormulario();
  document.getElementById("formulario_usuario").addEventListener("submit", cadastrarUsuario);
}

/**
 * Cadastra uma nova tarefa.
 * @param {Event} event - Evento do formulário.
 */
async function cadastrarUsuario(event) {
  event.preventDefault();
  const nomeValor = document.getElementById("usuario_nome_formulario").value;
  const nascimentoValor = document.getElementById("usuario_nascimento_formulario").value;
  const generoValor = document.getElementById("usuario_genero_formulario").value;
  const emailValor = document.getElementById("usuario_email_formulario").value;
  const senhaValor = document.getElementById("usuario_senha_formulario").value;
  const novoUsuario = { nome: nomeValor, data_nascimento: nascimentoValor, genero: generoValor,
    email: emailValor, senha: senhaValor };

  try {
    await fetch(`${API_BASE_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoUsuario),
    });
    const componentePrincipal = document.querySelector("#conteudo_principal");
    await renderizarListaUsuarios(componentePrincipal);
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
  }
}
/**
 * Renderiza a lista de tarefas.
 * @param {HTMLElement} componentePrincipal - Elemento principal onde a lista será renderizada.
 */
async function renderizarListaUsuarios(componentePrincipal) {
  try {
    const response = await fetch(API_BASE_URL + "/usuarios");
    const usuariosBD = await response.json(); 

    const usuarios = usuariosBD.map((row) => {
      return {
        id: row.id,
        nome: row.nome,
        data_nascimento: row.data_nascimento,
        genero: row.genero,
        email: row.email,
        senha: row.senha,
      };
    });
    componentePrincipal.innerHTML = UsuarioView.renderizarTabela(usuarios);
    inserirEventosExcluir();
    inserirEventosAtualizar();
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
  }
}

/**
 * Adiciona eventos de clique aos botões de exclusão de tarefa.
 * Cada botão, quando clicado, aciona a função de exclusão de tarefa correspondente.
 */
function inserirEventosExcluir() {
  const botoesExcluir = document.querySelectorAll(".excluir-btn");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", function () {
      const usuarioId = this.getAttribute("usuario-id");
      excluirUsuario(usuarioId);
    });
  });
}

/**
 * Adiciona eventos de clique aos botões de atualização de tarefa.
 * Cada botão, quando clicado, aciona a função de buscar a tarefa específica para atualização.
 */
function inserirEventosAtualizar() {
  const botoesAtualizar = document.querySelectorAll(".atualizar-btn");
  botoesAtualizar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const usuarioId = this.getAttribute("usuario-atualizar-id");
      buscarUsuario(usuarioId);
    });
  });
}

/**
 * Exclui uma tarefa específica com base no ID.
 * Após a exclusão bem-sucedida, a lista de tarefas é atualizada.
 * @param {string} id - ID da tarefa a ser excluída.
 */
async function excluirUsuario(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir o usuario");
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaUsuarios(componentePrincipal);
  } catch (error) {
    console.error("Erro ao excluir o usuario:", error);
  }
}

/**
 * Busca uma tarefa específica para atualização, com base no ID.
 * Após encontrar a tarefa, renderiza o formulário de atualização.
 * @param {string} id - ID da tarefa a ser buscada.
 */
async function buscarUsuario(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`);
    const usuariosBD = await response.json();
    if (usuariosBD.length <= 0) return;

    const usuario = usuariosBD.map(row => ({
        id: row.id,
        nome: row.nome,
        data_nascimento: row.data_nascimento,
        genero: row.genero,
        email: row.email,
        senha: row.senha,
    }))[0];

    const componentePrincipal = document.querySelector("#conteudo_principal");
    componentePrincipal.innerHTML = UsuarioView.renderizarFormularioAtualizar(usuario);
    document.getElementById("formulario_usuario_atualizar").addEventListener("submit", atualizarUsuario);
  } catch (error) {
    console.error("Erro ao buscar usuarios:", error);
  }
}

/**
 * Atualiza uma tarefa específica.
 * A função é acionada pelo evento de submit do formulário de atualização.
 * @param {Event} event - O evento de submit do formulário.
 */
async function atualizarUsuario(event) {
  event.preventDefault();
  const idValor = document.getElementById("usuario_id_formulario").value;
  const nomeValor = document.getElementById("usuario_nome_formulario").value;
  const generoValor = document.getElementById("usuario_genero_formulario").value;
  const emailValor = document.getElementById("usuario_email_formulario").value;
  const senhaValor = document.getElementById("usuario_senha_formulario").value;
  const nascimentoValor = document.getElementById("usuario_nascimento_formulario").value;
  const usuario = {id: idValor, nome: nomeValor, genero: generoValor, email: emailValor, senha: senhaValor,
    data_nascimento: nascimentoValor, };

  try {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar o usuario");
    }
    const componentePrincipal = document.querySelector("#conteudo_principal");
    renderizarListaUsuarios(componentePrincipal);
  } catch (error) {
    console.error("Erro ao atualizar usuario:", error);
  }
}

const usuarioController = {
  renderizarUsuarioFormulario,
  cadastrarUsuario,
  renderizarListaUsuarios,
  excluirUsuario
};

export default usuarioController;
