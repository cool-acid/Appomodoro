function pomotimer(pomodoro, corto, largo){
   
    //    Valores default:
    this.minpomodoro = (pomodoro == null)?25:pomodoro;
    this.shortrest = (corto == null)?5:corto;
    this.longrest = (largo == null)?20:largo;
    
    //Configuracion: colores.
    this.coloron = '#FFF';
    this.coloroff = '#3A3A3A';
    
    this.segpomodoro = this.minpomodoro*60;
    this.encendido = false;
    this.espomodoro = true;
    
    this.dibujaSegmento = function (contexto, color){
        if (color == null){
            color = '#000'
        }
        contexto.beginPath();
        contexto.moveTo(0,10);
        contexto.lineTo(10,0);
        contexto.lineTo(70,0);
        contexto.lineTo(80,10);
        contexto.lineTo(70,20);
        contexto.lineTo(10,20);
        contexto.lineTo(0,10);
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
        canvas.width = canvas.width;
        var caco = canvas.getContext("2d");
            
        //Ahora a dibujar el display de 7 segmentos:
            
        //Segmento A:
        caco.translate(10,0);
        color = (numero[0]==1)?this.coloron:this.coloroff;
        this.dibujaSegmento(caco,color);
            
        //Segmento B:
        caco.translate(91,11);
        caco.rotate(Math.PI/2);    
        color = (numero[1]==1)?this.coloron:this.coloroff;
        this.dibujaSegmento(caco,color);
            
        //Segmento C:
        caco.translate(81,0);
        color = (numero[2]==1)?this.coloron:this.coloroff;
        this.dibujaSegmento(caco,color);
            
        //Segmento D:
        caco.translate(91,11);
        caco.rotate(Math.PI/2);    
        color = (numero[3]==1)?this.coloron:this.coloroff;
        this.dibujaSegmento(caco,color);
            
        //Segmento E:
        caco.translate(91,11);
        caco.rotate(Math.PI/2);    
        color = (numero[4]==1)?this.coloron:this.coloroff;
        this.dibujaSegmento(caco,color);
            
        //Segmento F:
        caco.translate(81,0);
        color = (numero[5]==1)?this.coloron:this.coloroff;
        this.dibujaSegmento(caco,color);
            
        //Segmento G:
        caco.translate(10,11);
        caco.rotate(Math.PI/2);    
        color = (numero[6]==1)?this.coloron:this.coloroff;
        this.dibujaSegmento(caco,color);
    }
    this.dosPuntos = function (donde){
        var canvas = document.getElementById(donde);
        canvas.width = canvas.width;
        var contexto = canvas.getContext("2d");
        contexto.beginPath();
        contexto.arc(30,60,15,0,Math.PI*2,true);
        contexto.arc(30,150,15,0,Math.PI*2,true);
        contexto.fillStyle = this.coloron;
        contexto.fill();
    }
    this.f5reloj = function (){   
        min1 = Math.floor(this.segpomodoro/600);
        min2 = Math.floor(this.segpomodoro/60)- min1*10;          
        sec1 = Math.floor((this.segpomodoro%60)/10);
        sec2 = this.segpomodoro%60 - sec1*10;
        document.title = " " + min1 + min2 + ":" + sec1 + sec2 + " - appomodoro"
        this.dibujaNumero(min1,'seg0');
        this.dibujaNumero(min2,'seg1');
        this.dibujaNumero(sec1,'seg2');
        this.dibujaNumero(sec2,'seg3');
    }
    this.pomodoro = function(){
        if(this.encendido){
            if(this.segpomodoro > 0){
                this.segpomodoro -= 1;
                this.f5reloj();
                
                //tonto javascript tonto
                var _this = this;
                t = setTimeout(function() {
                    _this.pomodoro();
                }, 1000);
            }else{
                if(Modernizr.audio){
                    alarma = document.getElementById('alarma');
                    alarma.play();
                }
                this.espomodoro = false;
            }
        }
    }
    this.descanso = function(){
            
    }
    this.iniciar = function (){
        this.f5reloj();
        if (this.encendido == false){
            this.encendido = true;
            $('#start').html("Detener Pomodoro");
            $('#start').removeClass('green').addClass('red');
            if(this.espomodoro == true){
                this.segpomodoro = this.minpomodoro * 60;
                this.pomodoro();
            }else{
                this.descanso();
            }
        }else{
            this.encendido = false;
            this.inicializar();
            $('#start').html("Iniciar Pomodoro");
            $('#start').removeClass('red').addClass('green');
        }
    }
    this.inicializar = function (){
        this.segpomodoro = this.minpomodoro * 60;
        this.f5reloj();
        this.dosPuntos('separador');
    }
}

