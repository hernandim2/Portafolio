var myPixelDraw = {
	colorPicked: 0,
	cellColor: "#ecf0f1",
	defaultCells: 30,
	coloring: false,
	fns: {
		calcSize:function(cantCell) {
			var cell = 0;
			var self = this;
			if(!cantCell){
				cell = myPixelDraw.defaultCells;
			}else
			{
				cell=cantCell;
				$("#container").empty();
			}

			var k=Math.pow(cell,2);
			var contenido = null;
			for (var i = 0; i < k; i++) {
				contenido=$("<div>").addClass("cell");//.css("width", (400/cell) +"px").css("height", (400/cell) +"px"))
				contenido.css("width", (400/cell) +"px").css("height", (400/cell) +"px");
					$("#container").append(contenido);  
			};
		},
		reSize:function() {
			valor = parseInt($("input").val() || myPixelDraw.defaultCells);
			console.log(valor);
			if (valor > "0" && valor <= "50") {
				this.calcSize(valor);
			}else{
				alert("El numero debe ser mayor a 0 y menor que 50");
			}
		},
		detectMouseUp:function() {
			$(document).on('mouseup',function(event) {
				myPixelDraw.coloring = false;
			});
		},
		colorPalette:function() {
			$("#color-pick > *").each(function(index, el) {
				$(el).css("background-color",$(el).attr("class"));
			});


		},
		pickColor:function() {

			 $("#color-pick > div").on('click',function() {
				$(this).removeClass('select');
				myPixelDraw.colorPicked = $(this).attr("class");
				$(this).addClass("select");
			});
		},
			colorIt:function() {
				console.log("ASDASDS");
			$(document).on('mousedown','#container .cell',function(event) {
					event.preventDefault();
					myPixelDraw.coloring = true;
					if (event.button == 2) {
						$(this).css("background-color",myPixelDraw.cellColor);
					}else{
						$(this).css("background-color",myPixelDraw.colorPicked);
					}

				});         
			},
		colorOnDrag:function() {
			$(document).on('mousemove',function(event) {
				if (myPixelDraw.coloring == true) {
					var x = event.clientX;
					var y = event.clientY
					elem = document.elementFromPoint(x,y);
					if($(elem).hasClass('cell') && event.button != 2){
						$(elem).css('background-color', myPixelDraw.colorPicked);
					}else if ($(elem).hasClass('cell') && event.button == 2) {
						$(elem).css('background-color',myPixelDraw.cellColor);
					}
				}
			});



		},
		reset:function() {
			$('#reset').on('click',function() {
				$('.cell').css('background-color',myPixelDraw.cellColor);
			});
		},
		toggleBorders: function() {
            $('#toggle-border').on('click', function() {
                $('.cell').toggleClass('no-border');
            });
        },
		diseableRightClick:function() {
			myPixelDraw.container.on('contextmenu', function() {
				return false;
			});
		},
		grabImage:function() {
			$('#ok').on('click', function(event) {
				var container = document.getElementById('container');
				html2canvas(container,{
					onrendered: function(canvas) {
						document.body.appendChild(canvas);
					}
				});
				console.log('hecho');
			});
		}
	},
	init:function(container) {
			this.container = container;
			var self = this.fns;
			Object.keys(self).forEach(function(key) {
				self[key]();
			});
			 container.empty();
		},
};

$(document).ready(
	function() {
	myPixelDraw.init($("#container"));
	myPixelDraw.fns.calcSize();
	});