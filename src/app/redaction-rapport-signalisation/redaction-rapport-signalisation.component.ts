import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redaction-rapport-signalisation',
  templateUrl: './redaction-rapport-signalisation.component.html',
  styleUrls: ['./redaction-rapport-signalisation.component.css']
})
export class RedactionRapportSignalisationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  isModalOpen: boolean = false;

  // Object to bind the form data
  rapport = {
    identifiePar: 'WFSI',
    codeCable: 'DE512460-2',
    qtTotale: 200,
    dateOuverture: '2024-12-24',
    codeDefaut: 'FL40',
    unite: 'Unité 2',
    operateur: 'imen/mariem trabelsi/q9',
    descriptionNC: 'sortie dérivation non conforme',
    pilote: 'Sami Louhichi',
    equipe: 'Sana Belhaj Ali',
    analyseCauses: 'mal attention',
    codesSimilaires: 'Générique',
    action1: 'plus d\'attention lors de dim et de contrôle final',
    delai1: '2024-12-24',
    responsable1: 'Sana Belhaj Ali / sami',
    action2: 'afficher photo ok et n ok sur dim',
    delai2: '2024-12-24',
    responsable2: 'Sana Belhaj Ali',
    diffuseA: '',
    lien: '',
    dateReponse: '2024-12-23',
    dateCloture: ''
  };

  // Method to open the modal
  openModal() {
    this.isModalOpen = true;
  }

  // Method to close the modal
  closeModal() {
    this.isModalOpen = false;
    this.router.navigate(['/qualite']);
  }

  // Method to save the report (this could be sending the data to a backend)
  saveRapport() {
    console.log('Rapport saved:', this.rapport);
    // You can handle the saving logic here, e.g., sending it to a backend
    this.closeModal(); // Close the modal after saving
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isModalOpen = params['openModal'] === 'true';
    });
  }

}
