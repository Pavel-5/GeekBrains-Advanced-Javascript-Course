const API_URL = "/goods.json";

var app = new Vue({
	el: '#app',
	data: {
		goods: [],
		filteredGoods: [],
		search: '',
		message: 'list of goods',
		isVisibleCart: false,
		cartGoods: []
	},
	computed: {
		messageUpper() {
			return this.message.toUpperCase();
		}
	},
	methods: {
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

			xhr.open("GET", API_URL, true);
			xhr.send();
		},

		fetchPromise() {
			return new Promise((resolve, reject) => {
				this.fetch(reject, resolve);
			});
		},

		onFetchSuccess(data) {
			if (data.length != 0) {
				this.goods = data;
				this.filteredGoods = this.goods;
			} else {
				this.message = 'the list of products is empty';
			}
		},

		onFetchError(err) {
			this.message = err;
		},

		searchHandler() {
			let arrGoods = (this.isVisibleCart) ? this.cartGoods : this.goods;
			if (this.search === "") {
				this.filteredGoods = arrGoods;
			}
			const regexp = new RegExp(this.search, "i");
			this.filteredGoods = arrGoods.filter((good) => regexp.test(good.title));
		},

		visibleCart() {
			this.isVisibleCart = !this.isVisibleCart;
			if (this.isVisibleCart) {
				this.message = (this.cartGoods.length != 0) ? 'cart' : 'the shopping cart is empty';
				this.filteredGoods = this.cartGoods;
			} else {
				this.message = (this.goods.length != 0) ? 'list of goods' : 'the list of products is empty';
				this.filteredGoods = this.goods;
			}
		},

		addGoodCart(good) {
			this.cartGoods.push(good);
		},

		delGoodCart(name) {
			this.cartGoods = this.cartGoods.filter((item) => item.title !== name);
			this.filteredGoods = this.cartGoods;
			if (this.cartGoods.length === 0) this.message = 'the shopping cart is empty';
		},

		sumCart() {
			return this.cartGoods.reduce((acc, item) => acc + item.price, 0);
		}
	},
	mounted() {
		this.fetchPromise()
			.then(this.onFetchSuccess.bind(this))
			.catch(this.onFetchError.bind(this));
	}
});

// class Api {
//   constructor() {
//     this.url = "/goods.json";
//   }

//   fetch(error, success) {
//     let xhr;

//     if (window.XMLHttpRequest) {
//       xhr = new XMLHttpRequest();
//     } else if (window.ActiveXObject) {
//       xhr = new ActiveXObject("Microsoft.XMLHTTP");
//     }

//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           success(JSON.parse(xhr.responseText));
//         } else if (xhr.status > 400) {
//           error("Error");
//         }
//       }
//     };

//     xhr.open("GET", this.url, true);
//     xhr.send();
//   }

//   fetchPromise() {
//     return new Promise((resolve, reject) => {
//       this.fetch(reject, resolve);
//     });
//   }
// }

// class GoodsItem {
//   constructor({ title, price, img }) {
//     this.title = title;
//     this.price = price;
//     this.img = img;
//   }

//   getHtml() {
//     return `<div class="goods-item"><div class="item__img"><img src="${this.img}"></div><h3 class="item__title">${this.title}</h3><p class="item__price">${this.price}</p><button class="item__button">Добавить</button></div>`;
//   }
// }

// class GoodsList {
//   constructor() {
//     this.goods = [];
//     this.filteredGoods = [];
//     this.api = new Api();
//     this.search = '';
//     this.$goodsList = document.querySelector(".goods-list");
//     this.$search = document.querySelector("#search");

//     this.$search.addEventListener("input", () => {
//       this.search = this.$search.value;
// 			this.searchHandler();
// 			this.render();
//     });

//     const fetch = this.api.fetchPromise();

//     fetch
//       .then(this.onFetchSuccess.bind(this))
//       .catch(this.onFetchError.bind(this));
//   }

//   onFetchSuccess(data) {
//     this.goods = data.map((item) => new GoodsItem(item));
//     this.filteredGoods = this.goods;
//     this.render();
//   }

//   onFetchError(err) {
//     this.$goodsList.insertAdjacentHTML("beforeend", `<h3>${err}</h3>`);
//   }

// 	searchHandler() {
// 		if (this.search === "") {
// 			this.filteredGoods = this.goods;
// 		}
// 		const regexp = new RegExp(this.search, "gi");
// 		this.filteredGoods = this.goods.filter((good) => regexp.test(good.title));
// 	}

//   render() {
//     this.$goodsList.textContent = "";

//     let goodsHtml = this.filteredGoods.map((item) => item.getHtml()).join("\n");

//     this.$goodsList.insertAdjacentHTML("beforeend", goodsHtml);
//   }

//   sumGoods() {
//     return this.filteredGoods.reduce((acc, item) => acc + item.price, 0);
//   }
// }

// class CartItem extends GoodsItem {
//   constructor(item) {
//     super(item);
//   }

//   getHtml() {
//     return `<div class="cart-item"><div class="item__img"><img src="${this.img}"></div><h3 class="item__title">${this.title}</h3><p class="item__price">${this.price}</p><button class="item__button">Добавить</button></div>`;
//   }
// }

// class Cart {
//   constructor() {
//     this.goods = [];
//     this.$goodsCart = document.querySelector(".goods-cart");
//   }

//   _render() {
//     this.$goodsCart.textContent = "";

//     let goodsHtml = this.goods.map((item) => item.getHtml()).join("\n");

//     this.$goodsCart.insertAdjacentHTML("beforeend", goodsHtml);
//   }

//   addGood(item) {
//     this.goods.push(new CartItem(item));
//     this._render();
//   }

//   delGood(item) {
//     this.goods = this.goods.filter((good) => good !== item);
//     this._render();
//   }
//   getGoods() {
//     return this.goods;
//   }

//   sumCart() {
//     return this.goods.reduce((acc, item) => acc + item.price, 0);
//   }
// }

// let list = new GoodsList();
