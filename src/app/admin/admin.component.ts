import { Component, OnInit } from '@angular/core';
import { QualiteService } from '../qualite.service';
import { User } from '../classes/user';
import { Role } from '../classes/role';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: (User & { selectedRole: number | null })[] = [];
  roles: Role[] = []; 
  selectedRole: number = 0;
  showUsersList: boolean = false;
  showCreateUser: boolean = false;
  showUserSettings: boolean = false;
  
  selectedUser: User | null = null; // Utilisateur sélectionné pour les permissions
  showPermissionsModal: boolean = false;
   // Liste des rôles récupérés depuis la base de données
  username: string = ''; // Nom d'utilisateur saisi par l'admin
  password: string = ''; // Mot de passe saisi par l'admin
  selectedRoleId: number | null = null; // ID du rôle sélectionné
  message: string = ''; // Message de succès ou d'erreur
  showEditUserModal = false;
  
  newUser: User = {
    id: 0,
    username: '',
    password: '',
    approved: false,
    roles: [],
    
    // Permissions pour les rapports 8d
    creerRapport8d: false,
    ouvrirRapport8d: false,
    modifierRapport8d: false,
    supprimerRapport8d: false,
    
    // Permissions pour les rapports NC
    creerRapportNc: false,
    ouvrirRapportNc: false,
    modifierRapportNc: false,
    supprimerRapportNc: false,
    
    // Permissions pour les rapports de signalisation
    creerRapportSignalisation: false,
    ouvrirRapportSignalisation: false,
    modifierRapportSignalisation: false,
    supprimerRapportSignalisation: false,
    
    // Permissions pour les rapports internes
    creerRapportNcInterne: false,
    ouvrirRapportInterne: false,
    modifierRapportInterne: false,
    supprimerRapportInterne: false,
    
    // Permissions pour les rapports d'audit NC
    creerRapportNcAudit: false,
    ouvrirRapportNcAudit: false,
    modifierRapportNcAudit: false,
    supprimerRapportNcAudit: false,
    
    // Autres permissions
    voirPlansActions: false,
    gestionPlansActions: false,
    suiviDemandesClients: false,
    suiviDerogationsClients: false,
    suiviReponsesAuxReclamations: false,
    alerteReclamations: false,
    alerteDemandes: false,
    afficherKPI: false,
    approuverRapport: false,
    gestionApprobations: false,
    gestionUtilisateurs: false,
    
  };
  //////////////////
  currentUserRoles: string[] = [];
  constructor(private qualiteService: QualiteService,private route: ActivatedRoute,
     private router: Router 
    ,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();

    //////
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Décoder le token pour obtenir les rôles
        const decodedToken: any = jwtDecode(token);
        // Initialiser currentUserRoles avec les rôles de l'utilisateur
        this.currentUserRoles = decodedToken.roles || [];
      } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
      }
    }
  }
  

 /*  loadUsers() {
    this.qualiteService.getUsers().subscribe((data) => {
      this.users = data;
      console.log("users",this.users)
    });
  }

  loadRoles() {
    this.qualiteService.getRoles().subscribe((data) => {
      this.roles = data;
      
    });
  } */
  /* approveUser(userId: number, selectedRole: number): void {
    if (!selectedRole) {
      console.error("No role selected for user");
      return;
    }
  
    this.qualiteService.approveUser(userId, selectedRole).subscribe(
      response => {
        console.log('User approved and role assigned successfully', response);
      },
      error => {
        console.error('Error approving user and assigning role', error);
      }
    );
  }
   */
 /*  approveUser(userId: number | undefined, selectedRole: number | undefined): void {
    if (!userId || !selectedRole) {
      console.error("User ID or selected role is missing.");
      return;
    }
  
    this.qualiteService.approveUser(userId, selectedRole).subscribe(
      response => {
        console.log('User approved and role assigned successfully', response);
      },
      error => {
        console.error('Error approving user and assigning role', error);
      }
    );
  } */
    loadUsers() {
      this.qualiteService.getUsers().subscribe((data) => {
        console.log("Données récupérées depuis l'API :", data); // Vérifier les données reçues
        this.users = data.map(user => ({ ...user, selectedRole: null }));
        console.log("Liste des utilisateurs après mise à jour :", this.users);
        this.cdr.detectChanges(); // Forcer la détection des changements si nécessaire
      });
    }

  loadRoles() {
    this.qualiteService.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  approveUser(userId: number | undefined, selectedRole: number | null): void {
    if (!userId || selectedRole === null) {
      console.error("User ID or selected role is missing.");
      return;
    }

    this.qualiteService.approveUser(userId, selectedRole).subscribe(
      response => {
        console.log('User approved and role assigned successfully', response);
        // Mettre à jour l'état "approved" si nécessaire
        const user = this.users.find(u => u.id === userId);
        if (user) {
          user.approved = true; // Marquer l'utilisateur comme approuvé
        }
      },
      error => {
        console.error('Error approving user and assigning role', error);
      }
    );
  }
  createAndApproveUser() {
    if (!this.newUser.username || !this.newUser.password || !this.selectedRoleId) {
      console.error('Veuillez fournir un nom, un mot de passe et un rôle.');
      return;
    }
  
    this.qualiteService.createAndApproveUser(this.newUser.username, this.newUser.password, this.selectedRoleId)
      .subscribe({
        next: (response) => {
          console.log('Utilisateur créé avec succès :', response);
          this.loadUsers(); // Recharger immédiatement la liste
          this.resetForm(); // Réinitialiser le formulaire
        },
        error: (error) => {
          console.error('Erreur lors de la création de l\'utilisateur :', error);
        },
      });
  }
  
  // Réinitialiser les champs du formulaire
  private resetForm(): void {
    this.username = '';
    this.password = '';
    this.selectedRoleId = null;
  }
  openPermissionsModal(user: User): void {
    this.selectedUser = { ...user }; // Faire une copie pour éviter de modifier directement les données
    this.showPermissionsModal = true;
  }

  closePermissionsModal(): void {
    this.showPermissionsModal = false;
    this.selectedUser = null;
  }

  submitPermissions(): void {
    if (this.selectedUser) {
      this.qualiteService.updatePermissions(this.selectedUser.id!, {
        creerRapport8d: this.selectedUser.creerRapport8d,
        ouvrirRapport8d: this.selectedUser.ouvrirRapport8d,
        modifierRapport8d: this.selectedUser.modifierRapport8d,
        supprimerRapport8d: this.selectedUser.supprimerRapport8d,
        creerRapportNc: this.selectedUser.creerRapportNc,
        ouvrirRapportNc: this.selectedUser.ouvrirRapportNc,
        modifierRapportNc: this.selectedUser.modifierRapportNc,
        supprimerRapportNc: this.selectedUser.supprimerRapportNc,
        creerRapportSignalisation: this.selectedUser.creerRapportSignalisation,
        ouvrirRapportSignalisation: this.selectedUser.ouvrirRapportSignalisation,
        modifierRapportSignalisation: this.selectedUser.modifierRapportSignalisation,
        supprimerRapportSignalisation: this.selectedUser.supprimerRapportSignalisation,
        creerRapportNcInterne: this.selectedUser.creerRapportNcInterne,
        ouvrirRapportInterne: this.selectedUser.ouvrirRapportInterne,
        modifierRapportInterne: this.selectedUser.modifierRapportInterne,
        supprimerRapportInterne: this.selectedUser.supprimerRapportInterne,
        creerRapportNcAudit: this.selectedUser.creerRapportNcAudit,
        ouvrirRapportNcAudit: this.selectedUser.ouvrirRapportNcAudit,
        modifierRapportNcAudit: this.selectedUser.modifierRapportNcAudit,
        supprimerRapportNcAudit: this.selectedUser.supprimerRapportNcAudit,
        voirPlansActions: this.selectedUser.voirPlansActions,
        gestionPlansActions: this.selectedUser.gestionPlansActions,
        suiviDemandesClients: this.selectedUser.suiviDemandesClients,
        suiviDerogationsClients: this.selectedUser.suiviDerogationsClients,
        suiviReponsesAuxReclamations: this.selectedUser.suiviReponsesAuxReclamations,
        alerteReclamations: this.selectedUser.alerteReclamations,
        alerteDemandes: this.selectedUser.alerteDemandes,
        afficherKPI: this.selectedUser.afficherKPI,
        approuverRapport: this.selectedUser.approuverRapport,
        gestionApprobations: this.selectedUser.gestionApprobations,
        gestionUtilisateurs: this.selectedUser.gestionUtilisateurs
      }).subscribe({
        next: () => {
          console.log('Permissions mises à jour avec succès');
          this.loadUsers(); // Recharger la liste des utilisateurs
          this.closePermissionsModal(); // Fermer le modal
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour des permissions :', err);
        },
      });
    }
  }
  /////////////////////
  openEditUserModal(user: User) {
    this.selectedUser = { ...user, newUsername: '', newPassword: '' };
    this.showEditUserModal = true;
  }

  // Fermer le modal de modification
  closeEditUserModal() {
    this.showEditUserModal = false;
    this.selectedUser = null;
  }

  // Soumettre la modification de l'utilisateur (mise à jour des identifiants)
/*   submitEditUser() {
    if (this.selectedUser && this.selectedUser.newUsername && this.selectedUser.newPassword) {
      // Appel du service pour mettre à jour les identifiants
      this.qualiteService.updateUserCredentials(
        
        this.selectedUser.id!,
        this.selectedUser.newUsername, 
        this.selectedUser.newPassword
      ).subscribe(
        (response) => {
          console.log('Utilisateur modifié avec succès', response);
          alert('Utilisateur modifié avec succès');
          this.loadUsers(); // Recharger la liste des utilisateurs
          this.closeEditUserModal(); // Fermer le modal
        },
        (error) => {
          console.error('Erreur lors de la modification de l\'utilisateur', error);
          alert('Erreur lors de la modification de l\'utilisateur');
        }
      );
    } else {
      alert('Veuillez remplir tous les champs.');
    }
} */
    submitEditUser() {
      if (this.selectedUser?.newUsername && this.selectedUser?.newPassword) {
        this.qualiteService.updateUserCredentials(
          this.selectedUser.id!,
          this.selectedUser.newUsername,
          this.selectedUser.newPassword
        ).subscribe(
          (response) => {
            console.log('Utilisateur modifié avec succès', response);
            //alert('Utilisateur modifié avec succès');
            this.loadUsers(); 
            this.closeEditUserModal();
          },
          (error) => {
            console.error('Erreur lors de la modification de l\'utilisateur', error);
            if (error.status === 400) {
              alert('Erreur : ' + error.error); // Afficher le message d'erreur renvoyé par le serveur
            } else {
              alert('Erreur lors de la modification de l\'utilisateur');
            }
          }
        );
      } else {
        alert('Veuillez remplir tous les champs.');
      }
    }
    
}
