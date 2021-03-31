(()=>{var t={446:t=>{const e=Vue.component("cart",{template:'<div class="cart">\n\t\t<goods-item v-for="good in filteredgoods" v-bind:item="good">\n\t\t\t<label>\n\t\t\t\tQuantity: <input class="item_quantity" type="text" v-model="good.quantity"\n\t\t\t\t@keydown="checkSymbol" \n\t\t\t\t@change="changeQuantityGoodCart(good)"/>\n\t\t\t</label>\n\t\t\t<button class="item__button" @click="delGoodCart(good)">\n\t\t\t\tDelete\n\t\t\t</button>\n\t\t</goods-item>\n\t</div>',props:["filteredgoods"],methods:{delGoodCart(t){this.$emit("del",t)},changeQuantityGoodCart(t){""===t.quantity&&(t.quantity="0"),this.$emit("cqgc",t)},checkSymbol(t){console.log(t.keyCode),t.keyCode>=48&&t.keyCode<=57||8==t.keyCode||t.keyCode>=37&&t.keyCode<=40||46==t.keyCode||(t.returnValue=!1)}}});t.exports={cart:e}},69:t=>{const e=Vue.component("error",{template:'<h1 class="message">{{ mesUpper }}</h1>',data:()=>({mes:"the request to the server cannot be executed"}),computed:{mesUpper(){return this.mes.toUpperCase()}}});t.exports={error:e}},262:t=>{const e=Vue.component("goods-item",{template:'<div class="goods-item" v-bind:data-id="item.id">\n\t\t\t<div class="item__img">\n\t\t\t\t<img v-bind:src="item.img" />\n\t\t\t</div>\n\t\t\t<h3 class="item__title">{{ item.title }}</h3>\n\t\t\t<p class="item__price">{{ item.price }}</p>\n\t\t\t<slot></slot>\n\t\t</div>',props:["item"],methods:{delGoodCart(t){this.$emit("del",t)}}});t.exports={goodsItem:e}},109:t=>{const e=Vue.component("search-goods",{template:'<input type="text" @input="searchHandler" placeholder="Search" v-model="search">',data:()=>({search:""}),methods:{searchHandler(){this.$emit("sear",this.search)}}});t.exports={searchGoods:e}}},e={};function s(o){var i=e[o];if(void 0!==i)return i.exports;var r=e[o]={exports:{}};return t[o](r,r.exports,s),r.exports}(()=>{const{cart:t}=s(446),{goodsItem:e}=s(262),{error:o}=s(69),{searchGoods:i}=s(109);new Vue({el:"#app",data:{goods:[],filteredGoods:[],search:"",message:"",isVisibleCart:!1,isError:!1,cartGoods:[]},computed:{messageUpper(){return this.message.toUpperCase()}},methods:{onFetchSuccess(t){0!=t.length&&(this.goods=t,this.filteredGoods=this.goods),this.setMessage()},onFetchError(t){this.message=t,this.isError=!0},setMessage(){this.isVisibleCart?0===this.cartGoods.length?this.message="the shopping cart is empty":0===this.filteredGoods.length?this.message="the list of filtered goods is empty":this.message="cart":0===this.goods.length?this.message="the list of goods is empty":0===this.filteredGoods.length?this.message="the list of filtered goods is empty":this.message="list of goods"},searchHandler(t){this.search=t;let e=this.isVisibleCart?this.cartGoods:this.goods;""===this.search&&(this.filteredGoods=e);const s=new RegExp(this.search,"i");this.filteredGoods=e.filter((t=>s.test(t.title))),this.setMessage()},visibleCart(){this.isVisibleCart=!this.isVisibleCart,this.filteredGoods=this.isVisibleCart?this.cartGoods:this.goods,this.setMessage()},addGoodCart(t){fetch("/cartAdd",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...t,quantity:1})}).then((t=>t.json())).then((t=>{this.cartGoods=t})).catch(this.onFetchError.bind(this))},delGoodCart(t){fetch("/cartDel",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((t=>t.json())).then((t=>{this.cartGoods=t,this.filteredGoods=this.cartGoods,this.setMessage()})).catch(this.onFetchError.bind(this))},changeQuantityGoodCart(t){fetch("/cartChangeQuantity",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})},sumCart(){return this.cartGoods.reduce(((t,e)=>t+e.price),0)}},mounted(){fetch("/data").then((t=>t.json())).then(this.onFetchSuccess.bind(this)).catch(this.onFetchError.bind(this)),fetch("/cart").then((t=>t.json())).then((t=>{this.cartGoods=t})).catch(this.onFetchError.bind(this))}})})()})();