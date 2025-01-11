import Head from 'next/head';
import Button from '@/components/button';
import FeatureCard from '@/components/featurecard';
import InfoCard from '@/components/infocard';
import SectionTitle from '@/components/sectiontitle';
import StatsCard from '@/components/statscard';
import Footer from '@/components/footer.tsx';
import { NextPage } from 'next';


const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Patriarch - Family Management Solution</title>
                <meta name="description" content="Family management app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="font-sans">
                <section className="py-24 bg-secondary">
                    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
                        <div className="md:w-1/2 text-center md:text-left">
                            <h1 className="text-5xl font-bold text-gray-800 mb-4">Patriarch</h1>
                            <h2 className="text-2xl text-gray-500 mb-8">Giải pháp quản lý gia đình</h2>
                            <p className="text-gray-500 mb-8">Giải pháp cho người gia trưởng quản lý gia đình một cách dễ dàng</p>
                            <Button>Đăng ký</Button>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            <img src="/images/hero-image.png" alt="Hero" className="w-full max-w-md" />
                        </div>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container mx-auto px-4">
                        <SectionTitle title="Khách hàng của chúng tôi" subtitle="Khách hàng chúng tôi bao gồm hàng nghìn hộ gia đình ở Việt Nam" />
                        <SectionTitle title="Quản lý gia đình của bạn chỉ bằng một ứng dụng" subtitle="Các chức năng của Patriarch gồm những gì?" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<img src="/images/calendar-icon.png" alt="calendar" className="w-10 h-10" />}
                                title="Quản lý lịch trình"
                                description="Patriarch cho phép các thành viên trong gia đình tạo, chia sẻ và quản lý lịch trình chung, bao gồm các sự kiện như sinh nhật, họp mặt, hoạt động ngoại khóa, hoặc lịch công việc cá nhân."
                            />
                            <FeatureCard
                                icon={<img src="/images/shopping-icon.png" alt="shopping" className="w-10 h-10" />}
                                title="Quản lý mua sắm và chi tiêu"
                                description="Patriarch cung cấp khả năng tạo và quản lý các món hàng cần mua, tích hợp với hệ thống gợi ý các nhu yếu phẩm có thể cần thiết, đồng thời giúp người dùng giám sát và quản lý chi tiêu của gia đình một cách hiệu quả."
                            />
                            <FeatureCard
                                icon={<img src="/images/chat-icon.png" alt="chat" className="w-10 h-10" />}
                                title="Gặp gỡ và trò chuyện"
                                description="Patriarch cung cấp giải pháp giao tiếp toàn diện, cho phép tất cả các hình thức tương tác giữa các thành viên trong gia đình, bao gồm: trò chuyện (chat), gọi video chất lượng cao qua Wi-Fi, tạo và phân công công việc, lịch nhắc nhở chung và chia sẻ thông tin."
                            />
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-gray-100">
                    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-12">
                        <img src="/images/secure-image.png" alt="Secure" className="w-full md:w-1/3" />
                        <div className="md:w-1/2 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Bảo mật thông tin và cung cấp công cụ quản lý cho từng thành viên</h2>
                            <p className="text-gray-400 mb-8">Chúng tôi cho phép từng thành viên trong gia đình được giao tiếp với nhau, đồng thời bảo đảm sự bảo mật của từng thành viên. Ngoài ra các thành viên cũng có thể chia sẻ thông tin cho nhau đảm bảo cho nhu cầu của mọi người.</p>
                            <Button>Xem thêm</Button>
                        </div>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container mx-auto px-4">
                        <SectionTitle title="Hỗ trợ cho rất nhiều gia đình trên toàn thế giới" subtitle="Chúng tôi đã đạt được qua những thử thách khó khăn" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <StatsCard
                                icon={<img src="/images/users-icon.png" alt="users" className="w-8 h-8" />}
                                value="2,245,341"
                                label="Người dùng"
                            />
                            <StatsCard
                                icon={<img src="/images/collab-icon.png" alt="collab" className="w-8 h-8" />}
                                value="46,328"
                                label="Cộng tác viên"
                            />
                            <StatsCard
                                icon={<img src="/images/home-icon.png" alt="home" className="w-8 h-8" />}
                                value="828,867"
                                label="Hộ gia đình"
                            />
                            <StatsCard
                                icon={<img src="/images/card-icon.png" alt="card" className="w-8 h-8" />}
                                value="1,926,436"
                                label="Quản lý chi tiêu"
                            />
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <SectionTitle title="Quản lý gia đình chính là chìa khóa cho thành công" subtitle="Ứng dụng quản lý gia đình có thể là chìa khóa cho thành công của gia đình bạn. Chúng tôi giúp bạn quản lý những vấn đề của gia đình. Những công cụ này không chỉ giúp cho bạn mà còn giúp gia đình duy trì sự cân bằng trong cuộc sống. Bạn có thể quản lý lịch trình và chi tiêu dễ dàng giúp tiết kiệm thời gian." />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <InfoCard
                                imageSrc="/images/info1.png"
                                title="Giúp tiết kiệm thời gian và công sức để quản lý gia đình"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                linkText="Đọc thêm"
                                linkHref="#"
                            />
                            <InfoCard
                                imageSrc="/images/info2.png"
                                title="Dễ dàng truy cập và sử dụng qua trang web"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                linkText="Đọc thêm"
                                linkHref="#"
                            />
                            <InfoCard
                                imageSrc="/images/info3.png"
                                title="Nâng cao hiệu suất công việc và cuộc sống"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                linkText="Đọc thêm"
                                linkHref="#"
                            />
                        </div>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold text-gray-800 mb-8">Hãy thử ngay bây giờ</h2>
                        <Button>Thử ngay →</Button>
                    </div>
                </section>

                <Footer />
            </main>
        </div>
    );
};

export default Home;