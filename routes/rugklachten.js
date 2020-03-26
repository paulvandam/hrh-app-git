const express = require('express');
const router = express.Router();

module.exports = () => {
  /* GET home page. */
  router.get('/', (req, res, next) => {
    // res.render('pages/over', { pageTitle: 'Over' });
    res.send('Behandeling van rugklachten');
  });

  router.get('/:shortname', (req, res, next) => {
    // res.render('pages/over', { pageTitle: 'Over' });
    res.send(`Detailpagina voor ${req.params.shortname}`);
  });

  return router;
};
