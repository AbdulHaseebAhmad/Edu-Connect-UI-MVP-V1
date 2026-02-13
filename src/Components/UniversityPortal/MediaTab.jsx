import { useState } from "react";
import { FaCloudUploadAlt, FaEdit, FaTimes } from "react-icons/fa";
import { fileToBase64 } from "../../Utillities/helpFunctions";
import { useDispatch } from "react-redux";
import { UploadUniversityMedia } from "../../Features/University_Features/UniversityAppSlice";
import MediaSlot from "../../Components/UniversityPortal/MediaSlot";



export default function MediaTab({profile}) {
  const dispatch = useDispatch();

  const [media, setMedia] = useState({
    university_logo:
      "",
    university_banner_image:
      "",
    uni_profile_image:
      "",
    gallery_main:
      "",
    gallery_one:
      "",
    gallery_two:
      "",
    gallery_three:
      "",
    gallery_four:
      "",
    uni_video: "",
  });

  const [uploadedMedia, setUploadeMedia] = useState([])


  const handleUpload = async (key, file) => {
    if (!file) return;
    const base64 = await fileToBase64(file);
    let media = {
      media_type: file.type,
      // media_size: file.size,
      media_file_name: file.name,
      media_tag: key,
      media: base64,
    };

    setUploadeMedia((prev)=> ([...prev,media]));
    setMedia((prev) => ({ ...prev, [key]: base64 }));
  };

  const removeMedia = (key) => {
    setMedia((prev) => ({ ...prev, [key]: "" }));
  };

  const saveChanges = () =>{
    console.log(uploadedMedia)
      dispatch(UploadUniversityMedia(uploadedMedia))
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <MediaSlot
        label="University Logo"
        value={media.university_logo}
        onUpload={(f) => handleUpload("university_logo", f)}
        onRemove={() => removeMedia("university_logo")}
      />

      <MediaSlot
        label="University Banner Image"
        isBanner
        value={media.university_banner_image}
        onUpload={(f) => handleUpload("university_banner_image", f)}
        onRemove={() => removeMedia("university_banner_image")}
      />

      <MediaSlot
        label="Profile Image"
        value={media.uni_profile_image}
        onUpload={(f) => handleUpload("uni_profile_image", f)}
        onRemove={() => removeMedia("uni_profile_image")}
      />

      <div>
        <h2 className="text-sm font-semibold mb-3">Gallery</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            "gallery_main",
            "gallery_one",
            "gallery_two",
            "gallery_three",
            "gallery_four",
          ].map((key) => (
            <MediaSlot
              key={key}
              value={media[key]}
              onUpload={(f) => handleUpload(key, f)}
              onRemove={() => removeMedia(key)}
            />
          ))}
        </div>
      </div>

      <MediaSlot
        label="University Video"
        value={media.uni_video}
        isVideo
        onUpload={(f) => handleUpload("uni_video", f)}
        onRemove={() => removeMedia("uni_video")}
      />

      <button onClick={saveChanges} className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700 active:scale-95 text-sm font-bold">
        Save Changes
      </button>
    </div>
  );
}
