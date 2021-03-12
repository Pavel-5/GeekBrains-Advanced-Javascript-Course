class Api {
  constructor() {
    this.url = "/goods.json";
  }

  fetch(error, success) {
    let xhr;

    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          success(JSON.parse(xhr.responseText));
        } else if (xhr.status > 400) {
          error("Error");
        }
      }
    };

    xhr.open("GET", this.url, true);
    xhr.send();
  }

  fetchPromise() {
    return new Promise((resolve, reject) => {
      this.fetch(reject, resolve);
    });
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
    this.api = new Api();
    this.$goodsList = document.querySelector(".goods-list");

    const fetch = this.api.fetchPromise();

    fetch
      // .then((data) => {
      //   this.onFetchSuccess(data);
      // })
			// .catch((err) => {
      //   this.onFetchError(err);
      // });
			.then(this.onFetchSuccess.bind(this))
      .catch(this.onFetchError.bind(this));
  }

  onFetchSuccess(data) {
    this.goods = data.map((item) => new GoodsItem(item));
    this.render();
  }

  onFetchError(err) {
    this.$goodsList.insertAdjacentHTML("beforeend", `<h3>${err}</h3>`);
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
