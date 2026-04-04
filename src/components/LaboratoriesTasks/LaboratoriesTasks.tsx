import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import institutImage from '@/assets/institut.png';
import SectionHeader from '@/components/shared/SectionHeader/SectionHeader';

const LaboratoriesTasks: React.FC = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const tasks: string[] = [
    "Seysmik faol hududlarda quriladigan aktiv seysmik himoyalash qurilmalariga ega bo'lgan va ega bo'lmagan yuqori qavatli binolarning konstruktiv o'ziga xosliklarini inobatga olgan holda seysmik mustahkamligini hisoblash usullarini takomillashtirish.",
    "Bino va inshootlarning texnik holatini monitoring qilishning ilmiy asoslarini yaratish bo'yicha tadqiqotlar o'tkazish. Zilzilalarda bino va inshootlarning shikastlanish darajasini baholash hamda ilmiy hajmdor ishlanmalarni ishlab chiqish.",
    "Bino va inshootlarni seysmik himoyalash uslublarini, yangi konstruktiv yechimlarni hamda ko'p qavatli bino va inshootlarning seysmik xatarini baholash metodikasini ishlab chiqish.",
    "Bino va inshootlarning zilzilabardoshlik bo'yicha texnik holatini baholashning zamonaviy uslublarini ishlab chiqish, shuningdek, ularning texnik holatini tadqiq qilish, barcha turdagi bino va inshootlarni instrumental-texnik tekshiruvdan o'tkazish.",
    "Grunt bilan o'zaro ta'sirni va konstruktiv o'ziga xosliklarni hisobga olgan holda yerosti va yerusti inshootlari zilzilabardoshligi nazariyalarini rivojlantirish.",
    "Gruntlar mexanikasi va geotexnika tadqiqotlarini rivojlantirish, qurilish materiallarini tajribalar orqali sinash.",
    "Suv omborlarining texnik holatiga ta'sir etuvchi turli omillarni inobatga olgan holda uning seysmik mustahkamligini aniqlashga qaratilgan tadqiqotlar olib borish.",
    "Yangi qurilish materiallarining fizik-mexanik xossalarini, konstruksiyalar mustahkamligini tadqiq qilish hamda olingan natijalar asosida amaldagi texnik jihatdan tartibga solish sohasidagi normativ hujjatlarni takomillashtirish bo'yicha takliflar ishlab chiqish.",
    "\"Yashil\" qurilish texnologiyalarini amaliyotga joriy etish. Qurilishda energiya tejamkor materiallar va uslublardan foydalanishni tadqiq qilish. Muqobil energiya manbalaridan (quyosh, shamol, biomassa va boshqalar) foydalanish bo'yicha ilmiy izlanishlar olib borish.",
    "Energiya samaradorligini oshirishga qaratilgan texnologiyalarni sinovdan o'tkazish. \"Yashil\" qurilish standartlari va normativlarini ishlab chiqishda ishtirok etish. Ekologik barqarorlikni ta'minlashga xizmat qiluvchi loyihalarni ishlab chiqish va tadqiq etish.",
    "Qurilish sohasida sun'iy intellekt texnologiyalaridan foydalanish va raqamli qurilishni rivojlantirish, barqaror konstruktiv yechimlar olish bo'yicha tadqiqotlar o'tkazish.",
    "Barqaror konstruktiv tizimlar bo'yicha tadqiqot olib borish, shaharsozlik tizimlari va infratuzilmani rivojlantirish bo'yicha dasturlar tayyorlash.",
    "Yerosti va yerusti shaharsozligi va infratuzilma muammolarini yechishga qaratilgan ilmiy takliflar ishlab chiqish.",
    "Qurilishda texnik jihatdan tartibga solish sohasidagi normativ hujjatlarni yangi ishlanmalar va yuqori texnologiyalarni inobatga olgan holda takomillashtirish bo'yicha tavsiyalar ishlab chiqish.",
    "Respublika aholisi va hududining seysmik xavfsizligini ta'minlash, o'rta va uzoq istiqbolda bino va inshootlar hamda muhandislik infratuzilmalarini seysmik xavfdan himoya qilishning strategik yo'nalishlarida dasturlarni tayyorlashda ishtirok etish.",
    "Sohada fan va ta'lim integratsiyasini ta'minlash maqsadida o'quv dasturlari va uslubiy qo'llanmalar hamda monografiyalar tayyorlash, yuqori malakali kadrlar tayyorlashda, kadrlar malakasini oshirish va qayta tayyorlashda ishtirok etish.",
    "Ilmiy tadqiqotlar va innovatsion ishlanmalarning natijalarini tijoratlashtirish.",
    "Xalqaro ilmiy-texnik hamkorlikni rivojlantirish, chet el universitetlari, ilmiy-tadqiqot markazlari va institutlari bilan qo'shma tadqiqotlarda ishtirok etish, tegishli ilmiy yo'nalishlar va ixtisosliklar bo'yicha ilmiy darajali kadrlar tayyorlash.",
  ];

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % tasks.length);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + tasks.length) % tasks.length);
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <SectionHeader
            title={'Seysmik xavfsizlik va barqaror qurilish'}
            subtitle={'Milliy tadqiqot instituti laboratoriyalarining asosiy vazifalari'}
          />
        </div>

        <div className="grid grid-cols-1 border border-gray-200 rounded p-4 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <img
              src={institutImage}
              alt="Laboratoriya"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side - Slider */}
          <div className="relative">
            {/* Slider Container */}
            <div className="relative p-8 h-[400px] md:h-[500px] overflow-hidden bg-gray-50">
              <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {tasks.map((task, index) => (
                  <div
                    key={index}
                    className="min-w-full px-8 py-6 flex flex-col justify-center"
                  >
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-[#013d8c]">
                        {index + 1}.
                      </span>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {task}
                    </p>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#013d8c] p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#013d8c] p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {tasks.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                        ? 'bg-[#013d8c] w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaboratoriesTasks;
