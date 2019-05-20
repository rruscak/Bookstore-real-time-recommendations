import { NgModule } from '@angular/core';
import {
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatStepperModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { ImageLoaderDirective } from './shared/directives/image-loader.directive';

@NgModule({
  declarations: [
    ImageLoaderDirective
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    MatStepperModule,
    MatRippleModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatTooltipModule,
    ImageLoaderDirective
  ]
})
export class AngularMaterialModule {
}
