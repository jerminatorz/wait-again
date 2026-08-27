import { mkdir, readFile, writeFile } from 'node:fs/promises';

const outputUrl = new URL('../data/zhuhai-discovery.json', import.meta.url);
const grandTheatreUrl = 'https://www.sina.cn/media/6058126059';
const huafaUrl = 'https://www.hfzytheatre.com/ticket/list.html';

const clean = (value = '') => value
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;|&#160;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ')
  .trim();

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'LexunConcertGuide/0.1 (+private research prototype)' },
  });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
}

async function previousData() {
  try { return JSON.parse(await readFile(outputUrl, 'utf8')); }
  catch { return { publicEvents: [], reviewQueue: [] }; }
}

const colors = ['#6c8292', '#9a735c', '#70806d', '#9a7893'];

function parseGrandTheatre(html) {
  const posts = [...html.matchAll(/<div class="time">([^<]+)[\s\S]*?<div class="post-text">([\s\S]*?)<\/div>/g)]
    .map((match) => ({ publishedAt: clean(match[1]), text: clean(match[2]) }));
  const events = [];
  for (const post of posts) {
    const fullDate = [...post.text.matchAll(/(?:⭐|\s)([^⭐]{2,60}?音乐会)\s+(2026)\.(\d{1,2})\.(\d{1,2})\s+星期([一二三四五六日])\s+(\d{1,2}:\d{2})/g)];
    const shortDate = [...post.text.matchAll(/\[点赞\]\s*([^\[]*?音乐会》?)\s*(\d{1,2})月(\d{1,2})日（[^）]+）(\d{1,2}:\d{2})/g)];
    for (const match of fullDate) events.push({ title: clean(match[1]), year: match[2], month: match[3], day: match[4], time: match[6], evidence: post.text });
    for (const match of shortDate) events.push({ title: clean(match[1]), year: post.publishedAt.slice(0, 4), month: match[2], day: match[3], time: match[4], evidence: post.text });
  }
  return events;
}

function parseHuafa(html) {
  return [...html.matchAll(/<div class="title">([\s\S]*?)<\/div>/g)]
    .map((match) => clean(match[1]))
    .filter((title) => title.includes('音乐会'))
    .map((title) => ({ title, venue: '珠海华发中演大剧院', status: 'needs_date_and_program' }));
}

const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

try {
  const [grandHtml, huafaHtml] = await Promise.all([fetchText(grandTheatreUrl), fetchText(huafaUrl)]);
  const publicEvents = parseGrandTheatre(grandHtml).map((event, index) => {
    const date = new Date(`${event.year}-${String(event.month).padStart(2, '0')}-${String(event.day).padStart(2, '0')}T${event.time}:00+08:00`);
    return {
      id: 100 + index,
      day: String(event.day).padStart(2, '0'), month: monthNames[Number(event.month) - 1], weekday: weekdays[date.getDay()], time: event.time,
      city: '珠海', venue: '珠海大剧院', title: event.title, artists: '节目阵容待官方补充', program: [],
      price: '票价见官方', color: colors[index % colors.length], source: '珠海大剧院官微', url: grandTheatreUrl,
      verifiedAt: new Date().toISOString().slice(0, 10), status: 'program_pending', evidence: event.evidence,
    };
  });
  const deduped = [...new Map(publicEvents.map((event) => [`${event.day}-${event.month}-${event.title}`, event])).values()];
  const payload = {
    collectedAt: new Date().toISOString(),
    sources: [grandTheatreUrl, huafaUrl],
    publicEvents: deduped,
    reviewQueue: parseHuafa(huafaHtml),
  };
  await mkdir(new URL('../data/', import.meta.url), { recursive: true });
  await writeFile(outputUrl, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`Zhuhai: ${deduped.length} dated events, ${payload.reviewQueue.length} awaiting details.`);
} catch (error) {
  const previous = await previousData();
  if (!previous.publicEvents?.length && !previous.reviewQueue?.length) throw error;
  console.warn(`Zhuhai refresh failed; keeping the last successful snapshot. ${error.message}`);
}
