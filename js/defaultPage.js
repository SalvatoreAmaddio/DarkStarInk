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
