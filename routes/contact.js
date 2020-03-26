const express = require('express');
const router = express.Router();

module.exports = () => {
  /* GET contact page. */
  router.get('/', (req, res, next) => {
    res.render('layout', {
      pageTitle: 'Neem contact met ons op, we reageren snel',
      template: 'Contact',
    });
  });

  router.post('/', (req, res, next) => {
    res.send('Je bericht is succesvol verzonden');
  });

  return router;
};
