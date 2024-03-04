import { combineReducers } from "redux";
import theme from "./slices/themeSlice";
import auth from "./slices/authSlice";
import users from "./slices/usersSlice";
import staffs from "./slices/staffSlice";
import joueurs from "./slices/joueurSlice";
import matchs from "./slices/matchSlice";
import account from "./slices/accountSlice";
import news from "./slices/newsSlice";
import partner from "./slices/partnerSlice";
import lives from "./slices/liveSlice";
import stadium from "./slices/stadiumSlice";
import messages from "./slices/messageSlice";

const rootReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    theme,
    auth,
    users,
    staffs,
    joueurs,
    matchs,
    account,
    news,
    lives,
    stadium,
    messages,
    partner,
    ...asyncReducers,
  });
  return combinedReducer(state, action);
};

export default rootReducer;
