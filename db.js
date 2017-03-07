/**
 * Created by rahulmagow on 11/02/17.
 */
const mysql = require('mysql');

const dbconf = {
    host: "localhost",
    user: "siddhant1",
    password: "123456",
    database: "elixirdb2"
};

function getAllTodos(done) {
    let conn = mysql.createConnection(dbconf);
    conn.connect();

    conn.query("SELECT * FROM todos", function (err, rows, fields) {
        if (err) throw err;

        done(rows);//avaialable due to closure // a callback fn
        conn.end();
    });
}

function setTaskDone(val,id,done){
    let conn = mysql.createConnection(dbconf);
    conn.connect();

    conn.query("UPDATE todos SET done="+val+" WHERE id =" + id, function (err, rows, fields) {
        if (err) throw err;

        done(rows);//avaialable due to closure // a callback fn
        conn.end();
    });

}
function clearTask(id,done) {
    let conn = mysql.createConnection(dbconf);
    conn.connect();

    conn.query("Delete from todos WHERE id =" + id, function (err, rows, fields) {
        if (err) throw err;

        done(rows);//avaialable due to closure // a callback fn
        conn.end();
    });
}

function addTask(task,done) {
    let conn = mysql.createConnection(dbconf);
    conn.connect();
     console.log("entered db")
    console.log(task);
    conn.query( "insert into todos (task,done) values ('"+ task+"',0)", function (err, rows, fields) {
        if (err) {
            console.log("oh yeahh")
        }

        done(rows);//avaialable due to closure // a callback fn
        conn.end();
    });
}

function clearallTask(done) {
    let conn = mysql.createConnection(dbconf);
    conn.connect();

    conn.query("Delete from todos WHERE done=1", function (err, rows, fields) {
        if (err) throw err;

        done(rows);//avaialable due to closure // a callback fn
        conn.end();
    });
}

module.exports = {
    getAllTodos,
    setTaskDone,
    clearTask,
    addTask,
    clearallTask
};