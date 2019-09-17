import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { switchMap, takeUntil, pairwise, distinctUntilChanged, map, throttle } from 'rxjs/operators';

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

  @Input() public width = 400;

  @Input() public height = 400;

  private cx: CanvasRenderingContext2D;

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
      .pipe(throttle(event => interval(50)))
      .pipe(map((event: MouseEvent) => ({ x: event.clientX, y: event.clientY })))
      .subscribe((pos: Point) => {
        const rect = canvasEl.getBoundingClientRect();
        console.log(pos);
        // send to firebase
      })
  }
}
