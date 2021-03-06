function pomotimer(pomodoro, corto, largo){
   
    //    Valores default:
    this.minpomodoro = (pomodoro == null)?25:pomodoro;
    this.shortrest = (corto == null)?5:corto;
    this.longrest = (largo == null)?20:largo;
    
    //Configuracion: colores.
    this.coloron = '#FFF';
    this.coloroff = '#3A3A3A';
    
    this.colorpomodoro = '#FFF';
    this.colordescanso = '#0FFF23';
    
    this.segpomodoro = this.minpomodoro*60;
    this.encendido = false;
    this.espomodoro = true;
    this.nodescanso = 0;
    
    this.globalHeight = (window.innerWidth < 800)?window.innerHeight * .20:180;
    this.globalWidth = this.globalHeight/1.8;
    
    //Cosas del audio
    if(Modernizr.audio){
        channel_max = 10;
        audiochannels = new Array();

        for (a=0;a<channel_max;a++){
            audiochannels[a] = new Array();
            audiochannels[a]['channel'] = new Audio();
            audiochannels[a]['finished'] = -1;
        }
    }
    
    this.play_multi_sound = function (s,src) {
        for (a=0;a<audiochannels.length;a++) {
            thistime = new Date();
            if (audiochannels[a]['finished'] < thistime.getTime()) {
                audiochannels[a]['finished'] = thistime.getTime() + document.getElementById(s).duration*1000;
                //                audiochannels[a]['channel'].src = document.getElementById(s).src;
                audiochannels[a]['channel'].src = src;
                audiochannels[a]['channel'].load();
                audiochannels[a]['channel'].play();
                break;
            }
        }
    }
    
    this.dibujaSegmento = function (contexto, color){
        if (color == null){
            color = '#000'
        }
        contexto.beginPath();
        contexto.moveTo(0,this.globalWidth*.10);
        contexto.lineTo(this.globalWidth*.10,0);
        contexto.lineTo(this.globalWidth*.70,0);
        contexto.lineTo(this.globalWidth*.80,this.globalWidth*.10);
        contexto.lineTo(this.globalWidth*.70,this.globalWidth*.20);
        contexto.lineTo(this.globalWidth*.10,this.globalWidth*.20);
        contexto.lineTo(0,this.globalWidth*.10);
        contexto.fillStyle = color;
        contexto.fill();
    }
    
    this.dibujaNumero = function (valor, donde){
        //BCD
        var deco = [[1,1,1,1,1,1,0],
            [0,1,1,0,0,0,0],
            [1,1,0,1,1,0,1],
            [1,1,1,1,0,0,1],
            [0,1,1,0,0,1,1],
            [1,0,1,1,0,1,1],
            [1,0,1,1,1,1,1],
            [1,1,1,0,0,0,0],
            [1,1,1,1,1,1,1],
            [1,1,1,0,0,1,1],
            [1,1,1,1,1,1,0]];
        var numero = deco[valor];
        var canvas = document.getElementById(donde);
        
        canvas.width = this.globalWidth;
        canvas.height = this.globalHeight;
        
        canvas.width = canvas.width;
        var caco = canvas.getContext("2d");
            
        //Ahora a dibujar el display de 7 segmentos:
            
        //Segmento A:
        caco.translate(this.globalWidth*.10,0);
        color = (numero[0]==1)?this.coloron:this.coloroff;
        this.dibujaSegmento(caco,color);
            
        //Segmento B:
        caco.translate(this.globalWidth*.91,this.globalWidth*.11);
        caco.rotate(Math.PI/2);    
        color = (numero[1]==1)?this.coloron:this.coloroff;
        this.dibujaSegmento(caco,color);
            
        //Segmento C:
        caco.translate(this.globalWidth*.81,0);
        color = (numero[2]==1)?this.coloron:this.coloroff;
        this.dibujaSegmento(caco,color);
            
        //Segmento D:
        caco.translate(this.globalWidth*.91,this.globalWidth*.11);
        caco.rotate(Math.PI/2);    
        color = (numero[3]==1)?this.coloron:this.coloroff;
        this.dibujaSegmento(caco,color);
            
        //Segmento E:
        caco.translate(this.globalWidth*.91,this.globalWidth*.11);
        caco.rotate(Math.PI/2);    
        color = (numero[4]==1)?this.coloron:this.coloroff;
        this.dibujaSegmento(caco,color);
            
        //Segmento F:
        caco.translate(this.globalWidth*.81,0);
        color = (numero[5]==1)?this.coloron:this.coloroff;
        this.dibujaSegmento(caco,color);
            
        //Segmento G:
        caco.translate(this.globalWidth*.10,this.globalWidth*.11);
        caco.rotate(Math.PI/2);    
        color = (numero[6]==1)?this.coloron:this.coloroff;
        this.dibujaSegmento(caco,color);
    }
    
    this.dosPuntos = function (donde){
        var canvas = document.getElementById(donde);
        canvas.height = this.globalHeight;
        canvas.width = this.globalWidth*.6;
        canvas.width = canvas.width;
        var contexto = canvas.getContext("2d");
        contexto.beginPath();
        contexto.arc(canvas.width/2,this.globalHeight*.33,this.globalWidth*.15,0,Math.PI*2,true);
        contexto.arc(canvas.width/2,this.globalHeight*.66,this.globalWidth*.15,0,Math.PI*2,true);
        contexto.fillStyle = this.coloron;
        contexto.fill();
    }
    
    this.f5reloj = function (){
        this.globalHeight = (window.innerWidth < 800)?window.innerHeight * .20:180;
        this.globalWidth = this.globalHeight/1.8;
        var pomoodescanso = '';
        min1 = Math.floor(this.segpomodoro/600);
        min2 = Math.floor(this.segpomodoro/60)- min1*10;          
        sec1 = Math.floor((this.segpomodoro%60)/10);
        sec2 = this.segpomodoro%60 - sec1*10;
        if(this.encendido){
            pomoodescanso = (this.espomodoro)?' (Pomodoro)':' (Descanso)';
            document.title = " " + min1 + min2 + ":" + sec1 + sec2 + pomoodescanso + " - appomodoro";
        }else{
            document.title = "appomodoro";
        }
        this.dibujaNumero(min1,'seg0');
        this.dibujaNumero(min2,'seg1');
        this.dibujaNumero(sec1,'seg2');
        this.dibujaNumero(sec2,'seg3');
        this.dosPuntos('separador');
    }
    
    this.pomodoro = function(){
        if(this.encendido){
            if(this.segpomodoro > 0){
                this.segpomodoro -= 1;
                this.f5reloj();
                
                //tonto javascript tonto
                var _this = this;
                this.instance = setTimeout(function() {
                    _this.pomodoro();
                }, 1000);
            }else{
                this.sonaralarma();
                
                if(this.espomodoro){                   
                    $('#start').html("Detener descanso");
                    if(this.nodescanso < 3){
                        this.nodescanso++;
                        this.segpomodoro = this.shortrest * 60;
                    }else{
                        this.nodescanso=0;
                        this.segpomodoro = this.longrest * 60;
                    }
                    this.coloron = this.colordescanso;
                    this.f5reloj();
                    this.dosPuntos('separador');
                    this.pomodoro();
                }else{
                    $('#start').html("Iniciar Pomodoro");
                    $('#start').removeClass('red').addClass('green');
                    this.encendido = false;
                    this.inicializar();
                }
                this.espomodoro = !this.espomodoro;
            }
        }
    }
    
    this.iniciar = function (){
        this.f5reloj();
        if (this.encendido == false){
            clearTimeout(this.instance);
            this.encendido = true;
            $('#start').html("Detener Pomodoro");
            $('#start').removeClass('green').addClass('red');
            this.segpomodoro = this.minpomodoro * 60;
            this.pomodoro();
        }else{
            this.encendido = false;
            this.espomodoro = true;
            this.inicializar();
            $('#start').html("Iniciar Pomodoro");
            $('#start').removeClass('red').addClass('green');
        }
    }
    this.sonaralarma = function(){
        if(Modernizr.audio){
            if(Modernizr.audio.ogg){
                console.log("Alarma (ogg)");
                this.play_multi_sound('alarma','/sounds/alarm.ogg');
            }else if (Modernizr.audio.mp3){
                console.log("Alarma (mp3)");
                this.play_multi_sound('alarma', '/sounds/alarm.mp3');
            }else{
                play();
            }
        }else{
            play();
        }
    }
    
    this.inicializar = function (){
        this.coloron =　this.colorpomodoro;
        this.segpomodoro = this.minpomodoro * 60;
        this.f5reloj();
        this.dosPuntos('separador');
    }
}


$(document).ready(function() {
    var minpomodoro = 25;
    var descorto = 5;
    var deslargo = 20;
    var click;
                
    if (Modernizr.localstorage) {
        //        TODO: Cambiar esto para el movil
        minpomodoro = (localStorage['appomodoro.largopom'])?localStorage['appomodoro.largopom']:minpomodoro;
        descorto = (localStorage['appomodoro.shortrest'])?localStorage['appomodoro.shortrest']:descorto;
        deslargo = (localStorage['appomodoro.longrest'])?localStorage['appomodoro.longrest']:deslargo;
                    
        $('#largopom').val(minpomodoro);
        $('#descorto').val(descorto);
        $('#deslargo').val(deslargo);
    }
    if(Modernizr.audio){
        if(!Modernizr.audio.ogg&&!Modernizr.audio.mp3){
            $('#soporte').show(function(){
                $('#soporte>ul').append('<li>Tu navegador no soporta <b>mp3</b> ni <b>ogg</b>. Usar&eacute; flash para la alarma.</li>');
            });
        }
    }
                
    var relojito = new pomotimer(minpomodoro,descorto,deslargo);
                
    //checamos por soporte de canvas
    if (Modernizr.canvas){
        relojito.inicializar();
        $('#start').click(function(){
            relojito.iniciar();
            return false;
        });
    }else{
        alert("Tu navegador no soporta Canvas! D:");
        //TODO: Manejar esto menos gachamente.
    }
                
    $('#formita').submit(function(){
        return false;
    });
    //    TODO: Cambiar esto para movil si es que es necesario.
    $('#configul input').bind("change blur keyup mouseup", function() {
        id = $(this).attr('id');
        var minutos = $(this).val();
        var numero = new RegExp("^[0-9]{1,2}$");
        if (numero.test(minutos)&&parseInt(minutos)>0){
            $(this).attr("style","color:#FFF;");
            switch(id){
                case 'largopom':
                    if (Modernizr.localstorage) {
                        localStorage['appomodoro.largopom'] = minutos;
                    }
                    relojito.minpomodoro = minutos;
                    if (!relojito.encendido){
                        relojito.inicializar();
                    }
                    break;
                case 'descorto':
                    if (Modernizr.localstorage) {
                        localStorage['appomodoro.shortrest'] = minutos;
                    }
                    relojito.shortrest = minutos;
                    break;
                case 'deslargo':
                    if (Modernizr.localstorage) {
                        localStorage['appomodoro.longrest'] = minutos;
                    }
                    relojito.longrest = minutos;
                    break;
            }
        }else{
            $(this).attr("style","color:#F55;");
        }
    });
    $(window).resize(function(){
        relojito.f5reloj();
    });
    $('#config').click(function(){
        $('#config').blur();
        $('#configTab').addClass('active');
        if(Modernizr.history)
            history.pushState({'tab':'config'}, "Configuracion - appomodoro", "/mobile/config");
        return false;
    });
    $('#about').click(function(){
        $('#about').blur();
        $('#aboutTab').addClass('active');
        if(Modernizr.history)
            history.pushState({'tab':'about'}, "Acerca de - appomodoro", "/mobile/about");
        return false;
    });
    $('.cerrar').click(function(){
        $(this).parent().parent().removeClass('active');
        if(Modernizr.history)
            history.pushState({'tab':'about'}, "Acerca de - appomodoro", "/mobile");
        return false;
    });
    window.addEventListener("popstate", function(e) {
        switch(location.pathname){
            case "/mobile":
                console.log("Desaparecemos las activas.");
                $('.active').removeClass("active");
                break;
            case "/mobile/config":
                console.log("Abrimos config.");
                $('#configTab').addClass('active');
                break;
            case "/mobile/about":
                console.log("Abrimos about.");
                $('#aboutTab').addClass('active');
                break;
        }
    });
});

