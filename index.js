const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

const conn = require('./db/db');
const Task = require('./models/Task');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

const tasksRoutes = require('./routes/taskRoutas');


app.use(
    express.urlencoded({
        extended:true
    })
);
app.use(express.json());
app.use(express.static('public'));

app.use('/tasks', tasksRoutes);

conn
    .sync()
    .then(
        app.listen(3000)
    )
    .catch((error) => console.log(error))