interface IdleRequestCallback {
    (deadline: IdleDeadline): void;
  }
  
  interface IdleDeadline {
    readonly didTimeout: boolean;
    timeRemaining(): number;
  }
  
  interface IdleRequestOptions {
    timeout?: number;
  }
  
  declare global {
    interface Window {
      requestIdleCallback: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback: (handle: number) => void;
    }
  }
  
  export {};