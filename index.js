const searchForm = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input' );
const cityName = document.querySelector('.location p');
const tempBody = document.querySelector('.temp-container');
const timeImage = document.querySelector('.image_container img');
const timee = document.querySelector('.clock');
const upperCase = document.querySelector('.top-mode')
const spitOutCelcius = (kelvin) => {
    celcius = Math.round(kelvin - 273.15);
    return celcius;
} 
const isDayTime = (icon) => {
    if (icon.includes('d')) { return true }
    else { return false }
}
updateWeatherApp = (city)=> {
    console.log(city);
    
    const imageName = city.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`
   
let unix_timestamp = city.dt * 1000;
const time = city.timezone * 1000 ;

/*var date = new Date(unix_timestamp - time);
// Hours part from the timestamp
var hours = date.getHours();
// minutesutes part from the timestamp
var minutes= "0" + date.getMinutes();
// Secondsonds part from the timestamp
var seconds = "0" + date.getSeconds();

var am_pm = "AM"


if(hours> 12) {
    hours-= 12;
    am_pm = "PM";
}

if (hours== 0){
    hours= 12;
}

hours= (hours< 10) ? "0" + hours: hr;
minutes = (minutes < 10) ? "0" + minutes : minutes;
seconds = (seconds < 10) ? "0" + seconds : seconds;


// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);


console.log(formattedTime);*/
let now = new Date();
 
function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }

  var countryTime = new Date(unix_timestamp - time).toLocaleTimeString("en-US")
console.log(countryTime)







// expected output "3:19:27 PM"
upperCase.innerHTML = `      
<div class="top-mode">
<div class="location">
    <p>${(city.name)}, ${(city.sys.country)}</p>
    <div class="date">${(dateBuilder(now))}</div><br>
    <div id="clock">${(countryTime)}</div>
</div>
</div>

`




    tempBody.innerHTML =` 

    <div class="temp-container">
        
   
    <div class="temperature-value">
        <p>${spitOutCelcius(city.main.temp)}°<span>C</span> </p>
    </div>

    <div class="temperature-description">
         <p> ${city.weather[0].description}</p>
     </div>
    
     

    <div class="weather-icon">
    <img id="img_icon" src="${iconSrc}" alt="">
</div>

    

    <div class="feel_like">
        
         <p>${spitOutCelcius(city.main.feels_like)}&deg;C</p>
         <div class="a"><span>Feels Like</span></div>
        
    </div>
      
    <div class="temp_humidity">
        <p>${city.main.humidity}%</p>
        <div class="a"><span>Humidity</span></div>
    </div>
    

</div>

`


if (isDayTime(imageName)) {
    console.log('day');
    // change the attribute
    timeImage.setAttribute('src', 'icons/day3.jpg');
    if (cityName.classList.contains('text-white')) {
        cityName.classList.remove('text-white');
    } else {
        cityName.classList.add('text-black');
    }

} else {
    console.log('night');
    timeImage.setAttribute('src', 'icons/night.jpg');
    if (cityName.classList.contains('text-black')) {
        cityName.classList.remove('text-black');
    } else {
        cityName.classList.add('text-white');
    }

}


}





// add event listener to the form

searchForm.addEventListener('submit', e=>{
    e.preventDefault();

    const citySearched = cityValue.value.trim();
    console.log(citySearched)
    // reset form
    searchForm.reset();

    requestCity(citySearched)
    .then((data)=>{
        updateWeatherApp(data);      
    })
    .catch((error)=>{ console.log(error)})

}) 