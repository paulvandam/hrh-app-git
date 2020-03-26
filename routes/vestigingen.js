const express = require('express');
const router = express.Router();

module.exports = params => {
  const { vestigingService } = params;
  const { reviewsService } = params;

  /* GET vestigingen page. */
  router.get('/', async (req, res, next) => {
    const vestigingen = await vestigingService.getListShort();

    res.render('layout', {
      pageTitle: 'Behandeling chronische rugpijn in de regio',
      template: 'vestigingen',
      vestigingen,
    });
  });

  router.get('/:slug', async (req, res, next) => {
    const vestiging = await vestigingService.getVestiging(req.params.slug);
    const afbeeldingen = await vestigingService.getAfbeeldingenForVestiging(req.params.slug);
    const recenteReviews = await reviewsService.getListShort();

    // res.render('pages/over', { pageTitle: 'Over' });
    res.render('layout', {
      pageTitle: `Chronische rugpijn behandeling in ${vestiging.naam}`,
      template: 'vestigingen-single',
      vestiging,
      afbeeldingen,
      recenteReviews,
    });
  });

  return router;
};
