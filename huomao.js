.import "utils.js" as Utils

var added_str = "EU*T*)*(#23ssdfd";
var cate_url1 = "http://api.huomaotv.com/index.php?m=api&c=android&a=get_gamelists&time=";
var cate_url2 = "&token=";
var rooms_url = "http://api.huomaotv.com/index.php?m=api&c=android&a=channel_list&gid=";
var video_url = "http://api.huomaotv.com/index.php?m=api&c=android&a=get_live&cid=";
var curr_cid ;
function getCategory(md){
    var curr_time = parseInt(new Date().valueOf() / 1000);
    var timehash = Qt.md5(curr_time + added_str);
    var cate_url = cate_url1 + curr_time + cate_url2 + timehash;
    var showcatelog = function(data){
        data = data.substr(data.indexOf("/html>") + 6);
        var jsonD = JSON.parse(data);
        var data1 = jsonD.data;
        for(var i = 0; i<data1.length; i++){  //data1.length
            md.append({psource:data1[i].image, gtname:data1[i].cname, cateid:data1[i].gid});
        }
    };
    Utils.getJsonData(cate_url, showcatelog);
}

function getRooms(md, cateid){
    curr_cid = cateid;
    var curr_time = parseInt(new Date().valueOf() / 1000);
    var hashstr = curr_time + "1" + cateid + added_str;
    var url = rooms_url + cateid + "&page=1&time=" + curr_time + "&token=" + Qt.md5(hashstr);
    var showRooms = function(data){
        data = data.substr(data.indexOf("/html>") + 6);
        var jsonD = JSON.parse(data);
        var data1 = jsonD.data.list;
        for(var i = 0; i<data1.length; i++){  //data1.length
            //console.log(data1[i].room_src);
            md.append({psource1:data1[i].image, gtname1:data1[i].channel, roomid:data1[i].cid});
        }
    };
    Utils.getJsonData(url, showRooms);
}

function getUrl(roomId){
    var quality = ["TD", "HD", "SD"];
    var curr_time = parseInt(new Date().valueOf() / 1000);
    var hashstr = "nulla" + curr_time + "a" + curr_cid + roomId + added_str;
    var url = video_url + roomId + "&&tt=a&uid=null&gid=" + curr_cid + "&t=a&time=" + curr_time + "&token=" + Qt.md5(hashstr) ;
    var videoOpen = function(data){
        data = data.substr(data.indexOf("/html>") + 6);
        var data = JSON.parse(data).data;
        for(var i = 0; i< quality.length; i++){
            if(data.streamList[2][quality[i]]){
                var f_url = data.streamList[2][quality[i]];
                console.log(f_url);
                Qt.openUrlExternally(f_url);
                return 
            }
        };
    };
    Utils.getJsonData(url, videoOpen);
}
