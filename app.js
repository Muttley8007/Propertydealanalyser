const STORAGE_KEY='propertyDealAnalyser.v1';
const fmtMoney=n=>new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0}).format(Number(n)||0);
const fmtMoney2=n=>new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',minimumFractionDigits:2,maximumFractionDigits:2}).format(Number(n)||0);
const fmtPct=n=>`${(Number(n)||0).toFixed(2)}%`;
const uid=()=>crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;

const sampleProperties=[
 {id:'sample-180',state:'QLD',propertyType:'unit',name:'Historical $180K Purchase Analysis',purchasePrice:180000,weeklyRent:300,landSize:0,ownershipShare:50,depositPct:5,interestRate:7.5,loanType:'IO',loanTerm:30,lmi:0,stampDuty:6830,mortgageRegistration:140,transferFee:1134,conveyancing:500,buildingPest:500,councilRatesAnnual:1400,waterAnnual:0,insuranceMonthly:70,bodyCorpMonthly:0,managementPct:10,vacancyPct:0,maintenanceAnnual:0,otherMonthly:0,valueAdd:0,floodRisk:0,development:0,historicalSample:true,notes:'Transcribed from the workbook $180K sheet. Workbook showed $150/week rent per owner / $1,200 monthly for both and $1,125 monthly IO repayments. Some totals in that legacy sheet omit Building & Pest; this app recalculates consistently from the entered inputs.'},
 {id:'sample-210',state:'QLD',propertyType:'unit',name:'Historical $210K Purchase Analysis',purchasePrice:210000,weeklyRent:300,landSize:0,ownershipShare:50,depositPct:5,interestRate:7.5,loanType:'IO',loanTerm:30,lmi:0,stampDuty:7255,mortgageRegistration:140,transferFee:1341,conveyancing:500,buildingPest:0,councilRatesAnnual:1400,waterAnnual:0,insuranceMonthly:70,bodyCorpMonthly:0,managementPct:10,vacancyPct:0,maintenanceAnnual:0,otherMonthly:0,valueAdd:0,floodRisk:0,development:0,historicalSample:true,notes:'Transcribed from the workbook $210K sheet. Workbook showed $150/week rent per owner / $1,200 monthly for both and $1,312.50 monthly IO repayments. Purchase costs were stamp duty, mortgage registration, transfer and conveyancing.'},
 {id:'sample-275',state:'QLD',propertyType:'unit',name:'Moorooka QLD – Historical $275K Scenario',purchasePrice:275000,weeklyRent:290,landSize:0,ownershipShare:50,depositPct:5,interestRate:5,loanType:'IO',loanTerm:30,lmi:7341,stampDuty:8050,mortgageRegistration:162.9,transferFee:470.9,conveyancing:1000,buildingPest:1000,councilRatesAnnual:1220.04,waterAnnual:800.04,insuranceMonthly:50,bodyCorpMonthly:116.67,managementPct:8,vacancyPct:0,maintenanceAnnual:0,otherMonthly:0,valueAdd:0,floodRisk:0,development:0,historicalSample:true,notes:'Directly based on the workbook $275K Moorooka QLD sheet. It used a 5% deposit, $7,341 LMI, $290/week rent, 8% property management formula (despite the label saying 10%), council $305/qtr, water $200/qtr and body corporate $116.67/month. The workbook stored the IO repayment as $1,140.59/month.'},
 {id:'sample-280',state:'QLD',propertyType:'unit',name:'Moorooka QLD – Historical $280K Scenario',purchasePrice:280000,weeklyRent:290,landSize:0,ownershipShare:50,depositPct:5,interestRate:5,loanType:'IO',loanTerm:30,lmi:7341,stampDuty:11015,mortgageRegistration:107,transferFee:214,conveyancing:1000,buildingPest:1000,councilRatesAnnual:1220.04,waterAnnual:800.04,insuranceMonthly:50,bodyCorpMonthly:116.67,managementPct:8,vacancyPct:0,maintenanceAnnual:0,otherMonthly:0,valueAdd:0,floodRisk:0,development:0,historicalSample:true,notes:'Directly based on the workbook $280K Moorooka QLD sheet. It used a 5% deposit, $7,341 LMI, $290/week rent, 8% property management formula, council $305/qtr, water $200/qtr and body corporate $116.67/month. The workbook stored the IO repayment as $1,441.85/month.'}
];
const defaults={id:'',name:'',state:'NSW',propertyType:'house',address:'',url:'',purchasePrice:285000,weeklyRent:400,landSize:0,ownershipShare:100,depositPct:20,interestRate:6.2,loanType:'PI',loanTerm:30,lmi:0,stampDuty:0,mortgageRegistration:0,transferFee:0,conveyancing:1800,buildingPest:650,councilRatesAnnual:0,waterAnnual:0,insuranceMonthly:0,bodyCorpMonthly:0,managementPct:7.7,vacancyPct:2,maintenanceAnnual:1500,otherMonthly:0,valueAdd:0,floodRisk:0,development:0,historicalSample:false,zoning:'',minimumLotSize:'',floodOverlay:'unknown',heritageOverlay:'unknown',bushfireOverlay:'unknown',planningCheckedAt:'',planningApiStatus:'',notes:''};
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
 const score=Math.max(0,Math.min(100,Math.round(20+yieldScore+cashScore+va-riskPenalty)));
 return {price,deposit,baseLoan,totalLoan,loanMonthly,grossAnnual,grossMonthly,vacancyMonthly,effectiveRentMonthly,managementMonthly,operatingMonthly,netMonthly,cashNeeded,grossYield,netYield,cashOnCash,score};
}
function metric(label,value,sub=''){const t=document.getElementById('metricTemplate').content.cloneNode(true);t.querySelector('.kpi-label').textContent=label;t.querySelector('.kpi-value').textContent=value;t.querySelector('.kpi-sub').textContent=sub;return t}
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

document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.view===view));if(view==='compare')renderCompare();window.scrollTo({top:0,behavior:'smooth'})}
const fields=Object.keys(defaults).filter(k=>k!=='id');
function readForm(){const p={id:document.getElementById('propertyId').value||uid()};fields.forEach(k=>{const el=document.getElementById(k);if(!el)return;if(el.type==='checkbox')p[k]=el.checked;else if(el.type==='number'||el.tagName==='SELECT'&&['loanTerm','valueAdd','floodRisk','development'].includes(k))p[k]=n(el.value);else p[k]=el.value});return p}
function fillForm(p){document.getElementById('propertyId').value=p.id||'';fields.forEach(k=>{const el=document.getElementById(k);if(!el)return;const v=p[k]??defaults[k];if(el.type==='checkbox')el.checked=!!v;else el.value=v});document.getElementById('formTitle').textContent=p.name||'New property';document.getElementById('deleteBtn').style.visibility=p.id?'visible':'hidden';showPlanning({...defaults,...p});renderLive()}
function editProperty(id){const p=properties.find(x=>x.id===id);if(p){fillForm(p);switchView('analyse')}}
function renderLive(){const p=readForm(),c=calc(p),k=document.getElementById('liveResults');k.innerHTML='';k.append(metric('Cash required',fmtMoney(c.cashNeeded),`${p.depositPct}% deposit + acquisition costs`),metric('Gross yield',fmtPct(c.grossYield),`${fmtMoney(p.weeklyRent)}/week rent`),metric('Net cash flow',fmtMoney(c.netMonthly)+'/mo',`${fmtMoney(c.netMonthly*12)}/year before tax`),metric('Cash-on-cash',fmtPct(c.cashOnCash),'Based on modelled cash required'));
 const badge=document.getElementById('scoreBadge');badge.textContent=`${c.score}/100`;badge.className='score-badge '+(c.score>=75?'good':c.score>=55?'warn':'bad');
 document.getElementById('breakdown').innerHTML=`<div class="breakdown-group"><strong>Purchase & finance</strong>${row('Deposit',c.deposit)}${row('Acquisition costs',c.cashNeeded-c.deposit)}${row('Loan before LMI',c.baseLoan)}${row('LMI',n(p.lmi))}${row('Total loan',c.totalLoan)}${row('Loan repayment / month',c.loanMonthly,true)}</div><div class="breakdown-group"><strong>Income & holding</strong>${row('Gross rent / month',c.grossMonthly)}${row('Vacancy allowance / month',c.vacancyMonthly,true)}${row('Management / month',c.managementMonthly,true)}${row('Other operating / month',c.operatingMonthly-c.managementMonthly,true)}${row('Net cash flow / month',c.netMonthly,c.netMonthly<0)}</div>`;
}
function row(label,value,negative=false){return `<div class="breakdown-row"><span>${label}</span><span class="${negative?'negative':''}">${fmtMoney2(value)}</span></div>`}
function renderCompare(){const picker=document.getElementById('comparePicker');picker.innerHTML='';properties.forEach(p=>{const l=document.createElement('label');l.className='compare-chip buttonlike';l.innerHTML=`<input type="checkbox" ${selectedCompare.has(p.id)?'checked':''}>${escapeHtml(p.name)}`;l.querySelector('input').onchange=e=>{e.target.checked?selectedCompare.add(p.id):selectedCompare.delete(p.id);renderCompareTable()};picker.append(l)});renderCompareTable()}
function renderCompareTable(){const ps=properties.filter(p=>selectedCompare.has(p.id)).slice(0,5), table=document.getElementById('compareTable');if(!ps.length){table.innerHTML='<tr><td>Select at least one property.</td></tr>';return}const metrics=[['Purchase price',p=>fmtMoney(calc(p).price)],['Weekly rent',p=>fmtMoney(p.weeklyRent)],['Gross yield',p=>fmtPct(calc(p).grossYield)],['Cash required',p=>fmtMoney(calc(p).cashNeeded)],['Total loan',p=>fmtMoney(calc(p).totalLoan)],['Loan / month',p=>fmtMoney(calc(p).loanMonthly)],['Operating / month',p=>fmtMoney(calc(p).operatingMonthly)],['Net cash flow / month',p=>fmtMoney(calc(p).netMonthly)],['Net yield',p=>fmtPct(calc(p).netYield)],['Cash-on-cash',p=>fmtPct(calc(p).cashOnCash)],['Land',p=>p.landSize?`${Number(p.landSize).toLocaleString()} m²`:'—'],['Value-add',p=>['None','Low','Medium','High','Very high'][n(p.valueAdd)]],['Flood risk',p=>['None known','Low','Moderate','High'][n(p.floodRisk)]],['Zoning',p=>p.zoning||'—'],['Min lot size',p=>p.minimumLotSize?`${p.minimumLotSize} m²`:'—'],['Bushfire overlay',p=>p.bushfireOverlay==='yes'?'Found':p.bushfireOverlay==='no'?'Not found':'Unknown'],['Heritage overlay',p=>p.heritageOverlay==='yes'?'Found':p.heritageOverlay==='no'?'Not found':'Unknown'],['Screening score',p=>`${calc(p).score}/100`]];table.innerHTML=`<thead><tr><th>Metric</th>${ps.map(p=>`<th>${escapeHtml(p.name)}</th>`).join('')}</tr></thead><tbody>${metrics.map(([label,fn])=>`<tr><td>${label}</td>${ps.map(p=>`<td>${fn(p)}</td>`).join('')}</tr>`).join('')}</tbody>`}



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

document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>switchView(t.dataset.view));
document.getElementById('planningLookupBtn').onclick=checkNswPlanning;
document.getElementById('newPropertyBtn').onclick=()=>{fillForm({...defaults,id:''});switchView('analyse')};
document.getElementById('calcDutyBtn').onclick=()=>{const state=document.getElementById('state').value,price=n(document.getElementById('purchasePrice').value),duty=calcTransferDuty(state,price);if(duty===null){alert('Automatic duty is currently implemented for standard NSW and QLD investment purchases only. Enter the official calculator result manually for this state.');return;}document.getElementById('stampDuty').value=duty.toFixed(2);renderLive();};
document.getElementById('duplicateBtn').onclick=()=>{const p=readForm();p.id='';p.name=`${p.name||'Property'} copy`;fillForm(p)};
document.getElementById('propertyForm').addEventListener('input',renderLive);
document.getElementById('propertyForm').onsubmit=e=>{e.preventDefault();const p=readForm(),i=properties.findIndex(x=>x.id===p.id);if(i>=0)properties[i]=p;else properties.unshift(p);save();renderDashboard();selectedCompare.add(p.id);switchView('dashboard')};
document.getElementById('deleteBtn').onclick=()=>{const id=document.getElementById('propertyId').value;if(!id)return;properties=properties.filter(p=>p.id!==id);selectedCompare.delete(id);save();renderDashboard();switchView('dashboard')};
document.getElementById('exportBtn').onclick=()=>{const blob=new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),properties},null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='property-deal-analyser.json';a.click();URL.revokeObjectURL(a.href)};
document.getElementById('importInput').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{const x=JSON.parse(await file.text()),arr=Array.isArray(x)?x:x.properties;if(!Array.isArray(arr))throw Error('No properties array found');properties=arr;save();selectedCompare=new Set(properties.slice(0,3).map(p=>p.id));renderDashboard();alert('Import complete.')}catch(err){alert('Could not import this JSON file: '+err.message)}e.target.value=''};
document.getElementById('resetSamplesBtn').onclick=()=>{properties=structuredClone(sampleProperties);save();selectedCompare=new Set(properties.slice(0,3).map(p=>p.id));renderDashboard();renderCompare();alert('Spreadsheet samples restored.')};
renderDashboard();fillForm({...defaults,id:''});
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
