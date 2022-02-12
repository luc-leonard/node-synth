import Rete from "rete";
import VueAnalyzerControl from "./AnalyzerControl.vue";

class AnalyzerControl extends Rete.Control {
  constructor(key: any, analyzer: AnalyserNode) {
    super(key);
    this.component = VueAnalyzerControl;
    this.props = {
      analyzer: analyzer
    };
  }
  setValue(val) {
    this.vueContext.value = val;
  }
}

export default AnalyzerControl;
