const express = require('express');
const router = express.Router();

module.exports = params => {
  const { vestigingService } = params;

  /* GET afspraak page. */
  router.get('/', async (req, res, next) => {
    const vestigingen = await vestigingService.getListShort();
    res.render('layout', {
      pageTitle: 'Maak een afspraak en laat je informeren',
      template: 'afspraak',
      vestigingen,
    });
  });

  router.post('/', (req, res, next) => {
    res.send('Je aanvraag werd succesvol verzonden.');
  });

  return router;
};
