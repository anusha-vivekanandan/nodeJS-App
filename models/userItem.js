
class UserItem {

    constructor(itemCode, verdict, visited) {
        this.itemCode = itemCode;
        this.verdict = verdict;
        this.visited = visited;
    }
  
    get ItemCode() {
        return this.itemCode;
    }
  
    set ItemCodeItem(value) {
        this.itemCode = value;
    }
  
    get Verdict() {
        return this.verdict;
    }
  
    set Verdict(value) {
        this.verdict = value;
    }
  
    get Visited() {
        return this.visited;
    }
  
    set Visited(value) {
        this.visited = value;
    }
  
  }
  
  module.exports = UserItem;
  