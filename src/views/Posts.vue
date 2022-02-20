<template>
  <v-container>
    <!-- Snackbar starts -->
    <div class="text-center">
      <v-snackbar
        v-model="snackbar"
        color="light-green darken-1"
        absolute
        top
        right
        timeout="2000"
      >
        {{ snackbarText }}
      </v-snackbar>
    </div>
    <!-- Snackbar ends -->

    <!-- Post form starts -->
    <v-row v-if="openDialog">
      <v-col>
        <PostForm
          :dialog-state="openDialog"
          :post="postData"
          @on-handle-close="onDialogClose"
          @on-handle-save="onHandleSave($event)"
        />
      </v-col>
    </v-row>
    <!-- Post form ends -->

    <!-- Posts list starts here  -->
    <v-row>
      <v-col cols="8" offset="2">
        <!-- Sort and filteration toolbar starts here -->
        <template>
          <v-toolbar dark color="blue darken-3" class="mb-1">
            <v-text-field
              v-model="filterText"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
              height="10"
            ></v-text-field>
            <template>
              <v-spacer></v-spacer>
              <v-select
                v-model="sortKey"
                flat
                solo-inverted
                hide-details
                :items="sortKeys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle mandatory>
                <v-btn
                  large
                  depressed
                  color="blue"
                  :value="false"
                  @click="sortAsceding"
                >
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn
                  large
                  depressed
                  color="blue"
                  :value="true"
                  @click="sortDescending"
                >
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>
        <!-- Sort and filteration toolbar ends here -->
        <v-card outlined>
          <v-card-title>
            <span>Posts</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onCreatePost"> New post</v-btn>
          </v-card-title>

          <v-divider></v-divider>
          <v-card-text v-if="filteredPosts.length">
            <PostCard
              v-for="post in paginatedPosts"
              :post="post"
              :key="post.id"
              @on-edit="onEditPost"
            />
          </v-card-text>
          <v-card-text v-else align="center" justify="center">
            <h2>No Posts</h2>
            <br />
            <v-btn color="primary" @click="setSamplePosts"
              >Fill Sample Posts</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Posts list ends here  -->

    <!-- Pagination starts here  -->
    <v-row style="margin: 0">
      <v-col cols="8" offset="2">
        <template>
          <v-row class="mt-2" align="center" justify="center">
            <span class="grey--text">Posts per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ postsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in postsPerPageArray"
                  :key="index"
                  @click="updatePostsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-spacer></v-spacer>

            <span class="mr-4 grey--text">
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="previousPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-col>
    </v-row>
    <!-- Pagination ends here -->
  </v-container>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
import PostForm from "@/components/PostForm.vue";
import { samplePosts } from "@/SamplePosts.js";
export default {
  components: {
    PostCard,
    PostForm,
  },
  data() {
    return {
      openDialog: false,
      snackbar: false,
      snackbarText: "",
      postData: {},
      filterText: "",
      sortKey: "Title",
      sortKeys: ["Author", "Body", "Title"],
      page: 1,
      postsPerPage: 3,
      postsPerPageArray: [3, 6, 10],
    };
  },

  computed: {
    posts() {
      return this.$store.getters.getPosts;
    },
    filteredPosts() {
      if (this.filterText) {
        return this.posts.filter((post) =>
          post.title.toLowerCase().includes(this.filterText.toLowerCase())
        );
      } else {
        return this.posts;
      }
    },
    numberOfPages() {
      return Math.ceil(this.filteredPosts.length / this.postsPerPage);
    },

    indexStart() {
      return (this.page - 1) * this.postsPerPage;
    },
    indexEnd() {
      return this.indexStart + this.postsPerPage;
    },
    paginatedPosts() {
      return this.filteredPosts.slice(this.indexStart, this.indexEnd);
    },
  },
  methods: {
    onCreatePost() {
      this.openDialog = true;
    },
    onDialogClose() {
      this.openDialog = false;
      this.postData = {};
    },
    onEditPost(post) {
      this.openDialog = true;
      this.postData = post;
    },
    onHandleSave(message) {
      this.openDialog = false;
      this.snackbar = true;
      this.snackbarText = message;
      this.postData = {};
      setTimeout(() => (this.snackbarText = ""), 2000);
    },
    setSamplePosts() {
      this.$store.dispatch("setPosts", samplePosts);
    },

    sortAsceding() {
      if (this.sortKey) {
        const property = this.sortKey.toLowerCase();
        this.posts.sort((a, b) => a[property].localeCompare(b[property]));
      }
    },

    sortDescending() {
      if (this.sortKey) {
        const property = this.sortKey.toLowerCase();
        this.posts.sort((a, b) => b[property].localeCompare(a[property]));
      }
    },

    nextPage() {
      if (this.page + 1 <= this.numberOfPages) {
        this.page += 1;
      }
    },

    previousPage() {
      if (this.page - 1 >= 1) {
        this.page -= 1;
      }
    },

    updatePostsPerPage(number) {
      this.page = 1;
      this.postsPerPage = number;
    },
  },
};
</script>

<style></style>
