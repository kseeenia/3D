Surfaces.prototype.twoSheetHyperboloid = (x0 = 0, y0 = 0, z0 = 0, size = 4, a = 1, b = 1, countRing = 27, countPoints = 27) => {
    const points = [];
    const edges = [];
    const polygones = [];
    const deltaY = size / (countRing - 1);
    const deltaZ = 2 * Math.PI / countPoints;
    for (let i = -size / 2; i <= 0; i += deltaY) {
        const y = y0 + b * Math.cosh(i);
        for (let j = -Math.PI; j <= Math.PI; j += deltaZ) {
            const x = x0 + a * Math.sinh(i) * Math.sin(j);
            const z = z0 + a * Math.sinh(i) * Math.cos(j);
            points.push(new Point(x, y, z));
        }
    }
    for (let i = 0; i <= size / 2; i += deltaY) {
        const y = y0 - b * Math.cosh(i);
        for (let j = -Math.PI; j <= Math.PI; j += deltaZ) {
            const x = x0 + a * Math.sinh(i) * Math.sin(j);
            const z = z0 + a * Math.sinh(i) * Math.cos(j);
            points.push(new Point(x, y, z));
        }
    }

    if (countPoints % 2 == 0) {
        for (let i = 0; i < points.length / 2 - 1; i++) {
            if (points[i].y == points[i + 1].y) {
                edges.push(new Edge(i, i + 1));
            }
            if (i + 1 + countPoints < points.length / 2) {
                edges.push(new Edge(i, i + countPoints + 1));
            }
            if (i + countPoints + 2 < points.length / 2) {
                polygones.push(new Polygon([i, i + 1, i + countPoints + 2, i + countPoints + 1]));
            }
        }
        for (let i = points.length / 2; i < points.length - 1; i++) {
            if (points[i].y == points[i + 1].y) {
                edges.push(new Edge(i, i + 1));
            }
            if (i + 1 + countPoints < points.length) {
                edges.push(new Edge(i, i + countPoints + 1));
            }
            if (i + countPoints + 2 < points.length) {
                polygones.push(new Polygon([i, i + 1, i + countPoints + 2, i + countPoints + 1]));
            }
        }
    } else {
        let iPrev = 0;
        for (let i = 0; i < points.length / 2 - 1; i++) {
            if (points[i].y == points[i + 1].y) {
                edges.push(new Edge(i, i + 1));
                if (i + countPoints + 1 < points.length / 2) {
                    polygones.push(new Polygon([i, i + 1, i + countPoints + 1, i + countPoints]));
                }
            } else {
                edges.push(new Edge(i, iPrev));
                if (i + countPoints < points.length / 2) {
                    polygones.push(new Polygon([i, iPrev, i + 1, i + countPoints]));
                }
                iPrev = i + 1;
            }
            if (i + countPoints < points.length / 2) {
                edges.push(new Edge(i, i + countPoints));
            }
        }
        edges.push(new Edge(points.length / 2 - 1, iPrev));


        iPrev = points.length / 2;
        for (let i = points.length / 2; i < points.length - 1; i++) {
            if (points[i].y == points[i + 1].y) {
                edges.push(new Edge(i, i + 1));
                if (i + countPoints + 1 < points.length) {
                    polygones.push(new Polygon([i, i + 1, i + countPoints + 1, i + countPoints]));
                }
            } else {
                edges.push(new Edge(i, iPrev));
                if (i + countPoints < points.length) {
                    polygones.push(new Polygon([i, iPrev, i + 1, i + countPoints]));
                }
                iPrev = i + 1;
            }
            if (i + countPoints < points.length) {
                edges.push(new Edge(i, i + countPoints));
            }

            
        }
        edges.push(new Edge(points.length - 1, iPrev));
    }
    return new Subject(points, edges, polygones);
};