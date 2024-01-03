import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/services/document.service';
import { Documento } from 'src/app/Models/Documento.model';
@Component({
  selector: 'app-dashboard-singleton',
  templateUrl: './dashboard-singleton.component.html',
  styleUrls: ['./dashboard-singleton.component.css'],
})
export class DashboardSingletonComponent {
  private documentService: DocumentService;
  numPDFs: number;
  numPDFsPendientes: number;
  numPDFsEnRevision: number;
  documentoForm: FormGroup;

  constructor() {
    this.documentService = DocumentService.getInstance();
    this.numPDFs = 0;
    this.numPDFsPendientes = 0;
    this.numPDFsEnRevision = 0;

    this.documentoForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      fileSource: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.documentoForm.valid) {
      const documento = {
        Estado: 'pending',
        enRevision: false,
        rutaDocumento: this.generateDocumentPath(),
        gmailPropietario: this.documentoForm.get('email').value,
      };

      this.documentService.addDocument(documento);

      this.numPDFs++;
      this.numPDFsPendientes++;

      this.documentoForm.reset();
    }
  }

  onFileChange(event: any) {
    console.log(event.target.files);
  }

  get documentosPendientes() {
    return this.documentService.getDocumentsByState('pending');
  }

  get documentosEnRevision() {
    return this.documentService.getDocumentsByState('accepted'); 
  }

  redirectToPDF(documento: any) {
  }

  private generateDocumentPath(): string {
    const timestamp = Date.now();
    return `/documents/${timestamp}_documento.pdf`;
  }
}