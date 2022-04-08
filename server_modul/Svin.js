let GlavniClass=require('./GlavniClass');

//=======parametri========
var
    motikanal=true,
    rejim="Low",
    energi_smerti=-8,
    energi_mull=1,

    energi_angorcutyan   =  -0.004 ,
    energi_sharjum_azat  =  -0.05 ,
    energi_kananch       =  -0.01  ,
    energi_dexiny        =  .01     ;

module.exports.motikanal =(true_on)=>{
 if (true_on!=undefined) {
     motikanal=true_on;
 }
 return motikanal;
}
//========================

exports.Svin_parametr= function (rejimr){
    let n1,n2,n3,n4;    
    switch(rejimr) {
        case "Low": 
            n1=-0.001;
            n2=-0.01;
            n3=-0.04;
            n4=.01;
            rejim="Low";
        break;
        case "normal":
            n1=-0.04;
            n2=-0.05;
            n3=-0.1;
            n4=1;
            rejim="normal";
        break;
        case "xard":   
            n1=-0.09;
            n2=-0.1;
            n3=-0.4;
            n4=3;
            rejim="xard";
        break;
    }
console.log(energi_angorcutyan);
energi_angorcutyan   =  n1 ;
energi_sharjum_azat  =  n2 ;
energi_kananch       =  n3 ;
energi_dexiny        =  n4 ;

}

//========================

module.exports.svin = class Svin extends GlavniClass{
	constructor(x=10, y=10,tip=5,user) {
		super(x,y,tip);
        this.user=user;
		this.usX=user.x;
		this.usY=user.y;
		this.zagerjka=2;
		this.matrix_lengt_y=matrix.length;
		this.matrix_lengt_x=matrix[0].length;
        this.energi=0;
	}
	 new_directions_8(x,y){
    return [
    	[x    , y    ],
        [x - 1, y - 1],
        [x    , y - 1],
        [x + 1, y - 1],
        [x - 1, y    ],
        [x + 1, y    ],
        [x - 1, y + 1],
        [x    , y + 1],
        [x + 1, y + 1]  ]
    }
    kord_heravorutyun(x,y,x1,y1){
    	return Math.sqrt((x-x1)**2+(y-y1)**2);
    }


    chooseCell(){
    	let kord_qayli=[] , her_dur;
let her;
    	for (var i of this.new_directions_8(this.x,this.y)) {

    		if(i[0]>=0&&i[1]>=0&&i[0]<this.matrix_lengt_x&&i[1]<this.matrix_lengt_y){
                if (matrix[i[1]][i[0]]==2&&rejim=="Low") {
                    return i;
                }
    			 her=this.kord_heravorutyun(i[0],i[1],this.usX,this.usY);


    			if (her>=1&&matrix[i[1]][i[0]]!=5&&matrix[i[1]][i[0]]!=6||her>=1&&i[1]==this.y&&i[0]==this.x) {
	    			

			    	if(kord_qayli[0]==undefined){
			    		kord_qayli=i; her_dur=her; continue;
			    	}
			
                    if (motikanal) {
			    	if (her<her_dur) {kord_qayli=i;her_dur=her;}
                    }
                    if (!motikanal) {
                    if (her>her_dur) {kord_qayli=i;her_dur=her;}
                    }
				}

	    	}
    	}
    	
    	if(kord_qayli[0]!=undefined){
    	return kord_qayli;}
    }
    qayl(user){
    	if (this.zagerjka<=0) {
        	this.usX=user.x;
    		this.usY=user.y;
        	let kor=this.chooseCell();
        	if (kor!=undefined&&matrix[kor[1]][kor[0]]!=undefined) {
                this.exanak(kor);
                this.zagerjka+=0.4;
                this.x=kor[0];
                this.y=kor[1];
        	}
            else{
                this.energi+=energi_angorcutyan;

            }
    	}
    	else{
    		 this.zagerjka--;
    	}
    }
    mullr(x,y){
        if (this.energi<-2) {
            this.energi=-2;
        }
        if (energi_dexiny<=0.1&&this.energi<0) {
            this.energi=1;
        }
         if (this.energi>=energi_mull) {
            let object_=new Svin(x,y,5,this.user);
            _ArrObject[5].push(object_);
            matrix[y][x]=5;
            this.energi=0;
         }
    }
    exanak(kor){
       let el= matrix[kor[1]][kor[0]];
        switch(el) {

            case 1: 
                 if (this.energi<=energi_smerti) {
                     del(this.x,this.y,5,1);
                    del(kor[0],kor[1],0,1);
                    this.del();

                    break;
                } 
                
                del(this.x,this.y,0,1);
                del(kor[0],kor[1],0,1);
                this.energi+=energi_kananch;
            break;

            case 2:
            del(this.x,this.y,5,1);
                matrix[this.y][this.x]=0;
                del(kor[0],kor[1],5);
                this.energi+=energi_dexiny;
                this.mullr(this.x,this.y);
                
            break;

            case 3:   
            del(this.x,this.y,5,1);
                this.del();
                del(kor[0],kor[1],0);
            break;
           
          default:
          del(this.x,this.y,5,1);
          if (this.energi<=energi_smerti) {
                    this.del();
                    break;
                }
            matrix[this.y][this.x]=0;
            del(kor[0],kor[1],5);
             this.energi+=energi_sharjum_azat;

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