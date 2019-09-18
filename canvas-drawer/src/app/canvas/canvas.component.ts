import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseFirestore } from '@angular/fire';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.less']
})
export class CanvasComponent implements OnInit {
  items: Observable<any[]>;
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private firstTime = false;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.fillStyle = 'red';
    if (!this.firstTime) {
      this.db.collection('points').valueChanges(['added']).subscribe(this.change);
      this.firstTime = true;
    }
  }

  change = (items) => {
    items.forEach((item: any) => {
      this.ctx.fillRect(item.x, item.y, 5, 5);
    });
  }

  reset() {
    this.db.collection('points').doc().delete();
  }
}
