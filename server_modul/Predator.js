let GlavniClass=require('./GlavniClass');
module.exports =class Predator extends GlavniClass{//___________________xotakeri class_________________________

    constructor(x,y,tip=3,noteat_lim=15,eat_mull_lim=2) {
        super(x,y,tip);
        this.noteat = 0;
        this.eat_mull =0;

    }

    qayl() {
    	let newCellr;
    	if (this.chooseCell(2,false)[0]==undefined&&this.chooseCell(0,false)[0]==undefined) {
			this.noteat+=0.2;
    	}
    	else if(this.chooseCell(2,false)[0]!=undefined){
    		newCellr =this.chooseCell(2);
		    this.eat_mull++;
		    this.noteat=0;
    	}
    	else if(this.chooseCell(1,false)[0]!=undefined){
			this.noteat+=0.2;
    	}
    	else if(this.chooseCell(0,false)[0]!=undefined){
    		newCellr = this.chooseCell(0);
    		
    	 	this.noteat++;
    	}


        if (this.eat_mull>=5&&newCellr[0]!=undefined) {
            this.eat_mull=0;
            var object_=new Predator(this.x,this.y);
            this.mull(newCellr[0],newCellr[1],2,object_);
        }
        else if(this.noteat>=10){
            this.del();
        }
    	else if (newCellr!=undefined) {
    		this.eat(newCellr[0],newCellr[1],2);
    	}    	
    	
    }

}
function random(zangvac){
    return zangvac[rand(0,zangvac.length-1)];
}
function rand(min, max) {
    return Math.round((max - min) * Math.random()) + min;
}