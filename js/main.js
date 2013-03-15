/* Warren Morris 
   VFW 1303
   Project 3
*/


window.addEventListener("DOMContentLoaded", function () {



	// get element function
	function $ (x) {
		var element = document.getElementById(x);
		return element;
	}
	//get the checked state for radios
	function getMarked () {
		var marked = document.getElementsByName("bmarked");
		for (i=0, j=marked.length; i<j; i++) {
			if(marked[i].checked) {
				markedVal = marked[i].value;
			
			}
		}
	}
	//populate create and populate a select tag
	function popType () {
		var theform = $("addbike");
		var theli = $("bt");
		var theselect = document.createElement("select");
		theselect.setAttribute("id", "biketype");
		for(i=0, j=bikeTypes.length; i<j; i++){
			var bikeOption = document.createElement("option");
			var theOption = bikeTypes[i];
			bikeOption.setAttribute("value", theOption);
			bikeOption.innerHTML = theOption;
			theselect.appendChild(bikeOption);
		}		
		theli.appendChild(theselect);
				
	}
	// hides/shows display div
	function switchView (x) {
		switch(x){
			case "0": //form  visible
				$("addbike").style.display = "block";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "inline";
				$("ab").style.display = "none";
				$("bikes").style.display = "none";
                break;
			case "1": //form hidden
				$("addbike").style.display = "none";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "none";
				$("ab").style.display = "inline";
				break;
		}
	}

	function resetForm () {
		$("assembler").value = "";
		$("assdate").value = "";
		$("asstime").value = "1";
		$("asstext").innerHTML = "1";
		$("comments").value = "";
		$("biketype").selectedIndex = "0";
	
		
	}
	

	//clear local storage
	function dumpLocal () {
		localStorage.clear();
		alert('Bike list cleared');
	}

	//displaydata
	function showData () {
		if (localStorage.length<1) {
			$("ab").innerHTML = "Add bike";
		} else {
			
			$("ab").innerHTML = "Add another bike";
		}
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "bikes");
		var makeList = document.createElement("ul");
		/* makeList.setAttribute("class", "dd"); *///not used...
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("bikes").style.display = "block";
		for(var i=0, j=localStorage.length; i<j; i++){
	       var makeLi = document.createElement("li");
	       var linksLi = document.createElement("li");
	       if (i%2 === 0) {
	           makeLi.setAttribute("class", "altcolor");
	       }
	       makeList.appendChild(makeLi);
	       var key = localStorage.key(i);
	       var useless = localStorage.getItem(key);
	       var item = JSON.parse(useless);
	       var makeNextList = document.createElement("ul");
	       makeLi.appendChild(makeNextList);
	       for(var k in item){
	           var makeNextLi = document.createElement("li");
	           makeNextList.appendChild(makeNextLi);
	           makeNextLi.innerHTML = "<b>"+item[k][0]+"</b> "+item[k][1];
	           makeNextList.appendChild(linksLi);
	       }
	       /* makeItemControls(); */
	       
	       
	       /* this was the second part of my remove item by key
	       it just added an X to the bottom right, that was clickable and removed that item from the storage.
	       
	       var delLi = document.createElement("li");
	       delLi.setAttribute("id", key);
	       delLi.setAttribute("class", "deleteli");
	       delLi.innerHTML = "X";
	       var aEL = delLi;
	       aEL.addEventListener("click", removeBike(key));
	       makeNextList.appendChild(delLi);
	       */
	       
	       
        }
		switchView("1");
		
		
	}
	// Creates links for edit/delete items
	function makeItemControls () {
		var eLink = documtent.createElement("a");
		
		
		
	}
	
	//add to local storage
	function storeData () {
		getMarked();
		/* i have never been one to use a random number for a key without having a letter or something
		 at the front, which is why my key starts with a k. personal preference maybe, not sure but it 
		 makes more sense to me */
		var uid = "k" + Math.floor(Math.random()*123456);
		var bike = {};
		    bike.assembler = ["Assembler: ", $("assembler").value];
		    bike.date = ["Date: ", $("assdate").value];
		    bike.type = ["Type: ", $("biketype").value];
		    bike.marked = ["Marked: ", markedVal];
		    bike.time = ["Time: ", $("asstime").value];
		    bike.comments = ["Comments: ", $("comments").value];
		    
		localStorage.setItem(uid, JSON.stringify(bike));
		resetForm ();		
	}
	/*
	remove item by key - not needed for this project but wanted to see if i could figure it out.
	i did figure it out partially, but it was causing an issue with items not diplaying correctly 
	so i just didn't use it	also as a side note, it seems kind of like a halfassed method of 
	getting this done and i'm sure there has to be a more efficient way
	
	just to clarify, i was trying to remove it from the storage(which works perfectly) and also
	remove the visual data from the ul tag by having a clickable X on the item.
	*/
	function removeBike (k) {
		
		localStorage.removeItem(k);
		var liPoof = document.getElementById(k);
		liPoof.parentNode.removeChild(liPoof);
	}
	// variables & run functions
	
	/* i'm not really sure why we are doing the select portion dynamically, as if changes needed to be made
	it would be just as simple to change the html file and if the  javascript is done right there should be no need
	for extra coding to use the new option tag. */
	var bikeTypes = [
			"--Select Bike Type--",
			"BMX",
			"Mountain Bike",
			"Cruiser",
			"Road Bike"
	];
	
	var markedVal;
	popType();
	
	
	var displayData = $('displayLink');
	displayData.addEventListener("click", showData);
	var clearData = $('clear');
	clearData.addEventListener("click", dumpLocal);
	var save = $('submit');
	save.addEventListener("click", storeData);
	






});