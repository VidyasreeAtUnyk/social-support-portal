'use client';

import AIHelper from '@components/ai/AiHelper';
import { FIELD_PROMPTS, FieldKey } from '@lib/ai/aiConfig';

export default function Home() {
  // List of all fields you want AI support for
  const fields: FieldKey[] = ['financialSituation', 'employmentCircumstances', 'reasonForApplying'];

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-2xl">
        <div className="flex flex-col gap-8 w-full bg-gray-100 p-8 rounded-lg shadow">
          <h1 className="text-4xl font-bold text-blue-600">AI Writing Assistant 🎯</h1>
          <p className="text-gray-700">
            Use AI to help generate content for your application fields.
          </p>

          {fields.map((fieldKey) => (
            <div key={fieldKey} className="border-t border-gray-300 pt-4">
              <h2 className="font-semibold text-lg">{FIELD_PROMPTS[fieldKey]}</h2>
              <AIHelper fieldKey={fieldKey} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
