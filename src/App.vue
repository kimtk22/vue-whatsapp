<template>
  <router-view></router-view>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "./store/user-store";

const userStore = useUserStore();
const router = useRouter();

if (!userStore.sub) router.push("/login");
</script>
