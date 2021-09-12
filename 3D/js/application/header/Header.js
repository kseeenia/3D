class Header extends Component {
    addEventListeners() {
        document.getElementById('showGraph3D')
            .addEventListener('click', () => this.callbacks.showGraph3D());
    }
}