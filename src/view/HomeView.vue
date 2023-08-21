<template>
  <div>
    <div id="Header" class="fixed w-[420px] z-10">
      <div
        class="bg-[#F0F0F0] w-full px-3 py-2 flex justify-between items-center"
      >
        <img :src="userStore.picture || ''" class="rounded-full ml-1 w-10" />
        <div class="flex items-center justify-center">
          <AccountGroupIcon fillColor="#515151" class="mr-6" />
          <DotsVerticalIcon
            @:click="logout"
            fillColor="#515151"
            class="cursor-pointer"
          />
        </div>
      </div>

      <div id="Search" class="bg-white w-full px-2 border-b shadow-sm">
        <div
          class="px-1 m-2 bg-[#F0F0F0] flex items-center justify-center rounded-sm"
        >
          <MagnifyIcon fillColor="#515151" :size="18" class="ml-2" />
          <input
            @:click="showFindFriends = !showFindFriends"
            class="ml-5 appearance-none w-full py-1.5 px-2.5 bg-[#F0F0F0] text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm placeholder:text-gray-500"
            type="text"
            autocapitalize="off"
            placeholder="Start a new chat"
          />
        </div>
      </div>
    </div>

    <div v-if="showFindFriends">
      <FindFriendsView />
    </div>
    <div v-else>
      <ChatsView class="mt-[100px]" />
    </div>

    <div v-if="userDataForChat.length">
      <MessageView />
    </div>
    <div v-else>
      <div
        class="ml-[420px] fixed w-[calc(100vw-420px)] h-[100vh] bg-gray-100 text-center"
      >
        <div class="grid h-screen place-items-center">
          <div>
            <div class="w-full flex items-center justify-center">
              <img width="375" src="w-web-not-loaded-chat.png" alt="" />
            </div>
            <div class="text-[32px] text-gray-500 font-light mt-10">
              WhatsApp Web
            </div>
            <div class="text-[14px] text-gray-600 mt-2">
              <div>
                Send and receive messages without keeping your phone online.
              </div>
              <div>
                Use WhatsApp on up to 4 linked devices and 1 phone at the same
                time.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ChatsView from "./ChatsView.vue";
import FindFriendsView from "./FindFriendsView.vue";
import MessageView from "./MessageView.vue";
import AccountGroupIcon from "icons/AccountGroup.vue";
import DotsVerticalIcon from "icons/DotsVertical.vue";
import MagnifyIcon from "icons/Magnify.vue";
import { ref } from "vue";
import { useUserStore } from "../store/user-store";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const router = useRouter();
const userStore = useUserStore();

const { showFindFriends, userDataForChat } = storeToRefs(userStore);

onMounted(() => {
  try {
    userStore.getAllUsers();
    userStore.getAllChatsByUser();
  } catch (error) {
    console.log(error);
  }
});

const logout = () => {
  const res = confirm("Are you sute you want to logout?");
  if (res) {
    userStore.logout();
    router.push("/login");
  }
};
</script>
