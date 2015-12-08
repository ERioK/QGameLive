.import "utils.js" as Utils

var url_prefix = "http://douyutv.com/api/v1/";
var cate_prefix = "http://api.douyutv.com/api/client/live/"
var all_url = "http://api.douyutv.com/api/client/live?limit=80"
function getUrl(roomId){
    var cctime = new Date().getTime();
    cctime = String(cctime).slice(0,10);
    var md5url = "room/" + roomId + "?aid=android&client_sys=android&time=" + cctime;
    var url_t = url_prefix + md5url + "&auth=" + Qt.md5(md5url + "1231");
    var videoOpen = function(data){
        var a = data.slice(data.indexOf("</html>") + 7);
        var data1 = JSON.parse(a);
        var ans = data1["data"]["rtmp_url"] + "/" +  data1["data"]["rtmp_live"];
        console.log(ans);
        Qt.openUrlExternally(ans);
    };
    Utils.getJsonData(url_t, videoOpen);
}

function getCategory(md){
    var cat_url = "http://api.douyutv.com/api/client/game";
    var showcatelog = function(data){
        var jsonD = JSON.parse(data);
        var data1 = jsonD.data;
        md.append({psource:data1[2].game_src, gtname:"直播", cateid:"-1"});
        for(var i = 0; i<data1.length; i++){  //data1.length
            if(data1[i].game_name === "英雄联盟")   //信仰2=w=
                continue;
            var aa =md.append({psource:data1[i].game_src, gtname:data1[i].game_name, cateid:data1[i].cate_id});
        }
    };
    Utils.getJsonData(cat_url, showcatelog);
}


function getRooms(md, cateid){
    var cat_url;
    if(cateid === "-1")
        cat_url = all_url;
    else
        cat_url = cate_prefix + cateid + "?limit=50";
    var showRooms = function(data){
        var jsonD = JSON.parse(data);
        var data1 = jsonD.data;
        for(var i = 0; i<data1.length; i++){  //data1.length
            //console.log(data1[i].room_src);
            md.append({psource1:data1[i].room_src, gtname1:data1[i].room_name, roomid:data1[i].room_id});
        }
    };
    Utils.getJsonData(cat_url, showRooms);
}
