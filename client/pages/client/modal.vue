<template>
    <div
        v-show="localValue"
        class="modal_wrapper"
        @click.self="localValue = false"
    >
        <slot /> 
        <div>
            {{ client }}
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ClientMast } from 'chillnn-sfa-abr'
import AppInput from '../../components/Atom/AppInput.vue'

@Component({
    components: {
        AppInput,
    }
})
export default class ClientModal extends Vue {
    @Prop({ required: true }) value!: boolean
    @Prop({ required: false }) client!: ClientMast
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
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);

    .inner {
        box-sizing: border-box;
        max-width: 850px;
        background-color: white;
        border-radius: 25px;
        padding: 20px 20px 13px 20px;
        width: 95%;
    }
}
</style>
