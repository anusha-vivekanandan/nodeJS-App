
class Destination {

  constructor(dest_code, dest_name, catalog_category, description, verdict, imageURL) {
      this.dest_code = dest_code;
      this.dest_name = dest_name;
      this.catalog_category = catalog_category;
      this.description = description;
      this.verdict = verdict;
      this.imageURL = imageURL;
  }

  get DestinationCode() {
      return this.dest_code;
  }

  set DestinationCode(value) {
      this.dest_code = value;
  }

  get DestinationName() {
      return this.dest_name;
  }

  set DestinationName(value) {
      this.dest_name = value;
  }

  get Category() {
      return this.catalog_category;
  }

  set Category(value) {
      this.catalog_category = value;
  }

  get Description() {
      return this.description;
  }

  set Description(value) {
      this.description = value;
  }

  get Verdict() {
      return this.verdict;
  }

  set Verdict(value) {
      this.verdict = value;
  }

  get ImageURL() {
      return this.imageURL;
  }

  set ImageURL(value) {
      this.imageURL = value;
  }

}

module.exports = Destination;
