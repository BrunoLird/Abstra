import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  email: string;
  name: string;
}

// mock data
const MOCK_USER: User = {
  email: 'jhondoe@gmail.com',
  name: 'Jhon Doe'
};

const VALID_CREDENTIALS = {
  email: 'jhondoe@gmail.com',
  password: 'password123'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);

  readonly currentUser = signal<User | null>(null);
  readonly isAuthenticated = signal<boolean>(false);

  login(credentials: LoginCredentials): Observable<User> {
    // Simular request HTTP con delay
    return new Observable(observer => {
      setTimeout(() => {
        if (
          credentials.email === VALID_CREDENTIALS.email &&
          credentials.password === VALID_CREDENTIALS.password
        ) {
          this.currentUser.set(MOCK_USER);
          this.isAuthenticated.set(true);
          observer.next(MOCK_USER);
          observer.complete();
        } else {
          observer.error({ message: 'Credenciales inválidas' });
        }
      }, 1000);
    });
  }

  // logout(): void {
  //   this.currentUser.set(null);
  //   this.isAuthenticated.set(false);
  //   this.router.navigate(['/login']);
  // }
}
