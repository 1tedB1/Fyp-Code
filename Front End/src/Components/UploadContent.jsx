import React, { useState } from 'react'
import Select from "react-select";
function UploadContent() {
  const [selectedTag, setSelectedTag] = useState(null)
  const tags = [
    { value: 'ہارر', label: 'ہارر' },
    { value: 'رومانوی', label: 'رومانوی' },
    { value: 'بولڈ', label: 'بولڈ' },
  ];
  const linkNovels = [
    { value: "ہم تم اور سفر محبت", label: "ہم تم اور سفر محبت" },
    { value: "اجڑے باغ کا پھول حسین کیونکر ہو؟", label: "اجڑے باغ کا پھول حسین کیونکر ہو؟" },
    { value: "آخری عشق ", label: "آخری عشق " },
  ]
  return (

    <div className='uploadContent'>
      <div className='loginHeading'>
        <img src="./src/assets/logo.png" alt="" />
        <h1 className=''>کہانیاں اپ لوڈ کریں</h1>

      </div>
      <form action="" className='uploadContent_form'>
        <input type="text" className='uploadContent_title' placeholder='ٹایٹل' />
        <span
          contentEditable className='uploadContent_content'
          onClick={(e) => {
            let checkText = e.target.innerText;
            if (checkText == "کہانی یہاں لکھیں") {
              e.target.innerText = ""
            }
          }}
        >
          کہانی یہاں لکھیں 
        </span>
        <Select
          placeholder={"ٹیگ"}
          defaultValue={selectedTag}
          onChange={setSelectedTag}
          options={tags}
        ></Select>
        <Select
          placeholder={"لنک کریں  "}
          defaultValue={selectedTag}
          onChange={setSelectedTag}
          options={linkNovels}
        ></Select>
        <button className='uploadContent_button' type="submit">اپ لوڈ</button>
      </form>
    </div>
  )
}

export default UploadContent