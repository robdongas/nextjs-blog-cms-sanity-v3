/** @type { import('pm2').StartOptions } */
module.exports = {
  apps: [
    {
      name: 'ib-site',
      script: 'node_modules/.bin/astro',
      args: 'preview',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: { NODE_ENV: 'production' },
    },
  ],
}
