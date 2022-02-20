<template>
  <v-row justify="center">
    <!-- Dialog for creating/updating post starts here -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-form ref="postForm" v-model="isFormValid">
        <v-card>
          <v-card-title>
            <span class="text-h5"> {{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="form.author"
                    label="Author"
                    :rules="[(v) => !!v || 'Author is required']"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="form.title"
                    label="Title"
                    :rules="[(v) => !!v || 'Title is required']"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                    v-model="form.body"
                    outlined
                    label="Body"
                    :rules="[(v) => !!v || 'Body is required']"
                    value="The quick brown fox"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onClose"> Close </v-btn>
            <v-btn color="blue darken-1" text @click="onSave"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <!-- Dialog for creating/updating post ends here -->
  </v-row>
</template>

<script>
export default {
  props: {
    dialogState: Boolean,
    post: {
      type: Object,
      required: false,
    },
  },

  data() {
    return {
      dialog: false,
      editMode: false,
      message: "",
      isFormValid: false,
      form: {
        author: "",
        title: "",
        body: "",
      },
    };
  },
  computed: {
    formTitle() {
      return this.editMode ? "Edit post" : "Create post";
    },
  },
  mounted() {
    if (this.dialogState) {
      this.dialog = true;
    }
    if (Object.keys(this.post).length !== 0) {
      this.editMode = true;
      this.form = { ...this.post };
    }
  },

  methods: {
    onSave() {
      this.validateForm();
      if (this.isFormValid) {
        const post = { ...this.form };
        if (this.editMode) {
          // calling edit post action from vuex store as post is in edit mode
          this.$store.dispatch("editPost", { id: this.post.id, ...post });
          this.message = "Post is updated successfully.";
        } else {
          // calling create post action from vuex store as post is being created
          this.$store.dispatch("createPost", post);
          this.message = "Post is created successfully.";
        }
        this.dialog = false;
        this.$emit("on-handle-save", this.message);
        this.resetForm();
      }
    },
    onClose() {
      this.$emit("on-handle-close");
      this.resetForm();
    },
    validateForm() {
      this.$refs.postForm.validate();
    },
    resetForm() {
      this.dialog = false;
      this.editMode = false;
      this.$refs.postForm.reset();
    },
  },
};
</script>

<style></style>
