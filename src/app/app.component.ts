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

  constructor(private http: HttpClient,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.http.get<string>('/api').subscribe(res => this.toastr.info(res));
  }

  create() {
    this.http.post('/api/player', { id: this.playerId, size: { x: this.sizeX, y: this.sizeY }})
      .subscribe(
        data => this.toastr.success('Player created'),
        error => this.toastr.error(error)
      );
  }
}
