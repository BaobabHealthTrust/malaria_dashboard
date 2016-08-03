function __$(id){
    return document.getElementById(id);
}

function resize(){
    __$("left").style.height = (__$("container").offsetHeight - __$("header").offsetHeight ) + "px";
    __$("overall-drug-graph").style.height = 0.24*(__$("container").offsetHeight - __$("header").offsetHeight ) + "px";
    __$("sites-drug-graph").style.height = 0.75*(__$("container").offsetHeight - __$("header").offsetHeight ) + "px";
    __$("overall-ind-table").style.height = 0.65*(__$("container").offsetHeight - __$("header").offsetHeight ) + "px";
    __$("overall-ind-graphs").style.height = 0.3385*(__$("container").offsetHeight - __$("header").offsetHeight ) + "px";
}