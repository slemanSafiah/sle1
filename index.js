const errParser = require("error-stack-parser");
const mongoose = require("mongoose");
var PrettyError = require("pretty-error");
const axios = require("axios");
var pe = new PrettyError();
pe.appendStyle();

function method(ele) {
  return (
    ele.fileName.includes("C:") ||
    ele.fileName.includes("D:") ||
    ele.fileName.includes("E:") ||
    ele.fileName.includes("F:")
  );
}

function Sleman({ option, error }) {
  let err = errParser.parse(error);
  let errObject = err.filter(method);
  let col = errObject[0].columnNumber;
  let row = errObject[0].lineNumber;
  let filePath = errObject[0].fileName;

  const renderedError = pe.render(error);
  let arr = renderedError.split("\n");
  let e = arr[0];
  e = e.replace(/([\[\]\/\\])/g, "");
  let str = "";
  for (let i = 0; i < e.length; i++) {
    if (
      (e[i] >= "a" && e[i] <= "z") ||
      (e[i] >= "A" && e[i] <= "Z") ||
      (e[i] >= "0" && e[i] <= "9") ||
      e[i] === "." ||
      e[i] === " "
    )
      str += e[i];
  }
  let cut2 = str.indexOf("0m90m0m37m 0m97m");
  let title = str.substring(10, cut2);
  let desc = str.substring(cut2 + 16, str.length - 2);
  // link to asp endpoint
  const config = {
    method: "POST",
    url: "logger api",
    data: {
      column: parseInt(col),
      row: parseInt(row),
      fileName: "from file path",
      Path: filePath,
      title: title,
      description: desc,
    },
  };
  axios(config);
}

module.exports.sleman = Sleman;
