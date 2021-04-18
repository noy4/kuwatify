<template>
  <div
    class="h-full flex items-center flex-col"
    :class="premium ? 'bg-gradient-to-r from-red-500 to-blue-500' : ''"
  >
    <div class="w-48 h-48 mt-4 mb-2">
      <v-img src="/kuwatify_logo.png" class="filter drop-shadow" />
    </div>
    <h2 class="text-3xl font-bold filter drop-shadow mb-4">Kuwatify Premium</h2>
    <div class="w-full max-w-md px-1.5">
      <v-card>
        <v-card-text class="text-center whitespace-pre-line">{{
          text
        }}</v-card-text>
        <div class="flex flex-col justify-center items-center">
          <img v-if="premium" src="/kuwa_composer.png" class="w-40" />
          <img
            v-else-if="exPremium"
            src="/kuwa-man.png"
            class="w-56 kuwa-man"
          />
          <v-btn
            color="cursor-pointer"
            class="mt-4 mb-10"
            :class="premium ? '' : 'bg-gradient-to-r from-red-500 to-blue-500'"
            @click="setPremium"
            >{{
              premium ? 'Kuwatify Premiumを退会する' : 'Kuwatify Premiumになる'
            }}</v-btn
          >
        </div>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const premium = ref(false)
    const exPremium = ref(false)

    onMounted(() => {
      premium.value = localStorage.getItem('premium') === 'true'
    })

    const text = computed(() =>
      premium.value
        ? 'あなたはKuwatify Premiumです。\n友達に自慢できます！'
        : exPremium.value
        ? 'てめえ辞めやがったなこの野郎...'
        : 'Premiumにアップグレードして\n友達に自慢しよう！'
    )

    function setPremium() {
      premium.value = !premium.value
      exPremium.value = !premium.value
      localStorage.setItem('premium', String(premium.value))
    }

    return { premium, exPremium, text, setPremium }
  },
})
</script>

<style lang="scss">
.kuwa-man {
  filter: drop-shadow(0 0 0.75rem crimson);
}
</style>
