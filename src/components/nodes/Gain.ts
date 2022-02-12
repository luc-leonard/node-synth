import Rete from 'rete';
import OscillatorComponent from "@/components/nodes/Oscillator";

class GainComponent extends Rete.Component {

  // @ts-ignore
  private socket: Rete.Socket;
  private audioContext: AudioContext;

  constructor(audioContext: AudioContext, socket: Rete.Socket) {
    super("Gain");
    this.audioContext = audioContext;
    this.socket = socket;


  }

  builder(node) {
    node.data.gain = this.audioContext.createGain();
    node.data.gain.gain.value = 0.1;

    let out = new Rete.Output("ctx", "Context", this.socket);
    node.addOutput(out);

    let input = new Rete.Input("ctx", "Context", this.socket, true);
    node.addInput(input);
  }

  worker(node, inputs, outputs) {
    node.data.gain.disconnect();
    for (const ctx in inputs.ctx) {
      inputs.ctx[ctx].connect(node.data.gain);
    }
    outputs["ctx"] = node.data.gain;
  }
}

export default GainComponent;