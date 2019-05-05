import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { environment } from '../../../environments/environment';

@Directive({
  selector: 'img[appImageLoader]',
})
export class ImageLoaderDirective {
  @Input() defaultSrc: string;
  private readonly el: HTMLElement;

  @HostListener('error') onError() {
    this.renderer.setAttribute(this.el, 'src', this.defaultSrc || environment.defaultImage);
  }

  constructor(el: ElementRef, private renderer: Renderer2) {
    this.el = el.nativeElement;
  }
}
