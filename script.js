// api function to show all food
function getFood(foodName) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(res => res.json())
        .then(data => {
            const mealArray = data.meals;
            mealArray.forEach(food => {
                // console.log(food)
                displayFood(food)
            });
        })
        .catch(error => alert('Please Give A Valid Food Name'))
}
// creating food box
const displayFood = mealBox => {
    const foodArea = document.getElementById('foodArea');
    const foodDiv = document.createElement('div');
    foodDiv.className = 'food';
    const foodInfo =
        `<img onclick="displayIngredient('${mealBox.idMeal}')" class="food-img" src="${mealBox.strMealThumb}" alt="">
                <h3 onclick="displayIngredient('${mealBox.idMeal}')" class="food-name">${mealBox.strMeal}</h3>`
    foodDiv.innerHTML = foodInfo;
    foodArea.appendChild(foodDiv);
}
// search button handler
document.getElementById('search').addEventListener('click', function () {
    // getting foodName
    const meal = document.getElementById('meal').value;
    // checking that search value is not empty
    if (meal == "") {
        alert('Please Provide a Food Name')
    } else {
        getFood(meal);
    }
    document.getElementById('meal').value = "";
    document.getElementById('foodArea').innerText = "";
})

// api function to show Ingredient
const displayIngredient = name => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`)
        .then(res => res.json())
        .then(data => {
            const Array = data.meals;
            Array.forEach(id => {
                ingredient(id)
            });
        })
}
// ingredient display function
const ingredient = IngredientID => {
    const ingredients = document.getElementById('ingredients');
    ingredients.innerHTML = `<div class="ingredient">
            <img class="ingredient-img" src="${IngredientID.strMealThumb}" alt="">
            <h3 class="ingredient-name">${IngredientID.strMeal}</h3>
            <h5 class="IngredientID-title">Ingredient</h5>
            <ul>
                <li>${IngredientID.strMeasure1} ${IngredientID.strIngredient2}</li>
                <li>${IngredientID.strMeasure2} ${IngredientID.strIngredient3}</li>
                <li>${IngredientID.strMeasure3} ${IngredientID.strIngredient1}</li>
                <li>${IngredientID.strMeasure4} ${IngredientID.strIngredient4}</li>
                <li>${IngredientID.strMeasure5} ${IngredientID.strIngredient5}</li>
                <li>${IngredientID.strMeasure6} ${IngredientID.strIngredient6}</li>
                <li>${IngredientID.strMeasure7} ${IngredientID.strIngredient7}</li>
                <li>${IngredientID.strMeasure8} ${IngredientID.strIngredient8}</li>
                <li>${IngredientID.strMeasure9} ${IngredientID.strIngredient9}</li>
                <li>${IngredientID.strMeasure10} ${IngredientID.strIngredient10}</li>
                <li>${IngredientID.strMeasure11} ${IngredientID.strIngredient11}</li>
                <li>${IngredientID.strMeasure12} ${IngredientID.strIngredient12}</li>
                <li>${IngredientID.strMeasure13} ${IngredientID.strIngredient13}</li>
                <li>${IngredientID.strMeasure14} ${IngredientID.strIngredient14}</li>
                <li>${IngredientID.strMeasure15} ${IngredientID.strIngredient15}</li>
            </ul>
        </div>`
}