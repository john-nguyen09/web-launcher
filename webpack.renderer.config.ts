import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

export const rendererConfig: Configuration = {
  module: {
    rules: [
      ...rules,
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules|\.webpack)/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.inline\.svg$/,
        use: ["react-svg-loader"],
      },
    ],
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".scss"],
  },
};
