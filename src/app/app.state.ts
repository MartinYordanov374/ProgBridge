import { Post } from './models/post.model';

export interface AppState {
  readonly post: Post[];
}