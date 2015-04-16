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
            'disabled' : true
        });
    });


    $("#cancel").on('click', function () {
        $(this).fadeOut("slow");
    })
});