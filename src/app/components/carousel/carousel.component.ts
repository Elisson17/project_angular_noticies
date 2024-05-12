import { Component, OnInit } from '@angular/core';
import {
  NgbCarouselConfig,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { Article } from '../../models/articles';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgbCarouselModule, HttpClientModule, CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  providers: [NgbCarouselConfig],
})
export class CarouselComponent implements OnInit {
  images = [];
  articles: Article[] = [];
  TOKEN = environment.TOKEN_NEWS;

  constructor(config: NgbCarouselConfig, private http: HttpClient) {
    // customize default values of carousels used by this component tree
    config.interval = 5000;
    config.showNavigationIndicators = false;
  }

  ngOnInit() {
    this.http
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&sortBy=popularity&apiKey=${this.TOKEN}`
      )
      .subscribe((data: any) => {
        this.articles = data.articles.filter((article: { urlToImage: any; }) => article.urlToImage);
      });
  }
}
