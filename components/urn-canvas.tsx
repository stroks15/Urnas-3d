'use client';
import {Canvas} from "@react-three/fiber";
import {ContactShadows,Environment,OrbitControls,Text} from "@react-three/drei";
import {Suspense,useMemo,createElement} from "react";
import * as THREE from "three";
type Props={base:number;animal:number;animalOn?:boolean;finish:number;final:boolean;tilt:number;turn:number;roll:number;paw:boolean;pawOn?:boolean;pawType?:number;engraveOn?:boolean;name:string;dates:string};
const TOP=[.38,.78,.72,.68,.66,.82,.82,.92,.48,.8,.68,.78,.55,.72,.72,.7,.82,.55,.7,.62];
function topFor(i:number){return TOP[i]??.72}
export default function UrnCanvas(p:Props){
 const top=topFor(p.base);
 return <Canvas camera={{position:[0,2.9,6.8],fov:35}} dpr={[1,1.6]}><color attach="background" args={["#e8e5df"]}/><ambientLight intensity={p.final?.45:.95}/><directionalLight position={[4,7,5]} intensity={p.final?2.5:1.35}/><directionalLight position={[-4,3,-3]} intensity={.75}/>
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
 const moon=MoonGeometry();
 const metal=final?{color:finish===2?"#8d8272":"#c5c4c1",metalness:finish===0?1:.85,roughness:[.06,.3,.45][finish]}:{color:"#d5d1c9",metalness:0,roughness:.82};
 const ceramic=final?{color:"#f4f0e7",metalness:.12,roughness:.32}:{color:"#d8d4cc",metalness:0,roughness:.84};
 const blue=final?"#315f78":"#aebec5";
 const rounded=(pos:any,size:any,radius:number=.08,material:any=metal)=>createElement("mesh",{position:pos},createElement("boxGeometry",{args:size}),createElement("meshStandardMaterial",material));
 return <group>
 {base===0?<group>
 <mesh geometry={moon} position={[0,.19,-.22]} rotation={[Math.PI/2,0,0]}><meshStandardMaterial {...metal}/></mesh>
 <mesh geometry={moon} position={[0,.39,-.2]} rotation={[Math.PI/2,0,0]} scale={[.97,.94,.18]}><meshStandardMaterial {...metal}/></mesh>
 <mesh position={[0,.28,.18]} scale={[1.18,.035,.035]}><boxGeometry/><meshStandardMaterial color={final?"#8f7b58":"#aaa49a"} metalness={final?.65:0} roughness={.4}/></mesh>
 </group>
 :base===1?<group>{rounded([0,.38,0],[1.3,.65,.86],.12)}{rounded([0,.75,0],[1.38,.13,.94],.07)}{rounded([0,.83,0],[1.18,.035,.76],.02,{color:final?"#8b806e":"#aaa49b",metalness:final?.7:0,roughness:.35})}</group>
 :base===2?<group><mesh position={[0,.35,0]} scale={[.82,.8,.52]}><sphereGeometry args={[1,48,32]}/><meshStandardMaterial {...metal}/></mesh><mesh position={[0,.67,0]} scale={[.7,.32,.5]}><sphereGeometry args={[1,48,24]}/><meshStandardMaterial {...metal}/></mesh></group>
 :base===3?<mesh position={[0,.35,0]} rotation={[0,0,Math.PI/10]}><dodecahedronGeometry args={[.68,1]}/><meshStandardMaterial {...metal} flatShading={false}/></mesh>
 :base===4?<group>{[[0,.34,0],[.38,.38,0],[-.38,.38,0],[.18,.52,0],[-.18,.52,0],[.58,.28,0],[-.58,.28,0]].map((v,i)=><mesh key={i} position={v as [number,number,number]} scale={[.48,.34,.42]}><sphereGeometry args={[.55,32,24]}/><meshStandardMaterial {...metal}/></mesh>)}</group>
 :base===5?<mesh position={[0,.43,0]}><latheGeometry args={[Array.from({length:18},(_,i)=>{const t=i/17;return new THREE.Vector2(.08+.55*Math.sin(t*Math.PI*.78),t*.95)}),48]}/><meshStandardMaterial {...metal}/></mesh>
 :base===6||base===7?<group>{rounded([0,.31,0],[1.02,.58,.78],.06,base===7?ceramic:metal)}<mesh position={[0,.78,0]} rotation={[0,0,0]}><coneGeometry args={[.68,.55,4,1]} /><meshStandardMaterial {...(base===7?ceramic:metal)}/>{base===7&&rounded([0,.42,.405],[.42,.28,.04],.025,{color:blue,metalness:final?.25:0,roughness:.5})}</group>
 :base===8?<group>{rounded([0,.29,0],[.62,.28,.28],.1)}{[-.47,.47].map(x=><mesh key={x} position={[x,.3,0]} scale={[.34,.25,.28]}><sphereGeometry args={[1,32,24]}/><meshStandardMaterial {...metal}/></mesh>)}{[-.47,.47].map(x=><mesh key={x} position={[x,.3,.0]} scale={[.2,.2,.25]}><sphereGeometry args={[1,24,16]}/><meshStandardMaterial {...metal}/></mesh>)}</group>
 :base===9?<group><mesh position={[0,.4,0]} scale={[.68,.68,.68]}><sphereGeometry args={[1,48,32]}/><meshStandardMaterial {...metal}/></mesh><mesh position={[0,.08,0]} scale={[.7,.12,.7]}><cylinderGeometry args={[.55,.58,.18,48]}/><meshStandardMaterial {...metal}/></mesh></group>
 :base===10?<group><mesh position={[0,.35,0]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.48,.58,.86,48]}/><meshStandardMaterial {...metal}/></mesh><mesh position={[0,.78,0]}><cylinderGeometry args={[.53,.53,.12,48]}/><meshStandardMaterial {...metal}/></mesh>{[-.38,-.2,0,.2,.38].map(x=><mesh key={x} position={[x,.36,.46]} rotation={[0,0,x*.2]}><boxGeometry args={[.035,.55,.025]}/><meshStandardMaterial color={final?"#736a5c":"#b0aaa0"}/></mesh>)}</group>
 :base===11?<group>{rounded([0,.15,0],[1.22,.2,1.22],.08)}<mesh position={[0,.48,0]} scale={[.55,.62,.55]}><sphereGeometry args={[1,48,32,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial {...metal} transparent opacity={.88}/></mesh><mesh position={[0,.23,0]}><cylinderGeometry args={[.57,.62,.12,48]}/><meshStandardMaterial {...metal}/></mesh></group>
 :base===12?<group><mesh position={[0,.28,0]} scale={[.9,.36,.65]}><sphereGeometry args={[1,48,32]}/><meshStandardMaterial {...metal}/></mesh>{[-.4,-.2,0,.2,.4].map((x,i)=><mesh key={i} position={[x,.48,.32]} rotation={[0,0,x*.35]}><torusGeometry args={[.38,.025,8,32,Math.PI]}/><meshStandardMaterial {...metal}/></mesh>)}</group>
 :base===13||base===14?<group>{rounded([0,.34,0],[1.12,.56,.82],.08,ceramic)}{rounded([0,.66,0],[1.2,.14,.88],.06,metal)}{[-.36,0,.36].map(x=><mesh key={x} position={[x,.42,.418]}><torusGeometry args={[.12,.035,10,32]}/><meshStandardMaterial color={blue} metalness={final?.2:0}/></mesh>)}{base===14&&<mesh position={[0,.78,0]} scale={[.55,.2,.42]}><sphereGeometry args={[1,32,24]}/><meshStandardMaterial {...metal}/></mesh>}</group>
 :base===15?<group><mesh position={[0,.38,0]}><cylinderGeometry args={[.58,.64,.64,48]}/><meshStandardMaterial {...metal}/></mesh><mesh position={[0,.73,0]}><cylinderGeometry args={[.65,.58,.12,48]}/><meshStandardMaterial {...metal}/></mesh><mesh position={[0,.8,0]}><torusGeometry args={[.14,.045,12,32]}/><meshStandardMaterial {...metal}/></mesh></group>
 :base===16?<mesh position={[0,.42,0]}><latheGeometry args={[Array.from({length:20},(_,i)=>{const t=i/19;const r=.14+.45*Math.sin(t*Math.PI*.78);return new THREE.Vector2(r,t*.95)}),48]}/><meshStandardMaterial {...metal}/></mesh>
 :base===17?<group>{[0,1,2,3,4,5].map(i=><mesh key={i} position={[Math.cos(i*Math.PI/3)*.34,.34,Math.sin(i*Math.PI/3)*.34]} rotation={[0,-i*Math.PI/3,-.22]} scale={[.42,.16,.22]}><sphereGeometry args={[1,32,20]}/><meshStandardMaterial {...metal}/></mesh>)}<mesh position={[0,.18,0]}><cylinderGeometry args={[.45,.52,.18,48]}/><meshStandardMaterial {...metal}/></mesh></group>
 :base===18?<mesh position={[0,.38,0]} rotation={[0,Math.PI/4,0]}><octahedronGeometry args={[.72,1]}/><meshStandardMaterial {...metal} flatShading/></mesh>
 :<group>{rounded([0,.29,0],[1.08,.48,.78],.04)}{rounded([0,.55,0],[1.12,.08,.82],.03)}{rounded([-.54,.36,0],[.06,.4,.82],.025,{color:final?"#8e8067":"#b2aaa0",metalness:final?.65:0,roughness:.4})}{rounded([0,.6,.42],[.86,.025,.025],.01,{color:final?"#8e8067":"#b2aaa0",metalness:final?.65:0,roughness:.4})}</group>}
 </group>
}
function Animal({type,final,base,top}:{type:number;final:boolean;base:number;top:number}){
 const m={color:final?"#b1afaa":"#d8d4cc",metalness:final?.85:0,roughness:final?.25:.9};
 const y=top+.13;
 const scale=base===0?.72:base===8?.58:base===11?.65:base===15?.75:1;
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
 const y=Math.max(.22,top*.64),z=base===0?.43:.48;
 return <group position={[0,y,z]} scale={base===0?.65:1}>
 <mesh position={[0,-.04,0]} scale={[.14,.11,.025]}><sphereGeometry args={[1,24,16]}/><meshBasicMaterial color="#111111"/></mesh>
 {[-1,1].map(s=><group key={s}><mesh position={[s*.13,.09,0]} scale={[.065,.07,.025]}><sphereGeometry args={[1,20,14]}/><meshBasicMaterial color="#111111"/></mesh><mesh position={[s*.23,.06,0]} scale={[.052,.058,.025]}><sphereGeometry args={[1,20,14]}/><meshBasicMaterial color="#111111"/></mesh></group>)}
 </group>
}
