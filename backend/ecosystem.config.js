module.exports = {
  apps: [
    {
      name: "cms.nekrasovka",
      script: "./src/server.js",
      env_production: {
        NODE_ENV: "production",
        PORT: 3013,
        IMAGES: "../../../images",
        FONTS: "../../../fonts",
        DATABASE: "../../../database",
        FRONTEND: "../../frontend/build",
      },
    },
  ],
  deploy: {
    test: {
      user: "superuser",
      host: "10.10.0.37",
      ref: "origin/master",
      repo: "git@github.com:nekrasovka-library/cms.nekrasovka.git",
      path: "/var/www/cms.test.nekrasovka",
      "post-deploy":
        "cd /var/www/cms.test.nekrasovka/current/frontend && npm install && npm run build && cd ../backend && npm install && pm2 reload /var/www/cms.test.nekrasovka/current/backend/ecosystem.config.js --env production",
      env: {
        NODE_ENV: "production",
        PORT: 3013,
      },
    },
  },
};
