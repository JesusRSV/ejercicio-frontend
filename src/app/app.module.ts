import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { AgendaService } from './service/agenda.service';
import { ListComponent } from './componentes/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './componentes/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FiltroPipe } from './filtro.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ModalComponent,
    FiltroPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [AgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
