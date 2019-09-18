import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    this.db.collection('points').stateChanges(['added']).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { ...data };
      }))
    ).subscribe(this.change);
  }

  change  = (item) => {
    if (item.length > 1) {
      this.ctx.clearRect(0, 0, 800, 600);
      return;
    }
    this.ctx.fillRect(item[0].x, item[0].y, 5, 5);
  }

  reset() {
    this.ctx.clearRect(0, 0, 800, 600);
    this.db.collection('points').get().subscribe(res => {
      res.forEach((doc) => {
        this.db.collection('points').doc(doc.id).delete();
      });
    });
  }
}
