import { CSSProperties, useMemo } from 'react';
import styled from 'styled-components';
import { Article } from '../../mocks/articles-generator';

const ArticleItemWrapper = styled.div`
  display: flex;
  background-color: #b4d7fe;
  padding: 3rem 4rem;
  gap: 3rem;
  height: 750px;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 25px;

  &::first-letter {
    text-transform: uppercase;
  }
`;

interface ArticleItemProps {
  article: Article;
  setUserText: (text: string) => void;
  style?: CSSProperties;
}

const heavyCalculation = () => {
  let sum = 0;
  for (let i = 0; i < 20000000; i++) {
    // for (let i = 0; i < 200; i++) {
    sum += i;
  }

  return sum;
};

// const measureHeavyCalcFnPerformance = () => {
//   const start = performance.now();
//   const initialMemory = performance.memory.usedJSHeapSize;
//   heavyCalculation();
//   const finalMemory = performance.memory.usedJSHeapSize;
//   const memoryUsed = finalMemory - initialMemory;
//   const end = performance.now();
//   return { timeTaken: end - start, initialMemory, finalMemory, memoryUsed };
// };

// const measueHeavyCalcFnsPerformance = (
//   quantityOfMeasurements: number
// ) => {
//   console.table(
//     Array.from({ length: quantityOfMeasurements }, () =>
//       measureHeavyCalcFnPerformance()
//     )
//   );
// };

const ArticleItem = ({ article, setUserText, style }: ArticleItemProps) => {
  const calculatedValue = useMemo(() => heavyCalculation(), []);

  return (
    <ArticleItemWrapper style={style}>
      <LeftSide>
        <p>
          Losowa wartość potwierdzająca renderowanie komponentu:
          {Math.floor(Math.random() * 100) + 1}
        </p>
        <p>Wartość kalkulacji: {calculatedValue}</p>
        <Title>{article.title}</Title>
        <p>{article.articleText}</p>
        <p>Autor: {article.author}</p>
        <p>Data dodania: {article.dateAdded}</p>
        <label>
          {/* Komentarz własny:
          <input
            placeholder="Własny komentarz"
            onChange={(e) => {
              setUserText(e.target.value);
            }}
          /> */}
        </label>
      </LeftSide>

      <img src={article.articleImage} alt={article.title} loading="lazy" />
    </ArticleItemWrapper>
  );
};

export default ArticleItem;
