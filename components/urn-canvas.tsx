'use client';
import {Canvas} from "@react-three/fiber";
import {ContactShadows,Environment,OrbitControls,Text} from "@react-three/drei";
import {Suspense,useMemo,createElement} from "react";
import * as THREE from "three";
type Props={base:number;animal:number;animalOn?:boolean;finish:number;final:boolean;tilt:number;turn:number;roll:number;paw:boolean;pawOn?:boolean;pawType?:number;engraveOn?:boolean;name:string;dates:string};
const TOP=[.38,.78,.72,.68,.66,.82,.82,.92,.48,.8,.68,.78,.55,.72,.72,.7,.82,.55,.7,.62];
function rounded(pos:any,size:any,_radius:number=.08,material:any={color:"#d5d1c9",metalness:0,roughness:.82}){return createElement("mesh",{position:pos},createElement("boxGeometry",{args:size}),createElement("meshStandardMaterial",material));}
function topFor(i:number){return TOP[i]?? .72}
export default function UrnCanvas(p:Props){
 const top=topFor(p.base);
 return <Canvas camera={{position:[0,2.9,6.8],fov:35}} dpr={[1,1.6]}><color attach="background" args={["#e8e5df"]}/><ambientLight intensity={p.final? .45:.95}/><directionalLight position={[4,7,5]} intensity={p.final?2.5:1.35}/><directionalLight position={[-4,3,-3]} intensity={.75}/>
 <Suspense fallback={null}><Environment preset="studio"/><group rotation={[THREE.MathUtils.degToRad(p.tilt),p.turn,THREE.MathUtils.degToRad(p.roll)]}>
 <Urn base={p.base} finish={p.finish} final={p.final}/>
 {(p.animalOn??false)&&<Animal type={p.animal} final={p.final} base={p.base} top={top}/>}
 {(p.pawOn??p.paw)&&<PawMark type={p.pawType??p.animal} top={top} base={p.base}/>}
 {(p.engraveOn??false)&&<group><Text position={[0,Math.max(.18,top*.66),.54]} fontSize={.13} color={p.final?"#242321":"#6d6a64"} anchorX="center" anchorY="middle" maxWidth={1.45}>{p.name||"Nombre"}</Text><Text position={[0,Math.max(.12,top*.49),.55]} fontSize={.075} color={p.final?"#292724":"#77736c"} anchorX="center" anchorY="middle" maxWidth={1.3}>{p.dates}</Text></group>}
 </group><ContactShadows position={[0,-.04,0]} opacity={.3} scale={8} blur={2.8}/></Suspense>
 <OrbitControls enablePan={false} minDistance={3.8} maxDistance={11} maxPolarAngle={Math.PI/2.02} target={[0,.68,0]}/></Canvas>
}
function MoonGeometry(){return useMemo(()=>{const s=new THREE.Shape();s.moveTo(-1.28,-.02);s.bezierCurveTo(-1.08,-.48,-.58,-.67,-.08,-.62);s.bezierCurveTo(.48,-.58,1.03,-.26,1.16,.12);s.bezierCurveTo(.83,-.02,.49,.08,.16,.36);s.bezierCurveTo(-.22,.68,-.72,.58,-1.04,.31);s.bezierCurveTo(-1.18,.2,-1.25,.08,-1.28,-.02);return new THREE.ExtrudeGeometry(s,{depth:.44,bevelEnabled:true,bevelSegments:5,steps:1,bevelSize:.075,bevelThickness:.06,curveSegments:32})},[])}
function Urn({base,finish,final}:{base:number;finish:number;final:boolean}){
 const metal=final?{color:finish===2?"#8d8272":"#c5c4c1",metalness:finish===0?.92:.72,roughness:[.12,.28,.42][finish]??.3}:{color:"#d5d1c9",metalness:0,roughness:.72};
 const ceramic=final?{color:"#eee9df",metalness:.08,roughness:.26}:{color:"#d8d4cc",metalness:0,roughness:.78};
 const blue=final?"#315f78":"#aebec5";
 const mesh=(geometry:any,position:any,scale:any,material:any=metal,rotation:any=[0,0,0])=>createElement("mesh",{position,scale,rotation},geometry,createElement("meshStandardMaterial",material));
 const cylinder=(rTop:number,rBottom:number,h:number,position:any,material:any=metal,segments=64)=>mesh(createElement("cylinderGeometry",{args:[rTop,rBottom,h,segments]}),position,[1,1,1],material);
 const box=(position:any,size:any,material:any=metal)=>rounded(position,size,.06,material);
 const parts:any[]=[];
 if(base===0){
  const s=new THREE.Shape();s.moveTo(-1.28,-.02);s.bezierCurveTo(-1.08,-.48,-.58,-.67,-.08,-.62);s.bezierCurveTo(.48,-.58,1.03,-.26,1.16,.12);s.bezierCurveTo(.83,-.02,.49,.08,.16,.36);s.bezierCurveTo(-.22,.68,-.72,.58,-1.04,.31);s.bezierCurveTo(-1.18,.2,-1.25,.08,-1.28,-.02);
  const g=new THREE.ExtrudeGeometry(s,{depth:.42,bevelEnabled:true,bevelSegments:5,steps:1,bevelSize:.07,bevelThickness:.05,curveSegments:36});
  parts.push(mesh(g,[0,.24,-.2],[1,1,1],metal,[Math.PI/2,0,0]));
  parts.push(box([0,.32,.05],[1.45,.045,.06],{color:final?"#8f7b58":"#aaa49a",metalness:final?.7:0,roughness:.35}));
 } else if(base===1){
  parts.push(box([0,.37,0],[1.28,.66,.84],ceramic));
  parts.push(box([0,.73,0],[1.36,.12,.9],metal));
  parts.push(box([0,.81,0],[1.18,.035,.74],{color:final?"#8b806e":"#aaa49b",metalness:final?.7:0,roughness:.35}));
 } else if(base===2){
  parts.push(mesh(createElement("sphereGeometry",{args:[1,64,48]}),[0,.36,0],[.78,.72,.52],metal));
  parts.push(mesh(createElement("sphereGeometry",{args:[1,64,40]}),[0,.66,0],[.68,.27,.47],metal));
  parts.push(cylinder(.52,.56,.1,[0,.12,0]));
 } else if(base===3){
  parts.push(mesh(createElement("dodecahedronGeometry",{args:[.68,1]}),[0,.37,0],[1,1,1],metal,[0,0,Math.PI/10]));
 } else if(base===4){
  for(let i=0;i<7;i++){const a=i*Math.PI*2/7;parts.push(mesh(createElement("sphereGeometry",{args:[.55,40,32]}),[Math.cos(a)*.27,.36,Math.sin(a)*.27],[.43,.34,.38],metal));}
  parts.push(cylinder(.46,.5,.16,[0,.17,0]));
 } else if(base===5||base===16){
  const profile=Array.from({length:24},(_,i)=>{const t=i/23;return new THREE.Vector2(.12+.5*Math.sin(t*Math.PI*.78),t*.94)});
  parts.push(mesh(createElement("latheGeometry",{args:[profile,64]}),[0,.08,0],[1,1,1],metal));
  parts.push(cylinder(.58,.58,.08,[0,.99,0]));
 } else if(base===6||base===7){
  parts.push(box([0,.32,0],[1.02,.58,.78],base===7?ceramic:metal));
  parts.push(mesh(createElement("coneGeometry",{args:[.68,.52,4,1]}),[0,.77,0],[1,1,1],base===7?ceramic:metal,[0,Math.PI/4,0]));
  parts.push(cylinder(.55,.55,.07,[0,.61,0],metal));
  if(base===7)parts.push(box([0,.42,.405],[.42,.28,.035],{color:blue,metalness:final?.25:0,roughness:.5}));
 } else if(base===8){
  parts.push(box([0,.27,0],[.62,.25,.28],ceramic));
  for(const x of [-.43,.43])parts.push(mesh(createElement("sphereGeometry",{args:[1,40,32]}),[x,.3,0],[.32,.24,.26],metal));
 } else if(base===9){
  parts.push(mesh(createElement("sphereGeometry",{args:[1,64,48]}),[0,.4,0],[.65,.65,.65],metal));
  parts.push(cylinder(.56,.61,.14,[0,.1,0]));
 } else if(base===10){
  parts.push(cylinder(.48,.58,.76,[0,.4,0]));
  parts.push(cylinder(.55,.53,.12,[0,.81,0]));
  for(const x of [-.38,-.19,0,.19,.38])parts.push(box([x,.4,.46],[.025,.55,.025],{color:final?"#736a5c":"#b0aaa0",metalness:final?.55:0,roughness:.4}));
 } else if(base===11){
  parts.push(box([0,.15,0],[1.18,.18,1.18],ceramic));
  parts.push(mesh(createElement("sphereGeometry",{args:[1,64,48,0,Math.PI*2,0,Math.PI/2]}),[0,.46,0],[.55,.58,.55],metal));
  parts.push(cylinder(.57,.62,.1,[0,.23,0]));
 } else if(base===12){
  parts.push(mesh(createElement("sphereGeometry",{args:[1,64,48]}),[0,.3,0],[.82,.34,.62],metal));
  for(const x of [-.4,-.2,0,.2,.4])parts.push(mesh(createElement("torusGeometry",{args:[.34,.022,10,48,Math.PI]}),[x,.48,.32],[1,1,1],metal,[0,0,x*.3]));
 } else if(base===13||base===14){
  parts.push(box([0,.34,0],[1.12,.56,.82],ceramic));
  parts.push(box([0,.66,0],[1.2,.13,.88],metal));
  for(const x of [-.36,0,.36])parts.push(mesh(createElement("torusGeometry",{args:[.12,.03,12,40]}),[x,.42,.418],[1,1,1],{color:blue,metalness:final?.2:0}));
  if(base===14)parts.push(mesh(createElement("sphereGeometry",{args:[1,40,32]}),[0,.78,0],[.5,.18,.38],metal));
 } else if(base===15){
  parts.push(cylinder(.58,.64,.64,[0,.38,0]));
  parts.push(cylinder(.65,.58,.12,[0,.74,0]));
  parts.push(cylinder(.14,.14,.08,[0,.84,0],{color:final?"#8b806e":"#aaa49a",metalness:final?.65:0,roughness:.35}));
 } else if(base===17){
  for(let i=0;i<6;i++){const a=i*Math.PI/3;parts.push(mesh(createElement("sphereGeometry",{args:[1,40,28]}),[Math.cos(a)*.32,.34,Math.sin(a)*.32],[.38,.15,.2],metal,[0,-a,-.22]));}
  parts.push(cylinder(.45,.52,.16,[0,.17,0]));
 } else if(base===18){
  parts.push(mesh(createElement("octahedronGeometry",{args:[.72,1]}),[0,.38,0],[1,1,1],metal,[0,Math.PI/4,0]));
 } else {
  parts.push(box([0,.29,0],[1.08,.48,.78],ceramic));
  parts.push(box([0,.55,0],[1.12,.08,.82],metal));
  parts.push(box([-.54,.36,0],[.05,.4,.82],{color:final?"#8e8067":"#b2aaa0",metalness:final?.65:0,roughness:.4}));
  parts.push(box([0,.6,.42],[.86,.025,.025],{color:final?"#8e8067":"#b2aaa0",metalness:final?.65:0,roughness:.4}));
 }
 // Only add a fitted lid to designs whose top is closed; never place a generic ring/knob on every urn.
 if(![0,2,3,4,5,6,7,8,9,10,11,12,13,14,16,17,18].includes(base)){
   parts.push(cylinder(.48,.52,.09,[0,.63,0]));
 }
 return createElement("group",null,...parts);
}
function Animal({type,final,base,top}:{type:number;final:boolean;base:number;top:number}){
 const m={color:final?"#b1afaa":"#d8d4cc",metalness:final? .85:0,roughness:final? .25:.9};
 const y=top+.13;
 const scale=base===0? .72:base===8? .58:base===11? .65:base===15? .75:1;
 const mesh=(pos:[number,number,number],size:[number,number,number],sphere=false)=>createElement("mesh",{position:pos,scale:size},createElement(sphere?"sphereGeometry":"capsuleGeometry",{args:sphere?[1,32,24]:[.16,.35,8,16]}),createElement("meshStandardMaterial",m));
 return <group position={[0,y,0]} scale={[scale,scale,scale]}>
 {type===0?<group>{mesh([0,.22,0],[.34,.55,.28])}{mesh([0,.68,.03],[.3,.3,.28],true)}{[-1,1].map(s=><group key={s}>{mesh([s*.19,.85,.02],[.11,.2,.1],true)}{mesh([s*.13,-.02,.12],[.09,.28,.1])}</group>)}<mesh position={[.32,.18,-.12]} rotation={[0,0,-.9]}><torusGeometry args={[.18,.065,12,24,Math.PI*1.4]}/><meshStandardMaterial {...m}/></mesh></group>
 :type===1?<group>{mesh([0,.2,0],[.3,.5,.26])}{mesh([0,.65,.04],[.28,.27,.25],true)}{[-1,1].map(s=><mesh key={s} position={[s*.16,.88,.04]} rotation={[0,0,s*-.25]}><coneGeometry args={[.09,.24,24]}/><meshStandardMaterial {...m}/></mesh>)}</group>
 :type===2?<group>{mesh([0,.18,0],[.32,.4,.26],true)}{mesh([0,.48,.03],[.25,.22,.22],true)}{[-1,1].map(s=><mesh key={s} position={[s*.12,.78,.02]}><capsuleGeometry args={[.045,.42,6,12]}/><meshStandardMaterial {...m}/></mesh>)}</group>
 :type===20?<mesh position={[0,.18,0]} rotation={[0,0,.1]}><torusGeometry args={[.24,.08,16,48,Math.PI*1.65]}/><meshStandardMaterial {...m}/></mesh>
 :type>=11&&type<=15?<group>{mesh([0,.28,0],[.42,.38,.28],true)}{[-1,1].map(s=><mesh key={s} position={[s*.23,.35,.02]} rotation={[0,0,s*.7]}><capsuleGeometry args={[.055,.3,6,10]}/><meshStandardMaterial {...m}/></mesh>)}{type===11&&mesh([0,.58,.02],[.2,.23,.2],true)}</group>
 :type===23?<group>{mesh([0,.3,0],[.42,.28,.25],true)}{[-1,1].map(s=><mesh key={s} position={[s*.23,.26,0]} rotation={[0,0,s*.25]}><coneGeometry args={[.1,.5,24]}/><meshStandardMaterial {...m}/></mesh>)}</group>
 :<group>{mesh([0,.22,0],[.3,.46,.25],true)}{mesh([0,.58,.02],[.23,.23,.22],true)}{[-1,1].map(s=><mesh key={s} position={[s*.18,.02,.08]}><capsuleGeometry args={[.045,.26,6,10]}/><meshStandardMaterial {...m}/></mesh>)}</group>}
 </group>
}
function PawMark({type,top,base}:{type:number;top:number;base:number}){
 const y=Math.max(.22,top*.64),z=base===0? .43:.48;
 return <group position={[0,y,z]} scale={base===0? .65:1}>
 <mesh position={[0,-.04,0]} scale={[.14,.11,.025]}><sphereGeometry args={[1,24,16]}/><meshBasicMaterial color="#111111"/></mesh>
 {[-1,1].map(s=><group key={s}><mesh position={[s*.13,.09,0]} scale={[.065,.07,.025]}><sphereGeometry args={[1,20,14]}/><meshBasicMaterial color="#111111"/></mesh><mesh position={[s*.23,.06,0]} scale={[.052,.058,.025]}><sphereGeometry args={[1,20,14]}/><meshBasicMaterial color="#111111"/></mesh></group>)}
 </group>
}
