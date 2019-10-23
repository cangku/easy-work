<template>
    <div class="name">{{name}}</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    data: function() {
        return {
            name: "Hello vue!"
        };
    }
});
</script>

<style scoped>
body {
    background: #f00;
}
.name {
    color: #fff;
}
</style>
