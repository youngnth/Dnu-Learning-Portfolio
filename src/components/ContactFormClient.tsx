'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactFormClient() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState(
    'Đặt lịch ghé Showroom Tây Hồ ngồi thử sofa'
  );
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-[#52624f]/20 shadow-xs text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#52624f]/15 text-[#52624f] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#2c352b]">
          Cảm ơn {name}, Perfa đã nhận được lịch hẹn!
        </h3>
        <p className="text-sm text-[#586156] max-w-md mx-auto leading-relaxed">
          Chuyên viên tư vấn tại Showroom 68 Tô Ngọc Vân sẽ gọi xác nhận qua số{' '}
          <strong>{phone}</strong> trong ít phút nữa để chuẩn bị sẵn mẫu vải cho gia đình bạn.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setName('');
            setPhone('');
            setMessage('');
          }}
          className="text-xs font-semibold text-[#52624f] underline cursor-pointer"
        >
          Gửi một yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 sm:p-8 border border-[#52624f]/15 shadow-xs space-y-5"
    >
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#2c352b]">
          Đặt lịch hẹn trải nghiệm hoặc Tư vấn tại nhà
        </h2>
        <p className="text-xs sm:text-sm text-[#586156] mt-1">
          Điền thông tin bên dưới, đội ngũ Perfa Hà Nội sẽ phản hồi trong vòng 30 phút.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold text-[#3c443a] mb-1.5"
          >
            Họ và tên của bạn *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Trần Thu Hà"
            className="w-full px-4 py-3 rounded-xl bg-[#f7f3ec] border border-[#52624f]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#52624f]"
          />
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-semibold text-[#3c443a] mb-1.5"
          >
            Số điện thoại Zalo / Liên hệ *
          </label>
          <input
            id="contact-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0988 xxx xxx"
            className="w-full px-4 py-3 rounded-xl bg-[#f7f3ec] border border-[#52624f]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#52624f]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-service"
          className="block text-xs font-semibold text-[#3c443a] mb-1.5"
        >
          Nhu cầu bạn đang quan tâm
        </label>
        <select
          id="contact-service"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#f7f3ec] border border-[#52624f]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#52624f]"
        >
          <option value="Đặt lịch ghé Showroom Tây Hồ ngồi thử sofa">
            Đặt lịch ghé Showroom Tây Hồ ngồi thử sofa
          </option>
          <option value="Yêu cầu mang mẫu vải & đo đạc tận căn hộ tại Hà Nội">
            Yêu cầu mang mẫu vải &amp; đo đạc tận căn hộ tại Hà Nội (Miễn phí)
          </option>
          <option value="Đặt đóng sofa theo kích thước riêng">
            Đặt đóng sofa theo kích thước riêng
          </option>
          <option value="Đặt lịch Spa giặt sofa sinh học Perfa Care">
            Đặt lịch Spa giặt sofa sinh học Perfa Care
          </option>
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-semibold text-[#3c443a] mb-1.5"
        >
          Chia sẻ thêm về không gian phòng khách của bạn (Diện tích, khu chung cư, có bé/thú cưng...)
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ví dụ: Phòng khách nhà mình ở Vinhomes Ocean Park rộng khoảng 16m², nhà có bé 18 tháng tuổi và nuôi 1 bé mèo Anh lông ngắn..."
          className="w-full px-4 py-3 rounded-xl bg-[#f7f3ec] border border-[#52624f]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#52624f]"
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 px-6 rounded-2xl bg-[#52624f] text-[#f7f3ec] font-semibold text-sm sm:text-base hover:bg-[#3f4d3d] transition flex items-center justify-center gap-2 cursor-pointer"
      >
        <Send className="w-4 h-4" />
        <span>Gửi yêu cầu tới Perfa Hà Nội</span>
      </button>
    </form>
  );
}
