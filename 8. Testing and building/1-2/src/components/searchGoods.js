const searchGoods = Vue.component("search-goods", {
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

module.exports = {
	searchGoods
};
