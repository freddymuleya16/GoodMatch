import { isMatch } from "./findMatch";
import { validate } from "./helpers";

const csvForm = document.getElementById("csv-form") as HTMLFormElement;
const csvFile = document.getElementById("csv-file") as HTMLInputElement;
const displayArea = document.getElementById("display-area") as HTMLDivElement;
const fileError = document.getElementById(
  "file-error-message"
) as HTMLSpanElement;
const inputForm = document.getElementById("input-form") as HTMLFormElement;
const name1Input = document.getElementById("name-1") as HTMLInputElement;
const name2Input = document.getElementById("name-2") as HTMLInputElement;
const matchBtn = document.getElementById("match-btn") as HTMLInputElement;
const errorMessage1 = document.getElementById(
  "name-1-error"
) as HTMLSpanElement;
const errorMessage2 = document.getElementById(
  "name-2-error"
) as HTMLSpanElement;
const resultCard = document.getElementById("match-result") as HTMLDivElement;

matchBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();
  var matchResult = isMatch(name1Input.value, name2Input.value);
  if (matchResult >= 80) {
    resultCard.innerHTML = (
      `${name1Input.value} matches ${name2Input.value}` +
        " " +
        matchResult +
        "%, good match"
    );
  } else {
    resultCard.innerHTML=(
      `${name1Input.value} matches ${name2Input.value}` +
        " " +
        matchResult +
        "%"
    );
  }
});
inputForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();
});
name1Input.addEventListener("keyup", (e: Event) => {
  errorMessage1.textContent = "";
  console.log(name1Input.value);
  if (validate(name1Input.value)) {
    errorMessage1.textContent = "Name 1 is not alphabetic characters";
    matchBtn.disabled = true;
  } else if (!validate(name2Input.value)) {
    matchBtn.disabled = false;
  }
});
name2Input.addEventListener("keyup", (e: Event) => {
  errorMessage2.textContent = "";
  console.log(name2Input.value);
  if (validate(name2Input.value)) {
    errorMessage2.textContent = "Name 2 is not alphabetic characters";
    matchBtn.disabled = true;
  } else if (!validate(name1Input.value)) {
    matchBtn.disabled = false;
  }
});
let final_vals: string[][] = [];
let logs: string = "";
csvForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  logs += "Execution starts\n";
  var startTime = performance.now();

  let csvReader = new FileReader();
  if (csvFile.files == null || csvFile.files?.length == 0) {
    fileError.textContent = "Select file";
    return;
  }
  const input = csvFile.files[0];

  csvReader.onload = function (evt) {
    const text = evt.target?.result;

    if (typeof text === "string" || text instanceof String) {
      const values = text.split(/[\n]+/);
      values.forEach((val) => {
        const v = val.replace("\r", "").split(",");
        final_vals.push(v);
      });
      const males: string[] = [];
      const females: string[] = [];
      final_vals.forEach((val) => {
        if (val[1].toLowerCase() == "f") {
          if (!females.includes(val[0])) {
            females.push(val[0]);
          }
        }
        if (val[1].toLowerCase() == "m") {
          if (!males.includes(val[0])) {
            males.push(val[0]);
          }
        }
      });
      const result: any[][] = [];
      for (let i = 0; i < males.length; i++) {
        const male = males[i];
        if (validate(male)) {
          logs += "Error: " + male + " is not alphabetic characters\n";
          continue;
        }
        for (let j = 0; j < females.length; j++) {
          const female = females[j];
          if (validate(female)) {
            logs += "Error: " + female + " is not alphabetic characters\n";
            continue;
          }
          result.push([male, female, isMatch(male, female)]);
        }
      }
      result.sort((a, b) => b[2] - a[2]);
      var textmessage = "";
      result.forEach((value) => {
        var statement = "";
        if (parseInt(value[2]) >= 80) {
          statement =
            `${value[0]} matches ${value[1]}` +
            " " +
            value[2] +
            "%, good match";
        } else {
          statement = `${value[0]} matches ${value[1]}` + " " + value[2] + "%";
        }
        textmessage += statement + "\n";
      });

      saveData(textmessage, "output.txt");
    }
    var endTime = performance.now();
    logs += "Execution Ends\n";
    logs += `Total Execution Time ${endTime - startTime} milliseconds\n`;
    saveData(logs, "logs.txt");
  };
  csvReader.readAsText(input);
});

var saveData = (function () {
  var a = document.createElement("a");
  return function (data: string, fileName: string) {
    var text = data,
      blob = new Blob([text], { type: "octet/stream" }),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
})();
