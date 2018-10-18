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
            var textoinicio = $("<p class=parrafo>").text("WRITTE YOUR NICKNAME");
            $(textoinicio).appendTo("#contenedor");
    
           
            var ingresarnick1 = $("<input id=idnick1 type=text>");
            var botonsubmitnick1 =$("<input id=addnick type=submit>");
            
            
            $("#contenedor").append(ingresarnick1, botonsubmitnick1);
    
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
            
            
            console.log("aumentarconecc"+aumentarconecciones);
            if (aumentarconecciones ==1)   {
                nick1 = $("#idnick1").val()
                var leido1 = database.ref("/connections/primero");
                leido1.child('tiro primer nick').push({
                    nick: nick1,
                    Tiro: "delprimero"
                });
            }
            if (aumentarconecciones ==2)   {
                nick2 = $("#idnick1").val()
                var leido2 = database.ref("/connections/segundo");
                leido2.child('tiro segundo nick').push({
                    nick: nick2,
                    Tiro: "Pro AngularJS"
                });
            }
                
        }); // fin click addnick
    
    
        //limito a solo mostrar los primeros dos resultados en front, pero
        //ahora debo hacer que al agregar más de dos no permita en la base de datos
        var cone = database.ref().limitToFirst(2);
        //variable para generar id diferentes en cada nick
        var iddenick = 0;
    
        
        
    
                  
         
    
           
    
    
    
      
    
        
    
    
    
    
    
    
    } //cierre funcion global
    
    
    
    
    
    
    
    
    
    
    
    
    
    }); // cierre document ready