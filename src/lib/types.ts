import { z } from 'zod';

// API Response Types
export interface ApiResponse<T> {
  data: T;
  error: string | null;
}

// User Types
export const GithubUserSchema = z.object({
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

export const GithubUserSearchResponseSchema = z.object({
  total_count: z.number(),
  incomplete_results: z.boolean(),
  items: z.array(GithubUserSchema),
});

export type GithubUser = z.infer<typeof GithubUserSchema>;

// Repository Types
export const GithubRepositoryItemSchema = z.object({
  id: z.number(),
  node_id: z.string(),
  name: z.string(),
  full_name: z.string().nullable(),
  private: z.boolean().nullable(),
  owner: z.object({}).nullable(),
  html_url: z.string().url().nullable(),
  description: z.string().nullable(),
  fork: z.boolean().nullable(),
  url: z.string().url().nullable(),
  forks_url: z.string().url().nullable(),
  keys_url: z.string().url().nullable(),
  collaborators_url: z.string().url().nullable(),
  teams_url: z.string().url().nullable(),
  hooks_url: z.string().url().nullable(),
  issue_events_url: z.string().url().nullable(),
  events_url: z.string().url().nullable(),
  assignees_url: z.string().url().nullable(),
  branches_url: z.string().url().nullable(),
  tags_url: z.string().url().nullable(),
  blobs_url: z.string().url().nullable(),
  git_tags_url: z.string().url().nullable(),
  git_refs_url: z.string().url().nullable(),
  trees_url: z.string().url().nullable(),
  statuses_url: z.string().url().nullable(),
  languages_url: z.string().url().nullable(),
  stargazers_url: z.string().url().nullable(),
  contributors_url: z.string().url().nullable(),
  subscribers_url: z.string().url().nullable(),
  subscription_url: z.string().url().nullable(),
  commits_url: z.string().url().nullable(),
  git_commits_url: z.string().url().nullable(),
  comments_url: z.string().url().nullable(),
  issue_comment_url: z.string().url().nullable(),
  contents_url: z.string().url().nullable(),
  compare_url: z.string().url().nullable(),
  merges_url: z.string().url().nullable(),
  archive_url: z.string().url().nullable(),
  downloads_url: z.string().url().nullable(),
  issues_url: z.string().url().nullable(),
  pulls_url: z.string().url().nullable(),
  milestones_url: z.string().url().nullable(),
  notifications_url: z.string().url().nullable(),
  labels_url: z.string().url().nullable(),
  releases_url: z.string().url().nullable(),
  deployments_url: z.string().url().nullable(),
  created_at: z
    .string()
    .transform((date) => new Date(date))
    .nullable(),
  updated_at: z
    .string()
    .transform((date) => new Date(date))
    .nullable(),
  pushed_at: z
    .string()
    .transform((date) => new Date(date))
    .nullable(),
  git_url: z.string().nullable(),
  ssh_url: z.string().nullable(),
  clone_url: z.string().nullable(),
  svn_url: z.string().nullable(),
  homepage: z.string().nullable(),
  size: z.number().nullable(),
  stargazers_count: z.number().nullable(),
  watchers_count: z.number().nullable(),
  language: z.string().nullable(),
  has_issues: z.boolean().nullable(),
  has_projects: z.boolean().nullable(),
  has_downloads: z.boolean().nullable(),
  has_wiki: z.boolean().nullable(),
  has_pages: z.boolean().nullable(),
  has_discussions: z.boolean().nullable(),
  forks_count: z.number().nullable(),
  mirror_url: z.string().nullable(),
  archived: z.boolean().nullable(),
  disabled: z.boolean().nullable(),
  open_issues_count: z.number().nullable(),
  license: z.object({}).nullable(),
  allow_forking: z.boolean().nullable(),
  is_template: z.boolean().nullable(),
  web_commit_signoff_required: z.boolean().nullable(),
  topics: z.array(z.string()).nullable(),
  visibility: z.string().nullable(),
  forks: z.number().nullable(),
  open_issues: z.number().nullable(),
  watchers: z.number().nullable(),
  default_branch: z.string().nullable(),
});

export const GithubUserRepositorySchema = z.array(GithubRepositoryItemSchema);

export type GithubRepositoryItem = z.infer<typeof GithubRepositoryItemSchema>;
