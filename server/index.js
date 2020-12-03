const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3000;

let favoris = [];

app.get('/', (request, response) => {
    response.send("<h1>Welcome</h1><a href='/favoris'>Check out favs</a>");
})

app.get("/favoris", (request, response) => {
    if (favoris.includes(request.body.photoId)) {
        favoris = favoris.filter(item => item !== request.body.photoId)
    } else {
        favoris.push(request.body.photoId)
    }
    response.send(favoris);
});

app.post("/favoris/add", (request, response) => {
    console.log(request.body);
    if (!favoris.includes(request.body.photoId)) {
        favoris.push(request.body.photoId);
    }
    response.send(favoris);
});

app.post("/favoris/del", (request, response) => {
    console.log(request.body);
    if (favoris.includes(request.body.photoId)) {
        favoris = favoris.filter(item => item !== request.body.photoId);
    }
    response.send(favoris);
});

app.listen(port, err => {
    console.log(`server is listening on ${port}`);
});

