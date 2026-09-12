export const VERSION = 1;
export const objects = [['books','door','window'],['ticket','case','note'],['work','mail','light'],['boat','school','vase'],['roses','shelf','mirror'],['candle','chair','letter']];
export const options = [['tell','keep'],['address','book','hide'],['friend','craft','wait'],['child','write','mother'],['flowers','reveal','leave'],['send','help','self']];
export function initialState(){return {version:VERSION,chapter:0,phase:'explore',seen:[[],[],[],[],[],[]],choices:[],active:null,matched:false,hint:'',ending:null};}
export function available(s,id){if(s.chapter===3&&id==='mother')return s.choices[1]==='address';if(s.chapter===5&&id==='help')return s.choices[2]==='friend'||s.choices[1]==='address';if(s.chapter===5&&id==='self')return s.choices[3]==='write'||s.choices[1]==='book'||s.choices[4]==='flowers';return true;}
export function transition(state,action){const s=structuredClone(state), c=s.chapter;
 if(action.type==='inspect'&&s.phase==='explore'&&objects[c].includes(action.id)){s.active=action.id;if(!s.seen[c].includes(action.id))s.seen[c].push(action.id);}
 if(action.type==='overview'&&s.phase==='explore')s.active=null;
 if(action.type==='proceed'&&s.phase==='explore'&&s.seen[c].length>=2){s.active=null;s.phase=c===4&&!s.matched?'compare':'choice';}
 if(action.type==='compare'&&s.phase==='compare'){if(action.id==='roses'){s.matched=true;s.phase='choice';s.hint='';}else s.hint='再想一想：书可以换，镜子可以挪动。哪一样东西，是你年复一年亲手送来的？';}
 if(action.type==='choose'&&s.phase==='choice'&&options[c].includes(action.id)&&available(s,action.id)){s.choices[c]=action.id;s.phase=c===5?'ending':'response';if(c===5)s.ending=action.id;}
 if(action.type==='next'&&s.phase==='response'&&c<5){s.chapter++;s.phase='explore';s.active=null;s.hint='';}
 return s;}
export function validState(s){if(!s||s.version!==VERSION||!Number.isInteger(s.chapter)||s.chapter<0||s.chapter>5||!['explore','compare','choice','response','ending'].includes(s.phase))return false;
 if(!Array.isArray(s.seen)||s.seen.length!==6||!s.seen.every((a,i)=>Array.isArray(a)&&new Set(a).size===a.length&&a.every(x=>objects[i].includes(x))))return false;
 if(!Array.isArray(s.choices)||s.choices.length>6||!s.choices.every((v,i)=>options[i].includes(v)))return false;
 const done=s.phase==='response'||s.phase==='ending';if(s.choices.length!==s.chapter+(done?1:0))return false;
 if(s.active!==null&&(!objects[s.chapter].includes(s.active)||!s.seen[s.chapter].includes(s.active)))return false;
 if(typeof s.matched!=='boolean'||typeof s.hint!=='string')return false;
 if(s.phase==='compare'&&(s.chapter!==4||s.matched))return false;
 if(s.chapter===5&&s.phase==='response')return false;
 if(s.phase!=='ending'&&s.ending!==null)return false;
 if(s.active!==null&&s.phase!=='explore')return false;
 if(s.seen.some((a,i)=>i>s.chapter&&a.length))return false;
 if(s.seen.some((a,i)=>i<s.chapter&&a.length<2))return false;
 if(s.phase!=='explore'&&s.seen[s.chapter].length<2)return false;
 if(s.chapter<4&&s.matched)return false;
 if((s.chapter>4||(s.chapter===4&&['choice','response'].includes(s.phase)))&&!s.matched)return false;
 if(s.phase==='ending'&&(s.chapter!==5||s.ending!==s.choices[5]))return false;
 for(let i=0;i<s.choices.length;i++)if(!available({...s,chapter:i},s.choices[i]))return false;
 return true;}
