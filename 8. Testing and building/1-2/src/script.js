const { cart } = require('./components/cart.js');
const { goodsItem } = require('./components/goodsItem.js');
const { error } = require('./components/error.js');
const { searchGoods } = require('./components/searchGoods.js');

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
