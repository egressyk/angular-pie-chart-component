import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  data = [{
    label: 'cica asdjhfgsdhjkvf dsf sdfasdf sd',
    value: 12,
    color: '#7ed321'
  }, {
    label: 'kutya',
    value: 25,
    color: '#0497bb'
  }, {
    label: 'szar',
    value: 50,
    color: '#7a7a7a'
  }]
}
