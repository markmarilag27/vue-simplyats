<template>
  <div class="w-full">
    <label
      v-if="label"
      for="editor"
      class="font-medium text-gray-500"
      v-text="label"
    />
    <!-- end label -->
    <TiptapCommands
      v-if="editor"
      :editor="editor"
    />
    <!-- end tiptap commands -->
    <EditorContent
      id="editor"
      name="editor"
      :editor="editor"
      class="editor markdown-body border-box"
      :class="[error ? 'has-error' : '']"
      :style="style"
      spellcheck="true"
      v-on="$attrs"
    />
    <!-- end editor -->
    <div
      v-if="error"
      class="text-red-500 mt-2"
      v-text="error[0]"
    />
    <!-- end error -->
  </div>
</template>

<script>
import '@/assets/markdown.css'
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TiptapCommands from './TiptapCommands.vue'

export default {
  name: 'Tiptap',

  components: {
    EditorContent,
    TiptapCommands
  },

  inheritAttrs: false,

  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: [String, undefined],
      default: undefined
    },
    className: {
      type: String,
      default: ''
    },
    initialHeight: {
      type: Number,
      default: 100
    },
    error: {
      type: [Array, undefined],
      default: undefined
    }
  },

  data () {
    return {
      editor: new Editor({
        content: this.value,
        onUpdate: () => {
          this.$emit('input', this.editor.getHTML())
          if (typeof this.error !== 'undefined') {
            this.$emit('clear')
          }
        },
        extensions: [
          StarterKit,
          Placeholder.configure({
            placeholder: 'Type in...'
          })
        ]
      })
    }
  },

  computed: {
    style () {
      return {
        '--tiptap-height': `${this.initialHeight}px`
      }
    }
  },

  watch: {
    value (propValue) {
      const isSame = this.editor.getHTML() === propValue

      if (isSame) {
        return
      }

      this.editor.commands.setContent(propValue, false)
    }
  },

  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>

<style scoped>
/* Scoped to the editor */
.editor {
  position: relative;
  display: block;
}
.editor.has-error >>> .ProseMirror {
  border: 2px solid rgba(239, 68, 68, var(--tw-border-opacity));
}
.editor >>> .ProseMirror {
  padding: 1rem;
  border: 2px solid rgba(75, 85, 99, var(--tw-border-opacity));
  border-radius: 0.25rem;
  min-height: var(--tiptap-height);
}
/* Placeholder (at the top) */
.editor >>> .ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
.editor >>> .ProseMirror ul {
  list-style-type: disc;
  margin-left: 1rem;
}
.editor >>> .ProseMirror ol {
  list-style-type: decimal;
  margin-left: 1rem;
}
</style>
