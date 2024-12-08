document.addEventListener('DOMContentLoaded', () => {

  const container = document.querySelector(".container")
  const searchBtn = document.querySelector(".searchBtn")
  const input = document.querySelector(".input")
  const sectionTwo = document.querySelector("sectionTwo")
  const loadingElement = document.getElementById('loading');

  async  function fetchData() {

    let inpValue = '';
    const apiKey = "67DXDJ9NRVKSNRHWDVGKB7WQ4";

    try {

      searchBtn.addEventListener("click", async () => {

        inpValue = input.value;
        if (!inpValue) {
          alert("please enter a valid city name")
        }
        const inp = inpValue.toUpperCase()

        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inp}?unitGroup=us&key=${apiKey}&contentType=json`,
          { mode: "cors" },
        );

        if(!response.ok) {
         
            container.innerText = ""
  
            const para = document.createElement("h1")
            para.id = "para"
            para.innerText = "Bad API request 400"
  
            const paraTwo = document.createElement("h1")
            paraTwo.id = "paraTwo"
            paraTwo.innerText = "please insert  a real city name";

            const img = document.createElement("img")
            img.id = "img"
            const imgUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW-llRCbPrLFv46WvVAWNnMTVbN32y3sudBA&s"
            img.src = imgUrl;
           
            img.width = 400;
            img.height = 200;

            container.appendChild(para)
            container.appendChild(paraTwo)
            container.appendChild(img)
          
        }

        const weatherData = await response.json();
        displayData(weatherData)


    })

    } catch (error) {
      throw new Error (error)

    }


  }

  function displayData (data) {

    container.innerText = ""

        const weatherPlc = document.createElement("div")
        weatherPlc.classList.add("weatherPlc")

        const weatherPlcTwo = document.createElement("div")
        weatherPlcTwo.classList.add("weatherPlcTwo")

        const cityNm = document.createElement("h1")
        cityNm.classList.add("cityNm")
        cityNm.innerText = data.address;
        weatherPlcTwo.appendChild(cityNm)

        const temp = document.createElement("h2")
        temp.classList.add("temp")
        temp.innerText = Math.round((data.currentConditions.temp - 32) * 5 / 9) + "℃";
        weatherPlcTwo.appendChild(temp)

        const iconPlc = document.createElement("h3")
        iconPlc.id = "iconPlc"
        const conditions = data.currentConditions.icon;

        switch (conditions.toLowerCase()) {
          case "clear-day":
          case "sunny":
            iconPlc.innerText = "☀️";
            break;

          case "clear-night":
            iconPlc.innerText = "🌜";

            break;
          case "partly-cloudy-night":
            iconPlc.innerText = "🌘";
            break;

          case "partly-cloudy-day":
            iconPlc.innerText = "☁️"
            break;

          case "partly sunny":
            iconPlc.innerText = "☀️";

            break;

          case "cloudy":
            iconPlc.innerText = "☁️";
            break;

          case "overcast":
            iconPlc.innerText = "🌤️"
            break;

          case "light rain":
          case "drizzle":
            iconPlc.innerText = "🌦️";
            break;

          case "rain":
          case "showers":
            iconPlc.innerText = "🌧️";
            break;

          case "heavy rain":
            iconPlc.innerText = "☔";
            break;

          case "thunderstorm":
          case "thunder":
            iconPlc.innerText = "⛈️";
            break;

          case "light snow":
            iconPlc.innerText = "❄️";
            break;

          case "snow":
            iconPlc.innerText = "🌨️";
            break;

          case "fog":
          case "mist":
            iconPlc.innerText = "🌫️";
            break;

          case "windy":
          case "breezy":
            iconPlc.innerText = "🍃";
            break;

          default:
            iconPlc.innerText = "sunny";
            break;
        }

        weatherPlcTwo.appendChild(iconPlc)

        const precip = document.createElement("div")
        precip.id = "precip"
        const precipIcon = document.createElement("img")
        precipIcon.id = "precipIcon"
        const precipUrl = "img/humidIcon.png"
        precipIcon.src = precipUrl;

        const precipText = document.createElement("h2")
        precipText.id = "precipText"
        precipText.innerText = data.currentConditions.
        humidity + "%";

        precip.appendChild(precipIcon)
        precip.appendChild(precipText)
        weatherPlc.appendChild(precip)

        const wind = document.createElement('div')
        wind.id = "wind";
        const windIcon = document.createElement("img")
        windIcon.id = "windIcon"
        const windUrl = "img/icons8-wind-50.png"
        windIcon.src = windUrl;

        const windText = document.createElement("h3")
        windText.id = "windText"
        windText.innerText = data.currentConditions.windspeed + "km/hr";

        wind.appendChild(windIcon)
        wind.appendChild(windText)
        weatherPlc.appendChild(wind)

        const desc = document.createElement("h2")
        desc.id = "desc"
        desc.innerText = data.description;
        weatherPlc.appendChild(desc)

        container.appendChild(weatherPlcTwo)
        container.appendChild(weatherPlc)




  }

  fetchData()

})