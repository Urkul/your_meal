import { catalogList, countAmount, modalDelivery, modalProductBtn, order, orderCount, orderList, orderSubmit, orderTotalAmount, orderWrapTitle } from "./elements.js";
import { getData } from "./getData.js";
import { API_URL, PREFIX_PRODUCT } from "./const.js";
import { orderController } from "./orderController.js";

const getCart = () => {
    const cartList = localStorage.getItem('cart');
    // console.log('cartList: ', cartList);
    if (cartList) {
        return JSON.parse(cartList);
    } else {
        return [];
    }
};

const renderCartList = async () => {
    const cartList = getCart();
    // console.log('cartList: ', cartList);
    // блокировка кнопки заказа
    orderSubmit.disabled = !cartList.length;
    // получение товара с сервера
    const allIdProduct = cartList.map(item => item.id);
    const data = cartList.length
        ? await getData(`${API_URL}${PREFIX_PRODUCT}?list=${allIdProduct}`)
        : [];
    // console.log(data);
    // вывод количества товара
    const countProduct = cartList.reduce((acc, item) => acc + item.count, 0); 
    orderCount.textContent = countProduct;

    // вывод заказаных товаров
    const cartItems = data.map(item => {
        const li = document.createElement('li');
        li.classList.add('order__item');
        li.dataset.idProduct = item.id;

        const product = cartList.find((cartItem => cartItem.id === item.id));

        li.innerHTML = `
            <img class="order__image" src="${API_URL}/${item.image}" alt="${item.title}">

            <div class="order__product">
                <h3 class="order__product-title">${item.title}</h3>

                <p class="order__product-weight">${item.weight}г</p>

                <p class="order__product-price">${item.price}
                    <span class="currency">₴</span>        
                </p>
            </div>

            <div class="order__product-count count">
                <button class="count__minus" data-id-product=${product.id}>-</button>
                <p class="count__amount">${product.count}</p>
                <button class="count__plus" data-id-product=${product.id}>+</button>
            </div>
        `;

        return li;
    });

    orderList.textContent = '';
    orderList.append(...cartItems);

    // вывод стоимости
    orderTotalAmount.textContent = data.reduce((acc, item) => {
        const product = cartList.find((cartItem => cartItem.id === item.id));
        return acc + (item.price * product.count);
    }, 0);
};

const updateCartList = (cartList) => {
    localStorage.setItem('cart', JSON.stringify(cartList));
    renderCartList();
};

const addCart = (id, count = 1) => {
    const cartList = getCart();
    const product = cartList.find((item) => item.id === id);

    if (product) {
        product.count += count;
    } else {
        cartList.push({id, count});
    }

    updateCartList(cartList);
};

const removeCart = (id) => {
    // console.log(id);
    const cartList = getCart();
    const productIndex = cartList.findIndex((item) => item.id === id);
    cartList[productIndex].count -= 1;
    // удаление карточки товара с корзины
    if (cartList[productIndex].count < 1) {
        cartList.splice(productIndex, 1);
    }

    updateCartList(cartList);
};

export const clearCart = () => {
    // localStorage.clear();
    localStorage.removeItem('cart');

    renderCartList();
};

const cartController = () => {
    catalogList.addEventListener('click', ({target}) => {
        // if (target.closest('.product__add')) {
        //     addCart(target.closest('.product').dataset.idProduct);
        // }
        if (target.matches('.product__add')) {
            addCart(target.closest('.product').dataset.idProduct);
        }
        // if (target.classList.contains('product__add')) {
        //     addCart(target.closest('.product').dataset.idProduct);
        // }
    });

    modalProductBtn.addEventListener('click', () => {
        addCart(modalProductBtn.dataset.idProduct, parseInt(countAmount.textContent));
    });

    orderList.addEventListener('click', ({target}) => {
        const targetPlus = target.closest('.count__plus');
        const targetMinus = target.closest('.count__minus');

        if (targetPlus) {
            addCart(targetPlus.dataset.idProduct);
        }

        if (targetMinus) {
            removeCart(targetMinus.dataset.idProduct);
        }
    });

    // if (window.innerWidth >= 1024) {
    //     order.classList.add('order_open');
    //     // console.log(window.innerWidth);
    // } else {
    orderWrapTitle.addEventListener('click', () => {
        order.classList.toggle('order_open');
    });    
    // }

    orderSubmit.addEventListener('click', () => {
        modalDelivery.classList.add('modal_open');
    });

    modalDelivery.addEventListener('click', ({ target }) => {
        if (target.closest('.modal__close') || modalDelivery === target) {
            modalDelivery.classList.remove('modal_open');
        }
    });
};

export const cartInit = () => {
    cartController();
    renderCartList();
    orderController(getCart);
}