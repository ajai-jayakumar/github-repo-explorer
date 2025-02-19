import {
  ApiResponse,
  GithubRepositoryItem,
  GithubUserRepositorySchema,
} from '@/lib/types';

const BASE_URL = import.meta.env.VITE_API_BASE_PATH;

export const getUserRepositories = async (
  username: string
): Promise<ApiResponse<GithubRepositoryItem[]>> => {
  try {
    // NOTE: Instead of making an API call like this, in an production grade project I would create a
    // wrapper which takes care of api url, passing headers, handling server errors, session expiry etc.
    const url = `${BASE_URL}/users/${username}/repos`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const rawData = await response.json();

    // NOTE:: In a real world scenario, I prefer OpenAPI / Swagger Code Generation instead of zod
    // to vaidate the api response
    const result = GithubUserRepositorySchema.safeParse(rawData);

    if (!result.success) {
      throw new Error(`Invalid API response format: ${result.error.message}`);
    }

    return { data: result.data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('api/getUserRepositories =>', errorMessage);
    return { data: [], error: errorMessage };
  }
};
