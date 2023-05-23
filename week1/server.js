// Setup
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

var data = require('./MOCK_DATA.json');



app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.get('/api/items', (req, res) => {
    res.json({message: "Fetch all items"});
})

app.get('/api/itemsId', (req, res) => {
    res.json({ message: `get user with identifier: ${req.params.id}` });
})

app.post('/api/items', (req, res) => {
    res.status(201).json({ message: `added a new item: ${req.body.firstName} ${req.body.lastName}` })
})

app.put('/api/items/:id', (req, res) => {
    res.json({
        message: `updated item with identifier: ${req.params.id} to ${req.body.firstName} ${req.body.lastName}`,
    });
});

app.delete('/api/items/:id', (req, res) => {
    res.status(200).json({ message: `deleted user with identifier: ${req.params.id}` });
});

app.use((req, res) => {
    res.status(404).send('Resource not found');
});


app.listen(HTTP_PORT, () => {
    console.log('Ready to handle requests on port ' + HTTP_PORT);
});

