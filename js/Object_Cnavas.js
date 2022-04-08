var Object_Cnavas ={
	adres:document.getElementsByTagName("canvas"),
	width:0,
	height:0,
	x_m:0,
	y_m:0,
	x_m_p:0,
	y_m_p:0,
	on:false,
	razmer:()=>{
	if (this.width!=window.innerWidth||this.height!=window.innerHeight-5) {
		this.width=window.innerWidth-20;
		this.height=window.innerHeight-25;
		this.adres=document.getElementsByTagName("canvas");
		createCanvas(this.width,this.height);
		let height_side=this.height/matrix.length,
			width_side=this.width/matrix[0].length;
		if(height_side<width_side){ side=height_side; }
		else{ side=width_side; }
	}},
	add:(tip=6)=>{
		canvass=document.getElementsByTagName("canvas")[4];
		window.onmousedown = function(event){
				
				if (event.buttons==1) {
  				Object_Cnavas.on=1;
  				}
  				else{
  					Object_Cnavas.on=2;
  				}
		}
		window.onmouseup = function(){
  				Object_Cnavas.on=false;
  				Object_Cnavas.y_m_p=-1;
  				Object_Cnavas.x_m_p=-1;

		}
		if (Object_Cnavas.on&& Object_Cnavas.x_m!=Object_Cnavas.x_m_p ||Object_Cnavas.on&& Object_Cnavas.y_m!=Object_Cnavas.y_m_p) {		
  		Object_Cnavas.y_m_p=Object_Cnavas.y_m;
  		Object_Cnavas.x_m_p=Object_Cnavas.x_m;
  		if (Object_Cnavas.x_m<=matrix[0].length-1&&Object_Cnavas.y_m<=matrix.length-1) {
	  		if (Object_Cnavas.on==1) {
	  			// del(Object_Cnavas.x_m,Object_Cnavas.y_m,tip);
	  			// newObject(Object_Cnavas.y_m,Object_Cnavas.x_m);
	  			socket.emit('mknik_1',[Object_Cnavas.x_m,Object_Cnavas.y_m,tip_m]);
	  			
	  		}
	  		else{
	  			//del(Object_Cnavas.x_m,Object_Cnavas.y_m,0);
	  			socket.emit('mknik_2',[Object_Cnavas.x_m,Object_Cnavas.y_m]);
	  		}
  		}
  		
  		}

  		canvass.onmousemove = function () {
				 Object_Cnavas.x_m=Math.floor (event.offsetX/side);
  				  Object_Cnavas.y_m=Math.floor (event.offsetY/side);
		}

  	}
  			

	

}

