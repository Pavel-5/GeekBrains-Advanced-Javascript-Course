const goods = [
    { title: 'Shirt', price: 150, img: 'img/shirt.jpg' },
    { title: 'Socks', price: 50, img: 'img/socks.jpg' },
    { title: 'Jacket', price: 350, img: 'img/jacket.jpg' },
    { title: 'Shoes', price: 250, img: 'img/shoes.jpg' },
];

const $goodsList = document.querySelector('.goods-list');
  
const renderGoodsItem = ({ title, price, img }) => {
    return `<div class="goods-item"><div class="item__img"><img src="${img}"></div><h3 class="item__title">${title}</h3><p class="item__price">${price}</p><button class="item__button">Добавить</button></div>`;
};
  
const renderGoodsList = (list = goods) => {
    let goodsList = list.map(
            item => renderGoodsItem(item)
        ).join('\n');

    $goodsList.insertAdjacentHTML('beforeend', goodsList);
}
  
renderGoodsList();