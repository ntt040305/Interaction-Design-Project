declare module '@angular/fire/app' {
  // Minimal declarations to satisfy TypeScript when @angular/fire is not installed yet.
  export function provideFirebaseApp(factory: any): any;
  export function initializeApp(config: any): any;
}

declare module '@angular/fire/auth' {
  export function provideAuth(factory: any): any;
  export function getAuth(): any;
}

declare module 'firebase/auth' {
  // Export the names we use in the code as `any` so compilation succeeds until proper types are installed.
  export const getAuth: any;
  export const GoogleAuthProvider: any;
  export const signInWithPopup: any;
  export const signOut: any;
  export type User = any;
}
