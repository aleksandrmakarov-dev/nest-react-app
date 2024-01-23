export interface ErrorOr<T> {
  data?: T;
  error?: Error;
}
