module.exports = {
	entry: "./src/script.js",
	output: {
		path: __dirname + '/public',
		filename: "./build.js",
	},
	watch: true,
  watchOptions: {
      aggregateTimeout: 500,
      poll: 1000 // порверяем измемения раз в секунду
  }
};
