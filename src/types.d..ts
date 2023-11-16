export interface MessageType {
  _id: string;
  message: string;
  datetime: string;
  author: string;
}

export interface MessageFormType {
  auhtor: string;
  message: string;
}