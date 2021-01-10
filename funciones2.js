var fichasPosibles = document.getElementById("fichaPosible");
var centrado = document.getElementById("centrado");
var borde = 5;
var anchoCelda=60;	
var jugador=1;
var puntos;
var fin = false;
var fichasPos;
var paux1=0;
var paux2=0;
var puntuacion1=0;
var puntuacion2=0;
var puntuacionM1=0;
var puntuacionM2=0;
var puntuaciones=[];
var movsc=[];
var movsf=[];
var arrayPosibles=[];
var contador=0;
var primero=0;
var alpha;
var beta;

var matrizTablero = [
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,2,1,0,0,0],
	[0,0,0,1,2,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0]
]

var matrizTableroC = [
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0]
]
	 // var matrizTablero = [
	 // 	[0,0,1,2,1,2,0,2],
	 // 	[1,2,1,0,1,0,1,0],
	 // 	[1,2,1,0,1,0,1,2],
	 // 	[1,2,1,2,1,2,1,2],
	 // 	[0,2,0,1,0,2,1,2],
	 // 	[1,2,1,2,1,2,0,2],
	 // 	[1,2,1,0,1,2,1,0],
	 // 	[1,2,1,2,1,2,1,2]
	 // ]

function inicia(modo){
	if(modo=="JvsJ"){
		centrado.style.display="inline";
		var modd = document.getElementById("modo");
		modd.style.display="none";
		var contenedor = document.getElementById("contenedor");
		var ficha = document.getElementById("ficha");
		var puntuacion = document.getElementById("puntuacion");
		contenedor.style.width=anchoCelda*8+(borde*9)+"px";
		contenedor.style.height=anchoCelda*8+(borde*9)+"px";
		pintarTablero();
		pintarFichas();
		pintarFichasPosibles();
	}
	else if(modo=="JvsM"){
		centrado.style.display="inline";
		var modd = document.getElementById("modo");
		modd.style.display="none";
		var contenedor = document.getElementById("contenedor");
		var ficha = document.getElementById("ficha");
		var puntuacion = document.getElementById("puntuacion");
		contenedor.style.width=anchoCelda*8+(borde*9)+"px";
		contenedor.style.height=anchoCelda*8+(borde*9)+"px";
		pintarTablero();
		pintarFichas();
		pintarFichasPosibles();
	}
}

function pintarTablero(){
	for (var i = 0; i< 8; i++){
		for (var j=0; j < 8; j++){
			var cuadro = document.createElement("div");
			cuadro.style.position="absolute";
			cuadro.style.width=anchoCelda+"px";
			cuadro.style.height=anchoCelda+"px";
			cuadro.style.backgroundColor="green";
			cuadro.style.left=(anchoCelda+borde)*j +borde+"px";
			cuadro.style.top=(anchoCelda+borde)*i+borde+"px";
			cuadro.setAttribute("onclick","javascript:seleccion("+i+","+j+")");
			contenedor.appendChild(cuadro);
		}
	}
}

function pintarFichas(){
	ficha.innerHTML="";	
	for (var i = 0; i < 8; i++) {
		for(var j=0; j < 8; j++){
			var valor = matrizTablero[i][j];
			if(valor==0){

			}else {
				var fic = document.createElement("div");
				fic.style.position="absolute";
				fic.style.width=anchoCelda-4+"px";
				fic.style.height=anchoCelda-4+"px";
				fic.style.borderRadius="30px";
				fic.style.left=(anchoCelda+borde)*j +borde+402+"px";
				fic.style.top=(anchoCelda+borde)*i+borde+52+"px";
				if(valor==1){
					fic.style.backgroundColor="black";
				}else if(valor==2){
					fic.style.backgroundColor="white";
				}
				ficha.appendChild(fic);
			}
		}
	}
}

function seleccion(fila,columna){
	if(fin){
		return;
	}
	if(matrizTablero[fila][columna] != 0){
		return;
	}
	if(permitir(jugador,fila,columna)==true){
		var x =  x1(jugador,fila,columna);
		voltearFichas(x);
		matrizTablero[fila][columna]=jugador;
		// console.log(jugador);
		if(jugador==1 && permitirMover(2)){
			jugador=2;
		}else if(jugador==2 && permitirMover(1)){
			jugador=1;
		}
		pintarFichas();
		pintarFichasPosibles();
		pintarPuntuacion();
		if(!fichasPos){
			//console.log("Entra");
			if(puntuacion1>puntuacion2){
				Swal.fire({
				  title: 'El Jugador 1 ha ganado!',
				  text: 'Fichas negras ganaron.',
				  imageUrl: 'img/jugador_1.jpg',
				  imageWidth: 400,
				  imageHeight: 200,
				  imageAlt: 'Custom image',
				})
			}else if(puntuacion2>puntuacion1){
				Swal.fire({
				  title: 'El jugador 2 ha ganado!',
				  text: 'Fichas blancas ganaron',
				  imageUrl: 'img/jugador_2.jpg',
				  imageWidth: 400,
				  imageHeight: 200,
				  imageAlt: 'Custom image',
				})
			}else{
				Swal.fire({
				  title: 'Sweet!',
				  text: 'Modal with a custom image.',
				  imageUrl: 'img/empate.png',
				  imageWidth: 400,
				  imageHeight: 200,
				  imageAlt: 'Custom image',
				})
			}
		 	fin=true;
		}
		// }else{
		// 	paux1=puntuacion1;
		// 	paux2=puntuacion2;
		// }
		
	}
}

function permitir(id,fila,columna){
	var fichasAfectadas = x1(id,fila,columna);
	if(fichasAfectadas.length ==0){
		return false;
	}else{
		return true;
	}
}

function permitirMover(id){
	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 8; j++){
			if(permitir(id,i,j)){
				return true;
			}
		}
	}
	return false;
}

function x1(id,fila,columna){
	var fAfectadas = [];
	var colAfectadas = [];
	var columnas = columna;
	while(columnas < 7){
		columnas+=1;
		var valorFicha = matrizTablero[fila][columnas];
		if(valorFicha == 0 || valorFicha == id){
			if(valorFicha == id){
				fAfectadas = fAfectadas.concat(colAfectadas);
			}
			break;
		}else{
			var lugarFicha={fila:fila,columna:columnas};
			colAfectadas.push(lugarFicha);
		}
	}

	var colAfectadas = [];
	var columnas = columna;
	while(columnas > 0){
		columnas-=1;
		var valorFicha = matrizTablero[fila][columnas];
		if(valorFicha == 0 || valorFicha == id){
			if(valorFicha == id){
				fAfectadas = fAfectadas.concat(colAfectadas);
			}
			break;
		}else{
			var lugarFicha={fila:fila,columna:columnas};
			colAfectadas.push(lugarFicha);
		}
	}

	var colAfectadas = [];
	var filas = fila;
	while(filas > 0){
		filas-=1;
		var valorFicha = matrizTablero[filas][columna];
		if(valorFicha == 0 || valorFicha == id){
			if(valorFicha == id){
				fAfectadas = fAfectadas.concat(colAfectadas);
			}
			break;
		}else{
			var lugarFicha={fila:filas,columna:columna};
			colAfectadas.push(lugarFicha);
		}
	}

	var colAfectadas = [];
	var filas = fila;
	while(filas < 7){
		filas+=1;
		var valorFicha = matrizTablero[filas][columna];
		if(valorFicha == 0 || valorFicha == id){
			if(valorFicha == id){
				fAfectadas = fAfectadas.concat(colAfectadas);
			}
			break;
		}else{
			var lugarFicha={fila:filas,columna:columna};
			colAfectadas.push(lugarFicha);
		}
	}

	var colAfectadas = [];
	var filas = fila;
	var columnas = columna;
	while(filas < 7 && columnas < 7){
		filas+=1;
		columnas+=1;
		var valorFicha = matrizTablero[filas][columnas];
		if(valorFicha == 0 || valorFicha == id){
			if(valorFicha == id){
				fAfectadas = fAfectadas.concat(colAfectadas);
			}
			break;
		}else{
			var lugarFicha={fila:filas,columna:columnas};
			colAfectadas.push(lugarFicha);
		}
	}

	var colAfectadas = [];
	var filas = fila;
	var columnas = columna;
	while(filas < 7 && columnas > 0){
		filas+=1;
		columnas-=1;
		var valorFicha = matrizTablero[filas][columnas];
		if(valorFicha == 0 || valorFicha == id){
			if(valorFicha == id){
				fAfectadas = fAfectadas.concat(colAfectadas);
			}
			break;
		}else{
			var lugarFicha={fila:filas,columna:columnas};
			colAfectadas.push(lugarFicha);
		}
	}

	var colAfectadas = [];
	var filas = fila;
	var columnas = columna;
	while(filas > 0 && columnas > 0){
		filas-=1;
		columnas-=1;
		var valorFicha = matrizTablero[filas][columnas];
		if(valorFicha == 0 || valorFicha == id){
			if(valorFicha == id){
				fAfectadas = fAfectadas.concat(colAfectadas);
			}
			break;
		}else{
			var lugarFicha={fila:filas,columna:columnas};
			colAfectadas.push(lugarFicha);
		}
	}

	var colAfectadas = [];
	var filas = fila;
	var columnas = columna;
	while(filas > 0 && columnas < 7){
		filas-=1;
		columnas+=1;
		var valorFicha = matrizTablero[filas][columnas];
		if(valorFicha == 0 || valorFicha == id){
			if(valorFicha == id){
				fAfectadas = fAfectadas.concat(colAfectadas);
			}
			break;
		}else{
			var lugarFicha={fila:filas,columna:columnas};
			colAfectadas.push(lugarFicha);
		}
	}
	return fAfectadas;
}

function voltearFichas(fichasAfectadas){
	for (var i=0 ; i<fichasAfectadas.length ;i++){	
		var f = fichasAfectadas[i];
		if(matrizTablero[f.fila][f.columna]==1){
			matrizTablero[f.fila][f.columna]=2;
		}else{
			matrizTablero[f.fila][f.columna]=1;
		}
	}
}

function pintarPuntuacion(){
	var uno = 0;
	var dos = 0;
	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 8; j++){
			var valor = matrizTablero[i][j];
			if(valor==1){
				uno++;
			}else if(valor==2){
				dos++;
			}
		}
	}
	puntuacion.innerHTML="Negras: "+uno+" Blancas:"+dos+"";
	puntuacion1=uno;
	puntuacion2=dos;
	// if(jugador==2){
	// 	maquinaJugar(movsf,movsc);
	// }

}

function pintarFichasPosibles(){
	contador=0;
	movsf=[];
	movsc=[];
	fichasPosibles.innerHTML="";
	fichasPos=false;	
	for (var i = 0; i < 8; i++) {
		for(var j=0; j < 8; j++){
			var valor = matrizTablero[i][j];
			if(valor==0 && permitir(jugador,i,j)){
				arrayPosibles[contador]={posi:i,posj:j};
				contador++;
				var posfichas = document.createElement("div");
				posfichas.style.position="absolute";
				posfichas.style.width=anchoCelda-8+"px";
				posfichas.style.height=anchoCelda-8+"px";
				posfichas.style.borderRadius="30px";
				posfichas.style.left=(anchoCelda+borde)*j +borde+402+"px";
				posfichas.style.top=(anchoCelda+borde)*i+borde+52+"px";
				posfichas.style.zIndex=2;
				posfichas.setAttribute("onclick","javascript:seleccion("+i+","+j+")");
				if(jugador==1){
					posfichas.style.border="2px solid black";
				}
				if(jugador==2){
					posfichas.style.border="2px solid white";
					movsf[movsf.length]=i;
					movsc[movsc.length]=j;					
				}
				fichasPos=true;
				fichasPosibles.appendChild(posfichas);
				
			}
		}
	}
	// console.log(arrayPosibles);
	if (jugador==2 && permitirMover(1)) {
		tiradaComputadora();
		// maquinaJugar(movsf,movsc);
	}
}

    function tiradaComputadora(){
    	if(1==1){
    		var posicionesj=[];
    		var posicionesi=[];
    		for(var i=0;i< arrayPosibles.length;i++){
    			if(primero==0){
    				if(i==arrayPosibles.length-1){
    					primero++;
    					break;
    				}else{
    					posicionesi[i]=arrayPosibles[i].posi;
    					posicionesj[i]=arrayPosibles[i].posj;
    				}
    			}else{
    				posicionesi[i]=arrayPosibles[i].posi;
    				posicionesj[i]=arrayPosibles[i].posj;
    			}
    			
    		}
    		var posicioni=0;
    		var posicionj=0;
    		var valor = -2;
            var aux;
             for (var i = 0;i < 8; i++) {
             	if(posicionesi.includes(i)){
             		for (var j = 0; j < 8; j++) {
             			if(posicionesj.includes(j)){
             				matrizTablero[i][j]=2;
             				aux=minimizarBeta();
	                        if(aux>valor){
	                           valor=aux;
	                           posicioni=i;
	                           posicionj=j;
	                        }
	                        matrizTablero[i][j]=0;
             			}
	                }
	                seleccion(posicioni,posicionj);
	                //matrizTablero[posicioni][posicionj]=2;
             	}
        	}
    	}      
    }
    
    function maximizarAlpha(){
        if(!permitirMover(1) && !permitirMover(2)){
        	if(puntuacion1==puntuacion2){
        		return 0;
        	}else{
        		return 1;
        	}
        }
        var valor = -2;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if(matrizTablero[i][j]==0){
                    matrizTablero[i][j]=2;
                    alpha=minimizarBeta();
                    if(alpha>valor){
                        valor=alpha;
                    }
                    matrizTablero[i][j]=0;
                }
            }
        }
        return valor;
    }
    
    function minimizarBeta(){
        if(!permitirMover(1) && !permitirMover(2)){
        	if(puntuacion1==puntuacion2){
        		return 0;
        	}else{
        		return 1;
        	}
        }
        var valor = 2;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if(matrizTablero[i][j]==0){
                    matrizTablero[i][j]=1;
                    beta=maximizarAlpha();
                    if(beta<valor){
                        valor=beta;
                    }
                    matrizTablero[i][j]=0;
                }
            }
        }
        return valor;
    }
