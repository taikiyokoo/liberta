// createdAt を受け取り、整形された文字列を返す関数
export const formatDate= (createdAt: string): string => {
    // Date オブジェクトを作成
    const date = new Date(createdAt);
  
    // Intl.DateTimeFormat を使ってローカライズされた日付を表示
    const formattedDate = new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  
    return formattedDate;
  }
  