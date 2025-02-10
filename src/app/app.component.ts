import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';
import { QualiteService } from './qualite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'qualiteApp';
  selectedTab = 'traitementNC';
  showRapport8D = false; // Par défaut, le rapport n'est pas affiché
  showRapportNC =false;
  showRapportNcInterne =false;
  showRapportSignalisation =false ;
  showRapportAudit =false ;
  showModalInscription =false;
  showModalLogin =false;
  selectedSubTab: string = '8D';
  selectedTableauBordSubTab: string = 'indicators';
  currentUser: any = null;
  constructor(private router: Router,
  private  authService :AuthService ,
private qualiteService: QualiteService) {}
  ngOnInit(): void {
    // Vérifier si un token est stocké dans localStorage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Décoder le token pour récupérer les informations utilisateur
        const decodedToken: any = jwtDecode(token);
        
        // Lier les informations de l'utilisateur au modèle currentUser
        this.currentUser = decodedToken;
        //this.currentUserRoles = this.currentUser.roles || [];  // Récupérer les rôles du token
  
        console.log('Utilisateur connecté (rechargement) :', this.currentUser);
       // console.log('Rôles de l’utilisateur (rechargement) :', this.currentUserRoles);
      } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
      }
    }
  }

  
  /* selectTab(tab: string) {
   
      this.selectedTab = tab;

      // Réinitialisation des sous-onglets et des rapports
      this.selectedSubTab = '';  // Réinitialiser le sous-onglet
      this.showRapport8D = false; // Réinitialiser l'affichage du rapport 8D
      this.showRapportNC = false; // Réinitialiser l'affichage du rapport NC
    
      // Mettre à jour la logique de sélection des sous-onglets si nécessaire
      if (tab === 'traitementNC') {
        this.selectedSubTab = '8D';  // Définir un sous-onglet par défaut pour 'traitementNC'
      }
  } */
      
  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }
  afficherInscription(){
    this.router.navigate(['/inscription'], {
      queryParams: { openModal: 'true' }
    });
    this.showModalInscription =true;
   // this.afficherRapport('NC');
  }
  afficherLogin(){
    this.router.navigate(['/login'], {
      queryParams: { openModal: 'true' }
    });
    this.showModalLogin=true;
   // this.afficherRapport('NC');
  }
  
  logout(): void {
    this.qualiteService.logoutFromServer().subscribe(
      () => {
        this.authService.logout();
        this.router.navigate(['/login']); // Rediriger vers la page de login après déconnexion
      },
      (error) => {
        console.error('Erreur lors de la déconnexion', error);
      }
    );
  }
  



}
