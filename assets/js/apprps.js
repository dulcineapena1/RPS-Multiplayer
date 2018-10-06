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
    var aumentarconecciones=0;
    // When first loaded or when the connections list changes...
    connectionsRef.on("value", function(snap) {
        // Display the viewer count in the html.
        // The number of online users is the number of children in the connections list.
         aumentarconecciones++;
        $("#conectados").text("hay conectados" + (snap.numChildren()-1));
    });


    


    


    $("#start").on("click",function(){
        empezar.remove();
        var textoinicio = $("<p id =textoinicio class=parrafo>").text("WRITTE YOUR NICKNAME");
        $(textoinicio).appendTo("#contenedor");
        //estos son los divs en los que voy a organizar la informaciòn de cada oponente
        var info1= $("<div id=1contrincante>");
        var info2= $("<div id=2contrincante>");
        $("#contenedor").append(info1, info2);

        var ingresarnick1 = $("<input id=idnick1 type=text>");
        var botonsubmitnick1 =$("<input id=addnick type=submit>");
        var ingresarnick2 = $("<input id=idnick2 type=text>");
        var botonsubmitnick2 =$("<input id=addnick2 type=submit>");
        //ordeno la información en front
        $("#1contrincante").append(ingresarnick1, botonsubmitnick1);
        $("#2contrincante").append(ingresarnick2,botonsubmitnick2);
    }); //fin boton start on click



    
    var nick="";
    var agregado = 0;
    
//--------PRIMER JUGADOR
    $("body").on("click","#addnick", function(){
        agregado++;
        console.log("este es el agregado  "+ agregado);
        event.preventDefault();             
        console.log("aumentarconecc"+aumentarconecciones);
        
        // Get inputs
        nick1 = $("#idnick1").val();
       
        var leido1 = database.ref("/primero");
        leido1.child('tiro primer nick').push({
            nick: nick1
        });

        //primero borro los input para que ya no se puedan meter más jugadores
        $("#idnick1").remove();
        $("#addnick").remove();
        $("#idnick2").remove();
        $("#addnick2").remove();
        $("#textoinicio").remove();
    
        //botones para el primer oponente
        var botonrock1 = $("<button id=rock1>").text("ROCK");
        var botonpapel1 = $("<button id=papel1>").text("PAPER");
        var botontijera1 = $("<button id=tijera1>").text("SCISSORS");
        var titulo1jugador=$("<p id=titulo1jugador>").text("TIRO PRIMER JUGADOR" + "  "+ nick1);
        $("#1contrincante").append(botonrock1,botonpapel1,botontijera1,titulo1jugador);
                       
    }); // fin click addnick


    //control de juego JUGADOR 1
    $("body").on("click", "#1contrincante button", function(event){
        console.log("ya entrè ajugador1");
        var clickjugador1=$(this).attr("id");
        
        console.log("boton 1J" + clickjugador1);

        // Get inputs
        input1 = clickjugador1;
       
        var leidoA = database.ref("/primero");
        leidoA.child("tiro primer nick").push({
            input1: input1
        });
        



    });// fin control de JUGADOR 1


    //recuperar los datos de la base firebase JUGADOR 1
    var cone = database.ref("primero/tiro primer nick");
        cone.on("child_added", function(snapshot){         
            var espacioparatiro1= $("<p id=tirojugador1>").text(snapshot.val().input1);
            $("#1contrincante").append(espacioparatiro1);   
            var dejsonapalabra = JSON.stringify(snapshot.val().input1);
            console.log("este es el snapvaltiro 1"+dejsonapalabra);  
        })





//-------SEGUNDO JUGADOR
     $("body").on("click","#addnick2", function(){
        agregado++;
        console.log("este es el agregado  "+ agregado);
        event.preventDefault();            
        console.log("aumentarconecc"+aumentarconecciones);
       
        // Get inputs
        nick2 = $("#idnick2").val()
        var leido2 = database.ref("/segundo");
        leido2.child('tiro segundo nick').push({
            nick: nick2
        });

        //primero borro los input para que ya no se puedan meter más jugadores
        $("#idnick1").remove();
        $("#addnick").remove();
        $("#idnick2").remove();
        $("#addnick2").remove();
        $("#textoinicio").remove();

        //botones para el segundo oponente
        var botonrock2 = $("<button id=rock2>").text("ROCK");
        var botonpapel2 = $("<button id=papel2>").text("PAPER");
        var botontijera2 = $("<button id=tijera2>").text("SCISSORS");
       
        $("#2contrincante").append(botonrock2,botonpapel2,botontijera2,);
            
    }); // fin click addnick2


    //limito a solo mostrar los primeros dos resultados en front, pero
    //ahora debo hacer que al agregar más de dos no permita en la base de datos
    var cone = database.ref().limitToFirst(2);
   
    
    

              
     

       



  

    






} //cierre funcion global













}); // cierre document ready