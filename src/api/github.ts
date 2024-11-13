import { GitHubUser, GitHubError } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';

class GitHubAPIError extends Error {
  constructor(message: string, public status: number, public data?: GitHubError) {
    super(message);
    this.name = 'GitHubAPIError';
  }
}

async function githubFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  
  if (!token) {
    throw new Error('GitHub token not configured');
  }

  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${token}`,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new GitHubAPIError(
      `GitHub API error: ${response.statusText}`,
      response.status,
      data as GitHubError
    );
  }

  return data as T;
}

export async function getCurrentUser(): Promise<GitHubUser> {
  return githubFetch<GitHubUser>('/user');
}

export async function getUserRepositories(username: string) {
  return githubFetch<any[]>(`/users/${username}/repos`);
}

export async function getRepository(owner: string, repo: string) {
  return githubFetch<any>(`/repos/${owner}/${repo}`);
}