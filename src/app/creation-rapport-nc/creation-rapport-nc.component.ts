import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rapport8D } from '../classes/rapport8d';
@Component({
  selector: 'app-creation-rapport-nc',
  templateUrl: './creation-rapport-nc.component.html',
  styleUrls: ['./creation-rapport-nc.component.css']
})
export class CreationRapportNcComponent implements OnInit {
  isModalOpen: boolean = false;
  rapport: any = {
    identifiePar: '',
    codeCable: '',
    qtTotale: null,
    dateOuverture: '',
    pilote: '',
    equipe: '',
    descriptionNC: '',
    codesDefauts: [],
    actionImmediat: '',
    responsable: '',
    realise: false,
    productionEnCours: '',
  };

 
  
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isModalOpen = params['openModal'] === 'true';
    });
  }
  openModal() {
    this.isModalOpen = true;
  }
  
  closeModal() {
    
    this.isModalOpen = false;
  
    // Supprimer le queryParam 'openModal'
    this.router.navigate([], {
      queryParams: { openModal: null },
      queryParamsHandling: 'merge',
    }).then(() => {
      // Rediriger vers '/qualite' après avoir supprimé les queryParams
      this.router.navigate(['/qualite']);
    });
  }
  saveRapport() {
    // Logique pour enregistrer le rapport
    console.log('Rapport enregistré :', this.rapport);

    // Fermer le modal après l'enregistrement
    this.closeModal();
  }
}
