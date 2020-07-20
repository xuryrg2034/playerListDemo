import React from 'react';
import setPopupStateAction from "../../actions/setPopupStateAction";
import {connect} from "react-redux";
import CellOfMagic from "../../cellOfMagic/components/CellOfMagic";
import MagicSpellItem from "../../magicSpellItem/components/MagicSpellItem";
import Scrollbars from 'react-custom-scrollbars';


const MagicSpellList = React.memo((props) => {
    const spellBlock = props.cellsOfMagic.map(el => {
        const certainLevelMagicSpell = Object.keys(props.magicSpellsList).reduce((acc, spell) => {
            if(Number(props.magicSpellsList[spell].level) === Number(el.level)) acc.push(props.magicSpellsList[spell]);
            return acc;
        }, []);
        return(
            <div key={el._id} className={`magicSpellBlock`}>
                <CellOfMagic
                    userId={props.userId}
                    listId={props.listId}
                    {...el}/>
                <div className={`magicSpellBlock__right`}>
                    {certainLevelMagicSpell.map(spell => {
                        if(
                            props.magicSpellFilter.fieldValue === null
                            || spell[props.magicSpellFilter.fieldKey] === props.magicSpellFilter.fieldValue
                        ) {
                            return(
                                <MagicSpellItem
                                    key={spell._id}
                                    openPopup={props.openPopupAction}
                                    filter={props.magicSpellFilter.fieldValue}
                                    {...spell}
                                />
                            )
                        } else {
                            return null;
                        }

                    })}
                </div>
            </div>
        )
    })
    return(
        <div className={`magicSpellBlock__list`}>
            <Scrollbars
                className={`magicSpellBlock__list_customScroll`}
                autoHide={true}
                autoHeight={true}
                autoHeightMax={658}
            >
                {spellBlock}
            </Scrollbars>
        </div>
    )
});

function mapStateToProps(state) {
    return {

        listId:  state.playerListInfo.list._id,
        magicSpellsList:  state.magicSpells.magicSpellsList,
        cellsOfMagic:  state.playerListInfo.list.cellsOfMagic,
        magicSpellFilter:  state.magicSpells.filter
    }
}
function mapDispatchToProps(dispatch) {
    return {
        openPopupAction: (data) => {
            dispatch(setPopupStateAction(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MagicSpellList);