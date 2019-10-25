const fs = require("fs");
import marked from "marked";
// export let readJSONFile = (filename: string, callback: any) => {
//   fs.readFile(filename, (err: any, data: any) => {
//     if (err) {
//       callback(err);
//       return;
//     }
//     try {
//       console.log(JSON.parse(data));
//       callback(undefined, JSON.parse(data));
//     } catch (exception) {
//       callback(exception);
//     }
//   });
// };

export let readJSONFile = (filename: string, encoding: string) => {
  if (typeof (encoding) == "undefined") {
    encoding = "utf8";
  }
  const file = fs.readFileSync(filename, encoding);
  return JSON.parse(file);
};

export let readFile = (filename: string, encoding: string) => {
  if (typeof (encoding) == "undefined") {
    encoding = "utf8";
  }
  const file = fs.readFileSync(filename, encoding);
  return marked(file.toString());
};

