export const result = (answerArr, resultArr) => {
  let totalPoint = 0;
  answerArr.map((item) => {
    const thisResult = resultArr.filter(
      (resItem) => resItem.questionId === item.id
    )[0];
    const answerOption = item?.options;
    const resultOption = thisResult?.options;
    const answerTrueFalse = answerOption.map((item) => item.correct);
    const resultTrueFalse = resultOption.map((item) => {
      if (item?.selected) {
        return item.selected;
      } else {
        return false;
      }
    });
    if (JSON.stringify(answerTrueFalse) === JSON.stringify(resultTrueFalse)) {
      totalPoint = totalPoint + 5;
    }
  });
  return {
    point: totalPoint,
    percentage: Math.round((100 * totalPoint) / (answerArr?.length * 5)),
  };
};
