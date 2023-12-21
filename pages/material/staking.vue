<script setup>
import { PhotoService } from '@/service/PhotoService';
import { ProductService } from '@/service/ProductService';
import { onMounted, ref, watch } from 'vue';

const { locale } = useI18n()


// const text = ref({
//     "date":'24.10.2023',
//     "header" : "Возобновление работы Mel Coin. Вся хронология событий",
//     "header_small_text": "Два месяца назад мы приостановили работу Mel Coin и приём инвестиций. Мы оттягивали это решение до последнего в надежде, что что-то поменяется. Однако, чем больше мы тянули, тем хуже было для пользователей и для нас. Рассказываем, что к этому привело, почему мы просто не закрыли проект, с чего всё началось и что будет дальше.",
//     "text1":"Начало UNTIME",
//     "text2":"Мы хотим начать издалеко. Это очень важно, чтобы вы поняли нас и захотели сотрудничать дальше.",
//     "text3":"Мы основали компанию UNTIME осенью 2022 года.",
//     "text3_1":"Изначально компания была создана с целью привлечь инвестиции на создание своих продуктов, которые позволили бы зарабатывать, продавая подписки на наши сервисы.",
//     "text4":"На тот момент эта была наша идея. Мы хотели создавать по-настоящему полезные и классные продукты.",
//     "text5":'Мы хотели создавать продукты, чтобы их монетизировать и делиться частью дохода с нашими инвесторами.',
//     "text5_1":'Мы хотели создавать продукты, чтобы их монетизировать и делиться частью дохода с нашими инвесторами.',
//     "text6":'Многие помнят, что тогда мы выпустили два продукта: бот по поиску и продаже недвижимости в телеграме, который оказался очень полезным и перспективным. И бот по поиску обменников.',
//     "text7":'Нам удалось привлечь >10 000 пользователей на наши продукты, благодаря рекламе. Даже после закрытия ботов люди как-то находили наши сервисы и продолжали регистрироваться. Это говорит о том, что мы выбрали правильное направление.',
//     "text8":'Затем что-то пошло не так. Когда мы поняли, что компания стремится к банкротству, то попробовали создать свой криптоагрегатор UNCHANGE и анонсировали создание других продуктов. Мы подумали, что это будет интересно нашим пользователям и мы сможем привлечь инвестиции на дальнейшее развитие продуктов и компании.',
//     "text9":'Однако людям это было не интересно.',
//     "text9_1":'Все хотели быстрого заработка с большими процентами. Тогда ситуация стала кризисной.',
//     "text10":'Чтобы выйти из этой ситуации, нам пришлось опросить лидеров и спросить, что бы мы могли сделать, чтобы выправить сложившуюся ситуация. Тогда мы сделали Mel Coin и открыли людям новую возможность заработка.',
//     "text11":'Почему Mel Coin был остановлен?',
//     "text12":'Mel Coin был внутренней валютой компании UNTIME.',
//     "text12_1":'Мы определяли курс самостоятельно, ориентируясь на придуманные нами формулы для расчёта курса. Это позволяло делать так, чтобы пользователи оставались довольны токеном и магазином техники.',
//     "text13":'Проблема была в том, что и сам Mel Coin мы покупали у пользователей за свои деньги. Каждый мог продать токен в любой момент и мы были обязаны заплатить человеку за его продажу.',
//     "text14":'К сожалению, такая стратегия привела к кассовому разрыву и кризисной ситуации в компании. Нам не хватало денег на выплаты и развитие проекта. Если бы мы продолжали так делать, пользователи не получили бы своих денег, а мы бы остались ни с чем.',
//     "text15":'Ситуация могла бы быть другой, если бы Mel Coin изначально был на бирже.',
//     "text15_1":'Тогда люди покупали и продавали его между собой, снимая с нас обязательства по выплатам. А мы бы, в свою очередь, могли уделить больше внимания созданию нашей экосистемы, привлечению новых пользователей и развитию токена, как продукта.',
//     "text16":'Увы, но нам показалось, что сделать Mel Coin внутренней валютой — это хорошая идея, которая позволит привлечь больше пользователей в начале пути и открыть возможность превратить Mel Coin в нечто большее.',
//     "text17":'Во-первых, мы могли влиять на токен сами и таким образом побуждать пользователей покупать его. Во-вторых, большинство наших пользователей не знает, как пользоваться биржами и криптовалютой, поэтому мы хотели упростить процесс покупки и продажи.',
//     "text18":'К сожалению, наши прогнозы оказались неверными. Отчасти, наше фиаско связано с тем, что многие лидеры не могли донести партнёрам ценность нашего токена. Отчасти — что мы сделали токен со сложной механикой. Из-за этого людям было трудно понять его выгоду.',
//     "text19":'По правде сказать, мы всё ещё считаем, что Mel Coin был одним из самых выгодных и лучших продуктов на рынке.',
//     "text19_1":'Его курс вырос с 0,4 до 1,16$ всего за несколько месяцев. Он позволял покупать технику и получать до 100% кешбека. А ещё у нас было несколько тарифов, которые позволяли зарабатывать до 15% в месяц!',
//     "text20":'Но мы приняли решение, которое позволит пользователям получить назад их вложения, а нам — существовать дальше и развивать проект.',
//     "text21":'Решение',
//     "text22":'Переход на блокчейн',
//     "text23":'Переход Mel Coin на блокчейн позволит нашей компании существовать дальше и возобновить выплаты. Вы сможете зарабатывать честным способом и быть уверенным, что вы двигаетесь в верном направлении.',
//     "text24":'Этот открывает несколько преимуществ:',
//     "text25":'Если вы захотите продать токен, его купит другой пользователь. Это позволит вам быть уверенным в том, что вы точно заработаете и никто не сможет приостановить выплаты.',
//     "text26":'Mel Coin станет полноценной валютой. Это заинтересует большую аудиторию и поднимет наш проект в глазах других людей. Мы сможем привлечь больше пользователей и больше покупателей для вас.',
//     "text27":'Курс токена никто не сможет поменять. Отныне цена Mel Coin будет справедливо оцениваться биржами и автоматически. Его курс будет зависеть от востребованности и каждый сможет видеть, как он меняется.',
//     "text28":'Блокчейн позволит вам не переживать за ваши финансы. Никто и никогда не заберёт ваши деньги. Все пользователи могут видеть транзакции друг друга и никто и никогда вас не обманет.',
//     "text29":'Отказ от высокодоходных инвестиций',
//     "text30":'Раньше мы предлагали пользователям большие тарифы по инвестициям. Любой мог зарабатывать до 15% в месяц чистыми, а затем ещё и на продаже токена, в зависимости от курса. Но такой способ губителен для компаний: в конечном итоге мы не смогли бы со всеми расплатиться и точно закрылись бы.',
//     "text31":'Новый личный кабинет',
//     "text32":'Старый кабинет мог местами работать медленно или просто вас выкидывать. Новый кабинет будет быстрее, технологичнее и приятнее. Наши программисты сделали так, чтобы вам было приятно им пользоваться.',
//     "text33":'Дальнейшее развитие',
//     "text34":'В наших планах — дальше развивать Mel Coin, чтобы наши пользователи и инвесторы остались довольны.',
//     "text35":'Мы хотим создать из Mel Coin полноценный криптопроект, экосистему и привлечь очень много держателей.',
//     "text36":'Скоро мы опубликуем дорожную карту и покажем наши планы. Следите за новостями в блоге, чтобы ничего не пропустить: https://t.me/untime_blog',
// });

const text = computed(()=>{
  return textArr[locale.value];
})
const datePubllished = '13.11.2023'
const textArr = {
  'uk':{
    "header": "Збільшуйте прибутковість власних інвестицій завдяки стейкінгу Mel coin",
    "header_small_text": "Дякуючи стейкінгу Mel coin кожному доступний додатковий пасивний дохід. Ви зможете отримувати до 204% прибутку на вкладені кошти.",
    "text1": "Основні положення:",
    "text2": "— прибутковіть - 5% на місяць;",
    "text3": "— за незняття коштів - додатковий 1% щомісяця;",
    "text4": "— максимальний термін - 365 днів;",
    "text5": "— можливість щоденного виведення зароблених коштів.",
    "text6": "Стейкінг- що це?",
    "text7": "Це механізм “заморозки” будь-якої кількості монет Mel для отримання пасивного доходу, аналогічно до банківсього депозиту. Ви обираєте кількість монет для стейкінгу і щодня отримуєте нарахування ваших інвестицій на вказану суму.",
    "text8": "Стейкінг є поширеним серед криптовалют та інших криптопроектів. Коли користувач 'стейкує' криптовалюту - він вкладається у  фонд для подальшого розвиватку компанії. Відповідно, компанія дякує користувачам у формі відсотковий нарахувань (які є пасивним доходом для самого користувача).",
    "text9": "Стейкінг - як зробити?",
    "text10": "На “Робочому столі” клацніть на кнопку “Стейкінг”",
    "text11": "Зазначте бажану кількість Mel coins",
    "text12": "Отримуйте від 5% за місяць до 204% за рік. Ви можете вивести зароблені монети в будь-який день",
    "text13": "УВАГА!: на всі транзакції діє комісія 10%",
    "text14": "Стейкінг - для чого чи кого?",
    "text15": "Через “заморожування” чи стейкінг токен стає більш стабільним та корисним. Завдяки йому аудиторія токену буде зростати, а цінність збільшуватися.",
    "text16": "Давайте розглянемо 3 основних пункти.",
    "text17": "1. Стейкінг дає користувачу можливість отримувати пасивний дохід за аналогічною схемою як і банківські депозити. Велика когорта наших користовачів висловлювали зацікавленість в стейкінгу для нашої монети, і ми підготували цю можливість. Тепер нею можуть користуватися всі бажаючі.",
    "text18": "2. Стейкінг буде привабливим для нової аудиторії. Нові власники сприяють зростанню токена, число зацікавлених в нашій монеті буде зростати, і ваш капітал зростатиме за рахунок зростання курсу.",
    "text19": "3. Завдяки стейкінгу вдасться утримувати курс токена. Це спонукає користувачів утримувати токен на своїх гаманцях, а не продавати його. Це дає нам час на розвиток проекту, і, як результат, ваші кошти залишаться при вас.",
    "text20": "Стейкінг - які ризики?",
    "text21": "Жодних.",
    "text22": "Наш токен - це криптовалюта в мережі BEP20. Mel Coin повністю побудований на блокчейні, що гарантує 100% безпеку і впевненість у тому, що нічого не станеться з вашими коштами.",
    "text23": "Іншими словами, ми не можемо зробити нічого з вашими токенами. Усі відсотки та виплати внесені в блокчейн при створенні, тому навіть розробники не можуть змінити умови стейкінгу після його запуску.",
    "text24": "Як перевести Mel Coin зі старого балансу в стейкінг",
    "text25": "Якщо ви обрали 'Перевести старий баланс в Mel Coin', ви можете перевести ці токени в стейкінг.",
    "text26": "Для цього:",
    "text27": "Купіть 10% від суми переведених Mel Coin.",
    "text28": "Зверніться в підтримку та попросіть перевести старий баланс в стейкінг після купівлі 10%.",
    "text29": "Наприклад:",
    "text30": "Ваш старий баланс складав 1000 доларів. Ви вибрали перевести все в новий Mel Coin. За поточним курсом ви перевели ці 1000 доларів у 1000 Mel Coin.",
    "text31": "Щоб їх перевести в стейкінг, вам потрібно купити 10% від 1000 Mel Coin, тобто 100 Mel Coin.",
    "text32": "Після покупки 10% зверніться в підтримку, щоб перевести ваші кошти в стейкінг."
  },
  'en':{
    "header": "Increase the profitability of your investments with Mel Coin staking",
    "header_small_text": "Thanks to Mel Coin staking, everyone can enjoy additional passive income. You can earn up to 204% profit on your investments.",
    "text1": "Key terms:",
    "text2": "- Profitability - 5% per month;",
    "text3": "- Additional 1% per month for not withdrawing funds;",
    "text4": "- Maximum duration - 365 days;",
    "text5": "- Possibility of daily withdrawal of earned funds.",
    "text6": "What is Staking?",
    "text7": "It is a mechanism of 'freezing' any amount of Mel coins to generate passive income, similar to a bank deposit. You choose the amount of coins for staking and receive daily earnings on your invested sum.",
    "text8": "Staking is common among cryptocurrencies and other crypto projects. When a user 'stakes' a cryptocurrency, they contribute to the development of the company. In return, the company rewards users with passive income in the form of interest.",
    "text9": "How to Stake?",
    "text10": "Click on the 'Staking' button on the Dashboard",
    "text11": "Specify the desired amount of Mel coins",
    "text12": "Earn from 5% per month to 204% per year. You can withdraw earned coins at any time.",
    "text13": "ATTENTION: A 10% fee applies to all transactions",
    "text14": "Staking - Who is it for?",
    "text15": "Through 'freezing' or staking, the token becomes more stable and valuable. It attracts a growing audience, increasing the token's value.",
    "text16": "Let's consider 3 key points.",
    "text17": "1. Staking allows users to earn passive income, similar to a bank deposit. Many of our users have been waiting for this feature, and it prompted us to add staking. Now, everyone can multiply their finances.",
    "text18": "2. Staking will be attractive to a new audience. New holders contribute to the token's growth, and the number of those interested in our coin will increase, replenishing your capital through the rising value of the coin.",
    "text19": "3. Thanks to staking, we can maintain the token's value. It encourages users to hold the token in their wallets rather than sell it. This gives us time to develop the project, ensuring your funds stay with you.",
    "text20": "What Risks are there in Staking?",
    "text21": "None.",
    "text22": "Our token is a cryptocurrency on the BEP20 network. Mel Coin is entirely built on the blockchain, providing 100% security and confidence that nothing will happen to your funds.",
    "text23": "In other words, we cannot do anything with your tokens. All percentages and payouts are recorded in the blockchain at the creation, making it impossible even for developers to change staking conditions after launch.",
    "text24": "How to Transfer Mel Coin from the Old Balance to Staking",
    "text25": "If you choose 'Transfer Old Balance to Mel Coin,' you can transfer these tokens to staking.",
    "text26": "To do this:",
    "text27": "Buy 10% of the amount of the transferred Mel Coin.",
    "text28": "Contact support and ask to transfer the old transferred balance to staking after buying 10%.",
    "text29": "For example:",
    "text30": "You had $1000 in the old balance. You chose to transfer everything to the new Mel Coin. At the current rate, you transferred these $1000 to 1000 Mel Coin.",
    "text31": "To transfer them to staking, you need to buy 10% of 1000 Mel Coin, which is 100 Mel Coin.",
    "text32": "After buying 10%, contact support to transfer your funds to staking."

  },
  'tr':{
    "header": "Mel Coin staking ile yatırımlarınızın karlılığını artırın",
    "header_small_text": "Mel Coin staking sayesinde herkes ek pasif gelirin tadını çıkarabilir. Yatırılan paralarınızda %204'e kadar kar elde edebilirsiniz.",
    "text1": "Temel şartlar:",
    "text2": "- Karlılık - Aylık %5;",
    "text3": "- Fonları çekmeme üzerine aylık ek %1;",
    "text4": "- Maksimum süre - 365 gün;",
    "text5": "- Kazanılan paraların günlük çekilebilme olasılığı.",
    "text6": "Staking Nedir?",
    "text7": "Bu, Mel coin'lerin herhangi bir miktarını pasif gelir elde etmek için 'dondurma' mekanizmasıdır, banka mevduatına benzer şekilde. Staking için hangi miktar coin seçerseniz, belirtilen tutar üzerinden günlük kazanç elde edersiniz.",
    "text8": "Staking, kripto paralar ve diğer kripto projeler arasında yaygındır. Bir kullanıcı bir kripto parayı 'stake' (yatırım) ettiğinde, şirketin gelişimine katkıda bulunurlar. Karşılığında şirket, kullanıcılara faiz şeklinde pasif gelirle ödüllendirir.",
    "text9": "Staking Nasıl Yapılır?",
    "text10": "Gösterge Tablosu'nda 'Staking' düğmesine tıklayın",
    "text11": "İstenen Mel coin miktarını belirtin",
    "text12": "Aylık %5'ten yılda %204'e kadar kazanın. Kazanılan coin'leri istediğiniz zaman çekebilirsiniz.",
    "text13": "DİKKAT: Tüm işlemler için %10 komisyon uygulanır",
    "text14": "Staking - Kimler İçin?",
    "text15": "'Dondurma' veya staking sayesinde token daha istikrarlı ve değerli hale gelir. Bu, büyüyen bir izleyici kitlesi çeker ve token'ın değerini artırır.",
    "text16": "3 temel noktayı ele alalım.",
    "text17": "1. Staking, kullanıcılara banka mevduatına benzer şekilde pasif gelir elde etme imkanı tanır. Birçok kullanıcımız bu özelliği bekliyordu ve bizi staking eklemeye itti. Şimdi herkes finansını çoğaltabilir.",
    "text18": "2. Staking, yeni bir kitle için çekici olacaktır. Yeni sahipler, token'ın değerini artırarak sermayenizi artırır.",
    "text19": "3. Staking sayesinde token'ın değerini korumayı başarabiliriz. Bu, kullanıcıları token'ı sattırmaktansa cüzdanlarında tutmaya teşvik eder. Bu, projeyi geliştirmemiz için bize zaman tanır ve sonuç olarak paranız sizinle kalır.",
    "text20": "Staking'de Hangi Riskler Var?",
    "text21": "Hiçbiri.",
    "text22": "Token'ımız BEP20 ağındaki bir kripto paradır. Mel Coin tamamen blok zinciri üzerine inşa edilmiştir, bu da paranızın başına hiçbir şey gelmeyeceğine dair %100 güvenlik ve güvence sağlar.",
    "text23": "Başka bir deyişle, token'larınızla hiçbir şey yapamayız. Tüm yüzdelikler ve ödemeler, blok zincirine kaydedildiğinden, geliştiriciler bile staking koşullarını başlatıldıktan sonra değiştiremez.",
    "text24": "Mel Coin'ı Eski Bakiyeden Staking'e Nasıl Transfer Edeceksiniz",
    "text25": "'Eski Bakiyeyi Mel Coin'a Transfer Et' seçeneğini seçerseniz, bu token'ları staking'e transfer edebilirsiniz.",
    "text26": "Bunun için:",
    "text27": "Transfer edilen Mel Coin'ın miktarının %10'unu satın alın.",
    "text28": "Destekle iletişime geçin ve %10 satın alım sonrasında eski transfer edilen bakiyenizi staking'e transfer etmelerini isteyin.",
    "text29": "Örneğin:",
    "text30": "Eski bakiyenizde 1000 dolarınız vardı. Her şeyi yeni Mel Coin'a transfer etmeyi seçtiniz. Mevcut kur üzerinden bu 1000 doları 1000 Mel Coin'a transfer ettiniz.",
    "text31": "Onları staking'e transfer etmek için 1000 Mel Coin'ın %10'unu, yani 100 Mel Coin'ı satın almanız gerekir.",
    "text32": "10% satın aldıktan sonra destekle iletişime geçerek fonlarınızı staking'e aktarın."

  },
  'ru':{
    "header": "Увеличивайте прибыль от ваших инвестиций с помощью стейкинга Mel coin",
    "header_small_text": "Благодаря стейкингу Mel coin каждому доступен дополнительный пассивный доход. Вы сможете получать до 204% прибыли от вложенных средств.",
    "text1": "Основные положения:",
    "text2": "— доходность - 5% в месяц;",
    "text3": "— за невывод средств - дополнительный 1% каждый месяц;",
    "text4": "— максимальный срок - 365 дней;",
    "text5": "— возможность ежедневного вывода заработанных средств.",
    "text6": "Стейкинг - что это?",
    "text7": "Это механизм ”заморозки” любого количества монет Mel для получения пассивного дохода, аналогичного банковскому депозиту. Вы выбираете количество монет для стейкинга и каждый день получаете начисления по вашим инвестициям на указанную сумму.",
    "text8": "Стейкинг широко распространен среди криптовалют и других криптопроектов. Когда пользователь ”стейкает” криптовалюту, он вкладывается в фонд для дальнейшего развития компании. Соответственно, компания благодарит пользователей в виде процентных начислений (которые являются пассивным доходом для самого пользователя).",
    "text9": "Стейкинг - как это сделать?",
    "text10": "На ”Рабочем столе” нажмите кнопку ”Стейкинг”",
    "text11": "Укажите желаемое количество Mel coins",
    "text12": "Получайте от 5% в месяц до 204% в год. Вы можете выводить заработанные монеты в любой день",
    "text13": "ВНИМАНИЕ!: на все транзакции действует комиссия 10%",
    "text14": "Стейкинг - для чего и кого?",
    "text15": "Через ”заморозку” или стейкинг токен становится более стабильным и полезным. Благодаря этому аудитория токена будет расти, а его ценность увеличиваться.",
    "text16": "Давайте рассмотрим 3 основных пункта.",
    "text17": "1. Стейкинг дает пользователю возможность получать пассивный доход по аналогии с банковскими депозитами. Многие наши пользователи высказывали заинтересованность в стейкинге для нашей монеты, и мы подготовили эту возможность. Теперь ей могут пользоваться все желающие.",
    "text18": "2. Стейкинг будет привлекателен для новой аудитории. Новые владельцы способствуют росту токена, число заинтересованных в нашей монете будет расти, и ваш капитал будет увеличиваться за счет роста курса.",
    "text19": "3. Благодаря стейкингу удастся удерживать курс токена. Это побудит пользователей удерживать токен на своих кошельках, а не продавать его. Это дает нам время на развитие проекта, и, как следствие, ваши средства останутся при вас.",
    "text20": "Стейкинг - какие риски?",
    "text21": "Никаких.",
    "text22": "Наш токен - это криптовалюта в сети BEP20. Mel Coin полностью построен на блокчейне, что гарантирует 100% безопасность и уверенность в том, что с вашими деньгами ничего не случится.",
    "text23": "Иными словами, мы не сможем ничего сделать с вашими токенами. Все проценты и выплаты внесены в блокчейн при создании, поэтому даже разработчики не смогут изменить условия стейкинга после его запуска.",
    "text24": "Как перевести Mel Coin со старого баланса в стейкинг",
    "text25": "Если вы выбрали 'Перевести старый баланс в Mel Coin', вы можете перевести эти токены в стейкинг.",
    "text26": "Для этого:",
    "text27": "Купите 10% от суммы переведенных Mel Coin.",
    "text28": "Обратитесь в поддержку и попросите перевести старый баланс в стейкинг после покупки 10%.",
    "text29": "Например:",
    "text30": "У вас было 1000 долларов на старом балансе. Вы выбрали перевести все в новый Mel Coin. По текущему курсу вы перевели эти 1000 долларов в 1000 Mel Coin.",
    "text31": "Чтобы вы могли перевести их в стейкинг, вам нужно купить 10% от 1000 Mel Coin, то есть 100 Mel Coin.",
    "text32": "После покупки 10% обратитесь в поддержку, чтобы ваши средства были переведены в стейкинг."

  },
}


</script>

<template>
  <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
    <div class="grid">
      <div class="col-12 lg:col-2">
      </div>
      <div class="col-12 lg:col lg:px-5">
        <div class="p-fluid">

          <div class="py-4 text-center md:text-left border-round bg-cover flex flex-column justify-content-end" style="background: url('images/blocks/content/content-4.png')">
            <div class="grid">
              <div class="col  px-5">
                <div class="text-5xl font-bold text-white">{{text['header']}}</div>
                <p class="line-height-3 text-white text-lg text-center md:text-left mt-3">Published {{datePubllished}}</p>
              </div>
            </div>
          </div>
              <p class="text-base text-2xl">
                {{ text.header_small_text }}
              </p>
              <p class="text-4xl font-bold">
                {{ text.text1 }}
              </p>
              <ul>
                <li><p class="text-base">{{ text.text2 }}</p></li>
                <li><p class="text-base">{{ text.text3 }}</p></li>
                <li><p class="text-base">{{ text.text4 }}</p></li>
                <li><p class="text-base">{{ text.text5 }}</p></li>
              </ul>
          <p class="text-4xl font-bold">
                {{ text.text6 }}
              </p>
              <p class="text-base">
                {{ text.text7 }}
              </p>
              <p class="text-base">
                {{ text.text8 }}
              </p>
              <p class="text-4xl font-bold">
                {{ text.text9 }}
              </p>

              <ol>
                <li><p class="text-base ">{{ text.text10 }}</p></li>
                <li><p class="text-base ">{{ text.text11 }}</p></li>
                <li><p class="text-base ">{{ text.text12 }}</p></li>
              </ol>

              <p class="text-base" style="background-color: #e5cb43;color: black;max-width: fit-content;padding: 3px;">
                {{ text.text13 }}
              </p>
              <p class="text-4xl font-bold">
                {{ text.text14 }}
              </p>
              <p class="text-base">
                {{ text.text15 }}
              </p>
              <p class="text-base">
                {{ text.text16 }}
              </p>
              <p class="text-base">
                {{ text.text17 }}
              </p>
              <p class="text-base">
                {{ text.text18 }}
              </p>
              <p class="text-base">
                {{ text.text19}}
              </p>
              <p class="text-4xl font-bold">
                {{ text.text20 }}
              </p>

              <p class="text-base">
                {{ text.text21 }}
              </p>
              <p class="text-base">
                {{ text.text22 }}
              </p>
              <p class="text-base">
                {{ text.text23 }}
              </p>
              <p class="text-4xl font-bold">
                {{ text.text24 }}
              </p>

              <p class="text-base">
                {{ text.text25 }}
              </p>
              <p class="text-2xl font-bold">
                {{ text.text26 }}
              </p>
              <ol>
                <li><p class="text-base">{{ text.text27 }}</p></li>
                <li><p class="text-base">{{ text.text28 }}</p></li>

              </ol>
              <p class="text-base">
                {{ text.text29 }}
              </p>

              <p class="text-base">
                {{ text.text30 }}
              </p>
              <p class="text-base">
                {{ text.text31 }}
              </p>
              <p class="text-base">
                {{ text.text32 }}
              </p>

            </div>
      </div>

      <div class="col-12 lg:col-3  surface-border">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/demo/styles/badges.scss';
@import '@/assets/demo/styles/items.scss';
</style>
