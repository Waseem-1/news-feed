<template>
  <v-app>
    <!-- App bar start here -->
    <v-app-bar app color="green" dark>
      <v-toolbar-title>News Feed App</v-toolbar-title>
      <!-- Navigation links starts here, It will be only visible in task two -->
      <template v-if="!isTaskOne">
        <router-link :to="{ name: 'page-one' }">
          <span class="mr-2" style="color: #fff">Page 1</span>
        </router-link>
        <router-link :to="{ name: 'page-two' }">
          <span class="mr-2" style="color: #fff">Page 2</span>
        </router-link>
        <router-link :to="{ name: 'page-three' }">
          <span class="mr-2" style="color: #fff">Page 3</span>
        </router-link>
      </template>
      <!-- Navigation links ends here -->
    </v-app-bar>
    <!-- App bar ends here -->

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    task: "Task1",
    tasks: ["Task1", "Task2"],
  }),
  computed: {
    isTaskOne() {
      return this.task === "Task1" ? true : false;
    },
  },
  methods: {
    changeTask() {
      if (this.isTaskOne) {
        // routing to posts component if the task is one
        this.$router.push({ name: "Posts" });
      } else {
        // routing to samples pages(page-one) component if the task is two
        this.$router.push({ name: "page-one" });
      }
    },
  },
};
</script>
