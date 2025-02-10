/* import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QualiteService } from '../qualite.service';
import { JwtResponse } from '../classes/jwtResponse';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isModalOpen: boolean = false;
  constructor(private qualiteService: QualiteService,private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.isModalOpen = params['openModal'] === 'true';
    });
  }
  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

    onLogin(): void {
      this.qualiteService.login(this.username, this.password).subscribe(
        (response: string | JwtResponse) => {
          console.log('Réponse du backend:', response);  // Log de la réponse complète
        
          // Vérifiez si la réponse est une erreur (type string)
          if (typeof response === 'string') {
            // Si la réponse est une chaîne (message d'erreur)
            this.errorMessage = response;
          } else {
            // Si la réponse est un objet JwtResponse
            if (response && response.token) {  // Modifié pour 'token' au lieu de 'jwt'
              // Sauvegarder le token dans le localStorage
              localStorage.setItem('token', response.token);  // Utiliser 'token' au lieu de 'jwt'
              console.log("JWT:", response.token);  // Affiche le JWT pour vérification
              // Redirection après succès
              this.router.navigate(['/admin']);
            } else {
              // Si le token n'est pas présent dans la réponse
              this.errorMessage = 'Erreur : Token non trouvé dans la réponse';
            }
          }
        },
        (error) => {
          // Gestion des erreurs
          console.error(error);  // Affiche l'erreur complète pour la débogage
          this.errorMessage = 'Nom d’utilisateur ou mot de passe invalide';
        }
      );
    } 
    
     /* onLogin(): void {
      this.qualiteService.login(this.username, this.password).subscribe(
        (response: string | { token: string }) => {
          if (typeof response === 'string') {
            // Si la réponse est un message d'erreur
            this.errorMessage = response;
          } else if (response.token) {
            // Sauvegarder le token dans le localStorage
            localStorage.setItem('token', response.token);
            console.log("JWT reçu :", response.token);
  
            // Décoder le token pour obtenir les rôles
            const decodedToken: any = jwtDecode(response.token);
  
            if (decodedToken && decodedToken.roles) {
              console.log("Rôles de l'utilisateur :", decodedToken.roles);
  
              // Redirection basée sur le rôle
              if (decodedToken.roles.includes('ROLE_ADMIN')) {
                this.router.navigate(['/admin']);
              } else if (decodedToken.roles.includes('RESPONSABLE_QUALITE')) {
                this.router.navigate(['/qualite']);
              } else {
                this.errorMessage = 'Rôle non autorisé';
              }
            } else {
              this.errorMessage = 'Erreur : Les rôles ne sont pas trouvés dans le token.';
            }
          }
        },
        (error) => {
          console.error(error); // Affiche l'erreur complète pour la débogage
          this.errorMessage = 'Nom d’utilisateur ou mot de passe invalide';
        }
      );
    }  */
      import { Component, OnInit } from '@angular/core';
      import { ActivatedRoute, Router } from '@angular/router';
      import { QualiteService } from '../qualite.service';
      import { jwtDecode } from 'jwt-decode'; // Import correct
import { Role } from '../classes/role';
import { AuthService } from '../auth.service';
      
      @Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
      })
      export class LoginComponent implements OnInit {
        username: string = '';
        password: string = '';
        errorMessage: string = '';
        isModalOpen: boolean = false;
      
        currentUser: any = null;
        currentUserRoles: string[] = [];
      
        constructor(private qualiteService: QualiteService, private route: ActivatedRoute, private router: Router, 
          private authService: AuthService
        ) {}
      
        ngOnInit(): void {
          this.route.queryParams.subscribe(params => {
            this.isModalOpen = params['openModal'] === 'true';
          });

          const token = localStorage.getItem('token');
          if (token) {
            try {
              const decodedToken: any = jwtDecode(token);
              this.currentUser = decodedToken;
              this.currentUserRoles = decodedToken.roles || [];
             
            } catch (error) {
              console.error('Erreur lors du décodage du token :', error);
            }
          }
        }
      
   
           /*  onLogin(): void {
              this.qualiteService.login(this.username, this.password).subscribe(
                (response: any) => {
                  // Vérification si la réponse contient un token
                  if (response && response.token) {
                    // Sauvegarder le token dans le localStorage pour l'utiliser lors de futures requêtes
                    localStorage.setItem('token', response.token);
            
                    try {
                      // Décodage du token JWT pour obtenir les données de l'utilisateur
                      const decodedToken: any = jwtDecode(response.token);
                      this.currentUser = decodedToken;
            
                      // Récupérer les rôles de l'utilisateur à partir du token (on suppose que les rôles sont dans "roles")
                      const userRoles = this.currentUser.roles || [];  // Si les rôles sont présents dans le token
                      console.log('Utilisateur connecté:', this.currentUser);
                      console.log('Rôles de l\'utilisateur :', userRoles);
            
                      // Vérifier les rôles et naviguer vers la route appropriée
                      if (userRoles.includes('ROLE_ADMIN')) {
                        this.router.navigate(['/admin']);  // Rediriger vers la page admin si rôle "ROLE_ADMIN"
                      } else if (
                        userRoles.includes('RESPONSABLE_QUALITE') ||
                        userRoles.includes('RESPONSABLE_PRODUCTION') ||
                        userRoles.includes('RESPONSABLE_INDUSTRIEL') ||
                        userRoles.includes('RESPONSABLE_LOGISTIQUE')
                      ) {
                        this.router.navigate(['/qualite']);  // Rediriger vers la page qualité si rôle "RESPONSABLE_QUALITE"
                      } else {
                        this.errorMessage = 'Rôle non autorisé';  // Si le rôle n'est pas autorisé, afficher une erreur
                      }
                    } catch (error) {
                      // Si le token est malformé ou une erreur se produit lors du décodage
                      this.errorMessage = 'Erreur lors du décodage du token';
                      console.error(error);
                    }
                  } else {
                    // Si aucun token n'est présent dans la réponse, afficher une erreur
                    this.errorMessage = 'Erreur : Token non trouvé dans la réponse';
                  }
                },
                (error) => {
                  // Gestion des erreurs côté backend (mauvais nom d'utilisateur ou mot de passe)
                  console.error(error);
                  this.errorMessage = 'Nom d’utilisateur ou mot de passe invalide';
                }
              );
            } */
              onLogin(): void {
                this.qualiteService.login(this.username, this.password).subscribe(
                  (response: any) => {
                    if (response && response.token) {
                      localStorage.setItem('token', response.token);
                      try {
                        const decodedToken: any = jwtDecode(response.token);
                        this.currentUser = decodedToken;
              
                        const userRoles = this.currentUser.roles || [];
                        const userId = this.currentUser.userId;  // Vérifiez que l'ID est bien présent
              
                        console.log('Utilisateur connecté:', this.currentUser);
                        console.log('Rôles de l’utilisateur :', userRoles);
                        console.log("id de l’utilisateur", userId);  // Affichez l'ID
              
                        // Vérifiez ici si l'ID est bien récupéré
                        if (userId) {
                          console.log("ID récupéré correctement:", userId);
                        } else {
                          console.error("L'ID est manquant dans le token");
                        }
              
                        // Transmettez les données utilisateur via queryParams
                        if (userRoles.includes('ROLE_ADMIN')) {
                          this.router.navigate(['/admin'], { queryParams: { user: JSON.stringify(this.currentUser) } });
                          this.router.navigate(['/qualite'], { queryParams: { user: JSON.stringify(this.currentUser) } });
                        } else if (
                          userRoles.includes('RESPONSABLE_QUALITE') ||
                          userRoles.includes('RESPONSABLE_PRODUCTION') ||
                          userRoles.includes('RESPONSABLE_INDUSTRIEL') ||
                          userRoles.includes('RESPONSABLE_LOGISTIQUE')
                        ) {
                          this.router.navigate(['/qualite'], { queryParams: { user: JSON.stringify(this.currentUser) } });
                        } else {
                          this.errorMessage = 'Rôle non autorisé';
                        }
                      } catch (error) {
                        this.errorMessage = 'Erreur lors du décodage du token';
                        console.error(error);
                      }
                    } else {
                      this.errorMessage = 'Erreur : Token non trouvé dans la réponse';
                    }
                  },
                  (error) => {
                    console.error(error);
                    this.errorMessage = 'Nom d’utilisateur ou mot de passe invalide';
                  }
                );
              }
             
               
            
          
        openModal(): void {
          this.isModalOpen = true;
        }
      
        closeModal(): void {
          this.isModalOpen = false;
        }
      }
      
      
 