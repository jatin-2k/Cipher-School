import { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: new Date().getTime(),
      curTime: 0,
      isRunning: false,
      isPause: false
    };
  }
  componentDidMount() {
    this.tick();
    setInterval(this.tick.bind(this), 10);
  }

  //#region Methods
  tick() {
    if(this.state.isRunning && !this.state.isPause){
      this.setState({
        curTime: new Date().getTime() - this.state.startTime
      });
    }
    else if(!this.state.isRunning){
      this.setState({
        curTime: 0,
      });
    }
  }
  start(){
    this.setState({
      startTime: new Date().getTime(),
      isRunning: true,
      isPause: false
    })
  }
  playpause(){

    if(this.state.isPause){
      this.setState({
        startTime: new Date().getTime()-this.state.curTime
      });
    }

    this.setState({
      isPause: !this.state.isPause
    });
  }
  reset(){
    this.setState({
      isRunning: false,
      isPause: false,
      curTime: 0,
    })
  }
  //#endregion

  render() {
    return (
      <div className="App">
        <h2>{ 
          parseInt(this.state.curTime/1000/60/60)+":"+
          parseInt(this.state.curTime/1000/60)%60+":"+
          parseInt(this.state.curTime/1000)%60+":"
          +this.state.curTime%1000}
        </h2>
        <button onClick = {this.start.bind(this)}>Start</button>
        <button onClick = {this.playpause.bind(this)}>{this.state.isPause? "Resume": "Pause"}</button>
        <button onClick = {this.reset.bind(this)}>Reset</button>
      </div>
    );
  }
}
export default App;
