/* =========================================================
   띠별 컬러 데이터
   12지지(地支) × 오행(五行) × 컬러 심리학
   ※ 업로드된 PPT의 띠별 배정을 그대로 따릅니다.
      쥐·돼지=수(水), 소·양=토(土), 호랑이·토끼=목(木),
      뱀·닭=화(火), 원숭이·개=금(金), 용=토(土), 말=화(火)
   ========================================================= */

/* 오행 정의: 상생(相生) 사이클 = 木 → 火 → 土 → 金 → 水 → 木 */
const ELEMENTS = {
  wood: {
    key: 'wood',
    name: '목(木)',
    alias: '나무',
    color: '#3E9E68',
    soft: '#E4F3EA',
    text: '#1E5C3B',
    trait: '성장 · 추진력 · 유연함',
    season: '봄',
    keyword: '뻗어 나가는 힘',
    desc: '새로 시작하는 힘과 아이디어, 성장의 기운입니다. 유연하게 뻗어 나가되 방향을 잃지 않는 에너지로 초록 계열이 대표 색입니다.',
    generates: 'fire',
    controls: 'earth',
    generatedBy: 'water',
    controlledBy: 'metal',
    taste: '신맛(酸)',
    goodFoods: ['레몬·라임', '식초·발사믹', '매실·오미자차', '키위·산딸기', '토마토·청포도', '시금치·브로콜리', '부추·봄나물', '콩나물·녹두'],
    cautionFoods: ['마늘·겨자 (금·金)', '무·양배추 절임 (금·金)', '매운 양념 위주 식사 (금·金)', '흰쌀밥·흰빵 위주 (금·金)'],
    foodNote: '신맛(酸)은 간과 목 기운을 깨워 줍니다. 매운맛·흰색 정제 음식이 지나치면 목 기운이 눌려요.',
    balanceColors: ['#111318', '#2B6CB0', '#0E4C82'],
    balanceWhy: '수(水) 기운이 목(木)을 생(生)해 부족한 기운을 채워줍니다. 네이비·딥블루 계열로 생기를 보완해 보세요.'
  },
  fire: {
    key: 'fire',
    name: '화(火)',
    alias: '불',
    color: '#E2452F',
    soft: '#FCE6E1',
    text: '#8E2418',
    trait: '열정 · 표현력 · 존재감',
    season: '여름',
    keyword: '타오르는 열정',
    desc: '열정과 표현력, 사람을 끌어들이는 존재감의 기운입니다. 빨강·주황·노랑이 대표 색이며 과해지면 급해지기 쉬운 기운입니다.',
    generates: 'earth',
    controls: 'metal',
    generatedBy: 'wood',
    controlledBy: 'water',
    taste: '쓴맛(苦)',
    goodFoods: ['커피·다크초콜릿', '쑥·여주·도라지', '고추·고춧가루', '붉은 채소 (토마토·비트)', '대추·계피차', '버섯·상추·케일'],
    cautionFoods: ['짠 해조류 (미역·다시마)', '젓갈·장아찌 (수·水)', '조개·굴 (수·水)', '차가운 얼음 음료 과다'],
    foodNote: '쓴맛(苦)은 심장과 화 기운을 북돋아 줍니다. 짠맛(水) 음식을 과하게 먹으면 화 기운이 꺼질 수 있어요.',
    balanceColors: ['#C63A22', '#F0742C', '#EBBB2B'],
    balanceWhy: '목(木) 기운이 화(火)를 생(生)해 부족한 기운을 채워줍니다. 레드·오렌지 계열로 열기를 보완해 보세요.'
  },
  earth: {
    key: 'earth',
    name: '토(土)',
    alias: '흙',
    color: '#C79A4B',
    soft: '#F7EFDD',
    text: '#7A5A1C',
    trait: '안정 · 신뢰 · 포용력',
    season: '환절기',
    keyword: '품어주는 안정',
    desc: '안정과 신뢰, 품어주는 포용력의 기운입니다. 베이지·노랑·브라운 계열이 대표 색으로 균형을 만들어 주는 중심 에너지입니다.',
    generates: 'metal',
    controls: 'water',
    generatedBy: 'fire',
    controlledBy: 'wood',
    taste: '단맛(甘)',
    goodFoods: ['단호박·고구마', '찹살·기장·율무', '밤·대추', '당근·옥수수', '꿀·인삼차', '마·감자'],
    cautionFoods: ['레몬·식초 등 신맛 과다 (목·木)', '매실·오미자차 과다 (목·木)', '부추·봄나물 과다 (목·木)'],
    foodNote: '단맛(甘)은 비위와 토 기운을 다독여 줍니다. 신맛(木)을 과하게 먹으면 토 기운이 흔들려요.',
    balanceColors: ['#B99B6B', '#E4D6BC', '#8A8B5C'],
    balanceWhy: '화(火) 기운이 토(土)를 생(生)해 부족한 기운을 채워줍니다. 브라운·베이지 계열로 안정을 보완해 보세요.'
  },
  metal: {
    key: 'metal',
    name: '금(金)',
    alias: '쇠',
    color: '#98A2B3',
    soft: '#EFF2F6',
    text: '#4B5563',
    trait: '결단 · 완성도 · 정리',
    season: '가을',
    keyword: '정돈하는 결단',
    desc: '결단력과 정리, 완성도의 기운입니다. 흰색·은색·금색이 대표 색이며 군더더기를 쳐내고 중심을 세우는 에너지입니다.',
    generates: 'water',
    controls: 'wood',
    generatedBy: 'earth',
    controlledBy: 'fire',
    taste: '매운맛(辛)',
    goodFoods: ['마늘·생강·파', '무·양파·배', '겨자·후추', '두부·콩', '은행·도라지', '흰색 채소 (양배추·연근)'],
    cautionFoods: ['커피·다크초콜릿 과다 (화·火)', '고추·고춧가루 과다 (화·火)', '쑥·여주 등 쓴맛 과다 (화·火)'],
    foodNote: '매운맛(辛)은 폐와 금 기운을 열어 줍니다. 쓴맛(火)이 지나치면 금 기운이 녹아내려요.',
    balanceColors: ['#B79A6A', '#E4D6BC', '#C8B48A'],
    balanceWhy: '토(土) 기운이 금(金)을 생(生)해 부족한 기운을 채워줍니다. 샌드·카키 계열로 중심을 보완해 보세요.'
  },
  water: {
    key: 'water',
    name: '수(水)',
    alias: '물',
    color: '#2B6CB0',
    soft: '#E4EEF9',
    text: '#123C6B',
    trait: '지혜 · 융통성 · 흐름',
    season: '겨울',
    keyword: '흐르는 지혜',
    desc: '지혜와 융통성, 상황을 읽는 흐름의 기운입니다. 검정·파랑·네이비가 대표 색이며 낮은 곳으로 흘러 모든 것을 아우릅니다.',
    generates: 'wood',
    controls: 'fire',
    generatedBy: 'metal',
    controlledBy: 'earth',
    taste: '짠맛(鹹)',
    goodFoods: ['미역·다시마·톳', '굴·조개·생선', '검은콩·흑미', '검은깨·들깨', '호두·밤', '장아찌·젓갈 (소량)'],
    cautionFoods: ['단호박·고구마 과다 (토·土)', '찹살·엿 등 단맛 과다 (토·土)', '꿀·당분 음료 과다 (토·土)'],
    foodNote: '짠맛(鹹)은 신장과 수 기운을 채워 줍니다. 단맛(土)이 과하면 수 기운이 막혀요.',
    balanceColors: ['#FFFFFF', '#EFF2F6', '#98A2B3'],
    balanceWhy: '금(金) 기운이 수(水)를 생(生)해 부족한 기운을 채워줍니다. 화이트·실버 계열로 맑은 흐름을 보완해 보세요.'
  }
};

/* 띠 데이터 (PPT 내용 기반) */
const ZODIAC = {
  rat: {
    key: 'rat',
    emoji: '🐭',
    name: '쥐띠',
    branch: '자(子)',
    element: 'water',
    pairTitle: '쥐띠 · 돼지띠',
    makeup: '수(水) 기운이 강한 띠',
    headline: '깊이와 지혜로 신뢰를 쌓는 컬러',
    summary: '쥐띠는 재치와 관찰력이 뛰어나고 머리 회전이 빠른 띠입니다. 차분한 수(水) 기운의 컬러가 장점을 살려주고, 강한 화(火) 기운의 색은 리듬을 흐트러뜨릴 수 있어요.',
    good: [
      { name: '검정', hex: '#111318', why: '깊이와 지혜를 상징' },
      { name: '파랑', hex: '#2B6CB0', why: '차분함과 신뢰감' },
      { name: '흰색', hex: '#F4F6FA', why: '청결하고 순수한 이미지' }
    ],
    bad: [
      { name: '빨강', hex: '#E2452F', why: '' },
      { name: '주황', hex: '#F0742C', why: '' }
    ],
    badReason: '강렬한 화(火) 기운이 수(水) 기운을 지닌 쥐띠와 충돌하여 불안정함과 긴장감을 유발할 수 있습니다.',
    tip: '중요한 발표나 면접 날에는 네이비, 차콜 계열을 선택해보세요.',
    palette: ['#111318', '#2B6CB0', '#F4F6FA', '#5A6B85', '#0E4C82', '#8FA6C2']
  },
  ox: {
    key: 'ox',
    emoji: '🐂',
    name: '소띠',
    branch: '축(丑)',
    element: 'earth',
    pairTitle: '소띠 · 양띠',
    makeup: '토(土) 기운이 강한 띠',
    headline: '온화함과 평화로움을 더하는 컬러',
    summary: '소띠는 우직하고 성실하며 묵묵히 결과를 쌓아가는 띠입니다. 따뜻한 흙의 기운을 닮은 자연 컬러가 안정감을 더해주고, 무겁고 어두운 색은 활력을 떨어뜨릴 수 있어요.',
    good: [
      { name: '초록', hex: '#3E9E68', why: '토(土) 기운과 조화를 이루는 자연 컬러' },
      { name: '연두', hex: '#A8CE63', why: '온화하고 평화로운 느낌을 전하는 색' },
      { name: '베이지', hex: '#E4D6BC', why: '안정감과 따뜻함을 더해주는 자연 컬러' }
    ],
    bad: [
      { name: '검정', hex: '#111318', why: '' },
      { name: '회색', hex: '#98A2B3', why: '' }
    ],
    badReason: '우울함과 답답함을 유발하고 활력을 낮출 수 있습니다.',
    tip: '베이지 니트에 연두 포인트를 더하면 소띠의 부드러운 신뢰감이 한층 살아납니다.',
    palette: ['#3E9E68', '#A8CE63', '#E4D6BC', '#D9C08A', '#7E9B57', '#F2EADB']
  },
  tiger: {
    key: 'tiger',
    emoji: '🐯',
    name: '호랑이띠',
    branch: '인(寅)',
    element: 'wood',
    pairTitle: '호랑이띠 · 토끼띠',
    makeup: '목(木) 기운이 강한 띠',
    headline: '성장과 활기를 불어넣는 컬러',
    summary: '호랑이띠는 추진력과 도전 정신이 강한 대표적인 목(木) 기운의 띠입니다. 새싹이 자라듯 뻗어 나가는 색이 힘이 되고, 목을 눌러버리는 금(金) 기운의 색은 피하는 편이 좋아요.',
    good: [
      { name: '초록', hex: '#3E9E68', why: '목(木) 기운을 강화하며 신선함과 성장의 에너지를 불어넣습니다.' },
      { name: '파랑', hex: '#2B6CB0', why: '수(水) 기운이 목(木)을 키워주어 활기와 지적 능력을 높입니다.' },
      { name: '검정', hex: '#111318', why: '수(水) 기운이 목(木)을 키워주어 활기와 지적 능력을 높입니다.' }
    ],
    bad: [
      { name: '흰색', hex: '#F4F6FA', why: '' },
      { name: '금색', hex: '#D4AF37', why: '' }
    ],
    badReason: '금(金) 기운이 목(木)을 극(克)하여 운세를 약화시킬 수 있습니다.',
    tip: '도전하는 날에는 초록 또는 딥그린 계열로 승부해보세요.',
    palette: ['#3E9E68', '#2B6CB0', '#111318', '#7BAE7F', '#0E4C82', '#A8CE63']
  },
  rabbit: {
    key: 'rabbit',
    emoji: '🐰',
    name: '토끼띠',
    branch: '묘(卯)',
    element: 'wood',
    pairTitle: '호랑이띠 · 토끼띠',
    makeup: '목(木) 기운이 강한 띠',
    headline: '성장과 활기를 불어넣는 컬러',
    summary: '토끼띠는 온화하고 섬세하며 관계를 부드럽게 풀어가는 목(木) 기운의 띠입니다. 성장의 기운을 북돋는 색이 잘 맞고, 목을 자르는 금(金) 기운의 색은 기운을 약하게 만들 수 있어요.',
    good: [
      { name: '초록', hex: '#3E9E68', why: '목(木) 기운을 강화하며 신선함과 성장의 에너지를 불어넣습니다.' },
      { name: '파랑', hex: '#2B6CB0', why: '수(水) 기운이 목(木)을 키워주어 활기와 지적 능력을 높입니다.' },
      { name: '검정', hex: '#111318', why: '수(水) 기운이 목(木)을 키워주어 활기와 지적 능력을 높입니다.' }
    ],
    bad: [
      { name: '흰색', hex: '#F4F6FA', why: '' },
      { name: '금색', hex: '#D4AF37', why: '' }
    ],
    badReason: '금(金) 기운이 목(木)을 극(克)하여 운세를 약화시킬 수 있습니다.',
    tip: '차분한 세이지 그린에 아이보리를 살짝 섞으면 토끼띠의 섬세함이 돋보입니다.',
    palette: ['#3E9E68', '#2B6CB0', '#111318', '#B7CFA8', '#6E9E7A', '#0E4C82']
  },
  dragon: {
    key: 'dragon',
    emoji: '🐲',
    name: '용띠',
    branch: '진(辰)',
    element: 'earth',
    pairTitle: '용띠',
    makeup: '토(土) 기운이 강한 띠',
    headline: '큰 판을 지켜주는 든든한 컬러',
    summary: '용띠는 스케일이 크고 리더십이 강한 토(土) 기운의 띠입니다. 중심을 잡아주는 흙의 색이 판을 키워주고, 기운을 흩어버리는 목(木) 계열은 과하게 쓰면 산만해 보일 수 있어요.',
    good: [
      { name: '황금색', hex: '#D4AF37', why: '토(土)가 금(金)을 생(生)하는 상생 컬러로 품격과 성취를 상징합니다.' },
      { name: '베이지', hex: '#E4D6BC', why: '흙의 안정감으로 큰 판을 단단하게 지켜줍니다.' },
      { name: '브라운', hex: '#8B5E34', why: '묵직한 신뢰감으로 용띠의 존재감을 받쳐줍니다.' }
    ],
    bad: [
      { name: '연두', hex: '#A8CE63', why: '' },
      { name: '옅은 초록', hex: '#B7CFA8', why: '' }
    ],
    badReason: '토(土)를 극(克)하는 목(木) 기운이 중심을 흔들어 판단을 흐리고 산만함을 만들 수 있습니다.',
    tip: '중요한 자리에는 골드 액세서리나 브라운 톤을 포인트로 활용해보세요.',
    palette: ['#D4AF37', '#E4D6BC', '#8B5E34', '#C79A4B', '#F7EFDD', '#5E4326']
  },
  snake: {
    key: 'snake',
    emoji: '🐍',
    name: '뱀띠',
    branch: '사(巳)',
    element: 'fire',
    pairTitle: '뱀띠 · 닭띠',
    makeup: '화(火) 기운이 강한 띠',
    headline: '열정과 행운을 불러오는 컬러',
    summary: '뱀띠는 통찰력이 깊고 집중력이 뛰어난 화(火) 기운의 띠입니다. 타오르는 기운을 닮은 따뜻한 색이 행운을 부르고, 기운을 누르는 차갑고 어두운 색은 흐름을 막을 수 있어요.',
    good: [
      { name: '빨강', hex: '#E2452F', why: '열정과 행운' },
      { name: '주황', hex: '#F0742C', why: '활력과 창의성' },
      { name: '노랑', hex: '#EBBB2B', why: '긍정과 풍요' }
    ],
    bad: [
      { name: '검정', hex: '#111318', why: '' },
      { name: '파랑', hex: '#2B6CB0', why: '' }
    ],
    badReason: '화(火) 기운이 강한 뱀띠에게 검정·파랑의 수(水) 기운은 에너지를 억누르고 부정적인 흐름을 만들 수 있습니다.',
    tip: '특히 중요한 날일수록 차갑고 어두운 컬러는 피하는 것이 좋습니다.',
    palette: ['#E2452F', '#F0742C', '#EBBB2B', '#C63A22', '#F5A623', '#8E2418']
  },
  horse: {
    key: 'horse',
    emoji: '🐴',
    name: '말띠',
    branch: '오(午)',
    element: 'fire',
    pairTitle: '말띠',
    makeup: '화(火) 기운이 강한 띠',
    headline: '뜨거운 추진력을 살려주는 컬러',
    summary: '말띠는 활동적이고 자유분방하며 추진력이 빠른 화(火) 기운의 띠입니다. 뜨거운 열정의 색이 기운을 끌어올려 주고, 차갑게 가라앉는 색은 의욕을 꺾을 수 있어요.',
    good: [
      { name: '빨강', hex: '#E2452F', why: '열정과 행운' },
      { name: '주황', hex: '#F0742C', why: '활력과 창의성' },
      { name: '노랑', hex: '#EBBB2B', why: '긍정과 풍요' }
    ],
    bad: [
      { name: '검정', hex: '#111318', why: '' },
      { name: '파랑', hex: '#2B6CB0', why: '' }
    ],
    badReason: '수(水) 기운이 화(火)를 극(克)하여 에너지를 억누르고 부정적인 흐름을 만들 수 있습니다.',
    tip: '경쟁이 치열한 날에는 레드나 오렌지 포인트로 승부해보세요.',
    palette: ['#E2452F', '#F0742C', '#EBBB2B', '#C63A22', '#F5A623', '#8E2418']
  },
  goat: {
    key: 'goat',
    emoji: '🐐',
    name: '양띠',
    branch: '미(未)',
    element: 'earth',
    pairTitle: '소띠 · 양띠',
    makeup: '토(土) 기운이 강한 띠',
    headline: '온화함과 평화로움을 더하는 컬러',
    summary: '양띠는 다정하고 감수성이 풍부하며 분위기를 부드럽게 만드는 토(土) 기운의 띠입니다. 따뜻한 자연 컬러가 안정감을 더해주고, 무겁고 어두운 색은 활력을 떨어뜨릴 수 있어요.',
    good: [
      { name: '초록', hex: '#3E9E68', why: '토(土) 기운과 조화를 이루는 자연 컬러' },
      { name: '연두', hex: '#A8CE63', why: '온화하고 평화로운 느낌을 전하는 색' },
      { name: '베이지', hex: '#E4D6BC', why: '안정감과 따뜻함을 더해주는 자연 컬러' }
    ],
    bad: [
      { name: '검정', hex: '#111318', why: '' },
      { name: '회색', hex: '#98A2B3', why: '' }
    ],
    badReason: '우울함과 답답함을 유발하고 활력을 낮출 수 있습니다.',
    tip: '부드러운 베이지에 따뜻한 크림 톤을 더하면 양띠의 포근함이 잘 드러납니다.',
    palette: ['#3E9E68', '#A8CE63', '#E4D6BC', '#D9C08A', '#7E9B57', '#F2EADB']
  },
  monkey: {
    key: 'monkey',
    emoji: '🐵',
    name: '원숭이띠',
    branch: '신(申)',
    element: 'metal',
    pairTitle: '원숭이띠',
    makeup: '금(金) 기운이 강한 띠',
    headline: '재치와 결단력을 살려주는 컬러',
    summary: '원숭이띠는 재주가 많고 임기응변이 빠른 금(金) 기운의 띠입니다. 정리와 완성의 색이 결단력을 세워주고, 과한 화(火) 기운은 성급함으로 흐르기 쉬워요.',
    good: [
      { name: '흰색', hex: '#F4F6FA', why: '금(金)의 맑은 기운으로 명료함과 세련미를 더합니다.' },
      { name: '실버', hex: '#98A2B3', why: '냉철한 판단과 재치를 살려주는 대표 금(金) 컬러입니다.' },
      { name: '파랑', hex: '#2B6CB0', why: '금(金)이 수(水)를 생(生)하는 상생 컬러로 아이디어를 유연하게 풀어줍니다.' }
    ],
    bad: [
      { name: '빨강', hex: '#E2452F', why: '' },
      { name: '주황', hex: '#F0742C', why: '' }
    ],
    badReason: '화(火) 기운이 금(金)을 극(克)하여 판단을 성급하게 만들고 결단을 흐릴 수 있습니다.',
    tip: '집중이 필요한 날에는 화이트 셔츠에 실버 포인트를 매치해보세요.',
    palette: ['#F4F6FA', '#98A2B3', '#2B6CB0', '#4B5563', '#CFD6E0', '#0E4C82']
  },
  rooster: {
    key: 'rooster',
    emoji: '🐔',
    name: '닭띠',
    branch: '유(酉)',
    element: 'fire',
    pairTitle: '뱀띠 · 닭띠',
    makeup: '화(火) 기운이 강한 띠',
    headline: '열정과 행운을 불러오는 컬러',
    summary: '닭띠는 부지런하고 표현이 분명하며 존재감이 또렷한 화(火) 기운의 띠입니다. 따뜻하고 밝은 색이 행운을 부르고, 기운을 누르는 차갑고 어두운 색은 흐름을 막을 수 있어요.',
    good: [
      { name: '빨강', hex: '#E2452F', why: '열정과 행운' },
      { name: '주황', hex: '#F0742C', why: '활력과 창의성' },
      { name: '노랑', hex: '#EBBB2B', why: '긍정과 풍요' }
    ],
    bad: [
      { name: '검정', hex: '#111318', why: '' },
      { name: '파랑', hex: '#2B6CB0', why: '' }
    ],
    badReason: '화(火) 기운이 강한 닭띠에게 검정·파랑의 수(水) 기운은 에너지를 억누르고 부정적인 흐름을 만들 수 있습니다.',
    tip: '중요한 날일수록 차갑고 어두운 컬러는 피하는 것이 좋습니다.',
    palette: ['#E2452F', '#F0742C', '#EBBB2B', '#C63A22', '#F5A623', '#8E2418']
  },
  dog: {
    key: 'dog',
    emoji: '🐶',
    name: '개띠',
    branch: '술(戌)',
    element: 'metal',
    pairTitle: '개띠',
    makeup: '금(金) 기운이 강한 띠',
    headline: '의리와 신뢰를 다져주는 컬러',
    summary: '개띠는 의리 있고 책임감이 강하며 사람을 잘 챙기는 금(金) 기운의 띠입니다. 맑고 정돈된 색이 믿음직한 인상을 완성하고, 과한 화(火) 기운은 판단을 성급하게 만들 수 있어요.',
    good: [
      { name: '흰색', hex: '#F4F6FA', why: '금(金)의 맑은 기운으로 신뢰와 청결한 인상을 만듭니다.' },
      { name: '베이지', hex: '#E4D6BC', why: '토(土)가 금(金)을 생(生)하여 편안한 신뢰감을 더합니다.' },
      { name: '실버', hex: '#98A2B3', why: '금(金)의 정돈된 기운으로 책임감 있는 인상을 완성합니다.' }
    ],
    bad: [
      { name: '빨강', hex: '#E2452F', why: '' },
      { name: '주황', hex: '#F0742C', why: '' }
    ],
    badReason: '화(火) 기운이 금(金)을 극(克)하여 판단을 성급하게 만들고 신뢰의 흐름을 흔들 수 있습니다.',
    tip: '포근한 베이지 니트에 화이트 팬츠로 믿음직한 인상을 만들어보세요.',
    palette: ['#F4F6FA', '#E4D6BC', '#98A2B3', '#CFD6E0', '#B99B6B', '#4B5563']
  },
  pig: {
    key: 'pig',
    emoji: '🐷',
    name: '돼지띠',
    branch: '해(亥)',
    element: 'water',
    pairTitle: '쥐띠 · 돼지띠',
    makeup: '수(水) 기운이 강한 띠',
    headline: '깊이와 지혜로 신뢰를 쌓는 컬러',
    summary: '돼지띠는 넉넉하고 배려심이 많으며 복을 부르는 띠입니다. 차분한 수(水) 기운의 컬러가 안정감을 주고, 강한 화(火) 기운의 색은 흐름을 흐트러뜨릴 수 있어요.',
    good: [
      { name: '검정', hex: '#111318', why: '깊이와 지혜를 상징' },
      { name: '파랑', hex: '#2B6CB0', why: '차분함과 신뢰감' },
      { name: '흰색', hex: '#F4F6FA', why: '청결하고 순수한 이미지' }
    ],
    bad: [
      { name: '빨강', hex: '#E2452F', why: '' },
      { name: '주황', hex: '#F0742C', why: '' }
    ],
    badReason: '강렬한 화(火) 기운이 수(水) 기운을 지닌 돼지띠와 충돌하여 불안정함과 긴장감을 유발할 수 있습니다.',
    tip: '중요한 발표나 면접 날에는 네이비, 차콜 계열을 선택해보세요.',
    palette: ['#111318', '#2B6CB0', '#F4F6FA', '#5A6B85', '#0E4C82', '#8FA6C2']
  }
};

/* 순서 (쥐부터 돼지까지) */
const ZODIAC_ORDER = ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'];

/* 그룹 (PPT 구성 순서와 동일) */
const ZODIAC_GROUPS = [
  { title: '쥐띠 · 돼지띠', element: 'water', keys: ['rat', 'pig'] },
  { title: '소띠 · 양띠', element: 'earth', keys: ['ox', 'goat'] },
  { title: '호랑이띠 · 토끼띠', element: 'wood', keys: ['tiger', 'rabbit'] },
  { title: '뱀띠 · 닭띠', element: 'fire', keys: ['snake', 'rooster'] },
  { title: '용띠', element: 'earth', keys: ['dragon'] },
  { title: '말띠', element: 'fire', keys: ['horse'] },
  { title: '원숭이띠', element: 'metal', keys: ['monkey'] },
  { title: '개띠', element: 'metal', keys: ['dog'] }
];
