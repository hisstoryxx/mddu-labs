import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const IMAGES_DIR = "/Users/eden/moddujiyong.github.io/public/images";
const BUCKET = "gallery-images";

interface GalleryEntry {
  filename: string;
  title: string;
  description: string;
  event_date: string;
  category: string;
  display_order: number;
}

const galleryItems: GalleryEntry[] = [
  // KIMES 2018
  {
    filename: "kimes2018.jpg",
    title: "KIMES 2018",
    description: "국제의료기기·병원설비전시회 (KIMES) 2018 참가",
    event_date: "2018-03-15",
    category: "학회/전시",
    display_order: 1,
  },
  // MDDU 2020
  {
    filename: "mddu2020_1.jpg",
    title: "MDDU 연구실 2020 (1)",
    description: "MDDU 연구실 활동 2020",
    event_date: "2020-06-01",
    category: "연구실",
    display_order: 2,
  },
  {
    filename: "mddu2020_2.jpg",
    title: "MDDU 연구실 2020 (2)",
    description: "MDDU 연구실 활동 2020",
    event_date: "2020-06-01",
    category: "연구실",
    display_order: 3,
  },
  // 전자전 2020
  {
    filename: "elec2020_1.jpg",
    title: "국제전자전 2020 (1)",
    description: "한국전자전 (KES) 2020 참가",
    event_date: "2020-10-20",
    category: "학회/전시",
    display_order: 4,
  },
  {
    filename: "elec2020_2.jpg",
    title: "국제전자전 2020 (2)",
    description: "한국전자전 (KES) 2020 참가",
    event_date: "2020-10-20",
    category: "학회/전시",
    display_order: 5,
  },
  // KIMES 2021
  {
    filename: "kimes2021_1.jpg",
    title: "KIMES 2021",
    description: "국제의료기기·병원설비전시회 (KIMES) 2021 참가",
    event_date: "2021-03-18",
    category: "학회/전시",
    display_order: 6,
  },
  // 제주 2021
  {
    filename: "jeju2021_1.JPG",
    title: "제주 워크숍 2021",
    description: "MDDU 연구실 제주 워크숍 2021",
    event_date: "2021-07-15",
    category: "워크숍/MT",
    display_order: 7,
  },
  // 전자전 2021
  {
    filename: "elec2021_1.jpg",
    title: "국제전자전 2021 (1)",
    description: "한국전자전 (KES) 2021 참가",
    event_date: "2021-10-19",
    category: "학회/전시",
    display_order: 8,
  },
  {
    filename: "elec2021_2.jpg",
    title: "국제전자전 2021 (2)",
    description: "한국전자전 (KES) 2021 참가",
    event_date: "2021-10-19",
    category: "학회/전시",
    display_order: 9,
  },
  // ICEIC 2022
  {
    filename: "iceic2022_1.jpg",
    title: "ICEIC 2022 (1)",
    description: "International Conference on Electronics, Information, and Communication 2022",
    event_date: "2022-02-06",
    category: "학회/전시",
    display_order: 10,
  },
  {
    filename: "iceic2022_2.jpg",
    title: "ICEIC 2022 (2)",
    description: "International Conference on Electronics, Information, and Communication 2022",
    event_date: "2022-02-06",
    category: "학회/전시",
    display_order: 11,
  },
  {
    filename: "iceic2022_3.jpg",
    title: "ICEIC 2022 (3)",
    description: "International Conference on Electronics, Information, and Communication 2022",
    event_date: "2022-02-06",
    category: "학회/전시",
    display_order: 12,
  },
  {
    filename: "iceic2022_4.jpg",
    title: "ICEIC 2022 (4)",
    description: "International Conference on Electronics, Information, and Communication 2022",
    event_date: "2022-02-06",
    category: "학회/전시",
    display_order: 13,
  },
  // 제주 2022
  {
    filename: "202207jeju1.jpg",
    title: "제주 워크숍 2022 (1)",
    description: "MDDU 연구실 제주 워크숍 2022년 7월",
    event_date: "2022-07-15",
    category: "워크숍/MT",
    display_order: 14,
  },
  {
    filename: "202207jeju2.jpg",
    title: "제주 워크숍 2022 (2)",
    description: "MDDU 연구실 제주 워크숍 2022년 7월",
    event_date: "2022-07-15",
    category: "워크숍/MT",
    display_order: 15,
  },
];

async function migrateGallery() {
  console.log("🖼️  갤러리 이미지 마이그레이션 시작...\n");

  let successCount = 0;
  let failCount = 0;

  for (const item of galleryItems) {
    const filePath = path.join(IMAGES_DIR, item.filename);

    if (!fs.existsSync(filePath)) {
      console.log(`❌ 파일 없음: ${item.filename}`);
      failCount++;
      continue;
    }

    // 1. Supabase Storage에 업로드
    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(item.filename).toLowerCase();
    const contentType = ext === ".png" ? "image/png" : "image/jpeg";
    const storagePath = `gallery/${item.filename.toLowerCase()}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      console.log(`❌ 업로드 실패 (${item.filename}): ${uploadError.message}`);
      failCount++;
      continue;
    }

    // 2. 공개 URL 가져오기
    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath);

    // 3. DB에 갤러리 항목 추가
    const { error: insertError } = await supabase.from("gallery").insert({
      title: item.title,
      description: item.description,
      image_url: urlData.publicUrl,
      event_date: item.event_date,
      category: item.category,
      display_order: item.display_order,
    });

    if (insertError) {
      console.log(`❌ DB 삽입 실패 (${item.filename}): ${insertError.message}`);
      failCount++;
      continue;
    }

    console.log(`✅ ${item.title} (${item.filename})`);
    successCount++;
  }

  console.log(`\n🎉 마이그레이션 완료! 성공: ${successCount}, 실패: ${failCount}`);
}

migrateGallery().catch(console.error);
