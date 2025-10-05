export const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };