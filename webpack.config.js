/**
 * External dependencies
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Main CSS loader for everything but blocks..
const cssExtractTextPlugin = new ExtractTextPlugin({
  filename: "./scripts/[name]/build/style.css"
});

// Configuration for the ExtractTextPlugin.
const extractConfig = {
  use: [
    { loader: "raw-loader" },
    {
      loader: "postcss-loader",
      options: {
        plugins: [require("autoprefixer")]
      }
    },
    {
      loader: "sass-loader",
      query: {
        outputStyle:
          "production" === process.env.NODE_ENV ? "compressed" : "nested"
      }
    }
  ]
};

const entryPointNames = ["config-app", "fields", "i18n"];

const externals = {
  react: "React",
  lodash: "lodash"
};
entryPointNames.forEach(entryPointName => {
  externals["@gcf/" + entryPointName] = {
    this: ["gcf", entryPointName]
  };
});

const wpDependencies = [
  "components",
  "element",
  "blocks",
  "editor",
  "utils",
  "date",
  "data",
  "i18n",
  "compose"
];
wpDependencies.forEach(wpDependency => {
  externals["@wordpress/" + wpDependency] = {
    this: ["wp", wpDependency]
  };
});

const config = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: entryPointNames.reduce((memo, entryPointName) => {
    memo[entryPointName] = "./scripts/" + entryPointName + "/index.js";
    return memo;
  }, {}),
  externals,
  output: {
    filename: "scripts/[name]/build/index.js",
    path: __dirname,
    library: ["gcf", "[name]"],
    libraryTarget: "this"
  },
  resolve: {
    modules: [__dirname, "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.s?css$/,
        use: cssExtractTextPlugin.extract(extractConfig)
      }
    ]
  },
  plugins: [cssExtractTextPlugin],
  stats: {
    children: false
  }
};

module.exports = config;
