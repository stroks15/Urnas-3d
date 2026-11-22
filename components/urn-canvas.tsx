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
 const mat={color:final?(finish===2?"#8d8272":"#c5c4c1"):"#d5d1c9",metalness:final?(finish===0?1:.85):0,roughness:final?[.06,.3,.45][finish]:.82};
 const body=createElement("mesh",{position:[0,.38,0],scale:base===0?[1.15,.18,.68]:base===2?[.8,.8,.55]:[.72,.62,.68]},
   createElement(base===0?"extrudeGeometry":base===2?"sphereGeometry":base===3?"dodecahedronGeometry":base===5||base===16?"latheGeometry":"cylinderGeometry",
   base===0?{args:[new THREE.Shape(),{depth:.4,bevelEnabled:true,bevelSize:.05,bevelThickness:.05,bevelSegments:3}]}:base===2?{args:[1,40,28]}:base===3?{args:[.68,1]}:base===5||base===16?{args:[[],32]}:{args:[.55,.62,.75,40]}),
   createElement("meshStandardMaterial",mat));
 const lid=createElement("mesh",{position:[0,.76,0]},createElement("cylinderGeometry",{args:[.62,.58,.12,40]}),createElement("meshStandardMaterial",mat));
 const accent=createElement("mesh",{position:[0,.82,0]},createElement("torusGeometry",{args:[.13,.035,10,32]}),createElement("meshStandardMaterial",{color:final?"#8b806e":"#aaa49a",metalness:final?.65:0,roughness:.4}));
 return createElement("group",null,body,lid,accent);
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
