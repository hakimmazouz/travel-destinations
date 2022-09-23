const FIVE_DAYS_IN_SECONDS = 60 * 60 * 24 * 5; // 432.000

const locations = [
  {
    title: "Mount Fuji",
    country: "Japan",
    startDate: new Date(),
    endDate: new Date() + FIVE_DAYS_IN_SECONDS,
    description:
      "Mount Fuji is the tallest mountain in Japan, standing at 3,776 meters (12,380 feet). Mount Fuji is the single most popular tourist site in Japan, for both Japanese and foreign tourists.",
    location:
      "https://www.google.com/maps/place/Mount+Fuji/@35.3606247,138.7186086,15z/data=!3m1!4b1!4m5!3m4!1s0x6019629a42fdc899:0xa6a1fcc916f3a4df!8m2!3d35.3606255!4d138.7273634",
    imageFileName: "mount-fuji.png",
  },
];
