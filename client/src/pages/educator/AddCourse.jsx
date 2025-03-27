import React, { useState } from 'react'
import uniqid from 'uniqid';
import Quill from 'quill';

const AddCourse = () => {

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div>
      <h1>Educator Add courses</h1>
    </div>
  );
}

export default AddCourse;
