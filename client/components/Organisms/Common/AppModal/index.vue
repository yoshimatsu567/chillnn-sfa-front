<template>
    <div
        v-show="localValue"
        class="modal_wrapper"
        @click.self="localValue = false"
    >
        <div class="inner">
            <slot />
            <div class="label">担当</div>
            <select style="width: 50%;" @blur="register(selectedValue)" v-model="selectedValue" name="clientModel.chargeUserID" >
                <!-- <option disabled>{{ selectedValue }}</option> -->
                <option v-for="userData in userModelList" :key="userData.userID" :value="userData.userID">{{ userData.name }}</option>
            </select>
            <app-input label="会社名" :value="client.companyName" v-model="client.companyName" />
            <app-input label="施設名" :value="client.accommodationName" v-model="client.accommodationName" />
            <app-input label="担当者" :value="client.clientUserName" v-model="client.clientUserName"/>
            <app-input label="都道府県" :value="client.prefecture" v-model="client.prefecture"/>
            <app-input label="電話番号" :value="client.clientPhoneNumber" v-model="client.clientPhoneNumber"/>
            <app-input label="メールアドレス" :value="client.clientEmail" v-model="client.clientEmail"/>
            <!-- <app-input label="アポ" :value="client.appointmentStatus" v-model="client.appointmentStatus"/> -->
            <app-input label="過去ステータス" :value="client.pastStatus" v-model="client.pastStatus"/>
            <app-input label="新規ステータス" :value="client.newStatus" v-model="client.newStatus"/>
            <app-input label="HPのポテンシャル" :value="client.homePagePotential" v-model="client.homePagePotential"/>
            <app-input label="予想流通額" :value="client.expectedSalesAmount" v-model="client.expectedSalesAmount"/>
            <app-input label="所要時間" :value="client.requiredTime" v-model="client.requiredTime" placeholder="10時間"/>
            <app-primary-button class="button_style" @click="register">更新</app-primary-button>
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
    @Prop({ required: true }) propValue!: boolean
    @Prop({ required: true }) client!: ClientModel

    public chargeUserNameValue: string = ''
    public userModel: UserMast | null = null
    public userModelList: UserMast[] = []
    public selectValue: string = ''
    
    public get localValue() {
        return this.propValue
    }

    public set localValue(input: boolean) {
        this.$emit('input', input)
    }

    public get selectedValue() {
        return this.selectValue;
    }

    public set selectedValue(select: string) {
        this.selectValue = select
        this.$emit('selected', select)
    }

    @AsyncLoadingAndErrorHandle()
    public async created() {
        this.userModelList = await userInteractor.fetchAllUser()
        if(this.client && this.client.chargeUserID !== ''){
            this.userModel = await userInteractor.fetchUserModelByUserID(this.client.chargeUserID)
            this.selectedValue = this.userModel.name
        }
    }

    // 担当単体でもAPI叩いてる。分けてた方がいい
    @AsyncLoadingAndErrorHandle()
    public async register(selectedUserID?: string){
        if(this.client){
            if(selectedUserID){
                this.client.chargeUserID = selectedUserID
            }
            await this.client.register()
            .then(() => window.alert('更新しました。'))
            .catch(() => window.alert('更新に失敗しました。もう一度試してみてください。'))
        }
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
    background-color: rgba(0, 0, 0, 0.5);
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
