"use strict";

function replacer(subs, index, str) {
	let s = str.slice(index - 1, index + 4);

	return (!regexp1.test(s)) ? '"' : '\'';
}

const str = "srdtfyg' d'' dd'dr fff'tygfd'' drtgf'g  'dfgyhuijnb'";
const regexp = /'/g;
const regexp1 = /[a-zа-я]'([a-zа-я]|[a-zа-я][a-zа-я])\b/gi;

console.log(str.replace(regexp, replacer));
