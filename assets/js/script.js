console.log('We are going to make a great job with this website');
const newsApiKey = '5dee72a8871c486ba5572ac2786a74b0';
// const mealApiKey = '1'

// fetch to get random recipe related news from news API / it works, displays 4 news /html will change, createEl should be updated
function getRandomNews() {
    const queryUrl = `https://newsapi.org/v2/everything?q=recipe&apiKey=${newsApiKey}`
    fetch(queryUrl).then(function (response) {
        return response.json();
    }).then(function(data) {
        console.log(data); // check data in console
        console.log('title: ' + data.articles[0].title )
        console.log('date: ' + dayjs(data.articles[0].publishedAd).format('DD/HH/YYYY'))
        console.log('read more url: ' + data.articles[0].url)
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
            `  <div class="card col-lg-3 col-md-4 col-sm-12" id="card4" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">` + newsTitle[i] +  `</h5>
              <p class="card-text">Published: ` + newsDate[i] + ` </p>
              <a href="`+ newsUrl[i] + `" class="btn btn-primary">Read the article</a>
            </div>`
            $('.articleCards').append(createNewsEl);
            console.log(createNewsEl);
        }

    })
}
getRandomNews();

// fetch to get random recipe to check data / it need to be selected by country
function getRecipeByCountries() {
    const queryUrlMeal = `https://www.themealdb.com/api/json/v1/1/random.php`
    fetch(queryUrlMeal).then(function (response) {
        return response.json();
    }).then(function(data) {
        console.log(data); // check data in console
        console.log('country: ' + data.meals[0].strArea)
        console.log('name: ' +data.meals[0].strMeal)
        console.log('instruction: ' + data.meals[0].strInstructions)
        console.log('url: ' + data.meals[0].strSource)
        console.log('jpeg: ' + data.meals[0].strMealThumb)
    })
}
;

// when country is selected it 
    // calls renders button and 
    // calls function that display recipes related to that country
    // store country and displayed recipies in local storage
$('.dropdown-item').on('click', function() {
    console.log('button is clicked')
    // console.log($('#american').text())
    renderBtn();
    // getRecipeByCountries()
})


// need a function to render buttons and if one country from dropdown selected display the country button on html
// let countryBtn = $('.dropdown-item');
let selectedCities;
let countryBtn = $('.dropdown-item');
let count=0;
function renderBtn() {
    // console.log('render btn is called');
    // $('.selected-countries-container').empty();
    countryBtn.each(function() {
        count++;
        console.log(count);
        console.log(countryBtn.text());

        // const createBtn = $('<button>').addClass('btn btn-primay').attr('data-name', country).text('hello');
        // $('.selected-countries-container').append(createBtn);
    })
}


// need a function to render recipe cards or update their content from API on website


