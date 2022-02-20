import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: 1,
    posts: [],
  },

  mutations: {
    ADD_POST(state, post) {
      state.posts.push({ id: state.id++, ...post });
    },
    EDIT_POST(state, post) {
      const index = state.posts.findIndex((p) => p.id === post.id);
      if (index >= 0) {
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
    setPosts({ commit }, posts) {
      posts.forEach((post) => commit("ADD_POST", post));
    },
  },
  modules: {},
});
