
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
