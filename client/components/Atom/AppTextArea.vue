<template>
    <div class="app_textarea_container">
        <!-- <div class="label" >{{ label }}</div> -->
        <textarea v-model="localValue" :type="type" :placeholder="placeholder" :maxlength="maxLength" :rows="rows" :cols="cols" :autofocus="false" />
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
export default class AppTextArea extends Vue {
    @Prop({ required: true }) public value!: string | number
    @Prop({ default: () => 'text' }) public type!: string
    @Prop({ required: false }) public placeholder!: string | number
    @Prop({ required: false }) public label!: string | number
    @Prop({ required: false }) maxLength!: number
    @Prop({ required: true }) rows!: number
    @Prop({ required: true }) cols!: number
    @Prop({ required: true }) autofocus!: boolean


    public get localValue() {
        return this.value
    }

    public set localValue(input: string | number) {
        this.$emit('input', input)
    }
}
</script>
<style lang="stylus" scoped>
.app_textarea_container {
    width: 100%;

    // .label{
    //     width: 100%;
    //     margin-left: 7%;
    //     font-size: 5px;
    //     text-align: left;
    //     color: $commentContentsColor
    // }

    textarea {
        // width: 80%;
        // height: 100%;
        text-align: center;
        border: 1px solid $lightBorderColor;
        padding: 10px 20px;
        margin-top: 5px;
        border-radius: 5px;
        resize: none;

        &:focus {
            outline: 0;
            box-shadow: none;
            border: 2px solid $CHILLNNBrightPinkColor;
            background-color: $WHITECOLOR;
        }
    }

    input::-webkit-calendar-picker-indicator {
        margin: 0;
    }
}
</style>
