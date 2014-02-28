var solution = {};
// #1

// Given structure in attrStructure:
//  {
//    tag: "",
//    value: "",
//    attr: [
//      {"tag": "", value:""},{"tag":"", "value":""}
//    ]
//  }

// convert into structure that looks like: 
//  {
//    "tag": "value",
//    "attr": {
//      "tag": "value"
//    }
//  }
//  eg. 
//  {
//    "(0008,002A)": "20130318124132"
//  }
var attrStructure = {"tag": "(0008,0018)", "value": "1.3.51.0.7.1193286233.9961.33088.48048.47436.15671.21980", "attr": [
    {"tag": "(0008,002A)", "value": "20130318124132"},
    {"tag": "(0008,0020)", "value": "20130318"},
    {"tag": "(0008,0030)", "value": "123650"},
    {"tag": "(0008,0018)", "value": "1.3.51.0.7.1193286233.9961.33088.48048.47436.15671.21980"},
    {"tag": "(0008,0060)", "value": "CR"},
    {"tag": "(0008,103E)", "value": "SUNRISE VIEW"},
    {"tag": "(0018,0015)", "value": "KNEE"},
    {"tag": "(0018,1164)", "value": "0.1\\0.1"},
    {"tag": "(0018,5101)", "value": "AP"},
    {"tag": "(0020,0013)", "value": "2"},
    {"tag": "(0020,0020)", "value": "L\\F"},
    {"tag": "(0028,0030)", "value": "0.10000000149011\\0.10000000149011"},
    {"tag": "(0028,1052)", "value": "0"},
    {"tag": "(0028,1053)", "value": "1"},
    {"tag": "(0028,1054)", "value": "LOG_E REL"},
    {"tag": "(0028,0101)", "value": "12"},
    {"tag": "(0028,0010)", "value": "2328"},
    {"tag": "(0028,0011)", "value": "2928"},
    {"tag": "(0008,1030)", "value": "Femur Knee Leg"},
    {"tag": "(0010,0010)", "value": "BEAN^ELENA"},
    {"tag": "(0010,0020)", "value": "690100"},
    {"tag": "(0010,0030)", "value": "19400826"},
    {"tag": "(0010,0040)", "value": "F"},
    {"tag": "(0010,4000)", "value": "L KNEE"}
]};

function solveQ1() {
    var result1Structure = [];
    for (var elementKey in attrStructure.attr) {
        var listEntry = {};
        var element = attrStructure.attr[elementKey];

        listEntry[attrStructure.tag] = attrStructure.value;
        var tagName = element.tag;
        var value = element.value;
        var attrEntry = {};
        attrEntry[tagName] = value;
        listEntry["attr"] = attrEntry;
        result1Structure.push(listEntry);
    }
    return result1Structure;
}

var startDepth = 1;
var contentArea = document.getElementById("id_content1");
var resultQ1 = solveQ1();

function createTree(container, workingSet, depth) {
    var currentContainer = container;
    for (var key in workingSet) {
        if (workingSet[key].constructor === Object) {
            var level = depth + 1;
            currentContainer = createNode(currentContainer, key, depth)
            createTree(currentContainer, workingSet[key], level);
        }
        else {
            currentContainer = createNode(currentContainer, key, depth);
            var level = depth + 1;
            createNode(currentContainer, workingSet[key], level);
        }
    }
}

function createNode(parent, content, depth) {
    if (depth === startDepth) {
        return parent;
    }
    var divElement = document.createElement("div");
    divElement.innerHTML = "<h" + depth + ">" + content + "</h" + depth + ">";
    parent.appendChild(divElement);
    return divElement;
}

function toggleSiblings() {

    var element = $(this)[0];
    while (element.nextElementSibling != undefined) {
        var element = element.nextElementSibling;
        if (element.style.display == '' || element.style.display == 'block') {
            element.style.display = 'none';
        } else {
            element.style.display = 'block';
        }
    }

}

createTree(contentArea, resultQ1, startDepth);
$(document).ready(function () {
    $("h2").on("click", toggleSiblings);
    $("h3").on("click", toggleSiblings);
});
// test that your structure is correct - use qUnit or any other test framework in an external file

// -> see test.html

// loop through the above data structure and create a tree-like output on the screen.
// You can use jQuery to attach event handlers for hiding/showing nodes in the tree.


// #2

// given the text in the variable "corpus", write the following:
var corpus = "The ship drew on and had safely passed the strait, which some volcanic shock has made between the Calasareigne and Jaros islands; had doubled Pomegue, and approached the harbor under topsails, jib, and spanker, but so slowly and sedately that the idlers, with that instinct which is the forerunner of evil, asked one another what misfortune could have happened on board. However, those experienced in navigation saw plainly that if any accident had occurred, it was not to the vessel herself, for she bore down with all the evidence of being skilfully handled, the anchor a-cockbill, the jib-boom guys already eased off, and standing by the side of the pilot, who was steering the Pharaon towards the narrow entrance of the inner port, was a young man, who, with activity and vigilant eye, watched every motion of the ship, and repeated each direction of the pilot.";


function getWordMap(rawString) {

    var splitArray = rawString.replace(/ |,|-|\.|\?|\!/g, " ").split(' ')
    var holder = {}
    for (var i in splitArray) {
        var word = splitArray[i];
        if (word != '') {

            if (holder.hasOwnProperty(word)) {
                holder[word] += 1;
            } else {
                holder[word] = 1;
            }
        }
    }
    return holder;
}

function getWordFrequencyList(wordMap) {
    var resultList = [];
    for (var element in wordMap) {
        resultList.push(wordMap[element]);
    }
    return resultList;
}

function getWordFrequencyListWithWords(wordMap) {
    var resultList = [];
    for (var element in wordMap) {
        resultList.push(element + " - " + wordMap[element]);
    }
    return resultList;
}

//var helperMap = getWordMap(corpus);
//var frequencyList = getWordFrequencyList(helperMap);

$(document).ready(function () {
    $('#whatfreq, #whatwords, #sortasc, #sortdesc').change(reactOnChange);
});

function reactOnChange(evt){
    cleanContainer2();
    var whatToShow = $("input[name=what]:checked").val();
    var sorting = $("input[name=sort]:checked").val();
    var helperMap = getWordMap(corpus);
    var showingList;

    var container = document.getElementById("id_content2");
    if (whatToShow == 'freq') {
        showingList = getWordFrequencyList(helperMap);

        if(sorting == 'asc'){
            showingList.sort(function(a,b){return a-b});
        }else if(sorting == 'desc'){
            showingList.sort(function(a,b){return b-a});
        }

    } else {
        showingList = getWordFrequencyListWithWords(helperMap);
        if(sorting == 'asc'){
            showingList.sort(function(a, b) {
                if (a.toLowerCase() < b.toLowerCase()) return -1;
                if (a.toLowerCase() > b.toLowerCase()) return 1;
                return 0;
            });
        }else if(sorting == 'desc'){
            showingList.sort(function(a, b) {
                if (a.toLowerCase() < b.toLowerCase()) return 1;
                if (a.toLowerCase() > b.toLowerCase()) return -1;
                return 0;
            });
        }
    }


    for(var itemKey in showingList){
        createNode(container, showingList[itemKey], 7);
    }
}

function cleanContainer2(){
    $("#id_content2").html("");
}

reactOnChange(undefined);

// 1. calculate word frequency in the input text collection. Separators include [ ,-.?!]
// 2. show word frequency in descending order and ascending order, based on a radio button in index.html
// 3. show words in alphabetical order and reverse alphabetical order, with word frequency, based on a radio button in index.html
// 4. ensure that browser does not block when calculating these frequencies


// #3
//
// the key here is to allow for async, non-blocking processing while executing the callback only once, only once ALL async calls have completed.
// 
// Execute all of the following using JSONP with Jquery (or whatever you wish)

// 1. do a search on google for "twitter patients" (https://www.google.com/search?q=twitter+patients&safe=off)
// 2. for the first 10 of these, retrieve the twitter profile bio from their public profile page (twitter.com/{{handle}})
// 	a. the element to get is ".bio.profile-field"
// 3. as you get each of these, add them to the page, into a table with the following structure:
// 	<th>twitter handle</th>
// 	<th>twitter link</th>
// 	<th>twitter bio</th>
// 4. after all of these are retrieved and displayed, call a function into which you pass in the following data structure (JSON):
// 	a. make sure that the call contains data for all 10 twitter calls.
// 	[{handle: 'twitter handle', link: 'twitter link', bio: 'twitter bio'}, ...]
// 5. ensure that the last call is only called once, and only once all info has been both retrieved and output to the page.


// http://stackoverflow.com/questions/17207850/need-help-converting-to-twitter-api-v1-1-javascript
// --> Yes, sorry if it wasn't clear. Any attempts at a JavaScript only solution are 'hacky' and prone to error (and they're also much harder to work with).


//found on https://learn.jquery.com/ajax/working-with-jsonp/

// Using YQL and JSONP
$.ajax({
    url: "http://query.yahooapis.com/v1/public/yql",

    // the name of the callback parameter, as specified by the YQL service
    jsonp: "callback",

    // tell jQuery we're expecting JSONP
    dataType: "jsonp",

    // tell YQL what we want and that we want JSON
    data: {
        q: "select * from html where url=\"https://twitter.com/patientslikeme\"",
        format: "json"
    },

    // work with the response
    success: function( response ) {
        var possible_bio = getObjects(response, 'description', 0)
        console.log( JSON.stringify(possible_bio)); // server response
    }
});

function getObjects(obj, key, depth) {
    var objects = [];
    for (var i in obj) {

        //console.log("level: "+depth+" analyzing key:"+ i + " with " + obj[i]);

        if (obj[i] != undefined && (obj[i].constructor === Object || obj[i].constructor === Array)) {
            var level = depth+1;
            objects = objects.concat(getObjects(obj[i], key, level));
        } else if (i == key) {
            objects.push(obj);
        }
    }
    return objects;
}