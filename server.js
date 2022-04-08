
 var matrix=  [], //glaxavor matrica vory petx e artaxsvi  ekranin
 _ArrObject=[0,[],[],[],0,[],0],

 tip_m=6;
 

//--------------------------
let user = require('./server_modul/User');
let logika = require('./server_modul/logika');
generator=logika.generator(90,50,250,33,33);
matrix      =generator.matrix;
_ArrObject  =generator._ArrObject;


//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static("."));
server.listen(3000);


app.get('/', function (req, res) {
    res.redirect('index.html');
});


var lim=60,freym_kadr=0;

function res_matrix(){
generator=logika.play(_ArrObject,matrix);
matrix      =generator.matrix;
_ArrObject  =generator._ArrObject;
if (freym_kadr<=0) {
    let grass=iskat_1_nishov_qani_tar_ka(matrix,1);
    let GrassEater=iskat_1_nishov_qani_tar_ka(matrix,2);
    let Predator=iskat_1_nishov_qani_tar_ka(matrix,3);
    let svin=iskat_1_nishov_qani_tar_ka(matrix,5);
    freym_kadr=lim;
    io.emit('statistika',{n1:grass,n2:GrassEater,n3:Predator,n4:svin});

    zapis_file({
                Grass:grass,
                GrassEater:GrassEater,
                Predator:Predator,
                Svin:svin
            });
    fs.readFile("./statistics.json",'utf8',(err,data)=>{
        io.emit('grafic',data);
    });
}freym_kadr--;

io.emit('canvas_run',{matrix:matrix});
}
setInterval(res_matrix,30);


//! SERVER STUFF END  --  END

io.on('connection',(socket)=>{
        if (matrix==[]) {
            generator=logika.generator(90,50,250,33,33);
            matrix      =generator.matrix;
            _ArrObject  =generator._ArrObject;
            io.emit('canvas_run',{matrix:matrix});
        }

    socket.on('event_on',(event)=>{
      
        if (event=="KeyX") {
            generator=logika.generator(90,50,250,33,33,20);
            matrix      =generator.matrix;
            _ArrObject  =generator._ArrObject;
            game_on=true;
        }
        if (event=="KeyZ") {
            generator=logika.generator(90,50,0,0,0);
            matrix      =generator.matrix;
            _ArrObject  =generator._ArrObject;
            game_on=true;
        }
        user.clic(event,true,user);
        if (event=="KeyI") {
        require('./server_modul/Svin').motikanal(!require('./server_modul/Svin').motikanal());
        }
       if (event=="KeyP") {openr();}//panely bacel ppakelu hamar
    });

    socket.on('event_off',(event)=>{
        user.clic(event,false,user);
    });
    socket.on('mknik_1',(maxiv_xy)=>{
        logika.del(maxiv_xy[0],maxiv_xy[1],maxiv_xy[2]);
        logika.newObject(maxiv_xy[1],maxiv_xy[0]);
    });
    socket.on('mknik_2',(maxiv_xy)=>{
        logika.del(maxiv_xy[0],maxiv_xy[1],0);
    });
    
});

function iskat_1_nishov_qani_tar_ka(data_,tar){
    let qanak=0;
    let data = JSON.stringify(data_);
    for(i in data){
        if(data[i]==tar){
            qanak++;
        }
    }
    return qanak;
}



var fs = require('fs');

function zapis_file(data_1,adres="./statistics.json",lim=40){

    fs.readFile(adres,'utf8',(err,data)=>{
        let info_obfect;

        if (data!=""&&data!=undefined) {
            info_obfect= JSON.parse(data);
            for(i in info_obfect){
                for (g in data_1) {
                    if (i==g) {
                        info_obfect[i].push(data_1[g]);
                    }
                }
            }
            while(info_obfect.Grass.length>=lim){
                for(i in info_obfect){
                    info_obfect[i].splice(info_obfect[i], 1);                   
                }
            }
        }
        else{
            info_obfect={
                Grass:[data_1.Grass],
                GrassEater:[data_1.GrassEater],
                Predator:[data_1.Predator],
                Svin:[data_1.Svin]
            };
        }
        
       fs.writeFile(adres,JSON.stringify(info_obfect),(err,data)=>{});
    });
   
}



