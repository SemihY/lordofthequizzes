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



$(document).on('ready', function () {


    $(".topic").on('click', function () {

        var topic_name = $(this).find("h4").text();
        var match = $(".match");
        var match_topic = $(".match span.match-topic");


        console.log(topic_name);
        match_topic.html(topic_name);
        match.fadeIn("slow");
    });


    $(".match .play").on('click', function () {
        $("#cancel").fadeIn("slow");
        $(this).css({
            'disabled': true
        });
    });


    $("#cancel").on('click', function () {
        $(this).fadeOut("slow");
    });

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