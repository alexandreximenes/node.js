const express = require('express');
let app = express();
const port = 3000;

app.use(express.static("."));

app.get("/", (req, resp) => {
    resp.sendFile(__dirname + 'index.html');
});

app.listen(port, () => {
    console.log(`Server listener on port ${port}`);
});