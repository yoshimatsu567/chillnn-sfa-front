<template>
    <div
        v-show="localValue"
        class="modal_wrapper"
        @click.self="localValue = false"
    >
        <div class="inner">
            <slot />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ClientMast, UserMast } from 'chillnn-sfa-abr'
import AppInput from '../../../Atom/AppInput.vue'
import AppPrimaryButton from '../../../Atom/AppPrimaryButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { clientInteractor, userInteractor } from '~/api'
import { ClientModel } from 'chillnn-sfa-abr/dist/entities/models/modules/clientModel'

@Component({
    components: {
        AppInput,
        AppPrimaryButton,
    }
})
export default class AppModal extends Vue {
    @Prop({ required: false }) value!: boolean
    
    public get localValue() {
        return this.value
    }

    public set localValue(input: boolean) {
        this.$emit('input', input)
    }
}
</script>
<style lang="stylus" scoped>
.modal_wrapper {
    text-align: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba( 0, 0, 0, 0.1);
    // overflow-x: scroll;

    .inner {
        box-sizing: border-box;
        max-width: 850px;
        background-color: #FFFFFF;
        border-radius: 20px;
        padding: 20px;
        width: 100%;
    }

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

    div{
        // margin-right: 10%;
        // margin-left: 20%;
        .button_style{
            margin-top: 5%;
            margin-bottom: 2%;
            margin-right: auto;
            margin-left: auto;
        }
    }
}
</style>
