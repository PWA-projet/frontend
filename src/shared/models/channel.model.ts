export interface ChannelI {
  id: string;
  name: string;
  key: string;
  members: { id: string; name: string }[];
}
