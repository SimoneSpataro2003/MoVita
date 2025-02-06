import { Injectable } from '@angular/core';

declare var bootstrap: any;

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor() { }

  show(toastId: string, title: string ,description: string) {
    const toastElement = document.getElementById(toastId);
    if (toastElement) {
      // Trova l'elemento che contiene il messaggio del toast
      const toastTitle = toastElement.querySelector('.toast-title');
      if (toastTitle) {
        toastTitle.textContent = title; // Aggiorna il titolo
      }

      const toastBody = toastElement.querySelector('.toast-body');
      if (toastBody) {
        toastBody.textContent = description; // Aggiorna la descrizione
      }

      // Crea il toast e mostralo
      const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 3000
      });
      toast.show();
    }
  }
}
