function createDate(): string {
  const today = new Date(); // 현재 날짜
  const year = today.toLocaleDateString('en-US', {
    year: 'numeric',
  });
  const month = today.toLocaleDateString('en-US', {
    month: '2-digit',
  });
  const day = today.toLocaleDateString('en-US', {
    day: '2-digit',
  });

  return `${year}.${month}.${day}`;
}

export default createDate;
