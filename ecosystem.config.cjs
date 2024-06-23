module.exports = {
  apps: [
    {
      name: "unisnu-multimedia-compress-app",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
