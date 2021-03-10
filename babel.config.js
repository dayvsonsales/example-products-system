module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@services': './src/services',
          '@providers': './src/providers',
          '@infra': './src/infra',
          '@schemas': './src/infra/mongodb/schemas',
          '@container': './src/container',
          '@errors': './src/errors',
          '@domain': './src/domain',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
