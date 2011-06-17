function pomotimer(pomodoro, corto, largo){
    
//    Valores default:
    
    this.minpomodoro = (pomodoro == null)?25:pomodoro;
    this.shortrest = (corto == null)?25:corto;;
    this.longrest = (largo == null)?25:largo;
    
    function dibujaSegmento(contexto, color){
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
    function dibujaNumero(valor, donde){
        //Configuracion: colores.
        var coloron = '#FFF';
        var coloroff = '#3A3A3A';
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
        color = (numero[0]==1)?coloron:coloroff;
        dibujasegmento(caco,color);
            
        //Segmento B:
        caco.translate(91,11);
        caco.rotate(Math.PI/2);    
        color = (numero[1]==1)?coloron:coloroff;
        dibujasegmento(caco,color);
            
        //Segmento C:
        caco.translate(81,0);
        color = (numero[2]==1)?coloron:coloroff;
        dibujasegmento(caco,color);
            
        //Segmento D:
        caco.translate(91,11);
        caco.rotate(Math.PI/2);    
        color = (numero[3]==1)?coloron:coloroff;
        dibujasegmento(caco,color);
            
        //Segmento E:
        caco.translate(91,11);
        caco.rotate(Math.PI/2);    
        color = (numero[4]==1)?coloron:coloroff;
        dibujasegmento(caco,color);
            
        //Segmento F:
        caco.translate(81,0);
        color = (numero[5]==1)?coloron:coloroff;
        dibujasegmento(caco,color);
            
        //Segmento G:
        caco.translate(10,11);
        caco.rotate(Math.PI/2);    
        color = (numero[6]==1)?coloron:coloroff;
        dibujasegmento(caco,color);
    }
    function dospuntos(donde, color){
        if (color == null){
            color = '#000'
        }
        var canvas = document.getElementById(donde);
        canvas.width = canvas.width;
        var contexto = canvas.getContext("2d");
        contexto.beginPath();
        contexto.arc(30,60,15,0,Math.PI*2,true);
        contexto.arc(30,150,15,0,Math.PI*2,true);
        contexto.fillStyle = color;
        contexto.fill();
    }
    function f5reloj(){
        
        min1 = Math.floor(segpomodoro/600);
        min2 = Math.floor(segpomodoro/60)- min1*10;          
        sec1 = Math.floor((segpomodoro%60)/10);
        sec2 = segpomodoro%60 - sec1*10;
            
        dibujanumero(min1,0);
        dibujanumero(min2,1);
        dibujanumero(sec1,2);
        dibujanumero(sec2,3);
    }
}

