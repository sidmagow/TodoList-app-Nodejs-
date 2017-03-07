/**
 * Created by rahulmagow on 11/02/17.
 */
const express = require ('express');
const app  = express();
const db = require('./db');
const parser=require('body-parser')

app.use(parser.urlencoded({extended:true}))

//todos = [{task: "one task"}, {task: "two task"}];

app.use('/', express.static(__dirname + "/public_html"));

app.get('/todos/get', (req, res) => {
    db.getAllTodos(function (rows) {
        res.send(rows)
    });
});

app.post('/todos/done', (req,res) => {
    console.log(req.body);
    db.setTaskDone(req.body.val,req.body.id,function () {

        res.send("success");
    })
})
app.post('/todos/clear', (req,res) => {
    console.log("recieved");
    db.clearTask(req.body.id,function () {

        res.send("success");
    })
})


app.post('/todos/add', (req,res) => {


    db.addTask(req.body.task,function () {

        res.send("success");
    })

})

app.post('/todos/clearall', (req,res) => {
    db.clearallTask(function () {

        res.send("success");
    })
})

app.listen(3333, function () {
    console.log('app started on http://localhost:3333/');
});