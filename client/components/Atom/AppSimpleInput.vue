<template>
    <div class="app_input_container">
        <input v-model="localValue" :type="type" :placeholder="placeholder" :maxlength="maxLength" :max="max" @blur="$emit('blur', $event)" />
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
export default class AppSimpleInput extends Vue {
    @Prop({ required: true }) public value!: string | number
    @Prop({ default: () => 'text' }) public type!: string
    @Prop({ required: false }) public placeholder!: string | number
    @Prop({ required: false }) public label!: string | number
    @Prop({ required: false }) maxLength!: number
    @Prop({ required: false }) max!: number


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
    width: 100%;
    // height: 100%;

    input {
        border: 1px solid $lightBorderColor;
        padding: 10px 20px;
        margin-top: 5px;
        border-radius: 5px;
        background-color: #FFFFFF

        &:focus {
            outline: 0;
            box-shadow: none;
            border: 2px solid $CHILLNNBrightPinkColor;
            background-color: $WHITECOLOR;
        }

        &:hover{
            cursor: text;
        }

    }

    input::-webkit-calendar-picker-indicator {
        margin: 0;
    }
}
</style>
