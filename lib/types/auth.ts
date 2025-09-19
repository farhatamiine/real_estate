export type AuthError = {
  message: string;
  code?: string;
};

export type AuthResult<T> = {
  ok: boolean;
  data?: T;
  error?: AuthError;
};
