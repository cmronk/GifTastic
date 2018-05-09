$(document).ready(function(){
// Global variables

// This is the array that holds our topics that will be displayed as buttons
var topics = ["Doc", "Grumpy", "Happy", "Sleepy", "Dopey", "Bashful", "Sneezy", "Snow White"];
// functions
    
function renderButtons(){
    // this prevents repeat buttons when we run the renderButtons function
    $("#buttons-view").empty();
    // loop through array and create buttons
    for(var i = 0; i < topics.length; i++) {
        //  buttons
        var a = $("<button>");
        a.addClass("topic-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    } 
}

// updating HTML
function getGiphy() {
    $("#buttons-view").empty();
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=VMsRLkRqF0tK9SLZfaP35fhJld2jmivR&limit=10";
    
    // AJAX call for button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        for(var i = 0; i < topics.length; i++){

            // creates div for gifs
            var gifsDiv = $("<div class = 'gifs'>");

            // holds ratings
            var rating = response.data[i].rating;
            var ratings = $("<p>").text("Rating: " + rating);

            // giphy images 
            var giphyImages = $("<img>");
            
            // URL for gifs from giphy
            giphyUrl = response.data[i].images.fixed_height_still.url;
            giphyImages.attr("src", giphyUrl);
            giphyImages.attr("data-still", giphyUrl);
            giphyImages.attr("data-animate", response.data[i].images.fixed_height.url);
            giphyImages.attr("data-state", "still");
            giphyImages.attr("class","giphyImage");
            gifsDiv.prepend(giphyImages);
            gifsDiv.prepend(ratings);
            $("#gifsGoHere").prepend(gifsDiv);
       
        }
    });

    renderButtons();

    $("#add-topic").on("click", function(event) {
        event.preventDefault();
        // .trim prevents blank spaces beforehand
        var addTopic = $("#user-input").val().trim();
        topics.push(addTopic);
        renderButtons();
    });

    $("body").on("click", ".giphyImage", function(){
        event.preventDefault();
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })
}

// click event listener to all with class of "topic-btn"
$(document).on("click", ".topic-btn", getGiphy);

// display initial buttons
renderButtons();
})
