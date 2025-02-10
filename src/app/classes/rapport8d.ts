export class Rapport8D {
    identifiePar: string = '';
    codeCable: string = '';
    qtTotale: number = 0;
    dateOuverture: Date = new Date();
    origine: string = '';
    noOrdre: number = 0;
    qtEchantillon: number = 0;
    dateReclamation: Date = new Date();
    type: string = '';
    operateur: string = '';
    qtNC: number = 0;
    dateProduction: Date = new Date();
    pilote: string = '';
    equipe: string[] = [];
    descriptionNC: string = '';
    codesDefauts: string[] = [];
    lien: string = '';
    actionImmediat: string = '';
    responsable: string = '';
    realise: boolean = false;
    productionEnCours: boolean = false;
    noOrdreProduction: number = 0;
    codesSimilaires: string[] = [];
  }