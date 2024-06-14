import { v4 as uuidv4 } from 'uuid';
export function GenerateGuid() {
  return uuidv4();
}

export function GetKeyApp() {
  if (!localStorage.getItem('key_app')) {
    const key = GenerateGuid();
    localStorage.setItem('key_app', key);
    return key;
  }
  return localStorage.getItem('key_app');
}

export function GetToken(): string | null {
  return localStorage.getItem('access_token') || null;
}

export class Logger {
  static log(message: any, status: 'success' | 'error' = 'success') {
    if (status === 'success') {
      console.log(message);
      return;
    }

    if (status === 'error') {
      console.error(message);
      return;
    }
  }
}
