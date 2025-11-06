import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../../../../services/auth.service';
import { CertificatesService, Certificate } from '../../../../services/certificates.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly certificatesService = inject(CertificatesService);
  private readonly fb = inject(FormBuilder);

  protected readonly user = this.authService.currentUser;
  protected readonly certificates = this.certificatesService.certificates;
  protected readonly isLoading = signal(true);
  protected readonly activeMenu = signal<string>('certification');
  protected readonly selectedCertificate = signal<Certificate | null>(null);
  protected readonly isModalOpen = signal(false);

  protected readonly searchForm = this.fb.group({
    query: ['']
  });

  ngOnInit(): void {
    this.loadCertificates();

    // cambios en la búsqueda
    this.searchForm.controls.query.valueChanges
      .pipe(debounceTime(300))
      .subscribe(query => {
        this.certificatesService.searchCertificates(query || '');
      });
  }

  private loadCertificates(): void {
    this.certificatesService.getCertificates().subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  protected toggleFavorite(id: string): void {
    this.certificatesService.toggleFavorite(id);
  }

  protected setActiveMenu(menu: string): void {
    this.activeMenu.set(menu);
  }

  // protected logout(): void {
  //   this.authService.logout();
  // }

  protected handleMoreOptions(): void {
    alert('Opciones adicionales');
  }

  protected handleNotifications(): void {
    alert('Notificaciones');
  }

  protected handleTranslate(): void {
    alert('Traducir');
  }

  protected openCertificateModal(certificate: Certificate): void {
    this.selectedCertificate.set(certificate);
    this.isModalOpen.set(true);
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  }

  protected closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedCertificate.set(null);
    document.body.style.overflow = 'auto';
  }

  protected downloadCertificate(): void {
    const cert = this.selectedCertificate();
    if (cert) {
      alert(`Descargando certificado: ${cert.title}`);
    }
  }
}
