
class User {

    constructor(userid, firstName, lastname, emailaddr, addrline1, addrline2, city, state, zipcode, country) {
        this.userid = userid;
        this.firstName = firstName;
        this.lastname = lastname;
        this.emailaddr = emailaddr;
        this.addrline1 = addrline1;
        this.addrline2 = addrline2;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.country = country;
    }
  
    get UserID() {
        return this.userid;
    }
  
    set UserID(value) {
        this.userid = value;
    }
  
    get FirstName() {
        return this.firstName;
    }
  
    set FirstName(value) {
        this.firstName = value;
    }
  
    get LastName() {
        return this.lastname;
    }
  
    set LastName(value) {
        this.lastname = value;
    }
  
    get EmailAddr() {
        return this.emailaddr;
    }
  
    set EmailAddr(value) {
        this.emailaddr = value;
    }
  
    get AddrLine1() {
        return this.addrline1;
    }
  
    set AddrLine1(value) {
        this.addrline1 = value;
    }
  
    get AddrLine2() {
        return this.addrline2;
    }
  
    set AddrLine2(value) {
        this.addrline2 = value;
    }

    get City() {
        return this.city;
    }
  
    set City(value) {
        this.city = value;
    }

    get State() {
        return this.state;
    }
  
    set State(value) {
        this.state = value;
    }

    get Zipcode() {
        return this.zipcode;
    }
  
    set Zipcode(value) {
        this.zipcode = value;
    }

    get Country() {
        return this.country;
    }
  
    set Country(value) {
        this.country = value;
    }
  
  }
  
  module.exports = User;
  