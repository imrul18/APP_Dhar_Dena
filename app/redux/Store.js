import {configureStore} from '@reduxjs/toolkit';

import StoryReducer from './StoryStore';

export default configureStore({
  reducer: {
    storyStore: StoryReducer,
  },
});
