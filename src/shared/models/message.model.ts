export interface MessageI {
  id?: string;
  channelId: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
}
