Component({
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.created()
    },
  },
  data: {
    drawn: false,
    MAX_V: 1, // 最大书写速度
    MIN_V: 0, // 最小书写速度
    MAX_LINE_WIDTH: 16, // 最大笔画宽度
    MIN_LINE_WIDTH: 4, // 最小笔画宽度
    MAX_LINE_DIFF: .03, // 两点之间笔画宽度最大差异
    context: null, // canvas上下文
    lastPoint: null, // 包含上一点笔画信息的对象
  },
  methods: {
    created: function () {
      console.log("canvasInit")
      this.canvasInit();
    },
    canvasInit: function () {
      console.log('canvasInit')
      const query = this.createSelectorQuery();
      query.select('#signature-board') // 在 WXML 中填入的 id
        .fields({ node: true, size: true })
        .exec((res) => {
          res[0].node.width = res[0].width;
          res[0].node.height = res[0].height;
          this.setData({
            context: res[0].node.getContext("2d")
          });
        });
    },
    canvasMove: function (e) {
      this.setData({
        drawn: true
      });
      const currPoint = {
        x: e.changedTouches[0].x, // X坐标
        y: e.changedTouches[0].y, // Y坐标
        t: new Date().getTime(), // 当前时间
        w: (this.data.MAX_LINE_WIDTH + this.data.MIN_LINE_WIDTH) / 2 /*默认宽度 */
      };
      if (this.data.lastPoint) {
        currPoint.w = this.calcLineWidth(currPoint); // 重新赋值宽度，覆盖默认值 
        const context = this.data.context;
        context.beginPath();
        context.strokeStyle = '#000';
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.lineWidth = currPoint.w;
        context.moveTo(this.data.lastPoint.x, this.data.lastPoint.y);
        context.lineTo(currPoint.x, currPoint.y);
        context.stroke();
      }
      this.setData({
        lastPoint: currPoint // 结束前保存当前点为上一点
      });
    },
    calcLineWidth: function (currPoint) {
      const lastPoint = this.data.lastPoint;
      let consuming = currPoint.t - lastPoint.t; // 两点之间耗时
      if (!consuming) return lastPoint.w; // 如果当前点用时为0，返回上点的宽度。
      let maxWidth = Math.min(this.data.MAX_LINE_WIDTH, lastPoint.w * (1 + this.data.MAX_LINE_DIFF)); // 当前点的最大宽度
      let minWidth = Math.max(this.data.MIN_LINE_WIDTH, lastPoint.w * (1 - this.data.MAX_LINE_DIFF * 3)); // 当前点的最小宽度，变细时速度快所以宽度变化要稍快
      let distance = Math.sqrt(Math.pow(currPoint.x - lastPoint.x, 2) + Math.pow(currPoint.y - lastPoint.y, 2)); // 两点之间距离
      let speed = Math.max(Math.min(distance / consuming, this.data.MAX_V), this.data.MIN_V); /*当前点速度*/
      let lineWidth = Math.max(Math.min(this.data.MAX_LINE_WIDTH * (1 - speed / this.data.MAX_V), maxWidth), minWidth); /* 当前点宽度 */
      return lineWidth;
    },
    canvasEnd: function () {
      this.setData({
        lastPoint: null // 每笔画完清除缓存
      });
    },
    canvasClear: function () {
      this.sendSignatureData()
      this.setData({
        drawn: false
      });
      const context = this.data.context;
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    },
    // 获取签名图片数据并触发自定义事件
    sendSignatureData: function () {
      if (!this.data.drawn) {
        return;
      }
      const res = this.data.context.canvas.toDataURL("image/png");
      this.triggerEvent('signatureData', { image: res });
    },
  }
});
