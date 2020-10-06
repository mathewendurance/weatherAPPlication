
// SELECT ELEMENTS
const citName = document.querySelector('.location p');
const notificationElement = document.querySelector(".notification");
const tempeBody = document.querySelector('.temp-container');
const geoLocate = document.querySelector('.location')

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "3a7de2fdc2c66b06d512a3bbff2da135";

const requestCity = async(city)=>{
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
const query = `?q=${city}&appid=${key}`;

//make fetch cxall (promise call)
const response = await fetch(baseUrl + query);

// promise data
const data = await response.json();
return data;

}


// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){

   // location and date content




  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);


       const value =  data.main.temp ;
        const imagName = data.weather[0].icon;
        const icoSrc = `http://openweathermap.org/img/wn/${imagName}@2x.png`
       
        function dateBuilder (d) {
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          
            let day = days[d.getDay()];
            let date = d.getDate();
            let month = months[d.getMonth()];
            let year = d.getFullYear();
          
            return `${day} ${date} ${month} ${year}`;
          }
        
          function showTime() {
            let time = new Date();
            let hr = time.getHours();
            let min = time.getMinutes();
            let sec = time.getSeconds();
            let am_pm = "AM"
        
            if(hr > 12) {
                hr -= 12;
                am_pm = "PM";
            }
            
            if (hr == 0){
                hr = 12;
            }
        
            hr = (hr < 10) ? "0" + hr : hr;
            min = (min < 10) ? "0" + min : min;
            sec = (sec < 10) ? "0" + sec : sec;
        
            var currentTime = hr + " " + ":" + " " + min + " " + ":" + " " + sec + " " + am_pm;
          
        
            setTimeout(showTime, 1000);

        geoLocate.innerHTML = `
            <div class="location">
            <p>${(data.name)}, ${(data.sys.country)}</p>
            <div class="date">${(dateBuilder(now))}</div></div>
            <div id="clock">${(currentTime)}</div>
    
    
            </div>
        `
        }
        showTime();
        
    
        
        // temperature contents
        tempeBody.innerHTML =` 
    
        <div class="temp-container">
                   
          
        <div class="temperature-value">
            <p>${Math.floor(value - KELVIN)}°<span>C</span> </p>
        </div>

        <div class="temperature-description">
             <p> ${data.weather[0].description}</p>
         </div>

        <div class="weather-icon">
            <img id="img_icon" src="${icoSrc}" alt="">
        </div>
    
    <div class="feel_like">
            
             <p>${Math.floor(data.main.feels_like - KELVIN)}&deg;C</p>
             <div class="a"><span>Feels Like</span></div>
            
        </div>
          
        <div class="temp_humidity">
            <p>${data.main.humidity}%</p>
            <div class="a"><span>Humidity</span></div>
        </div>
        
    
    </div>
    `
})
    .then(function(){
        displayWeather();
    });
}



// DISPLAY WEATHER TO UI
function displayWeather(){


}