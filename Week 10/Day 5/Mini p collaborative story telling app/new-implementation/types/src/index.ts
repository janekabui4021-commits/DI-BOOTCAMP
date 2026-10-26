export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Contributor extends User {
  contributorId: number;
}

export interface StoryComment {
  id: number;
  content: string;
  author: User;
  createdAt: string;
}

export interface Story {
  id: number;
  title: string;
  content: string;
  author: User;
  contributors: Contributor[];
  comments: StoryComment[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface ApiError {
  message: string;
}
