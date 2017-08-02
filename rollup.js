var rollup = require("rollup");
var babel = require("rollup-plugin-babel");

rollup.rollup({
  entry: "client/main.js",
  plugins: [babel()]
}).then(function (bundle) {
  bundle.write({
    dest: "client/dist/bundle.js",
    format: "umd"
  });
});