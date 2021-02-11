
// Getting all the element by id
const searchBtn = document.getElementById('enter-btn');
const mealList = document.getElementById('menu-item-list');
const mealDetailsContent = document.querySelector('.meal-details-content');

//  Adding all event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', mealDetails);


function getMealList() {
    // getting the value of searchbar and removing the any white space using trim method.
    let searchInputTxt = document.getElementById('searchBar').value.trim();
    if (searchInputTxt == '') {
        alert("Likha pora na korle kaj hobe na! kisu khaite hoile likhte hoibe");
    } else {
        // passing the search input text as dynamic api call.
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
        .then(res => res.json())
        .then(data => displayMenu(data));
    }
}


// Method or function for Displaying all the matching meals.
const displayMenu = data => {
    // console.log(data.meals[0]);
    const mealDiv = document.getElementById('menu-item-list');
    let mealBox = "";

    if (data.meals) {
        data.meals.forEach(meal => {
            // mealbox will add forEach meal in the array/object.
            mealBox = mealBox + `
                <div class="col-2 meal-box mealDetails">
                    <div class ="meal-item" data-id ="${meal.idMeal}">
                        <div class = "meal-img">
                            <img class="recipe-btn" src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3 class="recipe-btn">${meal.strMeal}</h3>
                        </div>
                    </div>
                </div>      
            `;
        })
        mealDiv.classList.remove('notFound');
    } else {
        // if not match with a meal then show eror.
        mealBox = `<h1>Meal Not Found! try again</h1>`
        mealDiv.classList.add('notFound');
    }
    // passing all mealbox into mealDiv.
    mealDiv.innerHTML = mealBox;
}


// section for meal details
function mealDetails(meal) {
    if (meal.target.classList.contains('recipe-btn')) {
        let selectedMeal = meal.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedMeal.dataset.id}`)
        .then(res => res.json())
        .then(data => dispalyMealDetails(data.meals));
    }
}

let mealBox = ``

function dispalyMealDetails(meal) {
    meal = meal[0];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]
          }`
        );
      } else {
        break;
      }
    }

    
    mealBox = `
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        
        <div class = "recipe-instruct">
            <h3>Ingredients:</h3>
            <ul>
  ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
  </ul>
        </div>
    `;
    mealDetailsContent.innerHTML = mealBox;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}