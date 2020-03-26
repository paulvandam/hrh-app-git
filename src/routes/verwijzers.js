const express = require('express');
const router = express.Router();

module.exports = () => {
  /* GET verwijzers page. */
  router.get('/', (req, res, next) => {
    res.render('layout', {
      pageTitle: 'Verwijs een patiënt bij chronsiche rugklachten',
      template: 'verwijzers',
    });
  });

  router.get('/verwijsgids', (req, res, next) => {
    res.render('layout', {
      pageTitle: `Hulpgids bij het vermoeden van een somatisch-symptoomstoornis`,
      template: 'verwijzers/verwijsgids',
    });
  });

  return router;
};
