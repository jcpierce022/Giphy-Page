//api key nYWyn9CvYJ7apZhwM6Lek4wtiKpzNfie
$(document).ready(function () {
    //Initial Array 
    var topics = ['Superman', 'Aquaman', 'Spiderman', 'Batman', 'Wonder Woman', 'Thor', 'Hulk', 'Black Panther', 'Iron Man'];



    //Function to display info on the topics by calling an API and retrieving the info 
    function displayInfo() {
        $('#hero-view').empty();
        var topic = $(this).attr('data-name');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + topic + '&api_key=jVz8LzEOLKTNPSj1tux4I40dP1PX6Pbg&limit=10';

        // AJAX call to GET information 
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                if (response.pagination.total_count == 0) {
                    alert('Sorry, there are no Gifs for this topic');
                    var itemindex = topics.indexOf(topic);

                    if (itemindex > -1) {
                        topics.splice(itemindex, 1);
                        renderButtons();
                    }
                }

                // Save response from API call (JSON) to a variable results
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    // Create new Div
                    var newTopicDiv = $("<div class='hero-name'>");


                    var pRating = $('<p>').text('Rating: ' + results[j].rating.toUpperCase());

                    var pTitle = $('<p>').text('Title: ' + results[j].title.toUpperCase());

                    var gifURL = results[j].images.fixed_height_still.url;
                    var gif = $('<img>');
                    gif.attr('src', gifURL);
                    gif.attr('data-still', results[j].images.fixed_height_still.url);
                    gif.attr('data-animate', results[j].images.fixed_height.url);
                    gif.attr('data-state', 'still');
                    gif.addClass('animate-gif');

                    newTopicDiv.append(pRating);
                    newTopicDiv.append(pTitle);
                    newTopicDiv.append(gif);

                    $('#hero-view').prepend(newTopicDiv);
                }
            });
    };


    function renderButtons() {

        $('.buttons-view').empty();

        for (var i = 0; i < topics.length; i++) {
            var createButtons = $('<button>');
            createButtons.addClass('topic btn btn-info');
            createButtons.attr('data-name', topics[i]);
            createButtons.text(topics[i]);
            $('.buttons-view').append(createButtons);
        }
    }

    function removeButton() {
        $("#hero-view").empty();
        var topic = $(this).attr('data-name');
        var itemindex = topics.indexOf(topic);
        if (itemindex > -1) {
            topics.splice(itemindex, 1);
            renderButtons();
        }
    }

    // Function to play or still Gif images
    function playGif() {
        var state = $(this).attr('data-state');
        if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        }
        else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    }

    ///CLICK EVENTS

    $("#add-hero").on("click", function (event) {
        event.preventDefault();

        var hero = $("#hero-input").val().trim();

        if (topics.toString().toLowerCase().indexOf(hero.toLowerCase()) != -1) {
            alert("Topic already exists");
        }
        else {
            topics.push(hero);
            renderButtons();
        }
    });

    // Click on hero button to display Gifs and other info from API
    $(document).on("click", ".topic", displayInfo);

    $(document).on("click", ".animate-gif", playGif);

    $(document).on("dblclick", ".topic", removeButton);


    renderButtons();


});