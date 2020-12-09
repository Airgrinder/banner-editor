import React, { Component } from 'react'

import './App.css'
import banner from './components/banner.png'


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imgWidth: '184',
      imgHeight: '244',
      imgText: '',
      imgDescription: '',
      textColor: '',
      textSize: '28',
      imgSrc: banner,
      link: ''
    }

    this.changeSize = this.changeSize.bind(this);
    this.changeState = this.changeState.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.getImg = this.getImg.bind(this);
    this.getHTML = this.getHTML.bind(this);
  }

  componentDidMount = () => {
    let context = this.canvas.getContext('2d');
    let image = new Image();
    image.src = this.state.imgSrc;
    image.onload = () => { context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height) }
  }

  canvasFunc = () => {
    let context = this.canvas.getContext('2d');
    let image = new Image();
    image.src = this.state.imgSrc;
    image.onload = () => { context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height); context.fillStyle = '' + this.state.textColor; context.font = "" + this.state.textSize + "px" + " Arials"; context.fillText(this.state.imgText.substring(0, 9), 20, 50) }
  }

  changeSize = (event) => {
    this.setState(() => {
      return { [event.target.name]: parseInt(event.target.value, 10) }
    }, () => this.canvasFunc())
  };

  changeState = (event) => {
    this.setState(() => {
      return { [event.target.name]: event.target.value }
    }, () => this.canvasFunc())
    console.log(this.state.textColor)
  };

  clearCanvas = () => {
    let context = this.canvas.getContext('2d');
    this.setState(() => (context.clearRect(0, 0, this.canvas.width, this.canvas.height), () => this.canvasFunc()))
    console.log(this.state.imgSrc)
  }

  getImg = () => {
    let link = document.createElement('a');
    link.download = 'filename.png';
    link.href = this.canvas.toDataURL()
    link.click();
  }

  getJson = (e) => {
    this.textArea.select();
    document.execCommand('copy');
    e.target.focus();
  }

  getHTML = (e) => {
    this.link = document.createElement('a');
    this.link.download = 'filename.png';
    this.link.href = this.canvas.toDataURL()
    this.textArea1.value = "<img src='" + this.link.href + "'>"
    this.textArea1.select();
    document.execCommand('copy');
    e.target.focus();
  }

  render() {
    return (
      <div className="wrap">
        <div className="img">
          <canvas crossorigin="anonymous" ref={canvas => this.canvas = canvas} width={this.state.imgWidth} height={this.state.imgHeight} />
        </div>
        <div className="inputs-buttons">
          <div className="inputs">
            <div className="line">
              <input className="input" name="imgWidth" type="number" onChange={this.changeSize} placeholder="img width" />
              <input className="input" name="imgHeight" type="number" onChange={this.changeSize} placeholder="img height" />
              <input className="input" name="textSize" type="number" onChange={this.changeState} placeholder="text size" />
            </div>
            <div className="line">
            <input className="input" name="imgText" type="text" onChange={this.changeState} placeholder="img text" />
              <input className="input" name="imgDescription" type="text" onChange={this.changeState} placeholder="img description" />
              <input className="colorpicker" name="textColor" type="color" onChange={this.changeState} />
            </div>
            {/* <input className="input" name="imgSrc" type="text" onChange={this.changeState} placeholder="img source" /> Не получилось реализовать =) */}
          </div>
          <div className="buttons">
            <button onClick={this.clearCanvas} className="btn">Clear canvas</button>
            <button onClick={this.getImg} className="btn">Download</button>
            <button onClick={this.getJson} className="btn">Copy state</button>
            <button onClick={this.getHTML} className="btn">Copy tag</button>
          </div>
        </div>
        <div className="hidden">
          <textarea ref={(textarea) => this.textArea = textarea} className="test" type="text" value={JSON.stringify(this.state)} />
          <textarea ref={(textarea) => this.textArea1 = textarea} className="test" type="text" value={this.link} />
        </div>
      </div>
    )
  }
}