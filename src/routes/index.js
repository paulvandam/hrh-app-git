const express = require('express');
const overRoute = require('./over');
const reviewsRoute = require('./reviews');
const vestigingenRoute = require('./vestigingen');
const contactRoute = require('./contact');
const rugklachtenRoute = require('./rugklachten');
const verwijzersRoute = require('./verwijzers');
const afspraakRoute = require('./afspraak');

const router = express.Router();

module.exports = params => {
  const { reviewsService } = params;
  const { storiesService } = params;

  /* GET home page. */
  router.get('/', async (req, res, next) => {
    const recenteReviews = await reviewsService.getListShort();
    const recenteStories = await storiesService.getListShort();

    res.render('layout', {
      pageTitle: 'Behandeling bij chronische rugpijn',
      template: 'index',
      recenteReviews,
      recenteStories,
    });
  });

  router.use('/over', overRoute(params));
  router.use('/reviews', reviewsRoute(params));
  router.use('/vestigingen', vestigingenRoute(params));
  router.use('/contact', contactRoute());
  router.use('/rugklachten', rugklachtenRoute());
  router.use('/verwijzers', verwijzersRoute());
  router.use('/afspraak', afspraakRoute(params));

  return router;
};
