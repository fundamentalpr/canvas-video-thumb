//----- canvas video media thumbnail enlager script -----------------
//-------------------------------------------------------------------
//----- By: Mark Van de Velde ---------------------------------------
//----- Thanks to James Jones for help with the MutationObserver ----
//----- For installation as Javascript in Canvas Theme editor -------
//----- Provided with no warranty! - test as required ---------------
//----- V1.2--11|2017 -----------------------------------------------

(function(){
  //identify lowest level item before expected changes
  var el=document.getElementById('wiki_page_show');
  if (el){
    //use new video player item for observer check
    var check = el.querySelectorAll('span.media_comment_thumbnail_play_button');
   	//locate main media eliment by class name [instructure_inline_media_comment]
	var mcID = document.getElementsByClassName('instructure_inline_media_comment');
    if (check.length>0){
      	// Canvas beat us to it, there's no need for an observer
	doYourThing(mcID);
    } else {
	//define observer
	var observer = new MutationObserver(function() {
        //need to define check and mcID again
	var check = el.querySelectorAll('span.media_comment_thumbnail_play_button');
	var mcID = document.getElementsByClassName('instructure_inline_media_comment');
	//once all videos have been mutated, then run update loop function doYourThing  
        if (check.length==mcID.length) {			
		doYourThing(mcID);
		//stop observer
		observer.disconnect();
	}
      });
	//start observation on defined items
      	observer.observe(el,{childList:true,subtree:true,});
    }
  }
  function doYourThing(mcID){
  //start loop to catch multiple video players on page 
  	for(var i=0;(i<mcID.length);i++){	
  		//locate the the videoplayer by selecting the medias first child (a span tag), 
		//update the background image from the media server using the id from the [media_comment_][m-xxxxx]
		//NOTE: the media server can be located using the Global JS variable: INST.kalturaSettings.resource_domain
		//---- in this case its: apse2.nv.instructuremedia.com
		mcID[i].firstChild.style='background-image:url("https://apse2.nv.instructuremedia.com/p/2/thumbnail/entry_id/'+mcID[i].id.split('media_comment_')[1]+'/width/540/height/320/bgcolor/000000/type/2/vid_sec/5");height:320px;width:540px;';		
  	}
  }
})();