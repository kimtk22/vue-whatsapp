<template>
  <div class="ml-[420px] w-full">
    <div class="w-full">
      <div class="border-l border-green-500 w-full">
        <div
          class="bg-[#F0F0F0] fixed z-10 min-w-[calc(100vw-420px)] flex justify-between items-center px-2 py-2"
        >
          <div class="flex items-center">
            <img
              src="https://random.imagecdn.app/100/100"
              class="rounded-full mx-1 w-10"
            />
            <div class="text-gray-900 ml-1 font-semibold">Frank</div>
          </div>
          <DotsVerticalIcon fillColor="#515151" />
        </div>
      </div>

      <div
        id="MessagesSection"
        class="pt-20 pb-8 z-[-1] h-[calc(100vh-65px)] w-[calc(100vw-420px)] overflow-auto fixed touch-auto"
      >
        <div class="px-20 text-sm">
          <div v-for="msg in currentChat[0].message" :key="msg">
            <div v-if="msg.sub === sub" class="flex w-[calc(100%-50px)]">
              <div class="inline-block bg-white p-2 rounded-md my-1">
                {{ msg.message }}
              </div>
            </div>
            <div
              v-else
              class="flex justify-end space-x-1 w-[calc(100%-50px)] float-right"
            >
              <div
                class="inline-block bg-green-200 p-2 rounded-md my-1 break-words"
              >
                alskdjfkalsdjflkasjflk;sjflkasjdlkfjasdlkfjasldkjflaskjdfl;askjfl;kasdf;lkalskdjfkalsdjflkasjflk;sjflkasjdlkfjasdlkfjasldkjflaskjdfl;askjfl;kasdf;lkalskdjfkalsdjflkasjflk;sjflkasjdlkfjasdlkfjasldkjflaskjdfl;askjfl;kasdf;lk
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-[calc(100vw-420px)] p-2.5 z-10 bg-[#F0F0F0] fixed bottom-0">
        <div class="flex items-center justify-center">
          <EmoticonExcitedOutLineIcon
            :size="27"
            fillColor="#515151"
            class="mx-1.5"
          />
          <PaperclipIcon :size="27" fillColor="#515151" class="mx-1.5 mr-3" />

          <input
            v-model="message"
            class="mr-1 shadow rounded-lg appearance-none w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            autocapitalize="off"
            placeholder="Message"
          />

          <button
            @click="sendMessage"
            class="ml-3 p-2 w-12 flex items-center justify-center"
          >
            <SendIcon fillColor="#515151" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DotsVerticalIcon from "icons/DotsVertical.vue";
import SendIcon from "icons/Send.vue";
import EmoticonExcitedOutLineIcon from "icons/EmoticonExcitedOutLine.vue";
import PaperclipIcon from "icons/Paperclip.vue";
import { useUserStore } from "../store/user-store";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const userStore = useUserStore();
const { userDataForChat, currentChat, sub } = storeToRefs(userStore);

let message = ref("");

const sendMessage = async () => {
  await userStore.sendMessage({
    message: message.value,
    sub2: userDataForChat.value[0].sub2,
    chatId: userDataForChat.value[0].id,
  });
};
</script>
