module.exports ={
	x:0,
	y:0,
	w:false,
	s:false,
	a:false,
	d:false,
	clic:(event,on_off,user)=>{
		if (on_off) {
			if (event=="KeyW"){ user.w="w";}
			if (event=="KeyS"){ user.s="s";}
			if (event=="KeyA"){ user.a="a";}
			if (event=="KeyD"){ user.d="d";}
		}
		else{
			if (event=="KeyW"){ user.w=false;}
			if (event=="KeyS"){ user.s=false;}
			if (event=="KeyA"){ user.a=false;}
			if (event=="KeyD"){ user.d=false;}
		}
	},
	proverka:(x,y,user,matrix)=>{
			
			if (matrix[y][x]!=6) {
				matrix[user.y][user.x]=0;
				if (matrix[y][x]!=5) {
					del(x,y,4);
				}
				 matrix[y][x]=4;
				user.x=x;
				user.y=y;
			}
			return matrix;

	},
	control_klav:(matrix ,user)=>{

		if(user.w=="w"&&user.y>0){
			matrix =user.proverka(user.x,user.y-1,user,matrix);
		}
		if(user.s=="s"&&user.y<matrix.length-1){
			matrix =user.proverka(user.x,user.y+1,user,matrix);
		}
		if(user.a=="a"&&user.x>0){
			matrix =user.proverka(user.x-1,user.y,user,matrix);
		}
		if(user.d=="d"&&user.x<matrix[0].length-1){
			matrix =user.proverka(user.x+1,user.y,user,matrix);
		}
		return matrix;
	}

}

function del(x,y,j=0,tip){
	if (tip==undefined) {tip=matrix[y][x];}
	
    	for (var i in _ArrObject[tip]) {
  		  if (x == _ArrObject[tip][i].x && y == _ArrObject[tip][i].y) {
    		    _ArrObject[tip].splice(i, 1);
    		   break;
   		  }
		}	
		matrix[y][x] = j;
    }