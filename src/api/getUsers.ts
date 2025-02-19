import {
  ApiResponse,
  GithubUser,
  GithubUserSearchResponseSchema,
} from '@/lib/types';

const BASE_URL = import.meta.env.VITE_API_BASE_PATH;

export const getUsers = async (
  username: string
): Promise<ApiResponse<GithubUser[]>> => {
  try {
    // NOTE: Instead of making an API call like this, in an production grade project I would create a
    // wrapper which takes care of api url, passing headers, handling server errors, session expiry etc.
    const url = `${BASE_URL}/search/users?q=${username}&per_page=5`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const rawData = await response.json();

    // NOTE:: In a real world scenario, I prefer OpenAPI / Swagger Code Generation instead of zod
    // to vaidate the api response

    const result = GithubUserSearchResponseSchema.safeParse(rawData);

    if (!result.success) {
      throw new Error(`Invalid API response format: ${result.error.message}`);
    }

    return { data: result.data.items, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('api/getUsers =>', errorMessage);
    return { data: [], error: errorMessage };
  }
};
