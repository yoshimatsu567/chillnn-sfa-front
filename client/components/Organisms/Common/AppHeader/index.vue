<template>
    <div class="app_header_container" v-if="userModel !== null">
        <nuxt-link :to="{ name: 'index' }" tag="div" class="left_container">
            <!-- left -->
            <div class="logo">
                <img src="~/assets/img/CHILLNNSFA.webp" alt="CHILLNN SFAのロゴ画像">
            </div>
        </nuxt-link>

        <div class="header-right-wrapper">
            <nuxt-link
                :to="{ name: 'client-list' }"
                tag="div"
                class="navigation_child"
                active-class="navigation_child_active"
            >
                Client一覧
            </nuxt-link>

            <nuxt-link
                :to="{ name: 'client-register' }"
                tag="div"
                class="navigation_child"
                active-class="navigation_child_active"
            >
                Client登録
            </nuxt-link>

            <nuxt-link
                :to="{ name: 'phase-list' }"
                tag="div"
                class="navigation_child"
                active-class="navigation_child_active"
            >
                Phase一覧
            </nuxt-link>

            <nuxt-link
                :to="{ name: 'phase-register' }"
                tag="div"
                class="navigation_child"
                active-class="navigation_child_active"
            >
                Phase登録
            </nuxt-link>

            <nuxt-link
                :to="{ name: 'user-userID', params: { userID: userModel.userID } }"
                tag="div"
                class="navigation_child"
                active-class="navigation_child_active"

            >
                <!-- right -->
                <div v-if="userModel.name" class="edit_button">{{ userModel.name }}さん<img v-if="userModel.name" src="~/assets/img/edit.svg" alt="設定のアイコン" class="icon"></div>
                
            </nuxt-link>
        </div>

    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { UserModel } from 'chillnn-sfa-abr/dist/entities/models/modules/userModel'
import { userInteractor } from '~/api'

@Component({})
export default class AppHeader extends Vue {
    public userModel: UserModel | null = null

    async created() {
        this.userModel = await userInteractor.fetchMyUserModel()
    }
}
</script>
<style lang="stylus" scoped>
.app_header_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px $sidePaddingPC;
    background-color: white;
    border-bottom: 1px solid $lightBorderColor;

    @media only screen and (max-width: $spSize) {
        padding: 15px $sidePaddingSP;
    }

    .left_container {
        display: flex;
        align-items: center;
        height: auto;
        cursor: pointer;

        .logo {
            width: 100%;
            max-width: 150px;

            @media only screen and (max-width: $spSize) {
            }

            img {
                width: 100%;
            }
        }
    }

    .header-right-wrapper{
        display: flex;
        align-items: center;
        // text-align: right;
        height: 100%;
        min-width: 500px;
        justify-content: space-between;   
        font-size: 14px;
    }

    .navigation_child{
        cursor: pointer;
        align-self: center;
        &:hover{
            border-bottom: 2px solid $CHILLNNBrightPinkColor
        }
    }

    .navigation_child_active{
        border-bottom: 2px solid $CHILLNNBrightPinkColor
    }

    @media only screen and (max-width: $spSize) {
        font-size: 12px;
        min-width: none;
    }

    .icon {
        width: 14px;
        height: 14px;
        padding-left: 5px;
        border-radius: 100px;

        @media only screen and (max-width: $spSize) {
            width: 14px;
            height: 14px;
            padding-left: 5px;
            border-radius: 100px;
        }

        img {
            object-fit: cover;
            border-radius: 100px;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
