Surfaces.prototype.cone = (x0 = 0, y0 = 0, z0 = 0, a = 1, c = 1, size = 10, countRing = 10, countPoints = 30) => {
    const points = [];
    const edges = [];
    const polygones = [];
    const deltaY = size / (countRing - 1);
    const deltaZ = 2 * Math.PI / countPoints;
    for (let i = -size / 2; i <= size / 2; i += deltaY) {
        const y = y0 + c * i;
        for (let j = -Math.PI; j <= Math.PI; j += deltaZ) {
            const x = x0 + a * i * Math.sin(j);
            const z = z0 + a * i * Math.cos(j);
            points.push(new Point(x, y, z));
        }
    }
    if (countPoints % 2 == 0) {
        for (let i = 0; i < points.length - 1; i++) {
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
        for (let i = 0; i < points.length - 1; i++) {
            if (points[i].y == points[i + 1].y) {
                edges.push(new Edge(i, i + 1));
                if (i + countPoints + 2 < points.length) {
                    polygones.push(new Polygon([i, i + 1, i + countPoints + 2, i + countPoints + 1]));
                }
            } else {
                edges.push(new Edge(i, iPrev));
                if (i + countPoints + 1 < points.length) {
                    polygones.push(new Polygon([i, iPrev, i + 1, i + countPoints + 1]));
                }
                iPrev = i + 1;
            }
            if (i + countPoints + 1 < points.length) {
                edges.push(new Edge(i, i + countPoints + 1));
            }
        }
        edges.push(new Edge(points.length - 1, iPrev));
    }
    return new Subject(points, edges, polygones);
};