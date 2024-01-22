const newsApiKey = '5dee72a8871c486ba5572ac2786a74b0';
// const mealApiKey = '1'

// fetch to get random recipe related news from news API / it works, displays 4 news /html will change, createEl should be updated
function getRandomNews() {
    const queryUrl = `https://newsapi.org/v2/everything?q=recipe&apiKey=${newsApiKey}`
    fetch(queryUrl).then(function (response) {
        return response.json();
    }).then(function(data) {
        console.log(data); // check data in console
        // console.log('title: ' + data.articles[0].title )
        // console.log('date: ' + dayjs(data.articles[0].publishedAd).format('DD/HH/YYYY'))
        // console.log('read more url: ' + data.articles[0].url)
        let newsTitle = [];
        let newsDate = [];
        let newsUrl = [];
        let numberOfNews = 4;
        // generate 4 random news and store the data in an array
        for (let i=0; i< numberOfNews; i++) {
            newsTitle.push(data.articles[i].title);
            newsDate.push(dayjs(data.articles[i].publishedAd).format('DD/HH/YYYY'));
            newsUrl.push(data.articles[i].url);
        }
        // create news blocks pull data from arrays // card html element might change! 
        for (let i=0; i<newsTitle.length; i++) {
            const createNewsEl = 
            `<div class="cardContainer col-lg-3 col-md-3 col-sm-12">
            <div class="card">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">` + newsTitle[i] +  `</h5>
              <p class="card-text">Published: ` + newsDate[i] + ` </p>
              <a href="`+ newsUrl[i] + `" class="btn" style="color: white; background-color: rgb(58,110,52)">Read the article</a>
            </div>`
            $('.articleCards').append(createNewsEl);
            // console.log(createNewsEl);
        }

    })
}
getRandomNews();

// fetch to get random recipe to check data / it need to be selected by country
let mealName = [];
let mealImg = [];
let mealUrl = [];
let mealInst = [];

let selectedCountry = [];
function getRecipeByCountries() {
    if (!(selectedCountry === null)) {
        // at first we need to get countries it give only food name and img
        const queryUrlMeal = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCountry}`
        fetch(queryUrlMeal).then(function (response) {
            return response.json();
        }).then(function(data) {
            console.log(data); // check data in console
            // console.log('country: ' + data.meals[0].strArea)
            // console.log('name: ' +data.meals[0].strMeal)
            // console.log('instruction: ' + data.meals[0].strInstructions)
            // console.log('url: ' + data.meals[0].strSource)
            // console.log('jpeg: ' + data.meals[0].strMealThumb)
            mealName = [];
            mealImg = [];
            mealUrl = [];
            mealInst = [];
            for (let i = 0; i<4; i++) {
                mealName.push(data.meals[i].strMeal);
                mealImg.push(data.meals[i].strMealThumb);
                console.log(data.meals[i].strMealThumb)
            }
            console.log(mealName, mealImg);
            // need another fetch to get and console all recipes (4pcs) related to country
            for (let i=0; i<mealName.length; i++) {
                let mealNameOne = mealName[i];
                const queryUrlMealDetails = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealNameOne}`;
                fetch(queryUrlMealDetails).then(function (response) {
                    return response.json();
                }).then(function(data){
                    // console.log(data.meals[0].strSource)
                    mealUrl.push(data.meals[0].strSource);
                    mealInst.push(data.meals[0].strInstructions);

                })
            }
            console.log(typeof(mealUrl));
            console.log(typeof(mealInst));
            const instValue = Object.values(mealInst);

            console.log(Object.keys(mealInst));
            console.log(Object.values(mealUrl));
            console.log(mealInst);
            for (const key in mealUrl) {
                if (mealUrl.hasOwnProperty(key)) {
                    const value = mealUrl[key];
                    console.log(value);
                }

            }

            for (let i=0; i<mealName.length; i++) {
                const createRecipeEl = 
                `<div class="cardContainer col-lg-3 col-md-3 col-sm-12">
                <div class="card">
                <img src="`+ mealUrl[i] +`" class="card-img-top" alt="..."/>
                <div class="card-body">
                <h5 class="card-title">`+ mealName[i] +`</h5>
                <p class="card-text">
                    `+mealInst[i]+`
                </p>
                <a href=`+mealUrl[i]+` class="btn btn" style="color: white; background-color: rgb(58,110,52); ">Read more</a>
                </div>
            </div>
            </div>`
                $('.showsNear').append(createRecipeEl);
                // console.log(createRecipeEl);
            }

        })
    }    
};
// getRecipeByCountries();

function renderBtn() {
    $('.selected-countries-container').empty();
    for (let i = 0; i < selectedCountries.length; i++) {
        const creatBtn = `<div class="button-container mx-3 border rounded">
        <button class="country-btn btn" type="submit">`+ selectedCountries[i] +`</button><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div> `
      $('.selected-countries-container').append(creatBtn);
    //   console.log(creatBtn);
    }
}
const storedCountries = JSON.parse(localStorage.getItem('selected-countries')) || [];  

// Iterate through each dropdown item and perform an action
let selectedCountries = storedCountries; //set storedCountries to selectedCountries to save display data after reload the page
$('.dropdown-item').each(function(index, element) {
    const countryName = $(element).text().trim();
    // console.log('Country Name:', countryName);
    $(element).on('click', function() {
        // console.log('Clicked on:', countryName);
        if (!selectedCountries.includes(countryName)) { //to avoid btn duplication
            selectedCountries.push(countryName);           
        }
        selectedCountry = countryName;
        console.log(selectedCountry)
        toStoreCountries(); //store data in loca storage
        console.log(selectedCountries);
        renderBtn(); //call render btn to display buttons
        // changeSelectedCountry(countryName);
    });
});
renderBtn();

// when closing tag on button is clicked delete countryname from local storage and from array / figure out how to delete from dislplay without reloading the page
$('.close').each(function(index, el) {
    const btnName = $(el).siblings().text().trim();
    console.log(btnName);
    $(el).on('click', function() {
        console.log(btnName)
        let i = selectedCountries.indexOf(btnName);
        selectedCountries.splice(i, 1);
        console.log(selectedCountries)

        toStoreCountries(); //update local storage
        renderBtn();

    })
    // renderBtn();
})

// select countrybtn list recipe
$('.country-btn').each(function(index, el){
    console.log('clicked country')
    const needRecipe = $(el).text().trim();
    $(el).on('click', function(){
        $('.showsNear').empty();
        console.log('country i need recipe: ' + needRecipe)
        changeSelectedCountry(needRecipe);
        // console.log(selectedCountry);
        getRecipeByCountries(needRecipe);
    })
})

function changeSelectedCountry(newVal) {
    selectedCountry = newVal;
}
function toStoreCountries() {
    localStorage.setItem('selected-countries', JSON.stringify(selectedCountries)); //update local storage
}