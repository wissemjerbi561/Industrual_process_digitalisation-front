import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QualiteService } from '../qualite.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-qualite',
  templateUrl: './qualite.component.html',
  styleUrls: ['./qualite.component.css']
})
export class QualiteComponent implements OnInit {
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
  user: any = null;
  creerRapport8d: boolean = false;
  ouvrirRapport8d : boolean = false;
  modifierRapport8d : boolean = false;
  supprimerRapport8d : boolean = false;// ou true selon votre logique
   // Permissions pour les rapports NC
   creerRapportNc: boolean = false;
   ouvrirRapportNc: boolean = false;
   modifierRapportNc: boolean = false;
   supprimerRapportNc: boolean = false;
   
   // Permissions pour les rapports de signalisation
   creerRapportSignalisation: boolean = false;
   ouvrirRapportSignalisation: boolean = false;
   modifierRapportSignalisation: boolean = false;
   supprimerRapportSignalisation: boolean = false;
   
   // Permissions pour les rapports internes
   creerRapportNcInterne: boolean = false;
   ouvrirRapportInterne: boolean = false;
   modifierRapportInterne: boolean = false;
   supprimerRapportInterne: boolean = false;
   
   // Permissions pour les rapports d'audit NC
   creerRapportNcAudit: boolean = false;
   ouvrirRapportNcAudit: boolean = false;
   modifierRapportNcAudit: boolean = false;
   supprimerRapportNcAudit: boolean = false;
   
   // Autres permissions
   voirPlansActions: boolean = false;
   gestionPlansActions: boolean = false;
   suiviDemandesClients: boolean = false;
   suiviDerogationsClients: boolean = false;
   suiviReponsesAuxReclamations: boolean = false;
   alerteReclamations: boolean = false;
   alerteDemandes: boolean = false;
   afficherKPI: boolean = false;
   approuverRapports: boolean = false;
   gestionApprobation: boolean = false;
   gestionUtilisateurs: boolean = false;
  userPermissions: { [key: string]: boolean } = {};
  constructor(private router: Router,private route: ActivatedRoute,
    private qualiteService: QualiteService,
    private cdr: ChangeDetectorRef) {}
  

ngOnInit(): void {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      this.user = jwtDecode(token);
      console.log('Utilisateur décodé à partir du token :', this.user);

      if (this.user && this.user.userId) {
        this.fetchUserPermissions(this.user.userId);
      } else {
        console.error('ID utilisateur manquant dans le token.');
      }
    } catch (error) {
      console.error('Erreur lors du décodage du token :', error);
    }
  } else {
    console.warn('Token non trouvé dans le localStorage.');
  }
 /*  this.route.queryParams.subscribe(params => {
    if (params['user']) {
      try {
        this.user = JSON.parse(params['user']); // Décoder les données utilisateur
        console.log('Utilisateur connecté reçu dans QualiteComponent :', this.user);
      } catch (error) {
        console.error('Erreur lors du parsing de l’utilisateur :', error);
      }
    }
  });
  console.log("IDUSER",this.user.userId); */
 /*  this.route.queryParams.subscribe(params => {
    if (params['user']) {
      try {
        this.user = JSON.parse(params['user']);
        console.log('Utilisateur connecté reçu dans QualiteComponent :', this.user);

        if (this.user && this.user.userId) {
          this.qualiteService.getUserPermissionsById(this.user.userId).subscribe(
            permissions => {
              this.userPermissions = permissions;
              console.log('Permissions de l’utilisateur :', this.userPermissions);

              // Mettre à jour la propriété et forcer la détection des changements
              this.creerRapport8d = this.userPermissions['creerRapport8d'];
              this.cdr.detectChanges(); // Forcer la détection des changements
            },
            error => {
              console.error('Erreur lors de la récupération des permissions :', error);
            }
          );
        }
      } catch (error) {
        console.error('Erreur lors du parsing de l’utilisateur :', error);
      }
    }
  });
  this.creerRapport8d=this.userPermissions['creerRapport8d']; */
  this.route.queryParams.subscribe(params => {
    if (params['user']) {
      try {
        this.user = JSON.parse(params['user']);
        console.log('Utilisateur connecté reçu dans QualiteComponent :', this.user);

        if (this.user && this.user.userId) {
          this.qualiteService.getUserPermissionsById(this.user.userId).subscribe(
            permissions => {
              this.userPermissions = permissions;
              console.log('Permissions de l’utilisateur :', this.userPermissions);

              this.creerRapport8d = this.userPermissions['creerRapport8d'] || false;
              this.cdr.detectChanges();
            },
            error => {
              console.error('Erreur lors de la récupération des permissions :', error);
            }
          );
        } else {
          console.error('L’utilisateur ou son userId est manquant :', this.user);
        }
      } catch (error) {
        console.error('Erreur lors du parsing de l’utilisateur :', error);
      }
    } else {
      console.warn('Aucun paramètre utilisateur trouvé dans les queryParams.');
    }
  });
  

  if (this.user && this.user.userId) {
    this.fetchUserPermissions(this.user.userId);
  }
}
selectTab(tab: string) {
  console.log('Sélection de l\'onglet principal:', tab); 
  this.selectedTab = tab;
  this.showRapport8D = false; // Réinitialise l'affichage du rapport quand on change d'onglet
this.showRapportNC=false;
this.showRapportSignalisation=false;
}

selectedRapport: string | null = null;

afficherRapport(type: string) {
  this.selectedRapport = type;
}
selectedSuiviQualiteSubTab: string = 'planAction'; // Sous-onglet actif par défaut
    suiviQualiteSubTabs = [
      { id: 'planAction', label: "Plan d'action" },
      { id: 'demandesDerogations', label: 'Demandes / Dérogations Client' },
      { id: 'reclamations', label: 'Réclamations' },
      { id: 'alertes', label: 'Alertes' }
    ];
selectSubTab(subTab: string) {
  this.selectedSubTab = subTab;
}
afficherRapportNC() {
  // this.showRapportNC = true; // Affiche le rapport lorsqu'on clique sur le bouton
  this.router.navigate(['/creation-rapport-nc'], {
   queryParams: { openModal: 'true' }
 });
 this.showRapportNC =true;
 this.afficherRapport('NC');
 }
 /* afficherRapport8D() {
   this.showRapport8D = true; // Affiche le rapport lorsqu'on clique sur le bouton
 } */
 afficherRapport8D() {
  this.creerRapport8d=this.userPermissions['creerRapport8d'];
   this.router.navigate(['/rapport8d'], {
     queryParams: { openModal: 'true' }
   });
   this.showRapport8D =true;
   this.afficherRapport('8D');
 }
 afficherRapportSignalisation() {
   this.router.navigate(['/rapportSignalisation'], {
     queryParams: { openModal: 'true' }
   });
   this.showRapportSignalisation =true;
   this.afficherRapport('Signalisation');
 }
 afficherRapportNcInterne() {
   this.router.navigate(['/rapportNcInterne'], {
     queryParams: { openModal: 'true' }
   });
   this.showRapportNcInterne=true;
   this.afficherRapport('NCInterne');
 }
 afficherRapportAudit() {
   this.router.navigate(['/rapportAudit'], {
     queryParams: { openModal: 'true' }
   });
   this.showRapportAudit=true;
   this.afficherRapport('Audit');
 }

/*
 voirPlansAction() {
   console.log('Voir les Plans d\'action');
   // Ajoutez ici la logique ou la navigation correspondante
 }
 
 gererPlansAction() {
   console.log('Gestion des Plans d\'action');
   // Ajoutez ici la logique ou la navigation correspondante
 }
 
 voirDemandesClients() {
   console.log('Demandes clients');
   // Ajoutez ici la logique ou la navigation correspondante
 }
 
 voirDerogationsClients() {
   console.log('Dérogations clients');
   // Ajoutez ici la logique ou la navigation correspondante
 }
 
 voirReponsesReclamations() {
   console.log('Réponses aux réclamations');
   // Ajoutez ici la logique ou la navigation correspondante
 }
  
 voirReclamations() {
   console.log('Réclamations');
   // Ajoutez ici la logique ou la navigation correspondante
 }
 
 voirDemandes() {
   console.log('Demandes');
   // Ajoutez ici la logique ou la navigation correspondante
 } */
 

 selectSuiviQualiteSubTab(tabId: string): void {
   this.selectedSuiviQualiteSubTab = tabId;
 }

 voirPlansAction(): void {
   console.log('Navigation vers Plans d’action');
   // Ajouter la logique de navigation ou d'affichage ici
 }

 gererPlansAction(): void {
   console.log('Gestion des Plans d’action');
   // Ajouter la logique de gestion ici
 }

 voirDemandesClients(): void {
   console.log('Affichage des Demandes clients');
 }

 voirDerogationsClients(): void {
   console.log('Affichage des Dérogations clients');
 }

 voirReponsesReclamations(): void {
   console.log('Affichage des Réponses aux réclamations');
 }

 voirReclamations(): void {
   console.log('Affichage des Réclamations');
 }

 voirDemandes(): void {
   console.log('Affichage des Demandes');
 }
/////////////////////////////////////tableau de board
selectTableauBordSubTab(tabId: string): void {
 this.selectedTableauBordSubTab = tabId;
}

// Méthode pour voir les KPI
voirKPI(): void {
 console.log('Affichage des KPI');
 // Ajoutez ici la logique pour afficher les KPI ou naviguer vers une page correspondante
}

// Méthode pour approuver un rapport
approuverRapport(): void {
 console.log('Approbation d’un rapport');
 // Ajoutez ici la logique pour approuver un rapport
}

// Méthode pour gérer les approbations
gestionApprobations(): void {
 console.log('Gestion des approbations');
 // Ajoutez ici la logique pour gérer les approbations ou naviguer vers une page correspondante
}
private fetchUserPermissions(userId: number): void {
  this.qualiteService.getUserPermissionsById(userId).subscribe(
    permissions => {
      this.userPermissions = permissions;
      console.log('Permissions de l’utilisateur :', this.userPermissions);

      // Permissions pour le rapport 8D
      this.creerRapport8d = this.userPermissions['creerRapport8d'] || false;
      this.ouvrirRapport8d = this.userPermissions['ouvrirRapport8d'] || false;
      this.modifierRapport8d = this.userPermissions['modifierRapport8d'] || false;
      this.supprimerRapport8d = this.userPermissions['supprimerRapport8d'] || false;

      // Permissions pour les rapports NC
      this.creerRapportNc = this.userPermissions['creerRapportNc'] || false;
      this.ouvrirRapportNc = this.userPermissions['ouvrirRapportNc'] || false;
      this.modifierRapportNc = this.userPermissions['modifierRapportNc'] || false;
      this.supprimerRapportNc = this.userPermissions['supprimerRapportNc'] || false;

      // Permissions pour les rapports de signalisation
      this.creerRapportSignalisation = this.userPermissions['creerRapportSignalisation'] || false;
      this.ouvrirRapportSignalisation = this.userPermissions['ouvrirRapportSignalisation'] || false;
      this.modifierRapportSignalisation = this.userPermissions['modifierRapportSignalisation'] || false;
      this.supprimerRapportSignalisation = this.userPermissions['supprimerRapportSignalisation'] || false;

      // Permissions pour les rapports internes
      this.creerRapportNcInterne = this.userPermissions['creerRapportNcInterne'] || false;
      this.ouvrirRapportInterne = this.userPermissions['ouvrirRapportInterne'] || false;
      this.modifierRapportInterne = this.userPermissions['modifierRapportInterne'] || false;
      this.supprimerRapportInterne = this.userPermissions['supprimerRapportInterne'] || false;

      // Permissions pour les rapports d'audit NC
      this.creerRapportNcAudit = this.userPermissions['creerRapportNcAudit'] || false;
      this.ouvrirRapportNcAudit = this.userPermissions['ouvrirRapportNcAudit'] || false;
      this.modifierRapportNcAudit = this.userPermissions['modifierRapportNcAudit'] || false;
      this.supprimerRapportNcAudit = this.userPermissions['supprimerRapportNcAudit'] || false;

      // Autres permissions
      this.voirPlansActions = this.userPermissions['voirPlansActions'] || false;
      this.gestionPlansActions = this.userPermissions['gestionPlansActions'] || false;
      this.suiviDemandesClients = this.userPermissions['suiviDemandesClients'] || false;
      this.suiviDerogationsClients = this.userPermissions['suiviDerogationsClients'] || false;
      this.suiviReponsesAuxReclamations = this.userPermissions['suiviReponsesAuxReclamations'] || false;
      this.alerteReclamations = this.userPermissions['alerteReclamations'] || false;
      this.alerteDemandes = this.userPermissions['alerteDemandes'] || false;
      this.afficherKPI = this.userPermissions['afficherKPI'] || false;
      this.gestionUtilisateurs = this.userPermissions['gestionUtilisateurs'] || false;
      this.approuverRapports = this.userPermissions['approuverRapport'] || false;
      this.gestionApprobation = this.userPermissions['gestionApprobations'] || false;

      // Détecter les changements pour mettre à jour la vue
      this.cdr.detectChanges();
    },
    error => {
      console.error('Erreur lors de la récupération des permissions :', error);
    }
  );
}


}
