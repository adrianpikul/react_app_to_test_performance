import { List, ListRowProps } from 'react-virtualized';
import styled from 'styled-components';
import articlesGenerated from '../../mocks/articles-generated';
import ArticleItem from '../molecules/ArticleItem';

const ArticlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  gap: 3rem;

  & img {
    width: 50%;
  }
`;

interface ArticlesListProps {
  searchedArticle: string;
  setUserText: (text: string) => void;
}

const ArticlesListVirtualized = ({
  searchedArticle,
  setUserText,
}: ArticlesListProps) => {
  const filteredArticles = articlesGenerated.filter(({ title }) =>
    title.includes(searchedArticle)
  );
  const rowRenderer = ({ key, index, style }: ListRowProps) => {
    const article = filteredArticles[index];
    return (
      <ArticleItem
        key={key}
        article={article}
        setUserText={setUserText}
        style={style}
      />
    );
  };

  return (
    <ArticlesWrapper>
      <List
        width={1440}
        height={window.innerHeight}
        rowCount={filteredArticles.length}
        rowHeight={750}
        rowRenderer={rowRenderer}
      />
    </ArticlesWrapper>
  );
};

export default ArticlesListVirtualized;
