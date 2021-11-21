import {store} from "../App"
import {actionToggleAppError} from "../store/app_reducer"

export function errorDispatchApp(status) {
    store.dispatch(actionToggleAppError(status))
}