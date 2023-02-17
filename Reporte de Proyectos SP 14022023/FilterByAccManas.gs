function askForAccountManager() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt('Proporciona las iniciales del Account Manager a filtrar:', ui.ButtonSet.OK_CANCEL);

  if (response.getSelectedButton() == ui.Button.OK){
    const accountManager = response.getResponseText();
    filterByAM(accountManager);
  }
}

function filterByAM(_accountManager) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const allSheets = ss.getSheets();
  // const sheet1 = allSheets[2]; // Jaime Torres
  // const sheet2 = allSheets[3]; // Alex Hernandez
  // const sheet3 = allSheets[4]; // Olguer Diaz
  // const sheet4 = allSheets[5]; // Sonia Mascorro
  // const sheet5 = allSheets[6]; // Antonio Ordoñez
  // const sheet6 = allSheets[7]; // Luis Cruz
  // const sheet7 = allSheets[8]; // Juan Carlos Rergis
  // const sheet8 = allSheets[9]; // Fernando García
  const sheet9 = allSheets[10]; // Concentrado por AM
  
  // Step 1: Clear all data in sheet 3
  const headers = sheet9.getRange(1, 1, 2, sheet9.getLastColumn()).getValues();
  sheet9.clearContents();
  sheet9.getRange(1, 1, 2, headers[0].length).setValues(headers);

  // Step 2: Copy rows from sheet1 and sheet2 to sheet3

  const data = [];
  
  for (let i = 2; i <= 9; i++){
    var rows_i = allSheets[i].getDataRange().getValues()
    for (let j = 1; j < rows_i.length; j++) {
      if (rows_i[j][1] === _accountManager || rows_i[j][2] === _accountManager) {
        data.push([...rows_i[j], allSheets[i].getName()]);
      }
    }
  }

  // Step 3: Paste rows in sheet3 and write the source sheet name in column 16
  if (data.length > 0) {
    sheet9.getRange(3, 1, data.length, data[0].length).setValues(data);
  }
}