import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DocumentoRegistro } from 'src/app/models/documentoRegistro.model';
import { DocumentRegistroService } from 'src/app/services/document-registro.service';
declare var bootstrap: any;
@Component({
  selector: 'app-view-doc',
  standalone: false,
  templateUrl: './view-doc.component.html',
  styleUrl: './view-doc.component.scss'
})
export class ViewDocComponent implements OnInit, OnChanges{
  @Input() docSeleccionado: DocumentoRegistro;
  @Output() refreshBannerList: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  title= 'File Documents';
  document!: DocumentoRegistro;
  type!: string;
  isLoading:boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private documentrService: DocumentRegistroService,
    private _sanitizer: DomSanitizer,

  ){}
  
  ngOnInit(){
    // this.activatedRoute.params.subscribe( ({id}) => this.iniciarFile(id));
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['docSeleccionado'] &&
      changes['docSeleccionado'].currentValue
    ) {
      this.title = 'Analizando Documento';
      const banner = changes['docSeleccionado'].currentValue;
      this.documentrService.getDocument(this.docSeleccionado._id).subscribe((resp: any) => {
      this.document = resp;
      console.log(resp)
       this.type = this.document.type;
      this.isLoading = false;
    })
      this.docSeleccionado = banner;
      this.title = 'Analizando Documento';
    }
  }

  iniciarFile(id: string) {
    this.isLoading = true;
    this.documentrService.getDocument(id).subscribe((resp: any) => {
      this.document = resp;
       this.type = this.document.type;
      this.isLoading = false;
    })
  }


  getVideoIframe(url: any) {
    var file, results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    file = (results === null) ? url : results[1];

    // return this._sanitizer.bypassSecurityTrustResourceUrl(baseUrl + file);
    return this._sanitizer.bypassSecurityTrustResourceUrl(file);
  }

  getPDFIframe(url: string): SafeResourceUrl {
  return this._sanitizer.bypassSecurityTrustResourceUrl(url);
}

 onClose() {
    this.docSeleccionado = null;
    this.closeModal.emit();
  }

}
