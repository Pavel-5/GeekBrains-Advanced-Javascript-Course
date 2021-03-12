'use strict'

const str = "srdtfyg' d'' dd'drr ffftygfd'' drtgf'  'dfgyhuijnb'";

const regexp = /'/g;

console.log(str.replace(regexp, '"'));