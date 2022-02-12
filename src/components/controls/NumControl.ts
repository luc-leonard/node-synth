import Rete from "rete";
import VueNumControl from "./NumControl.vue";

class NumControl extends Rete.Control {
  constructor(emitter: any, key: any, readonly: boolean, name: string) {
    super(key);
    this.component = VueNumControl;
    this.props = { emitter, ikey: key, readonly, name: name };
  }
  setValue(val) {
    this.vueContext.value = val;
  }
}

export default NumControl;
