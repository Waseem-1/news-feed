import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: 7,
    posts: [
      {
        id: 1,
        author: "A-Author1",
        title: "A-title1",
        body: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
      },
      { id: 2, author: "B-Author2", title: "B-title2", body: "B-body2" },
      { id: 3, author: "C-Author3", title: "C-title3", body: "C-body3" },
      { id: 4, author: "D-Author4", title: "D-title4", body: "D-body4" },
      { id: 5, author: "E-Author4", title: "E-title5", body: "E-body5" },
      { id: 6, author: "F-Author1", title: "F-title6", body: "F-body6" },
    ],
  },

  mutations: {
    ADD_POST(state, post) {
      state.posts.push({ id: state.id++, ...post });
    },
    EDIT_POST(state, post) {
      const index = state.posts.findIndex((p) => p.id === post.id);
      if (index > 0) {
        state.posts.splice(index, 1, post);
      }
    },
  },

  actions: {
    createPost({ commit }, post) {
      commit("ADD_POST", post);
    },
    editPost({ commit }, post) {
      commit("EDIT_POST", post);
    },
  },
  getters: {
    getPosts(state) {
      return state.posts;
    },
  },
  modules: {},
});
