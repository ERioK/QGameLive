.import "utils.js" as Utils

var cate_url = "http://www.zhanqi.tv/api/static/game.lists/70-1.json";
var rooms_url = "http://www.zhanqi.tv/api/static/game.lives/";
var rooms_url2 = "/40-1.json";
var video_url1 = "http://www.zhanqi.tv/api/static/live.roomid/";
var video_url2 = ".json";
var real_url1 = "http://wshdl.load.cdn.zhanqi.tv/zqlive/";
var real_url2 = ".flv?get_url=1";
function getCategory(md){
    var showcatelog = function(data){
        var jsonD = JSON.parse(data);
        var data1 = jsonD.data.games;
        for(var i = 0; i<data1.length; i++){  //data1.length
            md.append({psource:data1[i].spic, gtname:data1[i].name, cateid:data1[i].id});
        }
    };
    Utils.getJsonData(cate_url, showcatelog);
}

function getRooms(md, cateid){
    var cat_url;
    cat_url = rooms_url + cateid + rooms_url2;
    var showRooms = function(data){
        var jsonD = JSON.parse(data);
        var data1 = jsonD.data.rooms;
        for(var i = 0; i<data1.length; i++){  //data1.length
            md.append({psource1:data1[i].spic, gtname1:data1[i].title, roomid:data1[i].id, zbname:data1[i].nickname, online:(data1[i].online).toString()});
        }
    };
    Utils.getJsonData(cat_url, showRooms);
}

function getKey(cdn){
    var MASK = "#{&..?!(";
    var result = '';
    for(var i = 0; i < cdn.length; i++){
        result += String.fromCharCode(MASK[i%8].charCodeAt(0) ^ cdn[i].charCodeAt(0));
    }
    return result;
}

function getUrl(roomId){
    var url_t = video_url1 + roomId + video_url2;
    var videoOpen = function(data){
        var data = JSON.parse(data).data;
        var videoId = data.videoId;
        var cdns = data.flashvars.cdns;
        var ak2 = JSON.parse(Qt.atob(cdns)).ak2;
        var cdn = ak2.split("|")[0].split("-")[1];
        var key = getKey(Qt.atob(cdn));
        var timestr = parseInt(new Date().getTime()/1000 + 1).toString(16);
        var fullkey = key + "/zqlive/" + videoId + timestr;
        var furl = "rtmp://dlrtmp.cdn.zhanqi.tv/zqlive/" + videoId + "?k=" + Qt.md5(fullkey) + "&t=" + timestr;
        Qt.openUrlExternally(furl);
    };
    Utils.getJsonData(url_t, videoOpen);
}
