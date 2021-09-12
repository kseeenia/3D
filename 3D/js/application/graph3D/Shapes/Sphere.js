Surfaces.prototype.sphere = ( 
    R = 7, 
    count = 20, 
    point = new Point(0, 0, 0)) => {

	const points = [];
	const edges = [];
    const polygons = [];
    
    const da = 2 * Math.PI / count;
    //точки
    for(let i = 0; i <= Math.PI; i += da){
        for (let j = 0; j < 2 * Math.PI; j += da) {
            const x = point.x + R * Math.sin(i) * Math.cos(j);
            const y = point.y + R * Math.sin(i) * Math.sin(j);
            const z = point.z + R * Math.cos(i);
            points.push(new Point(x, y, z));
        }
	}

    //ребра
    for(let i = 0; i < points.length; i++){
        if(i + count < points.length){
            edges.push(new Edge( i, i + count));
        }

        if(i + 1 < points.length && (i + 1) % count != 0){
            edges.push(new Edge(i, i + 1));
        } else if((i + 1) % count == 0){
            edges.push(new Edge(i, i + 1 - count));
        }
    }

    //полигоны
    let k = 0;
    for (let i = 0; i < points.length; i++) {
        if ((i/2 % count) == 0) {
            k++;
        }
        
        if (((i + k * 2 ) % 4) <= 1) {
            if ((i + 1 + count) < points.length && (i + 1) % count != 0)  {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], "#ffffff"));
            } else if ((i + count) < points.length && (i + 1) % count == 0)  {
               polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], "#ffffff"))
            }
        } else {
            if ((i + 1 + count) < points.length && (i + 1) % count != 0)  {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], "#778899"));
            } else if ((i + count) < points.length && (i + 1) % count == 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], "#778899"))
            }
        }
    }

    return new Subject(points, edges, polygons);
}