class App extends Component {
    constructor(params) {
        super(params);
        this.header = new Header({
            id: 'header',
            parent: this.id,
            template: template.headerTemplate,
            callbacks: {
                showGraph3D: () => this.showGraph3D(),
            }
        });
        this.graph3D = new Graph3DComponent({
            id: 'graph3D',
            parent: this.id,
            template: template.graph3DTemplate,
        });
    }

    showGraph3D() {
        this.graph3D.show();
    }
}