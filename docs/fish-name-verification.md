# 鱼种英文名称校验

核验日期：2026-09-16。此表核对用户提供的中文鱼名与英文名称/学名的对应，不代表已完成每张真实鱼获照片的物种鉴定。照片对应、日期和地点的原有待核实说明继续保留。

网站英文名称优先采用数据库明确收录的英文俗名；本次未找到充分支持的英文俗名时，显示学名，不另造拼音加英文的组合。下表“采用学名”不意味着世界上不存在任何英文别称，也不把学名说成英文俗名。

| 中文名称 | 英文页面显示 | 对应学名 | 核验与采用依据 |
| --- | --- | --- | --- |
| 白斑红点鲑 | Whitespotted char | Salvelinus leucomaenis | [FishBase](https://www.fishbase.se/summary/Salvelinus-leucomaenis.html) 明确收录该英文名；原 White-spotted char 是拼写变体，本站统一为 FishBase 写法。 |
| 重口裂腹鱼 | Schizothorax davidi | Schizothorax davidi | [FishBase 中文名](https://www.fishbase.se/ComNames/CommonNameSummary.php?autoctr=186563) 对应重口裂腹魚；[物种页](https://www.fishbase.se/summary/Schizothorax-davidi.html) 未列主英文俗名。采用学名，删除 Chongkou snowtrout。 |
| 齐口裂腹鱼 | Schizothorax prenanti | Schizothorax prenanti | [FishBase 名称表](https://www.fishbase.se/ComNames/CommonNamesList.php?GenusName=Schizothorax&ID=55358&SpeciesName=prenanti&StockCode=45856) 收录齐口裂腹鱼，但所列语言无英文；[NCBI](https://www.ncbi.nlm.nih.gov/taxonomy/75362) 对应同一学名。删除 Qikou snowtrout。 |
| 中华倒刺鲃 | Spinibarbus sinensis | Spinibarbus sinensis | [FishBase 名称表](https://fishbase.se/ComNames/CommonNamesList.php?GenusName=Spinibarbus&ID=62460&SpeciesName=sinensis&StockCode=52460) 收录中华倒刺鲃，没有英文条目。采用学名，删除没有明确来源支持的 Chinese barbel。FAO 材料中另见 Qingbo fish，但本站选择学名保持指代明确。 |
| 圆吻鲴 | Round snout | Distoechodon tumirostris | [上海海洋大学博物馆](https://bwg.shou.edu.cn/2020/0709/c15622a272634/page.htm) 支持中文名与学名对应；[NCBI Taxonomy 70541](https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=70541) 明确列 common name 为 round snout。删除 Yuanwen gudgeon，不采用另一物种大眼圆吻鲴的 Red-wing fish。 |
| 白甲鱼 | Onychostoma simum | Onychostoma simum | [四川白甲鱼人工繁殖标准信息页](https://std.samr.gov.cn/db/search/stdDBDetailed?id=91D99E4D9E0A2E24E05397BE0A0A3A10) 将白甲鱼对应旧写法 Onychostoma sima；[FishBase 异名表](https://fishbase.se/Nomenclature/54868) 明确将 O. simum 列为 accepted，O. sima 列为异名并标记拼写问题；[名称表](https://www.fishbase.se/ComNames/54868) 未列英文名。本站采用当前写法，不把 Baijia 音译当作英文俗名。 |
| 斑鳜 | Leopard mandarin fish | Siniperca scherzeri | [大连海洋大学论文](https://xuebao.dlou.edu.cn/CN/10.3969/j.issn.1000-9957.2007.06.004) 支持中拉对应；[NCBI Taxonomy 228252](https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=228252) 明确收录 leopard mandarin fish；[美国鱼类及野生动物管理局](https://www.fws.gov/sites/default/files/documents/Ecological-Risk-Screening-Summary-Leopard-Mandarin-Fish.pdf) 同样使用此名。删除 Ban-gui mandarin fish。 |
| 细鳞鲑 | Lenok | Brachymystax lenok（名称对应） | [FishBase](https://www.fishbase.se/summary/Brachymystax-lenok.html) 明确收录 Lenok。保留这个通名，不根据现有照片擅自进一步确认为 sharp-snouted 或 blunt-snouted；若要确认鱼获对应 B. lenok 或 B. tumensis，应另做鉴定。 |
| 北极茴鱼 | Arctic grayling | Thymallus arcticus（名称对应） | [FishBase](https://www.fishbase.org/Summary/thymallus-arcticus) 明确收录 Arctic grayling。这里翻译用户自报的鱼种名，不凭该译名确认一条未提供地点/照片的茴鱼必然属于此种。 |

## 网站修改范围

- 英文鱼种卡片与详情共用 `content/journal-en.ts` 中的 `englishFishNames`。
- 心愿单同样引用白甲鱼的名称，显示 `Onychostoma simum — a big one`；“a big one”只是大个体目标说明，不是鱼名组成部分。
- 中文鱼名、图标、照片、日期、地点和已解锁状态不变。
- 旧图像生成提示词作为历史资产生成记录保留，不追改为新的名称核验记录。
- 本次核验只涉及名称，不扩展为保护等级、法规或钓获合法性判断。


## 2026-09-16 心愿单新增

| 中文显示 | 英文页面显示 | 对应学名 | 依据 |
| --- | --- | --- | --- |
| GT | Giant trevally | Caranx ignobilis | [FishBase 物种页](https://www.fishbase.se/summary/Caranx-ignobilis.html)；GT 按钓鱼语境的 Giant trevally 解释。 |
| 香鱼 | Ayu sweetfish | Plecoglossus altivelis | [FishBase 物种页](https://www.fishbase.se/summary/251) 列明 Ayu sweetfish。 |
| 青竹鲤 | Spinibarbus denticulatus | Spinibarbus denticulatus | [农业农村部资料](https://yyj.moa.gov.cn/scyz/201904/t20190428_6232059.htm) 将青竹鲤列为倒刺鲃地方名；拉丁属名拼写采用 [FishBase 物种页](https://www.fishbase.se/summary/Spinibarbus_denticulatus.html)，不沿用旧资料中的 Spinibaxbus 排印错误。缺少充分支持的主英文俗名，采用学名。 |

青竹鲤作为独立心愿，与已解锁中华倒刺鲃（Spinibarbus sinensis）分开，不使用同一图标。三项仅加入心愿单，均标为未解锁，不生成日期、地点或鱼获照片，也不增加解锁计数。保留原有大个体白甲鱼目标。

## 2026-09-17 红眼鳟新增

红眼鳟（赤眼鳟的俗称） → **Barbel chub** → *Squaliobarbus curriculus*。
[FishBase](https://www.fishbase.org/summary/10387) 列英文名；[台湾鱼类资料库标本页](https://fishdb.sinica.edu.tw/mobi/specimendetail.php?id=NTUM02219) 支持中文名与学名对应。用户确认已解锁、日期2026-08-15、地点重庆；照片由用户提供。

用户随后纠正网站显示名称为“红眼鳟”。[农业部公报](https://www.moa.gov.cn/nybgb/2014/shiyi/201712/P020221107732921620727.pdf) 将红眼鳟列为赤眼鳟俗称，对应同一学名；保留 Barbel chub 译名。首次图标体形偏短高背，已按活体与用户实物参照重绘，不采用首版。
