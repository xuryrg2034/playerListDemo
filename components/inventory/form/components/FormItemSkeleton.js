import React from 'react';

const FormItemSkeleton = () => (
    <div className={`popupWrapper formItemSkeleton`}>
        <div className={`popupBlock-wrapper`}>
            <div className={`popupBlock createItemPopup`}>
                <div className={`magicSpellPopup__form`}>
                    <div className={`magicSpellPopup__header`}>
                        <div className={`magicSpellPopup__header_left`}>
                            <div className={`formItemSkeleton__icon`} />
                        </div>
                        <div className={`magicSpellPopup__header_right`} />
                    </div>
                    <div className={`magicSpellPopup__form_section`}>
                        <div className={`magicSpellPopup__form_left`}>
                            <div className={`itemBonusBlock`} />
                            <div className={`itemBonusBlock`} />
                            <div className={`popupBlock__shortDescription`} />
                        </div>
                        <div className={`magicSpellPopup__form_right`}>
                            <div className={`popupBlock__description`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className={`popupOverlay`} />
    </div>
);

export default FormItemSkeleton;