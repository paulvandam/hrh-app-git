const createError = require('http-errors');
const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const VestigingService = require('./services/VestigingService');
const ReviewsService = require('./services/ReviewService');
const StoriesService = require('./services/StoryService');

const vestigingService = new VestigingService('./src/data/vestigingen.json');
const reviewsService = new ReviewsService('./src/data/reviews.json');
const storiesService = new StoriesService('./src/data/stories.json');

const routes = require('./routes');

const app = express();

// related to cookie-session Middleware
app.set('trust proxy', 1);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.siteName = 'Het Rughuis';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('657Gv89WVNn9879P55Q'));
app.use(
  cookieSession({
    name: 'session',
    keys: ['kjhsajashkjsa', 'kashusahkahukh'],
  })
);
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  try {
    const vestigingen = await vestigingService.getNames();
    res.locals.vestigingNamen = vestigingen;
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(
  `/.netlify/functions/app`,
  routes({
    vestigingService,
    reviewsService,
    storiesService,
  })
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
module.exports.handler = serverless(app);
