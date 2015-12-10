.import "douyu.js" as Douyu
.import "panda.js" as Panda
.import "zhanqi.js" as Zhanqi
.import "huomao.js" as Huomao
var Site;

var str2Site = {"douyu":Douyu,
                "panda":Panda,
                "zhanqi":Zhanqi,
                "huomao":Huomao,
}

function setSite(name) {
//    if(name === "douyu")
//        Site = Douyu;
//    else if(name === "panda")
//        Site = Panda;
    Site = str2Site[name];
}

function getCategory(md){
    Site.getCategory(md);
}

function getRooms(md, cateid){
    Site.getRooms(md, cateid);
}

function getUrl(roomId){
    Site.getUrl(roomId);
}
