<script setup>
import { PhotoService } from '@/service/PhotoService';
import { ProductService } from '@/service/ProductService';
import { onMounted, ref, watch } from 'vue';

const products = ref([]);
const images = ref([]);
const galleriaResponsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '960px',
        numVisible: 4
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
]);
const carouselResponsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
]);
const { locale } = useI18n()

onMounted(() => {
    ProductService.getProductsSmall().then((data) => (products.value = data));
    PhotoService.getImages().then((data) => (images.value = data));
});

var text = {
    "header" : "Возобновление работы Mel Coin. Вся хронология событий",
    "header_small_text": "Два месяца назад мы приостановили работу Mel Coin и приём инвестиций. Мы оттягивали это решение до последнего в надежде, что что-то поменяется. Однако, чем больше мы тянули, тем хуже было для пользователей и для нас. Рассказываем, что к этому привело, почему мы просто не закрыли проект, с чего всё началось и что будет дальше.",
    "text1":"Начало UNTIME",
    "text2":"Мы хотим начать издалеко. Это очень важно, чтобы вы поняли нас и захотели сотрудничать дальше.",
    "text3":"Мы основали компанию UNTIME осенью 2022 года.",
    "text3_1":"Изначально компания была создана с целью привлечь инвестиции на создание своих продуктов, которые позволили бы зарабатывать, продавая подписки на наши сервисы.",
    "text4":"На тот момент эта была наша идея. Мы хотели создавать по-настоящему полезные и классные продукты.",
    "text5":'Мы хотели создавать продукты, чтобы их монетизировать и делиться частью дохода с нашими инвесторами.',
    "text5_1":'Мы хотели создавать продукты, чтобы их монетизировать и делиться частью дохода с нашими инвесторами.',
    "text6":'Многие помнят, что тогда мы выпустили два продукта: бот по поиску и продаже недвижимости в телеграме, который оказался очень полезным и перспективным. И бот по поиску обменников.',
    "text7":'Нам удалось привлечь >10 000 пользователей на наши продукты, благодаря рекламе. Даже после закрытия ботов люди как-то находили наши сервисы и продолжали регистрироваться. Это говорит о том, что мы выбрали правильное направление.',
    "text8":'Затем что-то пошло не так. Когда мы поняли, что компания стремится к банкротству, то попробовали создать свой криптоагрегатор UNCHANGE и анонсировали создание других продуктов. Мы подумали, что это будет интересно нашим пользователям и мы сможем привлечь инвестиции на дальнейшее развитие продуктов и компании.',
    "text9":'Однако людям это было не интересно.',
    "text9_1":'Все хотели быстрого заработка с большими процентами. Тогда ситуация стала кризисной.',
    "text10":'Чтобы выйти из этой ситуации, нам пришлось опросить лидеров и спросить, что бы мы могли сделать, чтобы выправить сложившуюся ситуация. Тогда мы сделали Mel Coin и открыли людям новую возможность заработка.',
    "text11":'Почему Mel Coin был остановлен?',
    "text12":'Mel Coin был внутренней валютой компании UNTIME.',
    "text12_1":'Мы определяли курс самостоятельно, ориентируясь на придуманные нами формулы для расчёта курса. Это позволяло делать так, чтобы пользователи оставались довольны токеном и магазином техники.',
    "text13":'Проблема была в том, что и сам Mel Coin мы покупали у пользователей за свои деньги. Каждый мог продать токен в любой момент и мы были обязаны заплатить человеку за его продажу.',
    "text14":'К сожалению, такая стратегия привела к кассовому разрыву и кризисной ситуации в компании. Нам не хватало денег на выплаты и развитие проекта. Если бы мы продолжали так делать, пользователи не получили бы своих денег, а мы бы остались ни с чем.',
    "text15":'Ситуация могла бы быть другой, если бы Mel Coin изначально был на бирже.',
    "text15_1":'Тогда люди покупали и продавали его между собой, снимая с нас обязательства по выплатам. А мы бы, в свою очередь, могли уделить больше внимания созданию нашей экосистемы, привлечению новых пользователей и развитию токена, как продукта.',
    "text16":'Увы, но нам показалось, что сделать Mel Coin внутренней валютой — это хорошая идея, которая позволит привлечь больше пользователей в начале пути и открыть возможность превратить Mel Coin в нечто большее.',
    "text17":'Во-первых, мы могли влиять на токен сами и таким образом побуждать пользователей покупать его. Во-вторых, большинство наших пользователей не знает, как пользоваться биржами и криптовалютой, поэтому мы хотели упростить процесс покупки и продажи.',
    "text18":'К сожалению, наши прогнозы оказались неверными. Отчасти, наше фиаско связано с тем, что многие лидеры не могли донести партнёрам ценность нашего токена. Отчасти — что мы сделали токен со сложной механикой. Из-за этого людям было трудно понять его выгоду.',
    "text19":'По правде сказать, мы всё ещё считаем, что Mel Coin был одним из самых выгодных и лучших продуктов на рынке.',
    "text19_1":'Его курс вырос с 0,4 до 1,16$ всего за несколько месяцев. Он позволял покупать технику и получать до 100% кешбека. А ещё у нас было несколько тарифов, которые позволяли зарабатывать до 15% в месяц!',
    "text20":'Но мы приняли решение, которое позволит пользователям получить назад их вложения, а нам — существовать дальше и развивать проект.',
    "text21":'Решение',
    "text22":'Переход на блокчейн',
    "text23":'Переход Mel Coin на блокчейн позволит нашей компании существовать дальше и возобновить выплаты. Вы сможете зарабатывать честным способом и быть уверенным, что вы двигаетесь в верном направлении.',
    "text24":'Этот открывает несколько преимуществ:',
    "text25":'Если вы захотите продать токен, его купит другой пользователь. Это позволит вам быть уверенным в том, что вы точно заработаете и никто не сможет приостановить выплаты.',
    "text26":'Mel Coin станет полноценной валютой. Это заинтересует большую аудиторию и поднимет наш проект в глазах других людей. Мы сможем привлечь больше пользователей и больше покупателей для вас.',
    "text27":'Курс токена никто не сможет поменять. Отныне цена Mel Coin будет справедливо оцениваться биржами и автоматически. Его курс будет зависеть от востребованности и каждый сможет видеть, как он меняется.',
    "text28":'Блокчейн позволит вам не переживать за ваши финансы. Никто и никогда не заберёт ваши деньги. Все пользователи могут видеть транзакции друг друга и никто и никогда вас не обманет.',
    "text29":'Отказ от высокодоходных инвестиций',
    "text30":'Раньше мы предлагали пользователям большие тарифы по инвестициям. Любой мог зарабатывать до 15% в месяц чистыми, а затем ещё и на продаже токена, в зависимости от курса. Но такой способ губителен для компаний: в конечном итоге мы не смогли бы со всеми расплатиться и точно закрылись бы.',
    "text31":'Новый личный кабинет',
    "text32":'Старый кабинет мог местами работать медленно или просто вас выкидывать. Новый кабинет будет быстрее, технологичнее и приятнее. Наши программисты сделали так, чтобы вам было приятно им пользоваться.',
    "text33":'Дальнейшее развитие',
    "text34":'В наших планах — дальше развивать Mel Coin, чтобы наши пользователи и инвесторы остались довольны.',
    "text35":'Мы хотим создать из Mel Coin полноценный криптопроект, экосистему и привлечь очень много держателей.',
    "text36":'Скоро мы опубликуем дорожную карту и покажем наши планы. Следите за новостями в блоге, чтобы ничего не пропустить: https://t.me/untime_blog',
}

watch(locale,()=>{
  if(locale.value == 'uk'){
    text = {
      "header": "Поновлення роботи Mel Coin. Вся хронологія подій",
      "header_small_text": "Два місяці тому ми призупинили роботу Mel Coin та прийом інвестицій. Ми відтягували це рішення до останнього в надії, що щось зміниться. Але чим більше ми відтягували, тим гірше це було для користувачів і для нас. Розповідаємо, що привело до цього, чому ми просто не закрили проект, з чого все почалося і що буде далі.",
      "text1": "Початок UNTIME",
      "text2": "Ми хочемо почати здалеку. Це дуже важливо, щоб ви зрозуміли нас і захотіли співпрацювати далі.",
      "text3": "Ми заснували компанію UNTIME восени 2022 року.",
      "text3_1": "Спочатку компанія була створена з метою залучення інвестицій на створення своїх продуктів, які дозволили б заробляти, продавши підписки на наші сервіси.",
      "text4": "На той момент це була наша ідея. Ми хотіли створювати справжньо корисні і класні продукти.",
      "text5": "Ми хотіли створювати продукти, щоб їх монетизувати і ділитися частиною прибутку з нашими інвесторами.",
      "text5_1": "Ми хотіли створювати продукти, щоб їх монетизувати і ділитися частиною прибутку з нашими інвесторами.",
      "text6": "Багато хто пам'ятає, що тоді ми випустили два продукти: бот для пошуку та продажу нерухомості в телеграмі, який виявився дуже корисним і перспективним. І бот для пошуку обмінників.",
      "text7": "Нам вдалося залучити понад 10 000 користувачів на наші продукти завдяки рекламі. Навіть після закриття ботів люди якось знаходили наші сервіси і продовжували реєструватися. Це свідчить про те, що ми обрали правильний напрямок.",
      "text8": "Потім щось пішло не так. Коли ми зрозуміли, що компанія рухається до банкрутства, то спробували створити свій криптоагрегатор UNCHANGE та анонсували створення інших продуктів. Ми подумали, що це буде цікаво нашим користувачам і ми зможемо залучити інвестиції на подальший розвиток продуктів і компанії.",
      "text9": "Проте людям це було не цікаво.",
      "text9_1": "Всі хотіли швидкого заробітку з великими відсотками. Тоді ситуація стала кризовою.",
      "text10": "Щоб вийти з цієї ситуації, нам довелося опитати лідерів та запитати, що б ми могли зробити, щоб виправити складену ситуацію. Тоді ми створили Mel Coin і відкрили людям нову можливість заробляти.",
      "text11": "Чому Mel Coin було зупинено?",
      "text12": "Mel Coin був внутрішньою валютою компанії UNTIME.",
      "text12_1": "Ми визначали курс самостійно, орієнтуючись на придумані нами формули для розрахунку курсу. Це дозволяло робити так, щоб користувачі залишалися задоволені токеном та магазином техніки.",
      "text13": "Проблема полягала в тому, що і сам Mel Coin ми купували у користувачів за свої гроші. Кожен міг продати токен у будь-який момент і ми були зобов'язані заплатити людині за його продаж.",
      "text14": "На жаль, така стратегія призвела до касового розриву та кризової ситуації в компанії. Нам не вистачало грошей на виплати та розвиток проекта. Якби ми продовжували так робити, користувачі не отримали б свої гроші, а ми залишилися б ні з чим.",
      "text15": "Ситуація могла б бути іншою, якби Mel Coin спочатку був на біржі.",
      "text15_1": "Тоді люди купували і продавали його між собою, знімаючи з нас зобов'язання щодо виплат. А ми, зі свого боку, могли більше уваги приділити створенню нашої екосистеми, залученню нових користувачів та розвитку токена як продукта.",
      "text16": "На жаль, але нам здалося, що зробити Mel Coin внутрішньою валютою — це гарна ідея, яка дозволить залучити більше користувачів на початку шляху і відкрити можливість перетворити Mel Coin в щось більше.",
      "text17": "По-перше, ми могли впливати на токен самі і таким чином підштовхувати користувачів купувати його. По-друге, більшість наших користувачів не знає, як користуватися біржами та криптовалютою, тому ми хотіли спростити процес купівлі та продажу.",
      "text18": "На жаль, наші передбачення виявилися хибними. Частково наше фіаско пов'язане з тим, що багато лідерів не могли донести партнерам цінність нашого токена. Частково — що ми зробили токен зі складною механікою. Через це людям було важко зрозуміти його вигоду.",
      "text19": "По правді кажучи, ми все ще вважаємо, що Mel Coin був одним з найвигідніших і найкращих продуктів на ринку.",
      "text19_1": "Його курс зріс з 0,4 до 1,16$ всього за кілька місяців. Він дозволяв купувати техніку та отримувати до 100% кешбеку. А ще у нас було декілька тарифів, які дозволяли заробляти до 15% на місяць!",
      "text20": "Але ми прийняли рішення, яке дозволить користувачам отримати назад їх вкладення, а нам — існувати далі та розвивати проект.",
      "text21": "Рішення",
      "text22": "Перехід на блокчейн",
      "text23": "Перехід Mel Coin на блокчейн дозволить нашій компанії існувати далі та відновити виплати. Ви зможете заробляти чесним способом та бути впевненими, що ви рухаєтеся в правильному напрямку.",
      "text24": "Це відкриває кілька переваг:",
      "text25": "Якщо ви захочете продати токен, його купить інший користувач. Це дозволить вам бути впевненими, що ви точно заробите і ніхто не зможе призупинити виплати.",
      "text26": "Mel Coin стане повноцінною валютою. Це зацікавить велику аудиторію та підніме наш проект в очах інших людей. Ми зможемо залучити більше користувачів і більше покупців для вас.",
      "text27": "Курс токена ніхто не зможе змінити. Відтепер ціна Mel Coin буде справедливо оцінюватися біржами та автоматично. Його курс буде залежати від попиту і кожен зможе бачити, як він змінюється.",
      "text28": "Блокчейн дозволить вам не переживати за ваші фінанси. Ніхто і ніколи не забере ваші гроші. Всі користувачі можуть бачити транзакції один одного і ніхто і ніколи вас не обмане.",
      "text29": "Відмова від високоприбуткових інвестицій",
      "text30": "Раніше ми запропонували користувачам великі тарифи на інвестиції. Будь-хто міг заробляти до 15% на місяць чистими, а потім ще і на продажі токена, залежно від курсу. Але такий спосіб шкідливий для компаній: в кінцевому підсумку ми не могли б з усіма розрахуватися і точно закрилися б.",
      "text31": "Новий особистий кабінет",
      "text32": "Старий кабінет місцями працював повільно або просто вас викидав. Новий кабінет буде швидшим, технологічнішим і приємнішим. Наші програмісти зробили так, щоб вам було приємно ним користуватися.",
      "text33": "Подальший розвиток",
      "text34": "В наших планах — подальший розвиток Mel Coin, щоб наші користувачі та інвестори залишилися задоволеними.",
      "text35": "Ми хочемо створити з Mel Coin повноцінний криптопроект, екосистему та залучити дуже багато власників.",
      "text36": "Скоро ми опублікуємо дорожню карту і покажемо наші плани. Слідкуйте за новинами в блозі, щоб нічого не пропустити: https://t.me/untime_blog"
    }
  }

  if(locale._value == 'en') {
    text = {
      "header": "Resumption of Mel Coin Operations: A Chronology of Events",
      "header_small_text": "Two months ago, we suspended Mel Coin operations and investment acceptance. We delayed this decision as much as we could, hoping for a change. However, the longer we waited, the worse it became for both users and us. We're here to explain what led to this, why we didn't simply close the project, where it all began, and what lies ahead.",
      "text1": "The Beginning of UNTIME",
      "text2": "We want to start from the beginning. It's essential for you to understand us and consider further collaboration.",
      "text3": "We founded the company UNTIME in the autumn of 2022.",
      "text3_1": "Initially, the company was created to attract investments for developing our products that would allow us to earn by selling subscriptions to our services.",
      "text4": "At that time, this was our idea. We wanted to create genuinely useful and cool products.",
      "text5": "We wanted to create products to monetize them and share a portion of the income with our investors.",
      "text5_1": "We wanted to create products to monetize them and share a portion of the income with our investors.",
      "text6": "Many remember that we released two products back then: a bot for real estate search and sales on Telegram, which proved to be very useful and promising. And a bot for searching cryptocurrency exchanges.",
      "text7": "We managed to attract more than 10,000 users to our products through advertising. Even after the bots were closed, people somehow found our services and continued to register. This indicates that we chose the right direction.",
      "text8": "Then, something went wrong. When we realized that the company was heading towards bankruptcy, we tried to create our cryptocurrency aggregator UNCHANGE and announced the development of other products. We thought it would be interesting to our users, and we could attract investments for the further development of products and the company.",
      "text9": "However, people weren't interested in this.",
      "text9_1": "Everyone wanted quick earnings with high returns. That's when the situation became critical.",
      "text10": "To get out of this situation, we had to consult with leaders and ask what we could do to rectify the situation. That's when we created Mel Coin and offered people a new way to earn.",
      "text11": "Why Was Mel Coin Halted?",
      "text12": "Mel Coin was the internal currency of the UNTIME company.",
      "text12_1": "We determined the exchange rate independently, based on formulas we came up with for calculating the rate. This allowed us to make sure users were satisfied with the token and the tech store.",
      "text13": "The problem was that we bought Mel Coin from users with our own money. Anyone could sell the token at any time, and we were obligated to pay the person for their sale.",
      "text14": "Unfortunately, this strategy led to a cash flow crisis and a critical situation within the company. We didn't have enough money for payments and project development. If we had continued in this way, users wouldn't have received their money, and we would have been left with nothing.",
      "text15": "The situation could have been different if Mel Coin had been initially listed on a cryptocurrency exchange.",
      "text15_1": "Then people bought and sold it among themselves, relieving us of payment obligations. We, in turn, could have focused more on building our ecosystem, attracting new users, and developing the token as a product.",
      "text16": "Unfortunately, we thought making Mel Coin the internal currency was a good idea, allowing us to attract more users in the early stages and open the opportunity to turn Mel Coin into something greater.",
      "text17": "First, we could influence the token ourselves, encouraging users to buy it. Second, most of our users didn't know how to use exchanges and cryptocurrencies, so we wanted to simplify the buying and selling process.",
      "text18": "Unfortunately, our predictions turned out to be wrong. In part, our failure is due to the fact that many leaders couldn't convey the value of our token to partners. In part, we made the token with a complex mechanism. Because of this, people found it difficult to understand its benefits.",
      "text19": "To be honest, we still believe that Mel Coin was one of the most profitable and best products on the market.",
      "text19_1": "Its price increased from $0.4 to $1.16 in just a few months. It allowed users to buy tech and get up to 100% cashback. We even had several tariff plans that enabled users to earn up to 15% per month!",
      "text20": "But we made a decision that would allow users to get their investments back and us to continue existing and developing the project.",
      "text21": "Decision",
      "text22": "Transition to Blockchain",
      "text23": "Transitioning Mel Coin to the blockchain will allow our company to continue and resume payments. You'll be able to earn in an honest way and be confident that you're moving in the right direction.",
      "text24": "This opens up several advantages:",
      "text25": "If you want to sell the token, another user will buy it. This ensures that you'll definitely earn, and no one can stop the payments.",
      "text26": "Mel Coin will become a full-fledged currency. This will interest a broader audience and raise our project's profile in the eyes of others. We can attract more users and more buyers for you.",
      "text27": "No one can change the token's price. From now on, the price of Mel Coin will be assessed fairly by exchanges and automatically. Its value will depend on demand, and everyone can see how it changes.",
      "text28": "Blockchain will let you not worry about your finances. No one will ever take your money. All users can see each other's transactions, and no one will deceive you.",
      "text29": "Abandoning High-Yield Investments",
      "text30": "Previously, we offered users high investment tariffs. Anyone could earn up to 15% per month, and then more through token sales, depending on the exchange rate. But such a method is detrimental to companies: ultimately, we wouldn't be able to pay everyone and would definitely shut down.",
      "text31": "New User Panel",
      "text32": "The old panel could sometimes work slowly or simply kick you out. The new panel will be faster, more technological, and more user-friendly. Our programmers have made it so that you'll enjoy using it.",
      "text33": "Further Development",
      "text34": "Our plans include further developing Mel Coin to keep our users and investors satisfied.",
      "text35": "We want to turn Mel Coin into a complete crypto project, an ecosystem, and attract many holders.",
      "text36": "Soon, we\'ll publish a roadmap and reveal our plans. Stay tuned for updates on the blog to not miss anything: https://t.me/untime_blog"

    }
  }

  if(locale._value == 'tr') {
    text = {
      "header": "Mel Coin İşine Devam Ediyor. Olayların Tüm Kronolojisi",
      "header_small_text": "İki ay önce Mel Coin'in işine ve yatırım almaya ara verdik. Bu kararı son ana kadar ertelemiştik, umut ederek, bir şeylerin değişeceğini düşünerek. Ancak, ne kadar uzattıkça, kullanıcılar ve bizim için o kadar kötü oldu. Neden böyle olduğunu, neden projeyi sadece kapatmadığımızı, her şeyin nasıl başladığını ve bundan sonrasının ne olacağını anlatıyoruz.",
      "text1": "UNTIME Başlangıcı",
      "text2": "Uzaktan başlamak istiyoruz. Sizi anlamanız ve daha fazla işbirliği istemeniz çok önemlidir.",
      "text3": "UNTIME şirketini 2022 sonbaharında kurduk.",
      "text3_1": "Başlangıçta şirket, hizmetlerimize abonelikler satılarak kazanmamızı sağlayacak ürünlerin yaratılması için yatırım çekmek amacıyla kuruldu.",
      "text4": "O zamanlar bu bizim fikrimizdi. Gerçekten yararlı ve harika ürünler yaratmak istiyorduk.",
      "text5": "Ürünlerimizi oluşturarak gelir elde etmek ve yatırımcılarımızla gelirin bir kısmını paylaşmak istiyorduk.",
      "text5_1": "Ürünlerimizi oluşturarak gelir elde etmek ve yatırımcılarımızla gelirin bir kısmını paylaşmak istiyorduk.",
      "text6": "Birçoğu o zamanlar iki ürün piyasaya sürdüğümüzü hatırlar: Telegram'da emlak arama ve satış botu, oldukça faydalı ve gelecek vadeden bir ürün olduğu ortaya çıktı. Ve döviz değişim botu.",
      "text7": "Reklamlar sayesinde ürünlerimize >10.000 kullanıcı çekmeyi başardık. Botları kapatmamıza rağmen, insanlar nasıl olduğunu bilmeden hala hizmetlerimizi buluyorlardı ve kayıt olmaya devam ediyorlardı. Bu, doğru yöne gittiğimizi gösteriyor.",
      "text8": "Sonra bir şeyler ters gitmeye başladı. Şirketin iflasa sürüklendiğini anladığımızda, UNCHANGE adlı kripto agregatörümüzü oluşturmayı denedik ve diğer ürünleri duyurduk. Bu, kullanıcılarımız için ilginç olacağını düşündük ve ürünlerin ve şirketin gelecekteki gelişimine yatırım çekmeyi umduk.",
      "text9": "Ancak insanlar bunun ilgilerini çekmedi.",
      "text9_1": "Hepsi büyük kazançlarla hızlı para kazanmak istediler. Bu durumda kriz patlak verdi.",
      "text10": "Bu durumdan çıkmak için, liderlere danışmak ve durumu düzeltmek için ne yapabileceğimizi sormak zorunda kaldık. O zaman Mel Coin'i yaptık ve insanlara yeni bir kazanç fırsatı sunduk.",
      "text11": "Mel Coin Neden Durduruldu?",
      "text12": "Mel Coin, UNTIME şirketinin iç parasıydı.",
      "text12_1": "Kurduğumuz kuruşu hesaplamak için kendi formüllerimize dayanarak kursu kendimiz belirliyorduk. Bu, kullanıcıların jeton ve teknik mağaza ile memnun olmalarını sağlamak için yapılmasına izin veriyordu.",
      "text13": "Sorun şuydu ki, Mel Coin'i kullanıcılardan kendi paramızla satın alıyorduk. Herkes jetonunu herhangi bir zamanda satabilirdi ve onun satışı için kişiye ödeme yapmak zorundaydık.",
      "text14": "Üzgünüz, ancak bu strateji şirkette nakit akışı açığına ve kriz durumuna yol açtı. Ödemeleri ve projenin gelişimini yapacak kadar paramız yoktu. Bu şekilde devam edersek, kullanıcılar paralarını alamazdı ve biz hiçbir şey elde edemezdik.",
      "text15": "Durum farklı olabilirdi eğer Mel Coin başlangıçtan itibaren borsada işlem görseydi.",
      "text15_1": "O zaman insanlar birbirlerinden jeton alıp satabilirler ve bu şekilde ödemeleri bizden çıkarmak zorunda kalmazdık. Biz de sırasıyla, ekosistemimizin oluşturulmasına, yeni kullanıcıların çekilmesine ve ürünün gelişmesine daha fazla dikkat edebilirdik.",
      "text16": "Ne yazık ki, Mel Coin'i iç para birimi olarak yapmanın, kullanıcıları başlangıçta çekmenin ve Mel Coin'i daha büyük bir şeye dönüştürme fırsatını açmanın iyi bir fikir olduğunu düşündük.",
      "text17": "İlk olarak, jetonu kendimiz etkileyebilirdik ve bu şekilde kullanıcıları onu satın almaya teşvik edebilirdik. İkincisi, çoğu kullanıcımız borsaları ve kripto paraları nasıl kullanacaklarını bilmiyor, bu nedenle satın alma ve satma işlemini basit hale getirmek istiyorduk.",
      "text18": "Üzgünüz, ancak tahminlerimizin yanlış olduğunu gördük. Kısmen liderlerin, jetonun değerini ortaklarına iletememeleri nedeniyle başarısız olduk. Kısmen, karmaşık bir mekanizmaya sahip bir jeton yaptık. Bu nedenle insanların faydasını anlamaları zor oldu.",
      "text19": "Açıkça söylemek gerekirse, Mel Coin'in piyasadaki en karlı ve en iyi ürünlerden biri olduğunu hala düşünüyoruz.",
      "text19_1": "Kuruşumuz, sadece birkaç ay içinde 0,4'ten 1,16 dolara yükseldi. Teknoloji satın almanıza ve% 100'e kadar nakit para iadesi almanıza olanak tanıdı. Ayrıca, aylık% 15 kazanç sağlayan birkaç tarifemiz vardı!",
      "text20": "Kullanıcıların yatırımlarını geri almasını sağlayacak ve projenin devam etmesini ve gelişmesini sağlayacak bir karar aldık.",
      "text21": "Karar",
      "text22": "Blockchain'e Geçiş",
      "text23": "Mel Coin'in Blockchain'e geçişi, şirketimizin devam etmesine ve ödemelerin yeniden başlamasına olanak tanır. Adil bir şekilde para kazanabileceksiniz ve doğru yönde ilerlediğinizden emin olabilirsiniz.",
      "text24": "Bu şunları getirir:",
      "text25": "Tokeninizi satmak isterseniz, onu başka bir kullanıcı satın alır. Bu, paranızı kesinlikle kazanacağınızdan emin olmanızı sağlar ve hiç kimse ödemeleri durduramaz.",
      "text26": "Mel Coin tam teşekküllü bir para birimi olacak. Bu daha büyük bir izleyici çekecek ve projemizi diğer insanların gözünde yükseltecek. Daha fazla kullanıcı ve daha fazla alıcı çekebiliriz.",
      "text27": "Tokenin değerini kimse değiştiremeyecek. Artık Mel Coin'in fiyatı borsalar tarafından adil bir şekilde değerlendirilecek ve otomatik olarak ayarlanacak. Değeri talepten etkilenecek ve herkes nasıl değiştiğini görebilecek.",
      "text28": "Blockchain, paranızı endişelenmenize gerek kalmadan tutmanıza izin verir. Hiç kimse ve hiç kimse paranızı alamaz. Tüm kullanıcılar birbirlerinin işlemlerini görebilir ve kimse ve hiç kimse sizi dolandıramaz.",
      "text29": "Yüksek Getirili Yatırımlardan Vazgeçme",
      "text30": "Önceden kullanıcılara yatırımlar için yüksek oranlar sunduk. Herkes aylık% 15'e kadar saf kazanç elde edebilirdi ve ardından döviz kuru üzerinden kazanabilirlerdi. Ancak bu tür bir yöntem şirketler için yıkıcıdır: sonunda herkese ödeme yapamazdık ve kesin olarak kapanırdık.",
      "text31": "Yeni Kişisel Hesap",
      "text32": "Eski hesap bazen yavaş çalışıyor veya sizi atıyordu. Yeni hesap daha hızlı, daha teknolojik ve daha kullanıcı dostu olacak. Programcılarımızın onu kullanmaktan keyif almanızı sağlamak için çalıştı.",
      "text33": "Gelecekteki Gelişim",
      "text34": "Mel Coin'i geliştirmeye devam etmek istiyoruz, böylece kullanıcılarımız ve yatırımcılarımız memnun kalır.",
      "text35": "Mel Coin'i tam teşekküllü bir kripto proje, bir ekosistem haline getirmek ve çok sayıda sahibi çekmek istiyoruz.",
      "text36": "Yakında yol haritamızı yayınlayacak ve planlarımızı göstereceğiz. Hiçbir şeyi kaçırmamak için blogdaki haberleri takip edin: https://t.me/untime_blog"
    }
  }

  if(locale._value == 'ru') {
    text = {
      "header" : "Возобновление работы Mel Coin. Вся хронология событий",
      "header_small_text": "Два месяца назад мы приостановили работу Mel Coin и приём инвестиций. Мы оттягивали это решение до последнего в надежде, что что-то поменяется. Однако, чем больше мы тянули, тем хуже было для пользователей и для нас. Рассказываем, что к этому привело, почему мы просто не закрыли проект, с чего всё началось и что будет дальше.",
      "text1":"Начало UNTIME",
      "text2":"Мы хотим начать издалеко. Это очень важно, чтобы вы поняли нас и захотели сотрудничать дальше.",
      "text3":"Мы основали компанию UNTIME осенью 2022 года.",
      "text3_1":"Изначально компания была создана с целью привлечь инвестиции на создание своих продуктов, которые позволили бы зарабатывать, продавая подписки на наши сервисы.",
      "text4":"На тот момент эта была наша идея. Мы хотели создавать по-настоящему полезные и классные продукты.",
      "text5":'Мы хотели создавать продукты, чтобы их монетизировать и делиться частью дохода с нашими инвесторами.',
      "text5_1":'Мы хотели создавать продукты, чтобы их монетизировать и делиться частью дохода с нашими инвесторами.',
      "text6":'Многие помнят, что тогда мы выпустили два продукта: бот по поиску и продаже недвижимости в телеграме, который оказался очень полезным и перспективным. И бот по поиску обменников.',
      "text7":'Нам удалось привлечь >10 000 пользователей на наши продукты, благодаря рекламе. Даже после закрытия ботов люди как-то находили наши сервисы и продолжали регистрироваться. Это говорит о том, что мы выбрали правильное направление.',
      "text8":'Затем что-то пошло не так. Когда мы поняли, что компания стремится к банкротству, то попробовали создать свой криптоагрегатор UNCHANGE и анонсировали создание других продуктов. Мы подумали, что это будет интересно нашим пользователям и мы сможем привлечь инвестиции на дальнейшее развитие продуктов и компании.',
      "text9":'Однако людям это было не интересно.',
      "text9_1":'Все хотели быстрого заработка с большими процентами. Тогда ситуация стала кризисной.',
      "text10":'Чтобы выйти из этой ситуации, нам пришлось опросить лидеров и спросить, что бы мы могли сделать, чтобы выправить сложившуюся ситуация. Тогда мы сделали Mel Coin и открыли людям новую возможность заработка.',
      "text11":'Почему Mel Coin был остановлен?',
      "text12":'Mel Coin был внутренней валютой компании UNTIME.',
      "text12_1":'Мы определяли курс самостоятельно, ориентируясь на придуманные нами формулы для расчёта курса. Это позволяло делать так, чтобы пользователи оставались довольны токеном и магазином техники.',
      "text13":'Проблема была в том, что и сам Mel Coin мы покупали у пользователей за свои деньги. Каждый мог продать токен в любой момент и мы были обязаны заплатить человеку за его продажу.',
      "text14":'К сожалению, такая стратегия привела к кассовому разрыву и кризисной ситуации в компании. Нам не хватало денег на выплаты и развитие проекта. Если бы мы продолжали так делать, пользователи не получили бы своих денег, а мы бы остались ни с чем.',
      "text15":'Ситуация могла бы быть другой, если бы Mel Coin изначально был на бирже.',
      "text15_1":'Тогда люди покупали и продавали его между собой, снимая с нас обязательства по выплатам. А мы бы, в свою очередь, могли уделить больше внимания созданию нашей экосистемы, привлечению новых пользователей и развитию токена, как продукта.',
      "text16":'Увы, но нам показалось, что сделать Mel Coin внутренней валютой — это хорошая идея, которая позволит привлечь больше пользователей в начале пути и открыть возможность превратить Mel Coin в нечто большее.',
      "text17":'Во-первых, мы могли влиять на токен сами и таким образом побуждать пользователей покупать его. Во-вторых, большинство наших пользователей не знает, как пользоваться биржами и криптовалютой, поэтому мы хотели упростить процесс покупки и продажи.',
      "text18":'К сожалению, наши прогнозы оказались неверными. Отчасти, наше фиаско связано с тем, что многие лидеры не могли донести партнёрам ценность нашего токена. Отчасти — что мы сделали токен со сложной механикой. Из-за этого людям было трудно понять его выгоду.',
      "text19":'По правде сказать, мы всё ещё считаем, что Mel Coin был одним из самых выгодных и лучших продуктов на рынке.',
      "text19_1":'Его курс вырос с 0,4 до 1,16$ всего за несколько месяцев. Он позволял покупать технику и получать до 100% кешбека. А ещё у нас было несколько тарифов, которые позволяли зарабатывать до 15% в месяц!',
      "text20":'Но мы приняли решение, которое позволит пользователям получить назад их вложения, а нам — существовать дальше и развивать проект.',
      "text21":'Решение',
      "text22":'Переход на блокчейн',
      "text23":'Переход Mel Coin на блокчейн позволит нашей компании существовать дальше и возобновить выплаты. Вы сможете зарабатывать честным способом и быть уверенным, что вы двигаетесь в верном направлении.',
      "text24":'Этот открывает несколько преимуществ:',
      "text25":'Если вы захотите продать токен, его купит другой пользователь. Это позволит вам быть уверенным в том, что вы точно заработаете и никто не сможет приостановить выплаты.',
      "text26":'Mel Coin станет полноценной валютой. Это заинтересует большую аудиторию и поднимет наш проект в глазах других людей. Мы сможем привлечь больше пользователей и больше покупателей для вас.',
      "text27":'Курс токена никто не сможет поменять. Отныне цена Mel Coin будет справедливо оцениваться биржами и автоматически. Его курс будет зависеть от востребованности и каждый сможет видеть, как он меняется.',
      "text28":'Блокчейн позволит вам не переживать за ваши финансы. Никто и никогда не заберёт ваши деньги. Все пользователи могут видеть транзакции друг друга и никто и никогда вас не обманет.',
      "text29":'Отказ от высокодоходных инвестиций',
      "text30":'Раньше мы предлагали пользователям большие тарифы по инвестициям. Любой мог зарабатывать до 15% в месяц чистыми, а затем ещё и на продаже токена, в зависимости от курса. Но такой способ губителен для компаний: в конечном итоге мы не смогли бы со всеми расплатиться и точно закрылись бы.',
      "text31":'Новый личный кабинет',
      "text32":'Старый кабинет мог местами работать медленно или просто вас выкидывать. Новый кабинет будет быстрее, технологичнее и приятнее. Наши программисты сделали так, чтобы вам было приятно им пользоваться.',
      "text33":'Дальнейшее развитие',
      "text34":'В наших планах — дальше развивать Mel Coin, чтобы наши пользователи и инвесторы остались довольны.',
      "text35":'Мы хотим создать из Mel Coin полноценный криптопроект, экосистему и привлечь очень много держателей.',
      "text36":'Скоро мы опубликуем дорожную карту и покажем наши планы. Следите за новостями в блоге, чтобы ничего не пропустить: https://t.me/untime_blog',
    }
  }
})


</script>

<template>
  <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
    <div class="py-4 text-center md:text-left border-round bg-cover flex flex-column justify-content-end" style="background: url('images/blocks/content/content-4.png')">
      <div class="grid">
        <div class="col lg:col-offset-2 px-5">
          <div class="text-5xl font-bold text-white">Create Your Own PrimeBlock with Built-in Dark Mode</div>
          <p class="line-height-3 text-white text-lg text-center md:text-left mt-3">Published May 16, 2022 by Jessica Doe</p>
        </div>
      </div>
    </div>
    <div class="grid">
      <div class="col-12 lg:col-2">
      </div>
      <div class="col-12 lg:col lg:px-5">
        <div class="line-height-3 text-xl text-900 mb-5">Metus aliquam eleifend mi in nulla posuere. In vitae turpis massa sed elementum tempus egestas sed. Dui ut ornare lectus sit. Massa ultricies mi quis hendrerit.</div>
        <div class="line-height-3 text-lg text-900 mb-4">
          Nisi est sit amet facilisis. Ac odio tempor orci dapibus ultrices in iaculis nunc sed. Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Nullam vehicula ipsum a arcu cursus vitae congue. Leo urna
          molestie at elementum eu facilisis. Fusce id velit ut tortor. Purus non enim praesent elementum facilisis leo vel fringilla est. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Neque convallis a cras
          semper. Vitae elementum curabitur vitae nunc sed. Ornare massa eget egestas purus viverra accumsan in. Leo integer malesuada nunc vel risus commodo viverra maecenas accumsan. Sit amet risus nullam eget. Egestas maecenas
          pharetra convallis posuere morbi leo urna molestie at.
        </div>
        <blockquote class="surface-50 line-height-3 text-xl text-800 mb-4 py-3 px-3 border-round mx-0">
          “In short, GPU.js is a JavaScript acceleration library that can be used for general-purpose computations on GPUs using JavaScript. It supports browsers, Node.js and TypeScript.”
        </blockquote>
        <div class="line-height-3 text-lg text-900 mb-4">
          Convallis tellus id interdum velit laoreet id donec ultrices. Lacus sed viverra tellus in hac habitasse platea dictumst. Ultricies tristique nulla aliquet enim. Nunc scelerisque viverra mauris in aliquam sem fringilla.
          Laculis urna id volutpat lacus laoreet.
        </div>
        <ul class="text-lg mb-5 mt-0 mr-0 ml-3 p-0 text-900 font-light">
          <li class="mb-3">Nunc sed velit dignissim sodales ut.</li>
          <li class="mb-3">Lorem mollis aliquam ut porttitor.</li>
          <li>Urna nec tincidunt praesent semper feugiat nibh sed.</li>
        </ul>
        <div class="text-center mb-5">
<!--          <img src="/images/blocks/content/content-3.svg" alt="Image" class="w-full border-round mb-2" />-->
          <span class="block text-600 line-height-3">Id porta nibh venenatis cras sed felis eget velit.</span>
        </div>
        <div class="text-3xl text-800 mb-4">Massa vitae tortor condimentum lacinia</div>
        <div class="line-height-3 text-lg text-900 mb-5">
          Lacus viverra vitae congue eu consequat ac felis donec et. A lacus vestibulum sed arcu non. Mauris vitae ultricies leo integer malesuada nunc vel. Dolor sit amet consectetur adipiscing elit ut aliquam purus. Ac tincidunt
          vitae semper quis lectus nulla at volutpat. Enim lobortis scelerisque fermentum dui faucibus in ornare. In mollis nunc sed id semper. Vitae ultricies leo integer malesuada nunc vel risus commodo.
        </div>
        <div class="flex flex-wrap justify-content-between align-items-center gap-3 bg-primary text-primary-700 p-3 border-round">
          <span class="font-medium text-2xl">Content Section Title</span>
          <div class="flex align-items-center cursor-pointer">
            <span class="font-bold mr-3">View Post Statistics</span>
            <i class="pi pi-arrow-right"></i>
          </div>
        </div>
      </div>

      <div class="col-12 lg:col-3 lg:border-left-1 surface-border">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/demo/styles/badges.scss';
@import '@/assets/demo/styles/items.scss';
</style>
