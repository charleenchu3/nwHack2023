import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import * as React from 'react';
import { Asset } from './CreateAndViewAsset';
import { NextUIProvider } from '@nextui-org/react';
import {keywordBlock} from './Keywords';

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: "2676ca4d-c69f-4ddd-ae16-bb8f26152dd2",
  }),
});

function App() {
  return (
    <LivepeerConfig client={livepeerClient}>
      <h1>Chit Chat</h1>
      <h2>Today's topic: Hometown Favorites</h2>
      <keywordBlock />
      <NextUIProvider>
        <Asset />
      </NextUIProvider>
    </LivepeerConfig>
  )
}

export default App;
