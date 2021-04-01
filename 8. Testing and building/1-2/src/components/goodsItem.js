const goodsItem = Vue.component("goods-item", {
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

module.exports = {
	goodsItem
};