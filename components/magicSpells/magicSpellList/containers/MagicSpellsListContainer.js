import React, { useState, useEffect } from "react";
import {connect} from "react-redux";
import getMagicSpellsListAction from "../actions/getMagicSpellsListAction";
import setPopupStateAction from "../../actions/setPopupStateAction";
import MagicSpellList from "../components/MagicSpellList";
import MagicSpellFilterContainer from "../../filter/containers/MagicSpellFilterContainer";
import '../../styles/magicSpellBlock.scss';
import MagicSpellClassesContainer from "../../magicClasses/containers/MagicSpellClassesContainer";

const MagicSpellsListContainer = React.memo((props) => {
    const [loaded, setLoaded] = useState(false);
    const {getMagicSpellsList,  listId} = props;
    useEffect(() => {
        const fetchData = async () => {
            await getMagicSpellsList({ listId: listId });
            setLoaded(true);
        };

        fetchData();
    }, [getMagicSpellsList, listId]);


    if(!loaded) return null;


    if(!Object.keys(props.magicSpellsList).length) {
        return(
            <div
                className={`emptyList__btnCreate`}
                onClick={() => {props.openPopupAction({visible: true, type: 'create'})}}
            >
                Добавить заклинание
            </div>
        )
    }

    return(
        <div className={`magicSpellBlock-container`}>
            <MagicSpellClassesContainer />
            <div className={`magicSpellBlock__header`}>
                <MagicSpellFilterContainer />
                {
                    !props.isMobile
                    && <div  className={`magicSpellBlock__btnCreate`} onClick={() => props.openPopupAction({visible: true, type: 'create'})}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.7 0H7.3V7.3H0V8.7H7.3V16H8.7V8.7H16V7.3H8.7V0Z" fill="#38302C" fillOpacity="0.4"/>
                        </svg>
                    </div>
                }
            </div>

            <MagicSpellList />
        </div>
    )
});


function mapStateToProps(state) {
    return {

        listId:  state.playerListInfo.list._id,
        magicSpellsList:  state.magicSpells.magicSpellsList,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getMagicSpellsList: (data) => {
            return dispatch(getMagicSpellsListAction(data));
        },
        openPopupAction: (data) => {
            dispatch(setPopupStateAction(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MagicSpellsListContainer);
