const express = require("express");
const bodyParser = require("body-parser");

const API_PORT =  process.env.PORT || 4000;
const app = express();
const path = require("path");
const fetch = require("node-fetch");
app.use(express.static(path.join(__dirname, "client", "build")))
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const API_KEY = process.env.REACT_APP_LOCATION_IQ_API_KEY

app.get('/location', (request, respond) => {
  let url =`https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${request.query.lat}&lon=${request.query.lng}&format=json`
  fetch(url).
  then(res => {
    res.json().then(data => ({
      data: data,
      status: res.status
        })
    ).then(res => {
      respond.send(res.data.display_name)
    });
  })

})


// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});


// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));




