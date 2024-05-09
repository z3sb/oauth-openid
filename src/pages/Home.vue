<template>
  <h2 class="text-white font-bold text-2xl">Name: {{ name }}</h2>
  <h2 class="text-white font-bold text-2xl">Email: {{ email }}</h2>
</template>

<script setup lang="ts">
import { useAuth } from "@okta/okta-vue";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const $auth = useAuth();
const name = ref<string>("");
const email = ref<string>("");
const router = useRouter();

async function checkAuth() {
  const isAuthenticated = await $auth.isAuthenticated();

  if (!isAuthenticated) {
    router.replace("/");
    return;
  }
}

onBeforeMount(async () => {
  await checkAuth();
});

onMounted(async () => {
  await checkAuth();

  const user = await $auth.getUser();

  name.value = user?.name || "";
  email.value = user?.email || "";
});
</script>
