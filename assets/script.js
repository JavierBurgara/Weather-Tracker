// list (empty until given event)
var searchHistory = [];
// returns local storage search history
function getItems() {
    var storedCities = JSON.parse(localStorage.getItem("searchHistory"));
    if(storedCities !== null) {
        searchHistory = storedCities;
    };

    // lists up to 10 locations
for (i = 0; i < searchHistory.length; i++) {
    if (i == 10) {
        break;
      }
    //  creates links/buttons https://getbootstrap.com/docs/4./components/list-group/
    cityListButton = $("<a>").attr({
        class: "list-group-item list-group-item-action",
        href: "#"
    });
    // appends history as a button below the search field
    cityListButton.text(searchHistory[i]);
    $(".list-group").append(cityListButton);
        }
    };
    
    var city;
    var mainCard = $(".card-body");
    // prompt getItems
    getItems();
    // main card
    function getData() {
        // my api code
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8af713bebedab909ba40e0054699acdb" // call for city weather conditions
        mainCard.empty();
        $("#weeklyForecast").empty();
        // requests
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var date = moment().format("MM/DD/YYYY");
            var iconCode = response.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            var name = $("<h3>").html(city + date);
            mainCard.prepend(name);
            mainCard.append($("<img>").attr("src", iconURL));
            var temp = Math.round((response.main.temp - 273.15) *1.80 + 32);
            mainCard.append($("<p>").html("Temperature: " + temp + " &#8457")); 
            var humidity = response.main.humidity;
            mainCard.append($("<p>").html("Humidity: " + humidity));
            var windSpeed = response.wind.speed;
            mainCard.append($("<p>").html("Wind Speed: " + windSpeed)); 
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            $.ajax ({
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=8af713bebedab909ba40e0054699acdb=" + lat + "&lon=" + lon, // my api code
                method: "GET"
            }).then(function(response) {
                mainCard.append($("<p>").html("UV Index: <span>" + response.value + "</span>"));

                if (response.value <= 2){
                    $("span").attr("class", "btn btn-outline-success");
                };
                if (response.value > 2 && response.value <= 5) {
                    $("span").attr("class", "btn btn-outline-warning");
                };
                if (response.value > 5) {
                    $("span").attr("class", "btn btn-outline-danger");
                };
            });
            // calls for 5 day forecast
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=8af713bebedab909ba40e0054699acdb", // my api code
                method: "GET"

            }).then(function (response) {
            for (i = 0; i < 5; i++) { // start for loop
                // creates the columns
                var newCard = $("<div>").attr("class", "col fiveDay bg-primary text-white rounded-lg p-2");
                $("#weeklyForecast").append(newCard);
                // uses moment for the date
                var myDate = new Date(response.list[i * 8].dt * 1000);
                // displays date
                newCard.append($("<h4>").html(myDate.toLocaleDateString()));
                // brings back the icon url suffix
                var iconCode = response.list[i * 8].weather[0].icon;
                // builds the icon URL
                var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                // displays the icon
                newCard.append($("<img>").attr("src", iconURL));
                // converts K and removes decimals using Math.round
                var temp = Math.round((response.list[i * 8].main.temp - 273.15) * 1.80 + 32);
                // displays temp
                newCard.append($("<p>").html("Temp: " + temp + " &#8457")); //appends fahrenheit degrees using short key code
                // creates a var for humidity from the response
                var humidity = response.list[i * 8].main.humidity;
                // displays humidity
                newCard.append($("<p>").html("Humidity: " + humidity));
                 }
             })
        })
    };
    
    