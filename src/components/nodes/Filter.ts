import Rete from 'rete';
import NumControl from "../controls/NumControl.ts";


class FilterComponent extends Rete.Component {
  // @ts-ignore
  private socket: Rete.Socket;
  private audioContext: AudioContext;

  constructor(audioContext: AudioContext, socket: Rete.Socket) {
    super("Filter");
    this.audioContext = audioContext;
    this.socket = socket;



  }

  builder(node) {
    node.data.filter = this.audioContext.createBiquadFilter();
    node.data.filter.type = "bandpass";
    const control = new NumControl(
      node.data.filter.frequency,
      "value",
      false,
      "frequency"
    );

    node.addControl(control);
    let out = new Rete.Output("ctx", "Context", this.socket);
    node.addOutput(out);

    let input = new Rete.Input("ctx", "Context", this.socket, true);
    node.addInput(input);
  }

  worker(node, inputs, outputs) {
    node.data.filter.disconnect();
    for (const ctx in inputs.ctx) {
      inputs.ctx[ctx].connect(node.data.filter);
    }
    outputs["ctx"] = node.data.filter;
  }
}

export default FilterComponent;