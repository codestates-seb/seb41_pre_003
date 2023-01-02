// eslint-disable-next-line import/no-unresolved
import '@toast-ui/editor/dist/toastui-editor.css';
// eslint-disable-next-line import/no-unresolved
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Editor } from '@toast-ui/react-editor';
import { useRef } from 'react';
export default function ToastEditor({ content, setContent }) {
  const editorRef = useRef();

  const onChange = () => {
    const data = editorRef.current.getInstance().getMarkdown(); //getMarkdown or getHTML
    setContent(data);
  };

  return (
    <div>
      <Editor
        initialValue={`${content || '내용을 입력해주세요'}`}
        onChange={onChange}
        ref={editorRef}
        previewStyle="vertical" // 미리보기 스타일 지정
        height="300px" // 에디터 창 높이
        initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
        ]}
        useCommandShortcut={false} //키보드 입력 컨트롤 방지
        plugins={[colorSyntax]}
        language="KO-KR"
      ></Editor>
    </div>
  );
}
