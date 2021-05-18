const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry); // cumulative, layout, shift 광고, 레이아웃 등 (잘못된 클릭을 유도하지 않도록)
      getFID(onPerfEntry); // first input delay 웹페이지 반응성 (이벤트 발생 시 실행 속도)
      getFCP(onPerfEntry); // first contentful paint 브라우저가 화면에 그려지기 시작할 때까지의 시간
      getLCP(onPerfEntry); // largest contentful paint 도큐먼트 중 젤 큰 덩어리를 로딩되는 시간 (<h1> > <div>)
      getTTFB(onPerfEntry); // time to first byte 첫번째 바이트를 가져오는 시간 ()
    });
  }
};

export default reportWebVitals;
