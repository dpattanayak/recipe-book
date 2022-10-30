import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { HighlightDirective } from '../directives/highlight.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ShortenPipe } from './shorten.pipe';

@NgModule({
  declarations: [
    ShortenPipe,
    AlertComponent,
    DropdownDirective,
    HighlightDirective,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule],
  exports: [
    ShortenPipe,
    AlertComponent,
    DropdownDirective,
    HighlightDirective,
    LoadingSpinnerComponent,
    CommonModule,
  ],
})
export class SharedModule {}
