/** @type { import('pm2').StartOptions } */
module.exports = {
  apps: [
    {
      name: 'ib-site',
      script: 'dist/server/entry.mjs',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 4321,
      },
    },
  ],
}
