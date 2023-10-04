class ImgResizer 
{
    #parentContainer;
    #img = new Image();
    #canvas;
    #context;

    constructor(src, canvas, container)
    {
        this.#parentContainer=container;
        this.#canvas=canvas;
        this.#context = this.#canvas.getContext("2d");
        this.#img.onload=()=>{this.#resize();};
        this.#img.src=src;
        this.#onEvents();
    }

    set src(val)
    {
        this.#img.src=val;
    }

    #onEvents()
    {
        window.onresize=()=>{this.#resize();};
        window.onload=()=>{this.#resize();};
    }

    #resize()
    {
        this.#context.clearRect(0,0,this.#canvas.width, this.#canvas.height);
        this.#canvas.width = window.getComputedStyle(this.#parentContainer, null).getPropertyValue('width').replace('px', '').trim();
        this.#canvas.height = window.getComputedStyle(this.#parentContainer, null).getPropertyValue('height').replace('px', '').trim();
        this.#context.drawImage(this.#img, 0,0,this.#canvas.width, this.#canvas.height);
    }
}

class GoingTo {

    static next = new GoingTo(0)
    static prev = new GoingTo(1)
    static index = new GoingTo(2)

    constructor(id) 
    {
        this.id=id;
    }

    toString()
    {
        return this.id;
    }

}

class Carousel 
{
    #me;
    #carouselImgContainer;
    #carouselCanvas1;
    #carouselCanvas2;
    #prevButton;
    #nextButton;
    #images
    #tracker;
    #index=0;
    #interval=0;
    #timeout=0;
    #thumbnails=[];
    #pos1 = 0;
    #pos2 = -100;
    #isStopped = false;
    #speed=5;
    #holdingTime=3000;
    #resizer1;
    #resizer2;

    constructor(id,images)
    {
        this.#images=images
        this.#me=document.getElementById(id);
        this.#carouselImgContainer = document.getElementsByClassName("carouselImgContainer")[0];
        this.#carouselCanvas1 = this.#carouselImgContainer.children[0];
        this.#carouselCanvas2 = this.#carouselImgContainer.children[1];
        this.#carouselCanvas1.style.right =`${this.#pos1}%`;
        this.#carouselCanvas2.style.right =`${this.#pos2}%`;
        this.#resizer1 = new ImgResizer(this.#images[this.#index],this.#carouselCanvas1,this.#carouselImgContainer);
        this.#resizer2 = new ImgResizer(this.#images[this.#nextAvailableIndex()],this.#carouselCanvas2,this.#carouselImgContainer);
        this.#prevButton = this.#me.getElementsByClassName("prevButton")[0];
        this.#nextButton = this.#me.getElementsByClassName("nextButton")[0];
        this.#tracker = this.#me.getElementsByClassName("tracker")[0];
        this.#createThumbnail();
        this.#prevButton.addEventListener("click",()=>{this.#goTo(GoingTo.prev)});
        this.#nextButton.addEventListener("click",()=>{this.#goTo(GoingTo.next)});
        this.#start();
    }

    #activateThumbnail() 
    {
        for(let i=0; i < this.#thumbnails.length; i++) 
        {

            this.#thumbnails[i].classList.remove("currentThumbnail");
            if (i==this.#index) 
                this.#thumbnails[i].classList.add("currentThumbnail");
        }
    }

    #createThumbnail() 
    {
        let div;
        for(let i=0; i < this.#images.length; i++) 
        {
            div=document.createElement("div");
            div.className+="thumbnail";
            div.addEventListener("click",
            (e)=>
                {
                    this.#goTo(GoingTo.index, this.#thumbnails.indexOf(e.target));
                }
            );
            this.#thumbnails.push(div);
            this.#tracker.appendChild(div);
        }
    }

    #stop()
    {
        this.#isStopped = true;
        clearInterval(this.#interval);
        this.#carouselCanvas1.style.transition= "initial";
        this.#carouselCanvas2.style.transition= "initial";
        this.#pos1 = 0;
        this.#pos2 = -100;
        this.#carouselCanvas1.style.right =`${this.#pos1}%`;
        this.#carouselCanvas2.style.right =`${this.#pos2}%`;
    }

    #start()
    {
        this.#isStopped = false;
        this.#activateThumbnail();
        this.#carouselCanvas1.style.transition= `5ms`;
        this.#carouselCanvas2.style.transition= `5ms`;
        this.#interval = setInterval(()=>{this.#slide()}, this.#speed);            
    }

    #slide()
    {
        if (this.#pos1 == 100 && this.#pos2==0) 
        {
            this.#pos1=0;
            this.#pos2=-100;
            this.#incrementIndex();
            this.#resizer1.src = this.#images[this.#index];
            this.#resizer2.src = this.#images[this.#nextAvailableIndex()];
            this.#stop();
            this.#timeout = setTimeout(() => {this.#start()}, this.#holdingTime);
        }

        if (!this.#isStopped) 
        {
            this.#pos1++;
            this.#pos2++;
        }

        this.#carouselCanvas1.style.right =`${this.#pos1}%`;
        this.#carouselCanvas2.style.right =`${this.#pos2}%`;            
        this.#activateThumbnail();
    }

    #incrementIndex()
    {
        this.#index++;
        this.#correctIndex();
    }

    #decrementIndex()
    {
        this.#index--;
        this.#correctIndex();
    }

    #correctIndex()
    {
        if (this.#index >= this.#images.length) 
        this.#index=0;

        if (this.#index < 0) 
        this.#index = this.#images.length-1;
    }

    #nextAvailableIndex()
    {
        let i = this.#index+1;
        if (i>=this.#images.length) i=0;
        return i;
    }

    #goTo(goingTo, index=0)
    {  
        clearTimeout(this.#timeout)
        this.#stop();
        switch(goingTo) 
        {
            case GoingTo.next:
                this.#incrementIndex();
            break;
            case GoingTo.prev:
                this.#decrementIndex();                
            break;
            case GoingTo.index:
                this.#index = index;               
            break;
        }
        
        this.#resizer1.src = this.#images[this.#index];
        this.#resizer2.src = this.#images[this.#nextAvailableIndex()];
        this.#activateThumbnail();     
        this.#timeout = setTimeout(() => {this.#start()}, this.#holdingTime);
    }
}