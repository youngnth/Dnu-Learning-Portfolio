'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Send } from 'lucide-react';

export default function SwatchRequestSection() {
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Tây Hồ');
  const [familyType, setFamilyType] = useState('Cả trẻ nhỏ và thú cưng');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#52624f] text-[#f7f3ec]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f7f3ec]/15 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Dịch vụ miễn phí tại Hà Nội
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-white">
            Nhận hộp 8 mẫu vải chống cào &amp; trượt nước miễn phí tại nhà
          </h2>
          <p className="text-sm sm:text-base text-[#e3dfd7] leading-relaxed">
            Đừng chỉ nhìn qua màn hình. Perfa gửi tặng tận nhà bạn tại Hà Nội hộp mẫu gồm 4 chất liệu vải/da và 6 sắc màu chủ đạo để bạn tự tay thử đổ sữa, cà phê hoặc cho mèo cưng cào thử ngay dưới ánh sáng phòng khách nhà mình.
          </p>
          <ul className="space-y-2.5 text-sm text-[#e8ece7]">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#b5d6b0] shrink-0" />
              <span>Giao miễn phí trong 24h tại tất cả các quận nội thành Hà Nội</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#b5d6b0] shrink-0" />
              <span>Kèm thước dây đo diện tích &amp; cẩm nang chọn sofa cho nhà có bé</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#b5d6b0] shrink-0" />
              <span>Hoàn toàn miễn phí, không ràng buộc mua hàng</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-6">
          <div className="bg-[#f7f3ec] text-[#2c352b] rounded-3xl p-6 sm:p-8 shadow-xl">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#52624f]/15 text-[#52624f] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2c352b]">
                  Đã ghi nhận yêu cầu của {fullName}!
                </h3>
                <p className="text-sm text-[#586156] max-w-md mx-auto leading-relaxed">
                  Chuyên viên tư vấn Perfa tại Tây Hồ sẽ liên hệ qua số{' '}
                  <strong>{phone}</strong> trong vòng 2 giờ tới để gửi hộp mẫu vải về khu vực{' '}
                  <strong>{district}, Hà Nội</strong> cho gia đình bạn.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFullName('');
                    setPhone('');
                  }}
                  className="text-xs font-semibold text-[#52624f] underline cursor-pointer"
                >
                  Đăng ký thêm địa chỉ khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2c352b]">
                  Đăng ký nhận hộp mẫu vải Perfa
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="swatch-name"
                      className="block text-xs font-semibold text-[#3f473e] mb-1.5"
                    >
                      Họ và tên của bạn *
                    </label>
                    <input
                      id="swatch-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Minh Anh"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#52624f]/25 text-sm focus:outline-none focus:ring-2 focus:ring-[#52624f]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="swatch-phone"
                      className="block text-xs font-semibold text-[#3f473e] mb-1.5"
                    >
                      Số điện thoại nhận mẫu *
                    </label>
                    <input
                      id="swatch-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09xx xxx xxx"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#52624f]/25 text-sm focus:outline-none focus:ring-2 focus:ring-[#52624f]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="swatch-district"
                      className="block text-xs font-semibold text-[#3f473e] mb-1.5"
                    >
                      Quận / Khu đô thị tại Hà Nội
                    </label>
                    <select
                      id="swatch-district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#52624f]/25 text-sm focus:outline-none focus:ring-2 focus:ring-[#52624f]"
                    >
                      <option value="Tây Hồ">Quận Tây Hồ / Ciputra</option>
                      <option value="Cầu Giấy">Quận Cầu Giấy</option>
                      <option value="Nam Từ Liêm">Nam Từ Liêm / Vinhomes Smart City</option>
                      <option value="Ba Đình">Quận Ba Đình</option>
                      <option value="Đống Đa">Quận Đống Đa</option>
                      <option value="Hai Bà Trưng">Hai Bà Trưng / Times City</option>
                      <option value="Thanh Xuân">Quận Thanh Xuân</option>
                      <option value="Long Biên / Gia Lâm">Long Biên / Vinhomes Ocean Park</option>
                      <option value="Hoàng Mai / Hà Đông">Hoàng Mai / Hà Đông</option>
                      <option value="Ecopark">Khu đô thị Ecopark</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="swatch-family"
                      className="block text-xs font-semibold text-[#3f473e] mb-1.5"
                    >
                      Thành viên đặc biệt trong nhà
                    </label>
                    <select
                      id="swatch-family"
                      value={familyType}
                      onChange={(e) => setFamilyType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#52624f]/25 text-sm focus:outline-none focus:ring-2 focus:ring-[#52624f]"
                    >
                      <option value="Cả trẻ nhỏ và thú cưng">Cả trẻ nhỏ và thú cưng</option>
                      <option value="Có em bé / trẻ nhỏ dưới 6 tuổi">Có em bé / trẻ nhỏ dưới 6 tuổi</option>
                      <option value="Nuôi mèo (cần chống cào cao)">Nuôi mèo (cần chống cào cao)</option>
                      <option value="Nuôi cún (cần chống thấm & bám lông)">Nuôi cún (cần chống thấm &amp; bám lông)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#52624f] text-[#f7f3ec] font-semibold text-sm hover:bg-[#3f4d3d] transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi hộp mẫu vải miễn phí cho tôi</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
