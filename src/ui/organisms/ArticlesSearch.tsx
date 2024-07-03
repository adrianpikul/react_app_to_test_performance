import styled from 'styled-components';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

const SearchBarWrapper = styled.div`
  display: flex;
  width: 100%;
`;

interface SearchBar {
  searchedArticle: string;
  setNewArticle: (article: string) => void;
}

const SearchBar = ({ searchedArticle, setNewArticle }: SearchBar) => {
  return (
    <SearchBarWrapper>
      <Input
        data-test="find-article"
        value={searchedArticle}
        placeholder="Wpisz nazwę artkułu..."
        onChange={(e) => {
          setNewArticle(e.target.value);
        }}
      />

      <Button>Szukaj</Button>
    </SearchBarWrapper>
  );
};

export default SearchBar;
