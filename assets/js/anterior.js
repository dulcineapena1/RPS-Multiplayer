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
            $("#conectados").text("hay conectados" + (snap.numChildren()-1));
        });
    
    
        
    
    
        
    
    
        $("#start").on("click",function(){
            empezar.remove();
            var textoinicio = $("<p class=parrafo>").text("WRITTE YOUR NICKNAME");
            $(textoinicio).appendTo("#contenedor");
    
            var ingresarnick = $("<input id=idnick type=text>");
            var botonsubmitnick =$("<input id=addnick type=submit>");
            $("#contenedor").append(ingresarnick, botonsubmitnick);
    
            //estos son los divs en los que voy a organizar la informaciòn de cada oponente
            var info1= $("<div id=1contrincante>");
            var info2= $("<div id=2contrincante>");
            $("#contenedor").append(info1, info2);
        }); //fin boton start on click
    
    
    
        
        var nick="";
        var agregado = 0;
    
        //al dar click en agregar nick
        $("body").on("click","#addnick", function(){
            agregado++;
            console.log("este es el agregado  "+ agregado);
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
        //variable para generar id diferentes en cada nick
        var iddenick = 0;
    
        
        //database.ref()
        cone.on("child_added", function(snapshot) {     
            iddenick++;           
            console.log("estoessnapshot key"+snapshot.key);
            
           
            if (iddenick==2){
                currentu1=1;
                console.log("current1"+ currentu1);
               var leido1 = database.ref("/connections").child(snapshot.key);
               leido1.child('tiro primer nick').set({
                Tiro: "Pro AngularJS"
                });
                
            }
            if (iddenick==3){
                currentu2=2;
                console.log("current2"+ currentu2);
                var leido2 = database.ref("/connections").child(snapshot.key);
                leido2.child('tiro segundo nick').set({
                 Tiro: "Pro AngularJS"
                 });
             }
    
    
    
            var espacioparanik= $("<p id="+iddenick+">").text(snapshot.val().nick);
            $("#contenedor").append(espacioparanik);   
            var dejsonapalabra = JSON.stringify(snapshot.val().nick);
            console.log("este es el snapval"+dejsonapalabra);  
           // if(agregado ==2){
                //database.ref().remove();
           //}
    
           //meto cada id en un espacio de div diferente, para organizar
           $("#2").appendTo("#1contrincante");
           $("#3").appendTo("#2contrincante");
    
          //  var llaveuno = firebase.database().ref().key;
          //  console.log("llave uno"+llaveuno);
    
    
           //cuando haya dos id's se correrà el juego, pues son dos oponentes
           if(iddenick==3){
              correrpelea();
                //apartir de aqui corro la pelea
                    function correrpelea(){
                        //primero borro los input para que ya no se puedan meter más jugadores
                        $("#idnick").remove();
                        $("#addnick").remove();
                        //les pongo un titulo a cada uno para fines decorativos
                        var titulo=$("<p id=titulo>").text("OPONENTS");
                        $("#1contrincante").prepend(titulo);
                    
                        //botones para el primer oponente
                        var botonrock1 = $("<button id=rock1>").text("ROCK");
                        var botonpapel1 = $("<button id=papel1>").text("PAPER");
                        var botontijera1 = $("<button id=tijera1>").text("SCISSORS");
                        $("#1contrincante").append(botonrock1,botonpapel1,botontijera1);
                        //botones para el segundo oponente
                        var botonrock2 = $("<button id=rock2>").text("ROCK");
                        var botonpapel2 = $("<button id=papel2>").text("PAPER");
                        var botontijera2 = $("<button id=tijera2>").text("SCISSORS");
                        $("#2contrincante").append(botonrock2,botonpapel2,botontijera2);
    
                        var track1="";
                        var track2="";
    
                        $("button").on("click", function(){
                            var estoesboton=$(this).attr("id");
                            console.log("esto es boton" + estoesboton);
                           
                           
                         
                          //  var esio=$(this);
                          //  var ekio=JSON.stringify(esio);
                               
                           //     console.log("esio"+ekio);
                            //    var nueva=event.click;
                            //    var lanueva=JSON.stringify(nueva);
                             //   console.log("current"+ lanueva);
                        //   if((estoesboton == "rock1" )&&(snapshot.i)){
                        //       console.log("hazdado click en roca");
                          //  }
                                                
                        });//cierre button on click                  
                    } //cierre function correrpelea         
           }//cierre if iddenick =3
    
            // If any errors are experienced, log them to console.
            }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        }); //fin child_added
    
    
    
      
    
        
    
    
    
    
    
    
    } //cierre funcion global
    
    
    
    
    
    
    
    
    
    
    
    
    
    }); // cierre document ready