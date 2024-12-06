
export const handleEnterKey = (callback: () => void) => {
    return (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        callback();
      }
    };
  };
  