import React, { useEffect, useRef } from "react"
import { IStdProps } from "sz-react-support"
import { math, Func1, MixedNumber, DSNumber } from "tdscore"
import "tdscore/lib/ext"
import { Martix, Vector2 } from "tdscore/lib/math";
import Transformation2 from "tdscore/lib/math/martix/Transformation2";
const SUPPORT_GRAPH_REDUNDANCY_RATE = 10000;
const DEFAULT_SCALE_RATIO = 100;
const DEFAULT_SPEICAL_POINTS: Point[] = [];
const DEFAULT_FUNCTIONS: Fn[] = [];
const DEFAULT_VECTORS: Vector2Info[] = [];
export interface Vector2Info {
    style?: string;
    vector: Vector2;
    name?: string;
    fontStyle?: string;
}
export interface Props extends IStdProps {
    fns?: Fn[];
    width?: string;
    height?: string;
    scaleRatio?: number;
    specialPoints?: Point[];
    vectors?: (Vector2 | Vector2Info)[];
    transformation?: Martix
    grid?: boolean;
    mark?: string;
    dx?: number;
}
export interface Fn {
    name: string;
    f: Func1<number, number>;
}
export interface Point {
    pointName: string;
    x: MixedNumber;
    y: MixedNumber;
}
const PLAIN_TRANSOFRMATION = new Transformation2(1, 0, 0, 1);
export default function (props: Props) {

    const scaleRatio = props.scaleRatio ?? DEFAULT_SCALE_RATIO;
    const specialPoints = props.specialPoints ?? DEFAULT_SPEICAL_POINTS;
    const transformation = props.transformation ?? PLAIN_TRANSOFRMATION;
    const dx = props.dx ?? 1 / scaleRatio;
    const fns = props.fns ?? DEFAULT_FUNCTIONS;
    const vectors = props.vectors ?? DEFAULT_VECTORS;

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const ctx = new Mapping2DContextWrapper(canvasRef.current, scaleRatio, transformation);
        ctx.clear();
        ctx.drawLocationSystem();
        if (props.grid) {
            ctx.drawGrid();
        }

        ctx.drawSpeicalPoints(specialPoints);
        ctx.drawVectors(vectors);
        ctx.drawFunctions(dx, fns);

    }, [props]);

    return <canvas
        width={props.width ?? "200px"}
        height={props.height ?? "200px"}
        // style={{ backgroundColor: "yellowgreen" }}
        ref={canvasRef}>
    </canvas>
}

class Mapping2DContextWrapper {
    private readonly ctx: CanvasRenderingContext2D;
    readonly scaleRatio: number;
    readonly realWidth: number;
    readonly realHeight: number;
    readonly transformation: Martix;
    readonly minX: number;
    readonly maxX: number;
    readonly minY: number;
    readonly maxY: number;

    private readonly vw: number;
    private readonly vh: number;

    private readonly rOriginX: number;
    private readonly rOriginY: number;

    constructor(canvas: HTMLCanvasElement, scale: number, t: Martix) {
        this.ctx = canvas.getContext("2d")!;
        this.transformation = t;
        this.scaleRatio = scale * 1.0;
        this.vw = canvas.width / this.scaleRatio;
        this.vh = canvas.height / this.scaleRatio;
        this.rOriginX = canvas.width / 2;
        this.rOriginY = canvas.height / 2;
        this.maxX = this.vw / 2.0;
        this.maxY = this.vh / 2.0;
        this.minX = -this.maxX;
        this.minY = -this.maxY;
        this.realHeight = canvas.height;
        this.realWidth = canvas.width;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.realWidth, this.realHeight);
    }

    stroke() {
        this.ctx.stroke();
    }

    map(vx: number, vy: number): [number, number] {
        const v = new Vector2(vx, vy);
        //@ts-expect-error
        const transformed = v.transform(this.transformation);
        return [
            this.rOriginX + transformed.x * this.scaleRatio,
            this.rOriginY + -transformed.y * this.scaleRatio
        ]
    }

    fillText(text: string, x: number, y: number) {
        this.ctx.fillText(text, ...this.map(x, y))
    }

    moveTo(x: number, y: number): void {
        this.ctx.moveTo(...this.map(x, y));
    }

    lineTo(x: number, y: number): void {
        this.ctx.lineTo(...this.map(x, y));
    }
    fillRect(x: number, y: number, w: number, h: number): void {
        this.ctx.fillRect(...this.map(x, y), w * this.scaleRatio, h * this.scaleRatio);
    }

    get font(): string {
        return this.ctx.font;
    }

    set font(value: string) {
        this.ctx.font = value;
    }

    get textBaseline(): CanvasTextBaseline {
        return this.ctx.textBaseline;
    }

    set textBaseline(value: CanvasTextBaseline) {
        this.ctx.textBaseline = value;
    }

    beginPath(): void {
        this.ctx.beginPath();
    }

    get strokeStyle(): string | CanvasGradient | CanvasPattern {
        return this.ctx.strokeStyle;
    }

    set strokeStyle(value: string | CanvasGradient | CanvasPattern) {
        this.ctx.strokeStyle = value;
    }

    get fillStyle(): string | CanvasGradient | CanvasPattern {
        return this.ctx.fillStyle;
    }

    set fillStyle(value: string | CanvasGradient | CanvasPattern) {
        this.ctx.fillStyle = value;
    }

    drawLocationSystem() {
        const { strokeStyle, textBaseline } = this;
        this.strokeStyle = "#ff00ff"
        this.textBaseline = "top"

        this.beginPath();
        this.moveTo(this.minX * SUPPORT_GRAPH_REDUNDANCY_RATE, 0);
        this.lineTo(this.maxX * SUPPORT_GRAPH_REDUNDANCY_RATE, 0);
        this.moveTo(0, this.minY * SUPPORT_GRAPH_REDUNDANCY_RATE);
        this.lineTo(0, this.maxY * SUPPORT_GRAPH_REDUNDANCY_RATE);
        this.stroke();

        this.ctx.strokeStyle = strokeStyle;
        this.ctx.textBaseline = textBaseline;
    }

    drawGrid() {
        this.beginPath();
        //竖线
        for (let i = Number.parseInt(this.minX.toFixed(0)); i < this.maxX * 10; i++) {
            if (Math.abs(i) < 1) {
                continue;
            }
            this.moveTo(i, this.maxY * SUPPORT_GRAPH_REDUNDANCY_RATE);
            this.lineTo(i, this.minY * SUPPORT_GRAPH_REDUNDANCY_RATE);

        }
        //横线
        for (let i = Number.parseInt(this.minY.toFixed(0)); i < this.maxY * 10; i++) {
            if (Math.abs(i) < 1) {
                continue;
            }
            this.moveTo(this.minX * SUPPORT_GRAPH_REDUNDANCY_RATE, i);
            this.lineTo(this.maxX * SUPPORT_GRAPH_REDUNDANCY_RATE, i);
        }
        this.stroke();
    }
    drawVectors(vectors: (Vector2Info | Vector2)[]): void {
        vectors.forEach(v => {
            this.beginPath();
            //@ts-ignore
            if (v.x !== undefined && v.y !== undefined) {
                const oldStyle = this.strokeStyle;
                this.strokeStyle = "green"
                this.moveTo(0, 0);
                //@ts-ignore
                this.lineTo(v.x, v.y);
                this.stroke();
                this.strokeStyle = oldStyle;
            } else {
                const { strokeStyle: oldCtxStyle, font: oldFont } = this;
                //@ts-ignore
                this.strokeStyle = v.style ?? oldCtxStyle;
                //@ts-ignore
                this.font = v.fontStyle ?? oldFont;

                this.moveTo(0, 0);
                //@ts-ignore
                this.lineTo(v.vector.x, v.vector.y);
                this.stroke();
                //@ts-ignore
                v.name && this.fillText(v.name, v.vector.x, v.vector.y);

                this.strokeStyle = oldCtxStyle;
                this.font = oldFont;
            }

        });
    }
    drawFunctions(dx: number, fns: Fn[]): void {
        const { font, textBaseline, fillStyle } = this;
        this.font = "25px Arial";
        this.fillStyle = "red"
        this.textBaseline = "top"

        let x = this.minX;
        const perFrame = 100;
        const f = () => {
            for (let i = 0; i < perFrame; i++) {
                fns.forEach(fn => {
                    const y = fn.f(x + dx * i);
                    this.fillRect(x + dx * i, y, 1 / this.scaleRatio, 1 / this.scaleRatio);
                });
            }
            x += dx * perFrame;
            if (x < this.maxX) {
                requestAnimationFrame(f);
            }
        };
        f();

        this.font = font;
        this.textBaseline = textBaseline;
        this.fillStyle = fillStyle;
    }
    drawSpeicalPoints(points: Point[]) {
        const { font, textBaseline, fillStyle } = this;
        this.font = "25px Arial";
        this.fillStyle = "green"
        this.textBaseline = "top"
        points.forEach(p => {
            this.fillRect(DSNumber.valueOf(p.x).toJSNumber(), DSNumber.valueOf(p.y).toJSNumber(), 3 / this.scaleRatio, 3 / this.scaleRatio);
            this.fillText(p.pointName, DSNumber.valueOf(p.x).toJSNumber(), DSNumber.valueOf(p.y).toJSNumber());
        });
        this.font = font;
        this.textBaseline = textBaseline;
        this.fillStyle = fillStyle;
    }

}
function getMappingContext(canvas: HTMLCanvasElement,
    scaleRatio: number, t: Martix):
    Mapping2DContextWrapper {
    return new Mapping2DContextWrapper(canvas, scaleRatio, t);
}