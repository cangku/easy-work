<template>
    <div>{{name}}</div>
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
