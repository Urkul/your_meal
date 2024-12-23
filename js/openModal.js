import { API_URL, PREFIX_PRODUCT } from "./const.js";
import {
    ingredientsList,
    modalProductTitle,
    modalProductImage,
    modalProductDescription,
    // ingredientsList,
    ingredientsCalories,
    modalProductPriceCount,
    modalProduct,
    modalProductBtn
} from "./elements.js";
import { getData } from "./getData.js";


export const openModal = async (id) => {
    
    const product = await getData(`${API_URL}${PREFIX_PRODUCT}/${id}`);
    // const modalProductTitle = document.querySelector('.modal-product__title'); 
    // const modalProductImage = document.querySelector('.modal-product__image'); 
    // const modalProductDescription = document.querySelector('.modal-product__description'); 
    // const ingredientsList = document.querySelector('.ingredients__list'); 
    // const ingredientsCalories = document.querySelector('.ingredients__calories'); 
    // const modalProductPriceCount = document.querySelector('.modal-product__price-count');

    modalProductTitle.textContent = product.title;
    modalProductImage.src = `${API_URL}/${product.image}`;

    ingredientsList.textContent = '';

    // перебор массива
    // for (let i = 0; i < product.ingredients.length; i++) {
    //     const li = document.createElement('li');
    //     li.classList.add('ingredients__item');
    //     li.textContent = product.ingredients[i];
    //     ingredientsList.append(li);
    // }

    // product.ingredients.forEach((item) => {
    //     const li = document.createElement('li');
    //     li.classList.add('ingredients__item');
    //     li.textContent = item;
    //     ingredientsList.append(li);
    // });

    // const arr = [1, 2, 3, 4, 5];
    // arr.forEach((element, i) => {
    //     console.log(element, i);
    // });

    // const foo = (element, i) => {
    //     console.log(element, i);
    // }
    // arr.forEach(foo);

    const ingredientsListItems = [];

    for (let i = 0; i < product.ingredients.length; i++) {
        const li = document.createElement('li');
        li.classList.add('ingredients__item');
        li.textContent = product.ingredients[i];
        ingredientsListItems.push(li);
    }

    // const ingredientsListItems = product.ingredients.map((item) => {
    //     const li = document.createElement('li');
    //     li.classList.add('ingredients__item');
    //     li.textContent = item;
    //     return li;
    // });
    // console.log(...ingredientsListItems);

    ingredientsList.append(...ingredientsListItems);

    modalProductDescription.textContent = product.description;
    ingredientsCalories.textContent = `${product.weight}г, ккал ${product.calories}`;
    modalProductPriceCount.textContent = product.price;
    modalProductBtn.dataset.idProduct = product.id;

    modalProduct.classList.add('modal_open');

};