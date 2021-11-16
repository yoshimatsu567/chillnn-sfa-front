<template>
    <select name="jobName" v-model="localValue" required>
      <option value="jobTitleName">-- あなたの役職を選択してください --</option>
      <optgroup label="社員">
          <option value="CEO">CEO</option>
          <option value="CTO">CTO</option>
          <option value="BizDev">BizDev</option>
          <option value="エンジニア">エンジニア</option>
      </optgroup>
      <optgroup label="インターン">
          <option value="BizDevインターン">BizDevインターン</option>
          <option value="エンジニアインターン">エンジニアインターン</option>
      </optgroup>
    </select>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { UserModel } from 'chillnn-sfa-abr/dist/entities/models/modules/userModel'
import { UserMast } from 'chillnn-sfa-abr'
import { userInteractor } from '~/api'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({})
export default class AppSelectJobTitleName extends Vue {
  @Prop({ required: true })public value!: string
  public jobTitleName: string = ''

  public get localValue() {
    return this.value
  }

  public set localValue(select: string) {
    this.$emit('select', select)
  }
}
</script>

<style lang="stylus" scoped>

</style>