var countries = ["USA", "India", "United Kingdom", "France", "Japan", "Cuba", "Brazil"];
var appKey = "Y61qWuspMl6ayaDlpV7ZsyxdU4ACWIzo";

$(document).ready(function () {

    renderButtons();

    function renderButtons() {

        $("#country-view").empty();
        for (var i = 0; i < countries.length; i++) {
            var btn = $("<button>").addClass("btn btn-info").attr("data-name", countries[i]).text(countries[i]);
            $("#country-view").append(btn);
        }


    }
    $(document).on("click", ".btn-info", displayCountry);
    $(document).on("click", ".img", previewImage);

    $("#add-country").click(function (event) {
        event.preventDefault();
        var country = $("#country-input").val().trim();
        var countryExists = countries.indexOf(country);
        if (countryExists === -1)
        {
            countries.push(country);
            renderButtons();

        }



    })

    function previewImage() {

        var displayOriginal = $(this).attr("data-displayOriginal");

        if (displayOriginal === "true") {
            $(this).attr("src", $(this).attr("data-preview"));
            $(this).attr("data-displayOriginal", false);

        }
        else {
            $(this).attr("src", $(this).attr("data-original"));
            $(this).attr("data-displayOriginal", true);

        }


    }

    function displayCountry() {
        var country = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + appKey + "&q=" + country + "&limit=12&offset=0&lang=en";

        $.ajax({
            method: "GET",
            url: queryURL,
        }).then(function (response) {

            $("#country-image").empty();
            $.each(response.data, function (i, value) {


                var divTag =$("<div>").addClass("col -md-4");

                var h1Tag=$("<h5>").text("Rating: " + value.rating);
                var imgTag = $("<img>").addClass("img").attr({
                    "src": value.images.original_still.url, "data-preview":
                        value.images.preview_gif.url, "data-original": value.images.original_still.url, "data-displayOriginal": true
                });

                divTag.append(h1Tag).append(imgTag);
                //$("#country-image").append(h1Tag);
                $("#country-image").append(divTag);

            })


        });
    }

});