const express = require('express');
const app = express();


const workingHoursMiddleware = (req, res, next) => {
  const currentDay = new Date().getDay();
  const currentHour = new Date().getHours();

  if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
    next(); 
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
  }
};

app.use(express.static('public'));

app.use(workingHoursMiddleware);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html');
});

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});
