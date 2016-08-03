function __$(id){
    return document.getElementById(id);
}

function resize(){
    __$("left").style.height = (__$("container").offsetHeight - __$("header").offsetHeight) + "px";
    __$("overall-drug-graph").style.height = 0.24*(__$("container").offsetHeight - __$("header").offsetHeight ) + "px";
    __$("sites-drug-graph").style.height = 0.74*(__$("container").offsetHeight - __$("header").offsetHeight) + "px";
    __$("sites-drug-graph-container").style.height = 0.74*(__$("container").offsetHeight - __$("header").offsetHeight) + "px";
    __$("overall-ind-table").style.height = 0.65*(__$("container").offsetHeight - __$("header").offsetHeight ) + "px";
    __$("overall-ind-graphs").style.height = 0.338*(__$("container").offsetHeight - __$("header").offsetHeight ) + "px";
}

function loadSiteRow(id){
    var row = document.createElement("tr");
    var td = document.createElement("td");
    td.id = id;
    row.appendChild(td);
    td.style.height = __$("overall-drug-graph").style.height;
    td.className = "site-drug-graph";
    __$("sites-drug-graph-div").appendChild(row);
}

var dashboard = (function() {

    return {
        avgDrugConsumptionGraph:function(data) {

            var xKeys = Object.keys(data);

            $('#overall-drug-graph').highcharts({
                chart: {
                    backgroundColor: '#FCFFC5'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Average Drug Consumption',
                    x: -20, //center
                    style:{
                        fontWeight: 'bold',
                        fontSize: '17px'
                    }
                },
                xAxis: {
                    categories: xKeys,
                    labels: {
                        style: {
                            fontSize:'1.25em',
                            fontWeight: 'bold'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Tins/Month'
                    },
                    labels: {
                        style: {
                            fontSize:'1.25em',
                            fontWeight: 'bold'
                        }
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: 'Tins/Month'
                },
               series: [{
                    showInLegend: false,
                    name: 'avg_drg_cons',
                    data: [7.0, 1.9, 42.5, 14.5, 18.2, 21.5]
                }]
            });
        },
        siteDrugConsumptionGraph:function(site, data, id) {

            var xKeys = Object.keys(data);

            $('#' + id).highcharts({
                chart: {
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: site,
                    x: -20, //center
                    style:{
                        fontWeight: 'bold',
                        fontSize: '17px'
                    }
                },
                xAxis: {
                    categories: xKeys,
                    labels: {
                        style: {
                            fontSize:'1.25em',
                            fontWeight: 'bold'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Tins/Month'
                    },
                    labels: {
                        style: {
                            fontSize:'1.25em',
                            fontWeight: 'bold'
                        }
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: 'Tins/Month'
                },
                series: [{
                    showInLegend: false,
                    name: 'avg_drg_cons',
                    data: [7.0, 1.9, 42.5, 14.5, 18.2, 21.5]
                }]
            });
        }
    }
}());