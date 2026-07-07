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
    const { question, userAnswer, hint } = await request.json();

    const prompt = `あなたはExcel学習アプリの採点アシスタントです。以下のお題に対するユーザーの回答（Excelの数式や操作の説明）を採点してください。

お題: ${question}
模範解答の例（参考程度、表記ゆれは許容）: ${hint}
ユーザーの回答: ${userAnswer}

以下の形式で日本語、150文字程度で簡潔に答えてください。
1行目: 「正解」または「要修正」のどちらか
2行目以降: 理由と改善点を簡潔に`;

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
