import React from 'react';
import {connect} from "react-redux";
import FormMagicSpellListContainer from "../../../components/magicSpells/form/containers/FormMagicSpellPopupContainer"
import MagicSpellsListContainer
    from "../../../components/magicSpells/magicSpellList/containers/MagicSpellsListContainer";

const SpellBookContainer = React.memo((props) => {
   return (
       <div className={`playerListContainer__block`}>
           <MagicSpellsListContainer />
           {props.popupVisible && <FormMagicSpellListContainer/>}
       </div>
   )
});

function stateProps(state) {
    return {
        popupVisible: state.magicSpells.popupState.visible
    }
}

export default connect(stateProps, null)(SpellBookContainer);
