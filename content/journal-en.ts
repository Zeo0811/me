import type { FishRecord } from './journal';
// Checked 2026-09-16 against FishBase / NCBI. See docs/fish-name-verification.md.
// Scientific names are used where no sufficiently supported English common name was found.
export const englishFishNames: Record<string, string> = {
  char: 'Whitespotted char',
  schizothorax: 'Schizothorax davidi',
  prenanti: 'Schizothorax prenanti',
  barbel: 'Spinibarbus sinensis',
  gudgeon: 'Round snout',
  whitearmor: 'Onychostoma simum',
  mandarin: 'Leopard mandarin fish',
  lenok: 'Lenok',
  grayling: 'Arctic grayling',
  redeye: 'Barbel chub',
  gt: 'Giant trevally',
  ayu: 'Ayu sweetfish',
  bamboo: 'Spinibarbus denticulatus',
};
const translations: Record<
  string,
  Pick<FishRecord, 'caption' | 'locationBasis'>
> = {
  redeye: {
    caption: 'An encounter in Chongqing.',
    locationBasis: 'Species, unlock date August 15, 2026, and Chongqing location confirmed by Zeo. Photos ordered IMG_5103, IMG_5082, IMG_5073.',
  },
  char: {
    caption: 'A whitespotted char in the stream.',
    locationBasis:
      'Photo supplied and identified by Zeo as IMG_0855.HEIC. Zeo confirmed the unlock location as Western Sichuan. The date still follows the Xiaohongshu note, not the new photograph.',
  },
  schizothorax: {
    caption:
      'Moving along the river: deep pools, white water, and the softer seams behind stones.',
    locationBasis:
      'Photo supplied and identified by Zeo as IMG_0967.HEIC. Date and region still follow the note; the new photograph’s date and city await confirmation.',
  },
  prenanti: {
    caption:
      'An encounter in the stream.',
    locationBasis: 'Photo supplied and identified by Zeo as IMG_0983.HEIC. Zeo confirmed the date and location match the Schizothorax davidi record, using its current note date and region: December 5, 2025 / Western Sichuan.',
  },
  barbel: {
    caption: 'Euro nymphing in Sichuan. An encounter with Spinibarbus sinensis.',
    locationBasis:
      'The post shows only month and day; the region comes from its title. The third photo, IMG_3845.HEIC, was supplied and identified by Zeo; its date and location are not inferred from the note.',
  },
  gudgeon: {
    caption: 'A round snout from my Sichuan fly fishing notes.',
    locationBasis:
      'The post shows only month and day; the region comes from its title. Photo match awaits my review.',
  },
  whitearmor: {
    caption: 'Already encountered. Next time, a bigger one.',
    locationBasis:
      'Both photographs were supplied and identified by Zeo, ordered IMG_3829 then IMG_3827. Date and region still follow the Xiaohongshu note, not the new photographs.',
  },
  mandarin: {
    caption: 'An unexpected encounter, worth a page of its own.',
    locationBasis:
      'The post shows only month and day; the region comes from its title.',
  },
  lenok: {
    caption: 'Done! Another one on the list.',
    locationBasis:
      'Provisionally dated from “4 days ago · Heilongjiang”, read on September 16, 2026. Photo match awaits my review. Photograph by 包哥爱玩野路子.',
  },
  grayling: {
    caption:
      'An Arctic grayling in the stream.',
    locationBasis: 'Photo supplied by Zeo as IMG_5345.HEIC. Zeo confirmed the unlock date and location match the lenok record: September 12, 2026 / Heilongjiang. That date was originally provisionally derived from the Xiaohongshu post.',
  },
};
export function englishRecord(fish: FishRecord): FishRecord {
  return {
    ...fish,
    ...translations[fish.id],
    name: englishFishNames[fish.id] ?? fish.name,
    place:
      (
        {
          重庆: 'Chongqing',
          四川: 'Sichuan',
          川西: 'Western Sichuan',
          黑龙江: 'Heilongjiang',
        } as Record<string, string>
      )[fish.place] || fish.place,
  };
}
