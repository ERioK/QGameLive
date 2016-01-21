function getJsonData(url, callback){
    var req = new XMLHttpRequest;
    req.open("GET", url);
    req.send();
    req.onreadystatechange = function() {
        var status = req.readyState;
        if(status == 4){
            loading.visible = false;
            callback(req.responseText);
        }
    }
}

