//Use file as input
import fs from 'fs';
//import Error from 'ts-node'

//Read JSON input File
function readJsonFile(filename:string): any {
    try {
        const rawdata=fs.readFileSync(filename);
        return JSON.parse(rawdata.toString());
    } catch (error:any) {
        console.error(error.message);
    }
      
} 

const data = readJsonFile('data.json'); //ToDo Get argv later

//Test output
console.log(data)


