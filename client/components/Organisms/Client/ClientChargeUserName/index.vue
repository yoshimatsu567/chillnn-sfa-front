<template>
  <div v-if="userModel !== null">
      {{ userModel.name }}
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { ClientModel } from 'chillnn-sfa-abr/dist/entities/models/modules/clientModel'
import { UserModel } from 'chillnn-sfa-abr/dist/entities/models/modules/userModel'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { userInteractor } from '~/api'

@Component({
    components:{}
})
export default class ClientChargeUserName extends Vue {
    @Prop({ required: true }) clientModel!: ClientModel

    public userModel: UserModel | null = null

    @AsyncLoadingAndErrorHandle()
    public async created() {
        // this.userModel = await userInteractor.fetchUserMastByUserID(this.clientModel.clientID)
    }
}
</script>

<style lang="stylus" scoped>

</style>