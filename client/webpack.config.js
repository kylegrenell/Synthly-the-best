var config = {
  entry: {
    synth: "./src/index.js",
    theremin: "./src/theremin.js"
  },
  output:{
    filename: "[name].bundle.js",
    path: "./build/bundles"
  },
  devtool: "source-map"
};

module.exports = config;