let GlavniClass=require('./GlavniClass');
module.exports =class GrassEater extends GlavniClass{//___________________xotakeri class_________________________

    constructor(x,y,tip=2,noteat_lim=5,eat_mull_lim=5) {
        super(x,y,tip);
        this.noteat = 0;
        this.eat_mull =0;
    }

    qayl() {
    	let newCellr;

    	if (this.chooseCell(1,true)==undefined) {
    		newCellr =this.chooseCell(0,true);
    		this.eat_mull=0;
    		this.noteat++;
    	}
    	else{
    		 newCellr =this.chooseCell(1,true);
    		 this.eat_mull++;
    		 this.noteat=0;
    	}

        if (this.eat_mull>=4) {
            this.eat_mull=0;
            var object_=new GrassEater(this.x,this.y);

            this.mull(newCellr[0],newCellr[1],1,object_);
        }
        else if(this.noteat>=50){
            this.del();
        }
    	else if (newCellr!=undefined) {
    		this.eat(newCellr[0],newCellr[1],1);
    	}    	
    	
    }

}
function random(zangvac){
    return zangvac[rand(0,zangvac.length-1)];
}
function rand(min, max) {
    return Math.round((max - min) * Math.random()) + min;
}
