class Setting {
    author = "Salvatore Amaddio R.";
    meta = document.createElement('meta');
    iconLink = document.createElement('link');
    SAR = ['SAR.js',           
          ];

    DefCSS = ["css/wrapper.css",
              "css/commonStructure.css",
              "css/navbar.css",
              "MediaQuery/MQcommonStructure.css",
              "MediaQuery/MQnavBar.css"
            ];

    constructor()
    {
        this.setSAR();
        this.setAuthor();
        this.setIcon();
        this.setDefaultCSS();
    }

    setSAR()
    {
        let script;
        for(let i=0; i < this.SAR.length; i++) 
        {
            script = document.createElement('script');
            script.setAttribute('src',`js/${this.SAR[i]}`);
            try 
            {
                document.body.appendChild(script);
            } catch {}
        }
    }

    setAuthor()
    {
        this.meta.name = "author";
        this.meta.content = this.author;
        document.head.appendChild(this.meta);
    }

    setIcon()
    {
        this.iconLink.rel = 'icon';
        this.iconLink.href = 'img/logo.ico';
        document.head.appendChild(this.iconLink);
    }

    setDefaultCSS(){
        let link;
        for(let i=0; i < this.DefCSS.length; i++) 
        {
            link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = this.DefCSS[i];
            document.head.appendChild(link)    
        }
    }

}

new Setting();
