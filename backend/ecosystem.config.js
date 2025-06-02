module.exports = {
  apps: [
    {
      name: "csm.nekrasovka.ru",
      script: "./src/server.js",
      env_production: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
  deploy: {
    prod: {
      user: "superuser",
      host: "10.10.0.37",
      ref: "origin/master",
      repo: "git@github.com:nekrasovka-library/csm.nekrasovka.git",
      path: "/var/www/csm.nekrasovka",
      "post-deploy":
        "cd /var/www/csm.nekrasovka/current/frontend && npm install && npm run build && cd ../backend && npm install && pm2 reload /var/www/csm.nekrasovka/current/backend/ecosystem.config.js --env production",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  },
};
