document.addEventListener("DOMContentLoaded", function() {
    function sceneSelectByHashValue(){
        console.log(location.hash)
        let sceneName = location.hash.replace('#','');
        if(sceneName == ''){
            return;
        }

        if(SCG.scenes.cachedScenes[sceneName] != undefined)
            SCG.scenes.selectScene(sceneName);
        else 
            return;
    }

    SCG.globals.version = 0.1;

    SCG.src = { 
        
    }
    
    SCG.scenes.cacheScene(new NightStairs3Scene({
        name:'nightstairs3',
        viewport: new V2(160,200)
    }));

    SCG.main.startV2('nightstairs3');

    window.addEventListener("hashchange", sceneSelectByHashValue, false);
});