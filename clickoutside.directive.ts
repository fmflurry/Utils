import { Directive, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
    const isElementClicked = this.elementRef.nativeElement.contains(targetElement);
    if (!isElementClicked) {
      this.clickOutside.emit();
    }
  }

}
