/*
 * @Name: 文件名称
 * @Description: 该文件描述
 * @Author: Mingjuan
 * @Date: 2021-06-17 10:48:50
 * @Editors: Mingjuan
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': 0,
    'semi': [0], // 分号
    'space-before-function-paren': 0,
    'quotes': 0,
    'comma-dangle': 0, // 逗号
    'no-multiple-empty-lines': 0, // 多行
    'object-curly-spacing': 0,
    'eol-last': 0, // 尾空行
    'prefer-const': 0, // 只用一次的变量用const
    'no-unused-vars': 0, // 没有用到的声明
    'no-trailing-spaces': 0, // 行尾空格
    'no-tabs': 0,
    'eqeqeq': 0,
    'vue/no-unused-components': 0,
    'vue/no-deprecated-v-on-native-modifier': 0,
    'vue/no-deprecated-slot-attribute': 0,
    'array-bracket-spacing': 0, // ]前不要加空格
    'dot-notation': 0, // 最好用点表示法
    'camelcase': 0, // 驼峰命名
    'prefer-promise-reject-errors': 0, // 期待promise中的reject是个Error
    'handle-callback-err': 0,
    'no-mixed-operators': 0, // 意料之外&& ||
    'vue/no-mutating-props': 0, 
    'vue/require-valid-default-prop': 0,
    'padded-blocks': 0, // 块不能用空行填充
    'space-in-parens': 0, 
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
