//Use file as input
import fs from "fs";
import readline from "readline";

function getFileName(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("Introduce el nombre del archivo: ", (fileName) => {
      rl.close();
      resolve(fileName);
    });
  });
}

//Read JSON input File
async function readJsonFile() {
  let jsdata: any;
  try {
    const fileName = await getFileName();
    const rawdata = fs.readFileSync(fileName, "utf-8");
    jsdata = JSON.parse(rawdata.toString());
  } catch (error: any) {
    console.error(error.message);
  }
  console.groupCollapsed(jsdata);
  return jsdata;
}

//Make the work
(async () => {
  try {
      const data = await readJsonFile(); //ToDo Get argv later
      console.log("2: ", data);
  } catch (e:any) {
      // Deal with the fact the chain failed
      console.error(e.message);
  }
})();

