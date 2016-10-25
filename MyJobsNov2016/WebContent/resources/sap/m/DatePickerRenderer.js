/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Renderer','./InputBaseRenderer'],function(q,R,I){"use strict";var D=R.extend(I);D.addOuterClasses=function(r,d){r.addClass("sapMDP");if(d.getEnabled()&&d.getEditable()){r.addClass("sapMInputVH");}};D.writeInnerContent=function(r,d){if(d.getEnabled()&&d.getEditable()){var c=["sapMInputValHelpInner"];var a={};a["id"]=d.getId()+"-icon";a["tabindex"]="-1";a["title"]=null;r.write('<div class="sapMInputValHelp">');r.writeIcon("sap-icon://appointment-2",c,a);r.write("</div>");}};D.writeInnerValue=function(r,d){r.writeAttributeEscaped("value",d._formatValue(d.getDateValue()));};D.writeInnerAttributes=function(r,d){if(d._bMobile){r.writeAttribute("readonly","readonly");}};D.getAriaRole=function(d){return"combobox";};D.getDescribedByAnnouncement=function(d){var b=I.getDescribedByAnnouncement.apply(this,arguments);return sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("DATEPICKER_DATE_TYPE")+" "+b;};D.getAccessibilityState=function(d){var a=I.getAccessibilityState.apply(this,arguments);a["multiline"]=false;a["autocomplete"]="none";a["haspopup"]=true;a["owns"]=d.getId()+"-cal";if(d._bMobile&&d.getEnabled()&&d.getEditable()){a["readonly"]=false;}return a;};return D;},true);
