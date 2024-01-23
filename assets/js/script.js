// const newsApiKey = '5dee72a8871c486ba5572ac2786a74b0';
// const newNewsApiKey = '50d6ff56ed3fabcfebc9c75d14f055be';

// const mealApiKey = '1'

// fetch to get random recipe related news from news API / it works, displays 4 news /html will change, createEl should be updated
function getRandomNews() {
  // const queryUrl = `https://newsapi.org/v2/everything?q=recipe&apiKey=${newsApiKey}`
  const queryUrl = `https://gnews.io/api/v4/search?q=recipe&apikey=${newNewsApiKey}`;
  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data); // check data in console
      // console.log('title: ' + data.articles[0].title )
      // console.log('date: ' + dayjs(data.articles[0].publishedAd).format('DD/HH/YYYY'))
      // console.log('read more url: ' + data.articles[0].url)
      let newsTitle = [];
      let newsImg = [];
      let newsContent = [];
      let newsUrl = [];
      let numberOfNews = 4;
      // generate 4 random news and store the data in an array
      for (let i = 0; i < numberOfNews; i++) {
        newsTitle.push(data.articles[i].title);
        // newsDate.push(dayjs(data.articles[i].publishedAd).format('DD/HH/YYYY'));

        newsUrl.push(data.articles[i].url);
        newsContent.push(data.articles[i].description);
        newsImg.push(data.articles[i].image);
      }
      // create news blocks pull data from arrays // card html element might change!
      for (let i = 0; i < newsTitle.length; i++) {
        const createNewsEl =
          `<div class="col-sm-6">
            <div class="card">

              <img src="` +
          newsImg[i] +
          `" class="card-img-top" style="width: 100%; height: 100%; object-fit: cover; overflow: hidden;" alt="...">
                <h5 class="card-title mt-4">` +
          newsTitle[i] +
          `</h5>
                
                <p class="card-text">Published: ` +
          newsContent[i] +
          `</p>
                <a href="` +
          newsUrl[i] +
          `" class="btn btn" target="_blank" style="color: white; background-color: rgb(58,110,52);">Read the article</a>

            </div>
          </div>`;
        // `<div class="cardContainer col-lg-3 col-md-3 col-sm-12">
        // <div class="card">
        // <img src="..." class="card-img-top" alt="...">
        // <div class="card-body">
        //   <h5 class="card-title">` + newsTitle[i] +  `</h5>
        //   <p class="card-text">Published: ` + newsDate[i] + ` </p>
        //   <a href="`+ newsUrl[i] + `" class="btn" style="color: white; background-color: rgb(58,110,52)">Read the article</a>
        // </div>`
        $(".articles").append(createNewsEl);
        // console.log(createNewsEl);
      }
    });
}
// getRandomNews();

// fetch to get random recipe to check data / it need to be selected by country
let mealName = [];
let mealImg = [];
let mealUrl = [];
let mealInst = [];
let storeObj = [];
let selectedCountry = [];
function getRecipeByCountries() {
    $(".showsNear").empty();
  if (!(selectedCountry === null)) {
    // at first we need to get countries it give only food name and img
    const queryUrlMeal = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCountry}`;
    fetch(queryUrlMeal)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data); 
    //   let mealObj = {
    //     }
    //     for (let i = 0; i < 4; i++) {
    //         let key = "meal" + i;
    //         mealObj[key]={
    //             title: '',
    //             img: '',
    //             inst: '',
    //             source: ''
    //         }
    //         mealObj[key].title = data.meals[i].strMeal
    //         mealObj[key].img = data.meals[i].strMealThumb
    //         // console.log(data.meals[i].strMealThumb)
    //         // return data.meals[i].strMeal, data.meals[i].strMealThumb
    //     }
    //     console.log(mealObj);
    //   });
    let count = 0;
    for (let i = 0; i < 4; i++) {
        count++
        
      let mealNameOne = data.meals[i].strMeal;
      console.log(mealNameOne)
      const queryUrlMealDetails = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealNameOne}`;
      fetch(queryUrlMealDetails)
        .then(function (response) {
          return response.json();
        })
        .then(function (carrot) {
            // $(".showsNear").empty();
          const createRecipeEl =
            `<div class="cardContainer col-lg-3 col-md-3 col-sm-12">
            <div class="card">  
            <h5 class="card-title"></h5>      
            <div class="card-body">
            // <h5 class="card-title">`+ data.meals[i].strMeal +`</h5>
            // <img src="`+ data.meals[i].strMealThumb+`" class="card-img-top" alt="..."/>
            <p class="card-text">
                ` +
            carrot.meals[0].strInstructions +
            `
            </p>
            <a href=` +
            carrot.meals[0].strSource +
            ` class="btn btn" target="_blank" style="color: white; background-color: rgb(58,110,52); ">Read more</a>
            </div>
            </div>
            </div>`;
            console.log(count);
          $(".showsNear").append(createRecipeEl);
        });
    }
});
  }
}

// getRecipeByCountries();
let selectedCountries = [];
init();
function renderBtn() {
  $(".selected-countries-container").empty();
  for (let i = 0; i < selectedCountries.length; i++) {
    const creatBtn =
      `<div class="button-container mx-3 ">
        <button class="country-btn btn border rounded" type="submit">` +
      selectedCountries[i] +
      `</button><button type="button" class="closing-btn close border-0 bg-body" aria-label="Close"><span class="h4 text-danger" aria-hidden="true">&times;</span></button>
      </div> `;
    $(".selected-countries-container").append(creatBtn);
    $(".country-btn").on("click", function (e) {
      const needRecipe = $(e.target).text().trim();
      $(".showsNear").empty();
      // location.reload();
    //   console.log("country i need recipe: " + needRecipe);
      changeSelectedCountry(needRecipe);
      // console.log(selectedCountry);
      getRecipeByCountries(needRecipe);
    });
    $(".closing-btn").on("click", function (e) {
      const btnName = $(e.target).text().trim();
    //   console.log(btnName);
      let i = selectedCountries.indexOf(btnName);
      selectedCountries.splice(i, 1);
    //   console.log(selectedCountries);
      toStoreCountries(); //update local storage
      renderBtn();
      // location.reload();
    });
    //   console.log(creatBtn);
  }
}
function init() {
//   console.log("init");
  const storedCountries =
    JSON.parse(localStorage.getItem("selected-countries")) || [];
  if (storedCountries !== null) {
    selectedCountries = storedCountries;
    // console.log(selectedCountries);
  }
  renderBtn();
}
// Iterate through each dropdown item and perform an action
// let selectedCountries = storedCountries; //set storedCountries to selectedCountries to save display data after reload the page
$(".dropdown-item").each(function (index, element) {
  const countryName = $(element).text().trim();
  // console.log('Country Name:', countryName);
  $(element).on("click", function () {
    // console.log('Clicked on:', countryName);
    if (!selectedCountries.includes(countryName)) {
      //to avoid btn duplication
      selectedCountries.push(countryName);
    }
    selectedCountry = countryName;
    // console.log(selectedCountry);
    toStoreCountries(); //store data in loca storage
    // console.log(selectedCountries);
    renderBtn(); //call render btn to display buttons
    getRecipeByCountries(selectedCountry);
    // changeSelectedCountry(countryName);
  });
});
// renderBtn();

// when closing tag on button is clicked delete countryname from local storage and from array / figure out how to delete from dislplay without reloading the page
// $('.close').each(function(index, el) {
//     const btnName = $(el).siblings().text().trim();
//     console.log(btnName);
//     $(el).on('click', function(e) {
//         e.preventDefault();
//         console.log(btnName)
//         let i = selectedCountries.indexOf(btnName);
//         selectedCountries.splice(i, 1);
//         console.log(selectedCountries)
//         toStoreCountries(); //update local storage
//         renderBtn();
//         location.reload();
//         // init();
//     })
//     // renderBtn();

// })

// select countrybtn list recipe
// $('.country-btn').each(function(index, el){
//     console.log('clicked country')
//     const needRecipe = $(el).text().trim();
//     // $(el).on('click', function(){

//     //     $('.showsNear').empty();
//     //     // location.reload();
//     //     console.log('country i need recipe: ' + needRecipe)
//     //     changeSelectedCountry(needRecipe);
//     //     // console.log(selectedCountry);
//     //     getRecipeByCountries(needRecipe);

//     // })
// })

function changeSelectedCountry(newVal) {
  selectedCountry = newVal;
}
function toStoreCountries() {
  localStorage.setItem("selected-countries", JSON.stringify(selectedCountries)); //update local storage
}
