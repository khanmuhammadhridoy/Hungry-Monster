// api function to show all food
function getFood(foodName) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(res => res.json())
        .then(data => {
            const mealArray = data.meals;
            mealArray.forEach(food => {
                displayFood(food);
            });
        })
        .catch(error => {
            document.getElementById('error').innerHTML = `<h1><span class = "red">${foodName}</span> is not available.Please
            search another one.</h1>`;
            toggleSpinner();

        })

    // .catch(error => error)
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
    toggleSpinner();
}
// Enter Key function Added for search
document.getElementById("meal").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault()
        document.getElementById('search').click();
    }
});
// search button handler
document.getElementById('search').addEventListener('click', function () {
    // getting foodName
    const meal = document.getElementById('meal').value;
    // checking that search value is not empty
    if (meal == "") {
        getFood("a");
        // alert('Please Provide a Food Name');
    } else {
        getFood(meal);
    }
    document.getElementById('meal').value = "";
    document.getElementById('foodArea').innerText = "";
    document.getElementById('ingredients').innerText = "";
    document.getElementById('error').innerText = "";
    toggleSpinner();
})

// api function to show Ingredient
const displayIngredient = name => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`)
        .then(res => res.json())
        .then(data => {
            const Array = data.meals;
            ingredient(Array[0]);
            // console.log(Array);
            // Array.forEach(id => {
            //     ingredient(id)
            // });
        })
}
// ingredient display function
const ingredient = IngredientId => {
    // console.log(IngredientID);

    const ingredients = document.getElementById('ingredients');
    ingredients.innerHTML = `<div class="ingredient">
            <img class="ingredient-img" src="${IngredientId.strMealThumb}" alt="">
            <h3 class="ingredient-name d-flex justify-content-between">${IngredientId.strMeal} (${IngredientId.strArea})</h3>
            <h5 class="IngredientID-title">Ingredient</h5>
            <ul id="ingredientList">
            </ul>
            <h4>How To make : <span> <a class="link" target="_blank" href="${IngredientId.strYoutube}">Watch Video </a></span></h4> 
            <p class= "instructions">${IngredientId.strInstructions} </p>
        </div>`
    let j = 0;
    for (let i in IngredientId) {
        // console.log(IngredientId[`strIngredient1`])
        j++;
        if (IngredientId[`strIngredient${j}`] != null && IngredientId[`strIngredient${j}`] != "") {
            const ul = document.getElementById("ingredientList");
            const li = document.createElement('li');
            li.innerText = `${IngredientId[`strMeasure${j}`]} ${IngredientId[`strIngredient${j}`]}`;
            ul.appendChild(li);
            // console.log();
        }
    }
}
// loadingSpinner function
const toggleSpinner = () => {
    const spinner = document.getElementById("loadingSpinner")
    spinner.classList.toggle("invisible");
}