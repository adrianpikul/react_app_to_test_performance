import { useState } from 'react';
import styled from 'styled-components';
import ArticlesList from '../organisms/ArticlesList';
import SearchBar from '../organisms/ArticlesSearch';

const ArticlesPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ArticlesPage = () => {
  const [searchedArticle, setSearchedArticle] = useState('');
  const [userText, setUserText] = useState('');

  const setNewArticle = (article: string) => {
    setSearchedArticle(article);
  };

  const setNewUserText = (text: string) => {
    setUserText(text);
  };

  return (
    <ArticlesPageWrapper>
      <SearchBar
        searchedArticle={searchedArticle}
        setNewArticle={setNewArticle}
      />
      {/* <p>Tekst wprowadzony przez użytkownika: {userText}</p> */}
      <ArticlesList
        searchedArticle={searchedArticle}
        setUserText={setNewUserText}
      />

      {/* <ArticlesListVirtualized
        searchedArticle={searchedArticle}
        setUserText={setNewUserText}
      /> */}
    </ArticlesPageWrapper>
  );
};
export default ArticlesPage;
