import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Redaction8dComponent } from './redaction8d/redaction8d.component';
import { FormsModule } from '@angular/forms';
import { CreationRapportNcComponent } from './creation-rapport-nc/creation-rapport-nc.component';
import { RedactionRapportSignalisationComponent } from './redaction-rapport-signalisation/redaction-rapport-signalisation.component';
import { RedactionNcInterneComponent } from './redaction-nc-interne/redaction-nc-interne.component';
import { RapportAuditComponent } from './rapport-audit/rapport-audit.component';
import { QualiteComponent } from './qualite/qualite.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AdminComponent } from './admin/admin.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './AuthInterceptor';
@NgModule({
  declarations: [
    AppComponent,
    Redaction8dComponent,
    CreationRapportNcComponent,
    RedactionRapportSignalisationComponent,
    RedactionNcInterneComponent,
    RapportAuditComponent,
    QualiteComponent,
    LoginComponent,
    InscriptionComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
