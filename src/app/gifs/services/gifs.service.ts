import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Gif[] = [];

  private apiKey: string = 'apikeyhere';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private _tagsHistory: string[] = [];

  constructor(private http: HttpClient) {}

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);

    // if (this._tagsHistory.length >= 11) {
    //   this._tagsHistory.pop();
    // }

    this._tagsHistory = this._tagsHistory.slice(0, 10);
  }

  searchTag(newTag: string): void {
    if (newTag.length === 0) return;

    this.organizeHistory(newTag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', newTag);

    //* Observable
    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((httpResponse) => {
        this.gifList = httpResponse.data;
        console.log({ gifs: this.gifList });
      });
  }
}