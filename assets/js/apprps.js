$(document).ready(function (){ 
    
global();
function global(){
    $("#chat").hide();
    $("#resultadosambos").hide();
    var empezar = $("<button id='start' class ='start'>");
    empezar.text("START");
    $("#contenedor").html(empezar);

    $("#mensajesenviados").hide();

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
       // $("#conectados").text("hay conectados" + (snap.numChildren()));
       if (aumentarconecciones ===1 ){
         $("#conectados").text("You are the FIRST PLAYER" + " "  + "click start and put your name in your space");
       }
       else {
        $("#conectados").text("You are the SECOND PLAYER" + " "  + "click start and put your name in your space");
      }
       
    });


   
    var clickstart=0;


    $("#start").on("click",function(){
       
        $("#mensajesenviados").empty();
        $("#mensajesenviados").show();
        clickstart ++;
        empezar.remove();
        // var textoinicio = $("<p id =textoinicio class=parrafo>").text("WRITTE YOUR NICKNAME");
        // $(textoinicio).appendTo("#contenedor");
        //estos son los divs en los que voy a organizar la informaciòn de cada oponente
        var info1= $("<div id=1contrincante>");
        var info2= $("<div id=2contrincante>");
        var resultadosambos=$("<div id=resultadosambos>");
        $("#contenedor").append(info1, info2,resultadosambos);

        var resultadospantalla= $("<div id=finaliv>");
        $("#resultadosambos").append(resultadospantalla);
        $("#resultadosambos").hide();

        var ingresarnick1 = $("<input id=idnick1 type=text placeholder=FIRST>");
        var botonsubmitnick1 =$("<input id=addnick type=submit>");
        var ingresarnick2 = $("<input id=idnick2 type=text placeholder=SECOND>");
        var botonsubmitnick2 =$("<input id=addnick2 type=submit >").html("send");
        
        //ordeno la información en front
        $("#1contrincante").append(ingresarnick1, botonsubmitnick1);
        $("#2contrincante").append(ingresarnick2,botonsubmitnick2);

        //boton para reiniciar juego
        var botonreiniciar = $("<button id=reinicio>").text("Play again!");
        $("#contenedor").append(botonreiniciar);
        $("#reinicio").hide();  

        var scoreA = $("<p id=scorea1>");
        var scoreB = $("<p id=scorea2>");

        var scorestotal=$("<div id=ree>")
        $("#contenedor").prepend(scorestotal);
        $("#ree").prepend(scoreA,scoreB); 
         

    }); //fin boton start on click



    
    
    var agregado = 0;
    
//--------PRIMER JUGADOR
    $("body").on("click","#addnick", function(){
        $("#chat").show();
        $("#resultadosambos").show();
        $("#conectados").hide();
        $("#reinicio").show();
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
        var titulo1jugador=$("<p id=titulo1jugador>").text("FIRST PLAYER" + "  "+ nick1);
        $("#1contrincante").append(botonrock1,botonpapel1,botontijera1,titulo1jugador);

        //parte del chat1
        var inputescribirmensaje1= $("<input type=text id=escribir1 class=espacioescribir>");
        var enviarmensaje1=$("<button id=escribir1>").text("Send an insult to your oponent");
        $("#chat").append(inputescribirmensaje1, enviarmensaje1);
        
        var mensaje1= $("<p id=mensajedel1>");
        $("#mensajesenviados").append(mensaje1);

         
                    
    }); // fin click addnick



//----PARTE CHAT1
//control de chat1 (obteniendo el valor de lo escrito)
let chatparte1={
    chatprimero: null,
    chatprimeroA: $("body").on("click", "#escribir1", function(event){
        
         // Get inputs
         chateado1 = $("#escribir1").val();
       
         var leidoD = database.ref("/chatprimero");
         leidoD.child("chat primer nick").push({
             chateado1: chateado1
         });
    })
}

    //CHAT 1 recuperar datos de la base de datos
    var cone3 = database.ref("chatprimero/chat primer nick");
        cone3.on("child_added", function(snapshot){    
            //enseguida le pongo de id el nombre del jugador, para así poder desplegarlo
            //más abajo en los resultados como id ganador     
            var espacioparachat1= $("<p id=primerchat class =textoschat>").text(snapshot.val().chateado1);
            $("#mensajesenviados").append(espacioparachat1);   
            var dejsonapalabrachat1 = JSON.stringify(snapshot.val().chateado1);

            //esto es para poder asignar a la variable de afuera el valor desde firebase,
            //de forma que aparezca en las dos ventanas. Si asignaras el valor del click,
            //solo aparecería en una ventana
            chatparte1.chatprimero = dejsonapalabrachat1;
            //correr la comparativa y así ver quien gana
        })
//-----FIN PARTE CHAT1



//control de juego JUGADOR 1    
let elresultadoprimero= {
    tiroprimero: null,
    miralo : $("body").on("click", "#1contrincante button", function(event){
        console.log("ya entrè ajugador1");
        var clickjugador1=$(this).text();

        elresultadoprimero.tiroprimero=$(this).text();

        console.log("boton 1J" + clickjugador1);

        // Get inputs
        input1 = clickjugador1;
       
        var leidoA = database.ref("/primero");
        leidoA.child("tiro primer nick").push({
            input1: input1
        });
        //aquí oculté los botones para evitar que puedan seguir agregando opciones
        $("#rock1").hide();
        $("#papel1").hide();
        $("#tijera1").hide();

    }),
}// fin control de JUGADOR 1





    //recuperar los datos de la base firebase JUGADOR 1
    var cone = database.ref("primero/tiro primer nick");
        cone.on("child_added", function(snapshot){    
            //enseguida le pongo de id el nombre del jugador, para así poder desplegarlo
            //más abajo en los resultados como id ganador     
            var espacioparatiro1= $("<p id=elprimero class =resultados1>").text(snapshot.val().input1);
            $("#resultadosambos").append(espacioparatiro1);   
            var dejsonapalabra = JSON.stringify(snapshot.val().input1);
            console.log("este es el snapvaltiro 1"+dejsonapalabra);  

            //esto es para poder asignar a la variable de afuera el valor desde firebase,
            //de forma que aparezca en las dos ventanas. Si asignaras el valor del click,
            //solo aparecería en una ventana
            elresultadoprimero.tiroprimero = dejsonapalabra;
            //correr la comparativa y así ver quien gana
            batalla();  
        })



       


//----------------------------------------------------------------------------------
//-------SEGUNDO JUGADOR
     $("body").on("click","#addnick2", function(){
        $("#chat").show();
        $("#resultadosambos").show();
        $("#conectados").hide();
        $("#reinicio").show();
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
        var titulo2jugador=$("<p id=titulo2jugador>").text("SECOND PLAYER" + "  "+ nick2);
       
        $("#2contrincante").append(botonrock2,botonpapel2,botontijera2,titulo2jugador);

        //parte del chat2
        var inputescribirmensaje2= $("<input type=text id=escribir2 class=espacioescribir>");
        var enviarmensaje2=$("<button id=escribir2>").text("Send an insult to your oponent");
        $("#chat").append(inputescribirmensaje2, enviarmensaje2);   
        var mensaje2= $("<p id=mensajedel2>");
        $("#mensajesenviados").append(mensaje2);
            
    }); // fin click addnick2




//----PARTE CHAT2
//control de chat2 (obteniendo el valor de lo escrito)
let chatparte2={
    chatsegundo: null,
    chatsegundoA: $("body").on("click", "#escribir2", function(event){
        
         // Get inputs
         chateado2 = $("#escribir2").val();
       
         var leidoE = database.ref("/chatsegundo");
         leidoE.child("chat segundo nick").push({
             chateado2: chateado2
         });
    })
}

    //CHAT 2 recuperar datos de la base de datos
    var cone4 = database.ref("chatsegundo/chat segundo nick");
        cone4.on("child_added", function(snapshot){    
            //enseguida le pongo de id el nombre del jugador, para así poder desplegarlo
            //más abajo en los resultados como id ganador     
            var espacioparachat2= $("<p id=segundochat class =textoschat>").text(snapshot.val().chateado2);
            $("#mensajesenviados").append(espacioparachat2);   
            var dejsonapalabrachat2 = JSON.stringify(snapshot.val().chateado2);

            //esto es para poder asignar a la variable de afuera el valor desde firebase,
            //de forma que aparezca en las dos ventanas. Si asignaras el valor del click,
            //solo aparecería en una ventana
            chatparte2.chatsegundo = dejsonapalabrachat2;
            //correr la comparativa y así ver quien gana
        })
//-----FIN PARTE CHAT2














    //control de juego JUGADOR 2    
    let elresultadosegundo= {
        tirosegundo: null,
        miralo : $("body").on("click", "#2contrincante button", function(event){
            
            var clickjugador2=$(this).text();
            elresultadosegundo.tirosegundo=$(this).text();
            console.log("boton 1J" + clickjugador2);
    
            // Get inputs
            input2 = clickjugador2;
           
            var leidoB = database.ref("/segundo");
            leidoB.child("tiro segundo nick").push({
                input2: input2
            });
            
            $("#rock2").hide();
            $("#papel2").hide();
            $("#tijera2").hide();

        }),// fin control de JUGADOR 2
    }

    
    
       
   

    //recuperar los datos de la base firebase JUGADOR 2
    var cone2 = database.ref("segundo/tiro segundo nick");
        cone2.on("child_added", function(snapshot){      
            var espacioparatiro2= $("<p id=elsegundo class =resultados2>").text(snapshot.val().input2);
            $("#resultadosambos").append(espacioparatiro2);   
            var dejsonapalabra2 = JSON.stringify(snapshot.val().input2);
            console.log("este es el snapvaltiro 2"+dejsonapalabra2);  

            //esto es para poder asignar a la variable de afuera el valor desde firebase,
            //de forma que aparezca en las dos ventanas. Si asignaras el valor del click,
            //solo aparecería en una ventana
            elresultadosegundo.tirosegundo = dejsonapalabra2;
            //correr la comparativa y así ver quien gana
            batalla();

        })


      //  var score1=null;
      //  var score2=null;

//---AQUÍ SE CORRE LA COMPARATIVA PARA DELIBERAR GANADOR
    function batalla (){ 
        
        //muestro el botón de reinicio
        $("#reinicio").show();  
            
        
            //estoy diciendo si hay datos tanto en la primera base de datos, como en la segunda (en realidad son nodos de una misma base)
            if (elresultadoprimero.tiroprimero && elresultadosegundo.tirosegundo){
                console.log("batalla2"+elresultadosegundo.tirosegundo);
                console.log("batalla1"+elresultadoprimero.tiroprimero);
                    
                    var nuevauno=JSON.parse(elresultadoprimero.tiroprimero) ;
                    var nuevados=JSON.parse(elresultadosegundo.tirosegundo);
                    var juntas= nuevauno + nuevados;
                    console.log(nuevados + nuevauno);
                    if (juntas==="PAPERROCK"){  
                        // score1++;
                        // console.log("sss"+score1);
                        console.log("El ganador es EL PRIMERO "+ " " + nuevauno);   
                        $("#finaliv").text("The winner is FIRST PLAYER "+ " " + JSON.stringify(nuevauno));
                    }
                    if (juntas==="ROCKPAPER"){
                        // score2++;
                        // console.log("sss"+score2);
                        console.log("El ganador es EL SEGUNDO "+ " " +nuevados);
                        $("#finaliv").text("The winner is SECOND PLAYER "+ " " + JSON.stringify(nuevados));
                    }
                    if (juntas==="ROCKROCK"){
                        
                        
                        $("#finaliv").text("Same! Try again!");
                    }

                    if (juntas==="PAPERSCISSORS"){  
                        // score2++;
                        console.log("El ganador es EL SEGUNDO "+ " " +nuevados);   
                        $("#finaliv").text("The winner is SECOND PLAYER "+ " " + JSON.stringify(nuevados));
                    }
                    if (juntas==="SCISSORSPAPER"){
                        // score1++;
                        console.log("El ganador es EL PRIMERO "+ " " +nuevauno);
                        $("#finaliv").text("The winner is FIRST PLAYER "+ " " + JSON.stringify(nuevauno));
                    }
                    if (juntas==="SCISSORSSCISSORS"){
                 
                        $("#finaliv").text("Same! Try again!");
                    }
                    if (juntas==="PAPERPAPER"){
                        console.log("El ganador es EL SEGUNDO "+ " " +nuevados);
                        $("#finaliv").text("Same! Try again!");
                    }

                    if (juntas==="ROCKSCISSORS"){  
                        // score1++;
                        console.log("El ganador es EL PRIMERO "+ " " +nuevauno); 
                        $("#finaliv").text("The winner is FIRST PLAYER "+ " " + JSON.stringify(nuevauno));  
                    }
                    if (juntas==="SCISSORSROCK"){
                        // score2++;
                        console.log("El ganador es EL SEGUNDO "+ " " +nuevados);
                        $("#finaliv").text("The winner is SECOND PLAYER "+ " " + JSON.stringify(nuevados));
                    }           
                        // var variable1 = $(event.target).text();
                        //  var ganador =$("#resultadosambos p").val()  ; 
                           
                }//cierre if
                else{
                    $("#finaliv").text("Wait until both play" );
                }
        
    }//cierre function batalla

   

    

    $("body").on("click","#reinicio", function(){
            //borro lo que trae la base de datos en los dos jugadores
            leidoB= database.ref("/segundo");
            leidoB.child("tiro segundo nick").remove();

            leidoA= database.ref("/primero");
            leidoA.child("tiro primer nick").remove();

            //borro botón reinicio
            $("#reinicio").hide();
            //vacío el área de resultados
            $("#resultadosambos").empty();
            //aparezco el área donde dice quién ganó
            var resultadospantalla= $("<div id=finaliv>");
            $("#resultadosambos").append(resultadospantalla);

            //escondo los botones para prevenir que le vuelvan a picar por separado
            $("#rock2").show(); $("#papel2").show(); $("#tijera2").show();
            $("#rock1").show(); $("#papel1").show(); $("#tijera1").show();

            //aquí estoy borrando lo que trae esta variable, porque aunque
            //aquí mismo arriba borro lo que trae la base de datos,
            //hay elementos que los jalo de la variable y tengo que reiniciarla
            elresultadoprimero.tiroprimero=null;
            elresultadosegundo.tirosegundo=null;
            
            
         //  var scoreA= $("<p id=scorea1>").text("POINTS PLAYER ONE" + " "+ score1);
         //   var scoreB= $("<p id=scorea2>").text("POINTS PLAYER TWO" + " "+  score2);
         //   $("#ree").text(scoreA , scoreB); 
            
    }) //cierre onclick reinicio
    



    //limito a solo mostrar los primeros dos resultados en front, enralidad esto ya no es necesario, porque modifiqué el DOM para ocultar los botones, de forma que después ya no te permitirá seguir agregando
    var cone = database.ref().limitToFirst(2);
   


} //cierre funcion global


}); // cierre document ready