export const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };


export const reviewFormFieldGenerator = (reviewSchoolFormFields,application) => {
  const extractData = Object.values(application).filter((index)=>index != 9)
  const formateData = [];
  const mergeData = reviewSchoolFormFields.map((each,i) =>[...formateData, [each,extractData[i]]])
  return mergeData;

}


export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};