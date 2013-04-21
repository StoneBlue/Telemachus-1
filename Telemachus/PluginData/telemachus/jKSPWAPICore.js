﻿var DATA_SIZE = 1000;
var UPDATE_INTERVAL = 300;
var IDLE_UPDATE_INTERVAL = 2000;
var SPLICE_SIZE = 10;
var SIG_FIG = 5;

function initKSPWAPIPoll(APIString, preUpdate, postUpdate, rawData){
	APIString = "datalink?" + APIString + "&p=p.paused"
    update();

	function update() {

		if (rawData.length > 1) {
			preUpdate(rawData);
		}

		readStream()
	}

	function readStream() {

		var callback = function(response, status){
			if (status == "success") {

				
			    d = $.parseJSON(response);

				if (!d.p) {
					postUpdate(rawData, d);
				}

				if (rawData.length > DATA_SIZE) {
					rawData.splice(1, SPLICE_SIZE);
				}

				t = setTimeout(function(){
					update();}, UPDATE_INTERVAL);	
			}
			else {
				document.writeln(response);
			}
		};

		$.get(APIString, callback).error(function() {
			rawData.length = 1;
			t = setTimeout(
				function(){update();}, IDLE_UPDATE_INTERVAL);
		});
	}
}

function KSPWAPICall(APIString, postUpdate){

	var callback = function(response, status){
			d = new Object();
			eval(response);
			postUpdate(d);
		};

	$.get(APIString, callback).error(function() {
			KSPAPILog("Command failed: " + APIString);
		}
	);
}

function sigFigs(n, sig) {

    var m = false;

    if (n < 0) {
        m = true;
        n = Math.abs(n);
    }

    var mult = Math.pow(10,
        sig - Math.floor(Math.log(n) / Math.LN10) - 1);

    if (m) {
        n = n * -1;
    }

    return Math.round(n * mult) / mult;
}

function KSPAPILog(msg) {
    setTimeout(function() {
        throw new Error("[jKSPWAPI]" + msg);
    }, 0);
}