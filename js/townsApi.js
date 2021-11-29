const townsRequestURL =
  "https://byui-cit230.github.io/weather/data/towndata.json";

fetch(townsRequestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    // holds json object data
    const towns = jsonObject["towns"];
    // towns to output to UI
    const townList = ["Soda Springs", "Fish Haven", "Preston"];

    // loop though town list from the json data
    for (let i = 0; i < towns.length; i++) {
      // check to see if current town is in townList
      // if current town is in townList, create UI elements
      if (townList.includes(towns[i].name)) {
        // var for town image
        let townImage;
        // decide with image to use based on name
        switch (towns[i].name) {
          case "Soda Springs":
            townImage = "./images/test-img-2.jpg";
            break;
          case "Fish Haven":
            townImage = "./images/test-img-1.jpg";
            break;
          case "Preston":
            townImage = "./images/test-img-3.jpg";
            break;
        }

        // create html elements
        let townDiv = document.createElement("div");
        let textDiv = document.createElement("div");
        let townH2 = document.createElement("h2");
        let motto = document.createElement("p");
        let yFounded = document.createElement("p");
        let rainFall = document.createElement("p");
        let population = document.createElement("p");
        let townImg = document.createElement("img");

        // add classes
        townDiv.classList.add("town-div");
        textDiv.classList.add("text-div");
        townH2.classList.add("town-h2");
        motto.classList.add("town-motto");
        yFounded.classList.add("town-founded");
        yFounded.classList.add("town-p");
        rainFall.classList.add("town-rainfall");
        rainFall.classList.add("town-p");
        population.classList.add("town-pop");
        population.classList.add("town-p");
        townImg.classList.add("town-img");
        // add content
        townH2.textContent = towns[i].name;
        motto.textContent = `"${towns[i].motto}"`;
        yFounded.textContent = `Year Founded: ${towns[i].yearFounded}`;
        rainFall.textContent = `Average Rainfall: ${towns[i].averageRainfall}`;
        population.textContent = `Current Population: ${towns[i].currentPopulation}`;
        townImg.src = townImage;
        townImg.alt = `the town of ${towns[i].name}`;

        // output to the UI
        textDiv.appendChild(townH2);
        textDiv.appendChild(motto);
        textDiv.appendChild(yFounded);
        textDiv.appendChild(rainFall);
        textDiv.appendChild(population);
        townDiv.appendChild(textDiv);
        townDiv.appendChild(townImg);
        document.querySelector(".home-towns").appendChild(townDiv);

      }
    }
  });
