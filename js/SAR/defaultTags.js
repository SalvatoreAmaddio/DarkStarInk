class DefaultTags {
    #author = "Salvatore Amaddio R.";
    #meta = document.createElement('meta');
    #iconLink = document.createElement('link');
    #scripts = ['SAR/SAR','SAR/carousel','SAR/defaultPage'];

    #defCSS = ["defaults/wrapper",
              "defaults/commonStructure",
              "defaults/navbar",
            ];

    constructor(...additionalScripts)
    {
        for(let i=0; i < additionalScripts.length; i++)
        {   
            this.#scripts.push(additionalScripts[i]);
        }
        
        this.#setScripts();
        this.#setAuthor();
        this.#setIcon();
        this.#setDefaultCSS();
    }


    #setScripts()
    {
        let script;
        for(let i=0; i < this.#scripts.length; i++) 
        {
            script = document.createElement('script');
            script.type = "application/javascript";
            script.src=`js/${this.#scripts[i]}.js`;
            if (i <= 2) 
            {
                document.head.appendChild(script);
            } else 
            {
                document.body.appendChild(script);
            }
        }
    }

    #setAuthor()
    {
        this.#meta.name = "author";
        this.#meta.content = this.#author;
        document.head.appendChild(this.#meta);
    }

    #setIcon()
    {
        this.#iconLink.rel = 'icon';
        this.#iconLink.href = 'img/logo.ico';
        document.head.appendChild(this.#iconLink);
    }

    #setDefaultCSS()
    {
        let link;
        for(let i=0; i < this.#defCSS.length; i++) 
        {
            link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `css/${this.#defCSS[i]}.css`;
            document.head.appendChild(link);    
        }
    }

}
