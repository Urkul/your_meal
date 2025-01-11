import { clearCart } from "./cart.js";
import { modalDeliver, modalDelivery, modalDeliveryContainer, modalDeliveryForm, modalThankWindow, orderDescription, orderNumber, orderPrice } from "./elements.js";

import { API_URL, PREFIX_PRODUCT } from "./const.js";
import { getData } from "./getData.js";


export const orderController = (getCart) => {
    const checkDelivery = () => {
        if (modalDeliveryForm.format.value === 'pickup') {
            modalDeliveryForm['address-info'].classList.add('modal-delivery__fieldset_input-hide');
        }

        if (modalDeliveryForm.format.value === 'delivery') {
            modalDeliveryForm['address-info'].classList.remove('modal-delivery__fieldset_input-hide');
        }
    };

    modalDeliveryForm.addEventListener('change', checkDelivery);

    // const getAllProducts = async () => {
    //     const cartList = getCart();
    //     console.log('cartList: ', cartList);        
    //     const allIdProduct = cartList.map(item => item.id);
    //     const product = cartList.length
    //         ? await getData(`${API_URL}${PREFIX_PRODUCT}?list=${allIdProduct}`)
    //         : [];
    //     const arrProductTitle = [];
    //     const arrProduct = [];
    //     product.forEach(item => {
    //         // arrProductTitle.push(item.title);
    //         console.log(item);
            
    //     });
    //     return product;
    // }

    modalDeliveryForm.addEventListener('submit', e => {
        e.preventDefault();

        // получение данных с полей формы
        const formData = new FormData(modalDeliveryForm);
        // console.log('formData: ', Object.fromEntries(formData));
        const data = Object.fromEntries(formData);
        data.order = getCart();
        // console.log('data: ', data.order[0].id);

        fetch('https://reqres.in/api/users', {
            method: 'post',
            body: JSON.stringify(data),
        }).then(response => response.json())
            // .then(data => console.log(data))
            // .then(clearCart)
            .then(data => { 
                console.log(data);    
                
                // clearCart();
                // modalDeliveryForm.reset();
                // checkDelivery();

                modalDelivery.classList.remove('modal_open');
                modalThankWindow.classList.add('modal_open');

                const ul = document.createElement('ul');
                ul.style.paddingTop = 5 + "px";
                const span = document.createElement('span');
                const spanNumber = document.createElement('span');

                spanNumber.insertAdjacentHTML('beforeend', `<b>${data.id}</b>`);
                orderNumber.insertAdjacentElement('beforeend', spanNumber);

                const getAllProducts = async () => {
                    const cartList = getCart();
                    // console.log('cartList: ', cartList);        
                    const allIdProduct = cartList.map(item => item.id);
                    const product = cartList.length
                        ? await getData(`${API_URL}${PREFIX_PRODUCT}?list=${allIdProduct}`)
                        : [];
                    
                    const arrProduct = [];
                    let priceProduct = 0;

                    // промис в массив
                    product.forEach(item => {
                        arrProduct.push(item);  
                    });

                    // console.log(arrProduct);

                    arrProduct.forEach(item => {
                        const li = document.createElement('li');
                        li.insertAdjacentHTML('beforeend', `${item.title} - `);
                        let numb = 0;
                        
                        cartList.forEach(count => {
                            if (item.id === count.id) {
                                li.insertAdjacentHTML('beforeend', `${count.count}`);
                                numb = count.count;
                            }
                        })

                        priceProduct += (item.price * numb);

                        ul.insertAdjacentElement('beforeend', li);

                    });
    
                    orderDescription.insertAdjacentElement('beforeend', ul);
                    span.insertAdjacentHTML('beforeend', `<b>${priceProduct}</b> ₴`);
                    orderPrice.insertAdjacentElement('beforeend', span);
    
                    console.log(arrProduct);

                    // return product;
                }

                getAllProducts();

                modalThankWindow.addEventListener('click', ({ target }) => {
                    if (target.closest('.modal__close') || modalThankWindow === target) {
                        modalThankWindow.classList.remove('modal_open');
                        ul.remove();
                        span.remove();
                        spanNumber.remove();
                    }
                });
                setTimeout(() => {
                    modalThankWindow.classList.remove('modal_open');
                    ul.remove();
                    span.remove();
                    spanNumber.remove();
                }, 10000);

                clearCart();
                modalDeliveryForm.reset();
                checkDelivery();


                // modalDeliveryContainer.innerHTML =
                // `
                //     <h2>Спасибо за заказ!</h2><br>
                //     <h3>Ваш номер заказа ${response.id}<h3/>
                //     <p>Время доставки 20 минут. <br>С вами свяжется наш менеджер: ${response.manager}<p/>
                //     <hr/>
                //     <p>Ваш заказ: </p><br>
                // `;

            });
            // .finally();
        
        // fetch('https://reqres.in/api/users', {
        //     method: 'post',
        //     body: JSON.stringify(data),
        // }).then(response => response.json())
        //     .then(data => console.log(data));
        
        // fetch('../mail.php', {
        //     method: 'post',
        //     body: JSON.stringify(data),
        // }).then(response => response.json())
        //     .then(data => data);
        
    });
}


// beforebegin <div> afterbegin {content} beforeend </div> afterend