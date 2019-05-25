import { Injectable } from '@angular/core';
import { StarRatingConfigService } from 'angular-star-rating';

@Injectable()
export class CustomStarRatingConfigService extends StarRatingConfigService {

  constructor() {
    super();
    this.starType = 'svg';
    this.staticColor = 'ok';
  }
}
