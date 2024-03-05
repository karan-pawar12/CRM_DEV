import React from "react";
import ReactQuill from "react-quill";
import { Button, Tooltip } from "@nextui-org/react";
import PaperClipIcon from "../../resources/icons/PaperClipIcon";



function addAttachment(){
    document.getElementById('attachmentInput').click();
}

/*
 * Custom "star" icon for the toolbar using an Octicon
 * https://octicons.github.io
 */


/*
 * Custom toolbar component including insertStar button and dropdowns
 */
const CustomToolbar = ({onAttachmentChange}) => (
  <div id="toolbar">
    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
      <option value="1" />
      <option value="2" />
      <option selected />
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <select className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option selected />
    </select>
   <Tooltip content={"Attach File"}>
   <Button isIconOnly className="ql-addAttachment">
   <PaperClipIcon/>
   
    </Button>
   </Tooltip>
   <input type="file" id="attachmentInput" multiple onChange={onAttachmentChange} hidden/>
  </div>
);

/* 
 * RichTextEditor component with custom toolbar and content containers
 */
class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: "" };
   
  }

 

  render() {
    return (
      <div className="text-editor">
        <CustomToolbar onAttachmentChange={this.props.onAttachmentChange} />
        <ReactQuill
          placeholder={this.props.placeholder}
          modules={RichTextEditor.modules}
          formats={RichTextEditor.formats}
          value={this.props.value}
          onChange={this.props.onChange}
          theme={"snow"} // pass false to use minimal theme
        />
      </div>
    );
  }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
RichTextEditor.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      addAttachment,
    }
  },
  clipboard: {
    matchVisual: false,
  }
};

/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
RichTextEditor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color"
];

export default RichTextEditor;