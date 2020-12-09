import React, { Component } from 'react'

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <>
                <canvas ref={canvas => this.canvas = canvas} width={this.state.imgWidth} height={this.state.imgHeight} value={this.state.imgSrc} />
            </>
        )
    }
}