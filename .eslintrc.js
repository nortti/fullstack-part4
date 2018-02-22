module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "parser": "babel-eslint",
  "extends": "eslint:recommended",
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "object-curly-spacing": [
      "error", "always"
    ],
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ],
    "no-console": 0
  },
  "globals": {
    "test": true,
    "expect": true,
    "describe": true,
    "beforeAll": true,
    "afterAll": true
  }
};
