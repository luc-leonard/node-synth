<template>
  {{ name }}
  <input
    type="number"
    :readonly="readonly"
    :value="value"
    @input="change($event)"
    @dblclick.stop=""
    @pointerdown.stop=""
    @pointermove.stop=""
  />
</template>

<script>
import Rete from "rete";

export default {
  props: ["name", "readonly", "emitter", "ikey", "getData", "putData"],
  data() {
    return {
      value: 0,
    };
  },
  methods: {
    change(e) {
      this.value = +e.target.value;
      this.update();
    },
    update() {
      if (this.ikey) {
        this.putData(this.ikey, this.value);
      }
      this.emitter[this.ikey] = this.value;
    },
  },
  mounted() {
    this.value = this.emitter[this.ikey];
  },
};


</script>
