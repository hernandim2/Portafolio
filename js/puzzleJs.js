var juego = {"filas":[[],[],[]],
			 "espacioVacio":{"filas":2,"columna":2},
			 iniciar: function(param) {
			 	 juego.instalarPiezas(param);
			 	 setTimeout(function() {
			 	 	juego.mezclarFichas(200);
			 	 }, 1000);
			 	 
			},
		 	 crearPieza: function(num,f,c) {
		 	 		var pieza = $("<div>").addClass("pieza");

					pieza.css("background-image","url(./img/"+num+".jpg)").
					css("top", f*200  +"px").css("left", c*200 +"px");
					return {
						p:pieza,
						contador: num,
						fila:f,
						columna:c
					};

			},
			instalarPiezas: function(jueg) {
				var cont = 1;
					for (var i = 0; i < 3 ; i++) {
						for (var j = 0; j < 3 ; j++) {
							if (this.espacioVacio.filas == i && this.espacioVacio.columna == j) {
								this.filas[i][j] = null;
								jueg.append($("<div>").addClass("pieza"));
							} else{
								var pz = this.crearPieza(cont,i,j);
								jueg.append(pz.p);
								this.filas[i][j] = pz;
							}
							cont++;
						};
					};
			},
			moverHaciaAbajo:function(banGano) {// banGano es TRUE cuando es invocado de CAPTURARTECLAS
											  // y es FALSO si viene de MEZCLARFICHAS
				var filaOrigen = this.espacioVacio.filas + 1;
			    var columnaOrigen = this.espacioVacio.columna;
			    juego.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
			    if (banGano)
			    	juego.chequearSiGano();
			},
			moverHaciaArriba:function(banGano) {
				var filaOrigen = this.espacioVacio.filas - 1;
			    var columnaOrigen = this.espacioVacio.columna;
			    juego.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
			    if (banGano)
			    	juego.chequearSiGano();
			},
			moverHaciaLaDerecha:function(banGano) {
				var filaOrigen = this.espacioVacio.filas;
			    var columnaOrigen = this.espacioVacio.columna + 1;
			    juego.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
			    if (banGano)
			    	juego.chequearSiGano();
			},
			moverHaciaLaIzquierda:function(banGano) {
			   var filaOrigen = this.espacioVacio.filas;
			   var columnaOrigen = this.espacioVacio.columna - 1;
			   juego.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
			   if (banGano)
			   		juego.chequearSiGano();
			},
			capturarTeclas:function() {
				var self = juego;
				$(document).keydown(function(e) {
				    var code = e.which;
					switch (code) {
							case 37:
						    	self.moverHaciaLaIzquierda(true);
						        break;
						    case 38:
						    	self.moverHaciaArriba(true);
						        break;
						    case 39:
						    	self.moverHaciaLaDerecha(true);
						        break;
						    case 40:
						       self.moverHaciaAbajo(true);
						       break;					    
					}
				  
				});
					
			},
			moverFichaFilaColumna: function(aux) {
				 aux.p.css("top",this.espacioVacio.filas*200  +"px").css("left", this.espacioVacio.columna*200 +"px");
			},
			guardarEspacioVacio : function(f,c) {
				this.filas[f][c] = null;
				this.espacioVacio.filas = f;
				this.espacioVacio.columna = c;
				
			},
			intercambiarPosicionConEspacioVacio : function(f,c) {
			
				var ficha = this.filas[f] && this.filas[f][c];
				if(ficha){
					var self = juego;
					var aux = this.filas[f][c];
					this.filas[this.espacioVacio.filas][this.espacioVacio.columna] = aux;
					self.moverFichaFilaColumna(aux);
					self.guardarEspacioVacio(f,c);
				}

			},
			chequearSiGano : function() {
					var ban = true;
					var k = 1;
					for (var i = 0; i < 3 ; i++) {
						for (var j = 0; j < 3 ; j++) {
							if (k < 9) {
								if (this.filas[i][j] != null) {
									if (this.filas[i][j].contador != k)// Verifico con contador si gano comparandolo con K.
										ban = false;
								}else{ban = false;}
							}
							k = k+1;
						}
					}
					if(ban==true){
						setTimeout(function(){ alert("WIN"); }, 10);
						juego.mezclarFichas(200);
					}
					
			},
			mezclarFichas : function(veces) {

				if(veces<=0){return;}

				var that = this;
				var funciones = ['moverHaciaAbajo','moverHaciaArriba','moverHaciaLaIzquierda','moverHaciaLaDerecha'];
				var numeroRandom = Math.floor(Math.random() * 4);
				var nombreDeFuncion = funciones[numeroRandom];
				this[nombreDeFuncion](false);
				setTimeout(function(){
				  that.mezclarFichas(veces-1);
				},10);
			},
  		}

 $(document).ready(function(){
 	juego.iniciar($("#juego"));
 	juego.capturarTeclas();
});
 
