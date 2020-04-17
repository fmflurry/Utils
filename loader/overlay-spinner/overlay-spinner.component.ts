import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overlay-spinner',
  templateUrl: './overlay-spinner.component.html',
  styleUrls: ['./overlay-spinner.component.scss']
})
export class OverlaySpinnerComponent {
  @Input() showSpinner: boolean;
}
