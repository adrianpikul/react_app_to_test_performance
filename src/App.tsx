import { useEffect } from 'react';
import './app.css';
import MainTemplate from './ui/templates/MainTemplate';

export function bytesToMegabytes(bytes: number) {
  const bytesInAMegabyte = 1024 * 1024;
  return bytes / bytesInAMegabyte;
}

const App = () => {
  useEffect(() => {
    const onPageLoad = () => {
      console.log(
        'Strona została wczytana. Zaalokowana pamięć:',
        // @ts-expect-error fix it
        bytesToMegabytes(performance.memory.usedJSHeapSize)
      );
    };

    window.addEventListener('load', onPageLoad);

    return () => {
      window.removeEventListener('load', onPageLoad);
    };
  }, []);

  return <MainTemplate />;
};

export default App;
