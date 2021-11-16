<template>
    <div class="app_input_container">
        <div class="label" >{{ label }}</div>
        <input v-model="localValue" :type="type" :placeholder="placeholder" :maxlength="maxLength" />
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
export default class AppInput extends Vue {
    @Prop({ required: true }) public value!: string | number
    @Prop({ default: () => 'text' }) public type!: string
    @Prop({ required: false }) public placeholder!: string | number
    @Prop({ required: false }) public label!: string | number
    @Prop({ required: false }) maxLength!: number


    public get localValue() {
        return this.value
    }

    public set localValue(input: string | number) {
        this.$emit('input', input)
    }
}
</script>
<style lang="stylus" scoped>
.app_input_container {
    // margin-top: 1%;
    // height: 90%;
    .label{
        width: 100%;
        margin-left: 7%;
        font-size: 5px;
        text-align: left;
        color: $commentContentsColor

        &:focus-within{
            color: $CHILLNNBrightPinkColor;
        }
    }

    input {
        // box-sizing: border-box;
        width: 80%;
        // width: 100%;
        height: 100%;
        border: 1px solid $lightBorderColor;
        padding: 10px 20px;
        margin-top: 5px;
        border-radius: 5px;

        &:focus {
            outline: 0;
            box-shadow: none;
            border: 2px solid $CHILLNNBrightPinkColor;
            background-color: #ffffff;
        }
    }
}
</style>
