import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import * as React from 'react';
import { Asset } from './CreateAndViewAsset';


const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: "2676ca4d-c69f-4ddd-ae16-bb8f26152dd2",
  }),
});

function App() {
  return (
    <LivepeerConfig client={livepeerClient}>
      hi
      <Asset />
    </LivepeerConfig>
  );
}

export default App;
