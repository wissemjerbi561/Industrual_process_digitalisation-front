import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redaction-nc-interne',
  templateUrl: './redaction-nc-interne.component.html',
  styleUrls: ['./redaction-nc-interne.component.css']
})
export class RedactionNcInterneComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  isModalOpen = false;

  // Objet contenant toutes les informations du formulaire
  rapport = {
    numeroRapport: 'IN24/031', // Exemple de valeur initiale
    unite: '',
    origine: 'Interne',
    type: 'Produit',
    dateOuverture: '',
    dateReclamation: '',
    identifiePar: '',
    dateProduction: '',
    codeCable: '',
    numeroOrdre: null,
    operateur: '',
    qtTotale: null,
    qtEchantillon: null,
    qtNC: null,
    defaut: 'TU02',
    description: '',
    codesSimilaires: '',
    actionImmediate: '',
    responsable: '',
    realise: false,
    pilote: '',
    equipe: '',
    lien: '',
  };

  // Fonction pour ouvrir le modal
  openModal() {
    this.isModalOpen = true;
  }

  // Fonction pour fermer le modal
  closeModal() {
    this.isModalOpen = false;
    this.router.navigate(['/qualite']);
  }

  // Fonction pour enregistrer le rapport
  saveRapport() {
    console.log('Rapport enregistré :', this.rapport);

    // Ici, vous pouvez ajouter le code pour enregistrer les données,
    // par exemple en appelant un service backend via une API.

    this.closeModal();
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isModalOpen = params['openModal'] === 'true';
    });
  }

}
