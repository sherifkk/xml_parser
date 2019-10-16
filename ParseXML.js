const fs = require('fs');
const parseString = require('xml2js').parseString;

module.exports = class ParseXML {
  async getData(file) {
    try {
      let data;
      parseString(fs.readFileSync(file, "utf8"), function(error, result) {
        if (error) throw error
        data = result.Response.persons[0].person
      });
      return data;
    } catch (error) {
      throw error;
    } 
  }

  async refactorData(persons) {
    try {
      let data = [];
      var person;

      for (person of persons){
        data.push([person.id[0], person.name[0], person.email[0], person.timestamp[0]])
      } 
      console.log("XML parse completed!");
      return data;
    } catch (error) {
      console.log(error);
    } 
  }
}