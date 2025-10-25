import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';

export type AppRole = 'student' | 'teacher' | 'unknown';

export interface AppUser {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
  role: AppRole;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<AppUser | null>(null);
  user$: Observable<AppUser | null> = this.userSubject.asObservable();

  private backendVerifyUrl = 'http://localhost:3000/api/auth/verify-token'; // <-- backend endpoint

  constructor(private http: HttpClient) {
    try {
      // try to initialize from Firebase current user (if any)
      const auth = getAuth();
      auth.onAuthStateChanged(async (fbUser: any) => {
        if (fbUser) {
          const token = await fbUser.getIdToken();
          this.exchangeTokenWithBackend(token, fbUser);
        } else {
          this.userSubject.next(null);
        }
      });
    } catch (error) {
      console.warn('Firebase not initialized properly:', error);
      // Set user to null if Firebase fails
      this.userSubject.next(null);
    }
  }

  async signInWithGoogle(): Promise<void> {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;
      const token = await fbUser.getIdToken();
      await this.exchangeTokenWithBackend(token, fbUser);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      console.warn('Error signing out from Firebase:', error);
    }
    this.userSubject.next(null);
  }

  setMockUser(user: AppUser): void {
    this.userSubject.next(user);
  }

  private exchangeTokenWithBackend(idToken: string, fbUser: User) {
    // Determine role based on email domain
    const role = this.determineUserRole(fbUser.email);
    
    const appUser: AppUser = {
      uid: fbUser.uid,
      displayName: fbUser.displayName,
      email: fbUser.email,
      photoURL: fbUser.photoURL,
      role: role
    };
    this.userSubject.next(appUser);
    
    // Optional: Send to backend for additional verification
    this.http.post<{ role: AppRole }>(this.backendVerifyUrl, { idToken }).subscribe({
      next: (res) => {
        // Update role if backend provides different role
        if (res?.role && res.role !== role) {
          const updatedUser = { ...appUser, role: res.role };
          this.userSubject.next(updatedUser);
        }
      },
      error: (err) => {
        console.warn('Backend verification failed, using local role determination', err);
      }
    });
  }

  private determineUserRole(email: string | null): AppRole {
    if (!email) return 'unknown';
    
    // Check if email ends with teacher domain (e.g., @teacher.university.edu)
    if (email.endsWith('@teacher.hsu.edu.vn') || email.endsWith('@hsu.edu.vn')) {
      return 'teacher';
    }
    
    // Check if email ends with student domain (e.g., @student.university.edu)
    if (email.endsWith('@student.hsu.edu.vn') || email.endsWith('@hsu.edu.vn')) {
      return 'student';
    }
    
    // Default to student for other domains
    return 'student';
  }
}
