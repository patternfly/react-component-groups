module.exports = {
  branches: [ 'do-not-delete', { name: 'main', channel: 'prerelease', prerelease: 'prerelease' } ],
  analyzeCommits: {
    preset: 'angular'
  },
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    '@semantic-release/npm'
  ],
  tagFormat: 'prerelease-v${version}',
  dryRun: false
};