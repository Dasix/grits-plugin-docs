var _ = require("lodash");
var moment = require("moment");

module.exports = function( chunk, context, bodies, params ) {

	var cfg = {};
	initGlobalStore();
	global._timelineHelperStore.count++;

	if( params.id === undefined ) {
		cfg.id = global._timelineHelperStore.count + "";
	} else {
		cfg.id = params.id;
	}

	if( params.classPrefix === undefined ) {
		cfg.classPrefix = "tlhelper-";
	} else {
		cfg.classPrefix = params.classPrefix;
	}

	if( params.from === undefined ) {
		cfg.from = null;
	} else {
		cfg.from = params.from;
	}

	if( params.view === undefined ) {
		cfg.view = "month";
	} else {
		cfg.view = params.view;
	}

	// Return the chunk to prevent HTML sanitization
	return chunk.tap(function(data) {

		cfg.data = data;

		return createTimeline( cfg );
	}).render(bodies.block, context).untap();

};

function initGlobalStore() {

	if( global._timelineHelperStore === undefined ) {
		global._timelineHelperStore = {
			count: 0,
			data: {}
		}
	}

}

function createTimeline( cfg ) {

	var timeline = {};
	var str = "";
	var dtFirst, dtLast, bounds, totalDays, labels;

	timeline.items = parseDateData( cfg.data );

	dtFirst = getFirstDate( timeline.items );
	dtLast = getLastDate( timeline.items );

	bounds = getTimelineBounds( timeline.items, cfg );

	_.each( timeline.items, function( item ) {

		item.x = calcDateX( item.start, bounds );

		if( item.end === null ) {
			item.w = 0;
		} else {
			item.w = calcDateW( item.start, item.end, bounds );
		}

	});

	// --

	totalDays = bounds.days;

	str += cfg.data;

	labels = getTimelineLabels( bounds, cfg );

	timeline.labels = labels;
	timeline.bounds = bounds;

	return renderTimeline( timeline, cfg );

	//return "<pre>" + str + "</pre>";

}

function debugDates( arrItems ) {

	_.each( arrItems, function( item ) {

		var format = "MMM DD, YYYY";
		var strStart = item.start.format( format );
		var strEnd, strFinal;

		if( item.end !== null ) {
			strEnd = item.end.format( format );
			strFinal = strStart + " -> " + strEnd;
		} else {
			strEnd = _.repeat(" ", format.length);
			strFinal = strStart + " *  " + strEnd;
		}

	});

}

function renderTimeline( timeline, cfg ) {

	var classPrefix = cfg.classPrefix;
	var html = "";

	html += "<div class='" + classPrefix + "outer'>";
	html += "<div class='" + classPrefix + "inner'>";

	html += "<div class='" + classPrefix + "labels-outer'>";
	html += renderEntities( timeline.labels, classPrefix + "label-" + cfg.view, false, cfg );
	html += "</div>";

	html += "<div class='" + classPrefix + "items-outer'>";
	html += renderEntities( timeline.items, classPrefix + "item", true, cfg );
	html += "</div>";

	html += "</div>";
	html += "</div>";

	return html;

}

function renderEntities( arrEntities, cls, divideIntoRows, cfg ) {

	var html = "";
	_.each( arrEntities, function( entity ) {

		if( divideIntoRows ) {
			html += "<div class='" + cfg.classPrefix + "entity-row'>";
		}

		html += renderEntity( entity, cls, cfg );

		if( divideIntoRows ) {
			html += "</div>";
		}

	});
	return html;

}

function renderEntity( entity, cls, cfg ) {

	var html = "";
	var entityType, half, classes, caption, styles, approxWidth;

	if( entity.type === undefined || entity.type === null ) {
		entity.type = "generic";
	}

	if( entity.x > 50 ) {
		half = "second";
	} else{
		half = "first";
	}

	classes = cls + " " + cfg.classPrefix + "entity-" + entity.type + " " + cfg.classPrefix + half + "-half";

	styles = "left: " + entity.x + "%;";

	if( entity.w !== undefined && entity.w !== null && entity.w !== 0 ) {
		styles += " width: " + entity.w + "%;"
		approxWidth = Math.floor( entity.w / 10 ) * 10;
		classes += " " + cfg.classPrefix + "entity-size-" + approxWidth;
	} else {
		classes += " " + cfg.classPrefix + "no-width";
	}

	html = "<div class='" + classes + "' style='" + styles + "'>" + renderEntityInternals( entity, cfg ) + "</div>";
	return html;

}

function renderEntityInternals( entity, cfg ) {

	var html = "";
	var classes = cfg.classPrefix + "entity-inner";
	var caption, hasCaption;

	if( entity.caption !== undefined && entity.caption !== null ) {
		caption = entity.caption;
		hasCaption = true;
	} else {
		caption = "";
		classes += " " + cfg.classPrefix + "caption-empty";
		hasCaption = false;
	}

	console.log( entity );

	switch( _.trim( entity.type.toLowerCase() ) ) {

		case "span":

			if( entity.fg === undefined || entity.fg === null || entity.fg === "" ) {
				entity.fg = "#fff";
			}
			if( entity.bg === undefined || entity.bg === null || entity.bg === "" ) {
				entity.bg = "#2780E3";
			}

			html = caption;
			break;

		case "point":

			if( entity.icon === undefined || entity.icon === null || entity.icon === "" ) {
				entity.icon = "star";
			}

			if( entity.fg === undefined || entity.fg === null || entity.fg === "" ) {
				entity.fg = "#2780E3";
			}
			if( entity.bg === undefined || entity.bg === null || entity.bg === "" ) {
				entity.bg = "transparent";
			}

			html += "<div class='" + cfg.classPrefix + "point-icon'><span class='glyphicon glyphicon-" + entity.icon + "' aria-hidden='true'></span></div>";
			if( hasCaption ) {
				html += "<div class='" + cfg.classPrefix + "point-caption'>" + caption + "</div>";
			}
			html += "<div class='" + cfg.classPrefix + "point-date'>" + entity.start.format("MMM DD") + "</div>";
			break;

		default:
		case "label":
			return caption;

	}

	return "<div class='" + classes + "' style='color:" + entity.fg + "; background-color:" + entity.bg + ";'>" + html + "</div>";

}

function getTimelineBounds( arrItems, cfg ) {

	var dtFirst = getFirstDate( arrItems );
	var dtLast = getLastDate( arrItems );
	var dtStart = getBoundsEnd( dtFirst, cfg.view );
	var dtEnd = getBoundsStart( dtLast, cfg.view );

	return {
		start: dtStart,
		end: dtEnd,
		days: dtEnd.diff( dtStart, "days" )
	};

}

function getTimelineLabels( bounds, cfg ) {

	var view = cfg.view;
	var cur = {
		start: moment( bounds.start ).add(1,"s"),
		end: null
	};

	var labels = [];

	while( cur.start.isBetween( bounds.start, bounds.end ) ) {

		var next;

		switch( _.trim( view.toLowerCase() ) ) {

			default:
				cur.start = moment( cur.start ).startOf("month");
				cur.end = moment( cur.start ).endOf("month");
				cur.caption = cur.start.format("MMM YYYY");
				next = moment( cur.end ).add(1,"d");
				break;

		}

		cur.x = calcDateX( cur.start, bounds );
		cur.w = calcDateW( cur.start, cur.end, bounds );
		cur.type = "label";

		labels.push( cur );
		cur = {
			start: next,
			end: null
		};

	}

	return labels;

}

function calcDateX( dt, bounds ) {

	var distFromStart = dt.diff( bounds.start, "days" );
	return Math.round( ( distFromStart / bounds.days ) * 10000 ) / 100;

}

function calcDateW( dtStart, dtEnd, bounds ) {

	var x1, x2;

	if( dtStart === null || dtEnd === null ) {
		return 0;
	}

	x1 = calcDateX( dtStart, bounds );
	x2 = calcDateX( dtEnd, bounds );
	return Math.round( ( x2 - x1 ) * 100 ) / 100;

}

function getBoundsEnd( dt, view ) {

	var nue = moment( dt );

	switch( _.trim( view.toLowerCase() ) ) {

		case "month":
			return nue.startOf("month").add( -5, "days" );

		default:
			return nue;

	}

}
function getBoundsStart( dt, view ) {

	var nue = moment( dt );

	switch( _.trim( view.toLowerCase() ) ) {

		case "month":
			return nue.endOf("month").add( 5, "days" );

		default:
			return nue;

	}

}

function getFirstDate( arrItems ) {

	var cur = null;

	_.each( arrItems, function( item ) {

		if( cur === null ) {
			cur = item.start;
		} else {
			if( item.start < cur ) {
				cur = item.start;
			}
		}

	});

	return cur;

}

function getLastDate( arrItems ) {

	var cur = null;

	_.each( arrItems, function( item ) {

		var dtCompare;
		if( item.end === null ) {
			dtCompare = item.start;
		} else {
			dtCompare = item.end;
		}

		if( cur === null ) {
			cur = dtCompare;
		} else {
			if( dtCompare > cur ) {
				cur = dtCompare;
			}
		}

	});

	return cur;

}

function parseDateData( data ) {

	var lines = data.split("\n");
	var ret = [];

	_.each( lines, function( line ) {

		var res = parseDateLine( line );
		if( res !== null ) {
			res.original = line;
			ret.push( res );
		}

	});

	return ret;

}

function parseDateLine( line ) {

	var ret = {
		type: "point",
		caption: null,
		start: null,
		end: null
	};
	var colPosition, caption, tsData, attribs, tmp;

	if( !_.isString( line ) ) {
		return null;
	}

	line = _.trim( line );

	if( line.replace(/\s/g, "") === "" ) {
		return null;
	}

	if( _.startsWith( line, "//" ) || _.startsWith( line, "#" ) ) {
		return null;
	}

	tmp = getAttributesFromString( line );
	attribs = tmp.attribs;
	line = tmp.str;

	colPosition = line.indexOf(":");

	if( colPosition === -1 ) {
		caption = null;
		tsData = getTimespanData( line );
	} else {
		caption = _.trim( line.substr( ( colPosition + 1 ) ) );
		tsData = getTimespanData( line.substr( 0, colPosition ) );
	}

	if( tsData === null ) {
		return null;
	} else {
		tsData.caption = caption;

		_.each( attribs, function( attribVal, attribKey ) {
			tsData[ attribKey ] = attribVal;
		});

		return tsData;
	}
}

function getTimespanData( str ) {

	var tsType, gtPosition, dtStart, dtEnd;

	str = _.trim( str );

	gtPosition = str.indexOf(">");

	if( gtPosition === -1 ) {
		tsType = "point";
		dtStart = resolveDate( str );
		dtEnd = null;

		if( dtStart === null ) {
			return null;
		}

	} else {

		tsType = "span";
		dtStart = resolveDate( str.substr( 0, gtPosition ) );
		dtEnd = resolveDate( str.substr( ( gtPosition + 1 ) ) );

		if( dtStart === null || dtEnd === null ) {
			return null;
		}

		if( dtStart > dtEnd ) {
			var tmp = dtStart;
			dtStart = dtEnd;
			dtEnd = tmp;
		}

	}

	return {
		type: tsType,
		start: dtStart,
		end: dtEnd
	};

}

function resolveDate( str ) {

	var ret = null;
	var formats = [
		"MMM DD, YYYY",
		"YYYY-MM-DD",
		"MM/DD/YYYY",
		"MM/DD/YY",
		"MM-DD-YYYY",
		"MM-DD-YY"
	];
	str = _.trim( str );

	ret = moment.utc( str, formats );
	if( ret.isValid() === false ) {
		return null;
	} else {
		return ret;
	}

}

function getAttributesFromString( str ) {

	var ret = {
		str: str,
		attribs: {}
	};
	var parsed = "";
	var strAttribs = "";
	var spl, attribSplit;

	if( str.indexOf("[") === -1 || str.indexOf("]") === -1 ) {
		return ret;
	}

	spl = str.split("[");
	_.each( spl, function( part, partIndex ) {

		var spl2;
		if( part.indexOf("]") === -1 ) {
			parsed += part;
		} else {
			spl2 = part.split("]");
			strAttribs += "," + spl2[0];
			if( spl2[1] !== undefined ) {
				parsed += spl2[1];
			}
		}
	});

	ret.str = _.trim( parsed ).replace(/\s+/g, " ");

	attribSplit = strAttribs.split(",");
	_.each( attribSplit, function( attrib ) {
		var attribKey, attribVal, attribKv;
		if( attrib.indexOf(":") === -1 ) {
			attribKey = "id";
			attribVal = attrib;
		} else {
			attribKv = attrib.split(":");
			attribKey = _.trim( attribKv[0].toLowerCase() );
			attribVal = _.trim( attribKv[1] );
		}
		ret.attribs[ attribKey ] = attribVal;
	});

	return ret;

}
