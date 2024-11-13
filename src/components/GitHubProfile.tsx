import React, { useEffect } from 'react';
import { useStore } from '../store';
import { getCurrentUser } from '../api/github';

export default function GitHubProfile() {
  const { githubUser, isLoading, error, setGitHubUser, setLoading, setError } = useStore();

  useEffect(() => {
    async function fetchGitHubUser() {
      setLoading(true);
      setError(null);
      try {
        const user = await getCurrentUser();
        setGitHubUser(user);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch GitHub profile';
        setError(message);
        setGitHubUser(null);
      } finally {
        setLoading(false);
      }
    }

    if (!githubUser) {
      fetchGitHubUser();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        <p>Error loading GitHub profile: {error}</p>
      </div>
    );
  }

  if (!githubUser) {
    return null;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-4">
        <img
          src={githubUser.avatar_url}
          alt={`${githubUser.login}'s avatar`}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold">{githubUser.name || githubUser.login}</h3>
          {githubUser.bio && <p className="text-gray-600">{githubUser.bio}</p>}
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-xl font-bold">{githubUser.public_repos}</div>
          <div className="text-gray-600 text-sm">Repositories</div>
        </div>
        <div>
          <div className="text-xl font-bold">{githubUser.followers}</div>
          <div className="text-gray-600 text-sm">Followers</div>
        </div>
        <div>
          <div className="text-xl font-bold">{githubUser.following}</div>
          <div className="text-gray-600 text-sm">Following</div>
        </div>
      </div>
    </div>
  );
}