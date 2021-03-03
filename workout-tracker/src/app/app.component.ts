import { Component, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as data from './shared/data.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'workout-tracker';
  excercises;
  constructor(private http: HttpClient) {
    this.excercises = data.excercises;

  }
  onSubmit(f: NgForm, array, index) {

    let gewicht = f.value.gewicht;
    let wiederholungen = f.value.wiederholungen;
    array[index].gewicht = gewicht;
    array[index].wiederholungen = wiederholungen;

    console.log(this.excercises);
  }
  onClear() {
    this.excercises = data.excercises;
  }
  getData() {
    this.http.get('https://jan-trainingsplan-default-rtdb.firebaseio.com/data.json').subscribe(antwort => {
      this.excercises = antwort;
    })
  }
  saveData() {
    this.http.put('https://jan-trainingsplan-default-rtdb.firebaseio.com/data.json', this.excercises).subscribe(antwort => {
      console.log(antwort);
    });
  }
  onResetItem(array, index){
    array[index].gewicht = "";
    array[index].wiederholungen = "";
  }
}
