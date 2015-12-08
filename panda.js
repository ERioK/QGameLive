.import "utils.js" as Utils

var cate_url = "http://api.m.panda.tv/ajax_get_all_subcate";
var rooms_url = "http://api.m.panda.tv/ajax_get_live_list_by_cate?cate=";
var rooms_url2 = "&pageno=1&pagenum=100";
var base_url = "http://api.m.panda.tv/ajax_get_liveroom_baseinfo?roomid=";
var video_url_1 = "http://pl";
var video_url_2 = ".live.panda.tv/live_panda/";
var video_url_3 = ".flv";
var url_end = "&__version=1.0.0.1084&__plat=android";
function getCategory(md){
    var showcatelog = function(data){
        var jsonD = JSON.parse(data);
        var data1 = jsonD.data;
        //md.append({psource:data1[1].img, gtname:"直播", cateid:"-1"});
        for(var i = 0; i<data1.length; i++){  //data1.length
            md.append({psource:data1[i].img, gtname:data1[i].cname, cateid:data1[i].ename});
        }
    };
    Utils.getJsonData(cate_url, showcatelog);
}

function getRooms(md, cateid){
    console.log(cateid);
    var cat_url;
    if(cateid === "-1")
        cat_url = all_url;
    else
        cat_url = rooms_url + cateid + rooms_url2 + url_end;
    var showRooms = function(data){
        var jsonD = JSON.parse(data);
        var data1 = jsonD.data.items;
        console.log(data1.length);
        for(var i = 0; i<data1.length; i++){  //data1.length
            //console.log(data1[i].room_src);
            md.append({psource1:data1[i].pictures.img, gtname1:data1[i].name, roomid:data1[i].id});
        }
    };
    Utils.getJsonData(cat_url, showRooms);
}

function getUrl(roomId){
    var url_t = base_url + roomId;
    console.log(url_t);
    var videoOpen = function(data){
        console.log(data);
        var data = JSON.parse(data).data.info;
        var room_key = data.videoinfo.room_key;
        var plflag = data.videoinfo.plflag;
        var video_url = video_url_1 + plflag[plflag.length - 1] + video_url_2 + room_key + video_url_3;
        console.log(video_url);
        Qt.openUrlExternally(video_url);
    };
    Utils.getJsonData(url_t, videoOpen);
}
