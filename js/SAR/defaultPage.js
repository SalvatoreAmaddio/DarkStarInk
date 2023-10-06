class NavBar 
{
    #me;
    #hamburgerDropDown;
    #hamburger;
    #showNavBarAt = 0;
    #navLogo;
    #links;

    constructor(showNavBarAt=0)
    {
        this.#me = document.getElementById("navBar");
        this.#hamburgerDropDown = document.getElementById("hamburgerDropDown");
        this.#hamburger = document.getElementById("hamburger");
        this.#navLogo = document.getElementById("navBarLogo");
        this.#showNavBarAt=showNavBarAt;
        this.#links = this.#me.getElementsByTagName("a");
        this.#setMouseOverAnimation();
        window.addEventListener('click', (e)=>this.#clickOutsideBurgerDropdown(e));
        window.addEventListener('resize', ()=>this.#hideHamburgerDropDown());
        window.addEventListener('resize', () => this.#showNavLogo());
        window.addEventListener('scroll', () => this.#showNavLogo());
        this.#hamburger.addEventListener("click",()=>this.#toggleHamburgerDropDown());
    }

    #showNavLogo()
    {
        this.#navLogo.style.display = "none";
        let rect = this.#me.getBoundingClientRect();
        if (rect.top==0 && window.innerWidth >= this.#showNavBarAt) this.#navLogo.style.display = "block";
    }

    #toggleHamburgerDropDown()
    {
        this.#hamburgerDropDown.style.display 
        = 
        (this.#hamburgerDropDown.style.display=="block") ? "none" : "block";
    }

    #hideHamburgerDropDown()
    {
        this.#hamburgerDropDown.style.display= (window.innerWidth > this.#showNavBarAt) ? "block" : "none"
    }

    #clickOutsideBurgerDropdown(e)
    {
        switch(true) 
        {
            case IsNull(this.#hamburgerDropDown):
            case IsNull(this.#hamburger):
            case e.target.innerHTML.trim()=="MY WORK":
            return;
        }

        switch(false) 
        {
            case IsDisplayed(this.#hamburgerDropDown):
            case IsDisplayed(this.#hamburger):
            return;    
        }

        let clickedOnHamburger=this.#hamburger.contains(e.target);
        if (!clickedOnHamburger)
            Hide(this.#hamburgerDropDown);
    }

    #setMouseOverAnimation()
    {
        for(let i=0; i < this.#links.length; i++) 
        {
            this.#links[i].addEventListener("mouseover",()=>this.#loadAnimation(this.#links[i]));            
            this.#links[i].addEventListener("mouseout",()=>this.#unloadAnimation(this.#links[i]));            
        }
    }

    #loadAnimation(link)
    {
        try 
        {
            let span=link.parentNode.lastElementChild;
            let isSpan=span.tagName.toLowerCase() == 'span';
            if (!isSpan) return;
            span.className="animateSpan";       
        }
        catch {}
    }

    #unloadAnimation(link)
    {
        try 
        {
            let span=link.parentNode.lastElementChild;
            let isSpan=span.tagName.toLowerCase() == 'span';
            if (!isSpan) return;
            span.className="";
        }
        catch{}
    }
}

class DefaultPage 
{
    #pageTitle=document.title;
    #footer = document.getElementById("footer").children[0];
    #websiteName;
    #navBar; 
    #carousels = [];

    constructor(websiteName, showNavBarAt)
    {
        this.#websiteName = websiteName;
        this.#navBar = new NavBar(showNavBarAt);
        this.#updateCopirightYear();
    }

    get navBar()
    {
        return this.#navBar;
    }

    addCarousel(carousel)
    {
        this.#carousels.push(carousel);
    }

    #updateCopirightYear() 
    {
        this.#footer.textContent =`Copyright © ${new Date().getFullYear()} ${this.#websiteName} All rights reserved.`;
    }
}
