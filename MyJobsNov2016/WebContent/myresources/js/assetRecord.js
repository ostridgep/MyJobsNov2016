function AssetRecord() {
   this.pkid = null;
   this.zascatAssetCategory = null;
   this.zproctyp = null;
   this.make = null;
   this.model = null;
   this.newMake = null;
   this.newModel = null;
   this.functionTypeZNCDESC = null;
   this.zinsLocDesc = null;
   this.zinsLocDesc1 = null;
   this.zinsLocDesc2 = null;
   this.zinsLocDesc3 = null;
   this.inbdtInstallDate = null;
   this.zzAssetTag = null;
   this.sergeSerialNumber = null;
   this.zcomments1 = null;
   this.zcomments2 = null;
   this.z_gpsNmea = null;
   this.zsysDescSystemCodeDescription = null;


    //Variables for Functional Location String
   this.originalFuncLocStringZINSTLOCN = null;//ZINSTLOCN
   this.funcLocStringZINSTLOCN = null;//ZINSTLOCN
   this.site = null;//Site short code
   this.processGroupZPRG = null;
   this.plantGroupCodeZplgrp = null;//this.funcLocSub10_3plantGroupCode = null;//Plant Group Code
   this.SystemCodeZSYSCODE = null;// FunctionalLocation.Substring(14, 2)
   this.SystemCodeNumber = null;// FunctionalLocation.Substring(16, 2)
  // this.funcLocSub19_22zzfl_nc = null;
   this.funcLocSub22_3FunctionTypeItemNumber = null;//FunctionalLocation.Substring(22, 3)
   this.AssetDescriptionZASSDESC = null;
   this.equipmentTypeDescriptionZOTDESC = null;

   this.zzfl_nc = null;//
  
   this.assetTypeZASSTYPE = null;
   
   this.equipmentTypeCodeZZEQPT_EGI = null;
   this.EquipmentDescriptionEQKTU = null;
   this.EQUNR = null;
   this.ZIWERK = null;
   this.plantGroupDescriptionZPLGDESC = null;
   this.STATUS = null;
   this.maintenancePlantZSWERK = null;
    //variables not saved in database:
   this.businessUnit = null;
   this.originalZinsLocDesc = null;
   this.assetTypeCodeDescriptionZATDESC = null;
   this.assetTypeCodeZATCODE = null;
   this.ZotDef = null;
   this.parentFlStringZPARLOCN = null;
   this.parentRecordNumberZPARECNUM = null;
   this.recordNumberZRECNUM = null;
   this.parentEquipmentNumberZPEQUNR = null;
   this.ZSURV = null;

   this.ZsiteDesc = null;
   this.Zdecom = null;
   this.Zdecomr = null;
   this.Zeqdecom = null;
   this.Erfzeit = null;
   this.Termab = null;
   this.Ernam = null;
   this.Zowner = null;
   this.Zcomflg = null;
    // this.Zsern1 = null;//Duplicate of SERGE ?
   this.Zdocflg = null;
   this.StatusProfile = null;
   this.Estat = null;
   this.StatusTxt = null;
   this.Zdocpath = null;
   this.ZcapSurv = null;
   this.Zproj = null;
   this.ZcheckOut = null;
   this.ZchkoutBy = null;
   this.ZchkoutDate = null;
   this.Deleted = null;
   this.processGroupDescriptionZprgdesc = null;

}

function resetAssetRecord(theRecord) {
    theRecord.pkid = null;
    theRecord.zascatAssetCategory = null;
    theRecord.zproctyp = null;
    theRecord.make = null;
    theRecord.model = null;
    theRecord.newMake = null;
    theRecord.newModel = null;
    theRecord.functionTypeZNCDESC = null;
    theRecord.zinsLocDesc = null;
    theRecord.zinsLocDesc1 = null;
    theRecord.zinsLocDesc2 = null;
    theRecord.zinsLocDesc3 = null;
    theRecord.inbdtInstallDate = null;
    theRecord.zzAssetTag = null;
    theRecord.sergeSerialNumber = null;
    theRecord.zcomments1 = null;
    theRecord.zcomments2 = null;
    theRecord.z_gpsNmea = null;
    theRecord.zsysDescSystemCodeDescription = null;
    
    //Variables for Functional Location String
    theRecord.originalFuncLocStringZINSTLOCN = null;//ZINSTLOCN . If we are editing,copying or Create after decom, this will be the original FL
    theRecord.funcLocStringZINSTLOCN = null;//ZINSTLOCN
    theRecord.site = null;//Site short code
    theRecord.processGroupZPRG = null;
    theRecord.plantGroupCodeZplgrp = null;//theRecord.funcLocSub10_3plantGroupCode = null;//Plant Group Code
    theRecord.SystemCodeZSYSCODE = null;// is also FunctionalLocation.Substring(14, 2)
    theRecord.SystemCodeNumber = null;// FunctionalLocation.Substring(16, 2)
  //  theRecord.funcLocSub19_22zzfl_nc = null;
    theRecord.funcLocSub22_3FunctionTypeItemNumber = null;//FunctionalLocation.Substring(22, 3)
    theRecord.AssetDescriptionZASSDESC = null;
    theRecord.equipmentTypeDescriptionZOTDESC = null;

    theRecord.zzfl_nc = null;//

    theRecord.assetTypeZASSTYPE = null;

    theRecord.equipmentTypeCodeZZEQPT_EGI = null;
    theRecord.EquipmentDescriptionEQKTU = null;
    theRecord.EQUNR = null;
    theRecord.ZIWERK = null;
    theRecord.plantGroupDescriptionZPLGDESC = null;
    theRecord.STATUS = null;
    theRecord.maintenancePlantZSWERK = null;
    //variables not saved in database:
    theRecord.businessUnit = null;
    theRecord.originalZinsLocDesc = null;
    theRecord.assetTypeCodeDescriptionZATDESC = null;
    theRecord.assetTypeCodeZATCODE = null;
    theRecord.ZotDef = null;
    theRecord.parentFlStringZPARLOCN = null;
    theRecord.parentRecordNumberZPARECNUM = null;
    theRecord.recordNumberZRECNUM = null;
    theRecord.parentEquipmentNumberZPEQUNR =null;
    theRecord.ZSURV = null;
    theRecord.ZsiteDesc = null;
    theRecord.Zdecom = null;
    theRecord.Zdecomr = null;
    theRecord.Zeqdecom = null;
    theRecord.Erfzeit = null;
    theRecord.Termab = null;
    theRecord.Ernam = null;
    theRecord.Zowner = null;
    theRecord.Zcomflg = null;
    //theRecord.Zsern1 = null;//Duplicate of SERGE ?
    theRecord.Zdocflg = null;
    theRecord.StatusProfile = null;
    theRecord.Estat = null;
    theRecord.StatusTxt = null;
    theRecord.Zdocpath = null;
    theRecord.ZcapSurv = null;
    theRecord.Zproj = null;
    theRecord.ZcheckOut = null;
    theRecord.ZchkoutBy = null;
    theRecord.ZchkoutDate = null;
    theRecord.Deleted = null;
    theRecord.processGroupDescriptionZprgdesc = null;
}