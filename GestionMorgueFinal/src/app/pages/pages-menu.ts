/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import {NbMenuItem} from '@nebular/theme';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class PagesMenu {

  getMenu(): Observable<NbMenuItem[]> {
    const menu = [
      {
        title: 'Tableau de Bord',
        icon: 'home-outline',
        link: '/pages/dashboard',
      },
      {
        title: 'Généralités',
         icon: 'layout-outline',
        children: [
          {
            title: 'Bulletins',
            link: '/pages/bulletins-dm/Bulletins',
          },
          {
            title: 'Décédés',
            link: '/pages/bulletins-dm/decedes',
          },
          {
            title: 'Cause de décès',
            link: '/pages/bulletins-dm/cause-deces',
          },
          {
            title: 'Médecins',
            link: '/pages/bulletins-dm/medcins',
          },
        ],
      },
      {
        title: 'Documents administratifs',
        icon: 'text-outline',
        children: [
          {
            title: 'Certificat médico-légal',
            link: '/pages/documents-admin/medicolegal',
          },
          {
            title: 'Certificat de constatation',
            link: '/pages/documents-admin/constation',
          },
          {
            title: 'Attestation de décès',
            link: '/pages/documents-admin/attestation',
          },
        ],
      },
      {
        title: 'Certificats',
        icon: 'edit-2-outline',
        children: [
          {
            title: 'Transfert du corps',
            link: '/pages/certificats/transfertCorps',
          },
          {
            title: 'Aperçu du corps',
            link: '/pages/certificats/ApercuDuCorp',
          },
          {
            title: 'Enterrement',
            link: '/pages/certificats/enterrement',
          },
        ],
      },
      {
        title: 'Statistiques',
        icon: 'pie-chart-outline',
        children: [
          /* {
              title: 'Décès des nouveaux nés',
              link: '/pages/statistiques/NouveauxNes',
            },*/
          {
            title: 'Décès des enfants (1j à 30j)',
            link: '/pages/statistiques/DecesEnfants',
          },
          {
            title: 'Selon la nature de décès',
            link: '/pages/statistiques/NatureDeces',
          },
          {
            title: 'Selon les causes de décès',
            link: '/pages/statistiques/seloncausesDeces',
          },
          {
            title: 'Selon le sexe de décèdé ',
            link: '/pages/statistiques/sexeDeces',
          },
          {
            title: 'Selon la région',
            link: '/pages/statistiques/region',
          },
        ],
      },
      {
        title: 'Utilisateurs',
        icon: 'people-outline',
        link: '/pages/users',
      },
      {
        title: 'Paramètres',
        icon: 'settings-outline',
        /* title: 'Authentification',
         icon: 'lock-outline',*/
        children: [
          {
            title: 'Ajouter un nouveau utilisateur',
            link: '/auth/register',
          },
          {
            title: 'Réinitialiser le mot de passe',
            link: '/auth/reset-password',
          },
        ],
      },
    ];
    return of([...menu]);
  }

  getMenuUser(): Observable<NbMenuItem[]> {
    const menu = [
      {
        title: 'Tableau de Bord',
        icon: 'home-outline',
        link: '/pages/dashboard',
      },
      {
        title: 'Généralités',
        /*de décès et de mortinalité*/
        icon: 'layout-outline',
        children: [
          {
            title: 'Bulletins',
            link: '/pages/bulletins-dm/Bulletins',
          },
          {
            title: 'Décédés',
            link: '/pages/bulletins-dm/decedes',
          },
          {
            title: 'Cause de décès',
            link: '/pages/bulletins-dm/cause-deces',
          },
          {
            title: 'Médecins',
            link: '/pages/bulletins-dm/medcins',
          },
        ],
      },
      {
        title: 'Documents administratifs',
        icon: 'text-outline',
        children: [
          {
            title: 'Certificat médico-légal',
            link: '/pages/documents-admin/medicolegal',
          },
          {
            title: 'Certificat de constation',
            link: '/pages/documents-admin/constation',
          },
          {
            title: 'Attestation de décès',
            link: '/pages/documents-admin/attestation',
          },
        ],
      },
      {
        title: 'Certificats',
        icon: 'edit-2-outline',
        children: [
          {
            title: 'Transfert du corps',
            link: '/pages/certificats/transfertCorps',
          },
          {
            title: 'Aperçu du corps',
            link: '/pages/certificats/ApercuDuCorp',
          },
          {
            title: 'Enterrement',
            link: '/pages/certificats/enterrement',
          },
        ],
      },
      {
        title: 'Statistiques',
        icon: 'pie-chart-outline',
        children: [
          /* {
              title: 'Décès des nouveaux nés',
              link: '/pages/statistiques/NouveauxNes',
            },*/
          {
            title: 'Décès des enfants (1j à 30j)',
            link: '/pages/statistiques/DecesEnfants',
          },
          {
            title: 'Selon la nature de décès',
            link: '/pages/statistiques/NatureDeces',
          },
          {
            title: 'Selon les causes de décès',
            link: '/pages/statistiques/seloncausesDeces',
          },
          {
            title: 'Selon le sexe de décèdé ',
            link: '/pages/statistiques/sexeDeces',
          },
          {
            title: 'Selon la région',
            link: '/pages/statistiques/region',
          },
        ],
      },
      {
        title: 'Paramètres',
        icon: 'settings-outline',
        children: [
          {
            title: 'Réinitialiser le mot de passe',
            link: '/auth/reset-password',
          },
        ],
      },
    ];

    return of([...menu]);
  }
}
