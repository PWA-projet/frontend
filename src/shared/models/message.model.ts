export interface MessageI {
  id: number;
  channelId: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
  };
}
