sites = [];
cur_site = "";
data = {};
function __$(id){
    return document.getElementById(id);
}
$.fn.fadeSlideRight = function(speed,fn) {
    return $(this).animate({
        'opacity' : 1,
        'width' : '750px'
    },speed || 400, function() {
        $.isFunction(fn) && fn.call(this);
    });
}

$.fn.fadeSlideLeft = function(speed,fn) {
    return $(this).animate({
        'opacity' : 0,
        'width' : '0px'
    },speed || 400,function() {
        $.isFunction(fn) && fn.call(this);
    });
}

function resize(){
    __$("container").style.height = 0.985 * window.innerHeight + "px";
    __$("left").style.height = (__$("container").offsetHeight - __$("header").offsetHeight) + "px";
    __$("overall-drug-graph").style.height = 0.24*(__$("container").offsetHeight - __$("header").offsetHeight ) + "px";
    __$("sites-drug-graph").style.height = 0.73*(__$("container").offsetHeight - __$("header").offsetHeight) + "px";
    __$("sites-drug-graph-container").style.height = 0.73*(__$("container").offsetHeight - __$("header").offsetHeight) + "px";
    __$("overall-ind-table").style.height = 0.59*(__$("container").offsetHeight - __$("header").offsetHeight ) + "px";
    __$("overall-ind-graphs").style.height = 0.385*(__$("container").offsetHeight - __$("header").offsetHeight ) + "px";
    __$("pie").style.height = 0.385*(__$("container").offsetHeight - __$("header").offsetHeight ) + "px";

    var tds = __$("indicators-table").getElementsByClassName("td");
    var tableHeight = window.innerHeight;
    for(var i = 0; i < tds.length; i++){
        tds[i].style.height = (0.075*tableHeight) + "px";
    }

    var tds = __$("indicators-table").getElementsByClassName("th");
    var tableHeight = window.innerHeight;
    for(var i = 0; i < tds.length; i++){
        tds[i].style.height = (0.075*tableHeight) + "px";
    }

    __$("indicators-table").style.display = "table";
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

function loadSiteIndicators(site, data, animate, universal_data){
    data = data["data"];
    if (animate == true){
        jQuery("#overall-ind-table").fadeSlideLeft(1500);
    }
    __$("indicator-caption").innerHTML = site;
    var categories = ["Today", "This Month", "This Quarter", "This Year"];
    var categories_html_ids = ["today", "month", "quarter", "year"];

    for(var i = 0; i < categories.length; i++){
        if((categories[i] == 'Today' && universal_data[cur_site]['obsolete_today']) ||
            (categories[i] == 'This Quarter' && universal_data[cur_site]['obsolete_quarter']) ||
            (categories[i] == 'This Month' && universal_data[cur_site]['obsolete_month']) ||
            (categories[i] == 'This Year' && universal_data[cur_site]['obsolete_year'])){
            __$('reported_cases').getElementsByClassName(categories_html_ids[i])[0].innerHTML = 0;
            __$('positives').getElementsByClassName(categories_html_ids[i])[0].innerHTML = 0;
            __$('first_line').getElementsByClassName(categories_html_ids[i])[0].innerHTML = 0;
            __$('treated_negatives').getElementsByClassName(categories_html_ids[i])[0].innerHTML = 0;
            __$('malaria_in_pregnancy').getElementsByClassName(categories_html_ids[i])[0].innerHTML = 0;

            continue;
        }

        __$('reported_cases').getElementsByClassName(categories_html_ids[i])[0].innerHTML = data[categories[i]]['reported_cases'];

        __$('positives').getElementsByClassName(categories_html_ids[i])[0].innerHTML =
            Math.round(((parseInt(data[categories[i]]['microscopy_positives']) + parseInt(data[categories[i]]['mRDT_positives'])) /
                (parseInt(data[categories[i]]['microscopy_orders']) + parseInt(data[categories[i]]['mRDT_orders']))) * 100 || 0);

        __$('first_line').getElementsByClassName(categories_html_ids[i])[0].innerHTML =
            Math.round(parseInt(data[categories[i]]['first_line_dispensations']) /
                parseInt(data[categories[i]]['all_dispensations']) * 100 || 0);

        __$('treated_negatives').getElementsByClassName(categories_html_ids[i])[0].innerHTML =
            Math.round(parseInt(data[categories[i]]['treated_negatives']) /
                (parseInt(data[categories[i]]['microscopy_negatives']) + parseInt(data[categories[i]]['mRDT_negatives'])) * 100 || 0);

        __$('malaria_in_pregnancy').getElementsByClassName(categories_html_ids[i])[0].innerHTML =
            Math.round(parseInt(data[categories[i]]['malaria_in_pregnancy']) /
                (parseInt(data[categories[i]]['reported_cases'])) * 100 || 0);
    }

    if (animate == true){

       jQuery("#overall-ind-table").fadeSlideRight(1500);

    }

}

function ajaxLoad(pos, animate){
    jQuery.ajax(
        {
            url: 'ajax_dashboard',
            success: function (data) {
                data = JSON.parse(data);
                avg_trends = data['average_dispensation_trends'];

                delete data['average_dispensation_trends'];

                sites = Object.keys(data);
                pos = (pos >= sites.length) ? 0 : pos;
                cur_site = sites[pos];
                cur_data = data[cur_site]["data"];

                jQuery("#sites-drug-graph-div").empty();

                resize();

                var months = {1 : 'Jan', 2 : 'Feb', 3 : 'Mar', 4 : 'Apr', 5 : 'May', 6 : 'Jun', 7 : 'Jul', 8 : 'Aug', 9 : 'Sep', 10 : 'Oct', 11 : 'Nov', 12 : 'Dec'};

                var avg_values = {};
                for(var i = 0; i < avg_trends.length; i ++){
                    var data_arr = avg_trends[i];
                    var month = parseInt((data_arr[0]).toString().slice(-2));
                    var m = months[month] + ((i == 10) ? ( "'" + data_arr[0].toString().slice(2, 4)) : "");
                    avg_values[m] = parseInt(avg_trends[i][1]);
                }

                loadSiteIndicators(cur_site, data[cur_site], animate, data);

                for (var j = 0; j < sites.length; j++){

                    loadSiteRow(sites[j]);
                    var dt = data[sites[j]]["data"];
                    var values = {};

                    try {
                        for (var i = 0; i < dt['dispensation_trends'].length; i++) {
                            var data_arr = dt['dispensation_trends'][i];
                            var month = parseInt((data_arr[0]).toString().slice(-2));
                            var m = months[month] + ((i == 10) ? ( "'" + data_arr[0].toString().slice(2, 4)) : "");
                            values[m] = parseInt(dt['dispensation_trends'][i][1]);
                        }

                        dashboard.siteDrugConsumptionGraph(sites[j], values, sites[j]);
                    }catch(e){}
                }

                dashboard.avgDrugConsumptionGraph(avg_values);

                if(data[cur_site]['obsolete_today']){

                  __$("pie").innerHTML = "<div class='nodata'><br /><br /><span class='sub-title'>No Data Today</span></div>";

                }else {

                    var confirmed = parseInt(cur_data["Today"]['microscopy_positives']) + parseInt(cur_data["Today"]['mRDT_positives']);
                    var treated_negatives = parseInt(cur_data["Today"]['microscopy_positives']) + parseInt(cur_data["Today"]['mRDT_positives']);

                    var presumed = parseInt(cur_data["Today"]['presumed_and_confirmed']) - (confirmed + treated_negatives);

                    dashboard.pie4ReportedCases({"Presumed": presumed, "Confirmed": confirmed});

                }

                if(data[cur_site]['obsolete_quarter']){

                    __$("bar").innerHTML = "<div class='nodata'><br /><br /><span class='sub-title'>No Data This Quarter</span></div>";

                }else {

                    var u5_males = parseInt(cur_data["This Quarter"]['under_five_males']);

                    var u5_females = parseInt(cur_data["This Quarter"]['under_five_females']);

                    dashboard.barU5({"Female": u5_females, "Male": u5_males});
                }

                setTimeout(function(){ajaxLoad((pos + 1), true)}, 15000);
            }
        }
    );
}

var dashboard = (function() {

    return {
        avgDrugConsumptionGraph:function(data) {

            var a = data;
            var i = 1;
            var keys = new Array();
            var values = new Array();

            for (var key in a) {
                keys.push(key);
                values.push(a[key]);
            }
            try{
                $('#overall-drug-graph').highcharts().destroy();
            }catch(e){}

            $('#overall-drug-graph').highcharts({
                chart: {
                    backgroundColor: '#FCFFC5'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Avg Malaria Treatments',
                    x: -20, //center
                    style:{
                        fontWeight: 'bold',
                        fontSize: '1.5em'
                    }
                },
                xAxis: {

                    categories: keys,
                    labels: {
                        formatter: function() {
                            i += 1;
                            return ((i) % 2 == 0 ? this.value : '');
                        },
                        style: {
                            fontSize:'1.2em',
                            fontWeight: 'bold'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: ' Treated Cases',
                        style: {
                            fontSize:'1.1em',
                            fontWeight: 'bold'
                        }
                    },
                    labels: {
                        style: {
                            fontSize:'1.2em',
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
                    valueSuffix: 'Treated Cases'
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
            var i = 1;
            var keys = new Array();
            var values = new Array();

            for (var key in a) {
                keys.push(key);
                values.push(a[key]);
            }

            var container = document.getElementById(id);

            try{
                $(container).highcharts().destroy();
            }catch(e){}

            $(container).highcharts({
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
                        fontSize: '1.45em'
                    }
                },
                xAxis: {

                    categories: keys,
                    labels: {
                        formatter: function() {
                            i += 1;
                            return ((i) % 2 == 0 ? this.value : '');
                        },
                        style: {
                            fontSize:'1.2em',
                            fontWeight: 'bold'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Treated Cases',
                        style: {
                            fontSize:'1.1em',
                            fontWeight: 'bold'
                        }
                    },
                    labels: {
                        style: {
                            fontSize:'1.2em',
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
                    valueSuffix: ' Treated Cases'
                },
                series: [{
                    showInLegend: false,
                    name: 'avg_drg_cons',
                    data: values
                }]
            });
        },
        pie4ReportedCases: function(data){
            try {
                $('#pie').highcharts().destroy();
            }catch(e){}

            $(function () {
                $('#pie').highcharts({
                    chart: {
                        type: 'pie',
                        options3d: {
                            enabled: true,
                            alpha: 45,
                            beta: 0
                        },
                        margin: [20, 0, 0, 200],
                        spacingTop: 7,
                        spacingBottom: 0,
                        spacingLeft: 0,
                        spacingRight: 0
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: "Reported Cases",
                        style:{
                            fontWeight: 'bold',
                            fontSize: '2em'
                        }
                    },
                    subtitle: {
                        text: 'Today',
                        style:{
                            fontWeight: 'bold',
                            fontSize: '1.5em',
                            color: 'black'
                        }
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            showInLegend: true,
                            size: '96%',
                            allowPointSelect: true,
                            cursor: 'pointer',
                            depth: 45,
                            dataLabels: {
                                enabled: false
                            }
                        }
                    },
                    legend: {
                        itemStyle: {
                            fontSize:'20px',
                            fontWeight: 'bold'
                        },
                        align: 'left',
                        layout: 'vertical',
                        verticalAlign: 'top',
                        x: 15,
                        y: 100,
                        fontSize: '2em'
                    },
                    series: [{
                        type: 'pie',
                        name: 'Reported Cases',
                        size: '95%',
                        data: [
                            {
                                name: "Presumed",
                                y: data["Presumed"],
                                color: "red"

                            },
                            {
                                name: "Confirmed",
                                y: data["Confirmed"]
                            }
                        ]
                    }]
                });
            });
        },
        barU5: function(data){

            try {
                $('#bar').highcharts().destroy();
            }catch(e){}

            $(function () {
                // Set up the chart
                var chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'bar',
                        type: 'column'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: "Under-Five Cases",
                        style:{
                            fontWeight: 'bold',
                            fontSize: '2em'
                        }
                    },
                    subtitle: {
                        text: 'This Quarter',
                        style:{
                            fontWeight: 'bold',
                            fontSize: '1.5em',
                            color: 'black'
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
                                y: data['Male']
                            },
                            {
                                name: 'Female',
                                y: data['Female']
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
;
