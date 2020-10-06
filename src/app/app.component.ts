import { Component } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  playerId: any;
  sizeX: any;
  sizeY: any;

  constructor(private http: HttpClient,
              private toastr: ToastrService) {
  }

  create() {
    this.http.post('locahost:8080/player', { id: this.playerId, size: { x: this.sizeX, y: this.sizeY }})
      .subscribe(
        data => this.toastr.success('Player created'),
        error => this.toastr.error(error)
      );
  }
}
