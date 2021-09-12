Template.prototype.graph3DTemplate = () => `
    <canvas width="600" height="600" id="canvas3D"></canvas>
    <div id="checkboxes">
        <input type="checkbox" id="paint__points" checked>
        <label for="paint__points">Рисовать точки</label>
        <input type="checkbox" id="paint__edges" checked>
        <label for="paint__edges">Рисовать ребра</label>
        <input type="checkbox" id="paint__polygones" checked>
        <label for="paint__polygones">Рисовать полигоны</label>
    </div>
`;