module.exports = {
    branches: [
      'main',
      { name: 'main', channel: 'prerelease' }
    ],
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/npm',
      '@semantic-release/github'
    ],
    tagFormat: 'prerelease-v${version}',
  };