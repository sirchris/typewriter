const TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    const fullTxt = this.toRotate[this.loopNum % this.toRotate.length],
        that = this;

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = this.txt;

    let delta = Math.random() * 100;

    if (this.isDeleting) {
        delta /= 4;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum += 1;
        delta = 500;
    }

    setTimeout(() => {
        that.tick();
    }, delta);
};

window.onload = () => {
    const element = document.querySelector('.typewriter'),
        toRotate = element.getAttribute('data-type'),
        period = element.getAttribute('data-period'),
        typewrite = new TxtType(element, JSON.parse(toRotate), period);

    typewrite.tick();
};
