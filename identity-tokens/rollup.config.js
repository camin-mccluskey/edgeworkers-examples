import nodePolyfills from 'rollup-plugin-node-polyfills';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from "rollup-plugin-copy-assets";
import json from 'rollup-plugin-json';

export default {
  // Specify main file for EdgeWorker
  input: 'main.js',
  //Define external modules, which will be provided by the EdgeWorker platform
  external: [],
  // Define output format as an ES module and specify the output directory
  output: {
    format: 'es',
    dir: "dist/work",
  },
  // Bundle all modules into a single output module
  preserveModules: false,

  plugins: [
    nodePolyfills(),
    // Resolve modules from node_modules
    resolve({
      preferBuiltins: false
    }),
    commonjs({
      transformMixedEsModules: true
    }),
    // Copy bundle.json to the output directory
    copy({
      assets: [
        "bundle.json",
      ]
    }),
    // Package json data as an ES6 module
    json()
  ]
};
