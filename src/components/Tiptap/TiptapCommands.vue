<template>
  <div class="relative flex flex-wrap w-auto my-2 py-2 gap-1">
    <BaseButton
      @click="editor.chain().focus().toggleBold().run()"
      :class="{ 'bg-gray-600 text-white': editor.isActive('bold') }"
      class-name="w-auto font-normal border rounded px-3 py-1"
    >
      B
    </BaseButton>
    <!-- end base button -->
    <BaseButton
      @click="editor.chain().focus().toggleItalic().run()"
      :class="{ 'bg-gray-600 text-white': editor.isActive('italic') }"
      class-name="w-auto font-normal border rounded px-3 py-1"
    >
      I
    </BaseButton>
    <!-- end base button -->
    <BaseButton
      @click="editor.chain().focus().toggleStrike().run()"
      :class="{ 'bg-gray-600 text-white': editor.isActive('strike') }"
      class-name="w-auto font-normal border rounded px-3 py-1"
    >
      <s>S</s>
    </BaseButton>
    <!-- end base button -->
    <BaseButton
      @click="editor.chain().focus().setParagraph().run()"
      :class="{ 'bg-gray-600 text-white': editor.isActive('paragraph') }"
      class-name="w-auto font-normal border rounded px-3 py-1"
    >
      P
    </BaseButton>
    <!-- end base button -->
    <BaseButton
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{ 'bg-gray-600 text-white': editor.isActive('heading', { level: 1 }) }"
      class-name="w-auto font-normal border rounded px-3 py-1"
    >
      H1
    </BaseButton>
    <!-- end base button -->
    <BaseButton
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'bg-gray-600 text-white': editor.isActive('heading', { level: 2 }) }"
      class-name="w-auto font-normal border rounded px-3 py-1"
    >
      H2
    </BaseButton>
    <!-- end base button -->
    <BaseButton
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      :class="{ 'bg-gray-600 text-white': editor.isActive('heading', { level: 3 }) }"
      class-name="w-auto font-normal border rounded px-3 py-1"
    >
      H3
    </BaseButton>
    <!-- end base button -->
    <BaseButton
      @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      :class="{ 'bg-gray-600 text-white': editor.isActive('heading', { level: 4 }) }"
      class-name="w-auto font-normal border rounded px-3 py-1"
    >
      H4
    </BaseButton>
    <!-- end base button -->
    <BaseButton
      @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      :class="{ 'bg-gray-600 text-white': editor.isActive('heading', { level: 5 }) }"
      class-name="w-auto font-normal border rounded px-3 py-1"
    >
      H5
    </BaseButton>
    <!-- end base button -->
    <BaseButton
      @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      :class="{ 'bg-gray-600 text-white': editor.isActive('heading', { level: 6 }) }"
      class-name="w-auto font-normal border rounded px-3 py-1"
    >
      H6
    </BaseButton>
    <!-- end base button -->
    <BaseButton
      @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'bg-gray-600 text-white': editor.isActive('bulletList') }"
      class-name="w-auto font-normal border rounded px-3 py-1"
    >
      <SVGListUl />
    </BaseButton>
    <!-- end base button -->
    <BaseButton
      @click="editor.chain().focus().toggleOrderedList().run()"
      :class="{ 'bg-gray-600 text-white': editor.isActive('orderedList') }"
      class-name="w-auto font-normal border rounded px-3 py-1"
    >
      <SVGListOl />
    </BaseButton>
    <!-- end base button -->
    <BaseButton
      @click="editor.chain().focus().toggleCodeBlock().run()"
      :class="{ 'bg-gray-600 text-white': editor.isActive('codeBlock') }"
      class-name="w-auto font-normal border rounded px-3 py-1"
    >
      <SVGCode />
    </BaseButton>
    <!-- end base button -->
    <BaseButton
      @click="editor.chain().focus().toggleBlockquote().run()"
      :class="{ 'bg-gray-600 text-white': editor.isActive('blockquote') }"
      class-name="w-auto font-normal border rounded px-3 py-1"
    >
      <SVGQuote />
    </BaseButton>
    <!-- end base button -->
    <BaseButton
      @click="editor.chain().focus().setHorizontalRule().run()"
      class-name="w-auto font-normal border rounded px-3 py-1"
    >
      HR
    </BaseButton>
    <!-- end base button -->
    <BaseButton
      @click="editor.chain().focus().undo().run()"
      class-name="w-auto font-normal border rounded px-3 py-1"
    >
      <SVGUndo />
    </BaseButton>
    <!-- end base button -->
    <BaseButton
      @click="editor.chain().focus().redo().run()"
      class-name="w-auto font-normal border rounded px-3 py-1"
    >
      <SVGRedo />
    </BaseButton>
    <!-- end base button -->
  </div>
  <!-- end tiptap commands -->
</template>

<script>
import BaseButton from '@/components/Base/BaseButton.vue'
import SVGListUl from '@/components/SVG/SVGListUl.vue'
import SVGListOl from '@/components/SVG/SVGListOl.vue'
import SVGCode from '@/components/SVG/SVGCode.vue'
import SVGQuote from '@/components/SVG/SVGQuote.vue'
import SVGUndo from '@/components/SVG/SVGUndo.vue'
import SVGRedo from '@/components/SVG/SVGRedo.vue'

export default {
  name: 'TiptapCommands',

  components: {
    BaseButton,
    SVGListUl,
    SVGListOl,
    SVGCode,
    SVGQuote,
    SVGUndo,
    SVGRedo
  },

  props: {
    editor: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
