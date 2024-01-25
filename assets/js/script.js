// const newsApiKey = '5dee72a8871c486ba5572ac2786a74b0';
// const newNewsApiKey = '50d6ff56ed3fabcfebc9c75d14f055be'; //Szilvis key
// const newNewsApiKey = '4aac9aa12eb6cd27a8016d5741664db2'; // Moskas key

// fetch to get random recipe related news from news API / it works, displays 4 news /html will change, createEl should be updated
function getRandomNews() {
  // const queryUrl = `https://newsapi.org/v2/everything?q=recipe&apiKey=${newsApiKey}`
  const queryUrl = `https://gnews.io/api/v4/search?q=recipe&apikey=${newNewsApiKey}`;
  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let newsTitle = [];
      let newsImg = [];
      let newsContent = [];
      let newsUrl = [];
      let numberOfNews = 4;
      // generate 4 random news and store the data in an array
      for (let i = 0; i < numberOfNews; i++) {
        newsTitle.push(data.articles[i].title);
        newsUrl.push(data.articles[i].url);
        newsContent.push(data.articles[i].description);
        newsImg.push(data.articles[i].image);
      }
      // create news blocks pull data from arrays // card html element might change!
      for (let i = 0; i < newsTitle.length; i++) {
        const createNewsEl =
        ` <div class="col-sm-12 col-md-6 col-lg-6 ">
        <div class="articles food-news row mt-5">
          <div class="card mb-3" style="height: 220px;">
            <div class="row g-0" style="height: 100%;">
              <div class="col-md-4">
                <div class="img-articles"><img src="` +
                newsImg[i] +
                `" class="img-fluid rounded-start" alt="..." style="height: 100%; object-fit: cover;"></div>
              </div>
              <div class="col-md-8">
                <div class="card-body bg-white">
                  <h5 class="card-title">` +
                  newsTitle[i] +
                  `</h5>
                  <p class="card-text">` +
                  newsContent[i] +
                  `</p>
                  <a href="` +
                  newsUrl[i] +
                  `" target="_blank" class="btn btn-primary" style="color: white; background-color: #1E2E6A;">Read more</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
        $(".articles-section").append(createNewsEl);
      }
    });
}
getRandomNews();

let mealName = [];
let mealImg = [];
let mealUrl = [];
let mealInst = [];
let storeObj = [];
let selectedCountry = [];
function getRecipeByCountries() {
  $(".dropdown-recipes").empty();
  if (!(selectedCountry === null)) {
    // at first we need to get countries it give only food name and img
    const queryUrlMeal = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCountry}`;
    fetch(queryUrlMeal)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        // with a second request we get 4 recipes with search selected country
        for (let i = 0; i < 4; i++) {
          let mealNameOne = data.meals[i].strMeal;
          const queryUrlMealDetails = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealNameOne}`;
          fetch(queryUrlMealDetails)
            .then(function (response) {
              return response.json();
            })
            .then(function (carrot) {
              const createRecipeEl =
                `<div class="cardContainer col-lg-3 col-md-3 col-sm-12">
            <div class="card">  
            <h5 class="card-title"></h5>      
            <div class="card-body">
            <h5 class="card-title">` +
                data.meals[i].strMeal +
                `</h5>
            <img src="` +
                data.meals[i].strMealThumb +
                `" class="card-img-top" alt="..."/>
            <p class="card-text">
                ` +
                carrot.meals[0].strInstructions +
                `
            </p>
            <a href=` +
                carrot.meals[0].strSource +
                `" class="btn btn" target="_blank" style="color: white; background-color: rgb(58,110,52); ">Read more</a>
            </div>
            </div>
            </div>`;
              $(".dropdown-recipes").append(createRecipeEl);
            });
        }
      });
  }
}
let selectedCountries = [];
init();
function renderBtn() {
  $(".selected-countries-container").empty();
  for (let i = 0; i < selectedCountries.length; i++) {
    const creatBtn =
      `<div class="button-container mx-3 ">
              <button class="country-btn btn border rounded" type="submit" data-index="` +
      i +
      `">` +
      selectedCountries[i] +
      `</button>
              <button type="button" class="closing-btn close border-0 bg-body text-danger fw-bold" aria-label="Close" data-index2="` +
      i +
      `" >x</button>
            </div> `;
    $(".selected-countries-container").append(creatBtn);
  }
}
// on click update recipes to country or delete the country and update local storage
$(".selected-countries-container").on("click", function (e) {
  const targetEl = $(e.target);
  console.log(targetEl);
  if (targetEl.hasClass("country-btn")) {
    let index = targetEl.attr("data-index");
    changeSelectedCountry(selectedCountries[index]);
    getRecipeByCountries();
  } else if (targetEl.hasClass("closing-btn")) {
    let i = targetEl.attr("data-index2");
    selectedCountries.splice(i, 1);
    toStoreCountries();
    renderBtn();
  }
});

function init() {
  const storedCountries =
    JSON.parse(localStorage.getItem("selected-countries")) || [];
  if (storedCountries !== null) {
    selectedCountries = storedCountries;
  }
  renderBtn();
}
// Iterate through each dropdown item and perform an action -- display recipe by country and create country btns
$(".dropdown-item").each(function (index, element) {
  const countryName = $(element).text().trim();
  $(element).on("click", function () {
    if (!selectedCountries.includes(countryName)) {
      //to avoid btn duplication
      selectedCountries.push(countryName);
    }
    selectedCountry = countryName;
    toStoreCountries(); //store data in loca storage
    renderBtn(); //call render btn to display buttons
    getRecipeByCountries(selectedCountry);
  });
});
// renderBtn();

function changeSelectedCountry(newVal) {
  selectedCountry = newVal;
}
function toStoreCountries() {
  localStorage.setItem("selected-countries", JSON.stringify(selectedCountries)); //update local storage
}
