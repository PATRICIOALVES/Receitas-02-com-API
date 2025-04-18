// Selecionando elementos do DOM
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('resultsContainer');
const loadingElement = document.getElementById('loading');

// Adicionando evento de click ao botão de busca
searchBtn.addEventListener('click', searchMeals);

// Adicionando evento de tecla "Enter" no campo de busca
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchMeals();
    }
});

// Função para buscar receitas
function searchMeals() {
    const ingredient = searchInput.value.trim();
    
    if (ingredient === '') {
        resultsContainer.innerHTML = '<p class="error-message">Por favor, digite um ingrediente!</p>';
        return;
    }

    // Mostrando indicador de carregamento
    loadingElement.style.display = 'block';
    resultsContainer.innerHTML = '';

    // Fazendo a requisição à API
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then(response => response.json())
        .then(data => {
            // Ocultando indicador de carregamento
            loadingElement.style.display = 'none';

            if (data.meals === null) {
                resultsContainer.innerHTML = '<p class="error-message">Nenhuma receita encontrada. Tente outro ingrediente!</p>';
                return;
            }

            // Exibindo os resultados
            displayMeals(data.meals);
        })
        .catch(error => {
            loadingElement.style.display = 'none';
            resultsContainer.innerHTML = '<p class="error-message">Ocorreu um erro ao buscar as receitas. Tente novamente mais tarde.</p>';
            console.error('Erro na busca de receitas:', error);
        });
}

// Função para exibir as receitas na página
function displayMeals(meals) {
    resultsContainer.innerHTML = '';

    meals.forEach(meal => {
        const mealItem = document.createElement('div');
        mealItem.classList.add('meal-item');

        mealItem.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-img">
            <div class="meal-info">
                <h3 class="meal-name">${meal.strMeal}</h3>
                <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank" class="meal-btn">Ver Receita</a>
            </div>
        `;

        resultsContainer.appendChild(mealItem);
    });
}

// Carregar algumas receitas iniciais para demonstração
window.addEventListener('load', () => {
    searchInput.value = 'chicken';
    searchMeals();
});