let weather ={
    apiKey:"723681f5daaa4a046ad7343297a736ab",
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city + "&units=metric&appid=" + this.apiKey
        )
        .then((Response) => Response.json())
        .then((data) => this.displayWeather(data));

    },
    displayWeather: function(data){
       const {name} = data;
       const {icon,description} = data.weather[0];
       const {temp,humidity} = data.main;
       const {speed} = data.wind;
       const {country} = data.sys;
       let d= new Date();
       let n=d.getDay();
       let days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
       let currday=days[n];
       let months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
       let m=d.getMonth();
       let currmonth=months[m-1];
       let curryear=d.getFullYear(); 
       let currdate=d.getDate();
       document.querySelector(".location").innerText = name;
       document.querySelector(".weather-temp").innerText=Math.round(temp)+"°C";
       document.querySelector(".weather-desc").innerText=description;
       document.querySelector("div.humidity > span.value").innerText=humidity+"%";
       document.querySelector("div.wind > span.value").innerText=speed.toFixed(1)+" km/h";
       document.querySelector(".icon").src="https://openweathermap.org/img/wn/"+ icon +"@2x.png";
       document.querySelector(".country").innerText=","+country;
       document.querySelector(".date-dayname").innerText=currday;
       document.querySelector(".date-day").innerText=currdate+' '+currmonth+' '+curryear;
       document.querySelector(".weather-side").classList.remove("loading");
       document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?"+name+"')"
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click",function(){
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup",function(event){
   if(event.key==="Enter"){
    weather.search();
   }  
});
weather.fetchWeather("Paris");
