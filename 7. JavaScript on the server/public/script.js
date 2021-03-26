Vue.component("search-goods", {
  template:
    '<input type="text" @input="searchHandler" placeholder="Search" v-model="search">',
  data() {
    return {
      search: "",
    };
  },
  methods: {
    searchHandler() {
      this.$emit("sear", this.search);
    },
  },
});

Vue.component("goods-item", {
  template: `<div class="goods-item" v-bind:data-id="item.id">
			<div class="item__img">
				<img v-bind:src="item.img" />
			</div>
			<h3 class="item__title">{{ item.title }}</h3>
			<p class="item__price">{{ item.price }}</p>
			<slot></slot>
		</div>`,
  props: ["item"],
  methods: {
    delGoodCart(id) {
      this.$emit("del", id);
    },
  },
});

Vue.component("cart", {
  template: `<div class="cart">
		<goods-item v-for="good in filteredgoods" v-bind:item="good">
			<label>
				Quantity: <input class="item_quantity" type="text" v-model="good.quantity"
				@keydown="checkSymbol" 
				@change="changeQuantityGoodCart(good)"/>
			</label>
			<button class="item__button" @click="delGoodCart(good)">
				Delete
			</button>
		</goods-item>
	</div>`,
  props: ["filteredgoods"],
  methods: {
    delGoodCart(good) {
      this.$emit("del", good);
    },
    changeQuantityGoodCart(good) {
      if (good.quantity === "") good.quantity = "0";
      this.$emit("cqgc", good);
    },
    checkSymbol(e) {
      console.log(e.keyCode);
      if (
        !(
          (e.keyCode >= 48 && e.keyCode <= 57) ||
          e.keyCode == 8 ||
          (e.keyCode >= 37 && e.keyCode <= 40) ||
          e.keyCode == 46
        )
      )
        e.returnValue = false;
    },
  },
});

Vue.component("error", {
  template: '<h1 class="message">{{ mesUpper }}</h1>',
  data() {
    return {
      mes: "the request to the server cannot be executed",
    };
  },
  computed: {
    mesUpper() {
      return this.mes.toUpperCase();
    },
  },
});

var app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    search: "",
    message: "",
    isVisibleCart: false,
    isError: false,
    cartGoods: [],
  },
  computed: {
    messageUpper() {
      return this.message.toUpperCase();
    },
  },
  methods: {
    onFetchSuccess(data) {
      if (data.length != 0) {
        this.goods = data;
        this.filteredGoods = this.goods;
      }
			this.setMessage();
    },

    onFetchError(err) {
      this.message = err;
      this.isError = true;
    },

		setMessage() {
			if (this.isVisibleCart) {
				if(this.cartGoods.length === 0) {
					this.message = 'the shopping cart is empty';
				} else {
					if(this.filteredGoods.length === 0) {
						this.message = 'the list of filtered goods is empty';
					} else {
						this.message = 'cart';
					}
				}
			} else {
				if(this.goods.length === 0) {
					this.message = 'the list of goods is empty';
				} else {
					if(this.filteredGoods.length === 0) {
						this.message = 'the list of filtered goods is empty';
					} else {
						this.message = 'list of goods';
					}
				}
			}
		},

    searchHandler(search) {
      this.search = search;
      let arrGoods = this.isVisibleCart ? this.cartGoods : this.goods;

      if (this.search === "") {
        this.filteredGoods = arrGoods;
      }
      const regexp = new RegExp(this.search, "i");
      this.filteredGoods = arrGoods.filter((good) => regexp.test(good.title));
      this.setMessage();
    },

    visibleCart() {
      this.isVisibleCart = !this.isVisibleCart;
			this.filteredGoods = (this.isVisibleCart) ? this.cartGoods : this.goods;
			this.setMessage();
    },

    addGoodCart(good) {
      fetch("/cartAdd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...good,
          quantity: 1,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.cartGoods = data;
        })
        .catch(this.onFetchError.bind(this));
    },

    delGoodCart(good) {
      fetch("/cartDel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(good),
      })
        .then((response) => response.json())
        .then((data) => {
          this.cartGoods = data;
          this.filteredGoods = this.cartGoods;
					this.setMessage();
          // if (this.cartGoods.length === 0)
          //   this.message = "the shopping cart is empty";
        })
        .catch(this.onFetchError.bind(this));
    },

    changeQuantityGoodCart(good) {
      fetch("/cartChangeQuantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(good),
      });
    },

    sumCart() {
      return this.cartGoods.reduce((acc, item) => acc + item.price, 0);
    },
  },
  mounted() {
    fetch("/data")
      .then((response) => response.json()) // вытащить тело ответа с сервера
      .then(this.onFetchSuccess.bind(this))
      .catch(this.onFetchError.bind(this));

    fetch("/cart")
      .then((response) => response.json())
      .then((data) => {
        this.cartGoods = data;
      })
      .catch(this.onFetchError.bind(this));
  },
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
