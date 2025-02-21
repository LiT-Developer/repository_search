export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
}

export interface SearchState {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  username: string;
}