import Rete from "rete";
import NumControl from "../controls/NumControl";

class OscillatorComponent extends Rete.Component {
  private audioContext: AudioContext;
  private contextSocket: Rete.Socket;

  constructor(audioContext: AudioContext, contextSocket: Rete.Socket) {
    super("Oscillator");
    this.audioContext = audioContext;
    this.contextSocket = contextSocket;
  }

  builder(node) {
    node.data.oscillator = this.audioContext.createOscillator();
    node.data.oscillator.frequency.value = node.data.frequency || 440;
    node.data.oscillator.type = "sine";
    node.data.oscillator.start();

    const out = new Rete.Output("ctx", "Context", this.contextSocket);
    const control = new NumControl(
      node.data.oscillator.frequency,
      "value",
      false,
      "frequency"
    );

    node.addControl(control);
    node.addOutput(out);
  }

  worker(node, inputs, outputs) {
    console.log("disconnecting oscillator", this);
    node.data.oscillator.disconnect();
    outputs["ctx"] = node.data.oscillator;
  }
}

export default OscillatorComponent;
