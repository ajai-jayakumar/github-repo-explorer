import { z } from 'zod';

const BASE_URL = import.meta.env.VITE_API_BASE_PATH;

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

// NOTE:: In a real world scenario, I prefer OpenAPI / Swagger Code Generation instead of zod
// to vaidate the api response

// Also placed the zod schema in the bottom so the actual logic of this function can be ready with ease
const GithubUserSchema = z.object({
  login: z.string(),
  id: z.number(),
  node_id: z.string(),
  avatar_url: z.string().url().nullable(),
  gravatar_id: z.string().nullable(),
  url: z.string().url().nullable(),
  html_url: z.string().url().nullable(),
  followers_url: z.string().url().nullable(),
  following_url: z.string().nullable(),
  gists_url: z.string().nullable(),
  starred_url: z.string().nullable(),
  subscriptions_url: z.string().url().nullable(),
  organizations_url: z.string().url().nullable(),
  repos_url: z.string().url().nullable(),
  events_url: z.string().nullable(),
  received_events_url: z.string().url().nullable(),
  type: z.string().nullable(),
  site_admin: z.boolean().nullable(),
  score: z.number().nullable().optional(),
});

const GithubUserSearchResponseSchema = z.object({
  total_count: z.number(),
  incomplete_results: z.boolean(),
  items: z.array(GithubUserSchema),
});
