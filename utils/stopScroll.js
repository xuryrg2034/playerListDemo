class StopScroll {
    constructor() {
        this.scrollTopPositionInit = 0;
        this.stopScrollIsActive = false;

        document.querySelector("html").style.overflow = 'unset';
    }

    scroll(flag) {
        const that = this;
        const html = document.querySelector("html");

        if (flag) {
            html.style.overflow = 'unset';

            if (that.stopScrollIsActive) {
                window.scrollTo(0, that.scrollTopPositionInit);
                that.stopScrollIsActive = false;
            }
        } else {

            that.scrollTopPositionInit = window.pageYOffset;
            html.style.overflow = 'hidden';

            that.stopScrollIsActive = true;
        }
    }
}

let stopScroll = new StopScroll();

export default stopScroll;