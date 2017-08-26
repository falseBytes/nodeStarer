module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // nodeStarter application
    {
      'name': 'nodeStarter',
      'script': './index.js',
      'exec_mode': 'cluster',
      'instances': 1,
      'log_date_format': 'YYYY-MM-DD HH:mm Z',
      'watch': './*',
      'ignore_watch': ['node_modules'],
      'env': {
        NODE_ENV: 'dev',
        PORT: 8080,
      },
      'env_production': {
        NODE_ENV: 'dev',
      },
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  // deploy: {
  //   production: {
  //     'user': 'node',
  //     'host': '212.83.163.1',
  //     'ref': 'origin/master',
  //     'repo': 'git@github.com:repo.git',
  //     'path': '/var/www/production',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
  //   },
  //   dev: {
  //     'user': 'node',
  //     'host': '212.83.163.1',
  //     'ref': 'origin/master',
  //     'repo': 'git@github.com:repo.git',
  //     'path': '/var/www/development',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
  //     'env': {
  //       NODE_ENV: 'dev',
  //     },
  //   },
  // },
};
