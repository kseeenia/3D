class Graph3DComponent extends Component {
    constructor(options) {
        super(options);
        document.querySelector(`#${this.id}`).oncontextmenu = function () {
            return false;
        };
        this.WINDOW = {
            LEFT: -5,
            BOTTOM: -5,
            WIDTH: 10,
            HEIGHT: 10,
            CENTER: new Point(0, 0, -30),
            CAMERA: new Point(0, 0, -50),

        };
        this.sur = new Surfaces();
        // cube() sphere() parabolicCylinder() oneSheetHyperboloid() hyperbolicParaboloid() hyperbolicCylinder() ellipticalParaboloid() ellipticalCylinder() ellipsoid() cone() twoSheetHyperboloid()
        this.subjects = [this.sur.sphere()]; 

        this.canRotate = false;
        this.dx = 0;
        this.dy = 0;
        this.checkMouseBtn = 0;
        this.graph3D = new Graph3D({
            WINDOW: this.WINDOW
        });


        this.graph2D = new Graph({
            id: 'canvas3D',
            WINDOW: this.WINDOW,
            callbacks: {
                wheel: (e) => this.wheel(e),
                mouseup: () => this.mouseup(),
                mousedown: (e) => this.mousedown(e),
                mouseleave: () => this.mouseleave(),
                mousemove: (e) => this.mousemove(e),
            }
        });
        this.LIGHT = new Light(-40, 2, 0, 50000);
        this.paintPoints = true;
        this.paintEdges = true;
        this.paintPolygones = true;
        this.printScene();
    }

    wheel(e) {
        const delta = (e.wheelDelta > 0) ? 1.1 : 0.9;
        this.graph2D.clear();
        this.subjects.forEach(subject => {
            for (let i = 0; i < subject.points.length; i++) {
                const point = subject.points[i];
                this.graph3D.zoom(delta, point);
            }
            this.printScene();
        });
    }

    mouseup() {
        this.canRotate = false;
    }
    mouseleave() {
        this.canRotate = false;
    }
    mousedown(e) {
        this.canRotate = true;
        this.checkMouseBtn = e.which;
        this.dx = e.offsetX;
        this.dy = e.offsetY;
    }
    mousemove(e) {
        if (this.canRotate) {
            const gradus = Math.PI * 2 / 3600;
            this.subjects.forEach(subject => {
                if (this.checkMouseBtn == 1) {
                    subject.points.forEach(point => {
                        this.graph3D.rotateOy((this.dx - e.offsetX) * gradus, point);
                        this.graph3D.rotateOx((this.dy - e.offsetY) * gradus, point);
                    });
                } else if (this.checkMouseBtn == 3) {
                    subject.points.forEach(point => this.graph3D.rotateOz((this.dy - e.offsetY) * gradus, point));
                }
            });
            this.dx = e.offsetX;
            this.dy = e.offsetY;
            this.printScene();
        }
    }

    keydown(e) {
        this.graph2D.clear();
        switch (e.which) {
            case 38: // Передвигаем объект вверх
                this.subjects.forEach(subject => {
                    for (let i = 0; i < subject.points.length; i++) {
                        const point = subject.points[i];
                        this.graph3D.move(0, 1, 0, point);
                    }
                });
                break;
            case 40: // Передвигаем объект вниз
                this.subjects.forEach(subject => {
                    for (let i = 0; i < subject.points.length; i++) {
                        const point = subject.points[i];
                        this.graph3D.move(0, -1, 0, point);
                    }
                });
                break;
            case 37: // Передвигаем объект влево
                this.subjects.forEach(subject => {
                    for (let i = 0; i < subject.points.length; i++) {
                        const point = subject.points[i];
                        this.graph3D.move(-1, 0, 0, point);
                    }
                });
                break;
            case 39: // Передвигаем объект вправо
                this.subjects.forEach(subject => {
                    for (let i = 0; i < subject.points.length; i++) {
                        const point = subject.points[i];
                        this.graph3D.move(1, 0, 0, point);
                    }
                });
                break;
        }
        this.printScene();
    }

    clear() {
        this.graph2D.clear();
    }

    printSubject(subject) {
        // Рисуем все полигоны
        if (this.paintPolygones) {
            this.graph3D.calcDistance(subject, this.WINDOW.CAMERA, 'distance');
            this.graph3D.calcDistance(subject, this.LIGHT, 'lumen');
            this.graph3D.sortByArtistAlgorithm(subject);
            for (let i = 0; i < subject.polygones.length; i++) {
                const polygon = subject.polygones[i];
                const points = polygon.points;
                let array = [];
                for (let j = 0; j < points.length; j++) {
                    array.push({
                        x: this.graph3D.xs(subject.points[points[j]]),
                        y: this.graph3D.ys(subject.points[points[j]])
                    });
                }
                // Освещение
                const lumen = this.graph3D.calcIllumination(polygon.lumen, this.LIGHT.lumen);
                let {
                    r,
                    g,
                    b
                } = polygon.color;
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                this.graph2D.polygon(array, polygon.rgbToHex(r, g, b));
                array = [];
            }
        }
        // Рисуем не все полигоны
        // this.graph3D.calcDistance(subject, this.WINDOW.CAMERA, 'distance');
        // this.graph3D.calcDistance(subject, this.LIGHT, 'lumen');
        // this.graph3D.sortByArtistAlgorithm(subject);
        // const vect = this.graph3D.makeVector(this.WINDOW.CAMERA, this.WINDOW.CENTER); // Вектор от камеры до центра координат
        // for (let i = 0; i < subject.polygones.length; i++) {
        //     const polygon = subject.polygones[i];
        //     const points = polygon.points;
        //     let array = [];
        //     const normVect = this.graph3D.findNormalVector(subject, points[0], points[1], points[2]);
        //     const cos = (vect[0] * normVect[0] + vect[1] * normVect[1] + vect[2] * normVect[2]) / Math.sqrt(vect[0] ** 2 + vect[1] ** 2 + vect[2] ** 2) / Math.sqrt(normVect[0] ** 2 + normVect[1] ** 2 + normVect[2] ** 2);
        //     if (cos > -0.9) {
        //         for (let j = 0; j < points.length; j++) {
        //             array.push({
        //                 x: this.graph3D.xs(subject.points[points[j]]),
        //                 y: this.graph3D.ys(subject.points[points[j]])
        //             });
        //         }
        //         // * Освещение *
        //         const lumen = this.graph3D.calcIllumination(polygon.lumen, this.LIGHT.lumen); // !
        //         let {
        //             r,
        //             g,
        //             b
        //         } = polygon.color;
        //         r = Math.round(r * lumen);
        //         g = Math.round(g * lumen);
        //         b = Math.round(b * lumen);
        //         this.graph2D.polygon(array, polygon.rgbToHex(r, g, b));
        //         array = [];
        //     }
        // }

        //  Рисуем ребра 
        if (this.paintEdges) {
            for (let i = 0; i < subject.edges.length; i++) {
                const edge = subject.edges[i];
                const p1 = subject.points[edge.p1];
                const p2 = subject.points[edge.p2];
                this.graph2D.line(this.graph3D.xs(p1), this.graph3D.ys(p1), this.graph3D.xs(p2), this.graph3D.ys(p2));
            }
        }

        //  Рисуем точки 
        if (this.paintPoints) {
            for (let i = 0; i < subject.points.length; i++) {
                const point = subject.points[i];
                this.graph2D.point(this.graph3D.xs(point), this.graph3D.ys(point), 1);
            }
        }
    }


    printScene() {
        this.clear();
        this.subjects.forEach(subject => {
            this.printSubject(subject);
        });
    }


    addEventListeners() {
        document.getElementById(this.id).setAttribute('tabindex', "0");
        document.addEventListener('keydown', (e) => {
            this.keydown(e);
        });
        document.getElementById('paint__points').addEventListener('change', () => {
            this.paintPoints = document.getElementById('paint__points').checked;
            this.printScene();
        });
        document.getElementById('paint__edges').addEventListener('change', () => {
            this.paintEdges = document.getElementById('paint__edges').checked;
            this.printScene();
        });
        document.getElementById('paint__polygones').addEventListener('change', () => {
            this.paintPolygones = document.getElementById('paint__polygones').checked;
            this.printScene();
        });
    }

}