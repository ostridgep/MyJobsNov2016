/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){'use strict';var T={};T.render=function(r,c){r.write('<div');r.writeControlData(c);r.addClass('sapTntToolPage');r.writeClasses();r.write('>');this.renderHeader(r,c);this.renderContentWrapper(r,c);r.write('</div>');};T.renderHeader=function(r,c){if(c.getAggregation('header')){r.write('<div id="'+c.getId()+'-header" class="sapTntToolPageHeader">');r.renderControl(c.getAggregation('header'));r.write('</div>');}};T.renderContentWrapper=function(r,c){var i=sap.ui.Device.system.tablet;var a=sap.ui.Device.system.phone;r.write('<div class="sapTntToolPageContentWrapper');if(a||i||!c.getSideExpanded()){r.write(' sapTntToolPageAsideCollapsed');}r.write('">');this.renderAsideContent(r,c);this.renderMainContent(r,c);r.write('</div>');};T.renderAsideContent=function(r,c){var i=sap.ui.Device.system.desktop;var s=c.getAggregation('sideContent');var a=c.getSideExpanded();r.write('<aside id="'+c.getId()+'-aside" class="sapTntToolPageAside">');r.write('<div class="sapTntToolPageAsideContent">');if(s&&s.getExpanded()!==a){s.setExpanded(a);}if(!i){c.setSideExpanded(false);}r.renderControl(s);r.write('</div>');r.write('</aside>');};T.renderMainContent=function(r,c){var m=c.getAggregation('mainContents');if(m){r.write('<div id="'+c.getId()+'-main" class="sapTntToolPageMain">');r.write('<div class="sapTntToolPageMainContent">');r.write('<div class="sapTntToolPageMainContentWrapper">');m.forEach(r.renderControl);r.renderControl();r.write('</div>');r.write('</div>');r.write('</div>');}};return T;},true);
