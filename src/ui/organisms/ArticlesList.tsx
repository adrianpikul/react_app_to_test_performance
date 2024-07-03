import styled from 'styled-components';
import articlesGenerated from '../../mocks/articles-generated';
import ArticleItem from '../molecules/ArticleItem';

const ArticlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  gap: 3rem;
`;

interface ArticlesListProps {
  searchedArticle: string;
  setUserText: (text: string) => void;
}

const ArticlesList = ({ searchedArticle, setUserText }: ArticlesListProps) => {
  const filteredArticles = articlesGenerated.filter(({ title }) =>
    title.includes(searchedArticle)
  );

  return (
    <ArticlesWrapper>
      {filteredArticles.map((article) => (
        <ArticleItem
          key={article.id}
          article={article}
          setUserText={setUserText}
        />
      ))}
    </ArticlesWrapper>
  );
};

export default ArticlesList;
