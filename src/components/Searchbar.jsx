import css from './App.module.css';
import { BiSearch } from 'react-icons/bi';

export const Searchbar = ({ onSubmit }) => {
  const handleInputFocus = evt => {
    evt.target.value = '';
  };
  return (
    <header className={css.searchbar}>
      <form className={css.search_form} onSubmit={onSubmit}>
        <input
          className={css.search_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          onFocus={handleInputFocus}
        />
        <button type="submit" className="search_button">
          <BiSearch size={25} />
          <span>Search</span>
        </button>
      </form>
    </header>
  );
};
