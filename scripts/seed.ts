import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log("🌱 Seeding database...");

  // ============================================
  // MEMBERS
  // ============================================

  // Professor
  const { data: professor } = await supabase
    .from("members")
    .insert({
      name: "장원석",
      name_en: "Wonseuk Jang",
      role: "professor",
      photo_url: "/images/JangWonSuk.jpg",
      bio: "교수/공학박사",
      research_interests: [
        "Medical Device Usability Engineering",
        "Medical Device UX/UI Design and Evaluation",
        "Medical Image Diagnostic System",
        "Bio-Signal Processing and Diagnostic Algorithm",
        "Medical Device Industry Policy",
      ],
      email: "WS.JANG@yuhs.ac",
      education: [
        "2007 ~ 2010 : 연세대학교 대학원 생체공학협동과정 공학박사",
        "1995 ~ 1997 : 연세대학교 대학원 의용전자공학과 공학석사",
        "1991 ~ 1995 : 연세대학교 보건과학대학 의용전자공학과 공학사",
      ],
      display_order: 0,
      is_active: true,
    })
    .select()
    .single();

  if (professor) {
    // Professor details sections
    await supabase.from("professor_details").insert([
      {
        member_id: professor.id,
        section_type: "주요 경력",
        items: [
          "2020. 3 ~ 현재 : 연세대학교 의과대학 대학원 융합의학과(디지털헬스케어전공) 교수",
          "2018. 3 ~ 현재 : 연세대학교 의과대학 대학원 의료기기산업학과 교수",
          "2014. 9 ~ 2018. 2 : 연세대학교 의과대학 의학공학교실 연구조교수",
          "2012. 12 ~ 2014. 8 : 연세대학교 보건과학대학 방사선학과 조교수",
          "2012. 7 ~ 2012. 11 : 삼성메디슨㈜ 수석연구원",
          "2004. 8 ~ 2011. 4 : 지멘스㈜ SIEMENS Medical R&D Center, 수석연구원",
          "2002. 5 ~ 2004. 7 : 한국보건산업진흥원 의료기기팀, 연구원",
          "1997. 7 ~ 2002. 5 : ㈜바이오시스 연구소 S/W팀, 전임연구원",
        ],
        display_order: 0,
      },
      {
        member_id: professor.id,
        section_type: "기타 사항",
        items: [
          "2021.9 ~ 현재 : 강남세브란스병원 의료기기사용적합성 연구센터 소장",
          "2021.7 ~ 현재 : 소비자정책위원회, 국무총리실, 전문위원(식의약품분야)",
          "2021.7 ~ 현재 : 의료기기위원회, 식품의약품안전처, 전문위원",
          "2021.5 ~ 현재 : 보건산업 기술가치 평가 심의위원, 한국보건산업진흥원",
          "2021.1 ~ 현재 : 대한에프디씨규제과학회 학술위원",
          "2021.1 ~ 현재 : 대한의용생체공학회 학술이사",
          "2020.11 ~ 현재 : R&D 샌드박스 운영위원회, 산업통상자원부",
          "2020.4 ~ 현재 : 의료기기 기술문서심사기관 심의위원회, 식품의약품안전처",
          "2017. 7 ~ 2017.10 : 산업계관점대학평가(의료기기분야) 요구분석, 대학교육협의회, 전문위원",
          "2016. 6 ~ 2017. 5 : 의료기기광고사전심의위원회, 전문위원",
          "2016. 3 ~ 현재 : 의료기기 이상사례 심위위원회, 위원",
          "2013. 5 ~ 현재 : 의료기기위원회, 식품의약품안전처, 전문위원",
        ],
        display_order: 1,
      },
      {
        member_id: professor.id,
        section_type: "수상 경력",
        items: [
          '2021 의료기기산업특성화대학원 유공자 포상 "한국보건산업진흥원 표창장", 보건복지부, 2021.09.14',
          '2010 대한민국기술대상 산업진흥유공분야"지식경제부장관상", 지식경제부, 2010.12.09',
        ],
        display_order: 2,
      },
      {
        member_id: professor.id,
        section_type: "저역서",
        items: [
          "디지털헬스케어를 위한 웨어러블기술 (2021.7)",
          "디지털헬스케어 시스템설계학 (2021. 4)",
          "의료영상처리 이해 및 응용 (2020. 7)",
          "알기쉬운 의료기기 임상총론 (2019. 12)",
          "의료기기 설계학 제4판 (2018. 11)",
          "의료기기품질경영시스템 : MDSAP: 의료기기 단일 심사 프로그램 (2018. 10)",
        ],
        display_order: 3,
      },
      {
        member_id: professor.id,
        section_type: "지식재산권",
        items: [
          "배터리 소모 감소 기능이 구비된 산모 자궁수축도 검사장치 (2020. 12)",
          "산모 자궁수축도 검사장치 (2020. 12)",
          "모바일 기반 방광 모니터링을 위한 패치형 초음파센서의 포지셔닝 최적화 장치 및 방법 (2020. 11)",
          "모바일 기반 방광 모니터링을 위한 패치형 초음파센서의 포지셔닝 최적화 장치 및 방법 (2019. 11)",
          "방광 모니터링 헬스케어 시스템 및 방광 모니터링 방법 (2018. 12)",
          "맥파 및 심박변이도를 이용한 통증 분류 방법 (2018. 8)",
          "배뇨장애 관리 및 개선을 위한 어플리케이션 프로세스 및 UX/UI 시스템 (2017. 12)",
          "초음파 영상을 표시하는 장치 및 방법 (2017. 11)",
          "맥파 및 심박변이도를 이용한 통증 분류 방법 (2017. 10)",
          "초음파 영상 내 선택 지점의 위치를 조절하는 방법 및 그 장치 (2017. 4)",
          "하드웨어 및 그래픽 인터페이스를 이용한 사용자 입력에 기초하여 무선 초음파 영상을 제어하는 방법 및 장치 (2017. 4)",
          "하드웨어 및 그래픽 인터페이스를 이용한 사용자 입력에 기초하여 무선 초음파 영상을 제어하는 방법 및 장치 (2016. 5)",
          "초음파 영상 모드 별 그래픽 인터페이스에 기초하여 초음파 영상을 제어하는 방법 및 장치 (2016. 5)",
          "토모신세시스 시스템에서 사용되는 방사선 차폐장치 및 방사선 차폐장치를 이용한 방사선 촬영방법 (2013. 12)",
        ],
        display_order: 4,
      },
      {
        member_id: professor.id,
        section_type: "연구 과제",
        items: {
          보건복지부: [
            "2018. 4 ~ 2021. 12 : 조산 고위험 산모 예측 알고리즘 개발 및 자궁 근전도 무선 모니터링 시스템의 임상적 유효성 검증 (공동연구)",
            "2019. 8 ~ 2019. 12 : 혁신형의료기기 기업인증기준 및 지원방안수립연구",
            "2019. 1 ~ 2019. 12 : 의료기기산업특성화대학원 지원사업",
          ],
          식품의약품안전처: [
            "2020. 1 ~ 2020. 6 : 첨단기술 기반 치료형기기에 대한 임상시험프로토콜가이드라인개발 (세부과제책임자)",
          ],
          한국연구재단: [
            "2017. 4 ~ 2022. 3 : 초음파기반의 패치형 방광모니터링 헬스케어 시스템 개발 (세부과제책임자)",
          ],
          산업통상자원부: [
            "2020. 9 ~ 2021. 8 : 디지털 헬스케어 확산을 위한 오픈 이노베이션 생태계 구축사업",
            "2014 ~ 2018 : 현장진단응급현장시장선도를 위한 ICT기반의 무선초음파솔루션 개발 (참여기관 책임자)",
            "2015 ~ 2017 : 전후두부 정보흐름을 이용한 마취심도 및 통증수준 진단 시스템 개발 (참여기관 책임자)",
            "2015 ~ 2016 : 급/만성 뇌질환/심혈관질환자 모니터링용 인체친화형 스마트 패치 및 재택 건강관리 서비스 솔루션 개발 (참여기관 책임자)",
          ],
          지식경제부: [
            "2005. 12 ~ 2010. 11 : 차세대 의료용 영상진단시스템 개발 (총괄책임자)",
          ],
          범부처전주기의료기기연구개발사업단: [
            "2020. 9 ~ 2025. 12 : 기능 융합형 초음파 영상기기(4세부)",
            "2020. 9 ~ 2023. 12 : 신생아 집중치료에 적합한 다기능 스마트 보육기 개발(3세부)",
            "2021. 3 ~ 2022. 2 : 의료공공복지구현 및 사회문제해결 분야 맞춤형 의료기기 평가기술 개발(4세부)",
            "2020. 9 ~ 2024. 12 : 인공지능 기반 중증악화 예측 가능한 고성능 환자감시장치 시스템 개발(총괄)",
            "2020. 9 ~ 2022. 12 : 고령자 만성질환, 현장형 진단 및 치료 시스템 임상시험 지원(세부)",
            "2020. 9 ~ 2024. 12 : 급만성 폐질환 치료를 위한 생체신호 분석기반 스마트 호흡치료기 개발",
          ],
        },
        display_order: 5,
      },
    ]);
  }

  // Students (currently active)
  const students = [
    {
      name: "김유림",
      name_en: "Yourim Kim",
      role: "phd",
      photo_url: "/images/yourim.png",
      research_interests: [
        "Medical Device Clinical Study Design",
        "Clinical Effectiveness Evaluation",
        "Medical Device Industry Policy",
        "Medical Regulatory Affairs",
      ],
      email: "yxxrm_k@naver.com",
      education: [
        "Master in Medical Device Engineering & Management (2020)",
        "Bachelor in Biomedical Engineering, Konkuk University (2017)",
      ],
      course_label: "Ph.D course",
      display_order: 1,
      is_active: true,
    },
    {
      name: "최현경",
      name_en: "Hyeonkyeong Choi",
      role: "ms_phd",
      photo_url: "/images/hyeonkyeong.jpg",
      research_interests: [
        "UX/UI Design",
        "Usability/Human Factors Engineering",
      ],
      email: "hyeonkyeong97@daum.net",
      education: ["Bachelor in Healthcare Industry, Cha University (2021)"],
      course_label: "MS / Ph.D course",
      display_order: 2,
      is_active: true,
    },
    {
      name: "정지용",
      name_en: "Jiyong Chung",
      role: "ms_phd",
      photo_url: "/images/jiyong.jpg",
      research_interests: ["Usability/Human Factors Engineering"],
      email: "cowjy0427@yonsei.ac.kr",
      education: [
        "Bachelor in Computer Engineering, Tech University of Korea (2022)",
      ],
      course_label: "MS / Ph.D course",
      display_order: 3,
      is_active: true,
    },
    {
      name: "손지민",
      name_en: "Jimin Son",
      role: "ms",
      photo_url: "/images/jimin.jpg",
      research_interests: [
        "Medical Device Clinical Study Design",
        "Medical Regulatory Affairs",
      ],
      email: "wlals2qj@naver.com",
      education: [
        "Bachelor in Biomedical Engineering, Dongguk University (2021)",
      ],
      course_label: "MS course",
      display_order: 4,
      is_active: true,
    },
    {
      name: "유강현",
      name_en: "Kanghyeon You",
      role: "ms",
      photo_url: "/images/kanghyeon.png",
      research_interests: [
        "Medical Device Industry Policy",
        "Medical Regulatory Affairs",
      ],
      email: "hap2boy@naver.com",
      education: ["Bachelor in Healthcare Industry, Cha University (2021)"],
      course_label: "MS course",
      display_order: 5,
      is_active: true,
    },
    {
      name: "임정화",
      name_en: "Jeonghwa Lim",
      role: "ms",
      photo_url: "/images/jeonghwa.png",
      research_interests: ["Bio-signal processing", "AI & Deep learning"],
      email: "lim9234@hanmail.net",
      education: [
        "Bachelor in Biomedical Engineering, Yonsei University (2021)",
      ],
      course_label: "MS course",
      display_order: 6,
      is_active: true,
    },
    {
      name: "권경민",
      name_en: "Gyeongmin Kwon",
      role: "ms",
      photo_url: "/images/gyeongmin.png",
      research_interests: [
        "Usability/Human Factors Engineering",
        "Medical Regulatory Affairs",
      ],
      email: "kdskkm12@naver.com",
      education: [
        "Bachelor in Korean language and literature, Yonsei University (2020)",
      ],
      course_label: "MS course",
      display_order: 7,
      is_active: true,
    },
    {
      name: "김승희",
      name_en: "Seunghee Kim",
      role: "ms",
      photo_url: "/images/seunghee.png",
      research_interests: [
        "Usability/Human Factors Engineering",
        "Medical Device Industry Policy",
      ],
      email: "sshee0710@naver.com",
      education: ["Bachelor in Healthcare Industry, Cha University (2021)"],
      course_label: "MS course",
      display_order: 8,
      is_active: true,
    },
    {
      name: "마유정",
      name_en: "Yujeong Ma",
      role: "ms",
      photo_url: "/images/yujeong.jpg",
      research_interests: [
        "Medical Device Clinical Study Design",
        "Clinical Effectiveness Evaluation",
      ],
      email: "lemontree1235@naver.com",
      education: [
        "Bachelor in Chemistry, Duksung Women's University (2022)",
      ],
      course_label: "MS course",
      display_order: 9,
      is_active: true,
    },
    {
      name: "오지윤",
      name_en: "Jiyoon Oh",
      role: "ms",
      photo_url: "/images/jiyoon.jpeg",
      research_interests: [
        "Medical Device Clinical Study Design",
        "Medical Regulatory Affairs",
      ],
      email: "5wldbs27@naver.com",
      education: [
        "Bachelor in Biomedical Engineering, Yonsei University (2023)",
      ],
      course_label: "MS course",
      display_order: 10,
      is_active: true,
    },
  ];

  await supabase.from("members").insert(students);

  // Alumni
  const alumni = [
    {
      name: "최미소",
      name_en: "Miso Choi",
      role: "alumni",
      photo_url: "/images/miso.png",
      email: "msc17@yonsei.ac.kr",
      education: [
        "Master in Medical Device Engineering & Management (2020)",
      ],
      dissertation_title:
        "Strategies for Korean Medical Devices to enter the Chinese market through the Analysis of Chinese Devices System",
      course_label: "MS",
      display_order: 1,
      is_active: true,
    },
    {
      name: "임인식",
      name_en: "Insik Im",
      role: "alumni",
      photo_url: "/images/insik.png",
      email: "insik7410@gmail.com",
      education: [
        "Master in Medical Device Engineering & Management (2021)",
      ],
      dissertation_title:
        "A Study on the Diagnosis Korea Medical Device Industry through Management Performance and Enterprise Value",
      affiliation: "Medtronic",
      course_label: "MS",
      display_order: 2,
      is_active: true,
    },
    {
      name: "한시현",
      name_en: "Sihyun Han",
      role: "alumni",
      photo_url: "/images/sihyun.png",
      email: "2007andy@naver.com",
      education: [
        "Master in Medical Device Engineering & Management (2021)",
      ],
      dissertation_title:
        "A Study on the Application of Digital Clinical Trial System to Medical Device",
      affiliation: "Synex",
      course_label: "MS",
      display_order: 3,
      is_active: true,
    },
    {
      name: "이한지",
      name_en: "Hanji Lee",
      role: "alumni",
      photo_url: "/images/hanji.png",
      email: "hangilee00@gmail.com",
      education: [
        "Master in Medical Device Engineering & Management (2022)",
      ],
      dissertation_title:
        "Improvement of domestic regulation based on analysis of global regulations for digital therapeutics",
      affiliation: "Abbott",
      course_label: "MS",
      display_order: 4,
      is_active: true,
    },
    {
      name: "최정욱",
      name_en: "Jeonguk Choi",
      role: "alumni",
      photo_url: "/images/jeonguk.jpg",
      email: "hrju5110@naver.com",
      education: [
        "Master in Medical Device Engineering & Management (2022)",
      ],
      dissertation_title:
        "User Interface Design for Ventilator Central Monitoring System Applying Human Factors Engineering",
      affiliation: "Vuno",
      course_label: "MS",
      display_order: 5,
      is_active: true,
    },
    {
      name: "송미원",
      name_en: "MiWon Song",
      role: "alumni",
      photo_url: "/images/miwon.jpg",
      email: "aldnjthd@naver.com",
      education: [
        "Master in Medical Device Engineering & Management (2022)",
      ],
      dissertation_title:
        "Assessment for usefulness of A_mode sonography for muscle change after training",
      affiliation:
        "Gangnam Severance Hospital (Medical Device Usability Research Center)",
      course_label: "MS",
      display_order: 6,
      is_active: true,
    },
    {
      name: "이은선",
      name_en: "EunSeon Lee",
      role: "alumni",
      photo_url: "/images/eunseon.jpg",
      email: "eunseon.lee92@gmail.com",
      education: [
        "Master in Medical Device Engineering & Management (2022)",
      ],
      dissertation_title:
        "Analysis of Emergency Use Authorization (EUA) for In Vitro Diagnostic Medical Devices (IVD) on Emerging Infectious Disease",
      affiliation: "Seegene",
      course_label: "MS",
      display_order: 7,
      is_active: true,
    },
    {
      name: "조영보",
      name_en: "Youngbo Cho",
      role: "alumni",
      photo_url: "/images/youngbo.jpg",
      email: "miracle0134@naver.com",
      education: [
        "Master in Medical Device Engineering & Management (2022)",
      ],
      dissertation_title:
        "A Study on the Global Harmonized Adverse Event Reporting System for Domestic Medical Device Manufacturers",
      affiliation: "Guerbet",
      course_label: "MS",
      display_order: 8,
      is_active: true,
    },
    {
      name: "최초로",
      name_en: "Choro Choi",
      role: "alumni",
      photo_url: "/images/cho.jpeg",
      email: "hisstoryxx@gmail.com",
      education: [
        "Master in Medical Device Engineering & Management (2022)",
      ],
      dissertation_title:
        "Development of cloud_based remote monitoring system for peritoneal dialysis patients",
      affiliation: "MDOC",
      course_label: "MS",
      display_order: 9,
      is_active: true,
    },
    {
      name: "박상은",
      name_en: "Sangeun Park",
      role: "alumni",
      photo_url: "/images/sangeun.png",
      email: "pse7036@naver.com",
      education: [
        "Master & Ph.D in Medical Device Engineering & Management (2023)",
      ],
      affiliation: "EDGECARE",
      course_label: "MS / Ph.D",
      display_order: 10,
      is_active: true,
    },
    {
      name: "이슬비",
      name_en: "Seulbi Lee",
      role: "alumni",
      photo_url: "/images/seulbi.png",
      email: "bee5747@naver.com",
      education: [
        "Master in Medical Device Engineering & Management (2023)",
      ],
      course_label: "MS",
      display_order: 11,
      is_active: true,
    },
    {
      name: "정지윤",
      name_en: "Jiyun Jeong",
      role: "alumni",
      photo_url: "/images/jiyun.jpg",
      email: "ravissante25@gmail.com",
      education: [
        "Master in Medical Device Engineering & Management (2023)",
      ],
      course_label: "MS",
      display_order: 12,
      is_active: true,
    },
    {
      name: "최희영",
      name_en: "Heeyeong Choi",
      role: "alumni",
      photo_url: "/images/heeyoung.png",
      email: "chy980423@naver.com",
      education: [
        "Master in Medical Device Engineering & Management (2023)",
      ],
      affiliation: "Siemens Healthineers",
      course_label: "MS",
      display_order: 13,
      is_active: true,
    },
  ];

  await supabase.from("members").insert(alumni);

  // Staff
  await supabase.from("members").insert({
    name: "김보라",
    name_en: "Bora Kim",
    role: "staff",
    photo_url: "/images/bora.jpg",
    research_interests: ["Administration"],
    email: "arobk@naver.com",
    education: [
      "Bachelor in Advanced Materials Engineering, Sejong University (2017)",
    ],
    course_label: "Administrator",
    display_order: 0,
    is_active: true,
  });

  // Interns
  const interns = [
    { name: "박상은", name_en: "Sangeun Park", period: "2018.09.01 ~ 2019.02.28", display_order: 1 },
    { name: "임인식", name_en: "Insik Im", period: "2018.09.01 ~ 2018.12.31", display_order: 2 },
    { name: "강경필", name_en: "Kyungpil Kang", period: "2018.10.01 ~ 2018.12.31", display_order: 3 },
    { name: "이한지", name_en: "Hanji Lee", period: "2019.07 ~ 2020.02.28", display_order: 4 },
    { name: "최정욱", name_en: "Jeonguk Choi", period: "2019.07.01 ~ 2019.08.31", display_order: 5 },
    { name: "김동욱", name_en: "Dongwook Kim", period: "2019.07.01 ~ 2019.08.31 / 2020.01.01 ~ 2020.02.28", display_order: 6 },
    { name: "최초로", name_en: "Choro Choi", period: "2019.09.01 ~ 2020.08.31", display_order: 7 },
    { name: "김민하", name_en: "Minha Kim", period: "2020.01.01 ~ 2020.02.28", affiliation: "CANDELA", display_order: 8 },
    { name: "이호준", name_en: "Hojoon Lee", period: "2020.01.01 ~ 2020.02.28", display_order: 9 },
    { name: "최희영", name_en: "Heeyeong Choi", period: "2020.07.01 ~ 2021.02.28", display_order: 10 },
    { name: "임정화", name_en: "Jeonghwa Lim", period: "2020.07.01 ~ 2020.12.31", display_order: 11 },
    { name: "이수진", name_en: "Sujin Lee", period: "2020.07.01 ~ 2020.08.31", display_order: 12 },
    { name: "김세희", name_en: "Sehui Kim", period: "2021.07.01 ~ 2021.08.31", affiliation: "RA specialist", display_order: 13 },
  ].map((intern) => ({
    ...intern,
    role: "intern" as const,
    is_active: true,
    research_interests: [] as string[],
    education: [
      "Department of Medical Device Engineering & Management, Graduate School, College of Medicine, Yonsei University",
    ],
  }));

  await supabase.from("members").insert(interns);

  console.log("✅ Members seeded");

  // ============================================
  // PUBLICATIONS
  // ============================================

  const publications = [
    // International Journals
    { title: "(−)-Gallocatechin gallate from green tea rescues cognitive impairment through restoring hippocampal silent synapses in post-menopausal depression", authors: "Ko, S., Jang, W. S., Jeong, J. H., Ahn, J. W., Kim, Y. H., Kim, S., ... & Chung, S.", venue: "Scientific Reports", year: 2021, pub_type: "international_journal", display_order: 1 },
    { title: "3D microcalcification detection using a color Doppler twinkling artifact with optimized transmit conditions: Preliminary results", authors: "Kang, J., Han, K., Kim, K. S., Jang, W. S., Kim, M. J., & Yoo, Y.", venue: "Medical Physics", year: 2020, pub_type: "international_journal", display_order: 2 },
    { title: "Design and implementation of a new wireless carotid neckband doppler system with wearable ultrasound sensors: preliminary results", authors: "Song, I., Yoon, J., Kang, J., Kim, M., Jang, W. S., Shin, N. Y., & Yoo, Y.", venue: "Applied Sciences", year: 2019, pub_type: "international_journal", display_order: 3 },
    { title: "High PRF ultrafast sliding compound doppler imaging: fully qualitative and quantitative analysis of blood flow", authors: "Kang, J., Jang, W., and Yoo, Y.", venue: "Physics in Medicine & Biology", year: 2018, pub_type: "international_journal", display_order: 4 },
    { title: "Tooth segmentation using gaussian mixture model and genetic algorithm", authors: "Kim, J. Y., Yoo, S. K., Jang, W. S., Park, B. E., Park, W., & Kim, K. D.", venue: "Journal of Medical Imaging and Health Informatics", year: 2017, pub_type: "international_journal", display_order: 5 },
    { title: "Texture analysis of supraspinatus ultrasound image for computer aided diagnostic system", authors: "Park, B. E., Jang, W. S., & Yoo, S. K.", venue: "Healthcare Informatics Research", year: 2016, pub_type: "international_journal", display_order: 6 },
    { title: "Continuous monitoring of arthritis in animal models using optical imaging modalities", authors: "Son, T., Yoon, H. J., Lee, S., Jang, W. S., Jung, B., & Kim, W. U.", venue: "Journal of Biomedical Optics", year: 2014, pub_type: "international_journal", display_order: 7 },
    { title: "Digital tomosynthesis (DTS) with a Circular X-ray tube: Its image reconstruction based on total-variation minimization and the image characteristics", authors: "Park, Y. O., Hong, D. K., Cho, H. S., Je, U. K., Oh, J. E., Lee, M. S., ... & Koo, Y. S.", venue: "Journal of the Korean Physical Society", year: 2013, pub_type: "international_journal", display_order: 8 },

    // Domestic Journals
    { title: "A Study on Safety, Performance and Clinical effectiveness Test Guideline of Versatile Ophthalmic Laser System", authors: "Kim, Y. R., Yu, W. J., Park, H. J., & Jang, W. S.", venue: "Journal of Biomedical Engineering Research", year: 2019, pub_type: "domestic_journal", display_order: 1 },
    { title: "A Study on Development of Guideline for Clinical Trial Standard Protocol of Endoscopic Marking System", authors: "Kim, Y. R., Jeon, S. W., & Jang, W. S.", venue: "Regulatory Research on Food, Drug and Cosmetic", year: 2019, pub_type: "domestic_journal", display_order: 2 },
    { title: "Performance Improvement of Convolutional Neural Network for Pulmonary Nodule Detection", authors: "Kim, H., Kim, B., Lee, J., Jang, W. S., & Yoo, S. K.", venue: "의공학회지", year: 2017, pub_type: "domestic_journal", display_order: 3 },
    { title: "Analysis of Galvanic Skin Response Signal for High-Arousal Negative Emotion Using Discrete Wavelet Transform", authors: "Lim, H. J., Yoo, S. K., & Jang, W. S.", venue: "감성과학", year: 2017, pub_type: "domestic_journal", display_order: 4 },
    { title: "Texture analysis of Thyroid Nodules in Ultrasound Image for Computer Aided Diagnostic system", authors: "Park, B. E., Jang, W. S., & Yoo, S. K.", venue: "멀티미디어학회논문지", year: 2017, pub_type: "domestic_journal", display_order: 5 },
    { title: "Affecting Factor Analysis for Respiration Rate Measurement Using Depth Camera", authors: "Oh, K. T, Shin, C, S, Kim, J. M., Jang, W. S., & Yoo, S, K.", venue: "감성과학", year: 2016, pub_type: "domestic_journal", display_order: 6 },
    { title: "Random Forest Based Abnormal ECG Dichotomization using Linear and Nonlinear Feature Extraction", authors: "Kim, H. J., Kim, B. N., Jang, W. S., & Yoo, S. K.", venue: "의공학회지", year: 2016, pub_type: "domestic_journal", display_order: 7 },
    { title: "Connectivity Analysis Between EEG and EMG Signals by the Status of Movement Intention", authors: "Kim, B. N., Kim, Y. H., Kim, L. H., Kwon, G. H., Jang, W. S., & Yoo, S. K.", venue: "감성과학", year: 2016, pub_type: "domestic_journal", display_order: 8 },
    { title: "Distance Regularized Level Set Evolution using method for Liver Tumor Segmentation", authors: "Oh, K. T., Yoo, S. K., & Jang, W. S.", venue: "대한의학영상정보학회지", year: 2015, pub_type: "domestic_journal", display_order: 9 },
    { title: "Design of Optimized Ultrasound Clinical Work-Flow; Usability Perspective", authors: "Bag, B., Yoo, S., & Jang, W.", venue: "Journal of International Society for Simulation Surgery", year: 2015, pub_type: "domestic_journal", display_order: 10 },
    { title: "A Development of Physio-Module for Echocardiography", authors: "Jang, W. S., Kim, N. H., & Jeon, D. K.", venue: "전자공학회논문지–SC", year: 2010, pub_type: "domestic_journal", display_order: 11 },
    { title: "A Design of Real-Time QRS Detection in Physio-Module for Echocardiography", authors: "Jang, W. S., Kim, N. H., Kim, E. S., & Jeon, D. K.", venue: "전자공학회논문지–SC", year: 2010, pub_type: "domestic_journal", display_order: 12 },
    { title: "A Study of Relationship Between EMG Activation of Thigh Muscle and Knee Angle During Bicycle Exercise", authors: "Jang, W. S., Kim, S. M., Kang, S. H., Kim, N. H.", venue: "전자공학회논문지–SC", year: 2009, pub_type: "domestic_journal", display_order: 13 },

    // International Conferences
    { title: "Human Factors Engineering Methods for Risk Analysis of the Breast Imaging Diagnostic System", authors: "Jeong, J., Park, S., & Jang, W.", venue: "International Symposium on Human Factors and Ergonomics in Health Care", year: 2022, pub_type: "international_conference", display_order: 1 },
    { title: "Human Factors Analysis to Design of User Interface for Multi-Purpose Neonatal Incubator", authors: "Choi, H., Park, S., & Jang, W.", venue: "International Symposium on Human Factors and Ergonomics in Health Care", year: 2022, pub_type: "international_conference", display_order: 2 },
    { title: "Applying Human Factor Engineering Methods for Risk Analysis of the Breast Imaging Diagnostic System", authors: "Jeong, J., Park, S., & Jang, W.", venue: "International Biomedical Engineering Conference", year: 2021, pub_type: "international_conference", display_order: 3 },
    { title: "User needs analysis for multi-purpose smart neonatal incubator", authors: "Choi, H., Park, S., & Jang, W.", venue: "International Biomedical Engineering Conference", year: 2021, pub_type: "international_conference", display_order: 4 },
    { title: "Usability Testing of Ultrasonic Surgical System for Lower Eyelid Fat Removal", authors: "Choi, J., Park, S., & Jang, W.", venue: "International Symposium on Human Factors and Ergonomics in Health Care", year: 2021, pub_type: "international_conference", display_order: 5 },
    { title: "A Design of Mobile Application for Ultrasound Bladder Monitoring System Based on Usability Engineering", authors: "Park, S., Oh, H., choi, J., & Jang, W.", venue: "International Symposium on Human Factors and Ergonomics in Health Care", year: 2020, pub_type: "international_conference", display_order: 6 },

    // Domestic Conferences
    { title: "Design for prediction of Preterm using Preprocessing and CNN-LSTM Network", authors: "Choi, C. R., & Jang, W. S.", venue: "The Institute of Electronics and Information Engineers Summer Annual Conference", year: 2021, pub_type: "domestic_conference", display_order: 1 },
    { title: "Analysis of Uterine Contraction Using K-means algorithm", authors: "Choi, C. R., Jung, Y. J., Kim, Y. H., Choi, J. W., Park, S. E., Kim, Y. R., & Jang, W. S.", venue: "The Institute of Electronics and Information Engineers Summer Annual Conference", year: 2020, pub_type: "domestic_conference", display_order: 2 },
    { title: "Extraction Parameter of Non-Contraction Interval using Unsupervised Learning for Predicting Preterm Birth", authors: "Choi, C. R., Jang, W. S., Jung, Y. J., & Kim, Y. H.", venue: "The Korean Society Of Perinatology, Fall Conference", year: 2020, pub_type: "domestic_conference", display_order: 3 },
    { title: "A Design of Mobile Application for Ultrasound Bladder Monitoring System Based on Usability Engineering", authors: "Park. S. E., Oh, H. K., Lim, I. S., & Jang, W. S.", venue: "The Korean Society of Medical & Biological Engineering, Spring Conference", year: 2019, pub_type: "domestic_conference", display_order: 4 },
    { title: "Simulation and Analysis of Pattern Recognition Neural Network Algorithm for Detection of High risk Uterine Contractions", authors: "Choi, C. R., Jung, Y. J., Kim, Y. H., & Jang, W. S.", venue: "The Korean Society of Medical & Biological Engineering, Fall Conference", year: 2019, pub_type: "domestic_conference", display_order: 5 },
    { title: "Development of Wireless Fetal Monitoring System based on Uterine EMG and Analysis of Uterine Contraction", authors: "Jang, I. J., Choi, H. W., Kang, D. J., Choi C. R., Jang, W. S., Jung Y. J., & Kim, Y. H.", venue: "The Korean Society Of Perinatology, Fall Conference", year: 2019, pub_type: "domestic_conference", display_order: 6 },

    // Patents
    { title: "Device for checking uterine contraction having a function for reducing battery consumption", authors: "Kim, Y. H., Jang, W. S., Kim, Y. H.", venue: "10-2020-0187801", year: 2020, pub_type: "patent", display_order: 1 },
    { title: "Device for checking uterine contraction", authors: "Kim, Y. H., Jang, W. S., Kim, Y. H.", venue: "10-2020-0187800", year: 2020, pub_type: "patent", display_order: 2 },
    { title: "Positioning optimizer device and process of patch-type ultrasonic sensors for mobile-based bladder monitoring", authors: "Jang, W. S., Park, S. E., Oh, H. K.", venue: "PCT/KR2020/016186", year: 2020, pub_type: "patent", display_order: 3 },
    { title: "Positioning optimizer device and process of patch-type ultrasonic sensors for mobile-based bladder monitoring", authors: "Jang, W. S., Park, S. E., Oh, H. K.", venue: "10-2019-0148244", year: 2019, pub_type: "patent", display_order: 4 },
    { title: "Bladder monitoring healthcare system and bladder monitoring process", authors: "Jang, W. S., Park, S. E., Oh, H. K.", venue: "10-2018-0173498", year: 2018, pub_type: "patent", display_order: 5 },
    { title: "Measures to classify pain using pulse waves and heart rate variation", authors: "Jang, W. S., Yoo, S. K., Kim, B. N.", venue: "10-2018-0100372", year: 2018, pub_type: "patent", display_order: 6 },
    { title: "Application processes and UX/UI systems for managing and enhancing urinary disorders", authors: "Jang, W. S., Yoo, S. K., Oh, K. T., Kim, B. N., Kim, H. W.", venue: "10-2017-0184169", year: 2017, pub_type: "patent", display_order: 7 },
    { title: "Devices and methods for displaying ultrasonic images", authors: "Jang, W. S., Yoo, S. K., Oh, K. T.", venue: "10-2017-0163456", year: 2017, pub_type: "patent", display_order: 8 },
    { title: "Measures to classify pain using pulse waves and heart rate variation", authors: "Jang, W. S., Yoo, S. K., Kim, B. N.", venue: "10-2017-0143053", year: 2017, pub_type: "patent", display_order: 9 },
    { title: "Ways to adjust the position of the selection point in the ultrasonic image and its device", authors: "Jang, W. S., Yoo, S. K., Kwon, J. H., Kim, H. W.", venue: "10-2017-0055510", year: 2017, pub_type: "patent", display_order: 10 },
    { title: "Ways to control wireless ultrasound images based on user input using hardware and graphic interfaces and its device", authors: "Jang, W. S., Yoo, S. K., Oh, K. T.", venue: "PCT/KR2017/004173", year: 2017, pub_type: "patent", display_order: 11 },
    { title: "Ways to control wireless ultrasound images based on user input using hardware and graphic interfaces and its device", authors: "Jang, W. S., Yoo, S. K., Oh, K. T.", venue: "10-2016-0066725", year: 2016, pub_type: "patent", display_order: 12 },
    { title: "Ways to control ultrasonic images based on graphic interfaces by ultrasonic image mode and its device", authors: "Jang, W. S., Yoo, S. K., Oh, K. T.", venue: "10-2016-0066737", year: 2016, pub_type: "patent", display_order: 13 },
    { title: "Radiography using radiation shielding and radiation shielding devices used in the Tomosynthesis system", authors: "Kim, H. J., Jang, W. S., Lee, D. H., Kim, D. H., Seo, K. E., Kim, D. H., Lee, Y. J., Choi, S. H., Lee, H. H.", venue: "10-2013-0169303", year: 2013, pub_type: "patent", display_order: 14 },

    // Books
    { title: "Wearable Technology in Medicine and Health Care (Kuh, S. U., Jang, W. S., Kim. K. B., Kim, K. S. Trans.)", authors: "Raymond kai-Yu Tong", venue: "", year: 2021, pub_type: "book", display_order: 1 },
    { title: "Design of Digital Healthcare System", authors: "Kim. K. B., Huh, Y. S., Hong, K. J., Lee, D. H., Yeo, S. M., Lee, S. W., Lim, H. T., Kuh, S. W. Jang, W. S.", venue: "", year: 2021, pub_type: "book", display_order: 2 },
    { title: "Medical image processing and its applications", authors: "Lee, H., Lee, I. J., Chung, Y. S., Kim, H. S., Lee, J. J., Min, B. J., Kuh, S. U., Jang, W. S., Kim, K. B.", venue: "", year: 2020, pub_type: "book", display_order: 3 },
    { title: "Medical devices and clinical medicine", authors: "Yonsei University College of Medicine, et al.", venue: "", year: 2019, pub_type: "book", display_order: 4 },
    { title: "Design of Biomedical Devices and Systems 4th edition (Kuh, S. U., Jang, W. S. Trans.)", authors: "Paul H., King Richard C., Fries Arthur T., Johnson", venue: "", year: 2018, pub_type: "book", display_order: 5 },
    { title: "MEDICAL DEVICES QUALITY MANAGEMENT SYSTEM : MDSAP: Medical Device Single Audit Program", authors: "Kuh, S. U., Jang, W. S., Kwon, B. J., Kang, G. H.", venue: "", year: 2018, pub_type: "book", display_order: 6 },
  ];

  await supabase.from("publications").insert(publications);
  console.log("✅ Publications seeded");

  // ============================================
  // RESEARCH PROJECTS
  // ============================================

  const researchProjects = [
    // CD - Clinical Study Design
    { title: "인공지능 기반 중증악화 예측 가능한 고성능 환자감시장치 시스템 개발", category: "CD", status: "progressing", image_url: "/images/cd01.jpg", display_order: 1 },
    { title: "고령자 만성질환, 현장형 진단 및 치료 시스템 임상시험 지원", category: "CD", status: "progressing", image_url: "/images/cd02.jpg", display_order: 2 },
    { title: "디지털 치료기기 임상설계 가이드라인 개발 연구", category: "CD", status: "closed", image_url: "/images/cd03.jpg", display_order: 3 },
    { title: "조산 고위험 산모 예측 알고리즘 개발 및 자궁근전도 무선 모니터링 시스템의 임상적 유효성 검증", category: "CD", status: "closed", image_url: "/images/cd04.jpg", display_order: 4 },
    { title: "위암영상검출진단보조소프트웨어에 대한 임상시험계획서 개발", category: "CD", status: "closed", image_url: "/images/cd05.jpg", display_order: 5 },
    { title: "생체활성 소재 기반의 임상적 요구에 최적화된 기능성 환자 맞춤형 척추 유합 임플란트 및 제조 시스템 개발", category: "CD", status: "closed", image_url: "/images/cd06.jpg", display_order: 6 },
    { title: "첨단기술 기반 치료형 기기의 임상시험 프로토콜 가이드라인 개발", category: "CD", status: "closed", image_url: "/images/cd07.jpg", display_order: 7 },

    // UD - UX/UI Design & Usability
    { title: "기능 융합형 초음파 영상기기", category: "UD", status: "progressing", image_url: "/images/ud01.jpg", display_order: 1 },
    { title: "급만성 폐질환 치료를 위한 생체신호 분석기반 스마트 호흡치료기 개발", category: "UD", status: "progressing", image_url: "/images/ud02.jpg", display_order: 2 },
    { title: "인공지능 기반 중증악화 예측 가능한 고성능 환자감시장치 시스템 개발", category: "UD", status: "progressing", image_url: "/images/ud03.jpg", display_order: 3 },
    { title: "신생아 집중치료에 적합한 다기능 스마트 보육기 개발", category: "UD", status: "progressing", image_url: "/images/ud04.jpg", display_order: 4 },
    { title: "초음파 기반의 패치형 방광 모니터링 헬스케어 시스템 개발", category: "UD", status: "progressing", image_url: "/images/ud05.jpg", display_order: 5 },
    { title: "조산 고위험 산모의 예측 및 검사 접근성의 향상을 위한 자궁근전도 기반의 무선 모니터링시스템 개발", category: "UD", status: "closed", image_url: "/images/ud06.jpg", display_order: 6 },
    { title: "초음파 영상기반 체외충격파 융합기기의 새로운 치료기능에 대한 임상적 유효성 평가", category: "UD", status: "closed", image_url: "/images/ud07.jpg", display_order: 7 },
    { title: "하안검 치료용 정밀 초음파 수술기에 대한 사용적합성 평가", category: "UD", status: "closed", image_url: "/images/ud08.jpg", display_order: 8 },
    { title: "현장진단·응급현장 시장 선도를 위한 ICT 기반 무선 초음파 솔루션 개발", category: "UD", status: "closed", image_url: "/images/ud09.jpg", display_order: 9 },

    // MI - Medical Industry Policy
    { title: "아이콜리에 대한 RA/QA 지원 용역", category: "MI", status: "closed", image_url: "/images/mi01.jpg", display_order: 1 },
    { title: "디지털 치료기기 임상설계 가이드라인 개발 연구", category: "MI", status: "closed", image_url: "/images/mi02.jpg", display_order: 2 },
    { title: "병원-기업 연계 의료기기 R&D 협력 플랫폼 기술개발 후속 사업을 위한 기획연구", category: "MI", status: "closed", image_url: "/images/mi03.jpg", display_order: 3 },
    { title: "혁신형 의료기기 기업 인증 기준 및 지원 방안 수립 연구", category: "MI", status: "closed", image_url: "/images/mi04.jpg", display_order: 4 },

    // BS - Bio Signal Processing & AI
    { title: "급만성 폐질환 치료를 위한 생체신호 분석기반 스마트 호흡치료기 개발", category: "BS", status: "progressing", image_url: "/images/bs01.jpg", display_order: 1 },
    { title: "조산 고위험 산모의 예측 및 검사 접근성의 향상을 위한 자궁근전도 기반의 무선 모니터링시스템 개발", category: "BS", status: "closed", image_url: "/images/bs02.jpg", display_order: 2 },
  ];

  await supabase.from("research_projects").insert(researchProjects);
  console.log("✅ Research projects seeded");

  // ============================================
  // SITE SETTINGS
  // ============================================

  await supabase.from("site_settings").insert([
    {
      key: "spline_scene_url",
      value: { url: "" },
    },
    {
      key: "contact_info",
      value: {
        address: "B1, 20, Eonju-ro 63-gil, Gangnam-gu, Seoul, Republic of Korea",
        email: "mddu.lab.yonsei@gmail.com",
        department: "Dept. of Medical Device Engineering & Management",
        department_url: "http://mdi.yonsei.ac.kr/",
        tel: "02-2019-5442",
      },
    },
  ]);
  console.log("✅ Site settings seeded");

  console.log("🎉 Seeding complete!");
}

seed().catch(console.error);
