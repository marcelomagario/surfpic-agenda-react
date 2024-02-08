module.exports = function override(config, env) {
    // Adicione a regra para módulos ES6
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });
  
    return config;
  };