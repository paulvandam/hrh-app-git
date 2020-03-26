const fs = require('fs');
const util = require('util');

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching stories information
 */
class storyService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the stories data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Returns a list of stories naam and slug
   */
  async getNames() {
    const data = await this.getData();

    // We are using map() to transform the array we get into another one
    return data.map(story => {
      return { naam: story.naam, slug: story.slug };
    });
  }

  /**
   * Get story information provided a slug
   * @param {*} slug
   */
  async getStory(slug) {
    const data = await this.getData();
    const story = data.find(elm => {
      return elm.slug === slug;
    });
    if (!story) return null;
    return {
      naam: story.naam,
      vestiging: story.vestiging,
      quote: story.quote,
      samenvatting: story.samenvatting,
      reviewtekst: story.reviewtekst,
      slug: story.slug,
      profielfoto: story.profielfoto,
      ytlink: story.ytlink,
    };
  }

  /**
   * Returns a list of stories with only the basic information
   */
  async getListShort() {
    const data = await this.getData();
    return data.map(story => {
      return {
        naam: story.naam,
        quote: story.quote,
        slug: story.slug,
      };
    });
  }

  /**
   * Get a list of stories
   */
  async getList() {
    const data = await this.getData();
    return data.map(story => {
      return {
        naam: story.naam,
        slug: story.slug,
      };
    });
  }

  /**
   * Fetches stories data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    return JSON.parse(data).stories;
  }
}

module.exports = storyService;
