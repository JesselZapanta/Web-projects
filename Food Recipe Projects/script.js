const featured = document.querySelector(".featured");

window.addEventListener("load", getFeaturedMeal);

// 
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDeatailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById("recipe-close-btn");
const message = document.querySelector(".title");
// Event

searchBtn.addEventListener("click", getMealList);
window.addEventListener("load", getMealList);

mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDeatailsContent.parentElement.classList.remove('showRecipe');
})

// Featured
function getFeaturedMeal(){
    let url = `https://www.themealdb.com/api/json/v1/1/random.php`

    fetch(url)
    .then(resp => resp.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class="featured-thumbnail">
                        <img src="${meal.strMealThumb}">
                    </div>
                    <div class="featured-info">
                        <div class="featured-meal-name">
                            <h2>${meal.strMeal}</h2>
                        </div>
                        <div class="meal-instruct">
                            <p>
                                ${meal.strInstructions}
                            </p>
                        </div>
                    </div>
                `;
            })
        } 
        featured.innerHTML = html;
    })
}


// get meal
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();    
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(res=>res.json())
    .then(data=> {
        let html = "";
        console.log(data.meals)
        if(data.meals){
            data.meals.forEach(meal =>  {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            })
            message.innerText = "Your search recipe for " + searchInputTxt;
            mealList.classList.remove('notFound');
        } else {
            html = "Sorry, we didn't find any meal for " + searchInputTxt;
            mealList.classList.add('notFound');
            message.style.display = "none";
        }
        mealList.innerHTML = html;
    });
}
// get recipe
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        console.log(mealItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// modal

function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Instructions</h3>
        <p>
            ${meal.strInstructions}
        </p>
    </div>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="food">
    </div>
    <div class="recipe-link">
    <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
    </div>
    `;
    mealDeatailsContent.innerHTML = html;
    mealDeatailsContent.parentElement.classList.add('showRecipe');
}