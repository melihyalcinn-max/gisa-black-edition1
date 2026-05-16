'use client';
import {useEffect,useRef} from 'react';
export default function Page(){const ref=useRef<HTMLCanvasElement>(null);useEffect(()=>{const c=ref.current;if(!c)return;const x=c.getContext('2d')!;x.fillStyle='#070707';x.fillRect(0,0,760,760);x.fillStyle='#151515';x.fillRect(260,150,240,470);x.fillStyle='#c8a96a';x.font='26px Georgia';x.textAlign='center';x.fillText('LOGO AREA',380,370);x.fillStyle='#f7f2e8';x.fillText('GISA BLACK EDITION',380,690);},[]);return <main style={page}><section style={wrap}><p style={{color:'#c8a96a',letterSpacing:'.22em',textTransform:'uppercase'}}>AI Logo Mockup</p><h1 style={h1}>Logo önizleme.</h1><div style={card}><p style={{color:'#b8afa3'}}>İlk sürümde canlı ürün önizleme alanı. Görsel motoru olmadan ücretsiz çalışır.</p><canvas ref={ref} width={760} height={760} style={{width:'100%',maxWidth:620,borderRadius:24,border:'1px solid rgba(200,169,106,.25)'}}/></div></section></main>}

const page={minHeight:'100vh',background:'#070707',color:'#f7f2e8',padding:'56px 24px'};
const wrap={maxWidth:1080,margin:'0 auto'};
const h1={fontFamily:'Georgia,serif',fontSize:'clamp(42px,6.2vw,88px)',lineHeight:.92,fontWeight:400,margin:'12px 0 28px'};
const card={border:'1px solid rgba(200,169,106,.24)',borderRadius:24,background:'linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02))',padding:24};
const input={width:'100%',padding:'13px 14px',borderRadius:14,border:'1px solid rgba(200,169,106,.25)',background:'#0b0b0b',color:'#f7f2e8',margin:'8px 0 14px'};
const btn={border:0,borderRadius:999,padding:'13px 19px',background:'#c8a96a',color:'#090909',fontWeight:700,cursor:'pointer'};
