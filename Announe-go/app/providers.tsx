// app/providers.tsx
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // 💡 Provider가 최상단에 위치하여 하위 컴포넌트에 Context 제공
    <QueryClientProvider client={queryClient}> 
      {children}
    </QueryClientProvider>
  );
}