$(document).ready(function (){ 
    
global();
function global(){
    var empezar = $("<button id='start' class ='start'>");
    empezar.text("CLICK TO START");
    $("#contenedor").html(empezar);

     // Initialize Firebase
        var config = {
        apiKey: "AIzaSyACAcdul3JJP6YS6iAWyGp-3k15VLK_c-U",
        authDomain: "rps-multiplayer-fb681.firebaseapp.com",
        databaseURL: "https://rps-multiplayer-fb681.firebaseio.com",
        projectId: "rps-multiplayer-fb681",
        storageBucket: "rps-multiplayer-fb681.appspot.com",
        messagingSenderId: "238576154627"
        };
     
    firebase.initializeApp(config);
    // Create a variable to reference the database.
    var database = firebase.database();

    // connectionsRef references a specific location in our database.
    // All of our connections will be stored in this directory.
    var connectionsRef = database.ref("/connections");
    // '.info/connected' is a special location provided by Firebase that is updated every time
    // the client's connection state changes.
    // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
    var connectedRef = database.ref(".info/connected");
    
    // When the client's connection state changes...
    connectedRef.on("value", function(snap) {
        // If they are connected..
        if (snap.val()) {
            // Add user to the connections list.
            var con = connectionsRef.push(true);
            // Remove user from the connection list when they disconnect.
            con.onDisconnect().remove();
        }
    });

    // When first loaded or when the connections list changes...
    connectionsRef.on("value", function(snap) {
        // Display the viewer count in the html.
        // The number of online users is the number of children in the connections list.
        $("#contenedor").append("hay conectados" + snap.numChildren());
    });





    


    $("#start").on("click",function(){
        empezar.remove();
        var textoinicio = $("<p class=parrafo>").text("WRITTE YOUR NICKNAME");
        $(textoinicio).appendTo("#contenedor");

        var ingresarnick = $("<input id=idnick type=text>");
        var botonsubmitnick =$("<input id=addnick type=submit>");
        $("#contenedor").append(ingresarnick, botonsubmitnick);
    }); //fin boton start on click



    
    var nick="";
    
    //al dar click en agregar nick
    $("body").on("click","#addnick", function(){
        event.preventDefault();
        
        // Get inputs
        nick = $("#idnick").val()
        
        // Change what is saved in firebase
        database.ref().push({
            nick: nick,
             
            });
            
    }); // fin click addnick

    //limito a solo mostrar los primeros dos resultados en front, pero
    //ahora debo hacer que al agregar más de dos no permita en la base de datos
    var cone = database.ref().limitToFirst(2);
    var todo = database.ref();
    //database.ref()
    cone.on("child_added", function(snapshot) { 
        
        var espacioparanik= $("<p id=nombreprimerusuario>").text(snapshot.val().nick);
        $("#contenedor").append(espacioparanik);
        console.log(espacioparanik);
        
        console.log("esto es todo" + todo);
        console.log("esto es this" + this.event);


        // If any errors are experienced, log them to console.
        }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    }); //fin child_added

   








} //cierre funcion global













});