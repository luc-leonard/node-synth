import Rete from 'rete';
import OscillatorComponent from "@/components/nodes/Oscillator";
import AnalyzerControl from "@/components/controls/AnalyzerControl.ts";


class AnalyzerComponent extends Rete.Component {
  private audioContext: AudioContext;
  private socket: Rete.Socket;

  constructor(audioContext: AudioContext, socket: Rete.Socket) {
    super("Analyzer");
    this.audioContext = audioContext
    this.socket = socket;
  }

  builder(node) {
    node.data.analyzer = this.audioContext.createAnalyser();

    let input = new Rete.Input("ctx", "Context", this.socket, true);
    node.addInput(input);

    const control = new AnalyzerControl("analyzer", node.data.analyzer);

    node.addControl(control);
  }

  worker(node, inputs, outputs) {
    node.data.analyzer.disconnect();
    for (const ctx in inputs.ctx) {
      console.log("connecting to analyzer", inputs.ctx[ctx]);
      inputs.ctx[ctx].connect(node.data.analyzer);
    }
  }
}

export default AnalyzerComponent;