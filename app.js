
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
    const mealDiv = document.getElementById('menu-item-list');
    let mealBox = "";

    if (data.meals) {
        data.meals.forEach(meal => {
            // mealbox will add forEach meal in the array/object.
            mealBox = mealBox + `

                
                <div class="col-2 meal-box">
                    <div class ="meal-item" data-id ="${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn btn btn-warning">Get Recipe</a>
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

function dispalyMealDetails(meal) {
    meal = meal[0];
    let mealBox = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = mealBox;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}













// const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${menu}`
// fetch(url)
// .then(res => res.json())
// .then(data => displayMenu(data));

// const displayMenuasdf = data => {
//     console.log(data);
// }

// const searchBar = document.getElementById('searchBar');

// searchBar.addEventListener('keyup', (e) => {
//     console.log(e.target.value);
// });


// const showResult = name => {
//     const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`;
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displayMenu(data));
// }



