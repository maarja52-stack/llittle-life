const STORE_KEY = "little-life-integrated-v1";
const LEGACY_SHOP_KEY = "sunday-market-shopping-v1";
const SYNC_ENDPOINT = "https://script.google.com/macros/s/AKfycby0AGZFmdmfwj7YMRCc4iix0bnvFmJaEoinlRAeoAPZZSVr7jP1g0Q28oTXBIOotrUbNw/exec";
const SYNC_SETTINGS_KEY = "little-life-sheets-backup-v1";
const CATEGORIES = ["Fresh fruit and vegetables", "Meat, fish and eggs", "Dairy and chilled", "Bakery and wraps", "Dry goods, grains and pasta", "Tinned, jarred and sauces", "Frozen", "Herbs, spices and cooking basics", "Optional and substitutions", "From the freezer / already have"];
const DAILY = {
  morning: [{id:"water",name:"Drink a glass of water",detail:"Your body has been running on vibes long enough."},{id:"teeth",name:"Brush your teeth",detail:"Come on. We both know you’re not negotiating this one."},{id:"moisturiser",name:"Hyaluronic acid + moisturiser",detail:"Two minutes. Do it now and thank yourself later."}],
  evening: [{id:"floss",name:"Floss your teeth",detail:"Get in between the damn things. Your dentist is watching. Probably."},{id:"evening-teeth",name:"Brush your teeth",detail:"Yep. Again. Morning-you did not do enough to earn a free pass."},{id:"skincare",name:"A little evening skincare",detail:"Wash your face. Slap on some moisturiser. Pretend you’ve got your life together."}]
};
const HOME_WEEKS = [
  {title:"Week 1 · Get the basics under control", tasks:[["Kitchen","Kitchen","25–30 min",["Clean hob","Wipe cabinet fronts","Clean sink","Wipe appliances","Clean table","Mop floor"]],["Bathroom","Bathroom","30 min",["Clean toilet","Clean sink and mirror","Clean shower and drain","Wipe taps","Mop floor","Replace towels"]],["Your bedroom","Bedroom","25 min",["Change sheets","Put clothes away","Clear bedside tables","Dust surfaces","Vacuum"]],["Child’s bedroom","Child’s bedroom","25 min",["Change sheets","Put clothes away","Clear surfaces","Dust","Vacuum","Empty rubbish"]],["Living room","Living room","30 min",["Put things away","Dust surfaces","Vacuum sofa and floor","Mop floor","Clean fingerprints"]],["WC","Separate WC","15 min",["Clean toilet","Clean sink and mirror","Wipe handle and switch","Clean floor","Restock toilet paper"]],["Hallways + entrance","Hallways","25 min",["Declutter hallways","Dust skirting","Vacuum and mop","Wipe front door","Check shoes and coats"]]]},
  {title:"Week 2 · Deeper rotation", tasks:[["Kitchen appliances","Kitchen","25 min",["Clean dishwasher filter","Wipe dishwasher door","Clean washer and dryer","Clean appliance seals","Clean kettle or coffee machine"]],["Shower deep clean","Bathroom","30–40 min",["Clean shower glass","Clean tiles and grout","Clean shower head","Clear drain","Scrub floor and corners"]],["Bedroom details","Bedroom","20 min",["Dust lamps and headboard","Check under bed","Wipe windowsill and mirrors","Vacuum corners","Tidy bedside table"]],["Child’s room details","Child’s bedroom","20 min",["Wipe desk and shelves","Check under bed","Sort clothes","Clear rubbish","Vacuum corners"]],["Living room details","Living room","30 min",["Dust electronics and lamps","Clean screen","Wipe windowsills","Vacuum sofa and corners","Check under furniture"]],["Laundry day","Laundry","45–60 min",["Sort and wash","Dry, fold, put away","Empty laundry basket","Clean detergent drawer and seal","Clean dryer filter"]],["Balcony","Balcony + storage","20 min",["Remove rubbish","Sweep and mop","Wipe furniture and railing","Check plants","Tidy stored items"]]]},
  {title:"Week 3 · Deep clean", tasks:[["Kitchen cupboards","Kitchen","20 min",["Check expired food","Wipe one cupboard section","Wipe handles","Reorganise that section"]],["Bathroom storage","Bathroom","20 min",["Check products","Discard empty items","Wipe shelves","Organise toiletries","Restock towels"]],["Floors day","Whole home","45 min",["Vacuum rooms and hallways","Vacuum bathroom and WC","Mop hard floors"]],["Doors + switches","Whole home","20 min",["Wipe door handles","Clean light switches","Wipe door edges","Remove fingerprints"]],["Windows + sills","Whole home","25–30 min",["Clean visible windows","Wipe windowsills","Clean balcony door glass"]],["Bedroom deep reset","Bedroom","30 min",["Clean under furniture","Tidy wardrobe floor","Dust thoroughly","Vacuum","Change sheets"]],["Child’s bedroom deep reset","Child’s bedroom","30 min",["Tidy under furniture","Organise wardrobe and desk","Dust","Vacuum","Change sheets"]]]},
  {title:"Week 4 · House reset", tasks:[["Living room reset","Living room","30 min",["Tidy","Vacuum and mop","Choose one drawer to declutter"]],["Kitchen reset","Kitchen","30 min",["Check fridge","Discard expired food","Clean shelves as needed","Clean sink, hob and counters","Mop floor"]],["Bathroom + WC","Bathroom","35 min",["Clean bathroom","Clean WC","Replace towels","Restock toilet paper"]],["All hallways","Hallways","25 min",["Declutter","Dust skirting","Vacuum and mop","Sort shoes, coats and bags"]],["Downstairs storage","Storage","20 min",["Check for rubbish","Put things back","Review boxes","Sweep if needed"]],["Balcony + entrance","Balcony","20 min",["Sweep balcony","Wipe furniture","Clean entrance and front door","Remove rubbish"]],["Laundry + textiles","Laundry","30 min",["Wash towels and bedding","Wash kitchen towels and bath mat","Clean dryer filter","Wipe washer seal"]],["Things I’ve been ignoring","Your choice","20 min",["Choose one drawer or cupboard","Set a 20-minute limit","Stop when the timer ends"]],["Monthly reset","Whole home","30 min",["Review kitchen","Review bathroom and WC","Review living spaces","Pick up to three priorities for next month"]]]}
];
const HOME_TASKS = HOME_WEEKS.flatMap((week, wi) => week.tasks.map((task, ti) => ({id:wi*7+ti+1,title:task[0],zone:task[1],duration:task[2],steps:task[3],week:wi+1})));
const MEALS = [
  [["Air-Fryer Chicken, Potatoes & Broccoli","600 g chicken, 700 g potatoes, 400 g broccoli","Cut and season potatoes; air fry at 190°C. Season chicken and cook through. Steam broccoli. Make extra chicken for wraps."],["Chicken Wraps","Leftover chicken, 4 wraps, lettuce, tomato, cucumber, cheese","Chop and reheat chicken. Fill wraps with vegetables, cheese and yogurt sauce; grill until crisp."],["Spaghetti Bolognese","500 g minced beef, 1 onion, 2 carrots, passata, 400 g spaghetti","Soften onion and carrot; brown beef. Add garlic, tomato paste, passata and herbs. Simmer, cook spaghetti and serve with cheese."],["Cheesy Bolognese Pasta Bake","Leftover bolognese, 250 g pasta, 120 g cheese","Mix cooked pasta and sauce in a baking dish. Top with cheese and bake at 200°C until bubbling."],["Homemade Burgers","400 g minced beef, 4 buns, lettuce, tomato, potatoes","Shape and season patties. Cook through; serve in buns with toppings and potato wedges."],["Freezer Night","Something from the freezer","Choose a freezer meal and enjoy an easy night."],["Rice-Cooker Chicken & Vegetable Soup","400 g chicken, carrots, potatoes, onion, 1 L stock, rice or noodles","Add chopped vegetables, chicken and stock to the cooker. Use soup setting; shred chicken and add rice or noodles near the end."]],
  [["Air-Fryer Meatballs + Mash + Green Beans","500 g minced beef, 1 egg, breadcrumbs, 700 g potatoes, green beans","Mix beef, egg, breadcrumbs and seasoning. Shape and air fry until cooked. Boil and mash potatoes; serve with beans."],["Meatball Pitas","Leftover meatballs, 4 pitas, lettuce, tomato, cucumber, yogurt","Reheat and slice meatballs. Fill warm pitas with vegetables and garlic yogurt."],["Creamy Chicken & Mushroom Pasta","500 g chicken, 250 g mushrooms, cream, 350 g pasta","Cook pasta. Brown chicken, add onion, mushrooms and garlic. Add cream and herbs; simmer and combine."],["Leftover Chicken Pasta","Yesterday’s pasta, salad, cucumber, tomato","Reheat pasta and serve with a fresh salad and Parmesan."],["Taco Night","500 g minced beef, 8 tortillas, lettuce, tomato, corn, cheese","Brown beef with taco seasoning. Put toppings on the table and build tacos together."],["Homemade Pizza","2 pizza bases, tomato sauce, mozzarella, toppings","Top the bases and bake until golden and crisp."],["Rice-Cooker Beef Stew","600 g stewing beef, potatoes, carrots, onion, 500 ml stock","Cut into chunks, add everything to the cooker and choose stew. Check seasoning and freeze extra portions."]],
  [["Air-Fryer Chicken Thighs + Rice","600 g chicken thighs, 250 g rice, vegetables","Season and air fry chicken until cooked through. Cook rice and vegetables; serve together."],["Chicken Fried Rice","Leftover chicken and rice, 2 eggs, onion, peas, soy sauce","Scramble eggs. Fry onion and vegetables, add rice and chicken, then return egg and season with soy."],["Lasagne","500 g minced beef, passata, lasagne sheets, béchamel, cheese","Make a simple meat sauce. Layer sauce, pasta and béchamel; finish with cheese and bake until tender."],["Lasagne + Salad","Leftover lasagne, fresh salad","Reheat lasagne and add a fresh salad."],["Fajitas","500 g chicken, 2 peppers, onion, seasoning, wraps","Slice and fry chicken with peppers and onion. Season and serve with wraps and toppings."],["Freezer Night","Freezer meal","Choose a saved soup or stew portion."],["Rice-Cooker Tomato Vegetable Soup","Onion, carrots, potatoes, courgette, passata, stock","Chop vegetables, add to the cooker with passata and stock. Cook on soup setting; serve with toasties."]],
  [["Air-Fryer Fish + Potatoes + Peas","2–4 fish fillets, 700 g potatoes, frozen peas, lemon","Air fry potato wedges. Add seasoned fish for the final 10–15 minutes. Cook peas and serve with lemon."],["Fish Cakes","Leftover fish, 400 g mashed potato, egg, breadcrumbs","Flake fish and mix with potato and egg. Shape, crumb and air fry until golden and hot through."],["Beef & Tomato Penne","500 g minced beef, onion, pepper, passata, 350 g penne","Brown beef with onion and pepper. Add passata and herbs; simmer. Cook penne and combine."],["Cheesy Pasta Bake","Leftover penne, 120 g cheese","Place pasta in a dish, cover with cheese and bake until bubbling. Add salad."],["Air-Fryer Chicken Burgers","4 chicken fillets, buns, lettuce, tomato, cucumber, potatoes","Air fry chicken and potato wedges until cooked. Build burgers with fresh toppings."],["Noodles with Chicken & Vegetables","300 g noodles, 300 g chicken, mixed vegetables, 2 eggs, soy","Cook noodles. Fry chicken and vegetables; scramble eggs in the pan. Add noodles and soy and toss."],["Rice-Cooker Chicken Curry","600 g chicken, onion, carrots, coconut milk, curry paste, stock","Add chicken, vegetables, coconut milk and curry seasoning to cooker. Cook on stew setting until chicken is fully done; serve with rice."]]
].map(week => week.map(row => ({title:row[0],ingredients:row[1].split(", "),method:row[2]})));
const SHOPPING_INGREDIENTS_BY_TITLE = {
  "Air-Fryer Chicken Drumsticks with Potatoes & Broccoli": ["8 chicken drumsticks", "800 g potatoes", "400 g broccoli", "2 tbsp oil", "1 tsp paprika"],
  "Chicken Wraps with Lettuce, Tomato, Cucumber & Garlic Yogurt Sauce": ["4 wraps", "1 lettuce", "2 tomatoes", "1 cucumber", "150 g yogurt", "1 garlic bulb"],
  "Creamy Beef & Tomato Pasta": ["500 g minced beef", "350 g pasta", "1 onion", "2 garlic cloves", "500 g passata", "150 ml cooking cream", "Italian herbs"],
  "Leftover Creamy Beef Pasta Bake": ["150 g grated cheese", "50 g breadcrumbs"],
  "Homemade Chicken Quesadillas with Cheese, Peppers & Salsa": ["8 tortillas", "400 g chicken breast", "2 bell peppers", "200 g grated cheese", "1 jar salsa"],
  "Freezer Night": [],
  "Rice-Cooker Chicken, Potato & Vegetable Stew": ["500 g chicken", "400 g potatoes", "2 carrots", "1 onion", "1 L chicken stock", "200 g mixed vegetables"],
  "Air-Fryer Sausage, Potatoes & Green Beans": ["8 sausages", "800 g potatoes", "400 g green beans", "2 tbsp oil"],
  "Sausage & Egg Fried Rice": ["300 g rice", "4 eggs", "1 onion", "150 g frozen peas", "3 tbsp soy sauce", "Spring onions"],
  "Spaghetti Carbonara": ["400 g spaghetti", "200 g bacon lardons", "3 eggs", "100 g Parmesan", "Black pepper"],
  "Leftover Carbonara with Salad": ["1 bag salad leaves", "1 cucumber", "2 tomatoes"],
  "Homemade Beef Tacos with Lettuce, Tomato, Corn & Cheese": ["500 g minced beef", "8 taco shells or tortillas", "1 lettuce", "2 tomatoes", "1 tin corn", "150 g grated cheese", "1 jar salsa"],
  "Homemade Pepperoni Pizza": ["2 pizza bases", "150 g pepperoni", "200 g mozzarella", "200 ml tomato pizza sauce"],
  "Rice-Cooker Beef & Vegetable Stew": ["600 g stewing beef", "600 g potatoes", "3 carrots", "1 onion", "750 ml beef stock", "2 celery sticks"],
  "Air-Fryer Chicken Schnitzel with Potato Wedges & Peas": ["4 chicken breasts", "800 g potatoes", "300 g frozen peas", "2 eggs", "100 g breadcrumbs", "50 g flour"],
  "Chicken Schnitzel Sandwiches with Salad": ["4 sandwich rolls", "1 lettuce", "2 tomatoes", "Mayonnaise"],
  "Beef Lasagne": ["500 g minced beef", "9 lasagne sheets", "500 g passata", "500 ml béchamel sauce", "200 g grated cheese", "1 onion"],
  "Leftover Lasagne with Salad": ["1 bag salad leaves", "1 cucumber", "2 tomatoes"],
  "Chicken Fajita Rice Bowls with Peppers, Onion & Cheese": ["400 g chicken breast", "300 g rice", "2 bell peppers", "1 onion", "150 g grated cheese", "1 packet fajita seasoning"],
  "Rice-Cooker Tomato, Vegetable & Chicken Soup": ["400 g chicken", "1 tin chopped tomatoes", "2 carrots", "2 potatoes", "1 onion", "1 L chicken stock", "1 courgette"],
  "Air-Fryer Salmon with Potatoes & Broccoli": ["4 salmon fillets", "800 g potatoes", "400 g broccoli", "1 lemon", "2 tbsp oil"],
  "Salmon Fish Cakes with Salad": ["2 eggs", "100 g breadcrumbs", "1 bag salad leaves", "1 cucumber", "2 tomatoes"],
  "Beef Stroganoff with Rice": ["600 g beef strips", "300 g rice", "250 g mushrooms", "1 onion", "200 ml sour cream", "1 tsp paprika"],
  "Leftover Beef Stroganoff": ["1 bag salad leaves", "1 cucumber", "2 tomatoes"],
  "Homemade Burgers with Fries & Salad": ["600 g minced beef", "4 burger buns", "800 g potatoes", "1 lettuce", "2 tomatoes", "1 onion"],
  "Noodles with Chicken & Vegetables": ["300 g egg noodles", "400 g chicken breast", "400 g mixed vegetables", "2 eggs", "3 tbsp soy sauce"],
  "Rice-Cooker Chicken Curry with Rice": ["600 g chicken", "300 g rice", "1 onion", "2 carrots", "1 tin coconut milk", "3 tbsp curry paste", "200 ml chicken stock"]
};
const FREEZER_ITEMS = [["Chicken soup portions","number"],["Beef stew portions","number"],["Tomato soup portions","number"],["Chicken curry portions","number"],["Extra bolognese","check"],["Cooked chicken portions","check"],["Frozen vegetables","check"],["Bread or wraps","check"]];
const uid = () => `item-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
const localKey = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
const todayKey = () => localKey(new Date());
const parseLocalDate = key => { const [y,m,d] = key.split("-").map(Number); return new Date(y,m-1,d); };
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const blankState = () => ({version:1,progress:{},home:{startDate:"",completed:{}},food:{week:1,day:new Date().getDay()===0?6:new Date().getDay()-1,activeMenuPlanId:"original",menuPlans:[],cooked:{},favorites:[],notes:{},freezer:{}},shopping:{items:[]}});
let state = loadState();
let syncSettings = loadSyncSettings();
let selectedView = "daily";
let shownMonth = new Date(new Date().getFullYear(),new Date().getMonth(),1);
let selectedCalendarDate = todayKey();
let calendarMode = "month";
let shoppingSearch = "";
let remainingOnly = false;
let toastTimer;
let timerInterval;
let timerSeconds = 0;
let timerPaused = false;
let syncTimer;
let lastBackupSnapshot = "";

function loadState(){
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if(saved&&saved.version===1){const defaults=blankState(),food={...defaults.food,...saved.food};food.menuPlans=Array.isArray(food.menuPlans)?food.menuPlans:[];food.cooked=Object.fromEntries(Object.entries(food.cooked||{}).map(([key,value])=>[migrateFoodKey(key),value]));food.favorites=(food.favorites||[]).map(migrateFoodKey);food.notes=Object.fromEntries(Object.entries(food.notes||{}).map(([key,value])=>[migrateFoodKey(key),value]));if(food.activeMenuPlanId!=="original"&&!food.menuPlans.some(plan=>plan.id===food.activeMenuPlanId))food.activeMenuPlanId="original";const shopping={...defaults.shopping,...saved.shopping};shopping.items=(shopping.items||[]).map(item=>({...item,planId:item.planId||"original"}));return {...defaults,...saved,progress:saved.progress||{},home:{...defaults.home,...saved.home},food,shopping};}
  } catch(error){console.warn("Could not load Little Life data",error);}
  const fresh=blankState();
  try {
    const old=JSON.parse(localStorage.getItem(LEGACY_SHOP_KEY));
    if(Array.isArray(old?.items)) fresh.shopping.items=old.items.filter(item=>item&&item.week&&item.name).map(item=>({...item,id:item.id||uid(),planId:"original"}));
  } catch(error){console.warn("Could not migrate the existing shopping list",error);}
  if(!fresh.shopping.items.length) fresh.shopping.items=buildShoppingItems(1,"original",MEALS[0]);
  return fresh;
}
function loadSyncSettings(){try{const saved=JSON.parse(localStorage.getItem(SYNC_SETTINGS_KEY));return {enabled:Boolean(saved?.enabled),sheet:String(saved?.sheet||"Little Life"),confirmed:Boolean(saved?.confirmed)};}catch(error){return {enabled:false,sheet:"Little Life",confirmed:false};}}
function saveSyncSettings(){try{localStorage.setItem(SYNC_SETTINGS_KEY,JSON.stringify(syncSettings));}catch(error){notify("Could not save Google Sheets settings on this device.");}}
function updateSyncStatus(message){const header=$("#syncHeaderStatus"),dialog=$("#syncDialogStatus");if(header)header.textContent=message?(message.includes("queued")?"Queued":message.includes("Sending")?"Sending":message.includes("sent")?"Sent":message.includes("Could not")?"Error":"Local only"):(syncSettings.enabled?"Backup on":"Local only");if(dialog&&message)dialog.textContent=message;}
function queueCloudBackup(){if(!syncSettings.enabled||!syncSettings.confirmed)return;clearTimeout(syncTimer);updateSyncStatus("Backup queued");syncTimer=setTimeout(()=>sendCloudBackup(false),1200);}
async function sendCloudBackup(force){
  if(!syncSettings.confirmed||(!syncSettings.enabled&&!force)){updateSyncStatus("Confirm the endpoint and enable backups first.");return;}
  const sheet=syncSettings.sheet.trim();if(!sheet){updateSyncStatus("Enter the spreadsheet tab name first.");$("#syncSheetName").focus();return;}
  const snapshot=JSON.stringify(state);if(snapshot===lastBackupSnapshot){updateSyncStatus("This snapshot is already backed up.");return;}
  updateSyncStatus("Sending backup…");
  try{
    await fetch(SYNC_ENDPOINT,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=UTF-8"},body:JSON.stringify({sheet,row:[new Date().toISOString(),snapshot]})});
    lastBackupSnapshot=snapshot;updateSyncStatus("Backup request sent. Check the sheet to confirm it arrived.");
  }catch(error){console.warn("Google Sheets backup failed",error);updateSyncStatus("Could not send the backup. Your device copy is still saved.");}
}
function migrateFoodKey(key){return /^\d+-\d+$/.test(key)?`original:${key.replace("-",":")}`:key;}
function getActivePlan(){return state.food.menuPlans.find(plan=>plan.id===state.food.activeMenuPlanId)||{id:"original",name:"Original 4-week plan",weeks:MEALS};}
function getPlanMeals(planId=state.food.activeMenuPlanId,week=state.food.week){if(planId==="original")return MEALS[week-1]||MEALS[0];return state.food.menuPlans.find(plan=>plan.id===planId)?.weeks?.[week-1]||[];}
function foodEntryKey(week=state.food.week,day=state.food.day,planId=state.food.activeMenuPlanId){return `${planId}:${week}:${day}`;}
function recipeSteps(recipe,planId=state.food.activeMenuPlanId){return planId==="original"?recipe.method.split(/\.\s+/).filter(Boolean).map(step=>step.replace(/[.]$/,"")):String(recipe.method||"").split(/\n+/).map(step=>step.trim()).filter(Boolean);}
function renderMenuPlanOptions(){const select=$("#menuPlanSelect");select.innerHTML="";[{id:"original",name:"Original 4-week plan"},...state.food.menuPlans].forEach(plan=>select.add(new Option(plan.name,plan.id)));select.value=state.food.activeMenuPlanId;}
function save(){try{localStorage.setItem(STORE_KEY,JSON.stringify(state));queueCloudBackup();}catch(error){notify("This browser could not save the latest change.");}}
function notify(message,duration=3000){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),duration);}
const POPUP_MESSAGES = {
  notStarted:["Right. Shall we actually do this?","Still sitting there? Go on then.","You've got 5 minutes. Use them.","Nope. Not tomorrow. Today.","It's not going to do itself, babe.","Less thinking. More doing.","You can absolutely ignore this. But then it'll still be here tomorrow.","Come on. It's one tiny thing."],
  halfway:["Look at you. Accidentally being productive.","We're doing it. Keep going.","Halfway there. Don't get distracted now.","Nearly done. Finish the bloody thing.","See? Not nearly as awful as you made it in your head."],
  completed:["Done. Fucking lovely.","Look at that. We actually did the thing.","Tick. Next.","And just like that, you're slightly more on top of your life.","Excellent. You may now bask in your competence.","Done. Don't make it weird.","Tiny win. Counts.","Go you."],
  allDone:["{count} / {total}. Look at you, you little domestic goddess.","All done. Now leave yourself alone.","That's enough productivity for one day.","You did the things. Go be horizontal.","Done. Get into bed before you invent another task."],
  homeReset:["Your house isn't judging you. I might be.","One room. That's all we're asking.","We're not cleaning the whole house. Calm down.","Twenty-five minutes. You can survive twenty-five minutes.","Put on a playlist and bully the clutter.","Pick a room. Attack gently.","Don't reorganise your entire life. Just clear this bloody room.","Future-you is going to be annoyingly grateful."],
  cycleNotStarted:["Still “not started”? Interesting choice.","Day one is literally waiting for you.","You don't need to feel ready. Press the bloody button.","Thirty days. One little reset at a time. Come on.","The house has been waiting. It can wait five more minutes. But not thirty days."],
  skipped:["Missed a day? And? Carry on.","You fell off. Get back on. No dramatic comeback story required.","Yesterday is none of our business. Today is.","No catching up. No punishment. Just pick up where you left off.","We're not doing perfection. We're doing “keep fucking going.”"]
};
function showPopup(type,values={}){const messages=POPUP_MESSAGES[type];if(!messages)return;const message=messages[Math.floor(Math.random()*messages.length)].replace(/\{(\w+)\}/g,(_,key)=>values[key]??`{${key}}`);notify(message,6500);}
function maybeShowViewPopup(view){
  const storageKey=`little-life-popup:${view}:${todayKey()}`;
  try{if(sessionStorage.getItem(storageKey))return;}catch(error){console.warn("Could not read popup session state",error);}
  let type="";
  if(view==="daily"){
    const progress=state.progress[todayKey()]||{morning:[],evening:[]};
    if(progress.morning.length+progress.evening.length===0)type="notStarted";
  }else if(view==="home"){
    const cycleDay=getCycleDay();
    if(!state.home.startDate)type="cycleNotStarted";
    else if(cycleDay>1&&cycleDay<=HOME_TASKS.length&&HOME_TASKS.some(task=>task.id<cycleDay&&!state.home.completed[task.id]))type="skipped";
    else if(cycleDay>=1&&cycleDay<=HOME_TASKS.length&&!state.home.completed[cycleDay])type="homeReset";
  }
  if(!type)return;
  try{sessionStorage.setItem(storageKey,"1");}catch(error){console.warn("Could not save popup session state",error);}
  showPopup(type);
}
function showCompletionPopup(before,after,total){if(after>=total){showPopup("allDone",{count:after,total});return;}if(before*2<total&&after*2>=total){showPopup("halfway");return;}showPopup("completed");}
function icon(name){const paths={sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',house:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',"calendar-days":'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',utensils:'<path d="M3 2v7a4 4 0 0 0 4 4v9M7 2v5M11 2v5a4 4 0 0 1-4 4M16 14v8M16 14a5 5 0 0 0 5-5V2c-3 0-5 3-5 7v5Z"/>',"shopping-basket":'<path d="m5 11 1 10h12l1-10M3 11h18M8 11l4-8 4 8M9 15v2m6-2v2"/>',check:'<path d="m5 12 4 4L19 6"/>',play:'<path d="m7 4 13 8-13 8z"/>',snowflake:'<path d="m12 2 0 20m8-16-16 12m16 0L4 6m8-4 3 3m-3-3-3 3m3 15 3 3m-3-3-3 3m9-15-4 1m4-1-1 4m-15 6 4-1m-4 1 1-4"/>',"rotate-ccw":'<path d="M3 7v6h6M4 13a8 8 0 1 0 2-6L3 13"/>',"list-filter":'<path d="M4 6h16M7 12h10m-7 6h4"/>',"circle-check":'<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',plus:'<path d="M12 5v14M5 12h14"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>'};return `<svg aria-hidden="true" viewBox="0 0 24 24">${paths[name]||""}</svg>`;}
function paintIcons(){ $$('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon)); }
function openView(view){selectedView=view;$$('[data-view]').forEach(section=>{const active=section.dataset.view===view;section.hidden=!active;section.classList.toggle("active",active);});$$('[data-view-target]').forEach(button=>button.classList.toggle("active",button.dataset.viewTarget===view));window.scrollTo({top:0,behavior:"smooth"});maybeShowViewPopup(view);}
function dayProgress(date=todayKey()){if(!state.progress[date])state.progress[date]={morning:[],evening:[]};const record=state.progress[date];for(const phase of ["morning","evening"]){const validTasks=new Set(DAILY[phase].map(task=>task.id));record[phase]=(Array.isArray(record[phase])?record[phase]:[]).filter(id=>validTasks.has(id));}return record;}
function renderDaily(){
  const now=new Date();$("#headerDate").textContent=now.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"});$("#dailyWeekday").textContent=now.toLocaleDateString(undefined,{weekday:"short"});$("#dailyDay").textContent=String(now.getDate()).padStart(2,"0");$("#dailyMonth").textContent=now.toLocaleDateString(undefined,{month:"long"});
  const record=dayProgress();
  for(const phase of ["morning","evening"]){const tasks=DAILY[phase],host=$(`#${phase}Tasks`);host.innerHTML=tasks.map(task=>`<label class="daily-check ${record[phase].includes(task.id)?"is-done":""}"><input type="checkbox" data-phase="${phase}" data-task="${task.id}" ${record[phase].includes(task.id)?"checked":""}><span>${task.name}</span></label>`).join("");$(`#${phase}Count`).textContent=`${record[phase].length} / ${tasks.length}`;}
  const total=record.morning.length+record.evening.length;$("#dailySavedStatus").textContent=total?`${total} small step${total===1?"":"s"} saved for today.`:"Progress saves on this device.";
  const cycleDay=getCycleDay();const todayTask=cycleDay?HOME_TASKS[cycleDay-1]:null;$("#todayHomeTitle").textContent=todayTask?todayTask.title:"Start your 30-day reset";$("#todayHomeTask").innerHTML=todayTask?`<div><strong class="today-task-title">Day ${cycleDay} · ${todayTask.zone}</strong><p>${todayTask.duration} · ${todayTask.steps[0]}</p></div><button class="button ${state.home.completed[todayTask.id]?"button-soft":"button-primary"}" type="button" id="todayHomeToggle">${state.home.completed[todayTask.id]?"Done ✓":"Mark done"}</button>`:`<div><strong class="today-task-title">A focused home task</strong><p>Start the reset whenever you’re ready.</p></div><button class="button button-soft" type="button" data-open-view="home">View plan</button>`;
  const weekday=(now.getDay()+6)%7;const dinner=getPlanMeals(state.food.activeMenuPlanId,state.food.week)[weekday]||MEALS[0][weekday];$("#todayMealTitle").textContent=dinner.title;$("#todayMeal").innerHTML=`<div><strong class="today-task-title">${escapeHTML(dinner.title)}</strong><p>${getActivePlan().name} · Week ${state.food.week} · ${weekdayName(weekday)}${state.food.cooked[foodEntryKey(state.food.week,weekday)]?" · Cooked ✓":""}</p></div><button class="button button-soft" type="button" data-open-view="food">Open recipe</button>`;
  paintIcons();
}
const renderDailyBase = renderDaily;
renderDaily = function(){
  renderDailyBase();
  const taskCopy = Object.values(DAILY).flat();
  $$(".daily-check").forEach(row=>{
    const task=taskCopy.find(item=>item.id===row.querySelector("input").dataset.task);
    if(task)row.querySelector("span").innerHTML=`<strong>${task.name}</strong><br><small>${task.detail}</small>`;
  });
  $("#dailyEncouragement").textContent="One small act of care is still care. But babe, you do actually have to do it.";
  $("#todayHomeTitle").textContent="Ready to get your shit together?";
  const cycleDay=getCycleDay(),todayTask=cycleDay?HOME_TASKS[cycleDay-1]:null,homeHost=$("#todayHomeTask");
  const taskDetails=todayTask?`<p>Day ${cycleDay} · ${todayTask.zone} · ${todayTask.duration} · ${todayTask.steps[0]}</p>`:"";
  const homeButton=todayTask?`<button class="button ${state.home.completed[todayTask.id]?"button-soft":"button-primary"}" type="button" id="todayHomeToggle">${state.home.completed[todayTask.id]?"Done ✓":"Mark done"}</button>`:'<button class="button button-soft" type="button" data-open-view="home">View plan</button>';
  homeHost.innerHTML=`<div><strong class="today-task-title">A focused home task</strong><p>One task. Not seventeen. Pick it. Do it. Stop negotiating with yourself.</p>${taskDetails}</div>${homeButton}`;
  $("#todayMeal").querySelector("button").textContent="See recipe";
};
function getCycleDay(){if(!state.home.startDate)return 0;const start=parseLocalDate(state.home.startDate),today=parseLocalDate(todayKey());return Math.floor((today-start)/86400000)+1;}
const HOME_TASK_DESCRIPTIONS = {
  1:"Let's make the place where you eat look like a place where humans eat.",
  2:"Yes, it needs doing. No, it will not clean itself while you sleep.",
  3:"Future-you would quite like somewhere nice to sleep.",
  4:"Tiny person. Surprisingly large amount of stuff.",
  5:"Clear the chaos. Reclaim the sofa.",
  6:"Fifteen minutes. You have survived worse.",
  7:"First impression of the house: let's make it less “we've given up”."
};
const HOME_WEEK_COPY = {
  2:["Okay. The basics are handled.","Now we go one layer deeper.","Nothing insane. We're not auditioning for a cleaning competition."],
  3:["Right. You wanted the satisfying bit.","Time to deal with the stuff you've been strategically ignoring."],
  4:["The final stretch.","Tie your hair up. Put on something loud.","Let's get this house feeling like <strong>your house</strong> again."]
};
function renderHome(){
  const cycleDay=getCycleDay(),completed=Object.values(state.home.completed).filter(Boolean).length;
  $("#cycleProgressText").textContent=`${completed} / 30`;
  $("#cycleProgress").style.width=`${Math.min(completed/30*100,100)}%`;
  $("#cycleBadge").textContent=cycleDay>=1&&cycleDay<=30?`Day ${cycleDay} of 30`:cycleDay>30?"Cycle complete":"Not started";
  $("#cycleHeading").textContent=cycleDay?`Day ${Math.min(cycleDay,30)} of your reset`:"Ready to stop thinking about it and start doing it?";
  $("#cycleDescription").innerHTML=state.home.startDate?`Started ${parseLocalDate(state.home.startDate).toLocaleDateString(undefined,{month:"long",day:"numeric"})}. Go at your own pace.`:"Today can be day one.<br><br>You don’t need a perfect month.<br>You don’t need a free weekend.<br>You just need to <strong>start the bloody thing.</strong><br><br>The plan stays here. Your house can catch up one little reset at a time.";
  $("#startCycle").textContent=state.home.startDate?"Restart 30-day reset →":"Start 30-day reset →";
  $("#homePlan").innerHTML=HOME_WEEKS.map((week,wi)=>{
    const weekNumber=wi+1,isOpen=wi===Math.max(0,Math.ceil(Math.max(1,cycleDay)/7)-1);
    const done=week.tasks.filter((_,ti)=>state.home.completed[wi*7+ti+1]).length;
    const guidance=(HOME_WEEK_COPY[weekNumber]||[]).map(line=>`<p>${line}</p>`).join("");
    return `<details class="home-week" ${isOpen?"open":""}><summary><span>${week.title}</span><span class="home-week-count">${done} / ${week.tasks.length} done<br><span data-week-open ${isOpen?"hidden":""}>Open Week ${weekNumber} →</span><span data-week-close ${isOpen?"":"hidden"}>Close ↑</span></span></summary><div class="home-week-body">${guidance?`<div class="muted-copy">${guidance}</div>`:""}${week.tasks.map((task,ti)=>{const id=wi*7+ti+1,description=HOME_TASK_DESCRIPTIONS[id];return `<label class="home-plan-row"><span class="day-number">${id}</span><span><strong>${task[0]}</strong><small>${task[1]} · ${task[2]}</small>${description?`<br><small>${description}</small>`:""}</span><input type="checkbox" data-home-task="${id}" ${state.home.completed[id]?"checked":""} aria-label="Mark ${task[0]} complete"></label>`;}).join("")}</div></details>`;
  }).join("");
  $("#homePlan").querySelectorAll(".home-week").forEach(details=>details.addEventListener("toggle",()=>{
    details.querySelector("[data-week-open]").hidden=details.open;
    details.querySelector("[data-week-close]").hidden=!details.open;
  }));
  paintIcons();
}
function weekdayName(day){return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][day];}
function foodCookedForDate(date){return Object.entries(state.food.cooked).filter(([,cookedDate])=>cookedDate===date).map(([key])=>{const parts=key.split(":");const planId=parts.length===3?parts[0]:"original",week=parts.length===3?Number(parts[1]):Number(key.split("-")[0]),day=parts.length===3?Number(parts[2]):Number(key.split("-")[1]);return getPlanMeals(planId,week)[day]?.title;}).filter(Boolean);}
function homeDoneOn(date){const cycle=state.home.startDate?Math.floor((parseLocalDate(date)-parseLocalDate(state.home.startDate))/86400000)+1:0;return cycle>0&&HOME_TASKS[cycle-1]&&state.home.completed[cycle]?HOME_TASKS[cycle-1]:null;}
function calendarActivity(date){const record=state.progress[date]||{},validTasks=new Set(Object.values(DAILY).flat().map(task=>task.id)),careCount=[...(record.morning||[]),...(record.evening||[])].filter(id=>validTasks.has(id)).length,homeTask=homeDoneOn(date),dinners=foodCookedForDate(date);return {careCount,homeTask,dinners,wins:careCount+(homeTask?1:0)+dinners.length};}
function weekStartFor(date){const start=parseLocalDate(date);start.setDate(start.getDate()-((start.getDay()+6)%7));return start;}
function weekLabel(date){const start=weekStartFor(date),end=new Date(start);end.setDate(end.getDate()+6);return `${start.toLocaleDateString(undefined,{month:"short",day:"numeric"})} – ${end.toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"})}`;}
function renderCalendar(){
  const year=shownMonth.getFullYear(),month=shownMonth.getMonth(),weekMode=calendarMode==="week";
  $("#monthLabel").textContent=weekMode?weekLabel(selectedCalendarDate):shownMonth.toLocaleDateString(undefined,{month:"long",year:"numeric"});
  $("#monthViewButton").setAttribute("aria-pressed",String(!weekMode));$("#weekViewButton").setAttribute("aria-pressed",String(weekMode));
  $("#calendarWeekdays").hidden=weekMode;$("#calendarGrid").hidden=weekMode;$("#calendarWeekStrip").hidden=!weekMode;
  $("#previousMonth").setAttribute("aria-label",weekMode?"Previous week":"Previous month");$("#nextMonth").setAttribute("aria-label",weekMode?"Next week":"Next month");
  const first=new Date(year,month,1),start=new Date(year,month,1-((first.getDay()+6)%7));let monthMarkup="";
  for(let index=0;index<42;index++){
    const date=new Date(start);date.setDate(start.getDate()+index);const key=localKey(date),activity=calendarActivity(key);
    monthMarkup+=`<button type="button" role="gridcell" class="calendar-day ${date.getMonth()!==month?"outside":""} ${key===selectedCalendarDate?"selected":""} ${key===todayKey()?"today":""}" data-calendar-date="${key}" aria-label="${date.toLocaleDateString(undefined,{dateStyle:"full"})}${activity.careCount?`, care ${activity.careCount} of ${Object.values(DAILY).flat().length}`:""}${activity.homeTask?`, home ${activity.homeTask.zone}`:""}${activity.dinners.length?`, dinner ${activity.dinners.join(", ")}`:""}"><span class="calendar-date">${date.getDate()}</span><span class="calendar-markers">${activity.careCount?'<i class="progress-dot"></i>':''}${activity.homeTask?'<i class="home-dot"></i>':''}${activity.dinners.length?'<i class="food-dot"></i>':''}</span></button>`;
  }
  $("#calendarGrid").innerHTML=monthMarkup;
  const weekStart=weekStartFor(selectedCalendarDate);let weekMarkup="";
  for(let index=0;index<7;index++){
    const date=new Date(weekStart);date.setDate(weekStart.getDate()+index);const key=localKey(date),activity=calendarActivity(key);
    weekMarkup+=`<button type="button" class="week-day ${key===selectedCalendarDate?"selected":""} ${key===todayKey()?"today":""}" data-calendar-date="${key}" aria-label="${date.toLocaleDateString(undefined,{dateStyle:"full"})}, ${activity.wins} little ${activity.wins===1?"win":"wins"}"><span class="week-day-name">${date.toLocaleDateString(undefined,{weekday:"short"})}</span><strong class="week-day-number">${date.getDate()}</strong><span class="week-day-markers" aria-hidden="true">${activity.careCount?'<i class="progress-dot"></i>':''}${activity.homeTask?'<i class="home-dot"></i>':''}${activity.dinners.length?'<i class="food-dot"></i>':''}</span><span class="week-day-wins">${activity.wins?`${activity.wins} ${activity.wins===1?"win":"wins"}`:"—"}</span></button>`;
  }
  $("#calendarWeekStrip").innerHTML=weekMarkup;renderCalendarDetail();renderMonthReflection();
}
function renderCalendarDetail(){
  const date=selectedCalendarDate,parsed=parseLocalDate(date),activity=calendarActivity(date),careTotal=Object.values(DAILY).flat().length;
  $("#detailDayNumber").textContent=String(parsed.getDate());$("#detailDate").textContent=parsed.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"});$("#detailKicker").textContent=date===todayKey()?"Today":"Selected day";
  const events=[];
  if(activity.careCount)events.push(`<div class="calendar-event"><span class="calendar-event-icon" aria-hidden="true">💧</span><span>Care · ${activity.careCount}/${careTotal}</span></div>`);
  if(activity.homeTask)events.push(`<div class="calendar-event"><span class="calendar-event-icon" aria-hidden="true">🏠</span><span>Home · ${escapeHTML(activity.homeTask.zone)}</span></div>`);
  activity.dinners.forEach(name=>events.push(`<div class="calendar-event"><span class="calendar-event-icon" aria-hidden="true">🍲</span><span>Dinner · ${escapeHTML(name)}</span></div>`));
  if(events.length){events.push(`<p class="calendar-win-summary">${activity.wins} little thing${activity.wins===1?"":"s"}. Not bad, babe.</p>`);$("#detailContent").innerHTML=events.join("");}
  else if(date===todayKey())$("#detailContent").innerHTML='<div class="calendar-empty"><p><strong>Nothing logged yet.</strong></p><p>And that’s okay.</p><h3>Today isn’t over, babe.</h3><p>Go do one tiny thing and come back here to give yourself a little tick.</p></div>';
  else $("#detailContent").innerHTML='<div class="calendar-empty"><p><strong>Nothing logged for this day.</strong></p><p>That’s okay. Just pick up today.</p></div>';
}
function renderMonthReflection(){
  const year=shownMonth.getFullYear(),month=shownMonth.getMonth(),daysInMonth=new Date(year,month+1,0).getDate(),now=new Date(),isCurrent=year===now.getFullYear()&&month===now.getMonth(),isPast=new Date(year,month,1)<new Date(now.getFullYear(),now.getMonth(),1),elapsedDays=isCurrent?now.getDate():isPast?daysInMonth:0;
  let wins=0,activeDays=0;
  for(let day=1;day<=daysInMonth;day++){const activity=calendarActivity(localKey(new Date(year,month,day)));wins+=activity.wins;if(day<=elapsedDays&&activity.wins)activeDays++;}
  $("#monthWinCount").textContent=`${wins} little win${wins===1?"":"s"} so far`;
  $("#monthSummaryCopy").textContent=wins?"Every little thing counts. You’re building a record of showing up.":"That's not a failure. It's just a very empty calendar. Let's put something on it.";
  const milestone=$("#monthMilestone");milestone.hidden=!wins;milestone.innerHTML=wins&&wins<10?'<p class="eyebrow">When you\'ve got a few ticks</p><h3>Look at all those little wins.</h3><p>You didn’t overhaul your life. You just kept doing the tiny things.</p><p>Turns out that works.</p>':wins>=10?'<p class="eyebrow">When you\'ve got loads of ticks</p><h3>Well, look at you.</h3><p>Apparently all those tiny things added up to quite a lot.</p><p>Rude of us to ever doubt you.</p>':'';
  const missed=$("#missedDaysReflection"),missedDays=elapsedDays-activeDays;missed.hidden=!(wins&&missedDays>0);missed.innerHTML=wins&&missedDays>0?'<p class="eyebrow">When you miss a few days</p><h3>A suspicious amount of nothing happened here.</h3><p>It\'s fine.</p><p>We\'re not starting over.<br>We\'re not making up for lost time.</p><p><strong>Just pick up today.</strong></p>':'';
  const monthEnd=$("#monthEndReflection"),monthEnded=isPast||(isCurrent&&now.getDate()===daysInMonth);monthEnd.hidden=!(monthEnded&&wins>0);monthEnd.innerHTML=monthEnded&&wins>0?`<p class="eyebrow">At the end of the month</p><h3>${shownMonth.toLocaleDateString(undefined,{month:"long"})}, you little bastard.</h3><p>You showed up. You skipped days. You did some things badly. You did some things brilliantly.</p><p>And you're still here.</p><p><strong>That's the whole point.</strong></p>`:"";
  $("#calendarTodayAction").hidden=wins>0;
}
function moveCalendar(direction){
  if(calendarMode==="week"){
    const date=parseLocalDate(selectedCalendarDate);date.setDate(date.getDate()+7*direction);selectedCalendarDate=localKey(date);shownMonth=new Date(date.getFullYear(),date.getMonth(),1);
  }else{
    shownMonth=new Date(shownMonth.getFullYear(),shownMonth.getMonth()+direction,1);const day=parseLocalDate(selectedCalendarDate).getDate(),lastDay=new Date(shownMonth.getFullYear(),shownMonth.getMonth()+1,0).getDate();selectedCalendarDate=localKey(new Date(shownMonth.getFullYear(),shownMonth.getMonth(),Math.min(day,lastDay)));
  }
  renderCalendar();
}
function goToToday(){const now=new Date();shownMonth=new Date(now.getFullYear(),now.getMonth(),1);selectedCalendarDate=todayKey();renderCalendar();}
function makeWeekTabs(hostId,handler,selected){const host=$(hostId);host.innerHTML=[1,2,3,4].map(week=>`<button type="button" class="choice-button" role="tab" data-week-choice="${week}" aria-selected="${week===selected}">Week ${week}</button>`).join("");host.querySelectorAll("[data-week-choice]").forEach(button=>button.addEventListener("click",()=>handler(Number(button.dataset.weekChoice))));}
function renderFood(){const week=state.food.week,day=state.food.day,plan=getActivePlan(),meals=getPlanMeals();renderMenuPlanOptions();$("#foodWeekTitle").textContent=`Week ${week}`;$("#foodCookedCount").textContent=`${meals.filter((_,i)=>state.food.cooked[foodEntryKey(week,i)]).length} / 7 cooked`;$("#importWeekButton").disabled=false;makeWeekTabs("#foodWeeks",value=>{state.food.week=value;renderFood();renderShopping();renderDaily();save();},week);$("#foodDays").innerHTML=meals.map((meal,index)=>`<button type="button" class="day-choice" data-food-day="${index}" aria-pressed="${index===day}">${weekdayName(index).slice(0,3)}${state.food.cooked[foodEntryKey(week,index)]?" ✓":""}</button>`).join("");const recipe=meals[day]||{title:"New dinner",ingredients:[],method:""},key=foodEntryKey();$("#recipeDayLabel").textContent=`${plan.name} · Week ${week} · ${weekdayName(day)}`;$("#recipeTitle").textContent=recipe.title;$("#recipeNote").textContent=recipe.title.includes("Freezer Night")?"A planned pause is still part of the plan.":plan.id==="original"?"Leftovers are welcome here. Cook at your own pace.":"Ingredients and cooking method are saved with this recipe.";$("#editMeal").hidden=plan.id==="original";$("#editMeal").classList.toggle("hidden",plan.id==="original");$("#recipeFavoriteLabel").textContent=state.food.favorites.includes(key)?"★ Favorite":"";$("#recipeIngredients").innerHTML=getRecipeIngredients(recipe).map(ingredient=>`<li>${escapeHTML(ingredient)}</li>`).join("");$("#recipeMethod").innerHTML=recipeSteps(recipe,plan.id).map(step=>`<li>${escapeHTML(step)}</li>`).join("");$("#recipeNoteInput").value=state.food.notes[key]||"";$("#markCooked").innerHTML=icon("check")+(state.food.cooked[key]?"Cooked ✓":"Mark cooked");$("#toggleFavorite").textContent=state.food.favorites.includes(key)?"♥":"♡";$("#toggleFavorite").setAttribute("aria-pressed",String(state.food.favorites.includes(key)));renderFreezer();paintIcons();}
function cookedProgressLabel(cooked,total){if(total===7){const milestone={1:"We have dinner!",3:"Okay, we're cooking.",5:"Look at us, organised and shit.",7:"Fed the household. Absolute scenes."};return cooked===0?"0 / 7 dinners sorted":milestone[cooked]?`${cooked} / 7 — ${milestone[cooked]}`:`${cooked} / 7 dinners sorted`;}return `${cooked} / ${total} dinners sorted`;}
const renderFoodBase=renderFood;
renderFood=function(){renderFoodBase();const meals=getPlanMeals(),cooked=meals.filter((_,index)=>state.food.cooked[foodEntryKey(state.food.week,index)]).length;$("#foodCookedCount").textContent=cookedProgressLabel(cooked,meals.length);$("#markCooked").innerHTML=icon("check")+(state.food.cooked[foodEntryKey()]?"Dinner: DONE ✓":"Yep, I made it");};
function renderFreezer(){const host=$("#freezerList");host.innerHTML=FREEZER_ITEMS.map(([name,type],index)=>{const id=`freezer-${index}`,value=state.food.freezer[id];return `<div class="freezer-row"><label for="${id}"><input id="${id}" data-freezer="${id}" type="${type===`number`?`number`:`checkbox`}" ${type===`number`?`min="0" value="${Number(value)||0}"`:value?"checked":""}>${name}</label></div>`;}).join("");}
function guessCategory(name){const text=name.toLowerCase();if(/stock|passata|sauce|coconut milk|tomato paste|taco seasoning/.test(text))return CATEGORIES[5];if(/chicken|beef|fish|meat|egg|bacon|sausage|salmon/.test(text))return CATEGORIES[1];if(/cheese|milk|cream|yogurt|parmesan|butter|béchamel/.test(text))return CATEGORIES[2];if(/wrap|bun|bread|pita|tortilla|pizza base|toast|roll/.test(text))return CATEGORIES[3];if(/pasta|spaghetti|rice|noodle|breadcrumb|lasagne/.test(text))return CATEGORIES[4];if(/frozen|peas/.test(text))return CATEGORIES[6];if(/paprika|herb|garlic powder|seasoning/.test(text))return CATEGORIES[7];if(/potato|broccoli|carrot|onion|lettuce|tomato|cucumber|mushroom|pepper|salad|lemon|courgette/.test(text))return CATEGORIES[0];if(/freezer/.test(text))return CATEGORIES[9];return CATEGORIES[8];}
function canonicalIngredient(name){return String(name).toLowerCase().replace(/^\s*(?:\d+(?:[./–-]\d+)?|[¼½¾⅓⅔])\s*(?:g|kg|ml|l|tbsp|tsp|cups?|cloves?|pieces?|fillets?|packs?)?\s+/,"").replace(/\bpotatoes\b/g,"potato").replace(/\btomatoes\b/g,"tomato").replace(/[^a-z0-9]+/g," ").trim().replace(/s\b/,"");}
function mergeShoppingDuplicates(items){
  const groups=new Map();
  items.forEach(item=>{
    const category=item.category||guessCategory(item.name),nameKey=canonicalIngredient(item.name),groupKey=[item.planId||"original",item.week||"",category,Boolean(item.manual),nameKey||item.id].join("|");
    if(!groups.has(groupKey))groups.set(groupKey,[]);
    groups.get(groupKey).push({...item,category});
  });
  return [...groups.values()].map(group=>{
    const mergedNames=[...new Set(group.flatMap(item=>item.mergedNames||[item.name]))],originalNotes=[...new Set(group.flatMap(item=>item.originalNotes||(item.note?[item.note]:[])).filter(Boolean))],originalQuantities=[...new Set(group.flatMap(item=>item.originalQuantities||(item.quantity?[item.quantity]:[])).filter(Boolean))];
    const score=name=>(/^\s*[\d¼½¾⅓⅔]/.test(name)?1000:0)+name.length,displayName=mergedNames.reduce((best,name)=>!best||score(name)>score(best)?name:best,"");
    const note=[...new Set([...originalNotes,...mergedNames])].join(" ");
    return {...group[0],name:displayName,quantity:originalQuantities.join(" · "),note,originalNotes,originalQuantities,mergedNames,mergedCount:group.reduce((count,item)=>count+(Number(item.mergedCount)||1),0),dinnerCount:originalNotes.length,checked:group.some(item=>item.checked),pantry:group.some(item=>item.pantry),manual:Boolean(group[0].manual)};
  });
}
function getRecipeIngredients(recipe){return recipe.ingredients?.length?recipe.ingredients:(SHOPPING_INGREDIENTS_BY_TITLE[recipe.title]||[]);}
function buildShoppingItems(week,planId=state.food.activeMenuPlanId,meals=getPlanMeals(planId,week)){return meals.flatMap((meal,day)=>/freezer night/i.test(meal.title)?[]:getRecipeIngredients(meal).filter(item=>!/leftover|choose from freezer|from the freezer|something from|pick something|already have/i.test(item)).map((ingredient,index)=>({id:uid(),planId,week:`Week ${week}`,name:ingredient,quantity:"",category:guessCategory(ingredient),note:meal.title,source:"Dinner plan",manual:false,checked:false,pantry:false,day,itemKey:`food-${planId}-${week}-${day}-${index}`})));}
function addMealToShopping(week,planId=state.food.activeMenuPlanId){const existing=state.shopping.items.filter(item=>item.planId===planId&&item.week===`Week ${week}`),seen=new Set(existing.map(item=>canonicalIngredient(item.name))),created=mergeShoppingDuplicates(buildShoppingItems(week,planId).filter(item=>!seen.has(canonicalIngredient(item.name))));state.shopping.items.push(...created);save();renderShopping();notify(created.length?`Added ${created.length} ingredients for ${getActivePlan().name}, Week ${week}.`:`This menu's ingredients are already on the list.`);}
function renderShopping(){const week=`Week ${state.food.week}`,plan=getActivePlan();$("#shoppingWeekTitle").textContent=week;$("#shoppingPlanTitle").textContent=plan.name;makeWeekTabs("#shoppingWeeks",value=>{state.food.week=value;renderShopping();renderFood();save();},state.food.week);const all=state.shopping.items.filter(item=>item.planId===plan.id&&item.week===week);const remaining=all.filter(item=>!item.checked&&!item.pantry).length,checked=all.filter(item=>item.checked).length;$("#remainingItems").textContent=remaining;$("#checkedItems").textContent=checked;$("#shoppingNavCount").textContent=remaining||"";const filtered=all.filter(item=>(!shoppingSearch||`${item.name} ${item.note||""}`.toLowerCase().includes(shoppingSearch))&&(!remainingOnly||(!item.checked&&!item.pantry)));const host=$("#shoppingList");host.innerHTML="";CATEGORIES.forEach(category=>{const rows=filtered.filter(item=>item.category===category);if(!rows.length)return;const section=document.createElement("section");section.className="shopping-category";const heading=document.createElement("h3");heading.innerHTML=`<span>${escapeHTML(category)}</span><small>${rows.length} item${rows.length===1?"":"s"}</small>`;section.append(heading);rows.forEach(item=>{const row=document.createElement("div");row.className=`shopping-row ${item.checked?"checked":""}`;row.innerHTML=`<input type="checkbox" ${item.checked?"checked":""} aria-label="Mark ${escapeHTML(item.name)} in basket"><span class="row-name">${escapeHTML(item.name)}</span><span class="row-amount">${escapeHTML(item.quantity||"")}</span>${item.manual?'<button class="row-delete" type="button" aria-label="Delete item">×</button>':""}`;row.querySelector("input").addEventListener("change",event=>{item.checked=event.target.checked;save();renderShopping();});row.querySelector(".row-delete")?.addEventListener("click",()=>{state.shopping.items=state.shopping.items.filter(entry=>entry.id!==item.id);save();renderShopping();});section.append(row);});host.append(section);});if(!host.children.length)host.innerHTML='<p class="empty-state">No matching items. Try changing the filter or add something above.</p>';paintIcons();}
function shoppingCategoryCopy(category,items){
  if(category===CATEGORIES[0]&&items.some(item=>item.mergedCount>1))return ["Wait.","You've got lettuce twice.","And tomatoes twice.","And potatoes approximately seventeen times.","We've merged the duplicates. You're welcome."];
  if(category===CATEGORIES[1])return ["Future-you says: check the freezer first."];
  if(category===CATEGORIES[2])return ["You might already own cheese.","Go look before buying more cheese.","Unless you want more cheese.","In which case: obviously buy the cheese."];
  if(category===CATEGORIES[4])return ["Check the cupboard before buying another packet of pasta.","You know what you've done."];
  return [];
}
function renderShoppingPersonality(){
  const week=`Week ${state.food.week}`,plan=getActivePlan(),all=state.shopping.items.filter(item=>item.planId===plan.id&&item.week===week),filtered=all.filter(item=>(!shoppingSearch||`${item.name} ${item.note||""}`.toLowerCase().includes(shoppingSearch))&&(!remainingOnly||(!item.checked&&!item.pantry)));
  const recipeNeeds=buildShoppingItems(state.food.week,plan.id).length,uniqueItems=all.length,recipes=getPlanMeals(plan.id,state.food.week).filter(meal=>!/freezer night/i.test(meal.title)).length;
  $("#recipeItemTotal").textContent=`${recipeNeeds} ingredient needs across ${recipes} dinners · ${uniqueItems} unique items on the list after merging duplicates.`;
  $$("#shoppingList .shopping-category").forEach(section=>{
    const category=section.querySelector("h3 span").textContent,items=filtered.filter(item=>item.category===category),rows=section.querySelectorAll(".shopping-row");
    rows.forEach((row,index)=>{
      const item=items[index],nameHost=row.querySelector(".row-name");if(!item)return;
      const otherNames=(item.mergedNames||[item.name]).filter(name=>name!==item.name),details=[];
      if(otherNames.length)details.push(`Also listed as ${otherNames.join(" · ")}`);
      if(item.dinnerCount>1)details.push(`Used in ${item.dinnerCount} dinners`);
      if(details.length){const note=document.createElement("small");note.textContent=details.join(" · ");nameHost.append(note);}
    });
    if(!shoppingSearch&&!remainingOnly){const lines=shoppingCategoryCopy(category,items);if(lines.length){const note=document.createElement("div");note.className="shopping-category-note";lines.forEach(line=>{const paragraph=document.createElement("p");paragraph.textContent=line;note.append(paragraph);});section.append(note);}}
  });
  const remaining=all.filter(item=>!item.checked&&!item.pantry).length,allDone=all.length>0&&all.every(item=>item.checked||item.pantry),note=$("#shoppingProgressNote");
  if(allDone){note.hidden=false;note.innerHTML='<p class="eyebrow">Shopping: DONE ✓</p><h2>Look at you.</h2><p>Fed household. Full fridge. No frantic supermarket run at 6:47pm.</p><p><strong>Absolutely fucking nailed it.</strong></p>';}
  else if(remaining>0&&remaining<=3){note.hidden=false;note.innerHTML=`<p class="eyebrow">When you're nearly done</p><h2>${remaining} thing${remaining===1?"":"s"} left</h2><p>Come on.</p><p>You're already at the shop.</p><p>Don't make another trip for three bloody things.</p>`;}
  else{note.hidden=true;note.textContent="";}
}
const renderShoppingBase=renderShopping;
renderShopping=function(){const before=state.shopping.items.length;state.shopping.items=mergeShoppingDuplicates(state.shopping.items);if(state.shopping.items.length!==before)save();renderShoppingBase();renderShoppingPersonality();};
function escapeHTML(value){return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char]));}
function calendarRerender(){renderCalendar();}
function parsePastedMenu(text){
  const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],aliases={mon:0,monday:0,tue:1,tues:1,tuesday:1,wed:2,wednesday:2,thu:3,thur:3,thurs:3,thursday:3,fri:4,friday:4,sat:5,saturday:5,sun:6,sunday:6},weekWords={one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8};
  const weeks=Array.from({length:4},()=>Array(7).fill(null));let weekIndex=-1,currentMeal=null,section="",nextDay=0,pendingDay=-1,previousWasBlank=true;const duplicates=[],sourceWeeks=new Map();
  const clean=value=>value.replace(/^\s*#+\s*/,"").replace(/^\s*[-*+]\s+/,"").replace(/^\s*\d+[.)]\s+/,"").replace(/^\*\*(.*?)\*\*$/, "$1").replace(/^__(.*?)__$/, "$1").trim();
  const addSectionValue=(target,value)=>{const values=value.split(/\s*;\s*/).map(clean).filter(Boolean);if(target==="ingredients")currentMeal.ingredients.push(...values);else if(target==="method")currentMeal.method=[currentMeal.method,...values].filter(Boolean).join("\n");};
  for(const rawLine of text.split(/\r?\n/)){
    if(!rawLine.trim()){previousWasBlank=true;continue;}
    const startsAfterBlank=previousWasBlank;previousWasBlank=false;
    let line=clean(rawLine);if(!line)continue;
    if(line.startsWith("|")&&line.endsWith("|")){const cells=line.slice(1,-1).split("|").map(cell=>clean(cell.trim()));if(/^(monday|mon|tuesday|tue|wednesday|wed|thursday|thu|friday|fri|saturday|sat|sunday|sun)$/i.test(cells[0]||""))line=`${cells[0]}: ${cells[1]||""}`;else continue;}
    const weekMatch=line.match(/^week\s*(\d+|one|two|three|four|five|six|seven|eight)\b/i);if(weekMatch){const sourceWeek=weekMatch[1].toLowerCase();if(!sourceWeeks.has(sourceWeek)&&sourceWeeks.size<4)sourceWeeks.set(sourceWeek,sourceWeeks.size);weekIndex=sourceWeeks.get(sourceWeek)??-1;currentMeal=null;section="";nextDay=0;pendingDay=-1;continue;}
    const dayMatch=line.match(/^(?:\d+[.)]?\s*)?(Monday|Mon|Tuesday|Tues?|Wednesday|Wed|Thursday|Thurs?|Friday|Fri|Saturday|Sat|Sunday|Sun)\s*(?::|[-–—|])\s*(.+)$/i);
    if(dayMatch&&weekIndex>=0){const dayIndex=aliases[dayMatch[1].toLowerCase()];if(weeks[weekIndex][dayIndex])duplicates.push(`Week ${weekIndex+1} ${days[dayIndex]}`);currentMeal={title:clean(dayMatch[2]),ingredients:[],method:""};weeks[weekIndex][dayIndex]=currentMeal;section="";continue;}
    const bareDay=line.match(/^(Monday|Mon|Tuesday|Tues?|Wednesday|Wed|Thursday|Thurs?|Friday|Fri|Saturday|Sat|Sunday|Sun)$/i);
    if(bareDay&&weekIndex>=0){pendingDay=aliases[bareDay[1].toLowerCase()];currentMeal={title:"",ingredients:[],method:""};weeks[weekIndex][pendingDay]=currentMeal;section="";continue;}
    const numberedMeal=rawLine.match(/^\s*(?:[-*+]\s*)?(\d+)[.)]\s+(.+?)\s*$/);
    if(numberedMeal&&weekIndex>=0&&(!section||startsAfterBlank)){const dayIndex=Number(numberedMeal[1])-1;if(dayIndex>=0&&dayIndex<7){if(weeks[weekIndex][dayIndex])duplicates.push(`Week ${weekIndex+1} ${days[dayIndex]}`);currentMeal={title:clean(numberedMeal[2]),ingredients:[],method:""};weeks[weekIndex][dayIndex]=currentMeal;section="";nextDay=Math.max(nextDay,dayIndex+1);pendingDay=-1;continue;}}
    if(!currentMeal)continue;
    const sectionMatch=line.match(/^(ingredients?|shopping list|method|instructions?|steps?)\s*:\s*(.*)$/i);
    if(sectionMatch){const label=sectionMatch[1].toLowerCase();section=/ingredient|shopping/.test(label)?"ingredients":"method";if(sectionMatch[2])addSectionValue(section,sectionMatch[2]);continue;}
    if(/^(ingredients?|shopping list|method|instructions?|steps?)\s*$/i.test(line)){section=/ingredient|shopping/i.test(line)?"ingredients":"method";continue;}
    if(section) addSectionValue(section,line);
    else if(!currentMeal.title){currentMeal.title=clean(line);pendingDay=-1;}
    else if(/^[-*+]\s+/.test(rawLine)&&nextDay<7){const dayIndex=nextDay++;currentMeal={title:clean(rawLine),ingredients:[],method:""};weeks[weekIndex][dayIndex]=currentMeal;}
  }
  const missing=[];weeks.forEach((week,wi)=>week.forEach((meal,di)=>{if(!meal?.title)missing.push(`Week ${wi+1} ${days[di]}`);}));
  return {weeks:weeks.map(week=>week.map(meal=>meal||{title:"",ingredients:[],method:""})),missing,duplicates};
}
function parseSingleWeekMenu(text){const hasWeekHeading=/^\s*#{0,6}\s*week\s*(?:\d+|one|two|three|four|five|six|seven|eight)\b/im.test(text);const parsed=parsePastedMenu(hasWeekHeading?text:`Week 1\n${text}`);return {meals:parsed.weeks[0],missing:parsed.missing.filter(item=>item.startsWith("Week 1 ")),duplicates:parsed.duplicates};}
function updateImportWeekStatus(){const text=$("#importWeekText").value;if(!text.trim()){$("#importWeekStatus").textContent="Paste all seven weekday recipes. Ingredients and Method sections are saved on the recipe.";return;}const parsed=parseSingleWeekMenu(text),found=7-parsed.missing.length;$(("#importWeekStatus")).textContent=parsed.duplicates.length?`Duplicate weekdays found: ${parsed.duplicates.join(", ")}.`:found===7?"Ready to import all seven recipes with their ingredients and method.":found?`Found ${found} of 7 dinners. Still need: ${parsed.missing.map(item=>item.replace("Week 1 ","")).join(", ")}.`:"No weekday recipes recognized. Include Monday through Sunday headings.";}
function renderImportPlanOptions(){const select=$("#importWeekPlan"),active=state.food.activeMenuPlanId;select.innerHTML='<option value="new">Create a new plan</option>'+state.food.menuPlans.map(plan=>`<option value="${escapeHTML(plan.id)}">${escapeHTML(plan.name)}</option>`).join("");select.value=active!=="original"&&state.food.menuPlans.some(plan=>plan.id===active)?active:"new";updateImportPlanFields();}
function updateImportPlanFields(){const isNew=$("#importWeekPlan").value==="new",wrap=$("#newImportPlanNameWrap"),nameInput=$("#importWeekPlanName");wrap.hidden=!isNew;wrap.classList.toggle("hidden",!isNew);nameInput.required=isNew;$("#saveImportedWeek").textContent=isNew?"Create plan & import week":"Import week";}
function importSingleWeek(event){event.preventDefault();const targetWeek=Number($("#importWeekTarget").value),parsed=parseSingleWeekMenu($("#importWeekText").value),status=$("#importWeekStatus");if(parsed.duplicates.length||parsed.missing.length){updateImportWeekStatus();return;}let plan;if($("#importWeekPlan").value==="new"){const name=$("#importWeekPlanName").value.trim();if(!name){status.textContent="Enter a name for this menu plan.";$("#importWeekPlanName").focus();return;}plan={id:`menu-${uid()}`,name,weeks:Array.from({length:4},()=>Array.from({length:7},(_,day)=>({title:`Dinner ${weekdayName(day)}`,ingredients:[],method:""})))};state.food.menuPlans.push(plan);}else{plan=state.food.menuPlans.find(item=>item.id===$("#importWeekPlan").value);if(!plan){status.textContent="Choose a valid menu plan, or create a new one.";return;}}plan.weeks[targetWeek-1]=parsed.meals.map(meal=>({...meal,ingredients:getRecipeIngredients(meal)}));state.shopping.items=state.shopping.items.filter(item=>item.planId!==plan.id||item.week!==`Week ${targetWeek}`||item.manual);state.food.activeMenuPlanId=plan.id;state.food.week=targetWeek;state.food.day=0;save();$("#importWeekDialog").close();event.currentTarget.reset();renderAll();openView("food");notify(`Week ${targetWeek} imported into ${plan.name}. Build the shopping list when ready.`);}
function openMealEditor(){const plan=getActivePlan();if(plan.id==="original")return;const recipe=getPlanMeals()[state.food.day];$("#editMealKicker").textContent=`${plan.name} · Week ${state.food.week} · ${weekdayName(state.food.day)}`;$("#editMealName").value=recipe.title||"";$("#editMealIngredients").value=(recipe.ingredients||[]).join("\n");$("#editMealMethod").value=recipeSteps(recipe,plan.id).join("\n");$("#editMealDialog").showModal();}
function saveEditedMeal(event){event.preventDefault();const plan=getActivePlan();if(plan.id==="original")return;const recipe=getPlanMeals()[state.food.day];recipe.title=$("#editMealName").value.trim();recipe.ingredients=$("#editMealIngredients").value.split(/\n+/).map(item=>item.trim()).filter(Boolean);recipe.method=$("#editMealMethod").value.split(/\n+/).map(step=>step.trim()).filter(Boolean).join("\n");save();$("#editMealDialog").close();renderFood();renderDaily();notify("Dinner saved to this menu plan.");}
function bindEvents(){
  $("#syncSettingsButton").addEventListener("click",()=>{$("#syncSheetName").value=syncSettings.sheet;$("#enableCloudBackup").checked=syncSettings.enabled;$("#acceptPublicEndpoint").checked=syncSettings.confirmed;$("#syncDialog").showModal();updateSyncStatus(syncSettings.enabled?"Automatic backups are on.":"Backups are off.");});
  $("#syncForm").addEventListener("submit",event=>{event.preventDefault();syncSettings.sheet=$("#syncSheetName").value.trim();syncSettings.enabled=$("#enableCloudBackup").checked;syncSettings.confirmed=$("#acceptPublicEndpoint").checked;if(syncSettings.enabled&&!syncSettings.confirmed){updateSyncStatus("Confirm the endpoint warning before enabling backups.");$("#acceptPublicEndpoint").focus();return;}saveSyncSettings();if(syncSettings.enabled)sendCloudBackup(false);else updateSyncStatus("Backup settings saved. Backups are off.");});
  $("#backupNow").addEventListener("click",()=>{syncSettings.sheet=$("#syncSheetName").value.trim();syncSettings.enabled=$("#enableCloudBackup").checked;syncSettings.confirmed=$("#acceptPublicEndpoint").checked;saveSyncSettings();sendCloudBackup(true);});
  $$('[data-close-sync]').forEach(button=>button.addEventListener("click",()=>$("#syncDialog").close()));
  $$('[data-view-target]').forEach(button=>button.addEventListener("click",()=>openView(button.dataset.viewTarget)));$$('[data-open-view]').forEach(button=>button.addEventListener("click",()=>openView(button.dataset.openView)));
  $("#morningTasks").addEventListener("change",event=>toggleDaily(event));$("#eveningTasks").addEventListener("change",event=>toggleDaily(event));
  $("#todayHomeTask").addEventListener("click",event=>{if(event.target.id==="todayHomeToggle"){const day=getCycleDay();if(day>0&&day<=30)updateHomeTask(day,!state.home.completed[day]);}});
  $("#startCycle").addEventListener("click",()=>{state.home.startDate=todayKey();state.home.completed={};save();renderHome();renderDaily();renderCalendar();showPopup("homeReset");});
  $("#homePlan").addEventListener("change",event=>{const id=Number(event.target.dataset.homeTask);if(id)updateHomeTask(id,event.target.checked);});
  $("#previousMonth").addEventListener("click",()=>moveCalendar(-1));$("#nextMonth").addEventListener("click",()=>moveCalendar(1));$("#todayButton").addEventListener("click",goToToday);$("#calendarTodayAction").addEventListener("click",goToToday);
  $("#monthViewButton").addEventListener("click",()=>{calendarMode="month";renderCalendar();});$("#weekViewButton").addEventListener("click",()=>{calendarMode="week";renderCalendar();});
  $("#calendarPanel").addEventListener("click",event=>{const button=event.target.closest("[data-calendar-date]");if(button){selectedCalendarDate=button.dataset.calendarDate;const date=parseLocalDate(selectedCalendarDate);shownMonth=new Date(date.getFullYear(),date.getMonth(),1);renderCalendar();}});
  window.addEventListener("resize",()=>{if(window.innerWidth>620&&calendarMode==="week"){calendarMode="month";renderCalendar();}});
  $("#menuPlanSelect").addEventListener("change",event=>{state.food.activeMenuPlanId=event.target.value;save();renderFood();renderShopping();renderDaily();renderCalendar();});
  $("#importWeekButton").addEventListener("click",()=>{renderImportPlanOptions();$("#importWeekTarget").value=String(state.food.week);$("#importWeekPlanName").value="";$("#importWeekText").value="";updateImportWeekStatus();$("#importWeekDialog").showModal();});$("#importWeekPlan").addEventListener("change",updateImportPlanFields);$("#importWeekText").addEventListener("input",updateImportWeekStatus);$("#importWeekForm").addEventListener("submit",importSingleWeek);$$("[data-close-import-week]").forEach(button=>button.addEventListener("click",()=>$("#importWeekDialog").close()));
  $("#foodWeeks").addEventListener("click",event=>{const button=event.target.closest("[data-week-choice]");if(button){state.food.week=Number(button.dataset.weekChoice);renderFood();renderShopping();renderDaily();save();}});$("#foodDays").addEventListener("click",event=>{const button=event.target.closest("[data-food-day]");if(button){state.food.day=Number(button.dataset.foodDay);renderFood();save();}});
  $("#buildWeekList").addEventListener("click",()=>addMealToShopping(state.food.week));$("#regenerateList").addEventListener("click",()=>addMealToShopping(state.food.week));$("#markCooked").addEventListener("click",markRecipeCooked);$("#toggleFavorite").addEventListener("click",()=>{const key=foodEntryKey(),index=state.food.favorites.indexOf(key);if(index<0)state.food.favorites.push(key);else state.food.favorites.splice(index,1);save();renderFood();});$("#recipeNoteInput").addEventListener("change",event=>{state.food.notes[foodEntryKey()]=event.target.value;save();notify("Recipe note saved.");});
  $("#freezerList").addEventListener("change",event=>{const key=event.target.dataset.freezer;if(!key)return;state.food.freezer[key]=event.target.type==="checkbox"?event.target.checked:Math.max(0,Number(event.target.value));save();});$("#cookRecipe").addEventListener("click",openCookingMode);$("#dialogMarkCooked").addEventListener("click",()=>{markRecipeCooked();$("#cookDialog").close();});$("#timerToggle").addEventListener("click",event=>{timerPaused=!timerPaused;event.currentTarget.textContent=timerPaused?"Resume":"Pause";});$("#timerReset").addEventListener("click",()=>startRecipeTimer(true));$("#cookDialog").addEventListener("close",()=>clearInterval(timerInterval));
  CATEGORIES.forEach(category=>$("#shoppingCategory").add(new Option(category,category)));$("#shoppingSearch").addEventListener("input",event=>{shoppingSearch=event.target.value.trim().toLowerCase();renderShopping();});$("#remainingOnly").addEventListener("click",event=>{remainingOnly=!remainingOnly;event.currentTarget.setAttribute("aria-pressed",String(remainingOnly));renderShopping();});$("#clearChecked").addEventListener("click",()=>{const before=state.shopping.items.length,planId=state.food.activeMenuPlanId;state.shopping.items=state.shopping.items.filter(item=>item.planId!==planId||item.week!==`Week ${state.food.week}`||!item.checked);save();renderShopping();notify(before===state.shopping.items.length?"No checked items to clear.":"Checked items cleared.");});$("#addShoppingItem").addEventListener("submit",event=>{event.preventDefault();const name=$("#shoppingName").value.trim();if(!name)return;state.shopping.items.push({id:uid(),planId:state.food.activeMenuPlanId,week:`Week ${state.food.week}`,name,quantity:$("#shoppingQuantity").value.trim(),category:$("#shoppingCategory").value,note:"",source:"Manual",manual:true,checked:false,pantry:false});save();event.currentTarget.reset();renderShopping();notify(`${name} added to the list.`);});
}
function dailyCompletionCount(record){return record.morning.length+record.evening.length;}
function toggleDaily(event){const input=event.target.closest("input[data-task]");if(!input)return;const record=dayProgress(),before=dailyCompletionCount(record),list=record[input.dataset.phase];if(input.checked&&!list.includes(input.dataset.task))list.push(input.dataset.task);if(!input.checked)record[input.dataset.phase]=list.filter(id=>id!==input.dataset.task);const after=dailyCompletionCount(record),total=DAILY.morning.length+DAILY.evening.length;save();renderDaily();renderCalendar();if(input.checked)showCompletionPopup(before,after,total);}
function updateHomeTask(id,completed){const before=HOME_TASKS.filter(task=>state.home.completed[task.id]).length;state.home.completed[id]=completed;const after=HOME_TASKS.filter(task=>state.home.completed[task.id]).length;save();renderHome();renderDaily();renderCalendar();if(completed)showCompletionPopup(before,after,HOME_TASKS.length);}
function markRecipeCooked(){const key=foodEntryKey(),wasCooked=Boolean(state.food.cooked[key]);if(wasCooked)delete state.food.cooked[key];else state.food.cooked[key]=todayKey();save();renderFood();renderDaily();renderCalendar();notify(wasCooked?"Cooked mark removed.":"Dinner: DONE ✓ Look at you, feeding people.",5000);}
function openCookingMode(){const recipe=getPlanMeals()[state.food.day];$("#cookDialogTitle").textContent=recipe.title;$("#guidedMethod").innerHTML=recipeSteps(recipe).map(step=>`<li>${escapeHTML(step)}</li>`).join("");$("#cookDialog").showModal();startRecipeTimer(false);paintIcons();}
function startRecipeTimer(reset){clearInterval(timerInterval);const recipe=getPlanMeals()[state.food.day];if(reset||!timerSeconds){const match=String(recipe.method||"").match(/(\d+)\s*[–-]\s*(\d+)\s*min|approximately\s*(\d+)\s*min|\b(\d+)\s*min/i);timerSeconds=match?Number(match[2]||match[3]||match[4]||match[1])*60:15*60;}timerPaused=false;$("#timerToggle").textContent="Pause";updateTimer();timerInterval=setInterval(()=>{if(!timerPaused&&timerSeconds>0){timerSeconds--;updateTimer();if(timerSeconds===0){clearInterval(timerInterval);notify("Timer complete.");}}},1000);}
function updateTimer(){$("#timerDisplay").textContent=`${String(Math.floor(timerSeconds/60)).padStart(2,"0")}:${String(timerSeconds%60).padStart(2,"0")}`;}
function renderAll(){renderDaily();renderHome();renderCalendar();renderFood();renderShopping();paintIcons();}
bindEvents();renderAll();updateSyncStatus();maybeShowViewPopup(selectedView);
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(error=>console.warn("Could not enable offline support",error)));