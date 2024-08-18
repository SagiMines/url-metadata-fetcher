module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react', // To handle JSX
    '@babel/preset-typescript', // To handle TypeScript
  ],
};
