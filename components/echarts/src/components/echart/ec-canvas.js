import Taro, { Component } from "@tarojs/taro";
import { Canvas } from "@tarojs/components";
import WxCanvas from "./wx-canvas";

import "./ec-canvas.styl";

function wrapTouch(event) {
    for (let i = 0; i < event.touches.length; ++i) {
        const touch = event.touches[i];
        touch.offsetX = touch.x;
        touch.offsetY = touch.y;
    }
    return event;
}

let ctx, echarts;

export default class EcCanvas extends Component {
    init = callback => {
        const version = wx.version.version.split(".").map(n => parseInt(n, 10));
        const isValid =
            version[0] > 1 ||
            (version[0] === 1 && version[1] > 9) ||
            (version[0] === 1 && version[1] === 9 && version[2] >= 91);
        if (!isValid) {
            console.error(
                "微信基础库版本过低，需大于等于 1.9.91。" +
                    "参见：https://github.com/ecomfe/echarts-for-weixin" +
                    "#%E5%BE%AE%E4%BF%A1%E7%89%88%E6%9C%AC%E8%A6%81%E6%B1%82"
            );
            return;
        }

        ctx = Taro.createCanvasContext(this.props.canvasId, this);

        const canvas = new WxCanvas(ctx, this.props.canvasId);

        echarts.setCanvasCreator(() => {
            return canvas;
        });

        var query = Taro.createSelectorQuery().in(this.$scope);
        query
            .select(".ec-canvas")
            .boundingClientRect(res => {
                if (typeof callback === "function") {
                    this.chart = callback(canvas, res.width, res.height);
                } else if (
                    this.data.ec &&
                    typeof this.data.ec.onInit === "function"
                ) {
                    this.chart = this.data.ec.onInit(
                        canvas,
                        res.width,
                        res.height
                    );
                } else {
                    this.triggerEvent("init", {
                        canvas: canvas,
                        width: res.width,
                        height: res.height
                    });
                }
            })
            .exec();
    };

    canvasToTempFilePath(opt) {
        if (!opt.canvasId) {
            opt.canvasId = this.data.canvasId;
        }

        ctx.draw(true, () => {
            Taro.canvasToTempFilePath(opt, this);
        });
    }

    onTouchStart(e) {
        if (this.chart && e.touches.length > 0) {
            var touch = e.touches[0];
            var handler = this.chart.getZr().handler;
            handler.dispatch("mousedown", {
                zrX: touch.x,
                zrY: touch.y
            });
            handler.dispatch("mousemove", {
                zrX: touch.x,
                zrY: touch.y
            });
            handler.processGesture(wrapTouch(e), "start");
        }
    }

    onTouchMove(e) {
        if (this.chart && e.touches.length > 0) {
            var touch = e.touches[0];
            var handler = this.chart.getZr().handler;
            handler.dispatch("mousemove", {
                zrX: touch.x,
                zrY: touch.y
            });
            handler.processGesture(wrapTouch(e), "change");
        }
    }

    onTouchEnd(e) {
        if (this.chart) {
            const touch = e.changedTouches ? e.changedTouches[0] : {};
            var handler = this.chart.getZr().handler;
            handler.dispatch("mouseup", {
                zrX: touch.x,
                zrY: touch.y
            });
            handler.dispatch("click", {
                zrX: touch.x,
                zrY: touch.y
            });
            handler.processGesture(wrapTouch(e), "end");
        }
    }

    componentWillMount = () => {
        echarts = this.props.echarts;
    };

    render() {
        const { ec = {}, canvasId } = this.props;
        return (
            <Canvas
                class="ec-canvas"
                canvas-id={canvasId}
                init={this.init}
                onTouchstart={ec.disableTouch ? "" : this.onTouchStart}
                onTouchmove={ec.disableTouch ? "" : this.onTouchMove}
                onTouchend={ec.disableTouch ? "" : this.onTouchEnd}
                ref={ecComp => {
                    this.ecComp = ecComp;
                }}
            />
        );
    }
}
