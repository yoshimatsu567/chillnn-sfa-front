<template>
    <div v-if="userModel !== null">
        {{ userModel.name }}
    </div>
    <!-- <div v-else></div> -->
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import { userInteractor } from '~/api'
import { UserModel } from 'chillnn-sfa-abr/dist/entities/models/modules/userModel'
@Component({})
export default class ClientHorizontallyListChargeUserName extends Vue{
    @Prop({ required: true }) chargeUserID!: string
    
    public userModel: UserModel | null = null

    @AsyncLoadingAndErrorHandle()
    async created() {
        if(this.chargeUserID !== ''){
            this.userModel = await userInteractor.fetchUserModelByUserID(this.chargeUserID)
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>