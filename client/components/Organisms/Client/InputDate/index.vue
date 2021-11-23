<template>
  <app-simple-input  value="" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import AppSimpleInput from '../../../Atom/AppSelectInput.vue'
import { PhaseModel } from 'chillnn-sfa-abr/dist/entities/models/modules/phaseModel'

@Component({
    components:{
        AppSimpleInput,
    }
})
export default class ClientInputDate extends Vue {
    @Prop({ required: false }) phaseDate!: PhaseModel

}
</script>

<style lang="stylus" scoped>

</style>