import { LOCALES} from '../i18n/locales'

export const initialState = {
    theme:'',
    lang:LOCALES.ENGLISH
};

// Selector
const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "CHANGE_THEME":
            return {
                ...state,
                theme:action.theme,
                
            };

        case 'CHANGE_LANG':
            return {
                ...state,
                lang:action.lang
            }
         default:
            return state;
    }
};

export default reducer;