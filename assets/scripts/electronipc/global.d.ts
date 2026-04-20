export interface ElectronAPI {
  sendMessage: (content: string) => void;
  storageSet: (key: string, value: string) => Promise<boolean>;
  storageGet: (key: string) => Promise<string | null>;
}

// 扩展 Window 接口
declare global {
  interface Window {
    api: ElectronAPI;
  }
}