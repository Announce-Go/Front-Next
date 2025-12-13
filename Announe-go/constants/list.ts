
export const agencyList = [
  {
    id: 1,
    company: "A",
    name: "리움한방병원 종로점",
    keyword: 2
  },
  {
    id: 2,
    company: "B",
    name: "리움한방병원 강남점",
    keyword: 3
  },
  {
    id: 3,
    company: "C",
    name: "리움한방병원 신촌점",
    keyword: 1
  },
]

export const keywordList = {
  A: [
    {
      id: 1,
      keyword: "문정역 한의원",
      url: "https://map.naver.com/p/search/%EB%AC%B8%EC%A0%95%EC%97%AD%20%ED%95%9C%EC%9D%98%EC%9B%90/place/895265553?placePath=%3Fentry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue&placeSearchOption=entry%3Dpll%26fromNxList%3Dtrue&searchType=place"
    },
    {
      id: 2,
      keyword: "문정역 다이어트",
      url: "https://map.naver.com/p/search/%EB%AC%B8%EC%A0%95%EC%97%AD%20%EB%8B%A4%EC%9D%B4%EC%96%B4%ED%8A%B8/place/895265553?placePath=/home?entry=pll&from=nx&fromNxList=true&from=map&fromPanelNum=2&timestamp=202512121558&locale=ko&svcName=map_pcv5&searchText=%EB%AC%B8%EC%A0%95%EC%97%AD%20%EB%8B%A4%EC%9D%B4%EC%96%B4%ED%8A%B8&placeSearchOption=entry%3Dpll%26fromNxList%3Dtrue%26x%3D127.124215%26y%3D37.490096&searchType=place"
    },
    {
      id: 3,
      keyword: "문정역 한방병원",
      url: "https://map.naver.com/p/search/%EB%AC%B8%EC%A0%95%EC%97%AD%20%ED%95%9C%EB%B0%A9%EB%B3%91%EC%9B%90/place/12065433?placePath=%3Fentry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue&placeSearchOption=entry%3Dpll%26fromNxList%3Dtrue&searchType=place"
    },
  ],
  B: [
    {
      id: 1,
      keyword: "청주 다이어트",
      url: "https://map.naver.com/p/search/%EC%B2%AD%EC%A3%BC%20%EB%8B%A4%EC%9D%B4%EC%96%B4%ED%8A%B8/place/1408225440?placePath=%3Fentry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue&placeSearchOption=entry%3Dpll%26fromNxList%3Dtrue%26x%3D127.124215%26y%3D37.490096&searchType=place"
    },
    {
      id: 2,
      keyword: "청주 한약다이어트",
      url: "https://map.naver.com/p/search/%EC%B2%AD%EC%A3%BC%20%ED%95%9C%EC%95%BD%EB%8B%A4%EC%9D%B4%EC%96%B4%ED%8A%B8/place/1756237659?placePath=%3Fentry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue&placeSearchOption=entry%3Dpll%26fromNxList%3Dtrue%26x%3D127.124215%26y%3D37.490096&searchType=place"
    },
    {
      id: 3,
      keyword: "청주 한방병원",
      url: "https://map.naver.com/p/search/%EC%B2%AD%EC%A3%BC%20%ED%95%9C%EB%B0%A9%EB%B3%91%EC%9B%90/place/1675279192?placePath=%3Fentry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue&placeSearchOption=entry%3Dpll%26fromNxList%3Dtrue&searchType=place"
    },
  ],
  C: [
    {
      
    }
  ]
}


export const keywordDetailList = {
  A: {
    "1": {
      keyword: "문정역 한의원",
      dates: ["2025-12-09", "2025-12-10", "2025-12-11"],
      rows: [
        {
          round: 1,
          keyword: "문정역 한의원",
          count: 25,
          ranksByDate: {
            "2025-12-09": 1,
            "2025-12-10": 2,
            "2025-12-11": 3,
          },
        },
      ],
    },
    "2": {
      keyword: "문정역 다이어트",
      dates: ["2025-12-09", "2025-12-10", "2025-12-11"],
      rows: [
        {
          round: 1,
          keyword: "문정역 다이어트",
          count: 25,
          ranksByDate: {
            "2025-12-09": 3,
            "2025-12-10": 2,
            "2025-12-11": 3,
          },
        },
      ],
    },
    "3": {
      keyword: "문정역 한방병원",
      dates: ["2025-12-09", "2025-12-10", "2025-12-11"],
      rows: [
        {
          round: 1,
          keyword: "문정역 한방병원",
          count: 25,
          ranksByDate: {
            "2025-12-09": 5,
            "2025-12-10": 2,
            "2025-12-11": 3,
          },
        },
      ],
    },
  },
  B: {
    "1": {
      keyword: "청주 다이어트",
      dates: ["2025-12-09", "2025-12-10", "2025-12-11"],
      rows: [
        {
          round: 1,
          keyword: "청주 다이어트",
          count: 25,
          ranksByDate: {
            "2025-12-09": 1,
            "2025-12-10": 2,
            "2025-12-11": 3,
          },
        },
      ],
    }
  },
  C: {
    "1": {
      keyword: "신촌 한의원",
      dates: ["2025-12-09", "2025-12-10", "2025-12-11"],
      rows: [
        {
          round: 1,
          keyword: "신촌 한의원",
          count: 25,
          ranksByDate: {
            "2025-12-09": 1,
            "2025-12-10": 2,
            "2025-12-11": 3,
          },
        },
      ],
    }
  }
}