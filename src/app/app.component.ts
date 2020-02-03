import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  data = [{
    label: 'Megfelelet státuszban',
    value: 12,
    color: '#7ed321'
  }, {
    label: 'Folyamatban státuszban',
    value: 25,
    color: '#0497bb'
  }, {
    label: 'Nem indított státuszban',
    value: 50,
    color: '#7a7a7a'
  }]
}
