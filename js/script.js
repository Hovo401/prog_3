	//x-sexmelu depqum xaxy resete linum
	//z-sexmelu depqum xaxy resret e linaum bayz generaciya chi linum 

	var matrix = [], //glaxavor matrica vory petx e artaxsvi  ekranin
	side =12,    //licheykayi chapsy px-ov

	tip_m=6;


 const socket = io();


window.onkeypress=(event)=>{
socket.emit('event_on',event.code);
}
window.onkeyup=(event)=>{
socket.emit('event_off',event.code);
}


function setup() {
	// frameRate(1);
	
	noStroke();	

} 
let freym=60,freym_statistika_tmer=freym;

socket.on('canvas_run',(data)=>{
	matrix=data.matrix;
	freym_statistika_tmer--;
	if (freym_statistika_tmer==0) {
		freym_statistika_tmer=freym;

		
	}
	 Object_Cnavas.razmer();
	// background('#E7E7E7');
	Object_Cnavas.add(tip_m);
	 fill("#E7E7E7");
	rect(0, 0,side*matrix[0].length , side*matrix.length);

	for (var y = 0; y < matrix.length; y++) {
	    for (var x = 0; x < matrix[y].length; x++) {

		    if (matrix[y][x] != 0) {
		        if (matrix[y][x] == 1) {
		            fill("green");
		        }
		        else if (matrix[y][x] == 2) {
		            fill("#FFDD00");
		        }
		        else if (matrix[y][x] == 3) {
		            fill("#AF001A");
		        }
		         else if (matrix[y][x] == 4) {
		            fill("#0000E4");
		        }
		        else if (matrix[y][x] == 5) {
		            fill("#909");
		        }
		        else if (matrix[y][x] == 6) {
		            fill("#6B6B6B");
		        }
		         rect(x * side, y * side, side, side);
	    	}
		}
	}
	});


socket.on("statistika",(data)=>{
	let doc=document.getElementById("statistik");

	let html_text=`
	
		<ul>    -persanajneri qanaky-</ul>
		<ul>Grass      ${data.n1}</ul>
		<ul>GrassEater ${data.n2}</ul>
		<ul>Predator   ${data.n3}</ul>
		<ul>Svin       ${data.n4}</ul>
	
	`;
doc.innerHTML=html_text;
});

socket.on('grafic',(data)=>{
 span_graf( JSON.parse(data));
});

    function span_graf(data) {
    
            canvas__(data.Grass,1);
            canvas__(data.GrassEater,2);
            canvas__(data.Predator,3);
            canvas__(data.Svin,4);
        
    }
   

function canvas__(znagvac,N) {

        var myCanvas = document.getElementById(`canvasn${N}`);
        var ctx = myCanvas.getContext("2d");
        ctx.clearRect(0, 0, 280, 200);//macrum
        ctx.fillStyle = '#151515';//foni gucn
        ctx.fillRect(0, 0, 280, 200);//fonn
        ctx.strokeStyle = '#B21516';//gci guyn
        ctx.lineWidth = "3";//gci laynutyun
        var mek_angam = true, gg = znagvac.length - 1;
        var x = 280 / gg;

        var y_p;
        for (var i = 0; i < znagvac.length; i++) {//voroshum em amana mec tiv@ vorpesi procent sarqem
            if (i == 0) {
                y_p = znagvac[i];
            }
            else {
                if (y_p < znagvac[i]) {
                    y_p = znagvac[i];
                }
            }
        }
        y_p /= 100;
        for (var i = 0; i < znagvac.length; i++) {
            if (mek_angam) {
                mek_angam = false;
                var y = 149 - znagvac[i] / y_p * 1.47;
                ctx.beginPath();//sksel nkarel@
                ctx.moveTo(0, y);
            }
            else {
                var y = 149 - znagvac[i] / y_p * 1.47;
                ctx.lineTo(x * i, y);
            }
        } y_p *= 100;
        ctx.stroke();
        ctx.beginPath();
        ctx.font = "18px sans-serif";
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#fff";
        ctx.fillText(Math.floor(y_p), 2, 18);
        ctx.stroke();
    }