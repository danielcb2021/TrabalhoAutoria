const express = require('express');
const router = express.Router();
const db = require('../util/db');
const verificarToken = require('../util/VerificaToken');

/**
 * Executa uma consulta no banco de dados e envia uma resposta.
 * @param {string} sql - A consulta SQL a ser executada.
 * @param {Array} params - Os parâmetros para a consulta SQL.
 * @param {Object} res - O objeto de resposta do Express.
 * @param {string} erroMsg - Mensagem de erro para ser enviada em caso de falha.
 */
function executarComandoSQL(sql, params, res, erroMsg) {
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ erro: erroMsg, detalhes: err });
    } else {
      res.status(200).json(result);
    }
  });
}


router.get('/', (req, res) => {
  executarComandoSQL('SELECT * FROM usuario', [], res, "Erro na consulta de usuarios");
});


router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarComandoSQL('SELECT * FROM usuario WHERE id = ?', [id], res, "Erro na consulta de usuario");
});


router.post('/', (req, res) => {
  const { nome, data_nascimento, genero, email, senha } = req.body;
  executarComandoSQL('INSERT INTO usuario (nome, data_nascimento, genero, email, senha) VALUES (?, ?, ?, ?, ?)', [nome, data_nascimento, genero, email, senha], res, "Erro no cadastro de usuario!");
});


router.delete("/:id", (req, res) => {
  const usuarioId = req.params.id;
  executarComandoSQL('DELETE FROM usuario WHERE id = ?', [usuarioId], res, 'Erro ao deletar usuario');
});


router.put('/', (req, res) => {
  const { id, nome, data_nascimento, genero, email, senha } = req.body;
  executarComandoSQL('UPDATE usuario SET nome = ?, data_nascimento = ?, genero = ?, email = ?, senha = ? WHERE id = ?', [nome, data_nascimento, genero, email, senha, id], res, "Erro ao atualizar usuario");
});

module.exports = router;