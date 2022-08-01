export type Toast = {
  title?: string;
  color: "blue";
  text: string;
  expireTime?: number;
};

export type ToastParams = {
  text;
  title?: string;
  expireIn?: number;
};
