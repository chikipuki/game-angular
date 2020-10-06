import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  playerId: any;
  sizeX: any;
  sizeY: any;
  position: any = { finished: '?', x: '?', y: '?' };
  route: any = '?';
  players: [];

  constructor(private http: HttpClient,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.http.get<string>('/api').subscribe(res => this.toastr.info(res));
    this.getPlayers();
  }

  delete() {
    this.http.delete(`/api/${this.playerId}`)
      .subscribe(
        data => this.toastr.success('Player deleted'),
        error => {
          this.toastr.error(error.error.message, error.error.status);
        }
      );
  }

  create() {
    this.http.post('/api/player', { id: this.playerId, size: { x: this.sizeX, y: this.sizeY }})
      .subscribe(
        data => this.toastr.success('Player created'),
        error => {
          this.toastr.error(error.error.message, error.error.status);
        }
      );
  }

  move(direction: string) {
    this.http.patch<any>(`/api/${this.playerId}/move?direction=${direction}`, null)
      .subscribe(
        data => this.toastr.success(data.success + ''),
        error => {
          this.toastr.error(error.error.message, error.error.status);
        }
      );
  }

  requestPosition() {
    this.http.get<any>(`/api/${this.playerId}/position`)
      .subscribe(
        res => this.position = res,
        error => {
          this.toastr.error(error.error.message, error.error.status);
        }
      );
  }

  requestRoute() {
    this.http.get<any>(`/api/${this.playerId}/route`)
      .subscribe(
        res => this.route = res,
        error => {
          this.toastr.error(error.error.message, error.error.status);
        }
      );
  }

  getPlayers() {
    this.http.get<any>(`/api/players`)
      .subscribe(
        res => this.players = res.players,
        error => {
          this.toastr.error(error.error.message, error.error.status);
        }
      );
  }
}
