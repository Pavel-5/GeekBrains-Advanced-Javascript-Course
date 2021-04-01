const cart = Vue.component("cart", {
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

module.exports = {
	cart
};