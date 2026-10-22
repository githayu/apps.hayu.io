import charSetsAr from './charsets/ar.json'
import charSetsBn from './charsets/bn.json'
import charSetsDe from './charsets/de.json'
import charSetsEn from './charsets/en.json'
import charSetsEs from './charsets/es.json'
import charSetsFa from './charsets/fa.json'
import charSetsFr from './charsets/fr.json'
import charSetsHi from './charsets/hi.json'
import charSetsId from './charsets/id.json'
import charSetsIt from './charsets/it.json'
import charSetsJa from './charsets/ja.json'
import charSetsKo from './charsets/ko.json'
import charSetsNl from './charsets/nl.json'
import charSetsPl from './charsets/pl.json'
import charSetsPt from './charsets/pt.json'
import charSetsRu from './charsets/ru.json'
import charSetsTh from './charsets/th.json'
import charSetsTr from './charsets/tr.json'
import charSetsUk from './charsets/uk.json'
import charSetsUr from './charsets/ur.json'
import charSetsVi from './charsets/vi.json'
import charSetsZh from './charsets/zh.json'
import charSetsZhHant from './charsets/zh-Hant.json'
import type { Locale } from 'next-intl'

export type Block = {
  from: number
  to: number
}

/** 言語ごとの汎用文字セット */
export type CharSet = {
  /** 文字列として列挙する文字 */
  chars?: string
  /** 初期状態で選択するか */
  default?: boolean
  id: string
  label: string
  /** 文字コードの範囲 (from, to とも含む) */
  ranges?: Block[]
}

export const charSets: Record<Locale, CharSet[]> = {
  ar: charSetsAr.sets,
  bn: charSetsBn.sets,
  de: charSetsDe.sets,
  en: charSetsEn.sets,
  es: charSetsEs.sets,
  fa: charSetsFa.sets,
  fr: charSetsFr.sets,
  hi: charSetsHi.sets,
  id: charSetsId.sets,
  it: charSetsIt.sets,
  ja: charSetsJa.sets,
  ko: charSetsKo.sets,
  nl: charSetsNl.sets,
  pl: charSetsPl.sets,
  pt: charSetsPt.sets,
  ru: charSetsRu.sets,
  th: charSetsTh.sets,
  tr: charSetsTr.sets,
  uk: charSetsUk.sets,
  ur: charSetsUr.sets,
  vi: charSetsVi.sets,
  zh: charSetsZh.sets,
  'zh-Hant': charSetsZhHant.sets,
}

/**
 * ブロックを一意に識別するキー
 * MARK: blockKey
 */
export const blockKey = (block: Block) => `${block.from}-${block.to}`

/**
 * Unicode Blocks
 * ブロック名は messages/{locale}.json の UnicodeBlocks に `${from}-${to}` をキーとして持つ
 *
 * Wikipadia コードブロック抽出プログラム
 * @see {@link https://ja.wikipedia.org/wiki/%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF_(Unicode)}
 *
 * ```js
 * JSON.stringify(
 *   [...$0.querySelectorAll("tr")].map(tr => {
 *     const range = tr.querySelector('td[data-sort-value^="A&"]')
 *
 *     if (!range) return
 *
 *     const name = range.nextElementSibling.firstElementChild.innerText
 *     const [from, to] = range.innerText.split("..")
 *
 *     return {
 *       name,
 *       from: parseInt(from.replace("U+", "0x")),
 *       to: parseInt(to.replace("U+", "0x")),
 *     }
 *   })
 * )
 * ```
 */
export const unicodeBlocks: Block[] = [
  { from: 0, to: 127 },
  { from: 128, to: 255 },
  { from: 256, to: 383 },
  { from: 384, to: 591 },
  { from: 592, to: 687 },
  { from: 688, to: 767 },
  { from: 768, to: 879 },
  { from: 880, to: 1023 },
  { from: 1024, to: 1279 },
  { from: 1280, to: 1327 },
  { from: 1328, to: 1423 },
  { from: 1424, to: 1535 },
  { from: 1536, to: 1791 },
  { from: 1792, to: 1871 },
  { from: 1872, to: 1919 },
  { from: 1920, to: 1983 },
  { from: 1984, to: 2047 },
  { from: 2048, to: 2111 },
  { from: 2112, to: 2143 },
  { from: 2144, to: 2159 },
  { from: 2208, to: 2303 },
  { from: 2304, to: 2431 },
  { from: 2432, to: 2559 },
  { from: 2560, to: 2687 },
  { from: 2688, to: 2815 },
  { from: 2816, to: 2943 },
  { from: 2944, to: 3071 },
  { from: 3072, to: 3199 },
  { from: 3200, to: 3327 },
  { from: 3328, to: 3455 },
  { from: 3456, to: 3583 },
  { from: 3584, to: 3711 },
  { from: 3712, to: 3839 },
  { from: 3840, to: 4095 },
  { from: 4096, to: 4255 },
  { from: 4256, to: 4351 },
  { from: 4352, to: 4607 },
  { from: 4608, to: 4991 },
  { from: 4992, to: 5023 },
  { from: 5024, to: 5119 },
  { from: 5120, to: 5759 },
  { from: 5760, to: 5791 },
  { from: 5792, to: 5887 },
  { from: 5888, to: 5919 },
  { from: 5920, to: 5951 },
  { from: 5952, to: 5983 },
  { from: 5984, to: 6015 },
  { from: 6016, to: 6143 },
  { from: 6144, to: 6319 },
  { from: 6320, to: 6399 },
  { from: 6400, to: 6479 },
  { from: 6480, to: 6527 },
  { from: 6528, to: 6623 },
  { from: 6624, to: 6655 },
  { from: 6656, to: 6687 },
  { from: 6688, to: 6831 },
  { from: 6832, to: 6911 },
  { from: 6912, to: 7039 },
  { from: 7040, to: 7103 },
  { from: 7104, to: 7167 },
  { from: 7168, to: 7247 },
  { from: 7248, to: 7295 },
  { from: 7296, to: 7311 },
  { from: 7360, to: 7375 },
  { from: 7376, to: 7423 },
  { from: 7424, to: 7551 },
  { from: 7552, to: 7615 },
  { from: 7616, to: 7679 },
  { from: 7680, to: 7935 },
  { from: 7936, to: 8191 },
  { from: 8192, to: 8303 },
  { from: 8304, to: 8351 },
  { from: 8352, to: 8399 },
  { from: 8400, to: 8447 },
  { from: 8448, to: 8527 },
  { from: 8528, to: 8591 },
  { from: 8592, to: 8703 },
  { from: 8704, to: 8959 },
  { from: 8960, to: 9215 },
  { from: 9216, to: 9279 },
  { from: 9280, to: 9311 },
  { from: 9312, to: 9471 },
  { from: 9472, to: 9599 },
  { from: 9600, to: 9631 },
  { from: 9632, to: 9727 },
  { from: 9728, to: 9983 },
  { from: 9984, to: 10175 },
  { from: 10176, to: 10223 },
  { from: 10224, to: 10239 },
  { from: 10240, to: 10495 },
  { from: 10496, to: 10623 },
  { from: 10624, to: 10751 },
  { from: 10752, to: 11007 },
  { from: 11008, to: 11263 },
  { from: 11264, to: 11359 },
  { from: 11360, to: 11391 },
  { from: 11392, to: 11519 },
  { from: 11520, to: 11567 },
  { from: 11568, to: 11647 },
  { from: 11648, to: 11743 },
  { from: 11744, to: 11775 },
  { from: 11776, to: 11903 },
  { from: 11904, to: 12031 },
  { from: 12032, to: 12255 },
  { from: 12272, to: 12287 },
  { from: 12288, to: 12351 },
  { from: 12352, to: 12447 },
  { from: 12448, to: 12543 },
  { from: 12544, to: 12591 },
  { from: 12592, to: 12687 },
  { from: 12688, to: 12703 },
  { from: 12704, to: 12735 },
  { from: 12736, to: 12783 },
  { from: 12784, to: 12799 },
  { from: 12800, to: 13055 },
  { from: 13056, to: 13311 },
  { from: 13312, to: 19903 },
  { from: 19904, to: 19967 },
  { from: 19968, to: 40959 },
  { from: 40960, to: 42127 },
  { from: 42128, to: 42191 },
  { from: 42192, to: 42239 },
  { from: 42240, to: 42559 },
  { from: 42560, to: 42655 },
  { from: 42656, to: 42751 },
  { from: 42752, to: 42783 },
  { from: 42784, to: 43007 },
  { from: 43008, to: 43055 },
  { from: 43056, to: 43071 },
  { from: 43072, to: 43135 },
  { from: 43136, to: 43231 },
  { from: 43232, to: 43263 },
  { from: 43264, to: 43311 },
  { from: 43312, to: 43359 },
  { from: 43360, to: 43391 },
  { from: 43392, to: 43487 },
  { from: 43488, to: 43519 },
  { from: 43520, to: 43615 },
  { from: 43616, to: 43647 },
  { from: 43648, to: 43743 },
  { from: 43744, to: 43775 },
  { from: 43776, to: 43823 },
  { from: 43824, to: 43887 },
  { from: 43888, to: 43967 },
  { from: 43968, to: 44031 },
  { from: 44032, to: 55215 },
  { from: 55216, to: 55295 },
  { from: 55296, to: 56191 },
  { from: 56192, to: 56319 },
  { from: 56320, to: 57343 },
  { from: 57344, to: 63743 },
  { from: 63744, to: 64255 },
  { from: 64256, to: 64335 },
  { from: 64336, to: 65023 },
  { from: 65024, to: 65039 },
  { from: 65040, to: 65055 },
  { from: 65056, to: 65071 },
  { from: 65072, to: 65103 },
  { from: 65104, to: 65135 },
  { from: 65136, to: 65279 },
  { from: 65280, to: 65519 },
  { from: 65520, to: 65535 },
  { from: 65536, to: 65663 },
  { from: 65664, to: 65791 },
  { from: 65792, to: 65855 },
  { from: 65856, to: 65935 },
  { from: 65936, to: 65999 },
  { from: 66000, to: 66047 },
  { from: 66176, to: 66207 },
  { from: 66208, to: 66271 },
  { from: 66272, to: 66303 },
  { from: 66304, to: 66351 },
  { from: 66352, to: 66383 },
  { from: 66384, to: 66431 },
  { from: 66432, to: 66463 },
  { from: 66464, to: 66527 },
  { from: 66560, to: 66639 },
  { from: 66640, to: 66687 },
  { from: 66688, to: 66735 },
  { from: 66736, to: 66815 },
  { from: 66816, to: 66863 },
  { from: 66864, to: 66927 },
  { from: 67072, to: 67455 },
  { from: 67584, to: 67647 },
  { from: 67648, to: 67679 },
  { from: 67680, to: 67711 },
  { from: 67712, to: 67759 },
  { from: 67808, to: 67839 },
  { from: 67840, to: 67871 },
  { from: 67872, to: 67903 },
  { from: 67968, to: 67999 },
  { from: 68000, to: 68095 },
  { from: 68096, to: 68191 },
  { from: 68192, to: 68223 },
  { from: 68224, to: 68255 },
  { from: 68288, to: 68351 },
  { from: 68352, to: 68415 },
  { from: 68416, to: 68447 },
  { from: 68448, to: 68479 },
  { from: 68480, to: 68527 },
  { from: 68608, to: 68687 },
  { from: 68736, to: 68863 },
  { from: 69216, to: 69247 },
  { from: 69632, to: 69759 },
  { from: 69760, to: 69839 },
  { from: 69840, to: 69887 },
  { from: 69888, to: 69967 },
  { from: 69968, to: 70015 },
  { from: 70016, to: 70111 },
  { from: 70112, to: 70143 },
  { from: 70144, to: 70223 },
  { from: 70272, to: 70319 },
  { from: 70320, to: 70399 },
  { from: 70400, to: 70527 },
  { from: 70656, to: 70783 },
  { from: 70784, to: 70879 },
  { from: 71040, to: 71167 },
  { from: 71168, to: 71263 },
  { from: 71264, to: 71295 },
  { from: 71296, to: 71375 },
  { from: 71424, to: 71487 },
  { from: 71840, to: 71935 },
  { from: 72192, to: 72271 },
  { from: 72272, to: 72367 },
  { from: 72384, to: 72447 },
  { from: 72704, to: 72815 },
  { from: 72816, to: 72895 },
  { from: 72960, to: 73055 },
  { from: 73728, to: 74751 },
  { from: 74752, to: 74879 },
  { from: 74880, to: 75087 },
  { from: 77824, to: 78895 },
  { from: 82944, to: 83583 },
  { from: 92160, to: 92735 },
  { from: 92736, to: 92783 },
  { from: 92880, to: 92927 },
  { from: 92928, to: 93071 },
  { from: 93952, to: 94111 },
  { from: 94176, to: 94207 },
  { from: 94208, to: 100351 },
  { from: 100352, to: 101119 },
  { from: 110592, to: 110847 },
  { from: 110848, to: 110895 },
  { from: 110960, to: 111359 },
  { from: 113664, to: 113823 },
  { from: 113824, to: 113839 },
  { from: 118784, to: 119039 },
  { from: 119040, to: 119295 },
  { from: 119296, to: 119375 },
  { from: 119552, to: 119647 },
  { from: 119648, to: 119679 },
  { from: 119808, to: 120831 },
  { from: 120832, to: 121519 },
  { from: 122880, to: 122927 },
  { from: 124928, to: 125151 },
  { from: 125184, to: 125279 },
  { from: 126464, to: 126719 },
  { from: 126976, to: 127023 },
  { from: 127024, to: 127135 },
  { from: 127136, to: 127231 },
  { from: 127232, to: 127487 },
  { from: 127488, to: 127743 },
  { from: 127744, to: 128511 },
  { from: 128512, to: 128591 },
  { from: 128592, to: 128639 },
  { from: 128640, to: 128767 },
  { from: 128768, to: 128895 },
  { from: 128896, to: 129023 },
  { from: 129024, to: 129279 },
  { from: 129280, to: 129535 },
  { from: 131072, to: 173791 },
  { from: 173824, to: 177983 },
  { from: 177984, to: 178207 },
  { from: 178208, to: 183983 },
  { from: 183984, to: 191471 },
  { from: 194560, to: 195103 },
  { from: 917504, to: 917631 },
  { from: 917760, to: 917999 },
  { from: 983040, to: 1048575 },
  { from: 1048576, to: 1114111 },
]
