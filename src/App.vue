<script setup lang="ts">
import { useAuth } from "@okta/okta-vue";
import { useRoute, useRouter } from "vue-router";
import { inject, onMounted } from "vue";

const oktaAuth = useAuth();
const authState = inject("okta.authState");
const route = useRoute();
const router = useRouter();

function login() {
  oktaAuth.signInWithRedirect({ originalUri: "/" });
}
async function logout() {
  const publicPath = router.currentRoute.value.path.replace(
    new RegExp(route.fullPath + "$"),
    ""
  );
  await oktaAuth.signOut({
    postLogoutRedirectUri: `${window.location.origin}${publicPath}`,
  });
}

async function checkAuth() {
  const isAuthenticated = await oktaAuth.isAuthenticated();
  if (authState && isAuthenticated) {
    router.replace("/home");
  }
}

onMounted(async () => {
  await checkAuth();
});
</script>

<template>
  <div class="bg-gray-900 min-h-screen min-w-full">
    <header class="mb-2 p-4">
      <button
        class="px-4 py-2 text-white bg-blue-400 rounded-md"
        v-if="authState && !authState.isAuthenticated"
        @click="login"
      >
        Login
      </button>
      <button
        class="px-4 py-2 text-white bg-blue-400 rounded-md"
        v-if="authState && authState.isAuthenticated"
        @click="logout"
      >
        Logout
      </button>
    </header>
    <router-view />
  </div>
</template>

<style scoped></style>
