'use client';
import { useState } from 'react';

type Match = { id:number; date:string; year:string; city:string; venue:string; title:string; pianist:string; conductor:string; orchestra:string; work:string; opus:string; price:string; url:string; source:string; checked:string };
const matches: Match[] = [
  { id:1,date:'10月22日 · 周四 19:30',year:'2026',city:'上海',venue:'东方艺术中心 · 音乐厅',title:'帕沃·雅尔维、康托洛夫与爱沙尼亚节日管弦乐团',pianist:'亚历山大·康托洛夫',conductor:'帕沃·雅尔维',orchestra:'爱沙尼亚节日管弦乐团',work:'C小调第二钢琴协奏曲',opus:'Op. 18',price:'¥180–880',url:'https://shanghaiconcerts.com/concerts/jarvi-kantorow-estonian-festival-orchestra',source:'东方音乐厅演出资料',checked:'2026-08-28' },
  { id:2,date:'3月26日 · 周五 20:00',year:'2027',city:'深圳',venue:'深圳音乐厅 · 演奏大厅',title:'深圳交响乐团2026–2027乐季：三生万物',pianist:'沈璐',conductor:'张国勇',orchestra:'深圳交响乐团',work:'D小调第三钢琴协奏曲',opus:'Op. 30',price:'¥80–880',url:'https://szyyt.com/performance/show_100000991964858.html',source:'深圳音乐厅',checked:'2026-08-28' },
];
const watchlist = [
  {no:'01',name:'升F小调第一钢琴协奏曲',opus:'Op. 1',status:'等待中'},
  {no:'02',name:'C小调第二钢琴协奏曲',opus:'Op. 18',status:'已找到 1 场'},
  {no:'03',name:'D小调第三钢琴协奏曲',opus:'Op. 30',status:'已找到 1 场'},
  {no:'04',name:'G小调第四钢琴协奏曲',opus:'Op. 40',status:'等待中'},
  {no:'∞',name:'帕格尼尼主题狂想曲',opus:'Op. 43',status:'等待中'},
];

export default function Home(){
  const [region,setRegion]=useState('全部地区');
  const visible=region==='全部地区'?matches:matches.filter(item=>item.city===region);
  return <main>
    <header className="topbar"><a className="brand" href="#top"><span className="brand-dot"/>再等一次</a><nav><a href="#next">下一次</a><a href="#watch">守候曲目</a><a href="#memory">缘起</a></nav><span className="live-mark"><i/> 持续寻找中</span></header>
    <section className="hero" id="top"><div className="hero-copy"><p className="overline">FOR THE CONCERT WE MISSED</p><h1>有些现场错过了，<br/>就<span>再等一次。</span></h1><p className="intro">这里只寻找拉赫玛尼诺夫的四首钢琴协奏曲，和《帕格尼尼主题狂想曲》。不推荐相似作品，不用遗憾制造热闹，只等它们再次出现。</p><a className="primary-link" href="#next">看见下一次 <span>↓</span></a></div><div className="vinyl" aria-hidden="true"><div className="vinyl-ring"><span>R</span></div></div><div className="quote">“音乐足够漫长，<br/>可以替我们记住。”</div></section>
    <section className="memory-strip" id="memory"><div className="memory-year">2025</div><div className="memory-copy"><span>没有赶上的那一场</span><strong>张昊辰 × 香港管弦乐团 · 深圳</strong><p>第一钢琴协奏曲 · 帕格尼尼主题狂想曲 · 第二钢琴协奏曲<br/>第三钢琴协奏曲 · 第四钢琴协奏曲</p></div><div className="memory-note">错过不是句号<br/>它只是这次寻找的开始</div></section>
    <section className="next-section" id="next"><div className="section-head"><div><p className="overline">THE NEXT CHANCES</p><h2>已经等到的两次</h2></div><label>地区<select value={region} onChange={e=>setRegion(e.target.value)}><option>全部地区</option><option>上海</option><option>深圳</option></select></label></div><div className="match-list">
      {visible.map((match,index)=><article className="match-card" key={match.id}><div className="match-index">0{index+1}</div><div className="match-date"><strong>{match.year}</strong><span>{match.date}</span><small>{match.city}</small></div><div className="match-body"><div className="found-badge"><i/> 匹配曲目</div><h3>{match.work}</h3><div className="opus">{match.opus}</div><p className="event-title">{match.title}</p><div className="people"><span><small>钢琴</small>{match.pianist}</span><span><small>指挥</small>{match.conductor}</span><span><small>乐团</small>{match.orchestra}</span></div><p className="venue">⌖ {match.venue}</p></div><div className="match-action"><span>{match.price}</span><a href={match.url} target="_blank" rel="noreferrer">查看官方信息 ↗</a><small>{match.source}<br/>核实于 {match.checked}</small></div></article>)}
      {!visible.length&&<div className="empty-state">这个地区还没有等到。我们继续找。</div>}
    </div></section>
    <section className="watch-section" id="watch"><div className="watch-intro"><p className="overline">THE FIVE WE KEEP</p><h2>只守候这五部作品</h2><p>搜索范围以中国内地、香港和澳门为主。曲目写法、繁简体、英文名和作品编号都会归到同一个答案里。</p></div><div className="watch-list">{watchlist.map(item=><div className="watch-row" key={item.opus}><span className="watch-no">{item.no}</span><strong>{item.name}</strong><em>{item.opus}</em><small className={item.status.includes('已找到')?'found':''}>{item.status}</small></div>)}</div></section>
    <section className="promise"><p className="overline">A QUIET PROMISE</p><h2>下一次，不让工作替你做决定。</h2><p>页面只刊登能够核实日期、场馆和目标曲目的演出。阵容或节目变化时，以主办方最后公布为准。</p></section>
    <footer><a className="brand" href="#top"><span className="brand-dot"/>再等一次</a><p>For Rachmaninoff, and for the night that got away.</p><small>中国内地 · 香港 · 澳门</small></footer>
  </main>
}
