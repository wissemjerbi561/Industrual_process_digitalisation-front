/* import { Component, OnInit } from '@angular/core';
import { Rapport8D } from '../classes/rapport8d';

@Component({
  selector: 'app-redaction8d',
  templateUrl: './redaction8d.component.html',
  styleUrls: ['./redaction8d.component.css']
})
export class Redaction8dComponent implements OnInit {
  isModalOpen: boolean = false;
  rapport: Rapport8D = new Rapport8D();
  constructor() {}
  ngOnInit(): void {
  }
  openModal() {
    this.isModalOpen = true;
  }
  
  // Function to close the modal
  closeModal() {
    this.isModalOpen = false;
  }
  
  // Function to save the report
  saveRapport() {
    console.log('Rapport saved:', this.rapport);
    this.closeModal();
  }
}
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rapport8D } from '../classes/rapport8d';

@Component({
  selector: 'app-redaction8d',
  templateUrl: './redaction8d.component.html',
  styleUrls: ['./redaction8d.component.css']
})
export class Redaction8dComponent implements OnInit {
  isModalOpen: boolean = false;
  rapport: Rapport8D = new Rapport8D();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Écouter les queryParams pour détecter si la modal doit être affichée
    this.route.queryParams.subscribe(params => {
      this.isModalOpen = params['openModal'] === 'true';
    });
  }

  // Fermer la modal et supprimer le queryParam
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

  // Fonction pour enregistrer le rapport
  saveRapport() {
    console.log('Rapport saved:', this.rapport);
    this.closeModal();
  
  }
}
