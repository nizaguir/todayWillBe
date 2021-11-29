const apiURL =
  "https://api.openweathermap.org/data/2.5/forecast?id=5607916&appid=1c7b520dbc19d236d0b08977b014ccf1";

fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    // console.log(jsObject);

    // Add current conditions description
    let tempKelvin = jsObject.list[0].main.temp;
    let tempFar = kelToFar(tempKelvin);
    document.querySelector(
      ".currentWeather"
    ).textContent = `${jsObject.list[0].weather[0].main} ${tempFar} °F`;

    // Add high temperature
    let tempKelvHigh = jsObject.list[0].main.temp_max;
    let tempFarHigh = kelToFar(tempKelvHigh);
    document.querySelector(".highTemp").textContent = `${tempFarHigh} °F`;

    // Add humidity
    document.querySelector(
      ".humidity"
    ).textContent = `${jsObject.list[0].main.humidity}%`;

    // Add wind speed
    const windSpeed = jsObject.list[0].wind.speed;
    const windSpeedMPH = Math.round(windSpeed * 2.237 * 10) / 10;
    document.querySelector(".wind-speed").textContent = `${windSpeedMPH} mph`;

    // Add windChill
    const windChill = calcWindChill(tempFar, windSpeedMPH);
    document.querySelector(".wind-chill").textContent = `${windChill} °F`;

    // Add Weather Forecast - Day
    const currentDate = new Date(jsObject.list[0].dt_txt);
    const today = currentDate.getDay();

    const days = {
      0: "Sun",
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thur",
      5: "Fri",
      6: "Sat",
    };

    let today_char;
    let i = today;

    const allDays = document.querySelectorAll(".day-name");
    allDays.forEach((day) => {
      Object.keys(days).forEach((day) => {
        if (i > 6) {
          i = 0;
        }
        if (day == i) {
          today_char = days[i];
        }
      });
      day.textContent = today_char;
      i = i + 1;
    });

    // Add Weather Forecast - Value
    const forecastEl = document.querySelectorAll(".forc");
    const allIcon = document.querySelectorAll(".weather-img");

    let z = 0;
    jsObject.list.forEach((obj, i) => {
      let dtobj = new Date(obj.dt_txt);
      let current_hour = dtobj.getHours();

      if (current_hour == 18) {
        // Add current weather forecast
        let weathVal = jsObject.list[i].main.temp;
        let weathValFar = kelToFar(weathVal);
        forecastEl[z].textContent = `${weathValFar} °F`;

        // Add proper icon
        let iconId = jsObject.list[i].weather[0].icon;
        let iconPath = `https://openweathermap.org/img/w/${iconId}.png`;
        allIcon[z].setAttribute("src", iconPath);
        z += 1;
      }
    });
  });

// Calculate Wind Chill
const calcWindChill = (temperature, windSpeed) => {
  let windChillVal;

  if (temperature <= 50 && windSpeed > 3) {
    windChillVal =
      35.74 +
      0.6215 * temperature -
      35.75 * windSpeed ** 0.16 +
      0.4275 * (temperature * windSpeed ** 0.16);

    windChillVal = Math.round(windChillVal * 100) / 100;

    return windChillVal;
  } else {
    windChillVal = "N/A";
    return windChillVal;
  }
};

const kelToFar = (tempKelvin) => {
  return Math.round((((tempKelvin - 273.15) * 9) / 5 + 32) * 10) / 10;
};
