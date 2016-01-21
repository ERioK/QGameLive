.import "utils.js" as Utils

var cate_url = "http://api.m.panda.tv/ajax_get_all_subcate";
var rooms_url = "http://api.m.panda.tv/ajax_get_live_list_by_cate?cate=";
var rooms_url2 = "&pageno=1&pagenum=100";
var base_url = "http://api.m.panda.tv/ajax_get_liveroom_baseinfo?roomid=";
var video_url_1 = "http://pl";
var video_url_2 = ".live.panda.tv/live_panda/";
var video_url_3 = ".flv";
var url_end = "&__version=1.0.0.1084&__plat=android";
var all_url = "http://api.m.panda.tv/ajax_live_lists?status=2&order=person_num&pageno=";
function getCategory(md){
    var showcatelog = function(data){
        var jsonD = JSON.parse(data);
        var data1 = jsonD.data;
        md.append({psource:"pdlogo.jpg", gtname:"热门直播", cateid:"-1"});
        for(var i = 0; i<data1.length; i++){  //data1.length
            md.append({psource:data1[i].img, gtname:data1[i].cname, cateid:data1[i].ename});
        }
    };
    Utils.getJsonData(cate_url, showcatelog);
}


function getRooms(md, cateid){
    var cat_url;
    var showRooms = function(data){
        var jsonD = JSON.parse(data);
        var data1 = jsonD.data.items;
        for(var i = 0; i<data1.length; i++){  //data1.length
            md.append({psource1:data1[i].pictures.img,
                          gtname1:data1[i].name,
                          roomid:data1[i].id,
                          zbname:data1[i].userinfo.nickName,
                          online:((data1[i].person_num).toString()),
                      });
        }
    };
    if(cateid === "-1"){
        cat_url = all_url;
        for(var i=1;i<10;i++)
            Utils.getJsonData(cat_url + i, showRooms);
    }
    else{
        cat_url = rooms_url + cateid + rooms_url2 + url_end;
        Utils.getJsonData(cat_url, showRooms);
    }
}

function getUrl(roomId){
    var url_t = base_url + roomId;
    var videoOpen = function(data){
        var data = JSON.parse(data).data.info;
        var room_key = data.videoinfo.room_key;
        var plflag = data.videoinfo.plflag;
        var video_url = video_url_1 + plflag[plflag.length - 1] + video_url_2 + room_key + video_url_3;
        Qt.openUrlExternally(video_url);
    };
    Utils.getJsonData(url_t, videoOpen);
}
