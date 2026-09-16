import { FieldJournal } from '@/components/field-journal';
import { requestVisitorContext } from '@/lib/request-language';
import { sceneAt, type DayScene } from '@/lib/daylight';
export const dynamic = 'force-dynamic';
export default async function Home({ searchParams }: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { language, timeZone } = await requestVisitorContext();
  const preview = (await searchParams)?.scene;
  const previewScene = process.env.NODE_ENV !== 'production'
    && typeof preview === 'string'
    && ['dawn', 'day', 'sunset', 'night'].includes(preview)
    ? preview as DayScene : undefined;
  return <FieldJournal
    initialLanguage={language}
    timeZone={timeZone}
    initialScene={previewScene ?? (timeZone ? sceneAt(new Date(), timeZone) : 'day')}
    previewScene={previewScene}
  />;
}
