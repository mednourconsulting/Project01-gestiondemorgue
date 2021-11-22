/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'ngx-validation-message',
    styleUrls: ['./validation-message.component.scss'],
    template: `
      <div class="erreurs-container">
             <p class="caption status-danger"
                *ngIf="showMinLength"> La taille minimum  du champ "{{ label }}" est {{ minLength }} caractères </p>
             <p class="caption status-danger"
                *ngIf="showMaxLength"> La taille maximum du champ  "{{ label }}" est {{ maxLength }} caractères </p>
             <p class="caption status-danger"  *ngIf="number">
               Le champ "{{ label }}" n'accepte que les nombres </p>
             <p class="caption status-danger" *ngIf="showPattern"> Incorrect "{{ label }}" </p>
             <p class="caption status-danger" *ngIf="showRequired"> Le champ "{{ label }}" est obligatoire</p>
             <p class="caption status-danger" *ngIf="ar">Le champs "{{ label }}" n'accepte que les lettre en arabe, les espaces et les nombres</p>
             <p class="caption status-danger" *ngIf="addressAr">Le champ "{{ label }}" n'accepte que les lettre en arabe,
                 les espaces et les nombres, et les caractères suivantes ° et ,</p>
             <p class="caption status-danger" *ngIf="fr">Le champ "{{ label }}" n'accepte que les lettre en français, les espaces et
               les nombres</p>
             <p class="caption status-danger" *ngIf="addressFr">Le champ "{{ label }}" n'accepte que les lettre en français, les espaces et
               les nombres, et les caractères suivantes ° et ,</p>
             <p class="caption status-danger" *ngIf="showMin">La valeur minimale qu'accepte  ce champ est {{ min }}</p>
             <p class="caption status-danger" *ngIf="showMax">La valeur maximum  qu'accepte  ce champ est {{ max }}</p>
             <p class="caption status-danger" *ngIf="heurePattern">Merci de respecter la forme de l'heure (HH:mm PM/AM)</p>
             <p class="caption status-danger" *ngIf="showConfirmPassword">Les mots de passe que vous avez entrés ne sont pas identiques.</p>
             <p class="caption status-danger" *ngIf="showInvalid">Le {{label}} que vous avez saisi n'existe pas.</p>
      </div>
  `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxValidationMessageComponent),
            multi: true,
        },
    ],
})
export class NgxValidationMessageComponent {
    @Input()
    label: string = '';

    @Input()
    showRequired?: boolean;

    @Input()
    ar?: boolean;

    @Input()
    fr?: boolean;

    @Input()
    addressFr?: boolean;

    @Input()
    addressAr?: boolean;

    @Input()
    number?: boolean;

    @Input()
    min?: number;

    @Input()
    showMin?: boolean;

    @Input()
    max?: number;

    @Input()
    showMax: boolean;

    @Input()
    minLength?: number;

    @Input()
    showMinLength?: boolean;

    @Input()
    maxLength?: number;

    @Input()
    showMaxLength?: boolean;

    @Input()
    showPattern?: boolean;

    @Input()
    heurePattern?: boolean;

    @Input()
    showConfirmPassword: boolean;

    @Input()
    showInvalid: boolean;

}
