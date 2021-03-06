
const express = require("express");

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;

// set the use cases
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// make styles public 
app.use(express.static("public"));

/*const mongoDB =  'mongodb+srv://testConnection:b8RwqJYgo4hD1xhe@nodetodoexample-iqnde.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));

const todo = require('./models/todo.model');
*/
// Couple of items 
var tasks = ["be on time", "don't cheat"];

var completed = [];


app.get('/', (req, res) => {
    res.render("index", { tasks: tasks, completed: completed });
    
});

app.post('/addtask', (req, res) => {
    let newTask = req.body.newtask;

    tasks.push(newTask)
    console.log(tasks);
    res.redirect("/");
});

app.post('/removetask', (req, res) => {
    let removedTask = req.body.check;

    // since the type of removedTask can be either a string or object we use conditionals to handle each type of delete from tasks
    if(typeof(removedTask) === 'string') {
        let index = tasks.indexOf(removedTask);
        completed.push(tasks[index]);
        tasks.splice(index, 1);
    }else if(typeof(removedTask) === 'object') {
        removedTask.forEach(task => {
            completed.push(task);
            tasks.splice(tasks.indexOf(task), 1);
        });
    }
    console.log(tasks)
    res.redirect("/")
})

app.listen(port, () => {
    console.log(`Running server on port: ${port}`);
})
