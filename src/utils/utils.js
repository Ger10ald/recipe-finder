export const handleImageError = (event) => {
    const ImageError = "https://placehold.co/600x400?text=Image+Not+Available"
    event.target.onerror = null;
    event.target.src = ImageError;
    event.target.alt = "Image not available";
}

export const stripHtmlTags = (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
}

export const scrollToPrev = () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      sessionStorage.removeItem('scrollPosition'); 
    }
}