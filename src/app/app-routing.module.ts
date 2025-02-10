import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Redaction8dComponent } from './redaction8d/redaction8d.component';
import { CreationRapportNcComponent } from './creation-rapport-nc/creation-rapport-nc.component';
import { AppComponent } from './app.component';
import { RedactionRapportSignalisationComponent } from './redaction-rapport-signalisation/redaction-rapport-signalisation.component';
import { RedactionNcInterneComponent } from './redaction-nc-interne/redaction-nc-interne.component';
import { RapportAuditComponent } from './rapport-audit/rapport-audit.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { QualiteComponent } from './qualite/qualite.component';


const routes: Routes = [
  { path: 'rapport8d', component: Redaction8dComponent }, // Route vers Redaction8dComponent
 // { path: '', redirectTo: 'rapport8d', pathMatch: 'full' }, // Redirection vers /rapport8d par défaut
 // { path: '**', redirectTo: 'rapport8d' }, // Gestion des routes non définies
  { path: 'creation-rapport-nc', component: CreationRapportNcComponent },
  
  { path: 'rapportSignalisation', component: RedactionRapportSignalisationComponent },
  { path: 'rapportNcInterne', component: RedactionNcInterneComponent },
  { path: 'rapportAudit', component: RapportAuditComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'qualite', component: QualiteComponent },
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
