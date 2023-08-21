import axios from "axios";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "../firebaseInit";
import { v4 as uuid } from "uuid";

axios.defaults.baseURL = "http://localhost:4001";

export const useUserStore = defineStore("user", {
  persist: true,
  state: () => ({
    sub: "",
    email: "",
    picture: "",
    firstName: "",
    lastName: "",
    chats: [],
    allUsers: [],
    userDataForChat: [],
    showFindFriends: false,
    currentChat: null,
    removeUsersFromFindFriends: [],
  }),

  actions: {
    async getUserDetailsFromGoogle(res) {
      try {
        const {
          data: { sub, email, family_name, given_name, picture },
        } = await axios.post("/api/google-login", {
          token: res.credential,
        });

        this.sub = sub;
        this.email = email;
        this.firstName = family_name;
        this.lastName = given_name;
        this.picture = picture;

        let userExists = await this.checkIfUserExists(sub);
        if (!userExists) {
          await this.saveUserDetails();
        }
      } catch (error) {
        console.log(error);
      }
    },

    logout() {
      this.sub = "";
      this.email = "";
      this.picture = "";
      this.firstName = "";
      this.lastName = "";
      this.allUsers = [];
      this.userDataForChat = [];
      this.showFindFriends = false;
    },

    async checkIfUserExists(id) {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    },

    async saveUserDetails() {
      try {
        await setDoc(doc(db, "users", this.sub), {
          sub: this.sub,
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          picture: this.picture,
        });
      } catch (error) {
        console.log(error);
      }
    },

    async getAllUsers() {
      const querySnapshot = await getDocs(collection(db, "users"));
      let results = [];
      querySnapshot.forEach((doc) => results.push(doc.data()));

      if (results.length) {
        this.allUsers = [];
        results.forEach((res) => this.allUsers.push(res));
      }
    },

    async sendMessage(data) {
      try {
        if (data.chatId) {
          await updateDoc(doc(db, `chat/${data.chatId}`), {
            sub1HasViewed: false,
            sub2HasViewed: false,
            message: arrayUnion({
              sub: this.sub,
              message: data.message,
              createAt: Date.now(),
            }),
          });
        } else {
          let id = uuid();
          await setDoc(doc(db, `chat/${id}`), {
            sub1: this.sub,
            sub2: data.sub2,
            sub1HasViewed: false,
            sub2HasViewed: false,
            message: [
              {
                sub: this.sub,
                message: data.message,
                createAt: Date.now(),
              },
            ],
          });

          this.userDataForChat[0].id = id;
          this.showFindFriends = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getChatById(id) {
      onSnapshot(doc(db, "chat", id), (doc) => {
        let res = [];
        res.push(doc.data());
        this.currentChat = res;
      });
    },

    getAllChatsByUser() {
      const q = query(collection(db, "chat"));

      onSnapshot(q, (querySnapshot) => {
        let chatArray = [];
        querySnapshot.forEach((doc) => {
          let data = {
            id: doc.id,
            sub1: doc.data().sub1,
            sub2: doc.data().sub2,
            sub1HasViewed: doc.data().sub1HasViewed,
            sub2HasViewed: doc.data().sub2HasViewed,
            message: doc.data().message,
          };

          if (doc.data().sub1 === this.sub) chatArray.push(data);
          if (doc.data().sub2 === this.sub) chatArray.push(data);

          this.removeUsersFromFindFriends = [];

          chatArray.forEach((chat) => {
            if (this.sub === chat.sub1) {
              this.allUsers.forEach((user) => {
                if (user.sub == chat.sub2) {
                  chat.user = user;
                  this.removeUsersFromFindFriends.push(user.sub);
                }
              });
            }

            if (this.sub === chat.sub2) {
              this.allUsers.forEach((user) => {
                if (user.sub == chat.sub2) {
                  chat.user = user;
                  this.removeUsersFromFindFriends.push(user.sub);
                }
              });
            }
          });

          this.chats = [];
          chatArray.forEach((chat) => {
            this.chats.push(chat);
          });
        });
      });
    },
  },
});
