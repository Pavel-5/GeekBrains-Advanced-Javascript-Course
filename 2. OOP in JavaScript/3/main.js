'use strict'

class Hamburger {
	constructor(size, stuffing) {
		this.size = size;
		this.stuffing = stuffing;
		this.toppings = [];
	}
	addTopping(topping) {
		// Добавить добавку
		this.toppings.push(topping);
	}
	removeTopping(topping) {
		// Убрать добавку
		this.toppings = this.toppings.filter((item) => item !== topping);
	}
	getToppings() {
		// Получить список добавок
		return this.toppings;
	}
	getSize() {
		// Узнать размер гамбургера
		return this.size;
	}
	getStuffing() {
		// Узнать начинку гамбургера
		return this.stuffing;
	}
	calculatePrice() {
		// Узнать цену
		let sum = 0;
		sum += (this.size.toLowerCase() === 'большой') ? 100 : 50;

		sum += (this.stuffing.toLowerCase() === 'с сыром') ? 10 : 0;
		sum += (this.stuffing.toLowerCase() === 'с салатом') ? 20 : 0;
		sum += (this.stuffing.toLowerCase() === 'с картофелем') ? 15 : 0;

		this.toppings.forEach((item) => {
			sum += (item.toLowerCase() === 'майонез') ? 20 : 15;
		});

		return sum;
	}
	calculateCalories() {
		// Узнать калорийность
		let sum = 0;
		sum += (this.size.toLowerCase() === 'большой') ? 40 : 20;

		sum += (this.stuffing.toLowerCase() === 'с сыром') ? 20 : 0;
		sum += (this.stuffing.toLowerCase() === 'с салатом') ? 5 : 0;
		sum += (this.stuffing.toLowerCase() === 'с картофелем') ? 10 : 0;

		this.toppings.forEach((item) => {
			sum += (item.toLowerCase() === 'майонез') ? 5 : 0;
		});

		return sum;
	}
}

let burger = new Hamburger('маленький', 'с картофелем');

burger.addTopping('приправа');
console.log(burger.calculateCalories() + ' калорий');
console.log(burger.calculatePrice() + ' руб\n');

burger = new Hamburger('большой', 'с салатом');

burger.addTopping('майонез');
console.log(burger.calculateCalories() + ' калорий');
console.log(burger.calculatePrice() + ' руб\n');