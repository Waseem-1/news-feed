<template>
  <div>
    <!-- Model for post body start here -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5"> Post</span>
        </v-card-title>
        <v-card-text>
          {{ post.body }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeBodyDialog">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Model for post body ends here -->
    <!-- Card for post starts here -->
    <v-card class="mb-1 mx-auto" width="600px">
      <v-card-title>
        <span>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                alt=""
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <span>{{ post.author }}</span>
                <br />
                <v-chip small>
                  {{ post.title }}
                </v-chip>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </span>
        <v-spacer></v-spacer>
        <v-btn @click="onEditPost">Edit</v-btn>
      </v-card-title>

      <v-card-text>
        {{ postBody }}
        <span v-if="isLimitReached">
          ...
          <v-btn text small color="primary" @click="showBodyDialog"
            >See more</v-btn
          >
        </span>
      </v-card-text>
    </v-card>
    <!-- Card for post ends here -->
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    /**
     * Return truncated post body if the characters of post are more than 160 characters
     */
    postBody() {
      return this.isLimitReached
        ? this.post.body.substring(0, 140)
        : this.post.body;
    },

    isLimitReached() {
      return this.post.body.length >= 160 ? true : false;
    },
  },
  methods: {
    onEditPost() {
      this.$emit("on-edit", this.post);
    },
    showBodyDialog() {
      this.dialog = true;
    },
    closeBodyDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style></style>
