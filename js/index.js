// const productDetail = document.querySelector('.product__detail');

import {
    modalProduct,
    catalogList,
    modalDelivery,
    // modalProductTitle,
    // modalProductImage,
    // modalProductDescription,
    // ingredientsList,
    // ingredientsCalories,
    // modalProductPriceCount
} from "./elements.js";

// import { createCardProduct } from "./createCardProduct.js";
import { openModal } from "./openModal.js";
import { renderListProduct } from "./renderListProduct.js";
import { navigationListController } from "./navigationListController.js";
import { cartInit } from "./cart.js";


// stop scroll
const scrollController = {
    scrollPosition: 0,
    disabledScroll() {
        scrollController.scrollPosition = window.scrollY;
        document.body.style.cssText = `
        overflow: hidden;
        position: fixed;
        top: -${scrollController.scrollPosition}px;
        left: 0;
        // height: 100vh;
        width: 100vw;
        padding-right: ${window.innerWidth - document.body.offsetWidth}px
    `;
        document.documentElement.style.scrollBehavior = 'unset';
    },
    enabledScroll() {
        document.body.style.cssText = '';
        window.scroll({ top: scrollController.scrollPosition })
        document.documentElement.style.scrollBehavior = '';
    },
}

// const modalProduct = document.querySelector('.modal_product');
// const catalogList = document.querySelector('.catalog__list');

// const modalDelivery = document.querySelector('.modal_delivery');

// const burgerBig = {
//     title: 'Большой бургер',
//     price: 1000,
//     weight: 500,
//     calories: 1500,
//     description: 'Огромный бургер, хватит на всю команду. Большая рубленая котлета из свежего говяжего мяса покорит вас своей сочностью, а хрустящие листья салата добавят свежести.',
//     image: '../img/burger_heavy-blow.jpg',
//     ingredients: [
//         'Пшеничная булочка',
//         'Мега котлета из говядины',
//         'Много сыра',
//         'Листья салата',
//         'Чипотл'
//     ]
// };

// const openModal = (product) => {
    
//     // const modalProductTitle = document.querySelector('.modal-product__title');
//     // const modalProductImage = document.querySelector('.modal-product__image');
//     // const modalProductDescription = document.querySelector('.modal-product__description');
//     // const ingredientsList = document.querySelector('.ingredients__list');
//     // const ingredientsCalories = document.querySelector('.ingredients__calories');
//     // const modalProductPriceCount = document.querySelector('.modal-product__price-count');

//     modalProductTitle.textContent = product.title;
//     modalProductImage.src = product.image;

//     ingredientsList.textContent = '';

//     // перебор массива
//     // for (let i = 0; i < product.ingredients.length; i++) {
//     //     const li = document.createElement('li');
//     //     li.classList.add('ingredients__item');
//     //     li.textContent = product.ingredients[i];
//     //     ingredientsList.append(li);
//     // }

//     // product.ingredients.forEach((item) => {
//     //     const li = document.createElement('li');
//     //     li.classList.add('ingredients__item');
//     //     li.textContent = item;
//     //     ingredientsList.append(li);
//     // });

//     // const arr = [1, 2, 3, 4, 5];
//     // arr.forEach((element, i) => {
//     //     console.log(element, i);
//     // });

//     // const foo = (element, i) => {
//     //     console.log(element, i);
//     // }
//     // arr.forEach(foo);

//     const ingredientsListItems = [];

//     for (let i = 0; i < product.ingredients.length; i++) {
//         const li = document.createElement('li');
//         li.classList.add('ingredients__item');
//         li.textContent = product.ingredients[i];
//         ingredientsListItems.push(li);
//     }

//     // const ingredientsListItems = product.ingredients.map((item) => {
//     //     const li = document.createElement('li');
//     //     li.classList.add('ingredients__item');
//     //     li.textContent = item;
//     //     return li;
//     // });
//     // console.log(...ingredientsListItems);

//     ingredientsList.append(...ingredientsListItems);

//     modalProductDescription.textContent = product.description;
//     ingredientsCalories.textContent = `${product.weight}г, ккал ${product.calories}`;
//     modalProductPriceCount.textContent = product.price;

//     modalProduct.classList.add('modal_open');

// };

// const createCardProduct = (product) => {
//     const li = document.createElement('li');
//     li.classList.add('catalog__item');

//     li.innerHTML = `
//         <article class="product">
//             <div class="product__image-wrapper">
//                 <img src="${product.image}" alt="${product.title}" class="product__image">
//             </div>

//             <p class="product__price">${product.price}<span class="currency">₴</span></p>

//             <h3 class="product__title">
//                 <button class="product__detail">${product.title}</button>
//             </h3>

//             <p class="product__weight">${product.weight}г</p>

//             <button class="product__add" type="button">Добавить</button>
//         </article>
//     `;

//     return li;
// }


// catalogList.textContent = '';

// const item = createCardProduct(burgerBig);

// catalogList.append(item);

// catalogList.append(
//     createCardProduct(burgerBig),
//     createCardProduct(burgerBig),
//     createCardProduct(burgerBig)
// );

// const card = [
//     createCardProduct(burgerBig),
//     createCardProduct(burgerBig),
//     createCardProduct(burgerBig),
//     createCardProduct(burgerBig),
//     createCardProduct(burgerBig),
//     createCardProduct(burgerBig)
// ];

// catalogList.append(...card);


const closeModalEsc = (event) => {
    // console.log('event: ', event.code);
    // console.log('event: ', event.key);
    // console.log('event: ', event.keyCode);
    // console.log('event: ', event.which);

    if (event.key === 'Escape') {
        modalProduct.classList.remove('modal_open');
        document.removeEventListener('keydown', closeModalEsc);    
        scrollController.enabledScroll();
    }
}

const modalProductBtn = document.querySelector('.modal-product__btn');

catalogList.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target.closest('.product__detail') || target.closest('.product__image')) {
        const id = target.closest('.product').dataset.idProduct;
        openModal(id);

        modalProductBtn.focus();
        document.addEventListener('keydown', closeModalEsc);

        scrollController.disabledScroll();
    }
});

// modalProduct.addEventListener('click', (event) => {
//     console.log(event.target);
//     const target = event.target;
//     // console.log('target: ', target.closest('.modal__close'));
//     if (target.closest('.modal__close') || target === modalProduct) {
//         modalProduct.classList.remove('modal_open');
//         scrollController.enabledScroll();
//     }
    
// });

const closeModal = ({ target, currentTarget }) => {
    
    if (target.closest('.modal__close') || target === currentTarget) {
        currentTarget.classList.remove('modal_open');
        scrollController.enabledScroll();
    }
};


modalProduct.addEventListener('click', closeModal);
modalDelivery.addEventListener('click', closeModal);


const init = () => {
    renderListProduct();
    // navigationListController(renderListProduct);
    navigationListController();
    cartInit();
}

init();



// // // const response = fetch('http://localhost:3024/api/product/4941077801');
// // // console.log('response: ', response);


// // // const result = new Promise((resolve, reject) => {
// // //     //  запрос на сервер
// // //     setTimeout(() => {
// // //         if (true) {
// // //             resolve('успешно');
// // //         } else {
// // //             reject('ошибка');
// // //         }
// // //     }, 1000);
// // // });

// // // console.log('result: ', result);

// // // result.then((response) => {
// // //     console.log('response 1s: ', response);
// // // });


// // const getResult = () => {
// //     return new Promise((resolve, reject) => {
// //         //  запрос на сервер
// //         setTimeout(() => {
// //             if (true) {
// //                 resolve('успешно');
// //             } else {
// //                 reject('ошибка');
// //             }
// //         }, 3000);
// //     });
// // }

// // // console.log('result: ', result);

// // getResult().then((response) => {
// //     console.log('response 3s: ', response);
// // });

// // const foo = async () => {
// //     const result = await getResult();
// //     console.log('result: ', result);
// // }

// // foo();



// const getProduct = () => fetch('http://localhost:3024/api/product/4941077801');

// getProduct()
//     .then((response) => {
//         // console.log('response: ', response);
//         return response.json();
//     })
//     .then(data => {
//         console.log(data);
//     });


// const foo = async () => {
//     const response = await getProduct();
//     // const text = await response.text();
//     // console.log('text: ', text);
//     const data = await response.json();
//     // console.log('data: ', data);
//     return data;
// }

// foo().then(data => {
//     console.log('data: ', data);
// });


