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
    
    SCG.scenes.cacheScene(new EveningWinterCourtyardScene({
        name:'eveningWinterCourtyard',
        viewport: new V2(113,200)
    }));

    SCG.main.startV2('eveningWinterCourtyard');

    window.addEventListener("hashchange", sceneSelectByHashValue, false);
});