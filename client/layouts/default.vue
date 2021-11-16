<template>
    <div class="app_container">
        <div class="app-header">
            <app-header v-if="userModel" :userModel="userModel" />
        </div>
        <div class="app">
            <nuxt />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import  AppHeader  from '../components/Organisms/Common/AppHeader/index.vue'
import { authInteractor } from '../driver/amplify/auth'
import { userInteractor } from '../api'
import { UserModel } from 'chillnn-sfa-abr/dist/entities/models/modules/userModel'
@Component({
    components:{
        AppHeader,
    },
})
export default class DefaultLayout extends Vue {
    public userModel: UserModel | null = null

    public async created() {
        const isSignIn = await authInteractor.isSignIn()
        if(!isSignIn){
            this.$router.push({ name: 'auth-signup' })
        }
        this.userModel = await userInteractor.fetchMyUserModel()
        if(this.userModel){
            if(!this.userModel.name || !this.userModel.jobTitleName){
                this.$router.push({ name: 'user-userID', params: { userID: this.userModel.userID } })
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.app_container{
    // min-height: 100vh;
    .app {
        // margin: 0 auto;
        // max-width: 1000px;
        // padding: 15px $sidePaddingPC;
    }
}
</style>