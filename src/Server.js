const express=require('express');
let bodyParser = require('body-parser')
let app=express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) 
// parse application/json
app.use(bodyParser.json())

let arrayUsuarios=[];
//Get
app.get('/',(request,response)=>{
    response.status(200).send('Bienvenido');
});

app.get('/GetUsuarios',(request,response)=>{
    response.status(200).json(arrayUsuarios);
});

//post

app.post('/addUser',(req,res)=>{

    let usuarioNuevo=req.body;                             
    let resultado=arrayUsuarios.find(x=>x.dni===usuarioNuevo.dni);
    if(!resultado || resultado==undefined)
    {
        arrayUsuarios.push(usuarioNuevo);
        res.status(200).json({
            mensaje:'Insertado',
            data:arrayUsuarios
        });
    }else
    {
        res.status(400).json({
            mensaje:'Usuario ya existe en la base de datos',
            data:null
        });
    }
      
   
});

app.post('/delUser',(req,res)=>{
    let body=req.body;
    let resultado=arrayUsuarios.find(x=>x.dni===body.dni);
    if(resultado)
    {
        arrayUsuarios.pop(body);
        res.status(200).json({
            mensaje:'Usuario dado de baja',
            data:arrayUsuarios
        });
    }else
    {
        res.status(400).json({
            mensaje:'Dni no existe en base de datos',
            data:null
        });
    }

})


app.listen(3000,()=>{
    console.log('Servidor escuchando por el puerto 3000');
})