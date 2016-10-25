var oSwitchFlooding = new sap.m.Switch("Flooding_switch",{
				visible:false,
				state: false,
				customTextOn:"Yes",
				customTextOff:"No",
				width:"100%",
				change: function(evt){
					
					setCloseswitch()

			    }
			});



			var oSwitchPollution = new sap.m.Switch("pollution_switch",{
				visible:false,
				state: false,
				customTextOn:"Yes",
				customTextOff:"No",
				width:"100%",
					change: function(evt){
						
						setCloseswitch()

				    }
			});

			var oSwitchCustFeed = new sap.m.Switch("cust_feed_switch",{
				visible:false,
				state: false,
				customTextOn:"Yes",
				customTextOff:"No",
				width:"100%",
					change: function(evt){
						
						setCloseswitch()

				    }
			});			
var oLayout1 = new sap.ui.layout.form.GridLayout();
var oLayout1a = new sap.ui.layout.form.GridLayout();
              var oLayout2 = new sap.ui.layout.form.ResponsiveLayout();
              var oLayout3 = new sap.ui.layout.form.ResponsiveGridLayout();
              
              var Matrix_Close_Job_details = new sap.ui.commons.layout.MatrixLayout("DG51F1C2",{
                  //id : "matrix1",
         //layoutFixed : true,
               width : '800px',
             columns : 9,
              widths : ['80px', '10px', '70px','10px','120px','10px','80px','10px','250px'] });
         var oLabel_functional_location = new sap.ui.commons.Label({
         text : "Functional Location",TextDirection:"LTR"});
         oCell = new sap.ui.commons.layout.MatrixLayoutCell({
  			colSpan:3,
  		});
         var functional_location=new sap.m.Input("Close_FunctionalLocation",{type: sap.m.InputType.Input, enabled: true});
         oLabel_functional_location.setLabelFor(functional_location); 
         oCell.addContent(functional_location);
         var oLabel_problem_grp=new sap.ui.commons.Label({
          	text : "Problem Group" ,TextDirection:"LTR"});
         var problem_grp=new sap.m.Select('Close_ProblemGroup',{
        	 width:"250px",
             items: [
                    
             ],

             change: function(oControlEvent) {
                    //setCloseButtons(oControlEvent.getParameter("selectedItem").getKey())
                    BuildCloseProblemCodes(oControlEvent.getParameter("selectedItem").getKey(),"NOTSELECTED");
                    checkMandatedForms()
             }
      });
         problem_grp.setMaxWidth("250px");
         oLabel_problem_grp.setLabelFor(problem_grp); 
         Matrix_Close_Job_details.createRow(oLabel_functional_location,"", oCell,"",oLabel_problem_grp,"",problem_grp);
         var oLabel_equipment_id = new sap.ui.commons.Label({
         	text : "Equipment ID" ,TextDirection:"LTR"});
         oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({
   			colSpan:3,
   		});
         var equipment_id = new sap.m.Input("Close_Equipment",{type: sap.m.InputType.Input, enabled: true});
         oLabel_equipment_id.setLabelFor(equipment_id);
         oCell1.addContent(equipment_id);
         var oLabel_prob_code=new sap.ui.commons.Label({
           	text : "Problem Code" ,TextDirection:"LTR"});
         var prob_code=new sap.m.Select('Close_ProblemCode',{
        	 width:"250px",
             items: [
                    
             ],

             change: function(oControlEvent) {
             	checkMandatedForms()
             }
      });
         prob_code.setMaxWidth("250px");
         oLabel_prob_code.setLabelFor(prob_code);
         Matrix_Close_Job_details.createRow(oLabel_equipment_id,"",oCell1,"",oLabel_prob_code,"",prob_code );
         var oLabel_select_asset = new sap.ui.commons.Label({
         	text : "" });
         oCell2 = new sap.ui.commons.layout.MatrixLayoutCell({
    			colSpan:3,
    		});
         var select_asset=new sap.m.Button( {
        	 width:"160px",
             text: "Select Asset",
             type:     sap.m.ButtonType.Success,
             tap: [ function(oEvt) {  
             	SearchMode="CLOSE"
             		
             	formSearchAsset.open() 
             
             	
                         } ]
         });
         oLabel_select_asset.setLabelFor(select_asset); 
         oCell2.addContent(select_asset);
        var oLabel_Action_grp = new sap.ui.commons.Label({
         	text : "Action Group" ,TextDirection:"LTR"});
        var Action_grp=new sap.m.Select('Close_ActionGroup',{
        	 width:"250px",
            items: [
                   
            ],

            change: function(oControlEvent) {
                   
           	 BuildCloseActionCodes(oControlEvent.getParameter("selectedItem").getKey(),"NOTSELECTED");
           	 checkMandatedForms()
            }
     });
        Action_grp.setMaxWidth("250px");
        oLabel_Action_grp.setLabelFor(Action_grp); 
         Matrix_Close_Job_details.createRow(oLabel_select_asset,"", oCell2,"",oLabel_Action_grp,"",Action_grp);
         var oLabel_in_shift_time = new sap.ui.commons.Label({
         	text : "In Shift Time" ,TextDirection:"LTR"});
         
         var in_shift_time=new sap.m.DateTimeInput("Close_InShiftTime",{
				placeholder : "Time Picker",
					type : "Time",
					valueFormat : "HH:mm",
					value : "0:0",
					displayFormat : "H'h' m'm'",
					
				});
         oLabel_in_shift_time.setLabelFor(in_shift_time);
         var in_shiftcode=new sap.m.Select('Close_InshiftCode',{
        	 
             items: [
                    
             ],

             change: function(oControlEvent) {
                    
            	 //BuildCloseImpactCodes(oControlEvent.getParameter("selectedItem").getKey());
             }
      });
         //in_shiftcode.setMaxWidth("250px");
         var oLabel_action_code=new sap.ui.commons.Label({
          	text : "Action Code" ,TextDirection:""});
         var action_code=new sap.m.Select('Close_ActionCode',{
        	 width:"250px",
             items: [
                    
             ],

             change: function(oControlEvent) {
             	 checkMandatedForms()
             }
      });
         action_code.setMaxWidth("250px");
         oLabel_action_code.setLabelFor(action_code);
         Matrix_Close_Job_details.createRow(oLabel_in_shift_time,"",in_shift_time,"", in_shiftcode,"",oLabel_action_code,"",action_code);
         var oLabel_out_shift_time = new sap.ui.commons.Label({
          	text : "Out Shift Time",TextDirection:"LTR" });
          
          var out_shift_time=new sap.m.DateTimeInput("Close_OutOfShiftTime",{
 				placeholder : "Time Picker",
 					type : "Time",
 					valueFormat : "HH:mm",
 					value : "0:0",
 					displayFormat : "H'h' m'm'",
 					
 				});
          oLabel_out_shift_time.setLabelFor(out_shift_time);
          var out_shiftcode=new sap.m.Select('Close_OutshiftCode',{
        	  //width:"30px",
              items: [
                     
              ],

              change: function(oControlEvent) {
                     
             	 //BuildCloseImpactCodes(oControlEvent.getParameter("selectedItem").getKey());
              }
       });
          var oLabel_impact_grp=new sap.ui.commons.Label({
           	text : "Impact Group",TextDirection:"LTR" });
          var Impact_grp=new sap.m.Select('Close_ImpactGroup',{
        	  width:"250px",
              items: [
                     
              ],

              change: function(oControlEvent) {
            	  BuildCloseImpactCodes(oControlEvent.getParameter("selectedItem").getKey(),"NOTSELECTED");
             	 checkMandatedForms()
              }
       });
          Impact_grp.setMaxWidth("250px");
          oLabel_action_code.setLabelFor(action_code);
          Matrix_Close_Job_details.createRow(oLabel_out_shift_time,"",out_shift_time,"", out_shiftcode,"",oLabel_impact_grp,"",Impact_grp);
          oCellflooding = new sap.ui.commons.layout.MatrixLayoutCell({
  			colSpan:3,
  		});
         var oLabel_flodding = new sap.ui.commons.TextView("flooding_label",{
        	 visible:false,
         	text : "Has there been an escape of \n sewerage to a 3rd Party \n Property?",TextDirection:"LTR" });
         oCellflooding.addContent(oLabel_flodding);
         var oLabel_Impact_code = new sap.ui.commons.Label({
          	text : "Impact Code",TextDirection:"LTR"});
         var impact_code=new sap.m.Select('Close_ImpactCode',{
        	 width:"250px",
             items: [
                    
             ],

             change: function(oControlEvent) {
             	checkMandatedForms()
                 }
      });
         impact_code.setMaxWidth("250px");
         oLabel_Impact_code.setLabelFor(impact_code);
         Matrix_Close_Job_details.createRow(oCellflooding,"", oSwitchFlooding,"",oLabel_Impact_code,"",impact_code);
         oCellpollution = new sap.ui.commons.layout.MatrixLayoutCell({
   			colSpan:3,
   		});
         var oLabel_pollution = new sap.ui.commons.Label("pollution_label",{
        	 visible:false,
          	text : "Has there been a pollution?" ,TextDirection:"LTR"});
         oCellpollution.addContent(oLabel_pollution);
         Matrix_Close_Job_details.createRow(oCellpollution,"", oSwitchPollution,"","","","");
         var oLabel_customer_feedback = new sap.ui.commons.Label("cust_feed_label",{
        	 visible:false,
         	text : "Customer Feedback",TextDirection:"LTR" });
         Matrix_Close_Job_details.createRow(oLabel_customer_feedback,"",oSwitchCustFeed,"","","","","","");
         var oLabel_longtext = new sap.ui.commons.Label("FEClose_LongText",{
          	text : "Long Text",TextDirection:"LTR" });
         oCell3 = new sap.ui.commons.layout.MatrixLayoutCell({
    			colSpan:5,
    		});
         var longtext=new sap.m.TextArea("Close_LongText",{ rows: 5,width:"250px"})
        oCell3.addContent(longtext);
         Matrix_Close_Job_details.createRow(oLabel_longtext,"",oCell3,"","");
        
    
         
             /* var oForm1 = new sap.ui.layout.form.Form("DG51F1",{
                     
                     editable: true,
                     layout: oLayout1a,
                     formContainers: [

                           new sap.ui.layout.form.FormContainer("DG51F1C1",{
                                  
                                  formElements: [
                                         new sap.ui.layout.form.FormElement({
                                                label: "Functional Location",
                                                fields: [new sap.m.Input("Close_FunctionalLocation",{type: sap.m.InputType.Input, enabled: true})
                                                ]
                                         }),
                                         new sap.ui.layout.form.FormElement({
                                                label: "Equipment ID",
                                                fields: [new sap.m.Input("Close_Equipment",{type: sap.m.InputType.Input, enabled: true})
                                                ]
                                         }),
                                         new sap.ui.layout.form.FormElement({
                                                label: "",
                                                fields: [                         new sap.m.Button( {
                                                    text: "Select Asset",
                                                    type:     sap.m.ButtonType.Success,
                                                    tap: [ function(oEvt) {  
                                                    	SearchMode="CLOSE"
                                                    		
                                                    	formSearchAsset.open() 
                                                    
                                                    	
                                                                } ]
                                                })
                                                ]
                                         }),
                                         new sap.ui.layout.form.FormElement({
                                             label: "In Shift Time",
                                             fields: [new sap.m.DateTimeInput("Close_InShiftTime",{
                        							placeholder : "Time Picker",
                           							type : "Time",
                           							valueFormat : "HH:mm",
                           							value : "0:0",
                           							displayFormat : "H'h' m'm'",
                           							
                           						}),
                           						new sap.m.Select('Close_InshiftCode',{
                                                    
                                                    items: [
                                                           
                                                    ],

                                                    change: function(oControlEvent) {
                                                           
                                                   	 //BuildCloseImpactCodes(oControlEvent.getParameter("selectedItem").getKey());
                                                    }
                                             })
                              
                                             ]
                                      }),
                                        
                                         
                                      new sap.ui.layout.form.FormElement({
                                          label: "Out Of Shift Time",
                                          fields: [new sap.m.DateTimeInput("Close_OutOfShiftTime",{
                  							placeholder : "Time Picker",
                   							type : "Time",
                   							valueFormat : "HH:mm",
                   							value : "0:0",
                   							displayFormat : "H'h' m'm'",
                   							
                   						}),new sap.m.Select('Close_OutshiftCode',{
                                            
                                            items: [
                                                   
                                            ],

                                            change: function(oControlEvent) {
                                                   
                                           	 //BuildCloseImpactCodes(oControlEvent.getParameter("selectedItem").getKey());
                                            }
                                     })
                                          ]
                                      }),
                                      //new sap.m.Label({text:"sewage escape xxxxxxxxx"}),oSwitchFlooding,
                                      new sap.ui.layout.form.FormElement({
                                          label: "Escape of sewage?",
                                          fields: [oSwitchFlooding,new sap.m.Label({text:""})]
                                       }),
                    					 new sap.ui.layout.form.FormElement({
                                             label: "Pollution Incident?",
                                             fields: [oSwitchPollution,new sap.m.Label({text:""})]
                    					 }) ,
                    					 new sap.ui.layout.form.FormElement({
                                             label: "Customer Feedback?",
                                             fields: [oSwitchCustFeed,new sap.m.Label({text:""})]
                    					 }) 
                                         ],
                                  layoutData: new sap.ui.core.VariantLayoutData({
                                                multipleLayoutData: [new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, minWidth: 400}),
                                                                         new sap.ui.layout.form.GridContainerData({halfGrid: true}),
                                                                         new sap.ui.layout.GridData({linebreakL: true})]
                                                })
                           }),
                           new sap.ui.layout.form.FormContainer("DG51F1C2",{
                               
                               formElements: [
                                              new sap.ui.layout.form.FormElement({
                                                  label: "Problem Group",
                                                  fields: [new sap.m.Select('Close_ProblemGroup',{
                                                         
                                                         items: [
                                                                
                                                         ],

                                                         change: function(oControlEvent) {
                                                                //setCloseButtons(oControlEvent.getParameter("selectedItem").getKey())
                                                                BuildCloseProblemCodes(oControlEvent.getParameter("selectedItem").getKey(),"NOTSELECTED");
                                                                checkMandatedForms()
                                                         }
                                                  }),
                                                  ]
                                           }) ,                                    
                                      new sap.ui.layout.form.FormElement({
                                             label: "Problem Code",
                                             fields: [new sap.m.Select('Close_ProblemCode',{
                                                    
                                                    items: [
                                                           
                                                    ],

                                                    change: function(oControlEvent) {
                                                    	checkMandatedForms()
                                                    }
                                             }),
                                             ]
                                      }),
                                      new sap.ui.layout.form.FormElement({
                                          label: "Action Group",
                                          fields: [new sap.m.Select('Close_ActionGroup',{
                                                 
                                                 items: [
                                                        
                                                 ],

                                                 change: function(oControlEvent) {
                                                        
                                                	 BuildCloseActionCodes(oControlEvent.getParameter("selectedItem").getKey(),"NOTSELECTED");
                                                	 checkMandatedForms()
                                                 }
                                          }),
                                          ]
                                   }),
                                      new sap.ui.layout.form.FormElement({
                                             label: "Action Code",
                                             fields: [new sap.m.Select('Close_ActionCode',{
                                                    
                                                    items: [
                                                           
                                                    ],

                                                    change: function(oControlEvent) {
                                                    	 checkMandatedForms()
                                                    }
                                             }),
                                             ]
                                      }),
                                      new sap.ui.layout.form.FormElement({
                                          label: "Impact Group",
                                          fields: [new sap.m.Select('Close_ImpactGroup',{
                                                 
                                                 items: [
                                                        
                                                 ],

                                                 change: function(oControlEvent) {
                                                        
                                                	 BuildCloseImpactCodes(oControlEvent.getParameter("selectedItem").getKey(),"NOTSELECTED");
                                                	 checkMandatedForms()
                                                 }
                                          }),
                                          ]
                                   }),
                                      new sap.ui.layout.form.FormElement({
                                             label: "Impact Code",
                                             fields: [new sap.m.Select('Close_ImpactCode',{
                                                    
                                                    items: [
                                                           
                                                    ],

                                                    change: function(oControlEvent) {
                                                    	checkMandatedForms()
                                                        }
                                             }),
                                             ]
                                      })
                                      
                                      new sap.ui.layout.form.FormElement({
                                    	  label: " ",
                                          fields: [new sap.m.Button('btnDG5', {
                                        	  
                  				    				text: 	"Flooding/DG5 Feedback",
                  				    				icon:"sap-icon://form",
               				    	
                  				    				tap: 	[ function(oEvt) {
                  				    							formToOpen="Forms/flooding.html"
                  				    								formMode="Close"
                  				    									closeFormName="Flooding"
                        				    							formForms.open()
                  				    							} 
                  				    							
               				   			 					]   
               										})
                                                 
                                          		]
                                      	}),
                                        new sap.ui.layout.form.FormElement({
                                      	  label: " ",
                                            fields: [new sap.m.Button('btnPollution', {
                                          	  
                    				    				text: 	"Polution",
                    				    				icon:"sap-icon://form",
                 				    	
                    				    				tap: 	[ function(oEvt) {
                    				    							formToOpen="Forms/pollution.html"
                    				    								formMode="Close"
                    				    									closeFormName="Pollution"
                            				    							formForms.open()
                    				    							} 
                    				    							
                 				   			 					]   
                 										})
                                                   
                                            		]
                                        	}),
                                            new sap.ui.layout.form.FormElement({
                                          	  label: " ",
                                                fields: [new sap.m.Button('btnFeedback', {
                                              	  
                        				    				text: 	"Customer Feedback",
                        				    				icon:"sap-icon://form",
                     				    	
                        				    				tap: 	[ function(oEvt) {
                        				    							formToOpen="Forms/CustomerFeedback.html"
                        				    							formMode="Close"
                        				    								closeFormName="CustomerFeedback"
                        				    							formForms.open()
                        				    							} 
                        				    							
                     				   			 					]   
                     										})
                                                       
                                                		]
                                            	})
              						
                                      ],
                               layoutData: new sap.ui.core.VariantLayoutData({
                                             multipleLayoutData: [new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, minWidth: 400}),
                                                                      new sap.ui.layout.form.GridContainerData({halfGrid: true}),
                                                                      new sap.ui.layout.GridData({linebreakL: true})]
                                             })
                        }),
                        new sap.ui.layout.form.FormContainer("DG51F1C3",{
                            
                            formElements: [
                                 
                                  
                                   new sap.ui.layout.form.FormElement("FEClose_LongText",{
                                  	 label: "Long Text",
                                          fields: [new sap.m.TextArea("Close_LongText",{ rows: 5})
                                          ]
                                   })
                     
                                   ],
                            layoutData: new sap.ui.core.VariantLayoutData({
                                          multipleLayoutData: [new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, minWidth: 400}),
                                                                   new sap.ui.layout.form.GridContainerData({halfGrid: true}),
                                                                   new sap.ui.layout.GridData({linebreakL: true})]
                                          })
                     })
                           ]

              });*/

                          /* var oForm2 = new sap.ui.layout.form.Form("DG52F1",{
                               
                               editable: true,
                               layout: oLayout1,
                               formContainers: [

                           new sap.ui.layout.form.FormContainer("DG52F1C1",{
                                  
                                  
                                  formElements: [

                                         new sap.ui.layout.form.FormElement({
                                                label: "Additional Work Required",
                                                fields: [ new sap.m.Switch("Close_Work",{
                                              
                                                
                                				customTextOn:"Yes",
                                				customTextOff:"No",
                                                change:[function(evt){ 
                                                	 	   sap.ui.getCore().getElementById("Close_WD_Group").setEnabled(this.getState())   
                                                	 	   sap.ui.getCore().getElementById("Close_WD_Code").setEnabled(this.getState())   
                                                	 	   sap.ui.getCore().getElementById("Close_WD_Assignment").setEnabled(this.getState())  
                                                	 	   sap.ui.getCore().getElementById("Close_WD_StartDate").setEnabled(this.getState())   
                                                	 	   sap.ui.getCore().getElementById("Close_WD_Special").setEnabled(this.getState())  
                                                    	   sap.ui.getCore().getElementById("Close_Variance").setEnabled(this.getState())   
                                                    	   sap.ui.getCore().getElementById("Close_Reason").setEnabled(this.getState())   
                                                    	   sap.ui.getCore().getElementById("Close_WD_Operable").setEnabled(this.getState())  
                                                       
                                                       
                                                }]
                                                
                                         })
                                                ]
                                         }),
                                         new sap.ui.layout.form.FormElement("FEClose_WD_Group",{
                                                label: "Work Type Group",
                                                fields: [new sap.m.Select('Close_WD_Group',{
                                                       
                                                       items: [
                                                              
                                                       ],

                                                       change: function(oControlEvent) {
                                                              
                                                    	   BuildCloseWDCodes(oControlEvent.getParameter("selectedItem").getKey(),"NOTSELECTED");
                                                       }
                                                }),
                                                ]
                                         }),
                                         new sap.ui.layout.form.FormElement("FEClose_WD_Code",{
                                             label: "Work Type Code",
                                             fields: [new sap.m.Select('Close_WD_Code',{
                                                    
                                                    items: [
                                                           
                                                    ],

                                                    change: function(oControlEvent) {
                                                           
                                                           //BuildPriorities(oControlEvent.getParameter("selectedItem").getKey());
                                                    }
                                             }),
                                             ]
                                      }),
                                      
                                   new sap.ui.layout.form.FormElement("FEClose_WD_Assignment",{
                                       label: "Assignment",
                                       fields: [new sap.m.Select('Close_WD_Assignment',{
                                              
                                              items: [
                                                     
                                              ],

                                              change: function(oControlEvent) {
                                                     
                                                     //BuildPriorities(oControlEvent.getParameter("selectedItem").getKey());
                                              }
                                       }),
                                       ]
                                }),
                                new sap.ui.layout.form.FormElement("FEClose_WD_StartDate",{
                                    label: "Start Date",
                                    fields: [new sap.m.DateTimeInput('Close_WD_StartDate',{
									width : "99%",
									displayFormat : "yyyy/MM/dd",
									valueFormat : "yyyy-MM-dd",
									type : "Date",
									dateValue : new Date()
								})
                                    ]
                                }),
                                new sap.ui.layout.form.FormElement("FE_Close_WD_Special",{
                                    label: "Special Requirements",
                                    fields: [ new sap.m.Switch("Close_WD_Special",{
                                  
                                    
                    				customTextOn:"Yes",
                    				customTextOff:"No",
                                    change:[function(evt){ 
                                    	 	    
                                           
                                           
                                    }]
                                    
                             })
                                    ]
                             }),
                                         new sap.ui.layout.form.FormElement("FEClose_Variance",{
                                             label: "Variance",
                                             fields: [new sap.m.Select('Close_Variance',{
                                                    
                                                    items: [
                                                           
                                                    ],

                                                    change: function(oControlEvent) {
                                                           
                                                           //BuildPriorities(oControlEvent.getParameter("selectedItem").getKey());
                                                    }
                                             }),
                                             ]
                                      }),                                         
                                         new sap.ui.layout.form.FormElement("FEClose_Reason",{
                                                label: "Reason",
                                                fields: [new sap.m.Input("Close_Reason",{type: sap.m.InputType.Input, enabled: true})
                                                ]
                                         }),
                                         new sap.ui.layout.form.FormElement("FEClose_WD_Operable",{
                                             label: "Is The Asset Operable",
                                             fields: [new sap.m.Select('Close_WD_Operable',{
                                                    
                                                    items: [

        													new sap.ui.core.Item({
        														key: "NA", 
        														text: "N/A"
        													}),
        													new sap.ui.core.Item({
        														key: "Yes", 
        														text: "Yes"
        													}),
        													new sap.ui.core.Item({
        														key: "NO", 
        														text: "No"
        													})  
                                                    ],

                                                    change: function(oControlEvent) {
                                                           
                                                           //BuildPriorities(oControlEvent.getParameter("selectedItem").getKey());
                                                    }
                                             }),
                                             ]
                                      }),

                                  ],
                                  layoutData: new sap.ui.core.VariantLayoutData({
                                         multipleLayoutData: [new sap.ui.layout.form.GridContainerData({halfGrid: true}),
                                                                    new sap.ui.layout.ResponsiveFlowLayoutData({minWidth: 150}),
                                                                                                                                  new sap.ui.layout.GridData({linebreakL: false})]
                                         })
                           })

                     ]
              });*/
                           
var Matrix_Followon = new sap.ui.commons.layout.MatrixLayout("DG52F1",{
         //id : "matrix1",
//layoutFixed : true,
      width : '400px',
    columns : 3,
     widths : ['100px', '10px', '200px'] });
var oLabel_additional_work = new sap.ui.commons.Label({
text : "Additional Work Required" ,TextDirection:"LTR"});
var additional_work_switch=new sap.m.Switch("Close_Work",{
    
    
	customTextOn:"Yes",
	customTextOff:"No",
    change:[function(evt){ 
    	 	   sap.ui.getCore().getElementById("Close_WD_Group").setEnabled(this.getState())   
    	 	   sap.ui.getCore().getElementById("Close_WD_Code").setEnabled(this.getState())   
    	 	   sap.ui.getCore().getElementById("Close_WD_Assignment").setEnabled(this.getState())  
    	 	   sap.ui.getCore().getElementById("Close_WD_StartDate").setEnabled(this.getState())   
    	 	   sap.ui.getCore().getElementById("Close_WD_Special").setEnabled(this.getState())  
        	   sap.ui.getCore().getElementById("Close_Variance").setEnabled(this.getState())   
        	   sap.ui.getCore().getElementById("Close_Reason").setEnabled(this.getState())   
        	   sap.ui.getCore().getElementById("Close_WD_Operable").setEnabled(this.getState())  
           
           
    }]
    
});
oLabel_additional_work.setLabelFor(additional_work_switch); 
Matrix_Followon.createRow(oLabel_additional_work,"", additional_work_switch);
var oLabel_work_type_group = new sap.ui.commons.Label("FEClose_WD_Group",{
	text : "Work Type Group" ,TextDirection:"LTR"});
var work_type_grp = new sap.m.Select('Close_WD_Group',{
	 width:"200px",
	 enabled:false,
    items: [
           
    ],

    change: function(oControlEvent) {
           
 	   BuildCloseWDCodes(oControlEvent.getParameter("selectedItem").getKey(),"NOTSELECTED");
    }
});
work_type_grp.setMaxWidth("200px");
oLabel_work_type_group.setLabelFor(work_type_grp); 
Matrix_Followon.createRow(oLabel_work_type_group,"", work_type_grp);
var oLabel_work_type_code = new sap.ui.commons.Label("FEClose_WD_Code",{
	text : "Work Type Code" ,TextDirection:"LTR"});
var work_type_code=new sap.m.Select('Close_WD_Code',{
	 width:"200px",
	 enabled:false,
    items: [],

    change: function(oControlEvent) {
           
           //BuildPriorities(oControlEvent.getParameter("selectedItem").getKey());
    }
});
work_type_code.setMaxWidth("200px");
oLabel_work_type_code.setLabelFor(work_type_code); 
Matrix_Followon.createRow(oLabel_work_type_code,"", work_type_code);
var oLabel_assignment = new sap.ui.commons.Label("FEClose_WD_Assignment",{
	text : "Assignment" ,TextDirection:"LTR"});
var assignment=new sap.m.Select('Close_WD_Assignment',{
	 width:"200px",
	 enabled:false,
    items: [ 
    ],

    change: function(oControlEvent) {
           
           //BuildPriorities(oControlEvent.getParameter("selectedItem").getKey());
    }
});
assignment.setMaxWidth("200px");
oLabel_assignment.setLabelFor(assignment);
Matrix_Followon.createRow(oLabel_assignment,"", assignment);
var oLabel_start_date = new sap.ui.commons.Label("FEClose_WD_StartDate",{
	text : "Start Date",TextDirection:"LTR"});
var start_date=new sap.m.DateTimeInput('Close_WD_StartDate',{
	//width : "99%",
	enabled:false,
	displayFormat : "yyyy/MM/dd",
	valueFormat : "yyyy-MM-dd",
	type : "Date",
	dateValue : new Date()
});
oLabel_start_date.setLabelFor(start_date);
Matrix_Followon.createRow(oLabel_start_date,"", start_date);
var oLabel_special = new sap.ui.commons.Label("FE_Close_WD_Special",{
	text : "Special Requirements",TextDirection:"LTR" });
var special_reqd= new sap.m.Switch("Close_WD_Special",{
	enabled:false,
	customTextOn:"Yes",
	customTextOff:"No",
    change:[function(evt){ 
         
    }]
    
});
oLabel_special.setLabelFor(special_reqd);
Matrix_Followon.createRow(oLabel_special,"", special_reqd);
var oLabel_variance = new sap.ui.commons.Label("FEClose_Variance",{
	text : "Variance",TextDirection:"LTR",enabled:false,});
var variance=new sap.m.Select('Close_Variance',{
	 width:"200px",
	 enabled:false,
    items: [
     ],

    change: function(oControlEvent) {
           
           //BuildPriorities(oControlEvent.getParameter("selectedItem").getKey());
    }
});
variance.setMaxWidth("200px");
oLabel_variance.setLabelFor(variance);
Matrix_Followon.createRow(oLabel_variance,"", variance);
var oLabel_reason = new sap.ui.commons.Label("FEClose_Reason",{
	text : "Reason",TextDirection:"LTR"});
var reason=new sap.m.Input("Close_Reason",{type: sap.m.InputType.Input, enabled:false});
oLabel_reason.setLabelFor(reason);
Matrix_Followon.createRow(oLabel_reason,"", reason);
var oLabel_operable = new sap.ui.commons.Label("FEClose_WD_Operable",{
	text : "Is The Asset Operable" ,TextDirection:"LTR"});
var operable=new sap.m.Select('Close_WD_Operable',{
	enabled:false,
    items: [

			new sap.ui.core.Item({
				key: "NA", 
				text: "N/A"
			}),
			new sap.ui.core.Item({
				key: "Yes", 
				text: "Yes"
			}),
			new sap.ui.core.Item({
				key: "NO", 
				text: "No"
			})  
    ],

    change: function(oControlEvent) {
           
           //BuildPriorities(oControlEvent.getParameter("selectedItem").getKey());
    }
});
oLabel_operable.setLabelFor(operable);
Matrix_Followon.createRow(oLabel_operable,"", operable);
function buildDG5Tabs(){
	
	
	
       var tabBar  = new sap.m.IconTabBar('DG5tabBar',
                     {
                           expanded:'{device>/isNoPhone}',
                           expandable:false,
                           select:[function(oEvt) {   
                                  currentPage=window.location.href

                                         
                                    if(oEvt.getParameters().key=="DG51"){
                                    	html5sql.process("select * from myjobdets where orderno =  '"+CurrentOrderNo+"' and opno =  '"+CurrentOpNo+"'",
												 function(transaction, results, rowsArray){
													
													
														if( rowsArray.length>0) {
														
															
															travelTime = diffInTime(rowsArray[0].tconf_date,rowsArray[0].tconf_time,getFormattedDate(),getFormattedTime())
															
															sap.ui.getCore().getElementById("Close_InShiftTime").setValue(travelTime)
															
															
														}
											},
                       						 function(error, statement){
                       							 window.console&&console.log("Error: " + error.message + " when processing " + statement);
                       						 }        
                                    	);
										
                                    }
                                    if(oEvt.getParameters().key=="DG52"){}
                                    if(oEvt.getParameters().key=="DG53"){
	                                    formToOpen="Forms/formsindex.html"
	        				   			    formMode="Close"
	        				   			    sap.ui.getCore().getElementById('DG5tabBar').setSelectedKey("DG52")
	        		   						formForms.open()

                                    }
                                  
                                  }
                           ],
                           
                           items: [
                                         new sap.m.IconTabFilter( {
                                             key:'DG51',
                                             icon:"sap-icon://complete",
                                             tooltip: 'Close Job Details',
                                             text: "Close",
                                             content:[Matrix_Close_Job_details
                                                      ]
                                         }),
                                         new sap.m.IconTabFilter( {
                                        	 icon:"sap-icon://wrench",
                                                    key:'DG52',
                                                    tooltip: 'Follow On Work',
                                                    text: "Follow On",
                                                    content:[Matrix_Followon
                                                                           
                                                             ]
                                                }),
                                         new sap.m.IconTabFilter( {
                                        	 icon:"sap-icon://form",
                                                    key:'DG53',
                                                    tooltip: 'Forms',
                                                    text: "Forms",
                                                    content:[  ]
                                                })
                                  ]
                     })
       return tabBar;

       }
function setCloseButtons(key){
	
}
function setCloseswitch(){
	initCloseButtons()
	if (oSwitchFlooding.getState()){
		addMandatedForm("Flooding.html")
		//sap.ui.getCore().getElementById('btnDG5').setEnabled(true);
		//if(sap.ui.getCore().getElementById('btnDG5').getText()=="Not Required"){
		//	sap.ui.getCore().getElementById('btnDG5').setText("Create");
			
		//}
	
	}else{
		removeMandatedForm("Flooding.html")
		//sap.ui.getCore().getElementById('btnDG5').setEnabled(false);
		if (!oSwitchPollution.getEnabled()){
			oSwitchPollution.setState(false);
			oSwitchPollution.setEnabled(true);
		
		}
	}
	
	if (oSwitchPollution.getState()){
		addMandatedForm("Pollution.html")
		//sap.ui.getCore().getElementById('btnPollution').setEnabled(true);
		//if(sap.ui.getCore().getElementById('btnPollution').getText()=="Not Required"){
		//	sap.ui.getCore().getElementById('btnPollution').setText("Create");
			
		//}
		
	}else{
		//sap.ui.getCore().getElementById('btnPollution').setEnabled(false);
		removeMandatedForm("Pollution.html")
	}
	if (oSwitchCustFeed.getState()){
		addMandatedForm("CustomerFeedback.html")
		//sap.ui.getCore().getElementById('btnDG5').setEnabled(true);
		//if(sap.ui.getCore().getElementById('btnDG5').getText()=="Not Required"){
		//	sap.ui.getCore().getElementById('btnDG5').setText("Create");
			
		//}
	
	}else{
		removeMandatedForm("CustomerFeedback.html")
		//sap.ui.getCore().getElementById('btnDG5').setEnabled(false);
		if (!oSwitchCustFeed.getEnabled()){
			oSwitchCustFeed.setState(false);
			oSwitchCustFeed.setEnabled(true);
		
		}
	}
}
function initCloseButtons(){
	MandatedForms=[];
	//sap.ui.getCore().getElementById('btnFeedback').setEnabled(true);
	//sap.ui.getCore().getElementById('btnFeedback').setText("Create");
	//sap.ui.getCore().getElementById('btnFeedback').setType(sap.m.ButtonType.Accept);
	//sap.ui.getCore().getElementById('btnDG5').setEnabled(false);
	//sap.ui.getCore().getElementById('btnDG5').setText("Not Required");
	//sap.ui.getCore().getElementById('btnDG5').setType(sap.m.ButtonType.Accept);
	//sap.ui.getCore().getElementById('btnPollution').setEnabled(false);
	//sap.ui.getCore().getElementById('btnPollution').setText("Not Required");
	//sap.ui.getCore().getElementById('btnPollution').setType(sap.m.ButtonType.Accept);
	sqlstatement="SELECT * from myformsresponses where orderno = '"+CurrentOrderNo+"' and opno ='"+CurrentOpNo+"'"
	
	html5sql.process(sqlstatement,
			function(transaction, results, rowsArray){
		
				if( rowsArray.length > 0) {
					for (var n = 0; n < rowsArray.length; n++) {
						
						if(rowsArray[n].formname=='Flooding'){
							
						
							//sap.ui.getCore().getElementById('btnDG5').setText("Change");
							//sap.ui.getCore().getElementById('btnDG5').setType(sap.m.ButtonType.Emphasized);
						}
						if(rowsArray[n].formname=='Pollution'){
							
							
							//sap.ui.getCore().getElementById('btnPollution').setText("Change");
							//sap.ui.getCore().getElementById('btnPollution').setType(sap.m.ButtonType.Emphasized);
						}
						if(rowsArray[n].formname=='Feedback'){
							
							//sap.ui.getCore().getElementById('btnFeedback').setEnabled(true);
							//sap.ui.getCore().getElementById('btnFeedback').setText("Change");
							//sap.ui.getCore().getElementById('btnFeedback').setType(sap.m.ButtonType.Emphasized);
						}

						
					}
									
		
				}

			},
			 function(error, statement){
				 window.console&&console.log("Error: " + error.message + " when processing " + statement);
			 }   
		);	

}
function setFollowOnMandatory(val){

	sap.ui.getCore().getElementById("Close_Work").setState(val);
	sap.ui.getCore().getElementById("Close_Variance").setEnabled(val)   
    sap.ui.getCore().getElementById("Close_Reason").setEnabled(val)   
}
function ShowHideFollowOn(){
	var SQLStatement="";
	SQLStatement="select * from MyJobsParams where name = 'FOLLOWONWD' and key2 = '"+localStorage.getItem('EmployeeScenario')+"'"
	html5sql.process(SQLStatement,
			 function(transaction, results, rowsArray){
		if(rowsArray.length>0){
			item = rowsArray[0];
			if(item.value == "YES"){
				sap.ui.getCore().getElementById("Close_WD_Group").setVisible(true);   
     	 	   sap.ui.getCore().getElementById("Close_WD_Code").setVisible(true);   
     	 	   sap.ui.getCore().getElementById("Close_WD_Assignment").setVisible(true);  
     	 	   sap.ui.getCore().getElementById("Close_WD_StartDate").setVisible(true);   
     	 	   sap.ui.getCore().getElementById("Close_WD_Special").setVisible(true); 
     	 	  sap.ui.getCore().getElementById("Close_WD_Operable").setVisible(true); 
     	 	sap.ui.getCore().getElementById("FEClose_WD_Group").setVisible(true);   
  	 	   sap.ui.getCore().getElementById("FEClose_WD_Code").setVisible(true);   
  	 	   sap.ui.getCore().getElementById("FEClose_WD_Assignment").setVisible(true);  
  	 	   sap.ui.getCore().getElementById("FEClose_WD_StartDate").setVisible(true);   
  	 	   sap.ui.getCore().getElementById("FE_Close_WD_Special").setVisible(true); 
  	 	  sap.ui.getCore().getElementById("FEClose_WD_Operable").setVisible(true); 
			}
			else{
				sap.ui.getCore().getElementById("Close_WD_Group").setVisible(false);   
     	 	   sap.ui.getCore().getElementById("Close_WD_Code").setVisible(false) ;  
     	 	   sap.ui.getCore().getElementById("Close_WD_Assignment").setVisible(false);  
     	 	   sap.ui.getCore().getElementById("Close_WD_StartDate").setVisible(false);   
     	 	   sap.ui.getCore().getElementById("Close_WD_Special").setVisible(false); 
     	 	  sap.ui.getCore().getElementById("Close_WD_Operable").setVisible(false); 
     	 	sap.ui.getCore().getElementById("FEClose_WD_Group").setVisible(false);   
  	 	   sap.ui.getCore().getElementById("FEClose_WD_Code").setVisible(false) ;  
  	 	   sap.ui.getCore().getElementById("FEClose_WD_Assignment").setVisible(false);  
  	 	   sap.ui.getCore().getElementById("FEClose_WD_StartDate").setVisible(false);   
  	 	   sap.ui.getCore().getElementById("FE_Close_WD_Special").setVisible(false); 
  	 	  sap.ui.getCore().getElementById("FEClose_WD_Operable").setVisible(false); 
			}
		}			
			 },
			 function(error, statement){
				
			 }        
			);
}