<template>
  <div>FOOBAR!</div>
  <canvas class="analyzer-canvas" ref="canvas" width="100" height="100"></canvas>
</template>

<script>

export default {
  props: ["name", "readonly", "analyzer"],
  mounted() {
    console.log("AnalyzerControl mounted");
    console.log(this.analyzer);
    var tailleMemoireTampon = this.analyzer.count;

    this.data = new Uint8Array(tailleMemoireTampon);
    requestAnimationFrame(this.draw.bind(this));
    this.canvas = this.$refs.canvas
    this.canvasCtx = this.$refs.canvas.getContext("2d");
    console.log(this.canvasCtx);

  },
  data() {
    return {};
  },
  methods: {
    draw() {
      this.analyzer.getByteTimeDomainData(this.data);
      this.canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvasCtx.lineWidth = 2
      this.canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
      this.canvasCtx.beginPath();
      var sliceWidth = this.canvas.width * 1.0 / this.data.length;
      console.log(sliceWidth);
      var x = 0;
      console.log('draw')
      for(var i = 0; i < this.data.length; i++) {

        var v = this.data[i] / 128.0;
        var y = v * this.canvas.height/2;

        if(i === 0) {
          this.canvasCtx.moveTo(x, y);
        } else {
          this.canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
        //console.log(x, y)
      }
      this.canvasCtx.stroke();
      requestAnimationFrame(this.draw.bind(this));
    }
  }
};


</script>
