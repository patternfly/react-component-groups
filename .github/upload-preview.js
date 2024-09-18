const fs = require('fs');
const path = require('path');
const surge = require('surge');
const publishFn = surge().publish();

(async () => {
  const { Octokit } = await import('@octokit/rest');
  const octokit = new Octokit({ auth: process.env.GH_PR_TOKEN });

  // From github actions
  const ghrepo = process.env.GITHUB_REPOSITORY || '';

  const owner = process.env.CIRCLE_PROJECT_USERNAME || ghrepo.split('/')[0]; // patternfly
  const repo = process.env.CIRCLE_PROJECT_REPONAME || ghrepo.split('/')[1];
  const prnum = process.env.CIRCLE_PR_NUMBER || process.env.GH_PR_NUM;
  const prbranch = process.env.CIRCLE_BRANCH || process.env.GITHUB_REF.split('/').pop();

  const uploadFolder = process.argv[2];
  if (!uploadFolder) {
    console.log('Usage: upload-preview uploadFolder');
    process.exit(1);
  }

  const uploadFolderName = path.basename(uploadFolder);
  let uploadURL = `${repo}-${prnum ? `pr-component-groups-${prnum}` : prbranch}`.replace(/[\/|\.]/g, '-');

  switch(uploadFolderName) {
    case 'coverage':
      uploadURL += '-a11y.surge.sh';
      break;
    case 'public':
      if (!prnum && prbranch === 'v5') {
        uploadURL = 'https://pf-extensions.surge.sh/';
      } else {
        uploadURL += '.surge.sh';
      }
      break;
    default:
      uploadURL += `-${uploadFolderName}`;
      uploadURL += '.surge.sh';
      break;
  }

  publishFn({
    project: uploadFolder,
    p: uploadFolder,
    domain: uploadURL,
    d: uploadURL,
    e: 'https://surge.surge.sh',
    endpoint: 'https://surge.surge.sh'
  });

  function tryAddComment(comment, commentBody) {
    if (!commentBody.includes(comment)) {
      return comment;
    }
    return '';
  }

  if (prnum) {
    const comments = await octokit.issues.listComments({
      owner,
      repo,
      issue_number: prnum
    }).then(res => res.data);

    let commentBody = '';
    const existingComment = comments.find(comment => comment.user.login === 'patternfly-build');
    if (existingComment) {
      commentBody += existingComment.body.trim();
      commentBody += '\n\n';
    }

    if (uploadFolderName === 'public') {
      commentBody += tryAddComment(`Preview: https://${uploadURL}`, commentBody);
    } else if (uploadFolderName === 'coverage') {
      commentBody += tryAddComment(`A11y report: https://${uploadURL}`, commentBody);
    }

    if (existingComment) {
      await octokit.issues.updateComment({
        owner,
        repo,
        comment_id: existingComment.id,
        body: commentBody
      });
      console.log('Updated comment!');
    } else {
      await octokit.issues.createComment({
        owner,
        repo,
        issue_number: prnum,
        body: commentBody
      });
      console.log('Created comment!');
    }
  }
})();
