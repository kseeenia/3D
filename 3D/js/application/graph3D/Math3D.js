class Math3D {
    multMatrix(T, m) {
        const c = [0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
            let s = 0;
            for (let j = 0; j < 4; j++) {
                s += T[j][i] * m[j];
            }
            c[i] = s;
        }
        return c;
    }
    pointsToVectors(point1, point2, point3) { // Из данных трех точек составляем 2 вектора 
        const arr1 = [point1.x - point2.x, point1.y - point2.y, point1.z - point2.z];
        const arr2 = [point1.x - point3.x, point1.y - point3.y, point1.z - point3.z];
        return [arr1, arr2];
    }
    findRatios(arr1, arr2) { // Коэффициенты при умножении двух векторов
        const r1 = arr1[1] * arr2[2] - arr1[2] * arr2[1];
        const r2 = -(arr1[0] * arr2[2] - arr1[2] * arr2[0]);
        const r3 = arr1[0] * arr2[1] - arr1[1] * arr2[0];
        return [r1, r2, r3];
    }
    findNormalVector(point1, point2, point3) { // Находим координаты нормального вектора плоскости, заданного 
        const [arr1, arr2] = this.pointsToVectors(point1, point2, point3);
        const [x, y, z] = this.findRatios(arr1, arr2);
        return [x, y, z];
    }
    zoom(delta, point) { // Приблизить/отдалить фигуру
        const array = this.multMatrix([
            [delta, 0, 0, 0],
            [0, delta, 0, 0],
            [0, 0, delta, 0],
            [0, 0, 0, 1]
        ], [point.x, point.y, point.z, 1]);
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }
    move(sx, sy, sz, point) {
        const array = this.multMatrix([
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [sx, sy, sz, 1]
        ], [point.x, point.y, point.z, 1]);
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }
    rotateOx(alpha, point) {
        const array = this.multMatrix([
                [1, 0, 0, 0],
                [0, Math.cos(alpha), Math.sin(alpha), 0],
                [0, -Math.sin(alpha), Math.cos(alpha), 0],
                [0, 0, 0, 1]
            ],
            [point.x, point.y, point.z, 1]);
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    rotateOy(alpha, point) {
        const array = this.multMatrix([
                [Math.cos(alpha), 0, -Math.sin(alpha), 0],
                [0, 1, 0, 0],
                [Math.sin(alpha), 0, Math.cos(alpha), 0],
                [0, 0, 0, 1]
            ],
            [point.x, point.y, point.z, 1]);
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }
    rotateOz(alpha, point) {
        const array = this.multMatrix([
                [Math.cos(alpha), Math.sin(alpha), 0, 0],
                [-Math.sin(alpha), Math.cos(alpha), 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ],
            [point.x, point.y, point.z, 1]);
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }
}