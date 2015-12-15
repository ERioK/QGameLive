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
    console.log(cateid);
    var cat_url;
    cat_url = rooms_url + cateid + rooms_url2;
    var showRooms = function(data){
        var jsonD = JSON.parse(data);
        var data1 = jsonD.data.rooms;
        console.log(data1.length);
        for(var i = 0; i<data1.length; i++){  //data1.length
            //console.log(data1[i].room_src);
            md.append({psource1:data1[i].spic, gtname1:data1[i].title, roomid:data1[i].id});
        }
    };
    Utils.getJsonData(cat_url, showRooms);
}

function getUrl(roomId){
    var url_t = video_url1 + roomId + video_url2;
    console.log(url_t);
    var videoOpen = function(data){
        var data = JSON.parse(data).data;
        var videoId = data.videoId;
        var r_url = real_url1 + videoId + real_url2;
        var furl = "rtmp://dlrtmp.cdn.zhanqi.tv/zqlive/" + videoId;
        Qt.openUrlExternally(furl);
        //Utils.getJsonData(r_url, function(furl){
        //    Qt.openUrlExternally(furl);
        //});
    };
    Utils.getJsonData(url_t, videoOpen);
}
