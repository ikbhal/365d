const fs = require('fs');

// Generate an array of 365 days with reverse counting dayId
const daysData = Array.from({ length: 365 }, (_, index) => ({
  dayId: 365 - index,
  checked: false,
  notes: ''
}));

// Convert the data to JSON format
const jsonData = JSON.stringify(daysData, null, 2);

// Write the JSON data to the file
fs.writeFile('../data/365d.json', jsonData, (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('365d.json file generated successfully.');
  }
});
