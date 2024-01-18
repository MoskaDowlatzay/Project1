console.log('We are going to make a great job with this website');
const newsApiKey = '5dee72a8871c486ba5572ac2786a74b0';
const mealApiKey = '1'

function getRandomNews() {
    const queryUrl = `https://newsapi.org/v2/everything?q=recipe&apiKey=${newsApiKey}`
    fetch(queryUrl).then(function (response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        console.log('title: ' + data.articles[0].title )
        console.log('date: ' + dayjs(data.articles[0].publishedAd).format('DD/HH/YYYY'))
        console.log('read more url: ' +data.articles[0].url)
    })
}
getRandomNews();

function getRecipeByCountries() {
    const queryUrlMeal = `https://www.themealdb.com/api/json/v1/1/random.php`
    fetch(queryUrlMeal).then(function (response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        console.log('country: ' + data.meals[0].strArea)
        console.log('name: ' +data.meals[0].strMeal)
        console.log('instruction: ' + data.meals[0].strInstructions)
        console.log('url: ' + data.meals[0].strSource)
        console.log('jpeg: ' + data.meals[0].strMealThumb)
    })
}
getRecipeByCountries();