const shareContent = (title: string, text: string, url: string) => {
  if (navigator.share) {
    navigator
      .share({
        title: title,
        text: text,
        url: url,
      })
      .catch((error) => {
        console.error("Error sharing:", error);
        alert("Sorry, sharing failed. You can copy the link manually.");
      });
  } else {
    console.log("Web Share API is not supported in your browser.");
    alert(
      "Web Share API is not supported in your browser. You can copy the link manually.",
    );
  }
};

export default shareContent;
