import {ErrorMessage} from './error-message';

export interface ApiError {
  status: number;
  message?: string;
  messages: Array<ErrorMessage>;
}
