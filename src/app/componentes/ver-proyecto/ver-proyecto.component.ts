// ver-proyecto.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Documento } from 'src/app/Models/Documento.model';

@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.css']
})
export class VerProyectoComponent implements OnInit {
  verDocumento: Documento;
  idDocumento: number;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idDocumento = +params.get('id'); 
      if (!isNaN(this.idDocumento)) {
        this.loadPDF(this.idDocumento);
      }
    });
    console.log("Datos de PDF: ", this.verDocumento);
    this.enRevission(this.idDocumento);

  }


  loadPDF(idDocumento: number) {
    this.apiService.getPDF(idDocumento).subscribe(
      (verDocumento: Documento) => {
        this.verDocumento = verDocumento;
        console.log("Datos del pdfaa: ", this.verDocumento);
      },
      (error) => {
        console.error('Error al cargar PDF: ', error)
      }
    )
  }

  enRevission(idDocumento: number): void {
    this.apiService.enRevision(idDocumento).subscribe(
      (response) => {
        this.loadPDF(this.idDocumento);
      },
      (error) => {
        console.error('Error al cambiar el estado', error);
      }
    )
  }

  aceptado(): void {
    const idDocumento = this.idDocumento;
    this.apiService.aceptado(idDocumento).subscribe(
      (response) => {
        if (response && response.success) {
          // Enviar el correo electrónico después de agregar el stakeholder
          this.apiService.enviarCorreo(this.verDocumento).subscribe(
            (correoResponse) => {
              if (correoResponse && correoResponse.success) {
                console.log('Correo electrónico enviado con éxito.');
              } else {
                console.error('Error al enviar el correo electrónico.');
              }
            },
            (correoError) => {
              console.error('Error en la solicitud para enviar el correo electrónico: ', correoError);
            }
          );
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Error al agregar stakeholder.');
        }
      },
      (error) => {
        console.error('Error al cambiar el estado', error);
      }
    )
  }

  rechazado(): void {
    const idDocumento = this.idDocumento;
    this.apiService.rechazado(idDocumento).subscribe(
      (response) => {
        if (response && response.success) {
          // Enviar el correo electrónico después de agregar el stakeholder
          this.apiService.enviarCorreo2(this.verDocumento).subscribe(
            (correoResponse) => {
              if (correoResponse && correoResponse.success) {
                console.log('Correo electrónico enviado con éxito.');
              } else {
                console.error('Error al enviar el correo electrónico.');
              }
            },
            (correoError) => {
              console.error('Error en la solicitud para enviar el correo electrónico: ', correoError);
            }
          );
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Error al agregar stakeholder.');
        }
      },
      (error) => {
        console.error('Error al cambiar el estado', error);
      }
    )
  }

  getPDFUrl(pdf: string): string {
    // Construye la URL completa al archivo PDF
    return `http://localhost:8080/pdf/${pdf}`;
  }

  extractFileName(pdf: string): string {
    // Extrae el nombre del archivo de la ruta completa
    const parts = pdf.split('/');
    return parts[parts.length - 1];
  }

}



