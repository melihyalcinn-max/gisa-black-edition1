'use client';
import {useState} from 'react';
const map:any={'Temiz ve ferah':'White Tea, Clean Cotton, Soft Musk','Sıcak ve lüks':'Velvet Amber, Vanilla Cream, Tonka','Derin ve imza':'Oud Wood, Sandalwood Musk, Amber Noir','Enerjik':'Citrus Bloom, Bergamot, Ocean Air'};
export default function Page(){const[m,setM]=useState('Temiz ve ferah');const[s,setS]=useState('Otel');return <main style={page}><section style={wrap}><p style={{color:'#c8a96a',letterSpacing:'.22em',textTransform:'uppercase'}}>AI Scent Advisor</p><h1 style={h1}>Koku ailesini seç.</h1><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20}}><div style={card}><select style={input} value={s} onChange={e=>setS(e.target.value)}><option>Otel</option><option>Spa</option><option>Residence</option><option>Klinik</option></select><select style={input} value={m} onChange={e=>setM(e.target.value)}>{Object.keys(map).map(k=><option key={k}>{k}</option>)}</select></div><div style={card}><h2>{map[m]}</h2><p style={{color:'#b8afa3'}}>{s} için {m.toLowerCase()} hissi, premium ilk temas yaratır.</p></div></div></section></main>}

const page={minHeight:'100vh',background:'#070707',color:'#f7f2e8',padding:'56px 24px'};
const wrap={maxWidth:1080,margin:'0 auto'};
const h1={fontFamily:'Georgia,serif',fontSize:'clamp(42px,6.2vw,88px)',lineHeight:.92,fontWeight:400,margin:'12px 0 28px'};
const card={border:'1px solid rgba(200,169,106,.24)',borderRadius:24,background:'linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02))',padding:24};
const input={width:'100%',padding:'13px 14px',borderRadius:14,border:'1px solid rgba(200,169,106,.25)',background:'#0b0b0b',color:'#f7f2e8',margin:'8px 0 14px'};
const btn={border:0,borderRadius:999,padding:'13px 19px',background:'#c8a96a',color:'#090909',fontWeight:700,cursor:'pointer'};
