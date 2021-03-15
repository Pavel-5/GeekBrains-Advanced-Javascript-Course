"use strict";

class Feedback {
  constructor() {
    this.$firstName = document.querySelector(".first-name");
    this.$phone = document.querySelector(".phone");
    this.$email = document.querySelector(".email");
    this.$form = document.querySelector(".feedback");

    this.$form.addEventListener("submit", (e) => {
      if (this.checkFirstName()) {
				this.$firstName.style.backgroundColor = "white";
			} else {
        this.$firstName.style.backgroundColor = "red";
        this.$firstName.blur();
        e.preventDefault();
      }
      if (this.checkPhone()) {
				this.$phone.style.backgroundColor = "white";
			} else {
        this.$phone.style.backgroundColor = "red";
        this.$phone.blur();
        e.preventDefault();
      }
      if (this.checkEmail()) {
				this.$email.style.backgroundColor = "white";
			} else {
        this.$email.style.backgroundColor = "red";
        this.$email.blur();
        e.preventDefault();
      }
    });
  }

  checkFirstName() {
    let str = this.$firstName.value;
    let regexp = /^[a-zа-я]+$/gi;

    return regexp.test(str);
  }

  checkPhone() {
    let str = this.$phone.value;
    let regexp = /^\+7\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/gi;

    return regexp.test(str);
  }

  checkEmail() {
    let str = this.$email.value;
    let regexp = /^([a-z0-9]+((-|\.)[a-z0-9]+){0,1})@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
    // let regexp = /^([a-z0​ -9​ _\.-]+)@([a-z0​ -9​ _\.-]+)\.([a-z\.]{2,6})$/;
    // let regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

    return regexp.test(str);
  }
}

let fb = new Feedback();
