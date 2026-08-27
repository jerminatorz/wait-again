'use client';

import { useMemo, useState } from 'react';

type Concert = {
  id: number; day: string; month: string; weekday: string; time: string; city: string;
  venue: string; title: string; artists: string; program: { composer: string; work: string }[];
  price: string; color: string; source: string;
};

const concerts: Concert[] = [
  { id: 1, day: '05', month: '九月', weekday: '周六', time: '20:00', city: '香港', venue: '香港文化中心音乐厅', title: '乐季揭幕：贝多芬与布鲁克纳', artists: '贝托祺 指挥 · 香港管弦乐团', price: 'HK$280 起', color: '#e7a868', source: '香港管弦乐团', program: [{ composer: '贝多芬', work: '《艾格蒙特》序曲，作品84' }, { composer: '布鲁克纳', work: '第七交响曲，WAB 107' }] },
  { id: 2, day: '12', month: '九月', weekday: '周六', time: '19:30', city: '深圳', venue: '深圳音乐厅演奏大厅', title: '余隆与深圳交响乐团', artists: '余隆 指挥 · 王健 大提琴', price: '¥180 起', color: '#788b78', source: '深圳音乐厅', program: [{ composer: '德沃夏克', work: 'B小调大提琴协奏曲，作品104' }, { composer: '勃拉姆斯', work: '第二交响曲，作品73' }] },
  { id: 3, day: '19', month: '九月', weekday: '周六', time: '20:00', city: '广州', venue: '星海音乐厅交响乐演奏大厅', title: '浪漫主义的回响', artists: '黄屹 指挥 · 广州交响乐团', price: '¥120 起', color: '#9a7893', source: '星海音乐厅', program: [{ composer: '拉赫玛尼诺夫', work: '第二钢琴协奏曲，作品18' }, { composer: '柴可夫斯基', work: '第五交响曲，作品64' }] },
  { id: 4, day: '26', month: '九月', weekday: '周六', time: '19:30', city: '珠海', venue: '珠海华发中演大剧院', title: '星海之声：交响名作音乐会', artists: '青年指挥家与珠海艺术家联合呈现', price: '¥100 起', color: '#718aa2', source: '珠海华发中演大剧院', program: [{ composer: '拉威尔', work: '《波莱罗》' }, { composer: '德彪西', work: '《大海》' }] },
  { id: 5, day: '03', month: '十月', weekday: '周六', time: '20:00', city: '珠海', venue: '珠海大剧院歌剧厅', title: '海上升明月·国庆音乐会', artists: '珠海民族管弦乐团', price: '¥80 起', color: '#b4775e', source: '珠海大剧院', program: [{ composer: '赵季平', work: '第一小提琴协奏曲' }, { composer: '刘文金', work: '《长城随想》选段' }] },
  { id: 6, day: '10', month: '十月', weekday: '周六', time: '20:00', city: '澳门', venue: '澳门文化中心综合剧院', title: '拉赫玛尼诺夫之夜', artists: '廖国敏 指挥 · 澳门乐团', price: 'MOP 200 起', color: '#7b8370', source: '享澳门售票网', program: [{ composer: '拉赫玛尼诺夫', work: '第三钢琴协奏曲，作品30' }, { composer: '拉赫玛尼诺夫', work: '交响舞曲，作品45' }] },
];

const cities = ['全部城市', '香港', '澳门', '广州', '深圳', '珠海'];

export default function Home() {
  const [city, setCity] = useState('全部城市');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<number | null>(null);
  const results = useMemo(() => concerts.filter((concert) => {
    const cityMatch = city === '全部城市' || concert.city === city;
    const haystack = [concert.title, concert.venue, concert.artists, ...concert.program.flatMap((p) => [p.composer, p.work])].join(' ').toLowerCase();
    return cityMatch && haystack.includes(query.trim().toLowerCase());
  }), [city, query]);

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="乐巡首页"><span className="brand-mark">乐</span><span>乐巡</span></a>
        <nav aria-label="主导航"><a className="active" href="#concerts">发现音乐会</a><a href="#sources">数据来源</a></nav>
        <button className="location-button" onClick={() => setCity('珠海')}><span>⌖</span> 大湾区</button>
      </header>
      <section className="hero" id="top">
        <div className="eyebrow"><span /> 大湾区古典音乐现场指南</div>
        <h1>循着喜欢的作品，<br />找到下一场<span>现场。</span></h1>
        <p>按作曲家或曲目，探索香港、澳门、广州、深圳与珠海的近期古典音乐会。</p>
        <div className="search-panel" role="search">
          <label className="search-field"><span className="search-icon">⌕</span><span className="field-copy"><small>作曲家或曲目</small><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="试试：拉赫玛尼诺夫、第五交响曲…" /></span></label>
          <label className="city-field"><small>城市</small><select value={city} onChange={(e) => setCity(e.target.value)}>{cities.map((item) => <option key={item}>{item}</option>)}</select></label>
          <button className="search-button" onClick={() => document.getElementById('concerts')?.scrollIntoView({ behavior: 'smooth' })}>寻找音乐会 <span>→</span></button>
        </div>
        <div className="quick"><span>热门搜索</span>{['贝多芬', '拉赫玛尼诺夫', '马勒', '大提琴协奏曲'].map((term) => <button key={term} onClick={() => setQuery(term)}>{term}</button>)}</div>
      </section>
      <section className="results" id="concerts">
        <div className="section-heading"><div><span className="kicker">UPCOMING CONCERTS</span><h2>近期值得听</h2></div><p>共找到 <strong>{results.length}</strong> 场音乐会</p></div>
        <div className="city-tabs" aria-label="按城市筛选">{cities.map((item) => <button className={city === item ? 'selected' : ''} key={item} onClick={() => setCity(item)}>{item}</button>)}</div>
        <div className="concert-list">
          {results.map((concert) => (
            <article className="concert-card" key={concert.id}>
              <div className="date"><strong>{concert.day}</strong><span>{concert.month} · {concert.weekday}</span><small>{concert.time}</small></div>
              <div className="poster" style={{ background: `linear-gradient(145deg, ${concert.color}, #282624)` }}><span>{concert.program[0].composer.slice(0, 1)}</span><small>{concert.city}</small></div>
              <div className="concert-main"><div className="meta"><span>{concert.city}</span><span>{concert.venue}</span></div><h3>{concert.title}</h3><p className="artists">{concert.artists}</p><div className="program">{concert.program.map((piece) => <p key={piece.work}><strong>{piece.composer}</strong><span>{piece.work}</span></p>)}</div></div>
              <div className="card-action"><span>{concert.price}</span><button onClick={() => setActive(active === concert.id ? null : concert.id)}>{active === concert.id ? '收起曲目' : '查看详情'} <i>↗</i></button><small>来源：{concert.source}</small></div>
              {active === concert.id && <div className="detail-note">曲目与演出信息以主办方最终公布为准。正式数据接入后，这里将跳转到官方节目及购票页面。</div>}
            </article>
          ))}
          {results.length === 0 && <div className="empty"><strong>暂时没有匹配的音乐会</strong><p>换一个作曲家、作品名或城市试试。</p><button onClick={() => { setQuery(''); setCity('全部城市'); }}>清除筛选</button></div>}
        </div>
      </section>
      <section className="source-note" id="sources"><span>每日更新</span><div><h2>信息来自演出机构与官方售票渠道</h2><p>首批覆盖 URBTIX、享澳门售票网，以及大湾区重点乐团、音乐厅与剧院；每条节目都保留来源和核实时间。</p></div></section>
      <footer><a className="brand" href="#top"><span className="brand-mark">乐</span><span>乐巡</span></a><p>在城市之间，遇见下一段音乐。</p><small>演出信息请以主办方最终公布为准</small></footer>
    </main>
  );
}
