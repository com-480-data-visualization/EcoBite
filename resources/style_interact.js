const dots = document.querySelectorAll(".scroll-indicator a");

const removeActiveClass = () => {
    dots.forEach(dot => {
        dot.classList.remove("active");
    });
      
};


const addActiveClass = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            //console.log(entry.target);
            let currentDot = document.querySelector(
                `.scroll-indicator a[href='#${entry.target.id}']`
            );
            removeActiveClass();
            currentDot.classList.add("active");
        }
    });

};


const options = {
    threshold: 0.6
};



const observer = new IntersectionObserver(addActiveClass, options);

const sections = document.querySelectorAll("section");

sections.forEach(section => {
    observer.observe(section);
});

document.addEventListener('keydown', function(e) {
    // Only trigger if not typing in an input/textarea
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    const sections = Array.from(document.querySelectorAll('section'));
    const current = sections.findIndex(sec => {
        const rect = sec.getBoundingClientRect();
        return rect.top <= 10 && rect.bottom > window.innerHeight/2;
    });

    if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (current < sections.length - 1) {
            e.preventDefault();
            sections[current + 1].scrollIntoView({behavior: "smooth"});
        }
    }
    if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (current > 0) {
            e.preventDefault();
            sections[current - 1].scrollIntoView({behavior: "smooth"});
        }
    }
});

let isScrolling = false;

window.addEventListener('wheel', function(e) {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    // Only respond to significant scrolls
    if (Math.abs(e.deltaY) < 50) return;

    if (isScrolling) {
        e.preventDefault();
        return;
    }

    // Set isScrolling immediately to block further events
    isScrolling = true;
    e.preventDefault();

    const sections = Array.from(document.querySelectorAll('section'));
    const current = sections.findIndex(sec => {
        const rect = sec.getBoundingClientRect();
        return rect.top <= 10 && rect.bottom > window.innerHeight/2;
    });

    if (e.deltaY > 0 && current < sections.length - 1) { // Scroll down
        sections[current + 1].scrollIntoView({behavior: "smooth"});
    } else if (e.deltaY < 0 && current > 0) { // Scroll up
        sections[current - 1].scrollIntoView({behavior: "smooth"});
    }
    setTimeout(() => { isScrolling = false; }, 800);
}, { passive: false });