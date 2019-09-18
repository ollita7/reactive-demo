import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { switchMap, takeUntil, pairwise, distinctUntilChanged, map, throttle } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

type Point = {
  x: number,
  y: number
}

@Component({
  selector: 'app-canvas-emitter',
  templateUrl: './canvas-emitter.component.html',
  styleUrls: ['./canvas-emitter.component.scss']
})
export class CanvasEmitterComponent implements AfterViewInit {

  @ViewChild("canvas", { static: false }) public canvas: ElementRef;

  public width = 800;

  public height = 600;

  private cx: CanvasRenderingContext2D;

  constructor(private db: AngularFirestore) { 
    this.sendToFirebase.bind(this);
  }

  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext("2d");
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = "round";
    this.cx.strokeStyle = "#000";

    this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    fromEvent(canvasEl, "mousedown")
      .pipe(
        switchMap(e => {
          return fromEvent(canvasEl, "mousemove")
            .pipe(
              takeUntil(fromEvent(canvasEl, "mouseup")),
              takeUntil(fromEvent(canvasEl, "mouseleave"))
            )
        })
      )
      //.pipe(throttle(event => interval(50)))
      .pipe(map((event: MouseEvent) => ({ x: event.clientX, y: event.clientY })))
      .subscribe((pos: Point) => {
        const rect = canvasEl.getBoundingClientRect();
        console.log(pos);
        this.sendToFirebase(pos);
        this.cx.fillRect(pos.x, pos.y, 5, 5);
        // send to firebase
      })
  }

  private sendToFirebase(pos: Point){
    this.db.collection("points").add(pos);
  }
}
