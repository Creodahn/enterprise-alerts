module.exports = {
  make_targets: {
    win32: [
      'squirrel'
    ],
    darwin: [
      'zip'
    ],
    linux: [
      'deb',
      'rpm'
    ]
  },
  electronPackagerConfig: {},
  electronWinstallerConfig: {},
  electronInstallerDebian: {},
  electronInstallerRedhat: {},
  github_repository: {
    owner: '',
    name: ''
  },
  windowsStoreConfig: {
    packageName: ''
  }
};
