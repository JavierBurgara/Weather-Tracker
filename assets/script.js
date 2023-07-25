// list (empty until given event)
var searchHistory = [];
// returns local storage search history
function getItems() {
    var storedCities = JSON.parse(localStorage.getItem("searchHistory"));
    if(storedCities !== null) {
        searchHistory = storedCities;
    }
}