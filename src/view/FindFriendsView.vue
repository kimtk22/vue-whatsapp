<template>
  <div id="findFriends" class="pt-[100px] overflow-auto fixed h-[100vh] w-full">
    <div v-for="user in userStore.allUsers" :key="user.sub">
      <div
        v-if="hideMe(user)"
        @:click="createNewChat(user)"
        class="flex w-full p-4 items-center cursor-pointer"
      >
        <img :src="user.picture" class="rounded-full w-12 mr-4" />
        <div class="w-full">
          <div class="flex justify-between items-center">
            <div class="text-[15px] text-gray-600">
              {{ user.firstName }} {{ user.lastName }}
            </div>
          </div>
          <div class="flex items-center">
            <div class="text-[15px] text-gray-500">Hi, I`m using WhatsApp!</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/user-store";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { sub, userDataForChat } = storeToRefs(userStore);

const hideMe = (user) => {
  if (user.sub === sub.value) {
    return false;
  }

  return true;
};

const createNewChat = (user) => {
  userDataForChat.value = [];
  userDataForChat.value.push({
    id: "",
    sub1: sub.value,
    sub2: user.sub,
    firstName: user.firstName,
    picture: user.picture,
  });
};
</script>
