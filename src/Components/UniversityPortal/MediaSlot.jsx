import { FaCloudUploadAlt, FaEdit, FaTimes } from "react-icons/fa";

export default function MediaSlot({
  label,
  value,
  onUpload,
  onRemove,
  isVideo,
  isBanner,
}) {
  return (
    <div className="space-y-2">
      {label && <h2 className="text-sm font-semibold">{label}</h2>}

      {!value ? (
        <label className="upload-box cursor-pointer flex flex-col items-center justify-center gap-2">
          <FaCloudUploadAlt className="text-2xl" />
          <span>Upload</span>
          <input
            type="file"
            hidden
            accept={isVideo ? "video/*" : "image/*"}
            onChange={(e) => onUpload(e.target.files[0])}
          />
        </label>
      ) : (
        <div
          className={`flex justify-center relative ${!isBanner && "max-w-[340px]"} rounded-2xl overflow-hidden group`}
        >
          {isVideo ? (
            <video src={value} controls className="w-full h-40 object-cover" />
          ) : (
            <img
              src={value}
              alt="uploaded"
              className={
                isBanner
                  ? "w-full h-68 py-4 object-cover"
                  : "max-w-[300px] py-2 h-auto object-cover"
              }
            />
          )}

          <div
            className={`absolute ${!isBanner && "max-w-[340px] "} inset-0 top-2 bottom-2 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition`}
          >
            <label className="cursor-pointer text-white flex items-center gap-1">
              <FaEdit />
              Change
              <input
                type="file"
                hidden
                accept={isVideo ? "video/*" : "image/*"}
                onChange={(e) => onUpload(e.target.files[0])}
              />
            </label>

            <button
              onClick={onRemove}
              className="text-white flex items-center gap-1"
            >
              <FaTimes /> Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
