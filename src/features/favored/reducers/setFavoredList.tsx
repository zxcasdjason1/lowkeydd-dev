import {FavoredCardStore, FavoredItem} from '../../../app/types'

   export  const setFavoredList = (
        state: FavoredCardStore,
        action: {
          type: string;
          payload: {
            group: string[] | null;
            list: FavoredItem[];
          };
        }
      ) => {
        const { group, list } = action.payload;
        if (group !== null) {
          state.group = group;
        }
        state.favoredList = list;
      }