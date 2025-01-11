import { catalogTitle, navigationList, navigationListItems } from "./elements.js"
import { renderListProduct } from "./renderListProduct.js";

// export const navigationListController = () => {
//     navigationList.addEventListener('click', e => {
//         const categoryItem = e.target.closest('.navigation__button');
//         // console.log('categoryItem: ', categoryItem);

//         if (!categoryItem) return;

//         navigationListItems.forEach((item) => {
//             if (item === categoryItem) {
//                 item.classList.add('navigation__button_active');
//                 catalogTitle.textContent = categoryItem.textContent;
//             } else {
//                 item.classList.remove('navigation__button_active');
//             }
//         });
//     });
// }

export const navigationListController = () => {
    // let activeBtn = navigationList.querySelector('.navigation__button_active');
    navigationList.addEventListener('click', e => {
        const categoryItem = e.target.closest('.navigation__button');
        // console.log('categoryItem: ', categoryItem);

        // if (!categoryItem) return;
        // activeBtn.classList.remove('navigation__button_active');
        // categoryItem.classList.add('navigation__button_active');
        // activeBtn = categoryItem;
        // catalogTitle.textContent = categoryItem.textContent;

        navigationListItems.forEach((item) => {
            if (item === categoryItem) {
                item.classList.add('navigation__button_active');
                catalogTitle.textContent = item.textContent;
                renderListProduct(item.dataset.category);
            } else {
                item.classList.remove('navigation__button_active');
            }
        });
    });
}