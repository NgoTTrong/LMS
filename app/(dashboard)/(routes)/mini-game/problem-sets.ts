export const PROBLEM_SET = [
  {
    left: ["Hello", "Goodbye", "Thank you", "Please", "Sorry"].sort(
      () => Math.random() - 0.5
    ),
    right: [
      "Xin chào",
      "Tạm biệt",
      "Cám ơn bạn",
      "Xin vui lòng",
      "Xin lỗi",
    ].sort(() => Math.random() - 0.5),
    answer: [
      "Hello-Xin chào",
      "Goodbye-Tạm biệt",
      "Thank you-Cám ơn bạn",
      "Please-Xin vui lòng",
      "Sorry-Xin lỗi",
    ],
  },
  {
    left: ["Achieve", "Efficient", "Maintain", "Contribute", "Evaluate"].sort(
      () => Math.random() - 0.5
    ),
    right: ["Đạt được", "Hiệu quả", "Bảo quản", "Đóng góp", "Đánh giá"].sort(
      () => Math.random() - 0.5
    ),
    answer: [
      "Achieve-Đạt được",
      "Efficient-Hiệu quả",
      "Maintain-Bảo quản",
      "Contribute-Đóng góp",
      "Evaluate-Đánh giá",
    ],
  },
  {
    left: ["Thank you", "Goodbye", "Hello", "Please", "Sorry"].sort(
      () => Math.random() - 0.5
    ),
    right: [
      "Xin lỗi",
      "Xin vui lòng",
      "Xin chào",
      "Tạm biệt",
      "Cám ơn bạn",
    ].sort(() => Math.random() - 0.5),
    answer: [
      "Thank you-Xin lỗi",
      "Goodbye-Xin vui lòng",
      "Hello-Xin chào",
      "Please-Tạm biệt",
      "Sorry-Cám ơn bạn",
    ],
  },
];
