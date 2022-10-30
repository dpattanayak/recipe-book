import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[ngHighlight]',
})
export class HighlightDirective implements OnInit {
  @Input() default: string = 'transparent';
  @Input() color: string = 'greenyellow';

  @HostBinding('style.backgroundColor') backgroundColor: string;
  @HostBinding('style.padding') padding: string = '5px';
  @HostBinding('style.borderRadius') borderRadius: string = '5px';
  @HostBinding('style.fontWeight') fontWeight: string = '400';
  @HostBinding('style.cursor') cursor: string = 'default';

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // this.renderer.addClass(this.elRef.nativeElement, 'highlight'); // highlight class in style.css
    this.backgroundColor = this.color;
    this.padding = '5px';
    this.borderRadius = '5px';
  }

  @HostListener('mouseover') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'font-weight', '700');
    this.fontWeight = '700';
    this.cursor = 'pointer';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'font-weight', '400');
    this.fontWeight = '400';
    this.cursor = 'default';
  }
}
