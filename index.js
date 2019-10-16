const ParseXML = require("./ParseXML");
const parseXML = new ParseXML();

const DBFunctions = require("./DBFunctions");
const dbFunctions = new DBFunctions();

const file = "data.xml";

const app = async () => {
  try{
    let data = await parseXML.getData(file);
    data = await parseXML.refactorData(data);
    data = await dbFunctions.saveEntity(data);
    data = await dbFunctions.readEntity();
  } catch(error){
    console.log(error);
  }
}

app();
