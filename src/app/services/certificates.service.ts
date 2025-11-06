import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Certificate {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  imageUrl: string;
  isFavorite: boolean;
}

// Mock data
const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: '1',
    title: 'Full Stack Web',
    subtitle: 'Advanced MERN ',
    date: '12/09/2025',
    imageUrl: './../assets/images/mock-certificate.png',
    isFavorite: true
  },
  {
    id: '2',
    title: 'Data Analytics ',
    subtitle: 'Hands-on Power BI',
    date: '22/08/2025',
    imageUrl: './../assets/images/mock-certificate.png',
    isFavorite: false
  },
  {
    id: '3',
    title: 'Cloud Infrastructure ',
    subtitle: 'AWS Solutions ',
    date: '17/07/2025',
    imageUrl: './../assets/images/mock-certificate.png',
    isFavorite: false
  },
  {
    id: '4',
    title: 'UX/UI Product Design',
    subtitle: 'User Experience',
    date: '04/11/2025',
    imageUrl: './../assets/images/mock-certificate.png',
    isFavorite: true
  },
  {
    id: '5',
    title: 'Mobile Development',
    subtitle: 'React Native',
    date: '15/10/2025',
    imageUrl: './../assets/images/mock-certificate.png',
    isFavorite: false
  },
  {
    id: '6',
    title: 'Machine Learning ',
    subtitle: 'Applied AI',
    date: '03/05/2025',
    imageUrl: './../assets/images/mock-certificate.png',
    isFavorite: false
  }
];

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  readonly certificates = signal<Certificate[]>(MOCK_CERTIFICATES);

  getCertificates(): Observable<Certificate[]> {
    // Simular request HTTP
    return of(this.certificates()).pipe(delay(500));
  }

  toggleFavorite(id: string): void {
    this.certificates.update(certs =>
      certs.map(cert =>
        cert.id === id ? { ...cert, isFavorite: !cert.isFavorite } : cert
      )
    );
  }

  searchCertificates(query: string): void {
    if (!query.trim()) {
      this.certificates.set(MOCK_CERTIFICATES);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    const filtered = MOCK_CERTIFICATES.filter(cert =>
      cert.title.toLowerCase().includes(searchTerm) ||
      cert.subtitle.toLowerCase().includes(searchTerm)
    );

    this.certificates.set(filtered);
  }
}
