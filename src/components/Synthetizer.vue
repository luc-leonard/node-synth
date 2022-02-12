<script lang="ts">
import "regenerator-runtime";
import Rete from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import VueRenderPlugin from "rete-vue-render-plugin";

import OscillatorComponent from "./nodes/Oscillator.ts";
import GainComponent from "./nodes/Gain.ts";
import OutputComponent from "./nodes/Output.ts";
import FilterComponent from "./nodes/Filter.ts";
import AnalyzerComponent from "./nodes/Analyzer.ts";

let audioContext = new AudioContext();
audioContext.resume();
const contextSocket = new Rete.Socket("Context");





export default {
  mounted() {
    (async () => {
      const container = document.querySelector("#rete");
      const editor = new Rete.NodeEditor("demo@0.1.0", container);
      //const extra = document.querySelector(".dock-menu");

      editor.use(ConnectionPlugin);
      editor.use(VueRenderPlugin);

      const oscillatorComponent = new OscillatorComponent(
        audioContext,
        contextSocket
      );
      const gainComponent = new GainComponent(audioContext, contextSocket);
      const outputComponent = new OutputComponent(audioContext, contextSocket);
      const filterComponent = new FilterComponent(audioContext, contextSocket);
      const analyzerComponent = new AnalyzerComponent(audioContext, contextSocket);

      editor.register(oscillatorComponent);
      editor.register(gainComponent);
      editor.register(outputComponent);
      editor.register(filterComponent);
      editor.register(analyzerComponent);

      const engine = new Rete.Engine("demo@0.1.0");
      engine.register(oscillatorComponent);
      engine.register(gainComponent);
      engine.register(outputComponent);
      engine.register(filterComponent);
      engine.register(analyzerComponent);


      let n1 = await oscillatorComponent.createNode({frequency: 220});
      let n2 = await oscillatorComponent.createNode({frequency: 440});
      let n3 = await gainComponent.createNode({});
      let n4 = await outputComponent.createNode({});
      let n5 = await filterComponent.createNode();
      let n6 = await analyzerComponent.createNode();

      n1.position = [100, 100];
      n2.position = [100, 300];
      n3.position = [600, 100];
      n4.position = [900, 100];

      editor.addNode(n1);
      editor.addNode(n2);
      editor.addNode(n3);
      editor.addNode(n4);
      editor.addNode(n5);
      editor.addNode(n6);

      editor.on("noderemoved connectioncreated connectionremoved", async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
      });
    })();
  },
};
</script>

<template>
  <div id="engine">
    <div id="rete"></div>
  </div>
  <canvas id="canvas"></canvas>
</template>

<style scoped>
#rete {
  width: 100%;
  height: 100%;
}

#engine {
  width: 1900px;
  height: 1200px;
}
</style>
