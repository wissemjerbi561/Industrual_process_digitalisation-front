import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from './classes/user';
import { Role } from './classes/role';
import { JwtResponse } from './classes/jwtResponse';
import { LoginRequest } from './classes/loginRequest';
@Injectable({
  providedIn: 'root'
})
export class QualiteService {
  private baseUrl = 'http://localhost:8087';

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer la liste des rôles
  getRoles(): Observable<Role[]> {
    const url = `${this.baseUrl}/roles/allRoles`;
    return this.http.get<Role[]>(url);
  }

   /**
 * Enregistrer un utilisateur sans fournir de rôle.
 * @param user - Les informations de l'utilisateur à enregistrer.
 * @returns Observable<string> - Message de succès ou d'échec.
 */
 
  registerUser(user: User): Observable<string> {
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post(url, user, { responseType: 'text' });  // Spécifier 'text' comme type de réponse
  }
  // Dans votre service Angular
getUsers() {
return this.http.get<User[]>('http://localhost:8087/admin/users');
}

/*getRoles() {
return this.http.get<Role[]>('http://localhost:8080/roles');
}*/

approveUser(userId: number, roleId: number) {
return this.http.post<string>(`http://localhost:8087/admin/approve?userId=${userId}&roleId=${roleId}`, {});

}

/**
 * Authentifie l'utilisateur et récupère un token JWT.
 * @param username - Nom d'utilisateur
 * @param password - Mot de passe
 * @returns Observable<JwtResponse | string> - Le token JWT ou un message d'erreur
 */

login(username: string, password: string): Observable<JwtResponse | string> {
  const url = `${this.baseUrl}/auth/login`;
  const loginRequest: LoginRequest = { username, password };
  return this.http.post<JwtResponse>(url, loginRequest);  // Ici, la réponse attendue est de type JwtResponse
}


 /**
   * Crée et approuve un utilisateur avec un rôle
   * @param username Le nom d'utilisateur
   * @param password Le mot de passe
   * @param roleId L'ID du rôle à assigner
   * @returns Un Observable contenant la réponse de l'API
   */
/*  createAndApproveUser(username: string, password: string, roleId: number): Observable<string> {
  const url = `${this.baseUrl}/createAndApproveUser`; // URL de l'API
  const token = localStorage.getItem('token'); // Récupérer le jeton JWT depuis le stockage local (ou tout autre endroit)

  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${token}` // Ajouter le jeton d'accès dans l'en-tête
  });

  // Préparer les paramètres sous forme d'encodage URL
  const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&roleId=${roleId}`;

  // Effectuer la requête POST
  return this.http.post<string>(url, body, { headers });
} */
  createAndApproveUser(username: string, password: string, roleId: number): Observable<string> {
    const url = `${this.baseUrl}/admin/createAndApproveUser?username=${username}&password=${password}&roleId=${roleId}`;
    
    return this.http.post(url, {}, { responseType: 'text' }); // Spécifier 'text' comme type de réponse
  }

  updatePermissions(
    userId: number,
    permissions: {
      creerRapport8d: boolean;
      ouvrirRapport8d: boolean;
      modifierRapport8d: boolean;
      supprimerRapport8d: boolean;
      creerRapportNc: boolean;
      ouvrirRapportNc: boolean;
      modifierRapportNc: boolean;
      supprimerRapportNc: boolean;
      creerRapportSignalisation: boolean;
      ouvrirRapportSignalisation: boolean;
      modifierRapportSignalisation: boolean;
      supprimerRapportSignalisation: boolean;
      creerRapportNcInterne: boolean;
      ouvrirRapportInterne: boolean;
      modifierRapportInterne: boolean;
      supprimerRapportInterne: boolean;
      creerRapportNcAudit: boolean;
      ouvrirRapportNcAudit: boolean;
      modifierRapportNcAudit: boolean;
      supprimerRapportNcAudit: boolean;
      voirPlansActions: boolean;
      gestionPlansActions: boolean;
      suiviDemandesClients: boolean;
      suiviDerogationsClients: boolean;
      suiviReponsesAuxReclamations: boolean;
      alerteReclamations: boolean;
      alerteDemandes: boolean;
      afficherKPI: boolean;
      approuverRapport: boolean;
      gestionApprobations: boolean;
      gestionUtilisateurs: boolean;
    }
  ): Observable<any> {
    const url = `${this.baseUrl}/admin/${userId}/permissions`;
  
    // Envoi de la requête PUT avec le corps (permissions)
    return this.http.put(url, permissions, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
  

  /**
   * Récupère les permissions d'un utilisateur par son ID.
   * @param userId L'ID de l'utilisateur
   * @returns Observable contenant les permissions
   */
  getUserPermissionsById(userId: number): Observable<{ [key: string]: boolean }> {
    return this.http.get<{ [key: string]: boolean }>(`${this.baseUrl}/auth/${userId}/Recupererpermissions`);
  }


  logoutFromServer(): Observable<any> {
    const url = `${this.baseUrl}/auth/logout`; // Supposons que l'API de logout soit accessible ici
    return this.http.post(url, {}, { responseType: 'text' });
  }
  
  updateUserCredentials(userId: number, newUsername: string, newPassword: string): Observable<string> {
    const url = `${this.baseUrl}/admin/${userId}/update-credentials`; // URL de l'API
    const body = { newUsername, newPassword }; // Le corps de la requête contient les nouveaux identifiants
  
    return this.http.put<string>(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json' // Ajoutez cette ligne pour forcer la réponse en texte brut
    });
  }
}
