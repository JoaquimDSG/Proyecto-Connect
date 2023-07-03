const express = require('express')
const app = express()
const port = 3000

var mysql = require('mysql');
var conexion= mysql.createConnection({
    host : 'localhost',
    database : 'connect',
    user : 'root',
    password : '',
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
});


app.use(express.json())

const register = (req, res) =>
{
    const username = req.body.username
    const password = req.body.password
    
    let sql = 'INSERT INTO usuarios (Users, Password) VALUES ("' + username +'", "'+ password +'")'
    conexion.query( sql, function (error, results, fields) {
        if (error)
            throw error;
    
    });
    
    res.sendStatus (200)

}

const login = (req, res) =>
{
    const username = req.body.username
    const password = req.body.password
    
    let sql = 'SELECT EXISTS(SELECT * FROM usuarios WHERE Users = "'+ username +'" AND Password = "'+ password+'");'
    conexion.query( sql, function (error, results, fields) {
        
        
        if (error)
            throw error;
        
        
        
        var resultArray = Object.values(JSON.parse(JSON.stringify(results[0]))) 
        console.log (resultArray[0])

        if (resultArray[0] == 1)
            res.send('Podes pasar papi')
        
        else
            res.send('NO CHORIZO NO')
        
    });

}


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', register)
app.post('/login', login)

app.listen(port, () => {
  console.log("Example app listening on port ${port}")
})