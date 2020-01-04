<template>
    <div v-if="visible">
        <div class="modal-mask"></div>
        <div class="modal-wrap">
            <div class="modal-content">
                <div class="modal-header"></div>
                <div class="modal-body"></div>
                <div class="modal-footer">
                    <button class="button" @click="ok">确认接入</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * 反馈 - 对话框 Modal
 */
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        ok() {
            console.log(123);
            this.$emit("ok");
        }
    }
};
</script>

<style lang="less" scoped>
.modal {
    &-mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.45);
        filter: alpha(opacity=50);
    }

    &-wrap {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
        overflow: auto;
        outline: 0;
        -webkit-overflow-scrolling: touch;
    }

    &-content {
        position: relative;
        background-color: #fff;
        background-clip: padding-box;
        border: 0;
        border-radius: 4px;
        -webkit-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        pointer-events: auto;
        top: 50%;
        transform: translateY(-50%);
        margin: 0 auto;
        padding: 10px;

        // default
        width: 500px;
    }

    &-body {
        position: relative;
    }

    &-footer {
        text-align: center;
        padding: 20px 0 10px;
        border-top: 1px solid #bbbfc480;
        .button {
            background: rgba(38, 123, 247, 1);
            border: 1px solid rgba(38, 123, 247, 1);
            border-radius: 50px;
            padding: 5px 15px;
            color: #fff;
            outline: none;
            cursor: pointer;
        }
    }
}
</style>
