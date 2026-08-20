export type TimelineCategory =
  | "origin"
  | "satellite"
  | "crewed"
  | "lunar"
  | "mars"
  | "station"
  | "navigation"
  | "future";

export interface TimelineEvent {
  year: string;
  title: string;
  titleEn: string;
  description: string;
  category: TimelineCategory;
  image?: string;
  featured: boolean;
  spacecraft?: string[];
  source: string;
  sourceURL: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: "1956",
    title: "中国航天事业起步",
    titleEn: "China's Space Program Begins",
    description:
      "1956年10月8日，国防部第五研究院在北京成立，钱学森任院长。中国航天事业由此起步。",
    category: "origin",
    featured: true,
    source: "国家航天局：国防部第五研究院成立，中国航天事业起步",
    sourceURL:
      "https://www.cnsa.gov.cn/n6758823/n6758844/n6760209/n6760215/c6809194/content.html",
  },
  {
    year: "1970",
    title: "东方红一号",
    titleEn: "Dongfanghong-1",
    description:
      "1970年4月24日，中国第一颗人造地球卫星“东方红一号”发射成功，开创了中国航天的新纪元。",
    category: "satellite",
    featured: true,
    spacecraft: ["东方红一号"],
    source: "国家航天局：永远的“东方红”——我国卫星公用平台能力的发展",
    sourceURL: "https://www.cnsa.gov.cn/n6758968/n6758973/c6809304/content.html",
  },
  {
    year: "1999",
    title: "神舟一号",
    titleEn: "Shenzhou-1",
    description:
      "1999年11月20日，中国自主研制的第一艘无人试验飞船神舟一号发射升空，为后续载人飞行奠定基础。",
    category: "crewed",
    featured: false,
    spacecraft: ["神舟一号"],
    source: "国家航天局：神舟二十载问天不停歇",
    sourceURL: "https://www.cnsa.gov.cn/n6758823/n6758838/c6808647/content.html",
  },
  {
    year: "2003",
    title: "神舟五号",
    titleEn: "Shenzhou-5",
    description:
      "2003年10月15日，杨利伟乘神舟五号进入太空，中国首次载人航天飞行取得成功。",
    category: "crewed",
    featured: true,
    spacecraft: ["神舟五号"],
    source: "国家航天局：杨利伟成为我国太空第一人，首个土星专用探测器发射",
    sourceURL: "https://www.cnsa.gov.cn/n6758968/n6758973/c6807861/content.html",
  },
  {
    year: "2007",
    title: "嫦娥一号",
    titleEn: "Chang'e-1",
    description:
      "2007年10月24日，嫦娥一号发射成功，中国人第一次将自主研制的探测器送入月球轨道。",
    category: "lunar",
    featured: false,
    spacecraft: ["嫦娥一号"],
    source: "国家航天局：二十年，我们是如何走出一条中国特色探月路的？",
    sourceURL:
      "https://www.cnsa.gov.cn/n6758823/n6758838/c10467940/content.html",
  },
  {
    year: "2013",
    title: "嫦娥三号",
    titleEn: "Chang'e-3",
    description:
      "2013年，嫦娥三号着陆月球，实现中国首次地外天体软着陆。",
    category: "lunar",
    featured: false,
    spacecraft: ["嫦娥三号", "玉兔号"],
    source: "国家航天局：63年前的今天——中国航天事业的起点",
    sourceURL: "https://www.cnsa.gov.cn/n6758823/n6758838/c6807798/content.html",
  },
  {
    year: "2016",
    title: "长征五号首飞",
    titleEn: "Long March 5 Maiden Flight",
    description:
      "2016年11月3日，长征五号运载火箭首次发射任务取得圆满成功，成为后续空间站、探月等重大任务的重要支撑。",
    category: "origin",
    featured: false,
    spacecraft: ["长征五号"],
    source: "国家航天局：我国最大推力新一代运载火箭长征五号首飞成功",
    sourceURL: "https://www.cnsa.gov.cn/n6758968/n6758972/c6798627/content.html",
  },
  {
    year: "2019",
    title: "嫦娥四号月球背面着陆",
    titleEn: "Chang'e-4 Far Side Landing",
    description:
      "2019年1月，嫦娥四号实现人类探测器首次月球背面软着陆，拓展了月球探测的新边界。",
    category: "lunar",
    featured: true,
    spacecraft: ["嫦娥四号", "玉兔二号"],
    source: "国家航天局：深空创新路筑就揽月梦",
    sourceURL: "https://www.cnsa.gov.cn/n6758823/n6758838/c6806583/content.html",
  },
  {
    year: "2020",
    title: "北斗三号全球卫星导航系统建成",
    titleEn: "BeiDou-3 Global System Completed",
    description:
      "2020年，北斗三号全球卫星导航系统正式开通，开始面向全球提供服务。",
    category: "navigation",
    featured: true,
    spacecraft: ["北斗三号"],
    source: "国务院新闻办公室：《新时代的中国北斗》白皮书",
    sourceURL:
      "https://www.scio.gov.cn/zfbps/ndhf/2022n/202304/t20230407_710483.html",
  },
  {
    year: "2020",
    title: "嫦娥五号月球采样返回",
    titleEn: "Chang'e-5 Lunar Sample Return",
    description:
      "2020年12月17日，嫦娥五号返回器成功着陆，中国首次地外天体采样返回任务圆满完成。",
    category: "lunar",
    featured: false,
    spacecraft: ["嫦娥五号"],
    source: "国家航天局：嫦娥五号探测器圆满完成我国首次地外天体采样返回任务",
    sourceURL: "https://www.cnsa.gov.cn/n6758823/n6758838/c6810872/content.html",
  },
  {
    year: "2021",
    title: "天问一号 / 祝融号火星探测",
    titleEn: "Tianwen-1 and Zhurong Mars Exploration",
    description:
      "2021年，天问一号着陆巡视器成功着陆火星，祝融号火星车随后开展巡视探测。",
    category: "mars",
    featured: true,
    spacecraft: ["天问一号", "祝融号"],
    source: "国家航天局：首次火星探测任务",
    sourceURL:
      "https://www.cnsa.gov.cn/n6758824/n6759009/n6760412/c6840460/content.html",
  },
  {
    year: "2021",
    title: "天和核心舱发射",
    titleEn: "Tianhe Core Module Launch",
    description:
      "2021年4月29日，中国空间站天和核心舱发射升空并进入预定轨道，中国空间站建造进入全面实施阶段。",
    category: "station",
    featured: true,
    spacecraft: ["天和核心舱"],
    source: "国家航天局：中国空间站天和核心舱发射任务成功",
    sourceURL:
      "https://www.cnsa.gov.cn/n6758823/n6758844/n10663475/n10663520/c6811968/content.html",
  },
  {
    year: "2022",
    title: "中国空间站完成“T”字基本构型",
    titleEn: "China Space Station T-Shape Configuration",
    description:
      "2022年11月3日，梦天实验舱完成转位，中国空间站“T”字基本构型在轨组装完成。",
    category: "station",
    featured: true,
    spacecraft: ["天和核心舱", "问天实验舱", "梦天实验舱"],
    source: "中国载人航天工程网：空间站梦天实验舱顺利完成转位",
    sourceURL: "https://www.cmse.gov.cn/xwzx/202211/t20221103_51224.html",
  },
  {
    year: "2024",
    title: "嫦娥六号月球背面采样返回",
    titleEn: "Chang'e-6 Far Side Sample Return",
    description:
      "2024年6月25日，嫦娥六号返回器安全着陆，实现世界首次月球背面采样返回。",
    category: "lunar",
    featured: true,
    spacecraft: ["嫦娥六号"],
    source: "国家航天局：嫦娥六号任务圆满成功实现世界首次月球背面采样返回",
    sourceURL:
      "https://www.cnsa.gov.cn/n6758823/n6758838/c10565180/content.html",
  },
  {
    year: "2026",
    title: "中国航天事业创建70周年",
    titleEn: "70th Anniversary of China's Space Program",
    description:
      "2026年是中国航天事业创建70周年，中国航天日以“七秩问天路 携手探九霄”为年度主题。",
    category: "origin",
    featured: false,
    source: "国家航天局：关于征集2026年“中国航天日”宣传海报的通知",
    sourceURL:
      "https://www.cnsa.gov.cn/n6758823/n6758839/c10726432/content.html",
  },
  {
    year: "2030年前",
    title: "中国计划实现载人登月",
    titleEn: "China Plans a Crewed Lunar Landing Before 2030",
    description:
      "中国载人月球探测工程登月阶段任务已启动实施，计划在2030年前实现中国人首次登陆月球。",
    category: "future",
    featured: true,
    source: "国家航天局：中国计划在2030年前实现首次登陆月球",
    sourceURL:
      "https://www.cnsa.gov.cn/n6758823/n6758838/c10026858/content.html",
  },
];
