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
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("bikes").style.display = "block";
		for(var i=0, j=localStorage.length; i<j; i++){
	       var makeLi = document.createElement("li");
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
	         
	       }
	        var linksLi = document.createElement("li");
	        makeNextList.appendChild(linksLi);
	        makeItemControls(key, linksLi);
	    }
		switchView("1");
		
		
	}
	// Creates links for edit/delete items
	function makeItemControls (key, linksLi) {
		var eLink = document.createElement("a");
		eLink.href = "#";
		eLink.key = key;
		var eText = "Edit Contact";
		eLink.addEventListener("click", editItem);
		eLink.innerHTML = eText; //not sure why we are using a variable here, seems redundant and adds one extra line of code
		linksLi.appendChild(eLink);
		
		
		var dLink = document.createElement("a");
		dLink.href = "#";
		dLink.key = key;
		var dText = "Delete Contact";
		dLink.addEventListener("click", deleteItem);
		dLink.innerHTML = dText;
	    linksLi.appendChild(dLink);
	}
	
	//add to local storage
	function storeData (key) {
		getMarked();
		/* i have never been one to use a random number for a key without having a letter or something
		 at the front, which is why my key starts with a k. personal preference maybe, not sure but it 
		 makes more sense to me */
		 
		if ($("submit").value == "Submit bike"){
		var uid = "k" + Math.floor(Math.random()*123456);
		
		} else {
			uid = key;
			console.log(uid);
		}
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

	//edit item
	function editItem () {
		var value = localStorage.getItem(this.key);
		var bike = JSON.parse(value);
		
		switchView("0");
		
		$("assembler").value = bike.assembler[1];
		$("assdate").value = bike.date[1];
		$("biketype").value = bike.type[1];
		$("asstime").value = bike.time[1];
		$("comments").value = bike.comments[1];
		var marked = document.forms[0].bmarked;
		
		// note to self: i don't think this is working the way it should be...come back to this
		for (i=0;i<marked.length; i++){
			if (marked[i].value == "yes" && bike.marked[1] == "yes"){
				marked[i].setAttribute("checked", "checked");
				
			} else if (marked[i].value == "no" && bike.marked[1] == "no"){
				
				marked[i].setAttribute("checked", "checked");
			}
			
		}
		save.removeEventListener("click", storeData);
		$("submit").value = "Edit Bike";
		var eSubmit = $("submit");
		eSubmit.addEventListener("click", checkBike);
		eSubmit.key = this.key;
	}
	
	//delete item
	function deleteItem () {
		
				
	}
	
	
	function checkBike (e) {
	
		var getAssembler = $("assembler");
		var getDate = $("assdate");
		var getType = $("biketype")
		
		eMsg.innerHTML = "";
		getType.style.border = "1px solid black";
		getAssembler.style.border = "1px solid black";
		getDate.style.border = "1px solid black";
		
		var errorMsgs = [];
		
		if (getType.value === "--Select Bike Type--") {
			var typeError = "Please choose a bike type.";
			getType.style.border = "1px solid red";
			errorMsgs.push(typeError);
		}
		
		if (getAssembler.value === "") {
			var assError = "Please enter Assemblers name."
			getAssembler.style.border = "1px solid red";
			errorMsgs.push(assError);
			
		}
		if (getDate.value === "") {
			var dateError = "Please enter a date."
			getDate.style.border = "1px solid red";
			errorMsgs.push(dateError);
			
		}
		/*I don't have an email field but for practice, adding the line from the video
			var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;			
		*/
		
		if (errorMsgs.length>=1) {
			for (i=0, j=errorMsgs.length; i<j; i++) {
				var txt = document.createElement("li");
				txt.innerHTML = errorMsgs[i];
				eMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		} else {
			$("bikes").innerHTML = "";
			storeData(this.key);
		}
		
	}

	// variables & run functions
	
	/* i'm not really sure why we are doing the select portion dynamically, as if changes needed to be made
	it would be just as simple to change the html file and if the javascript is done right, there should be no need
	for extra coding to use the new option tag. */
	var bikeTypes = [
			"--Select Bike Type--",
			"BMX",
			"Mountain Bike",
			"Cruiser",
			"Road Bike"
	];
	
	var markedVal;
	var eMsg = $("errors");
	popType();
	
	
	var displayData = $('displayLink');
	displayData.addEventListener("click", showData);
	var clearData = $('clear');
	clearData.addEventListener("click", dumpLocal);
	var save = $('submit');
	save.addEventListener("click", checkBike);
	






});