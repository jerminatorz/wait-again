'use client';

import { useMemo, useState } from 'react';

type Concert = {
  id: number; day: string; month: string; weekday: string; time: string; city: string;
  venue: string; title: string; artists: string; program: { composer: string; work: string }[];
  price: string; color: string; source: string; url: string; verifiedAt: string;
};

const concerts: Concert[] = [
  { id: 1, day: '05', month: '九月', weekday: '周六', time: '20:00', city: '澳门', venue: '澳门文化中心综合剧院', title: '澳门乐团乐季开幕：永恒贝多芬', artists: '廖国敏 指挥 · 陆逸轩 钢琴 · 澳门乐团', price: 'MOP 180 起', color: '#7b8370', source: '澳门文化中心', url: 'https://www.ccm.gov.mo/gb/othershow/75947', verifiedAt: '2026-08-27', program: [{ composer: '杜卡', work: '《仙女》号曲' }, { composer: '萧邦', work: 'E小调第一钢琴协奏曲，作品11' }, { composer: '贝多芬', work: 'A大调第七交响曲，作品92' }] },
  { id: 2, day: '09', month: '九月', weekday: '周三', time: '19:30', city: '香港', venue: '香港文化中心音乐厅', title: '成都巡演前音乐会：陆逸轩的萧邦', artists: '廖国敏 指挥 · 陆逸轩 钢琴 · 香港管弦乐团', price: 'HK$260 起', color: '#e7a868', source: '香港管弦乐团', url: 'https://www.hkphil.org/tc/concert/2026-27-season', verifiedAt: '2026-08-27', program: [{ composer: '姚晨', work: '《团团转》（世界首演）' }, { composer: '萧邦', work: 'E小调第一钢琴协奏曲，作品11' }, { composer: '斯特拉文斯基', work: '《火鸟》组曲（1919）' }] },
  { id: 3, day: '11', month: '九月', weekday: '周五', time: '20:00', city: '广州', venue: '星海音乐厅交响乐演奏大厅', title: '广州交响乐团2026/27乐季开幕音乐会', artists: '黄屹 指挥 · 王健 大提琴 · 广州交响乐团', price: '¥80 起', color: '#9a7893', source: '广州交响乐团', url: 'https://www.gso.org.cn/en/portfolio/concert-2026-09-11/index.html', verifiedAt: '2026-08-27', program: [{ composer: '柴可夫斯基', work: '《弗兰切斯卡·达·里米尼》，作品32' }, { composer: '柴可夫斯基', work: '洛可可主题变奏曲，作品33' }, { composer: '柴可夫斯基', work: 'E小调第五交响曲，作品64' }] },
  { id: 4, day: '16', month: '九月', weekday: '周三', time: '19:30', city: '香港', venue: '香港文化中心音乐厅', title: '乐季揭幕：汉力克的田园与深宫情仇', artists: '汉力克 指挥 · 香港管弦乐团', price: 'HK$340 起', color: '#718aa2', source: '香港管弦乐团', url: 'https://www.hkphil.org/tc/concert/2026-27-season', verifiedAt: '2026-08-27', program: [{ composer: '贝多芬', work: 'F大调第六交响曲「田园」，作品68' }, { composer: '理查·施特劳斯', work: '《深宫情仇》组曲' }] },
  { id: 5, day: '19', month: '九月', weekday: '周六', time: '19:30', city: '深圳', venue: '深圳音乐厅五楼小剧场', title: '在水一方——肖玛中外艺术歌曲音乐会', artists: '肖玛 高男高音 · 马可·贝雷依 钢琴', price: '¥80 起', color: '#b4775e', source: '深圳音乐厅', url: 'https://szyyt.com/performance/show_100000956977894.html', verifiedAt: '2026-08-27', program: [{ composer: '亨德尔', work: '《我的爱，你在哪里？》' }, { composer: '黄自', work: '《玫瑰三愿》' }, { composer: '赵季平', work: '《幽兰操》' }] },
  { id: 6, day: '24', month: '九月', weekday: '周四', time: '19:30', city: '香港', venue: '香港文化中心音乐厅', title: '国庆音乐会：王紫桐的普罗科菲耶夫', artists: '袁丁 指挥 · 王紫桐 钢琴 · 香港管弦乐团', price: 'HK$220 起', color: '#788b78', source: '香港管弦乐团', url: 'https://www.hkphil.org/tc/concert/national-day-concert-zitong-wang-plays-prokofiev', verifiedAt: '2026-08-27', program: [{ composer: '姚晨', work: '《造园》' }, { composer: '普罗科菲耶夫', work: 'C大调第三钢琴协奏曲，作品26' }, { composer: '拉赫玛尼诺夫', work: 'D小调第一交响曲，作品13' }] },
  { id: 7, day: '30', month: '九月', weekday: '周三', time: '20:00', city: '广州', venue: '星海音乐厅交响乐演奏大厅', title: '纪念莫扎特诞辰270周年音乐会', artists: '杨洋 指挥 · 广州交响乐团', price: '¥80 起', color: '#8f745d', source: '广州交响乐团', url: 'https://www.gso.org.cn/portfolio/concert-2026-09-30/index.html', verifiedAt: '2026-08-27', program: [{ composer: '莫扎特', work: '歌剧《女人心》序曲，K.588' }, { composer: '莫扎特', work: '降E大调交响协奏曲，K.297b' }, { composer: '莫扎特', work: 'C大调第四十一交响曲「朱庇特」，K.551' }] },
  { id: 8, day: '27', month: '十一月', weekday: '周五', time: '20:00', city: '深圳', venue: '深圳音乐厅演奏大厅', title: '深圳交响乐团：海之交响', artists: '张诚杰 指挥 · 深圳交响乐团', price: '¥80 起', color: '#668496', source: '深圳音乐厅', url: 'https://szyyt.com/performance/show_100000988433573.html', verifiedAt: '2026-08-27', program: [{ composer: '艾尔玛·兰普森', work: '《海之交响 I–III》' }, { composer: '德彪西', work: '《大海》' }] },
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
              <div className="card-action"><span>{concert.price}</span><a href={concert.url} target="_blank" rel="noreferrer">官方详情 <i>↗</i></a><button className="text-button" onClick={() => setActive(active === concert.id ? null : concert.id)}>{active === concert.id ? '收起说明' : '数据说明'}</button><small>来源：{concert.source}</small></div>
              {active === concert.id && <div className="detail-note"><strong>已核实</strong> {concert.verifiedAt} 查阅主办方页面。曲目、票价及阵容仍可能调整，请以官方页面为准。</div>}
            </article>
          ))}
          {results.length === 0 && <div className="empty"><strong>暂时没有匹配的音乐会</strong><p>换一个作曲家、作品名或城市试试。</p><button onClick={() => { setQuery(''); setCity('全部城市'); }}>清除筛选</button></div>}
        </div>
      </section>
      <section className="source-note" id="sources"><span>数据状态</span><div><h2>8 场节目已由官方来源核实</h2><p>香港管弦乐团、澳门文化中心、广州交响乐团和深圳音乐厅已收录。URBTIX 自动更新接入准备中；珠海华发中演大剧院与珠海大剧院已纳入监测，待官网提供可稳定核实的日期和曲目后上线。</p><div className="source-tags"><span>香港 · 已收录</span><span>澳门 · 已收录</span><span>广州 · 已收录</span><span>深圳 · 已收录</span><span className="watching">珠海 · 监测中</span></div></div></section>
      <footer><a className="brand" href="#top"><span className="brand-mark">乐</span><span>乐巡</span></a><p>在城市之间，遇见下一段音乐。</p><small>演出信息请以主办方最终公布为准</small></footer>
    </main>
  );
}
