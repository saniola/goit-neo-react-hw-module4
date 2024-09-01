import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSubmit, onClear }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }

    if (input.trim().length < 3) {
      toast.error("Search term is too short");
      return;
    }

    onSubmit(input);
  };

  const handleClear = () => {
    setInput("");
    onClear();
  };

  return (
    <header className={styles.component}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button type="submit" className={styles.button}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <input
          className={styles.input}
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search images and photos"
          autoFocus
        />
        {input && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        )}
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default SearchBar;
