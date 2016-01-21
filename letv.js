.import "utils.js" as Utils

var param = ["expect=3", "p1=0", "p2=0", "termid=2", "ostype=" + "android", "hwtype=" + "x60", "format=1", "jsonp=?", "platid=10", "playid=1", "splatid=1005"];
var rooms_url = "http://static.api.sports.letv.com/sms/app/v1/episodes?caller=1003&count=20&status=3&liveType=3";
var room_info = "http://static.api.sports.letv.com/sms/app/v1/episodes/" 
var room_info2 = "?caller=1003"
var select_id = "http://api.live.letv.com/v1/liveRoom/single/1005?id="
var streams_url  = "http://api.live.letv.com/v1/stream/1005/"

function getCategory(md){
    var rooms_cb = function(data){
        var jsonD = JSON.parse(data);
        var entries = jsonD.data.entries;
        for(var i = 0; i < entries.length; i++){
            if(entries[i].isTextLive == 1){
                continue;
            }
            if(entries[i].status == 1){
                entries[i].name = "[Live!]" + entries[i].name;
            }
            md.append({psource:entries[i].imageUrl["400*225"], gtname:entries[i].name, cateid:entries[i].id.toString()});
        }
    }
    Utils.getJsonData(rooms_url, rooms_cb);
}

function getRooms(md, cateid){
    var getLiveId = function(data){
        var liveData = JSON.parse(data).data
        var liveId = liveData.lives[0].liveId;
        var getSelectId = function(data){
            var selectId = JSON.parse(data).selectId;
            var getStreams = function(data){
                var rows = JSON.parse(data).rows;
                for(var i = 0; i < rows.length; i++){
                    md.append({psource1:liveData.imageUrl["400*225"],
                                gtname1:rows[i].rateType,
                                roomid:[rows[i].streamUrl, rows[i].streamName, liveId].join(",").toString(),
                                  zbname:" ",
                                  online:" ",
                              });
                }
            }
            Utils.getJsonData(streams_url + selectId, getStreams)
        };
        Utils.getJsonData(select_id + liveId, getSelectId);
    };
    var url = room_info + cateid + room_info2;
    console.log(url + "6666")
    Utils.getJsonData(url, getLiveId);
}

function getUrl(roomId){
    var apikey = "feda8dd6e0127da88f3487a646fe8a6b";
    var datas = roomId.split(",");
    var streamUrl = datas[0];
    streamUrl = streamUrl + "&" +  param.join("&");
    var time = parseInt(new Date().getTime()/1000);
    var tkey = Qt.md5([datas[1], time, apikey].join(","));
    var realurl = streamUrl + "&tm=" + time + "&key=" + tkey + "&liveid=" + datas[2];
    Utils.getJsonData(realurl, function(data){
        data = data.slice(data.indexOf("{"), data.lastIndexOf("}")+1);
        var finalurl = JSON.parse(data).location;
        console.log(finalurl);
        Qt.openUrlExternally(finalurl);
    });
}
