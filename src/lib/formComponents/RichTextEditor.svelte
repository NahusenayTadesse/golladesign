<script lang="ts">
  import { Tipex } from '@friendofsvelte/tipex';
  import '@friendofsvelte/tipex/styles/index.css';
  import type { Editor } from '@tiptap/core';

  let { value = $bindable(''), disabled = false, placeholder = 'Start writing...' } = $props();

  let editorInstance: Editor | undefined = $state();

  // keep editability in sync with the prop
  $effect(() => {
    editorInstance?.setEditable(!disabled);
  });

  // only track updates when we're actually editable
  $effect(() => {
    if (!editorInstance || disabled) return;

    const onUpdate = () => {
      value = editorInstance?.getHTML() ?? '';
    };

    editorInstance.on('update', onUpdate);
    return () => editorInstance?.off('update', onUpdate);
  });
</script>

{#if disabled}
  <Tipex body={value} bind:tipex={editorInstance} controlComponent={null} class="bg-transparent!" />
{:else}
  <Tipex body={value} bind:tipex={editorInstance} focal floating />
{/if}