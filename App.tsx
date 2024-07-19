// import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';

import {LogBox} from 'react-native';
import {BlurApp} from '@/providers/blur-app-background';
import ApplicationNavigator from '@/navigators/Application';

LogBox.ignoreLogs([
  'Warning: ...',
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

function App(): JSX.Element {
  // const queryClient = new QueryClient();
  return (
    <>
      <BlurApp>
        {/* <QueryClientProvider client={queryClient}> */}
        <ApplicationNavigator />
        {/* </QueryClientProvider> */}
      </BlurApp>
    </>
  );
}
export default App;
