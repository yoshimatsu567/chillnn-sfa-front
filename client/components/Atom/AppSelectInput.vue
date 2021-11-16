<template>
    
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AppSelectInputButton extends Vue {
    @Prop({ required: false, default: false }) disabled!: boolean

    public select() {
        this.$emit('selected')
    }
}
</script>
<style lang="stylus" scoped>

</style>
