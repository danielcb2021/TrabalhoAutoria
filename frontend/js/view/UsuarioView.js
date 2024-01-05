/**
 * Renderiza o formulário para criar uma nova tarefa.
 * @return {string} HTML do formulário de criação de tarefa.
 */
function renderizarFormulario() {
    return `
            <form class="mt-3" id="formulario_usuario">
                <div class="form-group">
                    <label for="usuario_titulo">Nome do usuário:</label>
                    <input type="text" class="form-control" id="usuario_nome_formulario">
                </div>
                <div class="form-group">
                    <label for="usuario_nascimento">Data de nascimento:</label>
                    <textarea class="form-control" id="usuario_nascimento_formulario"></textarea>
                </div>
                <div class="form-group">
                    <label for="usuario_genero">Gênero:</label>
                    <textarea class="form-control" id="usuario_genero_formulario"></textarea>
                </div>
                <div class="form-group">
                    <label for="usuario_email">Email:</label>
                    <textarea class="form-control" id="usuario_email_formulario"></textarea>
                </div>
                <div class="form-group">
                    <label for="usuario_senha">Senha:</label>
                    <textarea class="form-control" id="usuario_senha_formulario"></textarea>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Salvar</button>
            </form>
        `;
  }
  
  /**
   * Renderiza o formulário para atualizar uma tarefa existente.
   * @param {Object} usuario - A tarefa a ser atualizada.
   * @return {string} HTML do formulário de atualização de tarefa.
   */
  function renderizarFormularioAtualizar(usuario) {
      return `
              <form class="mt-3" id="formulario_usuario_atualizar">
                  <input type="hidden" class="form-control" id="usuario_id_formulario" value="${usuario.id}">
                  <div class="form-group">
                      <label for="usuario_nome">Nome do usuário:</label>
                      <input type="text" class="form-control" id="usuario_nome_formulario" value="${usuario.nome}">
                  </div>
                  <div class="form-group">
                      <label for="usuario_nascimento">Data de nascimento:</label>
                      <textarea class="form-control" id="usuario_nascimento_formulario">${usuario.data_nascimento}</textarea>
                  </div>
                  <div class="form-group">
                      <label for="usuario_genero">Gênero:</label>
                      <textarea class="form-control" id="usuario_genero_formulario">${usuario.genero}</textarea>
                  </div>
                  <div class="form-group">
                      <label for="usuario_email">Email:</label>
                      <textarea class="form-control" id="usuario_email_formulario">${usuario.email}</textarea>
                  </div>
                  <div class="form-group">
                      <label for="usuario_senha">Senha:</label>
                      <textarea class="form-control" id="usuario_senha_formulario">${usuario.senha}</textarea>
                  </div>
                  <button type="submit" class="btn btn-primary mt-2">Salvar</button>
              </form>
          `;
  }
  
    /**
   * Renderiza a tabela de tarefas.
   * @param {Array} usuarios - Lista de tarefas a serem exibidas.
   * @return {string} HTML da tabela de tarefas.
   */
  function renderizarTabela(usuarios) {
    let tabela = `
            <table class="table table mt-3">
                <thead>
                    <tr>
                        <th>Nome do usuário</th>
                        <th>Data de nascimento</th>
                        <th>Gênero</th>
                        <th>Email</th>
                        <th>Senha</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
        `;
  
    usuarios.forEach((usuario) => {
      tabela += `
                <tr>
                    <td>${usuario.nome}</td>
                    <td>${usuario.data_nascimento}</td>
                    <td>${usuario.genero}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.senha}</td>
                    <td>
                      <button class="excluir-btn" usuario-id=${usuario.id}>Excluir</button>
                      <button class="atualizar-btn" usuario-atualizar-id=${usuario.id}>Atualizar</button>
                    </td>
                </tr>
            `;
    });
  
    tabela += `
                </tbody>
            </table>
        `;
  
    return tabela;
  }
  
  const UsuarioView = {
      renderizarFormulario,
      renderizarTabela,
      renderizarFormularioAtualizar
  };
  
  export default UsuarioView;
  