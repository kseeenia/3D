Surfaces.prototype.cube = (x = 1, y = 2, z = 3, size = 15) => {
    return new Subject([
        new Point(x, y, z),
        new Point(x, y, z + size),
        new Point(x + size, y, z + size),
        new Point(x + size, y, z),

        new Point(x, y + size, z),
        new Point(x, y + size, z + size),
        new Point(x + size, y + size, z + size),
        new Point(x + size, y + size, z)
    ], [
        new Edge(0, 1),
        new Edge(1, 2),
        new Edge(2, 3),
        new Edge(3, 0),
        new Edge(4, 5),
        new Edge(5, 6),
        new Edge(6, 7),
        new Edge(4, 7),
        new Edge(0, 4),
        new Edge(1, 5),
        new Edge(2, 6),
        new Edge(7, 3)
    ], [
        new Polygon([
            0,
            1,
            2,
            3,
        ]),
        new Polygon([
            3, 7, 6, 2
        ]),
        new Polygon([
            2, 6, 5, 1
        ]),
        new Polygon([
            1, 5, 4, 0
        ]),
        new Polygon([
            0, 4, 7, 3
        ]),
        new Polygon([
            4, 5, 6, 7
        ])
    ]);
};