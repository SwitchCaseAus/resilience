const url = 'https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/Planning/DA_Tracking/MapServer/0/query?where=1=1&outFields=PLANNING_PORTAL_APP_NUMBER&returnGeometry=true&f=geojson';
const allDataUrl = 'https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/Planning/DA_Tracking/MapServer/0/query?where=1=1&outFields=PLANNING_PORTAL_APP_NUMBER,COUNCIL_NAME,STATUS,TYPE_OF_DEVELOPMENT,APPLICATION_TYPE&returnGeometry=false&f=pjson&resultRecordCount=4000&resultOffset=0';
var webURL5 = 'data/jobseeker.json';
var webURL2 = 'data/liquor.json';
var webURL3 = 'data/employment.json';
var webURL6 = 'data/crime.json';
var webURL7 = 'data/industry.json';

var totalEmploymentData = [];
var employmentData = [];
var liquorData = [];
var totalJobkeeperData = [];
var numberData = [];
var april = [];
var may = [];
var selectedCouncil = [];
var seekerData = [];
var totalSeekerData = [];
var ageData = [];
var age1 = [];
var age2 = [];
var age3 = [];
var age4 = [];
var age5 = [];
var totalAgeData = [];
var totalMigrantData = [];
var migrantData = [];
var totalCrimeData = [];
var crimeData = [];
var rankData = [];
var industryData = [];
var totalIndustryData = [];
$(document).ready(function () {






    GetCouncilList(allDataUrl).done(function (data) {



        councilDropdown(data);
        statusDropdown(data);
        daList(data);
        var councilMapUrl = createMapUrl('All', 'LIVERPOOL CITY COUNCIL');
        //initMap(councilMapUrl);


    });

    GetTotalType().done(function (data) {

        liquorData = data;

        //buildProfitData(data, 'All', "chart2");


        //drawChart2();


    });
    GetIndustryType().done(function (data) {

        industryData = data;

        buildIndustryData(data, 'All', "chart9");


        // drawChart9();


    });
    GetNumberType().done(function (data) {
        numberData = data;


        buildNumberData(numberData, 'All', "chart3");


        // drawChart3();



    });



    GetSeekerType().done(function (data) {
        seekerData = data;


        buildSeekerData(seekerData, 'All', "chart4");


        // drawChart4();



    });

    GetAgeType().done(function (data) {
        ageData = data;
        migrantData = data;


        buildAgeData(ageData, 'All', "chart6");
        buildAgeData(ageData, 'All', "chart7");


        //  drawChart6();
        //  drawChart7();



    });
    GetCrimeType().done(function (data) {
        crimeData = data;

        rankData = data;
        buildCrimeData(ageData, 'All', "chart8");



        //  drawChart6();
        //  drawChart7();



    });



    $('#councils').on('change', function () {

        $('.charts').addClass('show');
        category = $(this).children("option:selected").val();
        if (category === 'All') {
            $('.charts').removeClass('show');
        }

        may.length = 0;
        april.length = 0;
        totalCrimeData.length = 0;
        totalMigrantData.length = 0;

        totalSeekerData.length = 0;
        totalIndustryData.length = 0;

        selectedCouncil = $(this).children("option:selected").val();
        var selectedStatus = $("#status").children("option:selected").val();


        var councilMapUrl = createMapUrl(selectedStatus, selectedCouncil);
        var councilListUrl = createStatusUrl(selectedStatus, selectedCouncil);


        GetCouncilList(councilListUrl).done(function (data) {
            buildNumberData(numberData, selectedCouncil, "chart3");
            buildSeekerData(seekerData, selectedCouncil, "chart4");
            buildAgeData(ageData, selectedCouncil, "chart6");
            buildAgeData(migrantData, selectedCouncil, "chart7");
            buildCrimeData(crimeData, selectedCouncil, "chart8");
            buildIndustryData(industryData, selectedCouncil, "chart9");


            drawChart9();

            drawChart4();
            drawChart3();
            drawChart6();
            drawChart7();
            drawChart8();
            updateCharts();

            totalsInfographic(selectedCouncil);

            daList(data);

            initMap(councilMapUrl);


        });


    });





    $('#status').on('change', function () {

        var selectedStatus = $(this).children("option:selected").val();
        var selectedCouncil = $("#councils").children("option:selected").val();
        var councilMapUrl = createMapUrl(selectedStatus, selectedCouncil);

        var councilListUrl = createStatusUrl(selectedStatus, selectedCouncil);


        GetCouncilList(councilListUrl).done(function (data) {



            daList(data);

            initMap(councilMapUrl);


        });


    });


});
(function (H) {

    var pendingRenders = [];

    // https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
    function isElementInViewport(el) {

        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (
                window.innerHeight ||
                document.documentElement.clientHeight
            ) &&
            rect.right <= (
                window.innerWidth ||
                document.documentElement.clientWidth
            )
        );
    }

    H.wrap(H.Series.prototype, 'render', function deferRender(proceed) {
        var series = this,
            renderTo = this.chart.container.parentNode;

        // It is appeared, render it
        if (isElementInViewport(renderTo) || !series.options.animation) {
            proceed.call(series);

            // It is not appeared, halt renering until appear
        }
        else {
            pendingRenders.push({
                element: renderTo,
                appear: function () {
                    proceed.call(series);
                }
            });
        }
    });

    function recalculate() {
        pendingRenders.forEach(function (item) {
            if (isElementInViewport(item.element)) {
                item.appear();
                H.erase(pendingRenders, item);
            }
        });
    }

    if (window.addEventListener) {
        ['DOMContentLoaded', 'load', 'scroll', 'resize']
        .forEach(function (eventType) {
            addEventListener(eventType, recalculate, false);
        });
    }

}(Highcharts));

function GetTotalType() {

    var deffer = $.Deferred();

    $.getJSON(webURL2, function (data) {

        deffer.resolve(data);
    });
    return deffer.promise();
}

function updateCharts() {

    chart4.series[0].setData(totalSeekerData);
    // chart5.series[0].setData(totalEmploymentData);
    chart3.series[0].setData(april);
    chart3.series[1].setData(may);
    chart6.series[0].setData(age1);
    chart7.series[0].setData(totalMigrantData);
    chart8.series[0].setData(totalCrimeData);
    chart9.series[0].setData(totalIndustryData);
    // chart6.series[1].setData(age2);
    // chart6.series[2].setData(age3);
    // chart6.series[3].setData(age4);
    // chart6.series[4].setData(age5);

    //chart3.series[0].setData(totalJobkeeperData);

    // chart1.redraw();
}

function GetNumberType() {

    var deffer = $.Deferred();

    $.getJSON(webURL3, function (data) {

        deffer.resolve(data);
    });


    return deffer.promise();
}

function GetSeekerType() {

    var deffer = $.Deferred();

    $.getJSON(webURL5, function (data) {

        deffer.resolve(data);
    });


    return deffer.promise();
}

function GetAgeType() {

    var deffer = $.Deferred();

    $.getJSON(webURL5, function (data) {

        deffer.resolve(data);
    });


    return deffer.promise();
}

function GetCrimeType() {

    var deffer = $.Deferred();

    $.getJSON(webURL6, function (data) {

        deffer.resolve(data);
    });


    return deffer.promise();
}

function GetIndustryType() {

    var deffer = $.Deferred();

    $.getJSON(webURL7, function (data) {

        deffer.resolve(data);
    });


    return deffer.promise();
}


function chartType(item, chart) {
    switch (chart) {

    case "chart5":
        totalEmploymentData.push([item]);
        break;
    case "chart3":
        april.push([item.Postcode, convertInt(item.April)]);
        may.push([item.Postcode, convertInt(item.May)]);

        break;
    case "chart4":
        totalSeekerData.push(["Females", item.GENDER_F]);
        totalSeekerData.push(["Males", item.GENDER_M]);


        break;
    case "chart6":
        age1.push(["Under 25", item.AGE_U25]);
        age1.push(["Age 25-35", item.AGE_25_34]);
        age1.push(["Age 35-44", item.AGE_35_44]);
        age1.push(["Age 45-54", item.AGE_45_54]);
        age1.push(["Age 55 and above", item.AGE_55_PLUS]);



        break;
    case "chart7":
        totalMigrantData.push(["Born in Australia", item.BORN_AU]);
        totalMigrantData.push(["Born overseas", item.BORN_OTH]);




        break;

    case "chart8":
        totalCrimeData.push(["2015", item.Year_2015]);
        totalCrimeData.push(["2016", item.Year_2016]);
        totalCrimeData.push(["2017", item.Year_2017]);
        totalCrimeData.push(["2018", item.Year_2018]);
        totalCrimeData.push(["2019", item.Year_2019]);

        break;
    case "chart9":
        totalIndustryData.push([item.Industry, item.Total]);
        break;


    }
}


function buildNumberData(data, category, chart) {


    $.each(data, function (index, item) {



        if (item.Council === category) {

            chartType(item, chart);







        }
    });
}

function buildSeekerData(data, category, chart) {


    $.each(data, function (index, item) {



        if (item.Council === category) {

            chartType(item, chart);







        }
    });
}

function buildAgeData(data, category, chart) {


    $.each(data, function (index, item) {



        if (item.Council === category) {

            chartType(item, chart);







        }
    });
}

function buildCrimeData(data, category, chart) {


    $.each(data, function (index, item) {



        if (item.Council === category) {

            chartType(item, chart);







        }
    });
}

function buildIndustryData(data, category, chart) {


    $.each(data, function (index, item) {





        chartType(item, chart);








    });
}



function toTitleCase(str) {
    str = String(str).toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}

function drawChart3() {

    chart3 = Highcharts.chart('container3', {
        chart: {
            type: 'column'
        },

        title: {
            text: 'Jobkeeper applications received for every postcode in ' + toTitleCase(selectedCouncil),
            align: 'center'
        },
        subtitle: {
            text: 'Data source from ATO',
            align: 'center'
        },
        xAxis: [{
                type: 'category',
                crosshair: true,
                title: {
                    text: 'Postcodes in ' + toTitleCase(selectedCouncil)
                },

        },



        ],
        plotOptions: {
            column: {
                pointPadding: 0.1,

                groupPadding: 0.2,


            }
        },
        tooltip: {

            shared: true,
            useHTML: true,


            formatter: function () {
                var s = '';

                $.each(this.points, function (i, point) {
                    s += '</br><span style="color:' + point.color + '">●</span>Applications in ' + point.series.name + ' :' + point.y;
                });

                return s;
            },

            // formatter: function ()
            // {

            // 	return 'The total costs for ' + this.point.name + ' is ' + '$' + numberConvert(this.y);
            // }
        },

        yAxis: [{


                title: {
                    text: 'Total Applications'
                },
            },


        ],




        series: [{
                name: 'April',

                data: april
						},

            {
                name: 'May',

                data: may
						},



        ],

    });
}

function drawChart6() {

    chart6 = Highcharts.chart('container6', {
        chart: {
            type: 'bar'
        },

        title: {
            text: 'Jobseeker applications by various age groups in ' + toTitleCase(selectedCouncil),
            align: 'center'
        },
        subtitle: {
            text: 'Data source from Department of Education, Skills and Employment',
            align: 'center'
        },
        xAxis: [{
                type: 'category',
                crosshair: true,
                title: {
                    text: 'Age group in ' + toTitleCase(selectedCouncil)
                },

        },



        ],
        plotOptions: {
            column: {
                pointPadding: 0.1,

                groupPadding: 0.2,


            }
        },
        tooltip: {
            pointFormat: 'Percentage application received : <b>{point.y:.1f}%'
        },

        yAxis: [{


                title: {
                    text: 'Total Applications'
                },
            },


        ],




        series: [{
                name: 'Under 25',

                data: age1
						},
//         {
//             name: '25-34 years',

//             data: age2
// 		},
//         {
//             name: '35-44 years',

//             data: age2
// 		},
//         {
//             name: '45-54 years',

//             data: age4
// 		},
//         {
//             name: '55 years and above',

//             data: age5
// 		},



        ],

    });
}

function drawChart4() {

    chart4 = Highcharts.chart('container4', {
        chart: {
            type: 'pie'
        },

        title: {
            text: 'Jobseeker applications by Gender for ' + toTitleCase(selectedCouncil),
            align: 'center'
        },
        subtitle: {
            text: 'Data source from Department of Education, Skills and Employment',
            align: 'center'
        },
        xAxis: {
            type: 'Postcode',
            crosshair: true
        },
        tooltip: {
            pointFormat: 'Percentage application received : <b>{point.percentage:.1f}%'
        },

        yAxis: [{


                title: {
                    text: 'Total Applications'
                },
            },


        ],




        series: [{


                name: 'Total number of Jobseeker applications for :',
                data: totalSeekerData,


        },



        ],

    });
}

function drawChart7() {

    chart7 = Highcharts.chart('container7', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
            //type: 'pie'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            }
        },

        title: {
            text: 'Percentage of people on Jobseeker by place of their birth in ' + toTitleCase(selectedCouncil),
            align: 'center'
        },
        subtitle: {
            text: 'Data source from Department of Education, Skills and Employment',
            align: 'center'
        },
        xAxis: {
            type: 'Postcode',
            crosshair: true
        },
        tooltip: {
            pointFormat: 'Percentage application received : <b>{point.percentage:.1f}%'
        },

        yAxis: [{


                title: {
                    text: 'Total Applications'
                },
            },


        ],




        series: [{
                type: 'pie',
                name: 'Jobseekers by place of birth',
                innerSize: '50%',

                name: 'Total number of Jobseeker applications for :',
                data: totalMigrantData,


        },



        ],

    });
}



function drawChart8() {


    chart8 = Highcharts.chart('container8', {
        chart: {
            type: 'spline'
        },

        title: {
            text: 'Domestic Violence cases per 100,000 in last 5 years for ' + toTitleCase(selectedCouncil),
            align: 'center'
        },
        subtitle: {
            text: 'Data source from BOCSAR',
            align: 'center'
        },
        xAxis: {
            type: 'category',

            crosshair: true
        },
        yAxis: [{


                title: {
                    text: 'Domestic Violence Cases'
                },
            },


        ],




        series: [{


                name: 'Cases per 100,000',
                data: totalCrimeData

        },


        ],

    });
}

function drawChart9() {


    chart9 = Highcharts.chart('container9', {
        chart: {
            type: 'areaspline'
        },

        title: {
            text: 'Total number of people employed per Indutry in 2019',
            align: 'center'
        },
        subtitle: {
            text: 'Data source from ATO',
            align: 'center'
        },
        xAxis: {
            type: 'category',

            crosshair: true
        },
        yAxis: [{


                title: {
                    text: 'People Employed'
                },
            },


        ],




        series: [{


                name: 'Total people employed',
                data: totalIndustryData

        },


        ],

    });
}


function createMapUrl(status, council) {
    // council = "LIVERPOOL CITY COUNCIL";
    var mapUrl = url;
    if ((!status || status === 'All') && (!council || council === 'All')) {
        return mapUrl;
    }
    if ((!status || status === 'All')) {
        mapUrl = "https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/Planning/DA_Tracking/MapServer/0/query?where=COUNCIL_NAME='" + council + "' &outFields=PLANNING_PORTAL_APP_NUMBER&returnGeometry=true&f=geojson";
        return mapUrl;
    }

    if (!council || council === 'All') {
        mapUrl = "https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/Planning/DA_Tracking/MapServer/0/query?where=STATUS ='" + status + "'&outFields=PLANNING_PORTAL_APP_NUMBER&returnGeometry=true&f=geojson";
        return mapUrl;
    }

    mapUrl = "https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/Planning/DA_Tracking/MapServer/0/query?where=COUNCIL_NAME='" + council + "'AND STATUS ='" + status + "'&outFields=PLANNING_PORTAL_APP_NUMBER&returnGeometry=true&f=geojson";
    return mapUrl;


}

function createStatusUrl(status, council) {
    // council = "LIVERPOOL CITY COUNCIL";
    var mapUrl = url;
    if ((!status || status === 'All') && (!council || council === 'All')) {
        return mapUrl;
    }
    if ((!status || status === 'All')) {
        mapUrl = "https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/Planning/DA_Tracking/MapServer/0/query?where=COUNCIL_NAME='" + council + "'&outFields=PLANNING_PORTAL_APP_NUMBER,COUNCIL_NAME,STATUS,TYPE_OF_DEVELOPMENT,APPLICATION_TYPE&returnGeometry=true&f=pjson";
        return mapUrl;
    }

    if (!council || council === 'All') {
        mapUrl = "https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/Planning/DA_Tracking/MapServer/0/query?where=STATUS ='" + status + "'&outFields=PLANNING_PORTAL_APP_NUMBER,COUNCIL_NAME,STATUS,TYPE_OF_DEVELOPMENT,APPLICATION_TYPE&returnGeometry=true&f=pjson";
        return mapUrl;
    }


    mapUrl = "https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/Planning/DA_Tracking/MapServer/0/query?where=COUNCIL_NAME='" + council + "' AND STATUS ='" + status + "'&outFields=PLANNING_PORTAL_APP_NUMBER,COUNCIL_NAME,STATUS,TYPE_OF_DEVELOPMENT,APPLICATION_TYPE&returnGeometry=true&f=pjson";
    return mapUrl;


}

function GetCouncilList(fetchUrl) {

    var deffer = $.Deferred();

    //throw new Error("my error message");
    $.ajax({
        url: fetchUrl,
        type: "GET",
        headers: {
            "Accept": "application/json;odata=verbose"
        }
        // return data format

    }).done(function (data) {


        deffer.resolve(data);

    });
    return deffer.promise();
}

function spinner(ref) {

    $(ref).html('<div class="spinner-border text-primary show" role="status"><span class="sr-only">Loading...</span> </div>');

}

function councilDropdown(data)

{

    //create a council array var uniqueArray = ;
    var councils = [];

    var listItems = "<option value= 'All'>All</option>";

    $.each(JSON.parse(data).features, function (index, item) {


        councils.push(item.attributes.COUNCIL_NAME);

    });

    var councils = councils.sort(function (a, b) {
        if (a < b) return -1;
        else if (a > b) return 1;
        return 0;
    });


    $.each(Array.from(new Set(councils)), function (index, item) {

        if (item != 'All') {
            // item = toTitleCase(item);
            listItems += "<option value='" + item +
                "'>" + item + "</option>";
        }
    });




    $('#councils').html(listItems);


}

function statusDropdown(data)

{
    var dastatus = [];

    var listItems = "<option value= 'All'>All</option>";

    $.each(JSON.parse(data).features, function (index, item) {



        dastatus.push(item.attributes.STATUS);

    });


    $.each(Array.from(new Set(dastatus)), function (index, item) {

        if (item != 'All') {
            listItems += "<option value='" + item +
                "'>" + item + "</option>";
        }
    });




    $('#status').html(listItems);


}

function daList(data)

{

    //create a council array var uniqueArray = ;


    var listItems = [];
    var count = (JSON.parse(data).features).length;

    if (count > 0) {
        listItems = "<strong>" + count + " results found </strong>";
        $.each(JSON.parse(data).features, function (index, item) {


            listItems += "<div class='card mt-2'>" + "<div class='card-header'><h5><span class='badge badge-light'>" + item.attributes.STATUS + "</span></h4></div>" + "<div class='card-body'><h6 class='card-title'>" + item.attributes.TYPE_OF_DEVELOPMENT + "</h6>" + "</div><div class='card-footer bg-transparent '><small style='color:#5c348b;'>" + item.attributes.APPLICATION_TYPE + "</small></div></div>";


        });
    }
    else {

        listItems = "<div class='card'><h4>No results found</h4></div>";

    }




    $('#daDesc').html(listItems).addClass('p-3 overflowVert');


}


function initMap(councilUrl) {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: { lat: -33.5, lng: 151.209 }
    });
    var bounds = new google.maps.LatLngBounds();
    var image = 'assets/house.png';

    // Create an array of alphabetical characters used to label the markers.



    var infowindow = new google.maps.InfoWindow();

    if (!councilUrl) { councilUrl = url; }

    map.data.loadGeoJson(councilUrl, null, function (features) {



        var markers = features.map(function (feature) {
            var appNum = feature.getProperty('PLANNING_PORTAL_APP_NUMBER');
            var marker = new google.maps.Marker({
                icon: image,
                position: feature.getGeometry().get(0)
            });


            marker.addListener('click', function () {
                //      infowindow.open(map, marker);
                load_content(map, infowindow, marker, appNum);


            });
            bounds.extend(marker.getPosition());

            return marker;
        });


        map.fitBounds(bounds);

        var options = {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            gridSize: 80,
            maxZoom: 12,
        };
        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers, options);

    });



    map.data.setMap(null);

}


function load_content(map, infowindow, marker, id) {
    $.ajax({
        url: "https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/Planning/DA_Tracking/MapServer/0/query?where=PLANNING_PORTAL_APP_NUMBER='" + id + "'&outFields=PLANNING_PORTAL_APP_NUMBER,COUNCIL_NAME,STATUS,TYPE_OF_DEVELOPMENT,APPLICATION_TYPE&f=pjson",
        dataType: 'json',
        success: function (data) {

            //  console.log(data.features[0].attributes);
            var result = formatResult(data);
            infowindow.open(map, marker);

            infowindow.setContent(result);

        }
    });
}

function formatResult(data) {



    var style = '<div class="card  "><div class="card-header"><h6 >' + data.features[0].attributes.COUNCIL_NAME + '<span class="badge ml-2 badge-light">' + data.features[0].attributes.STATUS + '</span></h6></div>' +
        '<div class="card-body"><h6 style="color:#5c348b;" class="card-title">Type of development :' + data.features[0].attributes.TYPE_OF_DEVELOPMENT + '</h6> </div>' +

        '<div class="card-footer text-white ">Application Type: ' + data.features[0].attributes.APPLICATION_TYPE + '</div>';


    return style;
}

function numberConvert(num) {

    let parse = parseInt(num);
    var dollar;
    if (parse < 0 ? dollar = '-$' : dollar = '$');
    num = Math.abs(parse)


    if (num >= 1000000000) {
        return dollar + (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1000000) {
        return dollar + (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return dollar + (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return dollar + (num);
}

function convertInt(cost) {
    return parseInt(cost);
}

function totalsInfographic(category) {
    $.each(liquorData, function (index, item) {

        if (item.Council === category) {
            var $this = $("#totalApps");
            $this.html(item.Total);

            animate($this, 1);
        }
    });
    $.each(rankData, function (index, item) {

        if (item.Council === category) {
            var $this = $('#totalCnr');
            $this.html(item.Rank);
            animate($this, 0);
        }

    });
    $.each(migrantData, function (index, item) {

        if (item.Council === category) {
            var $this = $('#totalMig');
            if (parseInt((item.BORN_OTH)) >= parseInt(item.BORN_AU)) {
                $this.html("The council has a diverse population with majority of its residents made up of migrants");
            }
            else {
                $this.html("The councils population predominantly comprises of people born in Australia");
            }

            //animate($this, 0);
        }

    });
    $.each(crimeData, function (index, item) {

        if (item.Council === category) {
            var $this = $('#totalCrm');
            var cal = Math.ceil(((parseInt(item.Year_2019) - parseInt(item.Year_2015)) / parseInt(item.Year_2015)) * 100);

            if (cal < 0) {
                $this.html("The population in " + toTitleCase(selectedCouncil) + " is coping well with Domestic Violence cases</br> <h2 class='mt-2 alert alert-success'><i class='fa fa-check mr-2'></i>" + cal + "% down in last 5 years</h2>");
            }
            else {
                $this.html("The population in " + toTitleCase(selectedCouncil) + " is not coping well with Domestic Violence cases</br> <h2 class='mt-2 alert alert-danger'><i class='fa fa-times mr-2'></i>" + cal + "% up in last 5 years</h2>");
            }

            //animate($this, 0);
        }

    });




}

function animate(ref, int) {

    var $this = $(ref);
    $({ Counter: 0 }).animate({ Counter: $this.text() }, {
        duration: 1500,
        easing: 'swing',
        step: function () {
            if (int == 1) {
                $this.text(Math.ceil(this.Counter) + " liquor licenses");
            }
            else {
                $this.text(Math.ceil(this.Counter));
            }

        }
    });

}
