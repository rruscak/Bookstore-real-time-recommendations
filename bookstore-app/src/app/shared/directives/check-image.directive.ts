import { Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { environment } from '../../../environments/environment';

@Directive({
  selector: '[dCheckImage]'
})
export class CheckImageDirective implements OnDestroy {

  @Input('fallbackSrc') imgSrc: string;
  private readonly el: HTMLElement;
  private isApplied = false;
  private EVENT_TYPE = 'error';

  constructor(el: ElementRef, private renderer: Renderer2) {
    this.el = el.nativeElement;
    this.el.addEventListener(this.EVENT_TYPE, this.onError.bind(this));
  }

  private onError() {
    this.removeEvents();

    if (!this.isApplied) {
      this.isApplied = true;
      // this.el.setAttribute('src', environment.defaultImage);
      this.renderer.setAttribute(this.el, 'src', this.imgSrc || environment.defaultImage);
    }
  }

  private removeEvents() {
    this.el.removeEventListener(this.EVENT_TYPE, this.onError);
  }

  ngOnDestroy() {
    this.removeEvents();
  }
}
