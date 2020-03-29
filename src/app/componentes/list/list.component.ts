import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendaService } from 'src/app/service/agenda.service';
import { users } from 'src/app/interface/user';
import { Respuestas } from 'src/app/interface/respuestas';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users:users[];
  public enableFilter:boolean;
  closeResult = '';
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private agendaService: AgendaService,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.get_registros();

    this.filterText = "";
    this.enableFilter = true;
    this.filterText = "";
    this.filterPlaceholder = "Buscar en la agenda...";

    this.filterInput
        .valueChanges
        .pipe(debounceTime(200))
        .pipe(distinctUntilChanged())
        .subscribe(term => {
            this.filterText = term;
            console.log(term);
        });
  }
  private getDismissReason(reason: any): string {
    this.get_registros();
    console.log(reason);
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  openModal(id?) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.user = id;
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.get_registros();
    })
  }
  delete(id){
    this.agendaService.delete(id).subscribe((data:Respuestas) => {
      this.get_registros();
    },(error) => {
        console.error(error);
      }
    );
  }
  get_registros(){
    this.agendaService.get_all().subscribe((data:Respuestas) => {
      this.users = data.agendas
    },(error) => {
        console.error(error);
      }
    );
  }

}
