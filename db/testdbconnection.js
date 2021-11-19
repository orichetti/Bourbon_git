const db = '/Bourbon.db';
const sqlite3 = require('sqlite3').verbose();

function getAll(){
    const db = new sqlite3.Database('./Bourbon.db', sqlite3.OPEN_READWRITE); //, (err) => {
        //if(err) return console.error(err.message)
    //let db = index.connect();
    console.log(`Connection Succsessful from ... ${db}`);
    db.all("SELECT oid, * FROM bourbon", function (err, rows){
        console.log("rows = " + typeof rows)
        return rows
    }) 
    db.close();   
}

module.exports = {
    getAll,
}