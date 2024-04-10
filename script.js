//affichage de la date "more friendly"
const days = ["Lundi","Mardi","Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const months = ["Janvier","Février","Mars", "Avril", "Mai", "Juin", "Juillet",
"Aout","Septembre","Octobre", "Novembre", "Décembre"];

// Charger le fichier de configuration JSON
function fetchWeatherAndUpdate() {
  fetch('config.json')
    .then(response => response.json())
    .then(data => {
      // Accéder à la ville et à l'URL de base de l'API météo
      const city = data.city;
      const baseWeatherApiUrl = data.base_weather_api_url;
      const appid = data.appid;
      const units = data.units || 'metric';
      
      // Former l'URL finale en ajoutant la ville et l'appid
      const weatherApiUrl = baseWeatherApiUrl + city + '&appid=' + appid + '&units=' + units;
      
      // Utiliser l'URL de l'API météo pour faire une requête
      fetch(weatherApiUrl)
        .then(response => response.json())
        .then(weatherData => {
          // Utiliser les données météorologiques comme nécessaire dans votre application
          console.log('Données météorologiques de', city, ":", weatherData);
          showWeatherData(weatherData);
        })
        .catch(error => {
          console.error('Une erreur s\'est produite lors de la récupération des données météorologiques:', error);
        });
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors du chargement du fichier de configuration JSON:', error);
    });
  }

  function getFriendlyDate() {
    const time = new Date();
    const dayOfWeek = time.getDay(); // Jour de la semaine (0 = dimanche, 1 = lundi, ..., 6 = samedi)
    const dayOfMonth = time.getDate();
    const monthIndex = time.getMonth();
    const year = time.getFullYear();
    const frenchDays = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const dayIndex=time.getDay();
    const frenchMonths = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    const friendlyDayOfWeek = frenchDays[dayOfWeek];
    const friendlyMonth = frenchMonths[monthIndex];
    return `${frenchDays[dayIndex]} ${dayOfMonth} ${friendlyMonth} ${year}`;
  }

  
  function showWeatherData(weatherData){
    const result = document.getElementById("container");

    const iconBaseUrl = 'https://openweathermap.org/img/wn/';
    const iconValue = weatherData.weather[0].icon;
    const iconUrl = iconBaseUrl + iconValue + '.png';

    result.innerHTML = ' <div class="other-info" id="info"><div class="header"><div id="cityName">'+ weatherData.name+'</div>'+
    '<div id="country">'+ weatherData.sys.country+'</div></div></br>'+
    '<div id="dateE1">'+ getFriendlyDate()+'</div></br><hr></br>'+
    '<img src="'+iconUrl+'" id="weather-icon"  srcset="">'+
    '<div id="description">'+weatherData.weather[0].description+'</div></br><hr></br>'+
    '<div><div class="weather-item"><div>Température :</div><div id="temperatureDay" id="temperatureDay">'+Math.round(weatherData.main.temp *10)/10  +'&deg C </div></div></br>'+
    '<div class="weather-item"><div>Ressentie :</div><div id="temperatureFeelLike" id="temperatureFeelLike">'+ Math.round(weatherData.main.feels_like*10)/10 +'&deg C </div></div></br><div class="weather-item">'+
    '<div>Humidité</div><div id="humidity" >'+weatherData.main.humidity+' &percnt; </div></div></br><div class="weather-item">'+
    '<div>Pression : </div><div id="pressure" >'+weatherData.main.pressure+' hPa</div></div></br><div class="weather-item">'+
    '<div>Vitesse du vent </div><div id="wind-speed">'+weatherData.wind.speed+' m/s</div></div></div></br></div>';
}

fetchWeatherAndUpdate();
//appelle l'API une fois/heure
setInterval(fetchWeatherAndUpdate,3600000 )