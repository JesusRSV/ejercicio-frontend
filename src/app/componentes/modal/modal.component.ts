import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AgendaService } from 'src/app/service/agenda.service';
import { registrar, users } from 'src/app/interface/user';
import { Respuestas } from 'src/app/interface/respuestas';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  registrarForm
  usuario:users
  id_url
  @Input() public user;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private agendaService: AgendaService,
  ) {
    
  }

  ngOnInit() {
    this.registrarForm = this.formBuilder.group({
      id: '',
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

    if(this.user === undefined || this.user === null){
      
    }else{
      this.getOne(this.user);
    }
    
  }
  registrar(user:users){
    this.agendaService.create(user).subscribe((data:Respuestas) => {
      this.passEntry.emit(this.user);
      this.activeModal.close(this.user);
    },(error) => {
        console.error(error);
      }
    );

  }
  update(user:users){
    this.agendaService.update(user).subscribe((data:Respuestas) => {
      console.log(data);
      this.passEntry.emit(this.user);
      this.activeModal.close(this.user);
      
    },(error) => {
        console.error(error);
      }
    );

  }
  getOne(id){
    this.agendaService.get_one(id).subscribe((data:Respuestas) => {
      this.usuario = data.registro
      this.registrarForm.patchValue({
        id: this.usuario.id,
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        email: this.usuario.email,
        telefono: this.usuario.telefono,
      });
    },(error) => {
        console.error(error);
      }
    );
  }
  passBack() {
    this.passEntry.emit("Hola");
    this.activeModal.close("Hola");
  }
  onSubmit(customerData) {
    if(this.user === undefined || this.user === null){
      this.registrar(customerData);
    }else{
      this.update(customerData);
      
    }
  }
}
