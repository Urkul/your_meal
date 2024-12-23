import { API_URL, PREFIX_PRODUCT } from "./const.js";
import { createCardProduct } from "./createCardProduct.js";
import { catalogList } from "./elements.js";
import { getData } from "./getData.js"

// export const renderListProduct = () => {
//     getData(`${API_URL}${PREFIX_PRODUCT}`).then(data => console.log(data));
// }

export const renderListProduct = async (category = 'burger') => {
    // catalogList.textContent = '';
    catalogList.textContent = '';
    const listProduct = await getData(`${API_URL}${PREFIX_PRODUCT}?category=${category}`);
    // console.log('listProduct: ', listProduct);
    const listCard = listProduct.map(createCardProduct);
    // console.log('listCard: ', listCard);
    catalogList.append(...listCard);
}