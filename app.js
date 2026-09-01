const STORAGE_KEY='propertyDealAnalyser.v1';
const fmtMoney=n=>new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0}).format(Number(n)||0);
const fmtMoney2=n=>new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',minimumFractionDigits:2,maximumFractionDigits:2}).format(Number(n)||0);
const fmtPct=n=>`${(Number(n)||0).toFixed(2)}%`;
const uid=()=>crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
const MARKET_DATA=[{"state":"NSW","postcode":"2330","propertyType":"house","suburb":"Maison Dieu","dsr":70.0,"typicalValue":1215500.0,"vacancyRate":2.19,"grossRentalYield":3.61,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2795","propertyType":"house","suburb":"Raglan","dsr":62.0,"typicalValue":757800.0,"vacancyRate":0.45,"grossRentalYield":4.43,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2423","propertyType":"house","suburb":"Bulahdelah","dsr":60.0,"typicalValue":667200.0,"vacancyRate":1.93,"grossRentalYield":4.73,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2346","propertyType":"house","suburb":"Manilla","dsr":59.0,"typicalValue":476900.0,"vacancyRate":0.71,"grossRentalYield":5.92,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2880","propertyType":"house","suburb":"Broken Hill","dsr":58.0,"typicalValue":288000.0,"vacancyRate":1.01,"grossRentalYield":8.27,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2259","propertyType":"house","suburb":"Chain Valley Bay","dsr":57.0,"typicalValue":795700.0,"vacancyRate":1.19,"grossRentalYield":4.55,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2474","propertyType":"house","suburb":"Geneva","dsr":56.0,"typicalValue":561051.0,"vacancyRate":0.62,"grossRentalYield":4.79,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2480","propertyType":"house","suburb":"Girards Hill","dsr":56.0,"typicalValue":600400.0,"vacancyRate":0.42,"grossRentalYield":4.76,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2428","propertyType":"house","suburb":"Tuncurry","dsr":56.0,"typicalValue":777400.0,"vacancyRate":0.62,"grossRentalYield":3.94,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2390","propertyType":"house","suburb":"Narrabri","dsr":55.0,"typicalValue":576000.0,"vacancyRate":0.89,"grossRentalYield":5.9,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2259","propertyType":"house","suburb":"Lake Munmorah","dsr":55.0,"typicalValue":849800.0,"vacancyRate":0.8,"grossRentalYield":3.52,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2870","propertyType":"house","suburb":"Parkes","dsr":54.0,"typicalValue":552000.0,"vacancyRate":1.35,"grossRentalYield":4.67,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2502","propertyType":"house","suburb":"Primbee","dsr":54.0,"typicalValue":970000.0,"vacancyRate":0.67,"grossRentalYield":3.19,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2290","propertyType":"house","suburb":"Redhead","dsr":54.0,"typicalValue":1968000.0,"vacancyRate":1.74,"grossRentalYield":3.24,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2666","propertyType":"house","suburb":"Temora","dsr":53.0,"typicalValue":540000.0,"vacancyRate":0.63,"grossRentalYield":5.14,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2340","propertyType":"house","suburb":"Calala","dsr":53.0,"typicalValue":784000.0,"vacancyRate":0.75,"grossRentalYield":3.88,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2619","propertyType":"house","suburb":"Jerrabomberra","dsr":53.0,"typicalValue":1066300.0,"vacancyRate":1.14,"grossRentalYield":3.51,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2643","propertyType":"house","suburb":"Howlong","dsr":52.0,"typicalValue":644600.0,"vacancyRate":0.35,"grossRentalYield":4.57,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2256","propertyType":"house","suburb":"Blackwall","dsr":51.0,"typicalValue":1229900.0,"vacancyRate":0.48,"grossRentalYield":2.94,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2213","propertyType":"house","suburb":"East Hills","dsr":51.0,"typicalValue":1775700.0,"vacancyRate":0.94,"grossRentalYield":2.97,"source":"DSR Market Matcher June 2026"},{"state":"NSW","postcode":"2101","propertyType":"house","suburb":"Elanora Heights","dsr":51.0,"typicalValue":2236800.0,"vacancyRate":0.82,"grossRentalYield":2.82,"source":"DSR Market Matcher June 2026"},{"state":"NT","postcode":"0840","propertyType":"house","suburb":"Dundee Beach","dsr":62.0,"typicalValue":433756.0,"vacancyRate":2.3,"grossRentalYield":6.64,"source":"DSR Market Matcher June 2026"},{"state":"QLD","postcode":"4560","propertyType":"house","suburb":"Coes Creek","dsr":62.0,"typicalValue":1081400.0,"vacancyRate":0.13,"grossRentalYield":3.97,"source":"DSR Market Matcher June 2026"},{"state":"QLD","postcode":"4383","propertyType":"house","suburb":"Wallangarra","dsr":59.0,"typicalValue":461800.0,"vacancyRate":0.0,"grossRentalYield":5.19,"source":"DSR Market Matcher June 2026"},{"state":"QLD","postcode":"4880","propertyType":"house","suburb":"Mareeba","dsr":58.0,"typicalValue":656900.0,"vacancyRate":0.45,"grossRentalYield":5.22,"source":"DSR Market Matcher June 2026"},{"state":"QLD","postcode":"4570","propertyType":"house","suburb":"Curra","dsr":58.0,"typicalValue":847300.0,"vacancyRate":0.9,"grossRentalYield":4.08,"source":"DSR Market Matcher June 2026"},{"state":"QLD","postcode":"4670","propertyType":"house","suburb":"Burnett Heads","dsr":57.0,"typicalValue":823900.0,"vacancyRate":0.64,"grossRentalYield":4.07,"source":"DSR Market Matcher June 2026"},{"state":"QLD","postcode":"4881","propertyType":"house","suburb":"Kuranda","dsr":57.0,"typicalValue":889500.0,"vacancyRate":0.45,"grossRentalYield":4.68,"source":"DSR Market Matcher June 2026"},{"state":"QLD","postcode":"4214","propertyType":"house","suburb":"Arundel","dsr":56.0,"typicalValue":1392800.0,"vacancyRate":0.51,"grossRentalYield":3.7,"source":"DSR Market Matcher June 2026"},{"state":"QLD","postcode":"4314","propertyType":"house","suburb":"Blackbutt","dsr":55.0,"typicalValue":580200.0,"vacancyRate":1.96,"grossRentalYield":5.49,"source":"DSR Market Matcher June 2026"},{"state":"QLD","postcode":"4551","propertyType":"house","suburb":"Golden Beach","dsr":55.0,"typicalValue":1355700.0,"vacancyRate":0.28,"grossRentalYield":3.06,"source":"DSR Market Matcher June 2026"},{"state":"QLD","postcode":"4868","propertyType":"house","suburb":"Bayview Heights","dsr":53.0,"typicalValue":856300.0,"vacancyRate":1.22,"grossRentalYield":4.53,"source":"DSR Market Matcher June 2026"},{"state":"QLD","postcode":"4670","propertyType":"house","suburb":"Bargara","dsr":52.0,"typicalValue":958800.0,"vacancyRate":1.62,"grossRentalYield":3.68,"source":"DSR Market Matcher June 2026"},{"state":"SA","postcode":"5558","propertyType":"house","suburb":"Moonta","dsr":62.0,"typicalValue":511200.0,"vacancyRate":0.32,"grossRentalYield":4.81,"source":"DSR Market Matcher June 2026"},{"state":"SA","postcode":"5052","propertyType":"house","suburb":"Belair","dsr":62.0,"typicalValue":1392800.0,"vacancyRate":0.21,"grossRentalYield":3.95,"source":"DSR Market Matcher June 2026"},{"state":"SA","postcode":"5461","propertyType":"house","suburb":"Balaklava","dsr":61.0,"typicalValue":467400.0,"vacancyRate":0.33,"grossRentalYield":5.3,"source":"DSR Market Matcher June 2026"},{"state":"SA","postcode":"5453","propertyType":"house","suburb":"Clare","dsr":61.0,"typicalValue":478000.0,"vacancyRate":0.14,"grossRentalYield":4.58,"source":"DSR Market Matcher June 2026"},{"state":"SA","postcode":"5556","propertyType":"house","suburb":"Wallaroo","dsr":60.0,"typicalValue":681000.0,"vacancyRate":0.12,"grossRentalYield":4.01,"source":"DSR Market Matcher June 2026"},{"state":"SA","postcode":"5280","propertyType":"house","suburb":"Millicent","dsr":58.0,"typicalValue":442600.0,"vacancyRate":0.46,"grossRentalYield":4.67,"source":"DSR Market Matcher June 2026"},{"state":"SA","postcode":"5152","propertyType":"house","suburb":"Crafers","dsr":57.0,"typicalValue":1444954.0,"vacancyRate":1.47,"grossRentalYield":3.41,"source":"DSR Market Matcher June 2026"},{"state":"SA","postcode":"5271","propertyType":"house","suburb":"Naracoorte","dsr":56.0,"typicalValue":538200.0,"vacancyRate":0.9,"grossRentalYield":4.58,"source":"DSR Market Matcher June 2026"},{"state":"SA","postcode":"5422","propertyType":"house","suburb":"Peterborough","dsr":54.0,"typicalValue":275100.0,"vacancyRate":1.36,"grossRentalYield":7.99,"source":"DSR Market Matcher June 2026"},{"state":"SA","postcode":"5081","propertyType":"house","suburb":"Walkerville","dsr":53.0,"typicalValue":1606800.0,"vacancyRate":1.04,"grossRentalYield":3.47,"source":"DSR Market Matcher June 2026"},{"state":"TAS","postcode":"7315","propertyType":"house","suburb":"West Ulverstone","dsr":56.0,"typicalValue":675000.0,"vacancyRate":0.18,"grossRentalYield":4.52,"source":"DSR Market Matcher June 2026"},{"state":"TAS","postcode":"7307","propertyType":"house","suburb":"Latrobe","dsr":55.0,"typicalValue":612300.0,"vacancyRate":0.64,"grossRentalYield":4.49,"source":"DSR Market Matcher June 2026"},{"state":"TAS","postcode":"7325","propertyType":"house","suburb":"Wynyard","dsr":54.0,"typicalValue":612000.0,"vacancyRate":0.03,"grossRentalYield":4.11,"source":"DSR Market Matcher June 2026"},{"state":"TAS","postcode":"7322","propertyType":"house","suburb":"Somerset","dsr":53.0,"typicalValue":498300.0,"vacancyRate":0.27,"grossRentalYield":4.37,"source":"DSR Market Matcher June 2026"},{"state":"VIC","postcode":"3515","propertyType":"house","suburb":"Marong","dsr":58.0,"typicalValue":746500.0,"vacancyRate":0.0,"grossRentalYield":3.91,"source":"DSR Market Matcher June 2026"},{"state":"VIC","postcode":"3775","propertyType":"house","suburb":"Yarra Glen","dsr":57.0,"typicalValue":949900.0,"vacancyRate":0.69,"grossRentalYield":3.74,"source":"DSR Market Matcher June 2026"},{"state":"WA","postcode":"6150","propertyType":"house","suburb":"Bateman","dsr":56.0,"typicalValue":1813600.0,"vacancyRate":0.28,"grossRentalYield":3.07,"source":"DSR Market Matcher June 2026"},{"state":"WA","postcode":"6012","propertyType":"house","suburb":"Mosman Park","dsr":51.0,"typicalValue":2697000.0,"vacancyRate":0.49,"grossRentalYield":2.53,"source":"DSR Market Matcher June 2026"}];
const DSR_RULES=[
 {metric:'Demand to Supply Ratio',target:'≥ 50',note:'Composite demand vs supply score; higher is stronger.'},
 {metric:'Typical Value',target:'≤ investor budget',note:'Affordability filter; supplied guidance used $450k as a target.'},
 {metric:'Vacancy Rate',target:'≤ 2.8%',note:'Below the balanced-market level; <2% is especially tight.'},
 {metric:'Gross Rental Yield',target:'≥ 4%',note:'Cash-flow screen; very high yields still need risk checks.'}
];
const HTAG_RULES=[
 {metric:'Stock on Market',target:'< 1%'},{metric:'Stock on Market Long Slope',target:'≤ 0'},{metric:'Days on Market',target:'< 40 days'},{metric:'Days on Market Long Slope',target:'≤ 0'},{metric:'Price Change (1 Year)',target:'> 5%'},{metric:'Price Change (3 Years)',target:'< 60%'},{metric:'Price Change (10 Years)',target:'≈ 90% total'},{metric:'Affordability Index',target:'< 35 years / <45 capitals'},{metric:'Renter-to-Owner Ratio',target:'< 40%, ideally <30%'},{metric:'Hold Period',target:'> 8 years'},{metric:'Building Approval Ratio',target:'< 4%'}
];


const sampleProperties=[
 {id:'sample-180',state:'QLD',propertyType:'unit',name:'Historical $180K Purchase Analysis',purchasePrice:180000,weeklyRent:300,landSize:0,ownershipShare:50,depositPct:5,interestRate:7.5,loanType:'IO',loanTerm:30,lmi:0,stampDuty:6830,mortgageRegistration:140,transferFee:1134,conveyancing:500,buildingPest:500,councilRatesAnnual:1400,waterAnnual:0,insuranceMonthly:70,bodyCorpMonthly:0,managementPct:10,vacancyPct:0,maintenanceAnnual:0,otherMonthly:0,valueAdd:0,floodRisk:0,development:0,historicalSample:true,notes:'Transcribed from the workbook $180K sheet. Workbook showed $150/week rent per owner / $1,200 monthly for both and $1,125 monthly IO repayments. Some totals in that legacy sheet omit Building & Pest; this app recalculates consistently from the entered inputs.'},
 {id:'sample-210',state:'QLD',propertyType:'unit',name:'Historical $210K Purchase Analysis',purchasePrice:210000,weeklyRent:300,landSize:0,ownershipShare:50,depositPct:5,interestRate:7.5,loanType:'IO',loanTerm:30,lmi:0,stampDuty:7255,mortgageRegistration:140,transferFee:1341,conveyancing:500,buildingPest:0,councilRatesAnnual:1400,waterAnnual:0,insuranceMonthly:70,bodyCorpMonthly:0,managementPct:10,vacancyPct:0,maintenanceAnnual:0,otherMonthly:0,valueAdd:0,floodRisk:0,development:0,historicalSample:true,notes:'Transcribed from the workbook $210K sheet. Workbook showed $150/week rent per owner / $1,200 monthly for both and $1,312.50 monthly IO repayments. Purchase costs were stamp duty, mortgage registration, transfer and conveyancing.'},
 {id:'sample-275',state:'QLD',propertyType:'unit',name:'Moorooka QLD – Historical $275K Scenario',purchasePrice:275000,weeklyRent:290,landSize:0,ownershipShare:50,depositPct:5,interestRate:5,loanType:'IO',loanTerm:30,lmi:7341,stampDuty:8050,mortgageRegistration:162.9,transferFee:470.9,conveyancing:1000,buildingPest:1000,councilRatesAnnual:1220.04,waterAnnual:800.04,insuranceMonthly:50,bodyCorpMonthly:116.67,managementPct:8,vacancyPct:0,maintenanceAnnual:0,otherMonthly:0,valueAdd:0,floodRisk:0,development:0,historicalSample:true,notes:'Directly based on the workbook $275K Moorooka QLD sheet. It used a 5% deposit, $7,341 LMI, $290/week rent, 8% property management formula (despite the label saying 10%), council $305/qtr, water $200/qtr and body corporate $116.67/month. The workbook stored the IO repayment as $1,140.59/month.'},
 {id:'sample-280',state:'QLD',propertyType:'unit',name:'Moorooka QLD – Historical $280K Scenario',purchasePrice:280000,weeklyRent:290,landSize:0,ownershipShare:50,depositPct:5,interestRate:5,loanType:'IO',loanTerm:30,lmi:7341,stampDuty:11015,mortgageRegistration:107,transferFee:214,conveyancing:1000,buildingPest:1000,councilRatesAnnual:1220.04,waterAnnual:800.04,insuranceMonthly:50,bodyCorpMonthly:116.67,managementPct:8,vacancyPct:0,maintenanceAnnual:0,otherMonthly:0,valueAdd:0,floodRisk:0,development:0,historicalSample:true,notes:'Directly based on the workbook $280K Moorooka QLD sheet. It used a 5% deposit, $7,341 LMI, $290/week rent, 8% property management formula, council $305/qtr, water $200/qtr and body corporate $116.67/month. The workbook stored the IO repayment as $1,441.85/month.'}
];
const defaults={id:'',name:'',state:'NSW',propertyType:'house',address:'',url:'',marketSuburb:'',marketScore:'',purchasePrice:285000,weeklyRent:400,landSize:0,ownershipShare:100,depositPct:20,interestRate:6.2,loanType:'PI',loanTerm:30,lmi:0,stampDuty:0,mortgageRegistration:0,transferFee:0,conveyancing:1800,buildingPest:650,councilRatesAnnual:0,waterAnnual:0,insuranceMonthly:0,bodyCorpMonthly:0,managementPct:7.7,vacancyPct:2,maintenanceAnnual:1500,otherMonthly:0,valueAdd:0,floodRisk:0,development:0,historicalSample:false,zoning:'',minimumLotSize:'',floodOverlay:'unknown',heritageOverlay:'unknown',bushfireOverlay:'unknown',planningCheckedAt:'',planningApiStatus:'',planningSourceUrl:'',planningCoverage:'',notes:''};
let properties=load(); let selectedCompare=new Set(properties.slice(0,3).map(p=>p.id));

function load(){try{const x=JSON.parse(localStorage.getItem(STORAGE_KEY));return Array.isArray(x)&&x.length?x:structuredClone(sampleProperties)}catch{return structuredClone(sampleProperties)}}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(properties));}
function n(v){return Number(v)||0}

function calcTransferDuty(state, price){
 price=Math.max(0,Number(price)||0);
 if(state==='NSW'){
  if(price<=18000)return Math.max(20,price*0.0125);
  if(price<=38000)return 225+(price-18000)*0.015;
  if(price<=103000)return 525+(price-38000)*0.0175;
  if(price<=387000)return 1662+(price-103000)*0.035;
  if(price<=1290000)return 11602+(price-387000)*0.045;
  return 52237+(price-1290000)*0.055;
 }
 if(state==='QLD'){
  if(price<=5000)return 0;
  if(price<=75000)return Math.ceil((price-5000)/100)*1.5;
  if(price<=540000)return 1050+Math.ceil((price-75000)/100)*3.5;
  if(price<=1000000)return 17325+Math.ceil((price-540000)/100)*4.5;
  return 38025+Math.ceil((price-1000000)/100)*5.75;
 }
 return null;
}

function calc(p){
 const price=n(p.purchasePrice), deposit=price*n(p.depositPct)/100, baseLoan=Math.max(0,price-deposit), totalLoan=baseLoan+n(p.lmi);
 const r=n(p.interestRate)/100/12, months=Math.max(1,n(p.loanTerm)*12);
 let loanMonthly=0;if(p.loanType==='IO') loanMonthly=totalLoan*n(p.interestRate)/100/12; else if(r===0) loanMonthly=totalLoan/months; else loanMonthly=totalLoan*r*Math.pow(1+r,months)/(Math.pow(1+r,months)-1);
 const grossAnnual=n(p.weeklyRent)*52, grossMonthly=grossAnnual/12, vacancyMonthly=grossMonthly*n(p.vacancyPct)/100, effectiveRentMonthly=grossMonthly-vacancyMonthly;
 const managementMonthly=effectiveRentMonthly*n(p.managementPct)/100;
 const operatingMonthly=n(p.councilRatesAnnual)/12+n(p.waterAnnual)/12+n(p.insuranceMonthly)+n(p.bodyCorpMonthly)+managementMonthly+n(p.maintenanceAnnual)/12+n(p.otherMonthly);
 const netMonthly=effectiveRentMonthly-loanMonthly-operatingMonthly, cashNeeded=deposit+n(p.stampDuty)+n(p.mortgageRegistration)+n(p.transferFee)+n(p.conveyancing)+n(p.buildingPest);
 const grossYield=price?grossAnnual/price*100:0, netYield=price?(grossAnnual-vacancyMonthly*12-operatingMonthly*12)/price*100:0;
 const cashOnCash=cashNeeded?netMonthly*12/cashNeeded*100:0;
 const landBonus=Math.min(15,n(p.landSize)/1000*2), yieldScore=Math.min(45,Math.max(0,(grossYield-3)*8)), cashScore=Math.max(0,20-Math.max(0,-netMonthly)/40), va=n(p.valueAdd)*4+n(p.development)*4+landBonus, riskPenalty=n(p.floodRisk)*8;
 const propertyScore=Math.max(0,Math.min(100,Math.round(20+yieldScore+cashScore+va-riskPenalty)));
 const linkedMarketScore=n(p.marketScore);const score=linkedMarketScore?Math.round(propertyScore*0.65+linkedMarketScore*0.35):propertyScore;
 return {price,deposit,baseLoan,totalLoan,loanMonthly,grossAnnual,grossMonthly,vacancyMonthly,effectiveRentMonthly,managementMonthly,operatingMonthly,netMonthly,cashNeeded,grossYield,netYield,cashOnCash,propertyScore,marketScore:linkedMarketScore,score};
}
function metric(label,value,sub=''){const t=document.getElementById('metricTemplate').content.cloneNode(true);t.querySelector('.kpi-label').textContent=label;t.querySelector('.kpi-value').textContent=value;t.querySelector('.kpi-sub').textContent=sub;return t}
function marketScore(m,budget=450000){
 let score=0;
 // 30 points: DSR. 50 is investable; 70 receives full points.
 score+=Math.max(0,Math.min(30,(n(m.dsr)-40)*1.5));
 // 25 points: vacancy. Full points at <=1%; still some credit to 3%.
 score+=Math.max(0,Math.min(25,(3.5-n(m.vacancyRate))*10));
 // 25 points: rental yield. 4%=12.5, 6%=25.
 score+=Math.max(0,Math.min(25,(n(m.grossRentalYield)-3)*8.333));
 // 20 points: affordability relative to the user's target budget.
 const b=Math.max(1,n(budget)); const ratio=n(m.typicalValue)/b;
 score+=ratio<=1?20:ratio<=1.1?14:ratio<=1.25?8:ratio<=1.5?3:0;
 return Math.round(Math.max(0,Math.min(100,score)));
}
function marketFilters(){return {state:document.getElementById('marketState')?.value||'ALL',budget:n(document.getElementById('marketBudget')?.value||450000),minDsr:n(document.getElementById('marketMinDsr')?.value||50),maxVacancy:n(document.getElementById('marketMaxVacancy')?.value||2.8),minYield:n(document.getElementById('marketMinYield')?.value||4),search:(document.getElementById('marketSearch')?.value||'').trim().toLowerCase()}}
function filteredMarkets(){const f=marketFilters();return MARKET_DATA.filter(m=>(f.state==='ALL'||m.state===f.state)&&n(m.typicalValue)<=f.budget&&n(m.dsr)>=f.minDsr&&n(m.vacancyRate)<=f.maxVacancy&&n(m.grossRentalYield)>=f.minYield&&(!f.search||`${m.suburb} ${m.postcode}`.toLowerCase().includes(f.search))).map(m=>({...m,score:marketScore(m,f.budget)})).sort((a,b)=>b.score-a.score||b.dsr-a.dsr)}
function renderRuleLists(){const d=document.getElementById('dsrRules'),h=document.getElementById('htagRules');if(d)d.innerHTML=DSR_RULES.map(r=>`<div class="rule"><strong>${escapeHtml(r.metric)}</strong><span>${escapeHtml(r.target)}</span><small>${escapeHtml(r.note||'')}</small></div>`).join('');if(h)h.innerHTML=HTAG_RULES.map(r=>`<div class="rule"><strong>${escapeHtml(r.metric)}</strong><span>${escapeHtml(r.target)}</span><small>Awaiting companion-workbook suburb data</small></div>`).join('')}
function renderMarkets(){const wrap=document.getElementById('marketCards');if(!wrap)return;const f=marketFilters(),ms=filteredMarkets();document.getElementById('marketCount').textContent=`${ms.length} of ${MARKET_DATA.length}`;const k=document.getElementById('marketKpis');k.innerHTML='';const best=ms[0],avgYield=ms.length?ms.reduce((a,m)=>a+n(m.grossRentalYield),0)/ms.length:0,avgVac=ms.length?ms.reduce((a,m)=>a+n(m.vacancyRate),0)/ms.length:0;k.append(metric('Matching markets',ms.length,`From ${MARKET_DATA.length} supplied suburbs`),metric('Best score',best?`${best.score}/100`:'—',best?`${best.suburb}, ${best.state}`:'No match'),metric('Average yield',fmtPct(avgYield),'Current filtered set'),metric('Average vacancy',fmtPct(avgVac),'Current filtered set'));wrap.innerHTML='';if(!ms.length){wrap.innerHTML='<div class="panel"><strong>No suburbs match.</strong><p class="muted">Relax one filter at a time. The supplied spreadsheet notes suggest relaxing the Demand to Supply Ratio toward 50 and vacancy/other thresholds cautiously when the shortlist is empty.</p></div>';return}ms.forEach(m=>{const el=document.createElement('article');el.className='market-card';el.innerHTML=`<div class="market-card-head"><div><p class="eyebrow">${escapeHtml(m.state)} ${escapeHtml(m.postcode)} · HOUSE</p><h3>${escapeHtml(m.suburb)}</h3></div><span class="score-badge ${m.score>=75?'good':m.score>=55?'warn':'bad'}">${m.score}/100</span></div><div class="mini-grid"><div class="mini"><span>Typical value</span><strong>${fmtMoney(m.typicalValue)}</strong></div><div class="mini"><span>Demand to Supply Ratio</span><strong>${m.dsr}</strong></div><div class="mini"><span>Vacancy</span><strong>${fmtPct(m.vacancyRate)}</strong></div><div class="mini"><span>Gross yield</span><strong>${fmtPct(m.grossRentalYield)}</strong></div></div><div class="market-actions"><small class="muted">Source: June 2026 Market Matcher dataset</small><button class="primary">Analyse a property here</button></div>`;el.querySelector('button').onclick=()=>startPropertyFromMarket(m);wrap.append(el)})}
function startPropertyFromMarket(m){const p={...defaults,id:'',state:m.state,propertyType:'house',name:`${m.suburb} investment property`,purchasePrice:0,weeklyRent:0,marketSuburb:m.suburb,marketScore:marketScore(m,marketFilters().budget),notes:`Market seed from June 2026 Market Matcher: Demand to Supply Ratio ${m.dsr}, typical value ${fmtMoney(m.typicalValue)}, vacancy ${m.vacancyRate}%, gross rental yield ${m.grossRentalYield}%. Replace property-level figures with the actual listing and verified quotes.`};fillForm(p);switchView('analyse')}
function setupMarketFinder(){['marketState','marketBudget','marketMinDsr','marketMaxVacancy','marketMinYield','marketSearch'].forEach(id=>document.getElementById(id)?.addEventListener('input',renderMarkets));document.getElementById('resetMarketFiltersBtn')?.addEventListener('click',()=>{document.getElementById('marketState').value='ALL';document.getElementById('marketBudget').value=450000;document.getElementById('marketMinDsr').value=50;document.getElementById('marketMaxVacancy').value=2.8;document.getElementById('marketMinYield').value=4;document.getElementById('marketSearch').value='';renderMarkets()});renderRuleLists();renderMarkets()}

function renderDashboard(){
 const wrap=document.getElementById('propertyCards');wrap.innerHTML='';document.getElementById('propertyCount').textContent=`${properties.length} saved`;
 const cs=properties.map(calc);const best=properties.length?Math.max(...cs.map(c=>c.score)):0;const avgYield=properties.length?cs.reduce((a,c)=>a+c.grossYield,0)/properties.length:0;const positive=cs.filter(c=>c.netMonthly>=0).length;
 const k=document.getElementById('portfolioKpis');k.innerHTML='';k.append(metric('Best screening score',`${best}/100`,'Across saved deals'),metric('Average gross yield',fmtPct(avgYield),'Saved properties'),metric('Cash-flow positive',`${positive}/${properties.length}`,'Before tax'),metric('Historical samples',`${properties.filter(p=>p.historicalSample).length}`,'From supplied workbook'));
 properties.forEach(p=>{const c=calc(p), el=document.createElement('article');el.className='property-card';el.innerHTML=`<div class="topline"><div><h3>${escapeHtml(p.name)}</h3><span class="muted">${p.url?'Listing saved':'No listing URL'}</span></div>${p.historicalSample?'<span class="sample-tag">SAMPLE</span>':''}</div><div class="mini-grid"><div class="mini"><span>Price</span><strong>${fmtMoney(c.price)}</strong></div><div class="mini"><span>Gross yield</span><strong>${fmtPct(c.grossYield)}</strong></div><div class="mini"><span>Net / month</span><strong class="${c.netMonthly>=0?'positive':'negative'}">${fmtMoney(c.netMonthly)}</strong></div><div class="mini"><span>Score</span><strong>${c.score}/100</strong></div></div>`;el.onclick=()=>editProperty(p.id);wrap.append(el)});
}
function escapeHtml(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function switchView(view){document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===view));

// NSW government spatial screening services. These are open ArcGIS REST endpoints.
const NSW_API={
 address:'https://portal.spatial.nsw.gov.au/server/rest/services/NSW_Geocoded_Addressing_Theme_multiCRS/FeatureServer/1/query',
 planning:'https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/Planning/EPI_Primary_Planning_Layers/MapServer',
 flood:'https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/Planning/Hazard/MapServer/1/query',
 bushfire:'https://portal.spatial.nsw.gov.au/server/rest/services/Hosted/NSW_BushFire_Prone_Land/FeatureServer/0/query'
};
function setPlanningStatus(text,kind=''){const el=document.getElementById('planningStatus');if(!el)return;el.textContent=text;el.className='planning-status '+kind}
function showPlanning(p){
 const val=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v||'—'};
 val('planningZoning',p.zoning||'—');
 val('planningLotSize',p.minimumLotSize?`${p.minimumLotSize} m²`:'—');
 const overlay=(id,v)=>{const el=document.getElementById(id);if(!el)return;el.textContent=v==='yes'?'FOUND':v==='no'?'Not found':'—';el.className=v==='yes'?'overlay-yes':v==='no'?'overlay-no':''};
 overlay('planningFlood',p.floodOverlay);overlay('planningHeritage',p.heritageOverlay);overlay('planningBushfire',p.bushfireOverlay);
 if(p.planningCheckedAt)setPlanningStatus(`Checked ${new Date(p.planningCheckedAt).toLocaleString('en-AU')}${p.planningApiStatus?` · ${p.planningApiStatus}`:''}`,'ok');else setPlanningStatus('Not checked.');
}
function arcUrl(base,params){const u=new URL(base);Object.entries(params).forEach(([k,v])=>u.searchParams.set(k,v));return u.toString()}
async function arcQuery(base,params){const r=await fetch(arcUrl(base,{f:'json',...params}));if(!r.ok)throw new Error(`API ${r.status}`);const j=await r.json();if(j.error)throw new Error(j.error.message||'ArcGIS error');return j}
function cleanAddressForWhere(address){return String(address||'').toUpperCase().replace(/\bNSW\b/g,'').replace(/\b\d{4}\b/g,'').replace(/[^A-Z0-9 ]+/g,' ').replace(/\s+/g,' ').trim()}
async function resolveNswAddress(address){
 const q=cleanAddressForWhere(address);if(!q)throw new Error('Enter a NSW street address first.');
 // Use the strongest usable street phrase while allowing the service to return minor formatting variants.
 const parts=q.split(' '), house=parts.shift(), phrase=parts.join(' ');
 const where=`housenumber='${house.replace(/'/g,"''")}' AND upper(address) LIKE '%${phrase.replace(/'/g,"''")}%'`;
 let j=await arcQuery(NSW_API.address,{where,outFields:'address,housenumber,OBJECTID',returnGeometry:'true',outSR:'4283',resultRecordCount:'10'});
 if(!j.features?.length){
   const relaxed=`upper(address) LIKE '%${phrase.replace(/'/g,"''")}%'`;
   j=await arcQuery(NSW_API.address,{where:relaxed,outFields:'address,housenumber,OBJECTID',returnGeometry:'true',outSR:'4283',resultRecordCount:'20'});
 }
 if(!j.features?.length)throw new Error('Address was not found in the NSW address service. Try the full street address including suburb.');
 const exact=j.features.find(f=>String(f.attributes?.housenumber||'').trim()===house)||j.features[0];
 return {x:exact.geometry.x,y:exact.geometry.y,label:exact.attributes.address||address};
}
async function pointLayer(layer,pt){return arcQuery(`${NSW_API.planning}/${layer}/query`,{where:'1=1',geometry:`${pt.x},${pt.y}`,geometryType:'esriGeometryPoint',inSR:'4283',spatialRel:'esriSpatialRelIntersects',outFields:'*',returnGeometry:'false',resultRecordCount:'10'})}
function pickAttr(attrs,names){for(const n of names){if(attrs&&attrs[n]!=null&&attrs[n]!=='')return attrs[n]}return ''}
async function checkNswPlanning(){
 if(document.getElementById('state').value!=='NSW'){alert('The automated planning overlay check currently supports NSW properties only.');return}
 const btn=document.getElementById('planningLookupBtn');btn.disabled=true;setPlanningStatus('Resolving address and checking NSW government layers…','warn');
 try{
  const pt=await resolveNswAddress(document.getElementById('address').value);
  const [zone,lot,heritage,flood,bush]=await Promise.all([
   pointLayer(2,pt),pointLayer(4,pt),pointLayer(0,pt),
   arcQuery(NSW_API.flood,{where:'1=1',geometry:`${pt.x},${pt.y}`,geometryType:'esriGeometryPoint',inSR:'4283',spatialRel:'esriSpatialRelIntersects',outFields:'*',returnGeometry:'false',resultRecordCount:'10'}),
   arcQuery(NSW_API.bushfire,{where:'1=1',geometry:`${pt.x},${pt.y}`,geometryType:'esriGeometryPoint',inSR:'4283',spatialRel:'esriSpatialRelIntersects',outFields:'d_category,category',returnGeometry:'false',resultRecordCount:'10'})
  ]);
  const za=zone.features?.[0]?.attributes||{},la=lot.features?.[0]?.attributes||{};
  const zoning=pickAttr(za,['SYM_CODE','ZONE','Zone','LAY_CLASS','LZN']);
  const lotRaw=pickAttr(la,['LOT_SIZE','LOTSIZE','MIN_LOT_SIZE','MIN_LOT','AREA','LOT_SIZE_M2','LSZ']);
  const lotNum=Number(String(lotRaw).replace(/[^0-9.]/g,''))||'';
  document.getElementById('zoning').value=zoning||'';document.getElementById('minimumLotSize').value=lotNum||'';
  document.getElementById('floodOverlay').value=flood.features?.length?'yes':'no';
  document.getElementById('heritageOverlay').value=heritage.features?.length?'yes':'no';
  document.getElementById('bushfireOverlay').value=bush.features?.length?'yes':'no';
  document.getElementById('planningCheckedAt').value=new Date().toISOString();document.getElementById('planningApiStatus').value=`NSW open data · ${pt.label}`;
  // Feed the flood screen into the existing risk score, but don't overwrite a stronger manual assessment.
  if(flood.features?.length && n(document.getElementById('floodRisk').value)<1)document.getElementById('floodRisk').value=1;
  showPlanning(readForm());renderLive();setPlanningStatus(`Government screening completed · ${pt.label}`,'ok');
 }catch(err){setPlanningStatus(`Could not complete automatic check: ${err.message}. You can still enter the overlay results manually.`, 'bad');}
 finally{btn.disabled=false}
}

document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.view===view));if(view==='compare')renderCompare();if(view==='markets')renderMarkets();window.scrollTo({top:0,behavior:'smooth'})}
const fields=Object.keys(defaults).filter(k=>k!=='id');
function readForm(){const p={id:document.getElementById('propertyId').value||uid()};fields.forEach(k=>{const el=document.getElementById(k);if(!el)return;if(el.type==='checkbox')p[k]=el.checked;else if(el.type==='number'||el.tagName==='SELECT'&&['loanTerm','valueAdd','floodRisk','development'].includes(k))p[k]=n(el.value);else p[k]=el.value});return p}
function fillForm(p){document.getElementById('propertyId').value=p.id||'';fields.forEach(k=>{const el=document.getElementById(k);if(!el)return;const v=p[k]??defaults[k];if(el.type==='checkbox')el.checked=!!v;else el.value=v});document.getElementById('formTitle').textContent=p.name||'New property';document.getElementById('deleteBtn').style.visibility=p.id?'visible':'hidden';showPlanning({...defaults,...p});renderLive()}
function editProperty(id){const p=properties.find(x=>x.id===id);if(p){fillForm(p);switchView('analyse')}}
function renderLive(){const p=readForm(),c=calc(p),k=document.getElementById('liveResults');k.innerHTML='';k.append(metric('Cash required',fmtMoney(c.cashNeeded),`${p.depositPct}% deposit + acquisition costs`),metric('Gross yield',fmtPct(c.grossYield),`${fmtMoney(p.weeklyRent)}/week rent`),metric('Net cash flow',fmtMoney(c.netMonthly)+'/mo',`${fmtMoney(c.netMonthly*12)}/year before tax`),metric('Opportunity score',`${c.score}/100`,c.marketScore?`Property ${c.propertyScore}/100 · Market ${c.marketScore}/100`:'Property-only score'));
 const badge=document.getElementById('scoreBadge');badge.textContent=`${c.score}/100`;badge.className='score-badge '+(c.score>=75?'good':c.score>=55?'warn':'bad');
 document.getElementById('breakdown').innerHTML=`<div class="breakdown-group"><strong>Purchase & finance</strong>${row('Deposit',c.deposit)}${row('Acquisition costs',c.cashNeeded-c.deposit)}${row('Loan before Lenders Mortgage Insurance',c.baseLoan)}${row('Lenders Mortgage Insurance',n(p.lmi))}${row('Total loan',c.totalLoan)}${row('Loan repayment / month',c.loanMonthly,true)}</div><div class="breakdown-group"><strong>Income & holding</strong>${row('Gross rent / month',c.grossMonthly)}${row('Vacancy allowance / month',c.vacancyMonthly,true)}${row('Management / month',c.managementMonthly,true)}${row('Other operating / month',c.operatingMonthly-c.managementMonthly,true)}${row('Net cash flow / month',c.netMonthly,c.netMonthly<0)}</div>`;
}
function row(label,value,negative=false){return `<div class="breakdown-row"><span>${label}</span><span class="${negative?'negative':''}">${fmtMoney2(value)}</span></div>`}
function renderCompare(){const picker=document.getElementById('comparePicker');picker.innerHTML='';properties.forEach(p=>{const l=document.createElement('label');l.className='compare-chip buttonlike';l.innerHTML=`<input type="checkbox" ${selectedCompare.has(p.id)?'checked':''}>${escapeHtml(p.name)}`;l.querySelector('input').onchange=e=>{e.target.checked?selectedCompare.add(p.id):selectedCompare.delete(p.id);renderCompareTable()};picker.append(l)});renderCompareTable()}
function renderCompareTable(){const ps=properties.filter(p=>selectedCompare.has(p.id)).slice(0,5), table=document.getElementById('compareTable');if(!ps.length){table.innerHTML='<tr><td>Select at least one property.</td></tr>';return}const metrics=[['Purchase price',p=>fmtMoney(calc(p).price)],['Weekly rent',p=>fmtMoney(p.weeklyRent)],['Gross yield',p=>fmtPct(calc(p).grossYield)],['Cash required',p=>fmtMoney(calc(p).cashNeeded)],['Total loan',p=>fmtMoney(calc(p).totalLoan)],['Loan / month',p=>fmtMoney(calc(p).loanMonthly)],['Operating / month',p=>fmtMoney(calc(p).operatingMonthly)],['Net cash flow / month',p=>fmtMoney(calc(p).netMonthly)],['Net yield',p=>fmtPct(calc(p).netYield)],['Cash-on-cash',p=>fmtPct(calc(p).cashOnCash)],['Land',p=>p.landSize?`${Number(p.landSize).toLocaleString()} m²`:'—'],['Value-add',p=>['None','Low','Medium','High','Very high'][n(p.valueAdd)]],['Flood risk',p=>['None known','Low','Moderate','High'][n(p.floodRisk)]],['Zoning',p=>p.zoning||'—'],['Min lot size',p=>p.minimumLotSize?`${p.minimumLotSize} m²`:'—'],['Bushfire overlay',p=>p.bushfireOverlay==='yes'?'Found':p.bushfireOverlay==='no'?'Not found':'Unknown'],['Heritage overlay',p=>p.heritageOverlay==='yes'?'Found':p.heritageOverlay==='no'?'Not found':'Unknown'],['Market score',p=>calc(p).marketScore?`${calc(p).marketScore}/100`:'—'],['Property score',p=>`${calc(p).propertyScore}/100`],['Opportunity score',p=>`${calc(p).score}/100`]];table.innerHTML=`<thead><tr><th>Metric</th>${ps.map(p=>`<th>${escapeHtml(p.name)}</th>`).join('')}</tr></thead><tbody>${metrics.map(([label,fn])=>`<tr><td>${label}</td>${ps.map(p=>`<td>${fn(p)}</td>`).join('')}</tr>`).join('')}</tbody>`}



// National planning-screening adapter layer. Each jurisdiction normalises to the same result shape.
const PLANNING_SOURCES={
 NSW:{name:'NSW Planning Portal / Spatial Services',url:'https://www.planningportal.nsw.gov.au/spatialviewer'},
 VIC:{name:'VicPlan',url:'https://mapshare.vic.gov.au/vicplan/'},
 QLD:{name:'Queensland planning & mapping',url:'https://www.planning.qld.gov.au/planning-framework/mapping'},
 SA:{name:'PlanSA / SAPPA',url:'https://sappa.plan.sa.gov.au/'},
 WA:{name:'PlanWA',url:'https://www.wa.gov.au/service/natural-resources/land-use-management/view-planning-data-planwa'},
 TAS:{name:'LISTmap / Tasmanian Planning Scheme',url:'https://maps.thelist.tas.gov.au/listmap/app/list/map'},
 ACT:{name:'ACTmapi',url:'https://www.actmapi.act.gov.au/'},
 NT:{name:'NT Planning Scheme',url:'https://nt.gov.au/property/land-planning-and-development/our-planning-system/nt-planning-scheme'}
};
const NSW_API={
 address:'https://portal.spatial.nsw.gov.au/server/rest/services/NSW_Geocoded_Addressing_Theme_multiCRS/FeatureServer/1/query',
 planning:'https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/Planning/EPI_Primary_Planning_Layers/MapServer',
 flood:'https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/Planning/Hazard/MapServer/1/query',
 bushfire:'https://portal.spatial.nsw.gov.au/server/rest/services/Hosted/NSW_BushFire_Prone_Land/FeatureServer/0/query'
};
const VIC_API='https://plan-geo.mapshare.vic.gov.au/arcgis/rest/services/Planning/PlanningReport/MapServer';
const TAS_API='https://services.thelist.tas.gov.au/arcgis/rest/services/Public/PlanningOnline/MapServer';
function setPlanningStatus(text,kind=''){const el=document.getElementById('planningStatus');if(!el)return;el.textContent=text;el.className='planning-status '+kind}
function planningSourceLinks(state){
 const wrap=document.getElementById('planningSourceLinks');if(!wrap)return;wrap.innerHTML='';
 const src=PLANNING_SOURCES[state];if(src){const a=document.createElement('a');a.href=src.url;a.target='_blank';a.rel='noopener';a.textContent=`Open official ${src.name}`;wrap.append(a)}
}
function showPlanning(p){
 const val=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v||'—'};
 val('planningZoning',p.zoning||'—');val('planningLotSize',p.minimumLotSize?`${p.minimumLotSize} m²`:'—');
 const overlay=(id,v)=>{const el=document.getElementById(id);if(!el)return;el.textContent=v==='yes'?'FOUND':v==='no'?'Not found':'Unknown';el.className=v==='yes'?'overlay-yes':v==='no'?'overlay-no':''};
 overlay('planningFlood',p.floodOverlay);overlay('planningHeritage',p.heritageOverlay);overlay('planningBushfire',p.bushfireOverlay);
 planningSourceLinks(p.state||'NSW');
 if(p.planningCheckedAt)setPlanningStatus(`Checked ${new Date(p.planningCheckedAt).toLocaleString('en-AU')} · ${p.planningApiStatus||'screening data'}`,'ok');else setPlanningStatus('Not checked.');
}
function arcUrl(base,params){const u=new URL(base);Object.entries(params).forEach(([k,v])=>u.searchParams.set(k,v));return u.toString()}
async function arcQuery(base,params){const r=await fetch(arcUrl(base,{f:'json',...params}));if(!r.ok)throw new Error(`API ${r.status}`);const j=await r.json();if(j.error)throw new Error(j.error.message||'ArcGIS error');return j}
function cleanAddressForWhere(address){return String(address||'').toUpperCase().replace(/\bNSW\b/g,'').replace(/\b\d{4}\b/g,'').replace(/[^A-Z0-9 ]+/g,' ').replace(/\s+/g,' ').trim()}
async function resolveNswAddress(address){
 const q=cleanAddressForWhere(address);if(!q)throw new Error('Enter a NSW street address first.');const parts=q.split(' '),house=parts.shift(),phrase=parts.join(' ');
 const esc=x=>x.replace(/'/g,"''");let j=await arcQuery(NSW_API.address,{where:`housenumber='${esc(house)}' AND upper(address) LIKE '%${esc(phrase)}%'`,outFields:'address,housenumber,OBJECTID',returnGeometry:'true',outSR:'4283',resultRecordCount:'10'});
 if(!j.features?.length)j=await arcQuery(NSW_API.address,{where:`upper(address) LIKE '%${esc(phrase)}%'`,outFields:'address,housenumber,OBJECTID',returnGeometry:'true',outSR:'4283',resultRecordCount:'20'});
 if(!j.features?.length)throw new Error('Address was not found in the NSW address service. Try the full street address including suburb.');const exact=j.features.find(f=>String(f.attributes?.housenumber||'').trim()===house)||j.features[0];return {x:exact.geometry.x,y:exact.geometry.y,label:exact.attributes.address||address};
}
async function resolveNationalAddress(address,state){
 if(state==='NSW')return resolveNswAddress(address);
 const q=`${address}, ${state}, Australia`;const r=await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&countrycodes=au&q=${encodeURIComponent(q)}`,{headers:{'Accept':'application/json'}});if(!r.ok)throw new Error(`Address lookup ${r.status}`);const j=await r.json();if(!j.length)throw new Error('Address could not be geocoded. Include suburb, state and postcode.');return {x:Number(j[0].lon),y:Number(j[0].lat),label:j[0].display_name};
}
function pointParams(pt,inSR='4326'){return {where:'1=1',geometry:`${pt.x},${pt.y}`,geometryType:'esriGeometryPoint',inSR,spatialRel:'esriSpatialRelIntersects',outFields:'*',returnGeometry:'false',resultRecordCount:'20'}}
function pickAttr(attrs,names){for(const n of names){if(attrs&&attrs[n]!=null&&attrs[n]!=='')return attrs[n]}return ''}
function featuresText(j){return JSON.stringify((j?.features||[]).map(f=>f.attributes||{})).toLowerCase()}
function normaliseOverlay(found){return found?'yes':'no'}
async function nswAdapter(address){
 const pt=await resolveNswAddress(address), pp=pointParams(pt,'4283');
 const [zone,lot,heritage,flood,bush]=await Promise.all([
  arcQuery(`${NSW_API.planning}/2/query`,pp),arcQuery(`${NSW_API.planning}/4/query`,pp),arcQuery(`${NSW_API.planning}/0/query`,pp),arcQuery(NSW_API.flood,pp),arcQuery(NSW_API.bushfire,{...pp,outFields:'d_category,category'})]);
 const za=zone.features?.[0]?.attributes||{},la=lot.features?.[0]?.attributes||{},lotRaw=pickAttr(la,['LOT_SIZE','LOTSIZE','MIN_LOT_SIZE','MIN_LOT','AREA','LOT_SIZE_M2','LSZ']);
 return {label:pt.label,zoning:pickAttr(za,['SYM_CODE','ZONE','Zone','LAY_CLASS','LZN']),minimumLotSize:Number(String(lotRaw).replace(/[^0-9.]/g,''))||'',floodOverlay:normaliseOverlay(flood.features?.length),heritageOverlay:normaliseOverlay(heritage.features?.length),bushfireOverlay:normaliseOverlay(bush.features?.length),coverage:'full',status:'NSW government spatial screening'};
}
async function vicAdapter(address){
 const pt=await resolveNationalAddress(address,'VIC'),q=layer=>arcQuery(`${VIC_API}/${layer}/query`,pointParams(pt));
 const [zone,bpa,bmo,fo,lsio,sbo,heritage]=await Promise.all([q(21),q(15),q(25),q(33),q(37),q(45),q(34)]);
 const za=zone.features?.[0]?.attributes||{};return {label:pt.label,zoning:pickAttr(za,['ZONE_CODE','ZONE','ZONE_DESC','ZONE_DESCRIPTION','ZONE_NAME','ZONING']),minimumLotSize:'',floodOverlay:normaliseOverlay((fo.features?.length||0)+(lsio.features?.length||0)+(sbo.features?.length||0)>0),heritageOverlay:normaliseOverlay(heritage.features?.length),bushfireOverlay:normaliseOverlay((bpa.features?.length||0)+(bmo.features?.length||0)>0),coverage:'full',status:'VicPlan government screening (FO/LSIO/SBO + BPA/BMO)'};
}
async function tasAdapter(address){
 const pt=await resolveNationalAddress(address,'TAS');const [zone,codes]=await Promise.all([arcQuery(`${TAS_API}/13/query`,pointParams(pt)),arcQuery(`${TAS_API}/14/query`,pointParams(pt))]);const za=zone.features?.[0]?.attributes||{},txt=featuresText(codes);
 return {label:pt.label,zoning:pickAttr(za,['ZONE','ZONE_NAME','ZONE_DESC','ZONE_NO','ZONENAME','ZONING']),minimumLotSize:'',floodOverlay:txt.includes('flood')?'yes':'no',heritageOverlay:txt.includes('heritage')||txt.includes('historic')?'yes':'no',bushfireOverlay:txt.includes('bushfire')?'yes':'no',coverage:'full',status:'Tasmanian Planning Scheme / LIST screening'};
}
async function manualAdapter(address,state){
 const pt=await resolveNationalAddress(address,state).catch(()=>({label:address}));return {label:pt.label,zoning:'',minimumLotSize:'',floodOverlay:'unknown',heritageOverlay:'unknown',bushfireOverlay:'unknown',coverage:'official-manual',status:`${state}: official map linked; automatic normalised overlay API not yet reliable`};
}
const STATE_ADAPTERS={NSW:nswAdapter,VIC:vicAdapter,TAS:tasAdapter,QLD:a=>manualAdapter(a,'QLD'),SA:a=>manualAdapter(a,'SA'),WA:a=>manualAdapter(a,'WA'),ACT:a=>manualAdapter(a,'ACT'),NT:a=>manualAdapter(a,'NT')};
async function checkPlanning(){
 const state=document.getElementById('state').value,address=document.getElementById('address').value.trim();if(!address){alert('Enter the property street address first.');return}const btn=document.getElementById('planningLookupBtn');btn.disabled=true;setPlanningStatus(`Checking ${state} planning data…`,'warn');planningSourceLinks(state);
 try{const result=await STATE_ADAPTERS[state](address);document.getElementById('zoning').value=result.zoning||'';document.getElementById('minimumLotSize').value=result.minimumLotSize||'';document.getElementById('floodOverlay').value=result.floodOverlay||'unknown';document.getElementById('heritageOverlay').value=result.heritageOverlay||'unknown';document.getElementById('bushfireOverlay').value=result.bushfireOverlay||'unknown';document.getElementById('planningCheckedAt').value=new Date().toISOString();document.getElementById('planningApiStatus').value=result.status;document.getElementById('planningCoverage').value=result.coverage;document.getElementById('planningSourceUrl').value=PLANNING_SOURCES[state]?.url||'';
  if(result.floodOverlay==='yes'&&n(document.getElementById('floodRisk').value)<1)document.getElementById('floodRisk').value=1;showPlanning(readForm());renderLive();
  if(result.coverage==='official-manual')setPlanningStatus(`${state} address resolved. Automatic overlay normalisation is not yet dependable here — use the official map link and enter results manually.`,'warn');else setPlanningStatus(`Government screening completed · ${result.label}`,'ok');
 }catch(err){setPlanningStatus(`Could not complete the ${state} check: ${err.message}. Use the official map link and enter overlay results manually.`,'bad')}finally{btn.disabled=false}
}
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>switchView(t.dataset.view));
document.getElementById('planningLookupBtn').onclick=checkPlanning;
document.getElementById('state').addEventListener('change',()=>planningSourceLinks(document.getElementById('state').value));
document.getElementById('newPropertyBtn').onclick=()=>{fillForm({...defaults,id:''});switchView('analyse')};
document.getElementById('calcDutyBtn').onclick=()=>{const state=document.getElementById('state').value,price=n(document.getElementById('purchasePrice').value),duty=calcTransferDuty(state,price);if(duty===null){alert('Automatic duty is currently implemented for standard NSW and QLD investment purchases only. Enter the official calculator result manually for this state.');return;}document.getElementById('stampDuty').value=duty.toFixed(2);renderLive();};
document.getElementById('duplicateBtn').onclick=()=>{const p=readForm();p.id='';p.name=`${p.name||'Property'} copy`;fillForm(p)};
document.getElementById('propertyForm').addEventListener('input',renderLive);
document.getElementById('propertyForm').onsubmit=e=>{e.preventDefault();const p=readForm(),i=properties.findIndex(x=>x.id===p.id);if(i>=0)properties[i]=p;else properties.unshift(p);save();renderDashboard();selectedCompare.add(p.id);switchView('dashboard')};
document.getElementById('deleteBtn').onclick=()=>{const id=document.getElementById('propertyId').value;if(!id)return;properties=properties.filter(p=>p.id!==id);selectedCompare.delete(id);save();renderDashboard();switchView('dashboard')};
document.getElementById('exportBtn').onclick=()=>{const blob=new Blob([JSON.stringify({version:1.5,exportedAt:new Date().toISOString(),properties},null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='property-deal-analyser.json';a.click();URL.revokeObjectURL(a.href)};
document.getElementById('importInput').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{const x=JSON.parse(await file.text()),arr=Array.isArray(x)?x:x.properties;if(!Array.isArray(arr))throw Error('No properties array found');properties=arr;save();selectedCompare=new Set(properties.slice(0,3).map(p=>p.id));renderDashboard();alert('Import complete.')}catch(err){alert('Could not import this JSON file: '+err.message)}e.target.value=''};
document.getElementById('resetSamplesBtn').onclick=()=>{properties=structuredClone(sampleProperties);save();selectedCompare=new Set(properties.slice(0,3).map(p=>p.id));renderDashboard();renderCompare();alert('Spreadsheet samples restored.')};
document.querySelectorAll('[data-guide-jump]').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.guideJump)));
renderDashboard();fillForm({...defaults,id:''});setupMarketFinder();
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
