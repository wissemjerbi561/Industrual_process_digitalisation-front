import { Role } from './role';

export class User {
  id?: number;
  username!: string; // Nom d'utilisateur obligatoire
  password!: string; // Mot de passe obligatoire
  roles: Role[] = []; // Initialisé comme un tableau vide
  approved: boolean = false; // Par défaut à false
  
  // Permissions pour les rapports 8d
  creerRapport8d: boolean = false;
  ouvrirRapport8d: boolean = false;
  modifierRapport8d: boolean = false;
  supprimerRapport8d: boolean = false;
  
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
  approuverRapport: boolean = false;
  gestionApprobations: boolean = false;
  gestionUtilisateurs: boolean = false;
  newUsername?: string; // Propriété temporaire pour le nom d'utilisateur
  newPassword?: string;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
