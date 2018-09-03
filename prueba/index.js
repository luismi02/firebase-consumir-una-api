// Initialize Firebase
  const express = require('express');
  const app= express();
  const request = require('request');
  const async = require('async');
  const firebase = require('firebase');
  const path = require('path');


var config = {
    apiKey: "AIzaSyAt8eaIIEeouzUXD6saYaLCrR1iYV20UlE",
    authDomain: "prueba-de-programacion-5eaad.firebaseapp.com",
    databaseURL: "https://prueba-de-programacion-5eaad.firebaseio.com",
    projectId: "prueba-de-programacion-5eaad",
    storageBucket: "prueba-de-programacion-5eaad.appspot.com",
    messagingSenderId: "110456555196"
  };
  firebase.initializeApp(config);


  var databaseService = firebase.database();
  

  app.get('/pagina', (req, res) => {
    async.times(5, (i, callback) => {
    var options = {
        url: 'https://www.datos.gov.co/resource/r9m9-2cvm.json',    
    } 
    request(options, (error, response, body) => {

        var result = JSON.parse(body);
         callback(null, result);
        
       for (dato in result){
       	var referencia = databaseService.ref(dato);
        referencia.set({
            dato:({
           Correo: result[dato].correos_electronicos,
            Direccion : result[dato].direcci_n,
            Director : result[dato].director_a,
            Municipio : result[dato].municipio,
            Telefono : result[dato].telefono_fijo,
            Tipo : result[dato].tipo
           
          })
        })

      }
        
    });
    }, (err, results) => {
        res.json(results);
    });
});

app.listen('8010', () => {
    console.log('Listening en el puerto 8010');
})




//https://www.datos.gov.co/resource/sdd4-gr9d.json?$$app_token=bYNTqgZcwpOzGmkdqKynrKBkf&$where=cuadrante%3C5&$limit=5

//https://www.datos.gov.co/resource/sdd4-gr9d.json?$$app_token=bYNTqgZcwpOzGmkdqKynrKBkf&$select=sum(cuadrante)