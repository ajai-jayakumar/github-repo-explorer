import { z } from 'zod';

const BASE_URL = import.meta.env.VITE_API_BASE_PATH;

// NOTE:: In a real world scenario, I prefer OpenAPI / Swagger Code Generation instead of zod
// to vaidate the api response
const GithubUserSchema = z.object({
  login: z.string(),
  id: z.number(),
  node_id: z.string(),
  avatar_url: z.string().url(),
  gravatar_id: z.string(),
  url: z.string().url(),
  html_url: z.string().url(),
  followers_url: z.string().url(),
  following_url: z.string(),
  gists_url: z.string(),
  starred_url: z.string(),
  subscriptions_url: z.string().url(),
  organizations_url: z.string().url(),
  repos_url: z.string().url(),
  events_url: z.string(),
  received_events_url: z.string().url(),
  type: z.string(),
  site_admin: z.boolean(),
  score: z.number().optional(),
});

const GithubSearchResponseSchema = z.object({
  total_count: z.number(),
  incomplete_results: z.boolean(),
  items: z.array(GithubUserSchema),
});

export type GithubUserSchema = z.infer<typeof GithubUserSchema>;

interface GithubUser {
  data: GithubUserSchema[];
  error: string | null;
}

export const getUsers = async (username: string): Promise<GithubUser> => {
  try {
    const url = `${BASE_URL}/search/users?q=${username}&per_page=5`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const rawData = await response.json();

    const result = GithubSearchResponseSchema.safeParse(rawData);

    if (!result.success) {
      throw new Error('Invalid API response format');
    }

    return { data: result.data.items, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('api/getUsers =>', errorMessage);
    return { data: [], error: errorMessage };
  }
};
