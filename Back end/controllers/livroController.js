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
  executarComandoSQL('SELECT * FROM livro', [], res, "Erro na consulta de livros");
});


router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarComandoSQL('SELECT * FROM livro WHERE id = ?', [id], res, "Erro na consulta de livro");
});


router.post('/', (req, res) => {
  const { titulo, autor, data_lancamento, genero } = req.body;
  executarComandoSQL('INSERT INTO livro (titulo, autor, data_lancamento, genero) VALUES (?, ?, ?, ?)', [titulo, autor, data_lancamento, genero], res, "Erro no cadastro de livro");
});


router.delete("/:id", (req, res) => {
  const livroId = req.params.id;
  executarComandoSQL('DELETE FROM livro WHERE id = ?', [livroId], res, 'Erro ao deletar livro');
});


router.put('/', (req, res) => {
  const { id, titulo, autor, data_lancamento, genero } = req.body;
  executarComandoSQL('UPDATE livro SET titulo = ?, autor = ?, data_lancamento = ?, genero = ? WHERE id = ?', [titulo, autor, data_lancamento, genero, id], res, "Erro ao atualizar livro");
});

module.exports = router;