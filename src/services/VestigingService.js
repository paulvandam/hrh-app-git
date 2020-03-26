const fs = require('fs');
const util = require('util');

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching vestigingen information
 */
class VestigingService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the vestigingen data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Returns a list of vestigingen naam and slug
   */
  async getNames() {
    const data = await this.getData();

    // We are using map() to transform the array we get into another one
    return data.map(vestiging => {
      return { naam: vestiging.naam, slug: vestiging.slug };
    });
  }

  /**
   * Get all afbeeldingen
   */
  async getAllAfbeeldingen() {
    const data = await this.getData();

    // Array.reduce() is used to traverse all vestigingen and
    // create an array that contains all afbeeldingen
    const afbeeldingen = data.reduce((acc, elm) => {
      if (elm.afbeeldingen) {
        // eslint-disable-next-line no-param-reassign
        acc = [...acc, ...elm.afbeeldingen];
      }
      return acc;
    }, []);
    return afbeeldingen;
  }

  /**
   * Get all afbeeldingen of a given vestiging
   * @param {*} slug The vestigingen slug
   */
  async getAfbeeldingenForVestiging(slug) {
    const data = await this.getData();
    const vestiging = data.find(elm => {
      return elm.slug === slug;
    });
    if (!vestiging || !vestiging.afbeeldingen) return null;
    return vestiging.afbeeldingen;
  }

  /**
   * Get vestiging information provided a slug
   * @param {*} slug
   */
  async getVestiging(slug) {
    const data = await this.getData();
    const vestiging = data.find(elm => {
      return elm.slug === slug;
    });
    if (!vestiging) return null;
    return {
      naam: vestiging.naam,
      adres: vestiging.adres,
      postcode: vestiging.postcode,
      plaatsnaam: vestiging.plaatsnaam,
      openingstijden: vestiging.openingstijden,
      slug: vestiging.slug,
      mapslocatie: vestiging.mapslocatie,
      afbeeldingen: vestiging.afbeeldingen,
    };
  }

  /**
   * Returns a list of vestigingen with only the basic information
   */
  async getListShort() {
    const data = await this.getData();
    return data.map(vestiging => {
      return {
        naam: vestiging.naam,
        adres: vestiging.adres,
        postcode: vestiging.postcode,
        plaatsnaam: vestiging.plaatsnaam,
        openingstijden: vestiging.openingstijden,
        slug: vestiging.slug,
        mapslocatie: vestiging.mapslocatie,
        afbeeldingen: vestiging.afbeeldingen,
      };
    });
  }

  /**
   * Get a list of vestigingen
   */
  async getList() {
    const data = await this.getData();
    return data.map(vestiging => {
      return {
        naam: vestiging.naam,
        slug: vestiging.slug,
      };
    });
  }

  /**
   * Fetches vestigingen data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    return JSON.parse(data).vestigingen;
  }
}

module.exports = VestigingService;
