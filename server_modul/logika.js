// --------conect__class------

let Grass=require('./Grass');
let GrassEater=require('./GrassEater');
let Predator=require('./Predator');
let user = require('./User');
let Svin = require('./Svin').svin;
// let motikanal=require('./Svin').motikanal;
// ------------end------------

//---------module.exports---------------
module.exports={
	play:play,
	generator:generator,
	del:del,
	newObject:newObject
}
//---------module.exports end-----------




// generator(100,50,300,40,40);


//---------play controler----------
function play(_ArrObject,matrix){
	 var matrix=matrix;
	 var _ArrObject=_ArrObject;
		for(var i in _ArrObject[1]){
		       _ArrObject[1][i].mul(matrix);
		}

	  	for(var j = _ArrObject[2].length-1 ; j>=0 ;j--){
		       _ArrObject[2][j].qayl(matrix);
		}
		for(var j = _ArrObject[3].length-1 ; j>=0 ;j--){
		       _ArrObject[3][j].qayl(matrix);
		}
		matrix=user.control_klav(matrix,user);
			for(var i in _ArrObject[5]){
		       _ArrObject[5][i].qayl(user);
		}
		

		return { matrix:matrix,_ArrObject:_ArrObject }
}
//------------------controler end-------------


let Svin_parametr = require('./Svin').Svin_parametr;
let exanak=0;
setInterval(()=>{//exanak
	if (exanak==0) {
		Svin_parametr("Low");
	}
	else if(exanak==1){
		Svin_parametr("normal");
		
	}
	else if(exanak==2){
		Svin_parametr("xard");
		exanak=-1;
	}
	exanak++;
},5000);



//====---------function(){}--------====

function generator(x=100,y=50,n1=300,n2=50,n3=20,n5=0){//glxavor maricayi mej random tvyalner spami function
	
	matrix=[];
	_ArrObject=[0,[],[],[],0,[],0];
	for (let i =0;i<y;i++) {
		matrix[i]=[];
		for (let g =0;g<x;g++) {
			matrix[i][g]=0;
		}
	}

	for (let i = 0;i<n1;i++) {
		matrix[rand(0,matrix.length-1)][rand(0,matrix[0].length-1)]=1;
	}
	for (let i = 0;i<n2;i++) {
		matrix[rand(0,matrix.length-1)][rand(0,matrix[0].length-1)]=2;
	}
	for (let i = 0;i<n3;i++) {
		matrix[rand(0,matrix.length-1)][rand(0,matrix[0].length-1)]=3;
	}
	for (let i = 0;i<n5;i++) {
		matrix[rand(0,matrix.length-1)][rand(0,matrix[0].length-1)]=5;
	}
	matrix[user.y][user.x]=4;
	spam_matric_object();
	return { matrix:matrix,_ArrObject:_ArrObject }
}
function spam_matric_object(){
	for(let i = 0; i < matrix.length; ++i){
	   for(let j = 0; j < matrix[i].length; j++){
	       newObject(i,j);
	   }
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

function newObject(i,j){
	if(matrix[i][j] == 1){
	           let GrassNew = new Grass(j,i,1);
	           _ArrObject[1].push(GrassNew);
	       }
	       else if(matrix[i][j] == 2){
	       		let GrassEaterNew = new GrassEater(j,i,2);
	           _ArrObject[2].push(GrassEaterNew);
	       }
	       else if(matrix[i][j] == 3){
	       		let PredatorNew = new Predator(j,i,3);
	       		_ArrObject[3].push(PredatorNew);
	       }
	        else if(matrix[i][j] == 5){
	       		let newSvin = new Svin(j,i,5,user);
	       		_ArrObject[5].push(newSvin);
	       }	
	     
}
function rand(min, max) {
	return Math.round((max - min) * Math.random()) + min;
}
function random(zangvac){
	return zangvac[rand(0,zangvac.length-1)];
}
