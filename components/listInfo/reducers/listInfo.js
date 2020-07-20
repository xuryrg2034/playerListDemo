import {
    GET_PLAYER_LIST,
    UPDATE_CHARACTERISTICS,
    UPDATE_SAVING_THROWS,
    UPDATE_SKILLS_STORE,
    UPDATE_SKILLS,
    UPDATE_TEXT_FIELD,
    UPDATE_CELLS_OF_MAGICK,
    LIST_INFO_DEFAULT_STATE,
} from "../../../constants";

const initialState = {};


export default function listInfo(state = initialState, action) {
    switch (action.type) {
        case GET_PLAYER_LIST:
            return {...state, ...action.payload};

        case UPDATE_CHARACTERISTICS:
            const updateCharacteristics = state.characteristics.map(val => (
                val._id === action.payload.id
                    ? {...val, value: action.payload.value}
                    : val
            ));

            return {...state, characteristics: [...updateCharacteristics]};

        case UPDATE_SAVING_THROWS:
            const updatedSavingThrows = state.savingThrows.map(el => {
                const {characteristicId, wield} = action.payload;
                if(el._id === characteristicId) {
                    el.wield = wield;
                }
                return el;
            });

            return {...state, savingThrows: updatedSavingThrows};

        case UPDATE_SKILLS:
            const updatedSkills = state.skills.map((el) => {
                const {statId, values} = action.payload;
                if(el._id === statId) {
                    return ({
                        ...el,
                        ...values.reduce((acc, val) => {
                            acc[`${val.type}`] = val.value;
                            return acc;
                        }, {})
                    })
                }

                return el;
            })
            return  {...state, skills: updatedSkills};

        case UPDATE_SKILLS_STORE:
            return {...state, changedSkills: {...action.payload}};

        case UPDATE_TEXT_FIELD:
            const updateField = {};
            updateField[action.payload.key] = action.payload.value;
            return {...state, ...updateField};

        case UPDATE_CELLS_OF_MAGICK:
            let updateCellsOfMagic;

            if(action.payload.type === "maxCount") {
                updateCellsOfMagic = state.cellsOfMagic.map(val => (
                    val._id === action.payload.cellId
                        ? {...val, maxCount: action.payload.value, currentCount: action.payload.value}
                        : val
                ));
            } else {
                updateCellsOfMagic = state.cellsOfMagic.map(val => (
                    val._id === action.payload.cellId
                        ? {...val, [action.payload.type]: action.payload.value}
                        : val
                ));
            }
            return {...state, cellsOfMagic: [...updateCellsOfMagic]};

        case LIST_INFO_DEFAULT_STATE:
            return initialState;
        default:
            return state;
    }
}
