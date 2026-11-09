import type { Source } from './types'

// 出典一覧。本文の {{語句|id}} から参照される。
// accessed は本教材の作成時に内容を確認した日付（資料側の更新日ではない）。
const A = '2026-11-08'

export const sources: Record<string, Source> = {
  // ---------- 歯科・義歯・口腔 ----------
  'jda-8020-structure': { id: 'jda-8020-structure', title: 'テーマパーク8020「歯と歯ぐきと歯を支える骨の構造」', publisher: '公益社団法人日本歯科医師会', url: 'https://www.jda.or.jp/park/function/index.html', accessed: A, note: '歯の組織・歯周組織・唾液腺の基礎' },
  'jda-8020-jaw': { id: 'jda-8020-jaw', title: 'テーマパーク8020「顎の構造」', publisher: '公益社団法人日本歯科医師会', url: 'https://www.jda.or.jp/park/function/index02_2.html', accessed: A, note: '顎関節・閉口筋' },
  'jda-8020-muscle': { id: 'jda-8020-muscle', title: 'テーマパーク8020「筋肉の働き」', publisher: '公益社団法人日本歯科医師会', url: 'https://www.jda.or.jp/park/function/index04.html', accessed: A, note: '口輪筋・頬筋と義歯保持' },
  'jda-8020-denture': { id: 'jda-8020-denture', title: 'テーマパーク8020「入れ歯」', publisher: '公益社団法人日本歯科医師会', url: 'https://www.jda.or.jp/park/lose/index17.html', accessed: A, note: '義歯の構造・不適合・乾燥による変形' },
  'helics-tooth-code': { id: 'helics-tooth-code', title: 'HS033 標準歯式コード仕様', publisher: '医療情報標準化協議会（HELICS）', url: 'https://square.umin.ac.jp/helics/files/HS033/HS033_report_20180801.pdf', accessed: A, note: '2018年8月。FDI二桁法の定義' },
  'mhlw-dental-abbrev': { id: 'mhlw-dental-abbrev', title: '歯科の診療録及び診療報酬明細書に使用できる略称について（保医発0319第7号）', publisher: '厚生労働省保険局', url: 'https://kouseikyoku.mhlw.go.jp/kantoshinetsu/gyomu/gyomu/hoken_kikan/tsuchi/documents/260319sikanosinryourokuoyobisinryouhoushuumeisaishonisiyoudekiruryakushounituite.pdf', accessed: A, note: '平成26年3月19日通知。歯科略語の公式一覧' },
  'chigasaki-abbrev': { id: 'chigasaki-abbrev', title: '在宅医療・介護略語集（多職種連携ガイドライン第2版 第9章）', publisher: '茅ヶ崎市', url: 'https://www.city.chigasaki.kanagawa.jp/_res/projects/default_project/_page_/001/034/124/tasyokusyugaidoraindai2han9syou.pdf', accessed: A, note: '歯科略語の在宅向け解説' },
  'jpds-denture-gl': { id: 'jpds-denture-gl', title: '有床義歯補綴診療のガイドライン（2009改訂版）', publisher: '日本補綴歯科学会', url: 'https://hotetsu.com/s/doc/plate_denture_guideline.pdf', accessed: A, note: '義歯の分類・製作・調整・夜間保管の根拠' },
  'jads-denture-mgmt': { id: 'jads-denture-mgmt', title: '有床義歯の管理について（令和8年3月）', publisher: '日本歯科医学会', url: 'https://jads.jp/assets/pdf/basic/r08/document-260326-3.pdf', accessed: A, note: '着脱・清掃・保管・適応期間' },
  'jdha-denture-card': { id: 'jdha-denture-card', title: '入れ歯 洗浄剤／ケース／安定剤（啓発カード）', publisher: '公益社団法人日本歯科衛生士会', url: 'https://www.jdha.or.jp/pdf/contents/info/shien_02.pdf', accessed: A, note: '義歯清掃と保管の指導' },
  'jads-ohf-2026': { id: 'jads-ohf-2026', title: '口腔機能低下症に関する基本的な考え方（令和8年3月）', publisher: '日本歯科医学会', url: 'https://www.jads.jp/assets/pdf/basic/r08/document-260511.pdf', accessed: A, note: '7項目の検査法と基準値、診断基準' },
  'jads-ohf-2024': { id: 'jads-ohf-2024', title: '口腔機能低下症に関する基本的な考え方（令和6年3月）', publisher: '日本歯科医学会', url: 'https://www.jads.jp/assets/pdf/basic/r06/document-240329.pdf', accessed: A, note: '前版。基準値は令和8年版と同一' },
  'of-statement-2024': { id: 'of-statement-2024', title: 'オーラルフレイルに関する3学会合同ステートメント', publisher: '日本老年医学会・日本老年歯科医学会・日本サルコペニア・フレイル学会', url: 'https://www.jstage.jst.go.jp/article/jsg/38/supplement/38_86/_pdf/-char/ja', accessed: A, note: '2024年4月。新定義とOF-5' },
  'jda-oralfrail-manual': { id: 'jda-oralfrail-manual', title: '歯科診療所におけるオーラルフレイル対応マニュアル 2019年版 第I部', publisher: '公益社団法人日本歯科医師会', url: 'https://www.jda.or.jp/dentist/oral_flail/pdf/manual_sec_01.pdf', accessed: A, note: '4レベルの概念と柏スタディの紹介' },
  'tanaka-2018': { id: 'tanaka-2018', title: 'Tanaka T, et al. Oral Frailty as a Risk Factor for Physical Frailty and Mortality in Community-Dwelling Elderly. J Gerontol A Biol Sci Med Sci. 2018;73(12):1661-1667', publisher: 'PubMed（柏スタディ）', url: 'https://pubmed.ncbi.nlm.nih.gov/29161342/', accessed: A, note: '英語。オーラルフレイルと要介護・死亡リスク' },
  'tanaka-2023': { id: 'tanaka-2023', title: 'Tanaka T, et al. Oral frailty five-item checklist to predict adverse health outcomes in community-dwelling older adults. Geriatr Gerontol Int. 2023;23:651-659', publisher: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/37661091/', accessed: A, note: '英語。OF-5の妥当性' },
  'yoneyama-2002': { id: 'yoneyama-2002', title: 'Yoneyama T, et al. Oral care reduces pneumonia in older patients in nursing homes. J Am Geriatr Soc. 2002;50(3):430-433', publisher: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/11943036/', accessed: A, note: '英語。口腔ケアと肺炎予防の介入研究' },
  'yoneyama-mhlw-2006': { id: 'yoneyama-mhlw-2006', title: '後期高齢者医療における歯科医療の果たすべき役割（米山武義）', publisher: '厚生労働省 審議会資料', url: 'https://www.mhlw.go.jp/shingi/2006/11/dl/s1120-7a.pdf', accessed: A, note: '2006年11月。口腔ケア研究の日本語解説' },
  'tyojyu-oralcare': { id: 'tyojyu-oralcare', title: '口腔ケアの具体的方法（健康長寿ネット）', publisher: '公益財団法人長寿科学振興財団', url: 'https://www.tyojyu.or.jp/net/byouki/kango/kokucare.html', accessed: A, note: '姿勢と手順' },
  'jda-mhlw-homecare-2023': { id: 'jda-mhlw-homecare-2023', title: '在宅医療分野の歯科領域における役割・取組と今後について', publisher: '日本歯科医師会（厚生労働省委託事業資料）', url: 'https://www.mhlw.go.jp/content/10802000/001237307.pdf', accessed: A, note: '令和5年度。在宅での多職種連携と歯科' },
  'dementia-denture-gl': { id: 'dementia-denture-gl', title: '認知症患者の義歯診療ガイドライン 2018', publisher: '日本老年歯科医学会', url: 'https://www.oralstudio.net/storage/society/pdf/guideline05/05_認知症患者の義歯診療ガイドライン2018.pdf', accessed: A, note: '平成30年6月。学会公式サイト外のコピーで確認' },
  'fujita-2017': { id: 'fujita-2017', title: '藤田拓ほか. 訪問歯科診療において新製義歯が使用にいたらなかった要因の検討. 老年歯科医学 32(3):365-372, 2017', publisher: 'J-STAGE（日本老年歯科医学会）', url: 'https://www.jstage.jst.go.jp/article/jsg/32/3/32_365/_article/-char/ja', accessed: A },

  // ---------- 制度・法令 ----------
  'st-law': { id: 'st-law', title: '言語聴覚士法（平成9年法律第132号）', publisher: 'e-Gov法令検索', url: 'https://laws.e-gov.go.jp/law/409AC0000000132', accessed: A, note: '第2条・第42条・第43条・第44条。最終改正 令和4年法律第68号' },
  'jas-what': { id: 'jas-what', title: '言語聴覚士とは', publisher: '一般社団法人日本言語聴覚士協会', url: 'https://www.japanslht.or.jp/what/', accessed: A },
  'kaigo-law': { id: 'kaigo-law', title: '介護保険法（平成9年法律第123号）', publisher: 'e-Gov法令検索', url: 'https://laws.e-gov.go.jp/law/409AC0000000123', accessed: A, note: '第7条第5項 介護支援専門員、第8条第4項 訪問看護' },
  'dh-law': { id: 'dh-law', title: '歯科衛生士法（昭和23年法律第204号）', publisher: 'e-Gov法令検索', url: 'https://laws.e-gov.go.jp/law/323AC0000000204', accessed: A, note: '第2条 業務' },
  'dietitian-law': { id: 'dietitian-law', title: '栄養士法（昭和22年法律第245号）', publisher: 'e-Gov法令検索', url: 'https://laws.e-gov.go.jp/law/322AC0000000245', accessed: A, note: '第1条第2項 管理栄養士' },
  'hokenshi-law': { id: 'hokenshi-law', title: '保健師助産師看護師法（昭和23年法律第203号）', publisher: 'e-Gov法令検索', url: 'https://laws.e-gov.go.jp/law/323AC0000000203', accessed: A, note: '第5条 看護師の定義、第31条 看護師でない者の業務の制限' },

  // ---------- 評価 ----------
  'jsdr-assessment-2019': { id: 'jsdr-assessment-2019', title: '摂食嚥下障害の評価 2019', publisher: '日本摂食嚥下リハビリテーション学会 医療検討委員会', url: 'https://www.jsdr.or.jp/wp-content/uploads/file/doc/assessment2019-announce.pdf', accessed: A, note: 'RSST・MWST・FT・頸部聴診・質問紙・オーラルディアドコキネシス' },
  'jsdr-manuals': { id: 'jsdr-manuals', title: '医療検討委員会作成マニュアル一覧', publisher: '日本摂食嚥下リハビリテーション学会', url: 'https://www.jsdr.or.jp/doc/doc_manual1.html', accessed: A },
  'wakabayashi-eat10-2014': { id: 'wakabayashi-eat10-2014', title: '若林秀隆, 栢下淳. 摂食嚥下障害スクリーニング質問紙票EAT-10の日本語版作成と信頼性・妥当性の検証. 静脈経腸栄養 29(3):871-876, 2014', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jjspen/29/3/29_871/_article/-char/ja', accessed: A },
  'wakabayashi-jssmn-2016': { id: 'wakabayashi-jssmn-2016', title: '若林秀隆. リハビリテーション栄養とサルコペニア. 外科と代謝・栄養 50(1):43-49, 2016', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jssmn/50/1/50_43/_pdf/-char/ja', accessed: A, note: 'EAT-10の各項目5段階（0〜4点）の説明' },
  'ohkuma-2002': { id: 'ohkuma-2002', title: '大熊るりほか. 摂食・嚥下障害スクリーニングのための質問紙の開発. 日摂食嚥下リハ会誌 6(1):3-8, 2002', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jsdr/6/1/6_3/_article/-char/ja', accessed: A, note: '聖隷式嚥下質問紙の原著' },
  'oshuku-2014': { id: 'oshuku-2014', title: '大宿茂. 頸部聴診法. 老年歯科医学 28(4):331-336, 2014', publisher: 'J-STAGE（日本老年歯科医学会）', url: 'https://www.jstage.jst.go.jp/article/jsg/28/4/28_331/_pdf/-char/ja', accessed: A, note: '聴診位置・音の解釈の総説' },
  'takahashi-2005': { id: 'takahashi-2005', title: '高橋浩二. 嚥下障害診断法としての頸部聴診法. 昭和歯学会雑誌 25(3):167-171, 2005', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/dentalmedres1981/25/3/25_167/_article/-char/ja/', accessed: A, note: '書誌のみ確認（本文はスキャン画像）' },
  'lotte-gum-2023': { id: 'lotte-gum-2023', title: 'キシリトール咀嚼チェックガム プレスリリース（2023年2月）', publisher: '株式会社ロッテ', url: 'https://lotte.co.jp/info/news/pdf/20230217095118.pdf', accessed: A, note: '咀嚼チェックガムの仕組み' },
  'tyojyu-assessment': { id: 'tyojyu-assessment', title: '摂食・嚥下障害の評価（菊谷武・戸原雄）', publisher: '公益財団法人長寿科学振興財団', url: 'https://www.tyojyu.or.jp/kankoubutsu/gyoseki/shokuji-eiyo-kokucare/h31-3-1-3.html', accessed: A, note: '2020年' },
  'jsdr-ve-2021': { id: 'jsdr-ve-2021', title: '嚥下内視鏡検査の手順 2021 改訂', publisher: '日本摂食嚥下リハビリテーション学会 医療検討委員会', url: 'https://www.jsdr.or.jp/wp-content/uploads/file/doc/endoscope-revision2021.pdf', accessed: A, note: '日摂食嚥下リハ会誌 25(3):268-280' },
  'jsdr-vf-2026': { id: 'jsdr-vf-2026', title: '嚥下造影検査の手順 2026年度版', publisher: '日本摂食嚥下リハビリテーション学会 医療検討委員会', url: 'https://www.jsdr.or.jp/wp-content/uploads/file/doc/VF30-2-p158-182.pdf', accessed: A, note: '日摂食嚥下リハ会誌 30(2):158-182。姿勢調整・一口量の記載' },
  'hyodo-2010': { id: 'hyodo-2010', title: '兵頭政光ほか. 嚥下内視鏡検査におけるスコア評価基準（試案）の作成とその臨床的意義. 日耳鼻 113(8):670-678, 2010', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jibiinkoka/113/8/113_8_670/_article/-char/ja', accessed: A },
  'kikumura-2020': { id: 'kikumura-2020', title: '喜久村かおりほか. 兵頭スコアを用いた摂食嚥下障害重症度と推奨飲食形態の予測. Jpn J Compr Rehabil Sci 11:109-115, 2020', publisher: 'Japanese Journal of Comprehensive Rehabilitation Science', url: 'https://square.umin.ac.jp/jjcrs/2020_109-115j.pdf', accessed: A },
  'steele-pas-2017': { id: 'steele-pas-2017', title: 'Steele CM, Grace-Martin K. Reflections on Clinical and Statistical Use of the Penetration-Aspiration Scale. Dysphagia. 2017;32:601-616', publisher: 'PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5608795/', accessed: A, note: '英語。PAS 8段階の原文' },

  // ---------- 嚥下調整食 ----------
  'jsdr-class-2021': { id: 'jsdr-class-2021', title: '日本摂食嚥下リハビリテーション学会嚥下調整食分類 2021', publisher: '日本摂食嚥下リハビリテーション学会 嚥下調整食委員会', url: 'https://www.jsdr.or.jp/wp-content/uploads/file/doc/classification2021-manual.pdf', accessed: A, note: '日摂食嚥下リハ会誌 25(2):135-149。食事コード・とろみ3段階' },
  'jsdr-class-2021-page': { id: 'jsdr-class-2021-page', title: '嚥下調整食学会分類2021（公開ページ・Q&A）', publisher: '日本摂食嚥下リハビリテーション学会', url: 'https://www.jsdr.or.jp/doc/classification2021.html', accessed: A },
  'udf': { id: 'udf', title: 'ユニバーサルデザインフードとは（区分表）', publisher: '日本介護食品協議会', url: 'https://www.udf.jp/about_udf/section_01.html', accessed: A },
  'maff-smilecare': { id: 'maff-smilecare', title: 'スマイルケア食', publisher: '農林水産省', url: 'https://www.maff.go.jp/j/shokusan/seizo/kaigo.html', accessed: A },

  // ---------- 高次脳機能・認知症 ----------
  'nohara-2020': { id: 'nohara-2020', title: '野原幹司. 認知症高齢者の摂食嚥下リハビリテーション. 老年歯科医学 34(4):469-472, 2020', publisher: 'J-STAGE（日本老年歯科医学会）', url: 'https://www.jstage.jst.go.jp/article/jsg/34/4/34_469/_pdf', accessed: A, note: '病型別の食行動の特徴' },
  'nohara-2023': { id: 'nohara-2023', title: '野原幹司. 認知症高齢者の嚥下障害. 日本老年医学会雑誌 60(1):1-10, 2023', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/geriatrics/60/1/60_60.1/_article/-char/ja/', accessed: A },
  'edahiro-kaken': { id: 'edahiro-kaken', title: '認知症の摂食嚥下障害の多様性に配慮した経口摂取支援の検討（科研費 16K20709 成果報告書）', publisher: '枝広あや子（東京都健康長寿医療センター研究所）', url: 'https://kaken.nii.ac.jp/file/KAKENHI-PROJECT-16K20709/16K20709seika.pdf', accessed: A, note: '2016-2018年。病型別の食事中断・異食の実態' },
  'kumakura-2012': { id: 'kumakura-2012', title: '熊倉勇美. 高次脳機能障害者と摂食・嚥下障害. 高次脳機能研究 32(1):15-20, 2012', publisher: 'J-STAGE（日本高次脳機能障害学会）', url: 'https://www.jstage.jst.go.jp/article/hbfr/32/1/32_15/_pdf', accessed: A },
  'maeda-2008': { id: 'maeda-2008', title: '前田真治. 半側空間無視. 高次脳機能研究 28(2):214-223, 2008', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/hbfr/28/2/28_2_214/_pdf', accessed: A },
  'yamori-2001': { id: 'yamori-2001', title: '矢守麻奈. 嚥下障害のリハビリテーション―高次脳機能障害合併例について―. 失語症研究 21(3):169-176, 2001', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/apr/21/3/21_3_169/_article/-char/ja/', accessed: A },
  'miyagi-checklist': { id: 'miyagi-checklist', title: '高次脳機能障害チェックリスト（地域支援用）', publisher: '宮城県', url: 'https://www.pref.miyagi.jp/documents/18081/778757.pdf', accessed: A },

  // ---------- 背景疾患・リスク管理 ----------
  'yamada-2014': { id: 'yamada-2014', title: '山田恵理子ほか. 日摂食嚥下リハ会誌 18(2):141-149, 2014', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jsdr/18/2/18_141/_pdf/-char/ja', accessed: A, note: '脳卒中後嚥下障害の頻度' },
  'takeda-2011': { id: 'takeda-2011', title: '武田ほか. 経管栄養で入院した脳卒中患者の嚥下障害の予後について. 脳卒中 33(1):17-24, 2011', publisher: 'J-STAGE（日本脳卒中学会）', url: 'https://www.jstage.jst.go.jp/article/jstroke/33/1/33_1_17/_pdf', accessed: A },
  'fujishima-2013': { id: 'fujishima-2013', title: '藤島一郎. 嚥下障害入門. Jpn J Rehabil Med 50(3):202-211, 2013', publisher: 'J-STAGE（日本リハビリテーション医学会）', url: 'https://www.jstage.jst.go.jp/article/jjrmc/50/3/50_202/_pdf', accessed: A, note: '球麻痺と偽性球麻痺' },
  'kumamoto-bulbar': { id: 'kumamoto-bulbar', title: '仮性球麻痺と球麻痺（比較表）', publisher: '熊本大学病院 嚥下障害診療センター', url: 'https://www2.kuh.kumamoto-u.ac.jp/jibiinkoka/enge/data/mt01/01e/04.pdf', accessed: A, note: '同センターのWebサイト掲載資料（スライド1枚）。障害部位・嚥下反射・高次脳機能・障害の原因の対比' },
  'nozaki-2019': { id: 'nozaki-2019', title: '野﨑園子. パーキンソン病の摂食嚥下障害. Jpn J Rehabil Med 56(3):195-198, 2019', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jjrmc/56/3/56_56.195/_article/-char/ja', accessed: A },
  'yamamoto-2020': { id: 'yamamoto-2020', title: '山本敏之. パーキンソン病の摂食嚥下障害. 神経治療学 37(6):S183, 2020', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jsnt/37/6/37_S183/_pdf/-char/ja', accessed: A },
  'akazawa-2019': { id: 'akazawa-2019', title: '赤澤薫, 柏原健一. 日摂食嚥下リハ会誌 23(1):3-7, 2019', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jsdr/23/1/23_3/_article/-char/ja', accessed: A, note: '誤嚥性肺炎後のパーキンソン病患者の経口再開' },
  'fujishima-sarco-2022': { id: 'fujishima-sarco-2022', title: '藤島一郎, 國枝顕二郎. サルコペニアと摂食嚥下障害―診断と治療―. Jpn J Rehabil Med 59(9):888-896, 2022', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jjrmc/59/9/59_59.888/_pdf', accessed: A, note: '診断フローと舌圧の判定値' },
  'wakabayashi-tmd-2022': { id: 'wakabayashi-tmd-2022', title: '特別講義案内「サルコペニアの摂食嚥下障害」（若林秀隆）', publisher: '東京医科歯科大学', url: 'https://www.tmd.ac.jp/files/user/20220512.pdf', accessed: A, note: '2022年5月' },
  'koyanagi-2024': { id: 'koyanagi-2024', title: '小柳雄一ほか. 肺炎患者における入院時低栄養は、退院時の摂食状況に悪影響を及ぼす. 日摂食嚥下リハ会誌 28(3):161-168, 2024', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jsdr/28/3/28_161/_article/-char/ja', accessed: A },
  'mhlw-drug-354': { id: 'mhlw-drug-354', title: '医薬品・医療機器等安全性情報 No.354（高齢者の医薬品適正使用の指針 総論編の紹介）', publisher: '厚生労働省', url: 'https://www.mhlw.go.jp/content/11120000/000343469.pdf', accessed: A, note: '2018年6月。ベンゾジアゼピン系薬のリスク' },
  'yamaguchi-2010': { id: 'yamaguchi-2010', title: '山口優実ほか. 物性の違いとリクライニング位による嚥下動態の検討. 耳鼻と臨床 56(Suppl.2):S133-S137, 2010', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jibi/56/Suppl.2/56_Suppl.2_S133/_pdf/-char/ja', accessed: A },
  'ota-2002': { id: 'ota-2002', title: '太田喜久夫, 才藤栄一, 松尾浩一郎. 体位効果の組み合わせにおける注意. 日摂食嚥下リハ会誌 6(1):64-67, 2002', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jsdr/6/1/6_64/_article/-char/ja/', accessed: A, note: 'リクライニング位と頸部回旋の併用の注意' },
  'tomita-2002': { id: 'tomita-2002', title: '冨田かをりほか. 高齢者用介助スプーンのボール部形態の検討. 日摂食嚥下リハ会誌 6(2):247-251, 2002', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jsdr/6/2/6_247/_article/-char/ja', accessed: A },
  'tokyo-frail-water': { id: 'tokyo-frail-water', title: 'フレイル予防のためのサポートブック（水分の項）', publisher: '東京都保健医療局', url: 'https://www.hokeniryo.metro.tokyo.lg.jp/documents/d/hokeniryo/5_31', accessed: A },
  'zenhokan-dehydration': { id: 'zenhokan-dehydration', title: '防ごう!! 守ろう!! 高齢者の脱水', publisher: '全国訪問看護事業協会（日本看護協会・日本訪問看護振興財団 協力）', url: 'https://www.zenhokan.or.jp/wp-content/uploads/dehydration.pdf', accessed: A, note: '2010年' },
  'mna-sf': { id: 'mna-sf', title: 'MNA（簡易栄養状態評価表）日本語版 様式', publisher: 'Nestlé Nutrition Institute', url: 'https://www.mna-elderly.com/forms/MNA_japanese.pdf', accessed: A, note: '前半のスクリーニング欄（6項目）がMNA-SFに相当' },
  'mhlw-nutrition-screening': { id: 'mhlw-nutrition-screening', title: '栄養スクリーニング・アセスメント・モニタリング（施設）様式例', publisher: '厚生労働省', url: 'https://www.mhlw.go.jp/content/12404000/21.pdf', accessed: A, note: '低栄養リスク判断（BMI・体重減少率）' },
  'jarm-safety-gl': { id: 'jarm-safety-gl', title: 'リハビリテーション医療における安全管理・推進のためのガイドライン（案）', publisher: '日本リハビリテーション医学会 診療ガイドライン委員会', url: 'https://www.jarm.or.jp/nii/iinkai/sinryo-guide/risk-manage_GL_draft.pdf', accessed: A, note: 'ドラフト版（2005年頃）。正式版は書籍のため未確認' },

  // ---------- 嚥下の生理・加齢 ----------
  'tyojyu-dysphagia': { id: 'tyojyu-dysphagia', title: '摂食・嚥下障害とは（健康長寿ネット）', publisher: '公益財団法人長寿科学振興財団', url: 'https://www.tyojyu.or.jp/net/byouki/sesshokushougai/about.html', accessed: A, note: '5期モデルの定義' },
  'kagaya-2020': { id: 'kagaya-2020', title: '加賀谷斉. 摂食嚥下リハビリテーションの観点から考える飲むと食べるの違い. Jpn J Compr Rehabil Sci 11:49-51, 2020', publisher: 'Japanese Journal of Comprehensive Rehabilitation Science', url: 'https://square.umin.ac.jp/jjcrs/2020_49-51j.pdf', accessed: A, note: '4期モデルとプロセスモデル' },
  'ono-2018': { id: 'ono-2018', title: '小野高裕ほか. 咀嚼・嚥下運動解析システムの開発とその展開. 新潟歯学会誌 48(1):1-15, 2018', publisher: '新潟歯学会', url: 'https://nds.dent.niigata-u.ac.jp/journal/481/481_01a.pdf', accessed: A, note: 'プロセスモデル5段階の定義表' },
  'saigusa-2010': { id: 'saigusa-2010', title: '三枝英人. 舌骨上筋群の解剖. 耳鼻咽喉科展望 53(4):246-253, 2010', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/orltokyo/53/4/53_4_246/_article/-char/ja', accessed: A },
  'ide-2010': { id: 'ide-2010', title: '井出吉信ほか. 摂食・嚥下の運動学. Jpn J Rehabil Med 47(10):683-713, 2010', publisher: 'J-STAGE（日本リハビリテーション医学会）', url: 'https://www.jstage.jst.go.jp/article/jjrmc/47/10/47_10_683/_article/-char/ja', accessed: A, note: '嚥下器官の構造・加齢による喉頭下降' },
  'yoshihara-2008': { id: 'yoshihara-2008', title: '吉原俊雄. 咽頭の臨床解剖. 日耳鼻 111(5):422-425, 2008', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jibiinkoka/111/5/111_5_422/_article/-char/ja', accessed: A },
  'fujitani-2018': { id: 'fujitani-2018', title: '藤谷順子. 高齢者の嚥下障害. Jpn J Rehabil Med 55(3):234-241, 2018', publisher: '医学書院（医書.jp）', url: 'https://webview.isho.jp/journal/detail/abs/10.11477/mf.6002201319', accessed: A, note: '抄録で確認。老嚥の概念' },
  'matsubara-2023': { id: 'matsubara-2023', title: '松原慶吾ほか. 老嚥が疑われる高齢者の特徴. 日摂食嚥下リハ会誌 27(1):53-60, 2023', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jsdr/27/1/27_53/_article/-char/ja', accessed: A },
  'fujitani-2009': { id: 'fujitani-2009', title: '藤谷順子. 不顕性誤嚥 リハビリテーション上の課題. 総合リハ 37(2):99-103, 2009', publisher: '医学書院（医書.jp）', url: 'https://webview.isho.jp/journal/detail/abs/10.11477/mf.1552101437', accessed: A, note: '抄録で確認' },
  'jrs-a12': { id: 'jrs-a12', title: '呼吸器の病気 A-12 誤嚥性肺炎', publisher: '一般社団法人日本呼吸器学会', url: 'https://www.jrs.or.jp/file/disease_a12.pdf', accessed: A, note: '2016年12月。市民向け解説' },
  'maeda-sarco-2024': { id: 'maeda-sarco-2024', title: '前田圭介. サルコペニアの摂食嚥下障害. 日本老年医学会雑誌 61(4):382-392, 2024', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/geriatrics/61/4/61_61.382/_article/-char/ja/', accessed: A },
  'kimura-2018': { id: 'kimura-2018', title: '木村百合香. 高齢者の嚥下障害の要因と対応. 口腔・咽頭科 31(2):165-, 2018', publisher: 'J-STAGE（日本口腔・咽頭科学会）', url: 'https://www.jstage.jst.go.jp/article/stomatopharyngology/31/2/31_165/_article/-char/ja', accessed: A },

  // ---------- 訓練 ----------
  'jsdr-training-2014': { id: 'jsdr-training-2014', title: '訓練法のまとめ（2014版）', publisher: '日本摂食嚥下リハビリテーション学会 医療検討委員会', url: 'https://www.jsdr.or.jp/wp-content/uploads/file/doc/18-1-p55-89.pdf', accessed: A, note: '日摂食嚥下リハ会誌 18(1):55-89, 2014。間接・直接訓練の標準的な記述' },
  'jsdr-assessment-2015': { id: 'jsdr-assessment-2015', title: '摂食嚥下障害の評価【簡易版】2015', publisher: '日本摂食嚥下リハビリテーション学会 医療検討委員会', url: 'https://www.jsdr.or.jp/wp-content/uploads/file/doc/assessment2015-announce.pdf', accessed: A },
  'rishou-posture': { id: 'rishou-posture', title: '姿勢フローチャートの使い方（経口摂取開始の前提条件・直接訓練中断基準）', publisher: '日本離床学会', url: 'https://www.rishou.org/wp-content/uploads/2026/02/swalloing6.pdf', accessed: A, note: '表1の典拠は引用文献。学会公式基準ではない' },
  'tyojyu-consciousness': { id: 'tyojyu-consciousness', title: '意識障害（健康長寿ネット）', publisher: '公益財団法人長寿科学振興財団', url: 'https://www.tyojyu.or.jp/net/byouki/rounensei/ishiki-shogai.html', accessed: A, note: '2019年2月更新。JCSのⅠ〜Ⅲ群と各段階' },
  'shiina-2005': { id: 'shiina-2005', title: '椎名英貴ほか. 直接訓練開始を判断するための臨床的基準の検討. 日摂食嚥下リハ会誌 9(3):272-282, 2005', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jsdr/9/3/9_272/_article/-char/ja', accessed: A },
  'aichi-poster': { id: 'aichi-poster', title: '高齢者の嚥下障害（ポスター）', publisher: '日本耳鼻咽喉科学会愛知県地方部会', url: 'https://www.med.nagoya-u.ac.jp/jibika/wp/wp-content/uploads/2022/02/高齢者の嚥下障害ポスター耳鼻咽喉科月間）.pdf', accessed: A },

  // ---------- 窒息対応 ----------
  'jrc-guideline-2025-info': { id: 'jrc-guideline-2025-info', title: 'JRC蘇生ガイドライン2025 発刊案内', publisher: '日本蘇生協議会', url: 'https://www.jrc-cpr.org/jrc-guideline-2025/', accessed: A, note: '2026年7月13日書籍版発刊。案内のみ確認し、書籍本文は未照合' },
  'jrc-guideline-2020': { id: 'jrc-guideline-2020', title: '救急蘇生法の指針2020（市民用）改訂6版', publisher: '日本救急医療財団心肺蘇生法委員会 監修', url: 'https://www.119.city.hikari.lg.jp/asset/00032/yousiki/keibou/shishin2020_shimin_hp.pdf', accessed: A, note: '光市消防本部サイト掲載版。背部叩打法・腹部突き上げ法' },
  'jma-choking': { id: 'jma-choking', title: '救急蘇生法 気道異物除去の手順', publisher: '公益社団法人日本医師会', url: 'https://www.med.or.jp/99/kido.html', accessed: A },
  'sendai-choking': { id: 'sendai-choking', title: '気道異物の除去【反応がある場合】', publisher: '仙台市消防局', url: 'https://www.city.sendai.jp/kyukyukanri/kurashi/anzen/tobani/joho/ibutsujyokyo1.html', accessed: A },
  'jrcs-mochi': { id: 'jrcs-mochi', title: 'お餅を喉に詰まらせたら？（赤十字NEWS 2025年1月号）', publisher: '日本赤十字社', url: 'https://www.jrc.or.jp/about/publication/news/2025no1016_qz.html', accessed: A },
  'tfd-mochi': { id: 'tfd-mochi', title: '餅などによる窒息事故に注意！', publisher: '東京消防庁', url: 'http://www.tfd.metro.tokyo.lg.jp/lfe/nichijo/mochi.html', accessed: A, note: '令和2〜6年の搬送統計' },
  'caa-choking': { id: 'caa-choking', title: '年末年始、高齢者の事故に注意しましょう!', publisher: '消費者庁', url: 'https://www.caa.go.jp/policies/policy/consumer_safety/caution/caution_084/', accessed: A, note: '人口動態統計（令和6年）の窒息死亡数' },

  // ---------- 構音 ----------
  'jslp-dysarthria-2023': { id: 'jslp-dysarthria-2023', title: '西澤典子ほか（日本音声言語医学会 言語・発達委員会）. Dysarthriaの翻訳名称について. 音声言語医学 64(1):24-32, 2023', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jjlp/64/1/64_24/_article/-char/ja', accessed: A },
  'ota-2024': { id: 'ota-2024', title: '太田祥子ほか. 発語失行と構音障害. 高次脳機能研究 44(2):156-160, 2024', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/hbfr/44/2/44_156/_article/-char/ja', accessed: A },
  'shiina-2019': { id: 'shiina-2019', title: '椎名英貴, 苅安誠. dysarthriaの評価. 音声言語医学 60(4):286-294, 2019', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jjlp/60/4/60_286/_article/-char/ja', accessed: A },
  'ichiba-1988': { id: 'ichiba-1988', title: '市場裕康. 全部床義歯装着者のS発音時の舌の動態に関する研究. 日本補綴歯科学会雑誌 32(4):787-797, 1988', publisher: 'J-STAGE', url: 'https://www.jstage.jst.go.jp/article/jjps1957/32/4/32_4_787/_article/-char/ja', accessed: A, note: '抄録で確認' },
  'kaken-horiuchi': { id: 'kaken-horiuchi', title: '全部床義歯の口蓋形態の違いが発音時の舌動態に及ぼす影響（科研費 07771852）', publisher: 'KAKEN（徳島大学）', url: 'https://kaken.nii.ac.jp/ja/grant/KAKENHI-PROJECT-07771852', accessed: A, note: '1995年' },
  'kaken-kono': { id: 'kaken-kono', title: '咀嚼から嚥下までの機能分析による義歯床形態の定量的評価（科研費 12877312）', publisher: 'KAKEN（新潟大学）', url: 'https://kaken.nii.ac.jp/ja/grant/KAKENHI-PROJECT-12877312', accessed: A, note: '2000-2001年' },
}
