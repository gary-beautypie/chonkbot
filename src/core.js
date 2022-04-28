const calculateChonk = ({ additions, deletions, files }) => {
  const score = (additions + deletions) * (files / 10);
  if (score >= 5000) {
    return "OH LAWD HE COMIN!";
  }

  if (score >= 2000) {
    return "MEGACHONKER";
  }

  if (score >= 1000) {
    return "Hefty chonk";
  }

  if (score >= 500) {
    return "A heckin' chonker";
  }

  if (score >= 200) {
    return "He chomnk";
  }

  return "A fine boi";
};

const createStatus = (payload, octokit) => {
  const { additions, deletions, changed_files: files } = payload.pull_request;

  return octokit.repos.createCommitStatus({
    owner: payload.pull_request.head.repo.owner.login,
    repo: payload.pull_request.head.repo.name,
    sha: payload.pull_request.head.sha,
    state: "success",
    description: calculateChonk({ additions, deletions, files }),
    context: "chonkbot",
  });
};

const getChonkImage = ({ additions, deletions, files }) => {
  const score = (additions + deletions) * (files / 10);
  if (score >= 5000) {
    return "[](https://github.com/gary-beautypie/chonkbot/blob/master/assets/oh_lawd_he_comin.jpg?raw=true)";
  }

  if (score >= 2000) {
    return "[](https://github.com/gary-beautypie/chonkbot/blob/master/assets/megachonker.jpg?raw=true)";
  }

  if (score >= 1000) {
    return "[](https://github.com/gary-beautypie/chonkbot/blob/master/assets/hefty_chonk.jpg?raw=true)";
  }

  if (score >= 500) {
    return "[](https://github.com/gary-beautypie/chonkbot/blob/master/assets/heckin_chonker.jpg?raw=true)";
  }

  if (score >= 200) {
    return "[](https://github.com/gary-beautypie/chonkbot/blob/master/assets/he_chomnk.jpg?raw=true)";
  }

  return "[](https://github.com/gary-beautypie/chonkbot/blob/master/assets/fine_boi.png?raw=true)";
};

const createComment = (payload, octokit) => {
  const { additions, deletions, changed_files: files } = payload.pull_request;

  return octokit.issues.createComment({
    owner: payload.pull_request.head.repo.owner.login,
    repo: payload.pull_request.head.repo.name,
    issue_number: payload.pull_request.number,
    body: getChonkImage({ additions, deletions, files }),
  });
};

module.exports = {
  calculateChonk,
  createStatus,
  createComment,
};
