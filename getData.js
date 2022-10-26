import * as cvs from "./canvas.js"

const dataBtn = document.querySelector("#controlBtn");
const dataTbl = document.querySelector("#collectData")
let collectData = false;
let time = 0;
const interval = 10;

function handleClick () {
  //change Btn image
  if (dataBtn.className == "startBtn") {
    dataBtn.className = "offBtn";
    dataBtn.innerText = "데이터 수집 중지"
    collectData = true;
  } else {
    dataBtn.className = "startBtn";
    dataBtn.innerText = "데이터 수집 시작"
    time = 0;
    exportData();
    collectData = false;
  }
}

function Data () {
  if (collectData) {
    time += interval;
    const newTblRow = document.createElement("tr");
    const dataArr = [time, cvs.xPos, cvs.yPos, cvs.pressure, cvs.tiltX, cvs.tiltY];
    for (let i in dataArr) {
      const newTd = document.createElement("td");
      newTd.innerText = dataArr[i];
      newTblRow.appendChild(newTd);
    }
    dataTbl.appendChild(newTblRow);
  }
}

function exportData(){
    /* Get the HTML data using Element by Id */
    var table = document.getElementById("collectData");
 
    /* Declaring array variable */
    var rows =[];
 
      //iterate through rows of table
    for(var i=0,row; row = table.rows[i];i++){
        //rows would be accessed using the "row" variable assigned in the for loop
        //Get each cell value/column from the row
        const column1 = row.cells[0].innerText;
        const column2 = row.cells[1].innerText;
        const column3 = row.cells[2].innerText;
        const column4 = row.cells[3].innerText;
        const column5 = row.cells[4].innerText;
        const column6 = row.cells[5].innerText;
 
    /* add a new records in the array */
        rows.push(
            [
                column1,
                column2,
                column3,
                column4,
                column5,
                column6
            ]
        );
 
        }
        let csvContent = "data:text/csv;charset=utf-8,";
         /* add the column delimiter as comma(,) and each row splitted by new line character (\n) */
        rows.forEach(function(rowArray){
            row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
 
        /* create a hidden <a> DOM node and set its download attribute */
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
         /* download the data file named "Stock_Price_Report.csv" */
        link.click();
}

dataBtn.addEventListener("click", handleClick);
setInterval(Data, interval);

