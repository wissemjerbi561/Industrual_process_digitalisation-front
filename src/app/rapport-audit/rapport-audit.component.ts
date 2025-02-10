import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rapport-audit',
  templateUrl: './rapport-audit.component.html',
  styleUrls: ['./rapport-audit.component.css']
})
export class RapportAuditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  isModalOpen: boolean = false;

  // Modèle de données pour le rapport d'audit
  rapportAudit = {
    numeroRapport: 'AU24/03',
    unite: 'LG',
    origine: 'Interne',
    dateOuverture: '',
    type: 'Procédure',
    dateReclamation: '',
    identifiePar: 'TÜV Rheinland',
    dateProduction: '',
    codeCable: '',
    numeroOrdre: 0,
    operateur: '',
    qtTotale: 0,
    qtEchantillon: 0,
    qtNC: 0,
    defaut: 'PRD01',
    description: '',
    codesSimilaires: '',
    actionImmediate: '',
    responsable: 'Soufien Hammami',
    realise: false,
    pilote: 'Sami Kraiem',
    equipe: '',
    lien: ''
  };

  // Fonction pour ouvrir le modal
  openModal(): void {
    this.isModalOpen = true;
  }

  // Fonction pour fermer le modal
  closeModal(): void {
    this.isModalOpen = false;
    this.router.navigate(['/qualite']);
  }

  // Fonction pour sauvegarder le rapport d'audit
  saveRapportAudit(): void {
    console.log('Rapport d audit enregistré :', this.rapportAudit);
    this.closeModal();
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isModalOpen = params['openModal'] === 'true';
    });
  }

}
