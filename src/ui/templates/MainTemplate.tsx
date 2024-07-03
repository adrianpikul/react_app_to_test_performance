import styled from 'styled-components';
import Banner from '../molecules/Banner';
import ArticlesPage from '../pages/ArticlesPage';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 3rem;
`;

const Content = styled.div`
  display: flex;
  width: 1440px;
  margin-top: 2rem;
`;

const MainTemplate = () => (
  <MainWrapper>
    <Banner />
    <Content>
      <ArticlesPage />
    </Content>
  </MainWrapper>
);
export default MainTemplate;
