const valueInput = document.querySelectorAll('.value-input input');
const rangeInput = document.querySelectorAll('.slider-range input');
const progress = document.querySelector('.progress');
const valueGap = 1000;

// 최소,최대값 인풋에 이벤트리스너 붙이기
valueInput.forEach(input => {
  input.addEventListener('input', e => {
    const minValue = parseInt(valueInput[0].value); // 입력된 최소인풋의 값
    const maxValue = parseInt(valueInput[1].value); // 입력된 최대인풋의 값

    // 최대값이 최소값 + valueGap보다 크고 && 최대값이 우측 레인지슬라이더 최대값(max)보다 작을 때
    if ((maxValue >= minValue + valueGap) && maxValue <= rangeInput[1].max) {
      if (e.target.className === "value-min") {
        rangeInput[0].value = minValue; //레인지 슬라이더 최소값을 입력값과 동기화
        progress.style.left = (minValue / rangeInput[0].max) * 100 + "%";
        return;
      }

      // className이 "value-max"일 때
      rangeInput[1].value = maxValue; //레인지 슬라이더 최대값을 입력값과 동기화
      progress.style.right = 100 - (maxValue / rangeInput[1].max) * 100 + "%";
    }
  })
})

// 레인지슬라이더에 이벤트리스너 붙이기
rangeInput.forEach(input => {
  input.addEventListener('input', e => {
    const minValue = parseInt(rangeInput[0].value); // 입력된 최소슬라이더의 값
    const maxValue = parseInt(rangeInput[1].value); // 입력된 최대슬라이더의 값

    // 최대슬라이더의 값과 최소슬라이더의 값이 valueGap 이하로 차이날 때
    if ((maxValue - minValue < valueGap)) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxValue - valueGap;  // 최소값이 최대값과 valueGap만큼 차이나도록 조정
        return;
      }

      // className이 "range-max"일 때
      rangeInput[1].value = minValue + valueGap;    // 최대값이 최소값과 valueGap만큼 차이나도록 조정
      return;
    }

    // 최대슬라이더의 값과 최소슬라이더의 값이 valueGap 이상으로 차이날 때
    valueInput[0].value = minValue; // 최소인풋의 값을 최소슬라이더의 값과 동기화
    valueInput[1].value = maxValue; // 최대인풋의 값을 최대슬라이더의 값과 동기화
    progress.style.left = (minValue / rangeInput[0].max) * 100 + "%";
    progress.style.right = 100 - (maxValue / rangeInput[1].max) * 100 + "%";
  })
});