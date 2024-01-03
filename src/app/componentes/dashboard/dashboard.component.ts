import { Documento } from './../../Models/Documento.model';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  documentoForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    fileSource: new FormControl('', [Validators.required]),
  });
  documentos: Documento[];
  numPDFs: number;
  numPDFsPendientes: number;
  numPDFsEnRevision: number;
  documentosPendientes: Documento[];
  documentosEnRevision: Documento[];
  documentosAceptados: Documento[];
  documentosRechazados: Documento[];

  constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.update();
    console.log("Pendientes",this.numPDFsPendientes);
    console.log("En revision",this.numPDFsEnRevision);
  }
  
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.documentoForm.patchValue({
        fileSource: file
      });
    }
  }

  // Implementar el método update para refrescar la información
  update(): void {
    this.loadPDFs();
  }

  loadPDFs() {
    this.apiService.loadPDFs().subscribe(
      (documentos: Documento[]) => {
        this.documentos = documentos;
        this.documentosPendientes = documentos.filter(doc => doc.Estado === 'Pendiente');
        this.documentosEnRevision = documentos.filter(doc => doc.Estado === 'EnRevision');
        this.documentosAceptados = documentos.filter(doc => doc.Estado === 'Aceptado');
        this.documentosRechazados = documentos.filter(doc => doc.Estado === 'Rechazado');

        this.numPDFs = documentos.length;
        this.numPDFsEnRevision = documentos.filter(p => p.Estado === 'EnRevision' ).length;
        this.numPDFsPendientes = documentos.filter(p => p.Estado === 'Pendiente' ).length;
      },
      (error) => {
        console.error('Error al cargar proyectos:', error);
      }
    );
  }
  
  redirectToPDF(documento: Documento) {
    if (documento && documento.idDocumento) {
      const url = ['ver-proyecto', documento.idDocumento];
      this.router.navigate(url);
    } else {
      console.error('ID de proyecto indefinido. No se puede navegar.');
    }
  }

  onSubmit(): void {
    const email = this.documentoForm.get('email').value;
    const documento = this.documentoForm.get('fileSource').value;
    console.log("Email: ",email);

    if (email && documento) {
      this.apiService.registrarDocumento(email, documento).subscribe(
        (documentoResponse) => {
          if (documentoResponse && documentoResponse.success) {
            console.log('Documento registrado con éxito.');
            this.documentoForm.reset();
            this.update();
          } else {
            console.error('Error al registrar documento.');
          }
        },
        (documentoError) => {
          console.error('Error en la solicitud para registrar documento: ', documentoError);
        }
      );
    }
  }

}


