window.onload = function() {
  //alert(window.innerWidth);

  let api_key = "f24f40b1c24505685fce3b8acd0fcffc";
  let text = document.getElementById("text");
  let city = document.getElementById("city");
  let temp = document.getElementById("temp");
  let clouds = document.getElementById("clouds");
  let icon = document.getElementById("icon");
  let btn = document.getElementById("btn");

  btn.addEventListener("click", fetchWeather);
  text.addEventListener("keyup", checkKey);

  function checkKey(event) {
    if (event.key === "Enter") {
      fetchWeather();
    }
  }

  function fetchWeather() {
    if (text.value === "") {
    } else {
      let search_link =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        text.value +
        "&appid=" +
        api_key;
      httpRequest(search_link, theResponse);
    }
  }
  function theResponse(response) {
    var response = JSON.parse(response);
    city.innerHTML = response.name;
    temp.innerHTML = parseInt(response.main.temp - 273) + "°C";
    clouds.innerHTML = response.weather[0].description;
    icon.src =
      "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
  }

  function httpRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }
      if (this.status == 404) {
        city.innerHTML = "City Not Found";
        temp.innerHTML = "";
        icon.src = "";
        clouds.innerHTML = "";
      }
    };
    xhr.send();
  }
};
