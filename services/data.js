const datas = [
  ['com.ebao.life.claim.bat.special.PaymentChangeDAO', 'confirmWithdrawBill'],
  ['com.ebao.life.claim.bat.special.PaymentChangeDAO', 'confirmBankTransfer'],
  ['com.ebao.life.claim.bat.end.BatchPrintDAO', 'updatePrintParam'],
  ['com.ebao.life.claim.std.end.EndPrintPDFBean', 'createBatchXmlNotice_2'],
  ['com.ebao.ls.clm.data.query.accutor.AccutorParamDao', 'writeTextToClob'],
  ['com.ebao.life.claim.bat.payment.batchpaystyle.BatchPayStyleDAO', 'savePayStyle'],
  ['com.ebao.life.claim.bat.payment.batchpaystyle.BatchPayStyleDAO', 'saveTransDetail'],
  ['com.ebao.life.claim.bat.payment.transfercheck.TransferCheckDAO', 'saveCheckDesc'],
  ['com.ebao.life.claim.bat.payment.batchpaystyle.BatchPayStyleDAO', 'saveTransStyle'],
  ['com.ebao.life.claim.bat.payment.batchpaystyle.BatchPayStyleDAO', 'upLoadFailAccount'],
  ['com.ebao.life.claim.bat.payment.transfercheck.TransferCheckDAO', 'saveCheckBack'],
  ['com.ebao.life.claim.bat.payment.batchpaystyle.BatchPayStyleDAO', 'Update_PayModeArr'],
  ['com.ebao.life.claim.bat.payment.batchpaystyle.BatchPayStyleDAO', 'Update_PayMode'],
  ['com.ebao.life.claim.bat.payment.batchpaystyle.BatchPayStyleDAO', 'upLoadFile'],
  ['com.ebao.life.claim.bat.payment.transfercheck.TransferCheckDAO', 'checkPass'],
  ['com.ebao.life.claim.bat.special.PaymentChangeBean', 'confirmPayModeSwitch'],
  ['com.ebao.life.claim.std.common.RejectCodeDefineBean', 'addReject'],
  ['com.ebao.life.claim.std.common.RejectCodeDefineBean', 'updateReject'],
  ['com.ebao.life.claim.std.common.RejectCodeDefineBean', 'removeReject'],
  ['com.ebao.life.claim.bat.audit.AuditDisposal', 'subscriveDownLoad'],
  ['com.ebao.life.claim.std.printSurvey.PrintSurveyDisposal', 'disposeSearch'],
  ['com.ebao.life.claim.std.printSurvey.PrintSurveyBean', 'findWarrantList'],
  ['com.ebao.ls.clm.data.impl.dao.TLiabAccutorDefDao', 'insert'],
  ['com.ebao.ls.clm.data.impl.dao.TLiabAccutorDefDao', 'update'],
  ['com.ebao.ls.clm.data.query.accutor.LiabAccutorDefDao', 'removeLiabAccutorDef'],
  ['com.ebao.life.claim.bat.payment.batchpaystyle.BatchPayStyleDAO', 'commitFile'],
  ['com.ebao.life.claim.std.special.SpecialDAO', 'releaseOther'],
  ['com.ebao.life.claim.std.common.HospitalCodeDefineBean', 'updateHospital'],
  ['com.ebao.life.claim.std.common.HospitalCodeDefineBean', 'removeHospital'],
  ['com.ebao.life.claim.std.medicaldivisionsingle.MedicalDivisionSingleBean', 'createXmlPay'],
  ['com.ebao.life.claim.std.common.HospitalCodeDefineBean', 'addHospital'],
  ['com.ebao.life.claim.std.hi.dataupload.DataUploadDAO', 'writeUploadRecord'],
  ['com.picc.dao.medicalcard.MedicardChargeDAO', 'updateMedSysClaim'],
  ['com.ebao.life.claim.bat.end.BatchPrintBean', 'createBatchXmlNotice'],
  ['com.ebao.life.claim.bat.register.RegisterServlet', 'insertTest'],
  ['com.ebao.life.claim.common.LockAndUnlockPolicyDAO', 'setProductUnSuspended'],
  ['com.ebao.life.claim.bat.subscribe.SubscribeBean', 'setPolicyUnsuspend'],
  ['com.ebao.life.claim.bat.audit.AuditDAOImpl', 'LockPolicyProduct'],
  ['com.ebao.life.claim.bat.subscribe.OracleSubscribeDAO', 'setPolicyUnsuspend'],
  ['com.ebao.life.claim.std.hi.datamigrate.ClaimDataMigrDAO', 'lockPolicy'],
  ['com.ebao.ls.clm.ds.aduit.accumu.AccumuLateDSImpl', 'maintainContractAccutorParam'],
  ['com.ebao.life.claim.std.common.organchiefclaim.OrganChiefClaimConfigDAO', 'updateOrganClaim'],
  ['com.ebao.life.claim.std.printSurvey.PrintSurveyBean', 'batchPrintPDFWarrant2'],
  ['com.ebao.life.claim.std.inspection.InspectionDisposal', 'downloadExcel'],
  ['com.ebao.life.claim.std.common.organchiefclaim.OrganChiefClaimConfigDAO', 'removeByOrganId'],
  ['com.ebao.life.claim.std.inspection.InspectionDisposal', 'downloadIndividualExcel'],
  ['com.ebao.life.claim.relativity.specification.impl.StartPayAnnuitySpec', 'getStartPayAnnuity'],
  ['com.ebao.ls.clm.data.query.accutor.AccutorParamDao', 'removeAccutorParam'],
  ['com.ebao.ls.clm.data.impl.dao.TAccutorChainDao', 'insert'],
  ['com.ebao.ls.clm.data.impl.dao.TAccutorChainDao', 'deleteByInputAccutor'],
  ['com.ebao.ls.clm.data.impl.dao.TAccutorChainDao', 'update'],
  ['com.ebao.ls.clm.data.impl.dao.TAccutorBenefitDao', 'insert'],
  ['com.ebao.ls.clm.data.query.accutor.AccutorBenefitDao', 'updAccuBene'],
  ['com.ebao.ls.clm.data.query.accutor.AccutorBenefitDao', 'removeAccuBene'],
  ['com.ebao.ls.clm.data.impl.dao.TAccutorDao', 'insert'],
  ['com.ebao.ls.clm.data.impl.dao.TAccutorDao', 'update'],
  ['com.ebao.life.claim.std.accrisk.AccRiskClaimQueryUtils', 'deleteLogRecord'],
];

// eslint-disable-next-line no-multi-assign
module.exports = exports = datas;
