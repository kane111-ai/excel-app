const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

export async function POST(request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { result: 'GEMINI_API_KEYが設定されていません。.env.localまたはVercelの環境変数を確認してください。' },
      { status: 200 }
    );
  }

  try {
    const { topic, prompt: exPrompt, formulaHint } = await request.json();

    const prompt = `あなたは財務分析を教えるアシスタントです。以下の演習について、指標の意味・計算の考え方・実務での使われ方を、日本語で200〜300文字程度でわかりやすく解説してください。数式そのものよりも「なぜその指標を見るのか」を重視してください。

演習タイトル: ${topic}
問題文: ${exPrompt}
計算のヒント: ${formulaHint}`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      return Response.json({ result: `Gemini APIエラー: ${errText}` }, { status: 200 });
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '応答を取得できませんでした。';
    return Response.json({ result: text });
  } catch (e) {
    return Response.json({ result: `エラーが発生しました: ${e.message}` }, { status: 200 });
  }
}
