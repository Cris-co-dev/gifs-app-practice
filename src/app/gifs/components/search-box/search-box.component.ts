import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      placeholder="Buscar gifs...."
      class="form-control"
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
  `,
  styleUrl: './search-box.component.css',
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  // searchTag(newTag: string) {
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    console.log({ newTag });
  }
}
