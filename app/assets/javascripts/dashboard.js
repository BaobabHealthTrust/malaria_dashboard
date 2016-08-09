function __$(id){
    return document.getElementById(id);
}

function resize(){
    __$("left").style.height = (__$("container").offsetHeight - __$("header").offsetHeight) + "px";
    __$("overall-drug-graph").style.height = 0.24*(__$("container").offsetHeight - __$("header").offsetHeight ) + "px";
    __$("sites-drug-graph").style.height = 0.74*(__$("container").offsetHeight - __$("header").offsetHeight) + "px";
    __$("sites-drug-graph-container").style.height = 0.74*(__$("container").offsetHeight - __$("header").offsetHeight) + "px";
    __$("overall-ind-table").style.height = 0.62*(__$("container").offsetHeight - __$("header").offsetHeight ) + "px";
    __$("overall-ind-graphs").style.height = 0.358*(__$("container").offsetHeight - __$("header").offsetHeight ) + "px";
    __$("pie").style.height = 0.358*(__$("container").offsetHeight - __$("header").offsetHeight ) + "px";

    var tds = __$("indicators-table").getElementsByClassName("td");
    var tableHeight = parseInt(__$("overall-ind-table").style.height.match(/\d+/)[0]);
    for(var i = 0; i < tds.length; i++){
        //tds[i].style.height = "9vmax"; //(0.06*tableHeight) + "px";
    }
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

            var a = data;

            var keys = new Array();
            var values = new Array();

            for (var key in a) {
                keys.push(key);
                values.push(a[key]);
            }

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
                        fontSize: '1.6em'
                    }
                },
                xAxis: {
                    categories: keys,
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
                    data: values
                }]
            });
        },
        siteDrugConsumptionGraph:function(site, data, id) {

            var a = data;

            var keys = new Array();
            var values = new Array();

            for (var key in a) {
                keys.push(key);
                values.push(a[key]);
            }

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
                        fontSize: '1.6em'
                    }
                },
                xAxis: {
                    categories: keys,
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
                    data: values
                }]
            });
        },
        pie4ReportedCases: function(data){

            $(function () {
                $('#pie').highcharts({
                    chart: {
                        type: 'pie',
                        options3d: {
                            enabled: true,
                            alpha: 45,
                            beta: 0
                        },
                        margin: [11, 4, -11, 4],
                        spacingTop: 7,
                        spacingBottom: 0,
                        spacingLeft: 0,
                        spacingRight: 0
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Reported Cases',
                        style:{
                            fontWeight: 'bold',
                            fontSize: '2em'
                        }
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            size: '96%',
                            allowPointSelect: true,
                            cursor: 'pointer',
                            depth: 45,
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}',
                                style:{
                                    fontWeight: 'bold',
                                    fontSize: '17px'
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Reported Cases',
                        data: [
                            {
                                name: "Presumed",
                                y: 25,
                                color: "red"

                            },
                            {
                                name: "Confirmed",
                                y: 45
                            }
                        ]
                    }]
                });
            });
        },
        barU5: function(){


            $(function () {
                // Set up the chart
                var chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'bar',
                        type: 'column',
                        options3d: {
                            enabled: true,
                            alpha: 15,
                            beta: 15,
                            depth: 50,
                            viewDistance: 25
                        }
                    },
                    credits: {
                        enabled: false
                    },

                    title: {
                        text: 'U5',
                        style:{
                            fontWeight: 'bold',
                            fontSize: '2em'
                        }
                    },
                    plotOptions: {
                        column: {
                            depth: 25,
                            dataLabels: {
                                format: '{point.name}',
                                style:{
                                    fontWeight: 'bold',
                                    fontSize: '1.3em'
                                }
                            }
                        }
                    },
                    xAxis: {
                        categories: ["Male", "Female"],
                        labels: {
                            style: {
                                fontSize:'1.3em',
                                fontWeight: 'bold'
                            }
                        }
                    },yAxis: {
                        title: {
                            text: ''
                        },
                        labels: {
                            style: {
                                fontSize: '1.3em',
                                fontWeight: 'bold'
                            }
                        }
                    },

                    series: [{
                        showInLegend: false,
                        data: [
                            {
                                name: 'Male',
                                y: 30
                            },
                            {
                                name: 'Female',
                                y: 70
                            }
                        ]
                    }]
                });

            });
        }
    }
}());

function pageScroll() {

    scrolling = true;

    height = __$("sites-drug-graph-container").scrollTop;

    __$("sites-drug-graph-container").scrollTop += yJump;

    if (height == __$("sites-drug-graph-container").scrollTop){

        scrollDelay = 5000;

        if(height != 0){

            yJump = -0.0015*window.innerHeight;

        }else{

            yJump = 0.0015*window.innerHeight;
        }
    }else{

        scrollDelay = 10;

    }

    setTimeout("pageScroll()",scrollDelay);

}