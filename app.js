
// Getting all the element by id
const searchBtn = document.getElementById('enter-btn');
const mealList = document.getElementById('');

//  Adding all event listeners
searchBtn.addEventListener('click', getMealList);


function getMealList() {
    // getting the value of searchbar and removing the any white space using trim method.
    let searchInputTxt = document.getElementById('searchBar').value.trim();

    // passing the search input text as dynamic api call.
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
        .then(res => res.json())
        .then(data => displayMenu(data));
}


// Method or function for Displaying all the matching meals.
const displayMenu = data => {
    const mealDiv = document.getElementById('menu-item-list');
    let mealBox = "";

    if (data.meals) {
        data.meals.forEach(meal => {
            // mealbox will add forEach meal in the array/object.
            mealBox = mealBox + `
            <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn btn btn-success">Get Recipe</a>
                        </div>
                    </div>
            `;
        })
    } else {
        // if not match with a meal then show eror.
        mealBox = "Meal not found! try again";
    }
    // passing all mealbox into mealDiv.
    mealDiv.innerHTML = mealBox;
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



