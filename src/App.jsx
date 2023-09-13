import React, { useState } from 'react';
import getRandomMessage from './features/RandomMessage';

function App() {
  const [tableData, setTableData] = useState([]);
  const [numTables, setNumTables] = useState(1);

// Function to generate the 5x5 table data
  const generateTableData = () => {
    const rows = 5;
    const cols = 5;
    const data = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(getRandomMessage());
      }
      data.push(row);
    }

    return data;
  };
  
// Function to open the table in a new tab
  const openTablesInNewTab = (tablesData) => {
    const tableHtml = `<html><head><title>Tables</title></head><body>${tablesData.map(tableData => `<table border="1">${tableData.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</table>`).join('')}</body></html>`;
    const newTab = window.open();
    newTab.document.open();
    newTab.document.write(tableHtml);
    newTab.document.close();
};
const generateTables = () => {
  const num = parseInt(numTables, 10); // Parse the input value as an integer
  const tables = [];

  for (let i = 0; i < num; i++) {
    const tableData = generateTableData();
    tables.push(tableData);
  }

  openTablesInNewTab(tables);
  setTableData(tables);
};

const handleNumTablesChange = (event) => {
  setNumTables(event.target.value);
};

return (
  <div className="App">
    <label htmlFor='tables'>Number of tables:</label>
    <input
      type='number'
      id='tables'
      value={numTables}
      onChange={handleNumTablesChange}
    />
    <button onClick={generateTables}>Generate Tables</button>
  </div>
);
}

export default App;
