const express = require('express');
const router = express.Router();

module.exports = params => {
  const { reviewsService } = params;
  const { storiesService } = params;
  /* GET home page. */
  router.get('/', async (req, res, next) => {
    const recenteReviews = await reviewsService.getListShort();
    const recenteStories = await storiesService.getListShort();
    res.render('layout', {
      pageTitle: 'Bekijk reviews van cliënten',
      template: 'reviews',
      recenteReviews,
      recenteStories,
    });
  });

  router.get('/video/:slug', async (req, res, next) => {
    const story = await storiesService.getStory(req.params.slug);
    res.render('layout', {
      pageTitle: `Het verhaal van ${story.naam}`,
      template: 'reviews-video',
      story,
    });
  });

  router.get('/review/:slug', async (req, res, next) => {
    const review = await reviewsService.getReview(req.params.slug);
    res.render('layout', {
      pageTitle: `Het verhaal van ${review.naam}`,
      template: 'reviews-geschreven',
      review,
    });
  });

  router.post('/', (req, res, next) => {
    // res.render('pages/over', { pageTitle: 'Over' });
    res.send('Review succesvol ingezonden');
  });

  return router;
};
