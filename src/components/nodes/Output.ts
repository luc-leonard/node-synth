import Rete from 'rete';
import OscillatorComponent from "@/components/nodes/Oscillator";

class OutputComponent extends Rete.Component {
  private output: AudioDestinationNode;
  private socket: Rete.Socket;

  constructor(audioContext: AudioContext, socket: Rete.Socket) {
    super("Output");
    this.output = audioContext.destination;
    this.socket = socket;
  }

  builder(node) {
    let input = new Rete.Input("ctx", "Context", this.socket, true);

    node.addInput(input);
  }

  worker(node, inputs, outputs) {
    this.output.disconnect();
    for (const ctx in inputs.ctx) {
      console.log("connecting output", inputs.ctx[ctx]);
      inputs.ctx[ctx].connect(this.output);
    }
  }
}

export default OutputComponent;