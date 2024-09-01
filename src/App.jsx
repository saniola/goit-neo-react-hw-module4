import { useState, useRef } from "react";
import { fetchImages } from "./api/imageService";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import Loader from "./components/Loader/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import { Toaster, toast } from "react-hot-toast";
import styles from "./App.module.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const mainRef = useRef(null);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    fetchImagesData(searchQuery, 1);
  };

  const handleClear = () => {
    setQuery("");
    setImages([]);
    setError(null);
  };

  const fetchImagesData = async (searchQuery, page) => {
    setIsLoading(true);
    try {
      const results = await fetchImages(searchQuery, page);
      if (results.length === 0) {
        toast.error("No images found for your search");
      }
      setImages((prevImages) => [...prevImages, ...results]);
      setError(null);

      if (page > 1) {
        setTimeout(() => {
          mainRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }, 100);
      }
    } catch (error) {
      setError(error.message);
      toast.error("Failed to fetch images");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImagesData(query, nextPage);
  };

  return (
    <div className={styles.component}>
      <SearchBar onSubmit={handleSearch} onClear={handleClear} />
      {error && <ErrorMessage message={error} />}
      <main className={styles.main} ref={mainRef}>
        <ImageGallery images={images} onImageClick={setSelectedImage} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
      </main>
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
