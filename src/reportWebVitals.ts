import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

const reportWebVitals = () => {
  onCLS((m) => console.log('CLS', m));
  onLCP((m) => console.log('LCP', m));
  onFCP((m) => console.log('onFCP', m));
  onTTFB((m) => console.log('onTTFB', m));
  onINP((m) => console.log('onINP | FID', m));
};

export default reportWebVitals;
