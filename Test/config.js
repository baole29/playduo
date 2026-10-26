/* ==========================================================================
   NỘI DUNG TRANG WEB — chỉ cần sửa file này, không cần đụng vào file khác.
   - {me} và {her} sẽ tự được thay bằng tên bên dưới.
   - Những chỗ có chú thích "SỬA" là nên thay bằng kỷ niệm thật của hai bạn.
   - Các chữ nhỏ kiểu pixel (kicker, SAVE FILE...) chỉ dùng chữ KHÔNG DẤU.
   ========================================================================== */

window.CONFIG = {
  // --- Thông tin cơ bản ----------------------------------------------------
  me: "Bảo",                    // SỬA: tên / nickname của bạn (người gửi)
  her: "Châu",                   // SỬA: tên / nickname của cô ấy
  startDate: "2026-08-25T00:00:00",  // SỬA: ngày bắt đầu quen (năm-tháng-ngày)
  pageTitle: "Hai tháng duo",
  music: "",                         // Tùy chọn: đường dẫn nhạc nền, ví dụ "audio/bai-hat.mp3"

  // --- Màn mời vào phòng (màn đầu tiên) -------------------------------------
  gate: {
    kicker: "INVITE",
    title: "{me} đã mời {her} vào phòng",
    sub: "Phòng riêng, 2/2 người, chế độ co-op",
    button: "Vào phòng"
  },

  // --- Đầu trang -------------------------------------------------------------
  hero: {
    kicker: "SAVE FILE 01",
    title: "Hai tháng, vài trận game, và một thứ chưa có tên.",
    lead: "Gửi {her}. Một góc nhỏ để nhớ lại những ngày vừa rồi.",
    counterLabel: "Đã chơi cùng nhau được",
    cue: "Cuộn xuống để đi tiếp. Chạm vào bầu trời để thả sao."
  },

  // Tên hiển thị trên thanh trạng thái khi cuộn qua từng phần
  stages: {
    hero: "Phòng chờ",
    story: "Lần đầu gặp",
    games: "Thư viện game",
    chat: "Chuyện vợ chồng",
    patches: "Bản vá lỗi",
    ach: "Thành tựu",
    stats: "Vài con số",
    coop: "Màn cuối"
  },

  // --- Câu chuyện bắt đầu -------------------------------------------------------
  story: {
    title: "Một lượt chơi tưởng chừng bình thường",
    paragraphs: [
      "Mọi chuyện bắt đầu từ PlayDuo. Một lượt chơi cùng nhau, định bụng chỉ một trận cho xong.",
      "Rồi một trận thành hai trận. Hai trận thành cả buổi tối. Rồi tối nào cũng tự nhiên có lý do để mở game.",
      "Không ai tuyên bố gì cả. Chỉ là bỗng dưng có một người luôn online đúng lúc."
    ]
  },

  // --- Thư viện game ---------------------------------------------------------------
  // SỬA: phần "line" (hiện sẵn) và "note" (hiện khi chạm vào thẻ) nên viết lại bằng kỷ niệm thật.
  // Thêm ảnh chụp màn hình: đặt ảnh vào thư mục images/ rồi thêm  img: "images/ten-anh.jpg"
  games: {
    title: "Thư viện game của hai người",
    intro: "Chạm vào từng ô để xem lại một chút kỷ niệm.",
    items: [
      {
        name: "League of Legends", tag: "Đấu trường 5v5", icon: "⚔️", c1: "#5b8cff", c2: "#8a4dff",
        line: "Nơi mọi thứ bắt đầu. Thắng hay thua thì trận nào cũng có tiếng cười.",
        note: "Những trận thua sấp mặt mà vẫn cười được. Chắc tại có người chơi cùng. Chồng gà quá nên nghỉ chơi =)))",
        meter: { label: "Độ căng thẳng", value: 4 }
      },
      {
        name: "PUBG", tag: "Sinh tồn", icon: "🪂", c1: "#f2b84b", c2: "#e8685a",
        line: "Cùng nhảy dù, cùng hứa “lần này không ai chết trước”. Lời hứa sống được đúng ba phút.",
        note: "Nhường đồ ngon cho nhau, rồi cãi nhau xem ai lái xe.",
        meter: { label: "Độ hỗn loạn", value: 4 }
      },
      {
        name: "It Takes Two", tag: "Co-op bắt buộc", icon: "🧩", c1: "#ff8fa6", c2: "#ffb86b",
        line: "Game duy nhất không thể chơi một mình. Cánh cửa nào cũng chỉ mở khi hai người cùng bước tới.",
        note: "Chẳng ai gánh ai được cả. Muốn đi tiếp thì phải đợi nhau, và hiểu nhau.",
        meter: { label: "Độ ăn ý", value: 5 }
      },
      {
        name: "GTA V", tag: "Thế giới mở", icon: "🚗", c1: "#3fd28f", c2: "#2f8fd8",
        line: "Hỗn loạn, cười sái quai hàm, và những pha “Ghen tuông vô lý =))))”.",
        note: "Đi chặt gỗ thì nhiều.... vẫn chưa mua cho vợ con mini copper",
        meter: { label: "Độ hỗn loạn", value: 5 }
      },
      {
        name: "Split Fiction", tag: "Co-op, hai thế giới", icon: "🌗", c1: "#47c2ff", c2: "#c07bff",
        line: "Hai thế giới khác nhau, một hành trình chung. Lại một game mà đi một mình là không xong.",
        note: "Mỗi người một kiểu, nhưng đến cuối vẫn phải sải bước cùng nhau.",
        meter: { label: "Độ ăn ý", value: 4 }
      },
      {
        name: "Stardew Valley", tag: "Nông trại", icon: "🌱", c1: "#7ed957", c2: "#f2c94c",
        line: "Trồng củ cải, nuôi gà, nói chuyện linh tinh đến tận khuya. Chỗ bình yên nhất.",
        note: "Chưa chơi được gì=)))",
        meter: { label: "Độ bình yên", value: 1 }
      },
      {
        name: "Xem phim cùng nhau", tag: "Không phải game", icon: "🎬", c1: "#a58bff", c2: "#ff7aa8", notGame: true,
        line: "Hẹn giờ, đếm 3-2-1 rồi cùng bấm play. Nửa đầu bình luận không ngừng, nửa sau im lặng vì mê.",
        note: "Phim gì cũng được, miễn là cùng xem.",
        meter: { label: "Độ say phim", value: 5 }
      }
    ]
  },

  // --- Chuyện "vợ chồng" -----------------------------------------------------------
  chat: {
    title: "Về chuyện “vợ chồng”",
    intro: "Một câu đùa không nhớ bắt đầu từ lúc nào, rồi thành thói quen.",
    room: "voice-chat",
    // who: "me" = bạn (bên trái), "her" = cô ấy (bên phải). SỬA bằng đoạn chat thật nếu muốn.
    messages: [
      { who: "me", text: "Vợ ơi, vào game đi 🥺" },
      { who: "her",  text: "dạ chồng, vợ vào ngay, 1 phút thôi" },
      { who: "me", text: "1 phút của vợ = 15 phút của người bình thường" },
      { who: "her",  text: "chồng hiểu vợ quá rồi 😌" },
      { who: "me", text: "hiểu nên mới đợi đó, nhanh lên" }
    ],
    outro: "Cả hai đều biết đây chỉ là chuyện đùa.",
    egg: "Chắc vậy.",                         // bấm vào chữ này sẽ hiện câu bên dưới
    eggToast: "Đùa thôi mà… đúng không? 😏"
  },

  // --- Những lần không vui, viết như patch notes -----------------------------------
  patches: {
    title: "Những lần không vui",
    intro: "Có vui thì cũng có lúc không vui. Mình ghi lại như patch notes, vì lỗi nào rồi cũng được vá.",
    items: [
      {
        v: "1.0.1", title: "Lần đầu im lặng giữa trận",
        bug: "Một câu đùa hơi quá đà, một người im lặng suốt cả ván.",
        fix: "Một tin nhắn xin lỗi vụng về, kèm vài cái icon cho đỡ ngượng."
      },
      {
        v: "1.1.0", title: "Khó chịu có chủ đích",
        bug: "Cả hai cùng nghĩ mình đúng, cùng chờ người kia nói xin lỗi trước.",
        fix: "Có một người chịu thua trước. (Xin phép không nói là ai.)"
      },
      {
        v: "1.2.0", title: "Nói thẳng một lần",
        bug: "Giận nhau vì những chuyện nhỏ xíu nhưng không ai chịu nói ra.",
        fix: "Nói thật với nhau. Hóa ra chỉ cần như vậy."
      },
      {
        v: "1.2.0", title: "Lần xém chút không còn chơi với nhau",
        bug: "Những lần do lỡ lời làm vợ giận..",
        fix: "chồng xin lỗi rất nhiều, may là vợ đã hiểu.."
      }
    ],
    known: {
      title: "Lỗi còn tồn tại",
      list: [
        "Vẫn hay cà khịa nhau. Quyết định không sửa.",
        "Vợ hay trễ giờ =)))”."
      ]
    }
  },

  // --- Thành tựu (tự mở khóa lần lượt khi cuộn tới) ---------------------------------
  achievements: {
    title: "Thành tựu đã mở khóa",
    intro: "Không ai trao giải. Tự thấy xứng đáng nên tự khắc vào.",
    items: [
      { icon: "🎮", title: "Duo đúng nghĩa",        desc: "Cùng chơi sáu game khác nhau." },
      { icon: "🌾", title: "Làm cặp vợ chồng tiều phu đốn gỗ",    desc: "Chung một ngọn đồi." },
      { icon: "🎬", title: "Khán giả duy nhất",     desc: "Cùng xem phim, bình luận suốt buổi." },
      { icon: "🌙", title: "Cú đêm",                desc: "“Thêm một ván nữa thôi”, lần thứ n." },
      { icon: "🏷️", title: "Vợ chồng (trong game)", desc: "Gọi nhau như vậy suốt. Chỉ là đùa thôi." },
      { icon: "🕊️", title: "Hòa giải thành công",   desc: "Giận nhau xong vẫn bật game rủ chơi tiếp." }
    ]
  },

  // --- Vài con số ------------------------------------------------------------------------
  // value: số bất kỳ, hoặc "@days" (tự tính số ngày) / "@games" (tự đếm số game).  SỬA các số cho đúng.
  stats: {
    title: "Vài con số cho vui",
    intro: "Không chính xác tuyệt đối. Nhưng đủ để thấy tụi mình dành khá nhiều thời gian cho nhau.",
    items: [
      { label: "ngày quen nhau",    value: "@days" },
      { label: "game đã cùng chơi", value: "@games" },
      { label: "bộ phim đã xem",    value: 2 },
      { label: "lần giận nhau",     value: 3 },
      { label: "lần làm hòa",       value: 3 }
    ],
    note: "Tỉ số giận và hòa: 3 – 3. Hòa."
  },

  // --- Màn cuối: cần hai người mới mở được ---------------------------------------------
  coop: {
    title: "Phần cuối cần có hai người",
    intro: "Giống It Takes Two: một mình thì không mở được.",
    idle: "Đang chờ hai người sẵn sàng…",
    waiting: "Còn thiếu một người…",
    holding: "Giữ nguyên…",
    done: "Đã mở khóa",
    hintTouch: "Dùng hai ngón tay, giữ cả hai nút cùng lúc.",
    hintMouse: "Bấm vào từng nút để “sẵn sàng” (hoặc giữ phím F và J)."
  },

  // --- Thư cuối (hiện ra sau khi mở khóa). SỬA cho đúng giọng của bạn, đổi "bạn/mình" thành "anh/em", "tớ/cậu"... tùy ý
  letter: {
    greeting: "Gửi {her},",
    body: [
      "Hai tháng trước, tui chỉ định chơi một trận cho vui. Vậy mà giờ lịch chơi game của tui lúc này chỉ còn Châu mà thôi.",
      "Cảm ơn vì những buổi tối cười đến quên cả thắng thua. Cảm ơn vì những lần giận nhau làm mình hiểu nhau hơn dù nó làm Châu buồn, tui cũng buồn. Và cảm ơn vì đã chịu đựng mình mỗi khi tui khó chịu vô lý.",
      "Tui không rành đặt tên cho mấy thứ này. Bạn bè thì chắc chắn rồi, còn phần còn lại cứ để đó, chưa cần vội. Như hai người chơi chung một màn dài: chưa thấy boss cuối, nhưng cũng chẳng ai muốn bấm thoát.",
      "Nên là… hai tháng nữa, rồi hai tháng nữa nhé.."
    ],
    sign: "{me}",
    ps: "P.S. Vợ ơi, tối nay chơi gì? (đùa thôi 😏)"
  },

  footer: "Trang này được làm ra chỉ để nói một câu: cảm ơn vì hai tháng vừa rồi.",
  toTop: "Về đầu trang"
};
