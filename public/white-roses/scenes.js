export const artSources = {
  cover: './assets/art/cover.png',
  'chapter-01': './assets/art/chapter-01.png',
  'chapter-02': './assets/art/chapter-02.png',
  'chapter-03': './assets/art/chapter-03.png',
  'chapter-04': './assets/art/chapter-04.png',
  'chapter-05': './assets/art/chapter-05.png',
  'chapter-06': './assets/art/chapter-06.png'
};
export const sceneNames = ['对门的灯与书箱','列车上的行李与便笺','裁缝店的一天','孩子的纸船与练习簿','蓝花瓶旁的清晨','深夜的最后一封信'];
export function sceneArt(chapter=0, cover=false) {
  const id=cover?'cover':`chapter-${String(chapter+1).padStart(2,'0')}`;
  return `<img class="scene-art" src="${artSources[id]}" alt="${cover?'蓝夜中手持信件的女主与白玫瑰':sceneNames[chapter]}" decoding="sync" fetchpriority="high" draggable="false">`;
}
export const hotspotPositions = [
  [[34,60],[63,37],[20,32]],
  [[67,65],[30,62],[84,72]],
  [[36,70],[66,71],[74,20]],
  [[24,61],[51,67],[87,47]],
  [[36,49],[83,22],[62,40]],
  [[24,42],[69,50],[49,70]]
];
