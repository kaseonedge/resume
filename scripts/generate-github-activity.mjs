#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const username = process.env.GITHUB_ACTIVITY_USERNAME || 'kaseonedge';
const repoLimit = Number(process.env.GITHUB_ACTIVITY_REPO_LIMIT || 12);
const queryPath = resolve('scripts/github-query.graphql');
const outputPath = resolve('src/generated/githubActivity.json');

function runGh(query) {
  return execFileSync(
    'gh',
    ['api', 'graphql', '-F', `login=${username}`, '-F', `first=${repoLimit}`, '-f', `query=${query}`],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
  );
}

function levelToNumber(level) {
  switch (level) {
    case 'FIRST_QUARTILE': return 1;
    case 'SECOND_QUARTILE': return 2;
    case 'THIRD_QUARTILE': return 3;
    case 'FOURTH_QUARTILE': return 4;
    default: return 0;
  }
}

function redactError(error) {
  return String(error?.stderr || error?.message || error).replace(/(gho_|ghp_|github_pat_|ghu_|ghs_)[A-Za-z0-9_]+/g, '[REDACTED]');
}

try {
  const query = readFileSync(queryPath, 'utf8');
  const response = JSON.parse(runGh(query));
  const user = response?.data?.user;
  if (!user) throw new Error(`GitHub user not found: ${username}`);

  const calendar = user.contributionsCollection.contributionCalendar;
  const repos = (user.repositories?.nodes || []).map((repo) => {
    const history = repo.defaultBranchRef?.target?.history;
    const latestCommit = history?.nodes?.[0] || null;
    return {
      nameWithOwner: repo.nameWithOwner,
      url: repo.url,
      description: repo.description,
      pushedAt: repo.pushedAt,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      language: repo.primaryLanguage ? {
        name: repo.primaryLanguage.name,
        color: repo.primaryLanguage.color,
      } : null,
      defaultBranchCommitCount: history?.totalCount || 0,
      latestCommit: latestCommit ? {
        committedDate: latestCommit.committedDate,
        oid: latestCommit.oid,
        shortOid: latestCommit.oid.slice(0, 7),
        messageHeadline: latestCommit.messageHeadline,
        url: latestCommit.url,
        additions: latestCommit.additions,
        deletions: latestCommit.deletions,
      } : null,
    };
  });

  const generated = {
    source: 'github-graphql',
    generatedAt: new Date().toISOString(),
    username: user.login,
    profileUrl: user.url,
    avatarUrl: user.avatarUrl,
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks.map((week) => ({
      contributionDays: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: levelToNumber(day.contributionLevel),
      })),
    })),
    repositories: repos,
  };

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(generated, null, 2)}\n`);
  console.log(`Generated ${outputPath}`);
  console.log(`${generated.totalContributions} contributions across ${generated.weeks.length} weeks; ${repos.length} public repositories included.`);
} catch (error) {
  console.error('Failed to generate GitHub activity from GitHub GraphQL.');
  console.error(redactError(error));
  console.error('Authenticate with `gh auth login` or provide a token to gh before building.');
  process.exit(1);
}
