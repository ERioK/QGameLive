import QtQuick 2.5
import QtQuick.Controls 1.4
import QtQuick.Window 2.2
import QtQuick.Dialogs 1.2
import QtQuick.Layouts 1.1
import QtQml.Models 2.1

//import "douyu.js" as DouyuJs
//import "panda.js" as PandaJs
import "main.js" as MainJs
Window {
    visible: true
    id:mainwindow
    Component.onCompleted:{
        if(Qt.platform.os != "android"){
            mainwindow.width = 600;
            mainwindow.height = 800;
            setX(Screen.width / 2 - width / 2);
            setY(Screen.height / 2 - height / 2);
        }
        MainJs.setSite("douyu");
    }
    property string currcid
    Rectangle{
        opacity:0.9
        id:menubar
        height:parent.height / 20
        width:parent.width
        color:"lightgrey"
        z: 1
        Text{
            height:parent.height
            id:backbutton
            visible:false
            font.pixelSize:height* 3 /4
            text:"Back"
            MouseArea{
                anchors.fill: parent
                onClicked:{
                    roomview.visible = false;
                    cateview.visible = true;
                    sitename.visible = true;
                    roommodel.clear();
                    backbutton.visible = false;
                }
            }
        }
        Text{
            id:catename
            height:parent.height
            font.pixelSize:parent.height * 3 /4
            anchors.horizontalCenter: parent.horizontalCenter
        }

        ComboBox {
            id:sitename
            anchors.right: parent.right
            width: 180
            height:parent.height
            model: [ "douyu","panda","zhanqi","huomao"]
            onCurrentTextChanged:{
                console.log("changed: = " + sitename.textAt(sitename.currentIndex));
                catemodel.clear();
                MainJs.setSite(sitename.currentText);
                MainJs.getCategory(catemodel);
            }
        }
    }

    Component {
        id: catedele    //游戏类型目录
        Item{
            id:cateitem
            width:cateview.cellWidth
            height:cateview.cellHeight
            Image{
                id:pic
                width:parent.width-9
                height:width * 1.4
                fillMode:Image.PreserveAspectFit
                anchors.horizontalCenter: parent.horizontalCenter
                anchors.top:parent.top
                source:psource
                MouseArea{
                    anchors.fill: parent
                    onClicked:{
                        cateview.visible = false;
                        roomview.visible = true;
                        backbutton.visible = true;
                        sitename.visible = false;
                        MainJs.getRooms(roommodel, tlabel2.text);
                        currcid = tlabel2.text;
                    }
                }
            }
            Label{
                id:gname
                width:parent.width
                height:parent.height - pic.height
                anchors.top:pic.bottom
                horizontalAlignment:Text.AlignHCenter
                text: gtname
                font.weight:Font.DemiBold
                font.pixelSize:height
                fontSizeMode:Text.VerticalFit
                wrapMode: Text.WordWrap
            }
            Label{
                id:tlabel2
                text:cateid
                visible:false
            }
        }
    }

    Component {
        id: gamecate    //直播间目录
        Item{
            Rectangle{
                id:gameitem
                width:roomview.cellWidth 
                height:roomview.cellHeight
                Image{
                    id:pic1
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.top:parent.top
                    width:parent.width - 10
                    height:this.width * 9 / 16
                    source:psource1
                    MouseArea{
                        anchors.fill: parent
                        onClicked:{
                            MainJs.getUrl(tlabel.text);
                        }
                    }
                }
                Label{
                    id:gname1
                    width:parent.width
                    height:(parent.height-pic1.height) * 3 / 5
                    anchors.top:pic1.bottom
                    anchors.left:pic1.left
                    font.weight:Font.DemiBold
                    font.pixelSize:height
                    fontSizeMode:Text.VerticalFit
                    text: gtname1
                    wrapMode: Text.Wrap
                }
                Label{
                    id:pname
                    height:(parent.height-pic1.height) * 2 / 5
                    anchors.left:pic1.left
                    anchors.top:gname1.bottom
                    anchors.bottom:parent.bottom
                    text: zbname
                    font.pixelSize:height
                }
                Label{
                    id:anum
                    anchors.right:pic1.right
                    anchors.top:gname1.bottom
                    anchors.bottom:parent.bottom
                    height:(parent.height-pic1.height) * 2 / 5
                    //fontSizeMode:Text.VerticalFit
                    font.pixelSize:height
                    text:online
                }
                Label{
                    id:tlabel
                    text:roomid
                    visible:false
                }
            }
        }
    }

    Rectangle{
        width:parent.width
        height:parent.height - menubar.height
        anchors.top:menubar.bottom
        GridView {
            width:parent.width
            height:parent.height
            Layout.alignment: Qt.AlignCenter
            anchors.centerIn: parent
            id: cateview
            cellWidth: cateview.width / 3
            cellHeight: this.cellWidth * 1.45
            model: catemodel
            delegate: catedele
        }

        GridView {
            visible:false
            width:parent.width
            height:parent.height
            Layout.alignment: Qt.AlignCenter
            anchors.centerIn: parent
            id: roomview
            cellWidth: roomview.width / 2
            cellHeight: this.cellWidth * 11 / 16
            model: roommodel
            delegate: gamecate
            onMovementEnded: {
                if(atYBeginning){
                    roommodel.clear();
                    MainJs.getRooms(roommodel, currcid);
                }
            }
        }
    }
    ListModel {
        id: catemodel
    }

    ListModel {
        id: roommodel
    }

}
