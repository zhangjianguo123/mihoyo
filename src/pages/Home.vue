<template>
  <div>
    <div id="editor" ref="editor"></div>
    <div id="content">
      <p>你好哈</p>
    </div>
  </div>
</template>

<script>
import { schema } from 'prosemirror-schema-basic';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
// 实现后退撤销等功能
import { undo, redo, history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';

import { baseKeymap } from 'prosemirror-commands';

import { DOMParser } from 'prosemirror-model'; // 插入创建的dom节点，让其显示在编辑器中

export default {
  name: 'home_name',

  mounted() {
    let doc = schema.node('doc', null, [
      schema.node('paragraph', null, [schema.text('One.')]),
      schema.node('horizontal_rule'),
      schema.node('paragraph', null, [schema.text('Two!')]),
    ]);
    let content = document.getElementById('content'); // 获取一段节点或者自己创建一段节点，插入的编辑器中
    let state = EditorState.create({
      schema: doc,
      doc: DOMParser.fromSchema(schema).parse(content),
      plugins: [
        history(),
        keymap({ 'Mod-z': undo, 'Mod-y': redo }),
        keymap(baseKeymap),
      ],
    });
    let view = new EditorView(this.$refs.editor, {
      state,

      // dispatchTransaction(transaction) { // 每次获取state
      //   console.log(
      //     'Document size went from',
      //     transaction.before.content.size,
      //     'to',
      //     transaction.doc.content.size
      //   );
      //   let newState = view.state.apply(transaction);
      //   view.updateState(newState);
      // },
    });
    console.log('view', view);
    let tr = view.state.tr;
    console.log(tr.doc.content);
    tr.insertText('hello');
    let newState = state.apply(tr);
    console.log(newState, tr.doc.content);
  },
};
</script>

<style>
#editor,
.editor {
  height: 500px;
  background: white;
  color: black;
  background-clip: padding-box;
  border-radius: 4px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  padding: 5px 0;
  margin-bottom: 23px;
}
.ProseMirror {
  width: 100%;
  height: 100%;
}
</style>