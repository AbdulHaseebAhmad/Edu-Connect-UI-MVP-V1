import { createPortal } from "react-dom";
import { AddScholarships, AddUniversity } from "../../Features/Admin_Features/AdminSlice";
import { useDispatch } from "react-redux";
import { AddNewProgram } from "../../Features/University_Features/UniversityAppSlice";

export function ConfirmUniversityUploadModal({ file, onConfirm, onCancel }) {
  if (!file) return null;
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const universities = file?.fileData;

    universities?.forEach((university) => {
    //   const payload = {
    //     ...university,
    //     program_required_documents: university?.program_required_documents
    //       .split(",")
    //       .map((r) => r.trim())
    //       .filter(Boolean),
    //     program_requirements: university?.program_requirements
    //       .split(",")
    //       .map((r) => r.trim())
    //       .filter(Boolean),
    //     possible_careers: university?.possible_careers
    //       .split(",")
    //       .map((r) => r.trim())
    //       .filter(Boolean),
    //     related_tags: university?.related_tags
    //       .split(",")
    //       .map((r) => r.trim())
    //       .filter(Boolean),
    //   };
      dispatch(AddUniversity(university))
        .unwrap()
        .then((res) => {
          if (res) {
            onCancel();
          }
        });
    });
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[400px]">
        <h2 className="text-xl font-semibold mb-3">Confirm Upload</h2>

        <p className="text-gray-600 mb-4">Are you sure you want to upload:</p>

        <div className="bg-gray-100 p-3 rounded-lg mb-6 text-sm font-medium">
          {file.fileName}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => onCancel()}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
