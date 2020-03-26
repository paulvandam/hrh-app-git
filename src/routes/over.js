const express = require('express');
const router = express.Router();

module.exports = params => {
  /* GET over page. */
  router.get('/', (req, res, next) => {
    res.render('layout', {
      pageTitle: 'Als chronische je leven beheerst staan wij voor je klaar',
      template: 'over',
    });
  });

  router.get('/voor-wie', (req, res, next) => {
    res.render('layout', {
      pageTitle: `Beheerst rugpijn je leven? Test jezelf`,
      template: 'over/voor-wie',
    });
  });
  router.get('/behandeling', (req, res, next) => {
    res.render('layout', {
      pageTitle: `Behandeling van chronische rugklachten`,
      template: 'over/behandeling',
    });
  });
  router.get('/behandelteam', (req, res, next) => {
    res.render('layout', {
      pageTitle: `Specialisten met aandacht voor jou`,
      template: 'over/behandelteam',
    });
  });
  const { reviewsService } = params;
  router.get('/resultaten', async (req, res, next) => {
    const recenteReviews = await reviewsService.getListShort();
    res.render('layout', {
      pageTitle: `Meer kwaliteit van leven bij chronische rugpijn`,
      template: 'over/resultaten',
      recenteReviews,
    });
  });
  router.get('/vergoeding', (req, res, next) => {
    res.render('layout', {
      pageTitle: `Volledig vergoed door de basisverzekering`,
      template: 'over/vergoeding',
    });
  });

  router.get('/wachttijden', (req, res, next) => {
    res.render('layout', {
      pageTitle: `Binnen twee weken starten bij chronische rugpijn`,
      template: 'over/wachttijden',
    });
  });

  return router;
};
