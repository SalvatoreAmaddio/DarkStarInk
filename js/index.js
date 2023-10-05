class Workgroup 
{
    #me;
    #dropdown;
    #workTitle;
    #pictureContainer;
    #openIcon="img/dropdown.png";
    #closeIcon="img/dropdownClose.png";
    #interval;
    #_heightRem=0;
    #_breakpoint=25;    
    #heightRem=0;
    #breakpoint=25;
    #speed=7;
    #pictureBoxes;

    constructor(dom)
    {
        this.#me = dom;
        this.#workTitle = this.#me.getElementsByClassName("workTitle")[0];
        this.#pictureContainer = this.#me.children[1];
        this.#pictureBoxes = this.#pictureContainer.children;
        this.#dropdown = this.#workTitle.children[1];
        this.#dropdown.addEventListener("click",()=>{this.#toggle();});
    }

    get #isPictureContainerHidden()
    {
        return window.getComputedStyle(this.#pictureContainer, null).display == "none";
    }

    get #stop()
    {
        return this.#_heightRem==this.#_breakpoint;
    }

    #toggle()
    {
        clearInterval(this.#interval);
        if (this.#isPictureContainerHidden) 
        {
            this.#_heightRem=this.#heightRem;
            this.#_breakpoint=this.#breakpoint;
            this.#dropdown.src=this.#closeIcon;
            this.#togglePictureContainer(true);
            this.#runAnimation(true);
            return;
        }
            this.#_heightRem=this.#breakpoint;
            this.#_breakpoint=this.#heightRem;
            this.#dropdown.src=this.#openIcon;
            this.#togglePictureBoxes(false);
            this.#runAnimation(false);
    }

    #togglePictureContainer(show) 
    {
         this.#pictureContainer.style.display = (show) ? "block" : "none";
    }

    #togglePictureBoxes(show)
    {
        for(let i=0; i < this.#pictureBoxes.length; i++) 
            this.#pictureBoxes[i].style.opacity= (show) ? 1 : 0;        
    }

    #runAnimation(dropDown)
    {
        this.#interval = setInterval(()=>{this.#animation(dropDown);},this.#speed);
    }

    #animation(mustIncrement)
    {
        if (this.#stop) 
        {
            clearInterval(this.#interval);
            this.#togglePictureContainer(mustIncrement);
            this.#togglePictureBoxes(mustIncrement);
            this.#pictureContainer.style.height=`initial`;
            return;
        }

        let h = (mustIncrement) ? ++this.#_heightRem : --this.#_heightRem;
        this.#pictureContainer.style.height=`${h}rem`;
    }
}

const dp = new DefaultPage("Dark Star Ink", 700.5);
const images = 
[
 "img/img1.jpg",
 "img/img2.jpg",
 "img/img3.jpg",
];

dp.addCarousel(new Carousel("carousel1", images));

const workgroups = document.getElementsByClassName("workGroup");
const form = document.getElementById("bookingForm");

for (let i=0; i < workgroups.length; i++) 
{
    new Workgroup(workgroups[i]); 
}

function submitForm() {
    
    form.submit();
    form.reset(); 
    return false;
 }
