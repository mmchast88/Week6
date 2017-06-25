$( document ).ready(function() {
		showButtons();

//this function will create a button and will push the 
//input of the field to the button and add it to the end of the array.
	$("#addAnimal").on("click", function(event) {

		event.preventDefault();

		var input = $("#animal-input").val();

		topics.push(input);

		showButtons();

		//console.log(input);
	});

});


//animal array 
var topics = ["Cat", "Dog", "Horse", "Pig", "Sheep", "Bear", "Cow", "Donkey", "Chicken", "Lama"];

// this function creates the animal buttons and appends them to the animalButton div
 function showButtons() {

 	$("#animalButton").empty();

	for(var i = 0; i < topics.length; i++){
		
		 var x = $("<button>");

		 x.addClass("animal");

		 x.attr("data-name", topics[i]);

		 x.text(topics[i]);

		 $("#animalButton").append(x);
		
	}

// Event listener for all button elements
 $("button").on("click", function() {
 	$("#animals").empty();
 // In this case, the "this" keyword refers to the button that was clicked	
	var animalPic = $(this).attr("data-name");
// Constructing a URL to search Giphy for animal Gifs
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animalPic + "&api_key=afdfd623a26640da8ec3cf24e92c8045&limit=10";
// Performing our AJAX GET request
 	$.ajax({
          url: queryURL,
          method: "GET"
        })

 // After the data comes back from the API
  	.done(function(response) {

  // Storing an array of results in the results variable
      var results = response.data;


  	// Looping over every result item
      for (var i = 0; i < results.length; i++) {
      	// Only taking action if the photo has an appropriate rating
      	var gifAnimalDiv = $("<div class='item'>");
      	// Storing the result item's rating
      	var rating = results[i].rating;
      	// Creating a paragraph tag with the result item's rating
      	var x = $("<p>").text("Rating: " + rating);
      		// Creating an image tag
			var animalImage = $("<img>");

			animalImage.attr("data-state", "animate");

			var stillGif = results[i].images.fixed_height.url.replace("200.gif", "200_s.gif");

			animalImage.attr("data-still", stillGif);

			animalImage.attr("data-animate", results[i].images.fixed_height.url);
			animalImage.addClass("gif");
			// Giving the image tag an src attribute of a proprty pulled off the
            // result item
			animalImage.attr("src", results[i].images.fixed_height.url);
			// Appending the paragraph and animalImage created to the "gifAnimalDiv" div 
			gifAnimalDiv.append(x);
            gifAnimalDiv.append(animalImage);
            // Prepending the gifAnimalDiv to the "#animals" div in the HTML
            $("#animals").prepend(gifAnimalDiv);
		}

		 
		$(".gif").on("click", function() {

			var state = $(this).attr("data-state");

			 if (state === "still") {
			 	console.log("state is still");
	        $(this).attr("src", $(this).attr("data-animate"));
	        $(this).attr("data-state", "animate");
	      } else {
	      	console.log("state is not still");
	        $(this).attr("src", $(this).attr("data-still"));
	        $(this).attr("data-state", "still");
	      }
 		});


        });
    });

}
