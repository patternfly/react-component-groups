module.exports = {
  branches: [
    'do-not-delete',
    { name: 'main', channel: 'prerelease', prerelease: 'prerelease' },
    { name: 'v5', channel: 'prerelease-v5' }
  ],
  analyzeCommits: {
    preset: 'angular'
  },
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "angular",
        "releaseRules": [
          {"type": "fix", "release": "patch"},
          {"type": "docs", "release": "patch"},
          {"type": "refactor", "release": "patch"},
          {"type": "chore", "release": "patch"},
          {"type": "style", "release": "patch"},
          {"type": "feat", "release": "patch"},
          {"type": "perf", "release": "patch"}
        ]
      }
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    '@semantic-release/npm'
  ],
  tagFormat: 'prerelease-v${version}',
  dryRun: true
};
