if (Meteor.isClient){
    var substringMatcher = function (strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function (i, str) {
            if (substrRegex.test(str)) {
                // the typeahead jQuery plugin expects suggestions to a
                // JavaScript object, refer to typeahead docs for more info
                matches.push({ value: str });
            }
        });

        cb(matches);
    };
};

var topics = ['Math','Science','Computer','FootBall','Basketball','Spor','History','Wars'];

Template.Home.events({
   'click .topic': function() {
        var topic_name = $(this).find("h4").text();
        var match = $(".match");
        var match_topic = $(".match span.match-topic");


        console.log(topic_name);
        match_topic.html(topic_name);
        match.fadeIn("slow");
   },
   'click .play' : function(){
        $("#cancel").fadeIn("slow");
        $(this).css({
            'disabled': true
        });
   },
   'click #cancel' : function(){
        $("#cancel").fadeOut("slow");
   }
});

Template.settings.onRendered(function(){
  this.$('.datetimepicker').datetimepicker();
});
/*
 * Function to draw the area chart
 */
function builtArea() {

    $('#container-area').highcharts({
        
        chart: {
            type: 'area'
        },
        
        title: {
            text: 'Played Topics By Monthly'
        },
        
        credits: {
            enabled: false
        },
        
        subtitle: {
            text: 'Played Topics By Monthly'
        },
        
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        
        yAxis: {
            title: {
                text: 'Months'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000 + 'k';
                }
            }
        },
        
        tooltip: {
            pointFormat: '{series.name} played <b>{point.y:,.0f}</b><br/>topics in {point.x}'
        },
        
        plotOptions: {
            area: {
                pointStart: 1,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        
        series: [{
            name: 'Math',
            data: [1, 2, null, null, null, 6, 11, 32, 110, 235, 369, 640,
                1005]
        }, {
            name: 'Science',
            data: [1, 22, 2, null, null, 6, null, 322, 01, 25, 169, 40,
                null]
        }]
    });
}

/*
 * Call the function to built the chart when the template is rendered
 */
Template.profile.rendered = function() {    
    builtArea();
}

Template.profile.topGenresChart = function() {
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Topics'
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'topics',
            data: [
                ['War',   45.0],
                ['Science',       26.8],
                ['Math',   12.8],
                ['Football',    8.5],
                ['History',     6.2]
            ]
        }]
    };
};

Template.search.invokeAfterLoad = function(){
     Meteor.defer(function () {
         $('.search-query').typeahead({
            hint: true,
            highlight: true,
            minLength: 1       
        },
        {
            name: 'topics',
            displayKey: 'value',
            source: substringMatcher(topics),
            templates: {
                empty: [
                  '<div class="alert-danger empty-message">',
                  '<span class="alert-danger">unable to find any topic</span>',
                  '</div>'
                ].join('\n'),
                suggestion: Handlebars.compile('<p><img src="http://placehold.it/32x32" />{{value}}</p>')
            }

        });
     });
     return;    
    }
}