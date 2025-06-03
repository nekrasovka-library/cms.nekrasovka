module.exports = {
  apps: [
    {
      name: "csm.nekrasovka",
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
      path: "/var/www/csm.test.nekrasovka",
      "post-deploy":
        "cd /var/www/csm.test.nekrasovka/current/frontend && npm install && npm run build && cd ../backend && npm install && pm2 reload /var/www/csm.test.nekrasovka/current/backend/ecosystem.config.js --env production",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  },
};
