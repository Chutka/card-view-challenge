import { Action, createBrowserHistory } from "history";
import { historyActions } from './slices/history';
import { dispatch } from './store';

const {
    pushLocation,
    replaceLocation,
    popLocation
} = historyActions;

export const history = createBrowserHistory({ window });

history.listen(({ action, location }) => {
    switch(action) {
        case Action.Push:
            dispatch(pushLocation(location));
            break;
        case Action.Pop:
            dispatch(popLocation());
            break;
        case Action.Replace:
            dispatch(replaceLocation(location));
            break;
    }
});