const fs = require('fs');
const util = require('util');

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching reviews information
 */
class ReviewService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the reviews data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Returns a list of reviews naam and slug
   */
  async getNames() {
    const data = await this.getData();

    // We are using map() to transform the array we get into another one
    return data.map(review => {
      return { naam: review.naam, slug: review.slug };
    });
  }

  /**
   * Get review information provided a slug
   * @param {*} slug
   */
  async getReview(slug) {
    const data = await this.getData();
    const review = data.find(elm => {
      return elm.slug === slug;
    });
    if (!review) return null;
    return {
      naam: review.naam,
      vestiging: review.vestiging,
      samenvatting: review.samenvatting,
      reviewtekst: review.reviewtekst,
      slug: review.slug,
      profielfoto: review.profielfoto,
    };
  }

  /**
   * Returns a list of reviews with only the basic information
   */
  async getListShort() {
    const data = await this.getData();
    return data.map(review => {
      return {
        naam: review.naam,
        samenvatting: review.samenvatting,
        slug: review.slug,
        vestiging: review.vestiging,
      };
    });
  }

  /**
   * Get a list of reviews
   */
  async getList() {
    const data = await this.getData();
    return data.map(review => {
      return {
        naam: review.naam,
        slug: review.slug,
      };
    });
  }

  /**
   * Fetches reviews data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    return JSON.parse(data).reviews;
  }
}

module.exports = ReviewService;
