
import { Component, OnInit } from '@angular/core';
import { QualiteService } from '../qualite.service';
import { User } from '../classes/user';
import { Role } from '../classes/role';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  constructor(private qualiteService: QualiteService ,private route: ActivatedRoute, private router: Router) { }
  user: User = new User();
  responseMessage = '';
  errorMessage = '';
  roles: Role[] = [];
  isModalOpen = false;
  
  ngOnInit(): void {
    //this.getRoles();
    this.route.queryParams.subscribe(params => {
      this.isModalOpen = params['openModal'] === 'true';
    });
  }

  /*getRoles(): void {
    this.qualiteService.getRoles().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des rôles', error);
      }
    );
  }*/

  /* onSubmit(): void {
    this.qualiteService.registerUser(this.user).subscribe(
      (response) => {
        this.responseMessage = 'Inscription réussie !';
        this.errorMessage = '';  // Réinitialiser le message d'erreur en cas de succès
      },
      (error) => {
        this.errorMessage = 'Erreur lors de l\'inscription.';
        this.responseMessage = '';  // Réinitialiser le message de succès en cas d'erreur
      }
    );
  } */
    onSubmit(): void {
      this.qualiteService.registerUser(this.user).subscribe(
        (response) => {
          // Si le serveur renvoie un message d'erreur dans la réponse
          if (response === 'Username is already taken') {
            this.errorMessage = response;
            this.responseMessage = '';
          } else {
            this.responseMessage = 'Inscription réussie !';
            this.errorMessage = '';
          }
        },
       
      );
    }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
