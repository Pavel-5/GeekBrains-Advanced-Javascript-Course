const error = Vue.component("error", {
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

module.exports = {
  error,
};
