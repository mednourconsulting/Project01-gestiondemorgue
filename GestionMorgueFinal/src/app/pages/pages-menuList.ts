import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_ADMIN: NbMenuItem[] = [
  {
    title: 'Tableau de Bord',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Bulletins',
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
    link: '/pages/users/',
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
      {
        title: 'Déconnection',
        link: '/auth/logout',
      },
    ],
  },
];
export const MENU_ITEMS_USERS: NbMenuItem[] = [
  {
    title: 'Tableau de Bord',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Bulletins',
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
      {
        title: 'Déconnection',
        link: '/auth/logout',
      },
    ],
  },
];
