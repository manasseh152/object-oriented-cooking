import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from '@/components/providers';
import { logger } from '@/lib/logger';

import '@/assets/styles/styles.css';

import '@/lib/i18n';

const rootElement = document.getElementById('app');

if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider />
    </StrictMode>,
  );

  logger.debug('React app mounted successfully.');
}
else {
  logger.error('Failed to mount React app: root element is missing or already has content.');
}
