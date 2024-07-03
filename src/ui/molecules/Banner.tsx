import styled from 'styled-components';
import { bytesToMegabytes } from '../../App';
import Button from '../atoms/Button';

const BannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BannerTitle = styled.h1`
  font-size: 60px;
  font-weight: 900;
`;

const SubTitle = styled.h2`
  font-size: 30px;
`;

const Banner = () => (
  <BannerWrapper>
    <BannerTitle>Adrian Pikul - Praca Magisterska</BannerTitle>
    <SubTitle>
      Analiza efektywności metod optymalizacji aplikacji stworzonej w React
    </SubTitle>
    <Button
      onClick={() => {
        console.log(
          'usedJSHeapSize',
          // @ts-expect-error fix it
          bytesToMegabytes(performance.memory.usedJSHeapSize)
        );
      }}
      style={{ width: 'fit-content', padding: '0.5rem', marginTop: '1rem' }}
    >
      Wyświetl ilość zaalokowanej pamięci
    </Button>
  </BannerWrapper>
);

export default Banner;
