import { useEffect, useState } from "react";
import CropEasy from "./CropEasy";

const PopupProfile = (props) => {
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(props.items);
  const [openCrop, setOpenCrop] = useState(false);
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };

  return (
    <div>
      <div className="popup-box">
        <div className="box">
          {!openCrop && (
            <div>
              <label className="-label   text-transparent  transition-all hover:text-white" htmlFor="profilePhoto">
                <span className="spanava glyphicon glyphicon-camera"></span>
                <i className=" spanava fa-solid fa-camera ml-8 mt-10 text-[50px] "></i>
              </label>
              <label htmlFor="profilePhoto">
                <input accept="image/*" id="profilePhoto" type="file" style={{ display: "none" }} onChange={handleChange} />
                <img
                  id="output"
                  className="rounded-full"
                  alt={props.items.name}
                  width={150}
                  src={props.items.avatar === null ? "/broken-image.jpg" : props.items.avatar}
                />
              </label>
            </div>
          )}
          {openCrop && <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />}
        </div>
      </div>
    </div>
  );
};

export default PopupProfile;
