var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={534b29d66afe9258da891c84ad465ce';
var APIKey = '534b29d66afe9258da891c84ad465ce5'

document.getElementById("check-btn").addEventListener("click",function(event){
  event.preventDefault()
    var cityInput = document.getElementById("search-txt").value 
    console.log(cityInput)
    currentForecast(cityInput)
    fiveDayForecast(cityInput);
    var cityForecast = JSON.parse(localStorage.getItem("cityForecast")) || []
    cityForecast.push(cityInput)
    localStorage.setItem("cityForecast", JSON.stringify(cityForecast))
    DisplayButton()
})

function DisplayButton (){
  var cityForecast = JSON.parse(localStorage.getItem("cityForecast")) || []
  let HTMLCode = ""
  for(let i=0;i<cityForecast.length;i++){
    HTMLCode += `
    <button class="btn btn-secondary search">${cityForecast[i]}</button>
    `
  }
  document.getElementById("previous-search").innerHTML = HTMLCode
  document.querySelectorAll(".search").forEach(element =>
    element.addEventListener("click",function(){
      var city = this.textContent
      console.log(city);
      currentForecast(city)
      fiveDayForecast(city)
    })
    )
}

DisplayButton()
function currentForecast(city){
    var URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`
    fetch(URL)
    .then(response => {
        return response.json()
    }).then(apiData =>{
        console.log(apiData)
    
        var htmlTEXT = `<div class="cards">
        <div class="d-flex justify-content-between w-70">
          <div>
            <h2 ><strong>${apiData.main.temp}°F</strong></h2>
            <p class="text-muted mb-0">${city}</p>
          </div>
          <div>
            <img src="https://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png"
              width="150px">
              <p >Description:${apiData.weather[0].description}</p>
              <p >Humidity:${apiData.main.humidity}</p>
              <p >WindSpeed:${apiData.wind.speed}</p>
          </div>
        </div>
      </div>`
      document.getElementById("currentForecast").innerHTML=htmlTEXT
    })

}

//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

function fiveDayForecast(city){
    var URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`
    fetch(URL)
    .then(response => {
        return response.json()
    }).then(apiResults =>{
        var apiData = apiResults.list
        console.log(apiData)
        var htmlTEXT =""
        for(let i=0;i<apiData.length;i=i+8){
        htmlTEXT += `<div class="cards five-day">
        <div class=" mb-4 pb-2">
          <div>
            <h5 ><strong>${apiData[i].main.temp}°F</strong></h5>
            <p class="text-muted mb-0">${dayjs(apiData[i].dt_text).format('DD/MM/YYYY')}</p>
        
            <img src="https://openweathermap.org/img/wn/${apiData[i].weather[0].icon}@2x.png"
              width="150px">
              <p >Description:${apiData[i].weather[0].description}</p>
              <p >Humidity:${apiData[i].main.humidity}</p>
              <p >WindSpeed:${apiData[i].wind.speed}</p>
          </div>
        </div>
      </div>`
        }
      document.getElementById("fiveDayForecast").innerHTML=htmlTEXT
    })

}
