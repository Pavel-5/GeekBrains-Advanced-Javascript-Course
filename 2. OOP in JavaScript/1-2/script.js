class ApiMock {
  constructor() {}

  fetch() {
    return [
      { title: "Shirt", price: 150, img: "img/shirt.jpg" },
      { title: "Socks", price: 50, img: "img/socks.jpg" },
      { title: "Jacket", price: 350, img: "img/jacket.jpg" },
      { title: "Shoes", price: 250, img: "img/shoes.jpg" },
    ];
  }
}

class GoodsItem {
  constructor({ title, price, img }) {
    this.title = title;
    this.price = price;
    this.img = img;
  }
  getHtml() {
    return `<div class="goods-item"><div class="item__img"><img src="${this.img}"></div><h3 class="item__title">${this.title}</h3><p class="item__price">${this.price}</p><button class="item__button">Добавить</button></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
    this.api = new ApiMock();
    this.$goodsList = document.querySelector(".goods-list");
  }
  fetchGoods() {
    this.goods = this.api
      .fetch()
			.map((item) => new GoodsItem(item));
  }
  render() {
    this.$goodsList.textContent = "";

    let goodsHtml = this.goods.map((item) => item.getHtml()).join("\n");

    this.$goodsList.insertAdjacentHTML("beforeend", goodsHtml);
  }
	sumGoods() {
		return this.goods.reduce((acc, item) => acc + item.price, 0);
	}
}

class CartItem extends GoodsItem {
  constructor(item) {
    super(item);
  }
  getHtml() {
		return `<div class="cart-item"><div class="item__img"><img src="${this.img}"></div><h3 class="item__title">${this.title}</h3><p class="item__price">${this.price}</p><button class="item__button">Добавить</button></div>`;
	}
}

class Cart {
  constructor() {
    this.goods = [];
    this.$goodsCart = document.querySelector(".goods-cart");
  }
  _render() {
    this.$goodsCart.textContent = "";

    let goodsHtml = this.goods.map((item) => item.getHtml()).join("\n");

    this.$goodsCart.insertAdjacentHTML("beforeend", goodsHtml);
  }
  addGood(item) {
    this.goods.push(new CartItem(item));
    this._render();
  }
	delGood(item) {
		this.goods = this.goods.filter((good) => good !== item);
		this._render();
	}
	getGoods() {
		return this.goods;
	}
	sumCart() {
		return this.goods.reduce((acc, item) => acc + item.price, 0);
	}
}

let list = new GoodsList();

list.fetchGoods();
list.render();