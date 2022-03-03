import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }

constructor(private elRef: ElementRef) {}
// add css class to element it sits on, once it is clicked'
// remove once clicked again
// the method listens to clicks and toggles propertiy that terminies if css class is attached or not
// try to attach css class dynamically
}