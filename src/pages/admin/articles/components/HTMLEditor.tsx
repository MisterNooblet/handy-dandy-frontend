/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { SetStateAction } from 'react';
import { Box } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

const HTMLEditor = ({ setValue }: { setValue: React.Dispatch<SetStateAction<string>> }) => {
  return (
    <>
      <Box sx={{ border: '1px solid black', borderRadius: '5px 5px 0  0 ', boxShadow: 4 }}>
        <CKEditor
          onReady={(editor) => {
            // Insert the toolbar before the editable area.
            const editableElement = editor.ui.getEditableElement();
            const toolbarElement = editor.ui.view.toolbar.element;

            if (editableElement && toolbarElement) {
              // @ts-ignore: Object is possibly 'null'.
              editableElement.parentElement.insertBefore(toolbarElement, editableElement);
              // @ts-ignore: Object is possibly 'null'.
              // this.editor = editor;
            }
            editor.focus();
          }}
          onError={(error, { willEditorRestart }) => {
            // If the editor is restarted, the toolbar element will be created once again.
            // The `onReady` callback will be called again and the new toolbar will be added.
            // This is why you need to remove the older toolbar.
            // @ts-ignore: Object is possibly 'null'.
            if (willEditorRestart && this.editor && this.editor.ui.view.toolbar.element) {
              // @ts-ignore: Object is possibly 'null'.
              this.editor.ui.view.toolbar.element.remove();
            }
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setValue(data);
          }}
          editor={DecoupledEditor}
        />
      </Box>
    </>
  );
};

export default HTMLEditor;
