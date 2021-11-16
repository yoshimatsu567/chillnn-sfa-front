<template>
    <div class="app_header_container" v-if="userModel !== null">
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { UserModel } from 'chillnn-sfa-abr/dist/entities/models/modules/userModel'
import { userInteractor } from '~/api'

@Component({})
export default class AppHeader extends Vue {
    // public userModel: UserModel | null = null

    // async created() {
    //     this.userModel = await userInteractor.fetchMyUserModel()
    // }
}
</script>
<style lang="stylus" scoped>
</style>
