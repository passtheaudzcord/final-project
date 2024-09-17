from app import app
from models import db, Ocean, Animal, Plant, User, Favorite # models go here
from faker import Faker

faker = Faker()

if __name__ == '__main__':
    with app.app_context():

        Ocean.query.delete()
        Animal.query.delete()
        Plant.query.delete()
        User.query.delete()
        
        print("Seeding database...")

        ocean1 = Ocean(name='Atlantic', avg_depth='10,932 ft', deepest_point='28,232 ft', surface_area='41.1 million mi²', about='The Atlantic Ocean is approximately one-fifth of Earth\'s surface and separating the continents of Europe and Africa to the east from those of North and South America to the west. The ocean\'s name, derived from Greek mythology, means the “Sea of Atlas.” It is second in size to the Pacific Ocean.',
        ofun_fact='The Atlantic Ocean is the youngest of the five oceans, having formed during the Jurassic Period approximately 150 million years ago following the breakup of the supercontinent Pangaea.',
        img='https://csridentity.com/images/atlanticocean.jpg', map='https://science4fun.info/wp-content/uploads/2022/02/Atlantic-Ocean-Map.jpg' )
        ocean2 = Ocean(name='Pacific', avg_depth='13,000 ft', deepest_point='35,876 ft', surface_area='63.8 million mi²', about='The Pacific Ocean is the largest and deepest ocean on Earth. It spans 60 million square miles from California to China, and in certain regions extends tens of thousands of feet below the surface of the water. It\'s name stands for peaceful.',
        ofun_fact='A fun fact about the Pacific Ocean is that it is the largest ocean on Earth, covering more area than all the land on Earth combined (More then 30 percent of Earth\'s surface area), and also holds the deepest point on the planet, known as the Challenger Deep in the Mariana Trench',
        img='https://www.americanoceans.org/wp-content/uploads/2023/09/atlantic-vs-pacific-ocean-scaled.jpeg', map='https://science4fun.info/wp-content/uploads/2022/02/Pacific-Ocean-Map.jpg' )
        ocean3 = Ocean(name='Indian', avg_depth='12,274 ft', deepest_point='23,920 ft', surface_area='27.24 million mi²', about='The Indian Ocean is the third-largest of the world\'s five oceanic divisions, covering 20 percent of the water on Earth\'s surface. It is bounded by Asia to the north, Africa to the west and Australia to the east. To the south it is bounded by the Southern Ocean, or Antarctica. It is named after India',
        ofun_fact='A fun fact about the Indian Ocean is that it contains a massive underwater plateau called the Kerguelen Plateau, which is considered a "submerged continent" and is roughly three times the size of Japan; making it one of only two major submerged continents on Earth',
        img='https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/21/2020/10/how-to-sail-across-the-indian-ocean-Le-Morne-Brabant-peninsula-maritius-credit-Roberto-Moiola-Getty.jpg', map='https://www.arcgis.com/sharing/rest/content/items/147937cf124843fcb86126b028e8d97c/resources/images/widget_954/1684939456673.png' )
        ocean4 = Ocean(name='Artic', avg_depth='3,240 ft', deepest_point='17,880 ft', surface_area='5.427 million mi²', about='The Arctic Ocean is the smallest and shallowest of the world\'s five oceanic divisions. It is the coldest of the world\'s oceans. The International Hydrographic Organization recognizes it as an ocean, although some oceanographers call it the Arctic Mediterranean Sea. The word "arctic" comes from the Greek word arktikos, which means "near the bear".',
        ofun_fact='The Arctic Ocean is mostly frozen over for most of the year, but the ice cover is shrinking due to climate change.',
        img='https://cff2.earth.com/uploads/2021/02/05165228/shutterstock_780681282-scaled.jpg', map='https://nsidc.org/sites/default/files/styles/article_image/public/images/Map/ArcticOcean.png.webp?itok=RRcf2eUu' )
        ocean5 = Ocean(name='Southern/Antarctic', avg_depth='10,728 ft', deepest_point='24,390 ft', surface_area='7.849 million mi²', about='The Southern Ocean (also known as the Antarctic Ocean) is the most southerly of the planet\'s five oceans. It completely surrounds the continent of Antarctica and connects the southern waters of the Pacific, Indian, and Atlantic oceans. The Southern Ocean is the fourth-largest ocean in the world. The name "Antarctica" comes from the Greek word antarktikos, which means "opposite to the Arctic" or "opposite to the north"',
        ofun_fact='The Antarctic Ocean has the strongest average winds on Earth, especially in the latitudes known as the "Roaring Forties", "Furious Fifties", and "Shrieking Sixties". Also, the ocean floor has not been explored here.',
        img='https://e360.yale.edu/assets/site/_1500x1500_fit_center-center_80/Antarctic-Waters.jpg', map='https://www.blue-growth.org/Oceans_Rivers_Seas/Seas_Pictures_Oceans_Rivers/Antarctica-RegionSouthern-Ocean-Convergence.gif' )

        animal1 = Animal(name='Atlantic Blue Marlin', scientific_name = 'Makaira nigricans', lifespan='F: 27 years, M: 18 years', about='Atlantic blue marlins can grow to be 14 feet long and weigh 2000 pounds. Females grow far larger than males. They don\'t form a bill until they are older.', fun_fact = 'Blue marlin are among the fastest fish in the ocean and use their spear-shaped upper jaws to slash through schools of prey.', food = 'Atlantic blue marlin prey on squid and epipelagic fishes such as: Mackerel, Tuna, Dolphinfishes', ocean = ocean1, img= 'https://fishflags.com/cdn/shop/articles/blue.marlin.enio.morales_1100x.jpg?v=1589410327' )
        animal2 = Animal(name='Pacific White Sided Dolpin', scientific_name = 'Lagenorhynchus obliquidens', lifespan='More than 40 years', about='As medium-sized dolphins, these animals can reach up to 400 pounds and 8 feet in length, with males typically being larger than females. Pacific white-sided dolphins are gregarious and often found in large groups of tens, hundreds and sometimes even thousands. They are fast, acrobatic and playful, and are one of the species commonly found bow-riding off boats. They have also been observed working together to catch fish. These dolphins are often seen with other cetaceans, including northern right whale dolphins and Risso\'s dolphins.', fun_fact = 'These dolphins are known for their acrobatics, which include leaping, flipping, and somersaulting out of the water.', food = 'Pacific white-sided dolphins feed on a variety of prey, such as squid and small schooling fish (capelin, sardines, and herring)', ocean = ocean2, img= 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Pacific_white-sided_dolphins_%28Lagenorhynchus_obliquidens%29_NOAA.jpg' )
        animal3 = Animal(name='Leafy Sea Dragon', scientific_name = 'Phycodurus eques', lifespan= '7-10 years', about='It is found along the southern and western coasts of Australia. The name is derived from their appearance, with long leaf-like protrusions coming from all over the body. These protrusions are not used for propulsion; they serve only as camouflage. The leafy seadragon propels itself utilizing a pectoral fin on the ridge of its neck and a dorsal fin on its back closer to the tail end. These small fins are almost completely transparent and difficult to see as they undulate minutely to move the creature sedately through the water, completing the illusion of floating seaweed. Popularly known as "leafies", they are the marine emblem of the state of South Australia and a focus for local marine conservation.', fun_fact = 'As with its seahorse kin, a male leafy sea dragon carries its mate\'s eggs until the eggs hatch. Their leafy appendages, ability to change color to match their seaweed and seagrass habitats, and ability to sway like plants in the water current help protect them from predators.', food = 'The leafy sea dragon eats small shrimplike animals called mysids', ocean = ocean3, img= 'https://indianapublicmedia.org/images/amos-images/leafy_seadragon.jpg' )
        animal4 = Animal(name='Atlantic Salmon', scientific_name = 'Salmo salar', lifespan='5-8 years', about='Atlantic salmon, also known as the “King of Fish,” are anadromous, which means they live in both fresh and saltwater. They are considered an indicator species or a “canary in the coal mine.” This means that the health of the species is directly affected by its ecosystem health. When a river ecosystem is clean and well-connected, its salmon population is typically healthy and robust. When a river ecosystem is not clean or well-connected, its salmon population will usually decline.', fun_fact = 'Before spawning, Atlantic salmon change to a coppery red color with bright green heads.', food = 'Young and adult salmon eat a wide variety of prey, including: Fish: Capelin, Atlantic herring, sandlance, barracudina, lanternfish, alewife, rainbow smelt, mummichogs, flatfish, and small Atlantic mackerel. Crustaceans: Amphipods, euphausiids, and decapods. Cephalopods: Squid and octopus. Polychaete worms: Plankton like euphausiids.', ocean = ocean4 , img= 'https://e360.yale.edu/assets/site/_1500x1500_fit_center-center_80/Atlantic-Salmon_Getty-Small.jpg' )
        animal5 = Animal(name='Weddell Seal', scientific_name = 'Leptonychotes weddellii', lifespan='30 years', about='Adults in their prime weigh 400 to 450 kg (880 to 990 lbs.), with females being somewhat heavier than males, sometimes reaching over 500 kg (1,100 lbs.) Adult female weight fluctuates dramatically during the year with significant weight loss occurring after birth and during lactation.', fun_fact = 'Weddell seals are capable of diving up to 720 meters deep and staying underwater for up to 45 minutes. They dive deeper and longer during the day than at night. Also, Weddell seals are very vocal, and their calls can be heard from above the ice even when they are below.', food = 'Antarctic cod, Antarctic silverfish, myctophids, and nototheniids, Squid, octopus, Prawns, decapods, and Antarctic krill', ocean = ocean5, img= 'https://www.antarctica.gov.au/site/assets/files/45640/weddell-cuteness.1200x0.jpg' )
        animal6 = Animal(name='Atlantic spotted dolphin', scientific_name = 'Stenella frontalis', lifespan='10-20 years', about='Atlantic spotted dolphins are found in warm temperate and tropical waters of the Atlantic Ocean. They usually form groups of five to 50 individuals but sometimes travel in groups of up to 200. They are fast swimmers and often “surf” in the waves created by vessels. Young Atlantic spotted dolphins do not have spots. As a result, they can look like slender bottlenose dolphins. Their distinctive spotted pattern starts to appear all over their bodies as they get older.', fun_fact = 'Each Atlantic spotted dolphin has a unique spot pattern, which makes it possible to identify individual dolphins.', food = 'small fish, invertebrates, and cephalopods, such as squid and octopi', ocean = ocean1, img= 'https://www.thoughtco.com/thmb/uY4CWebloJkcJ5VkSPCvVCYsCKM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/atlantic-spotted-dolphin-and-calf-56b6c0983df78c0b135b9edd.jpg' )
        animal7 = Animal(name='Giant Pacific Octopus', scientific_name = 'Enteroctopus dofleini', lifespan='3-5 years', about='The Giant Pacific Octopus is one of the most elusive of all marine animals, reaching lengths of up to 16 feet and weighing in excess of 100 pounds. They are the largest known species of octopus, and they play an important part in the world\'s ecosystem.', fun_fact = 'Giant Pacific octopuses can change color in one-tenth of a second to match their surroundings. They have millions of pigment sacks in their skin cells that they can mix and match to create different colors.', food = 'Dungeness crabs are a favorite, but they also eat shrimp, scallops, and other crustaceans, Clams, squid, and other mollusks, birds, and sharks', ocean = ocean2, img= 'https://oceana.org/wp-content/uploads/sites/18/shutterstock_493454785.jpg' )
        animal8 = Animal(name='', lifespan='', scientific_name = '', about='', fun_fact = '', food = '', ocean = '', img= '' )
        animal9 = Animal(name='', lifespan='', scientific_name = '', about='', fun_fact = '', food = '', ocean = '', img= '' )
        animal10 = Animal(name='', lifespan='', scientific_name = '', about='', fun_fact = '', food = '', ocean = '', img= '' )
        animal11 = Animal(name='', lifespan='', scientific_name = '', about='', fun_fact = '', food = '', ocean = '', img= '' )
        animal12 = Animal(name='', lifespan='', scientific_name = '', about='', fun_fact = '', food = '', ocean = '', img= '' )
        animal13 = Animal(name='', lifespan='', scientific_name = '', about='', fun_fact = '', food = '', ocean = '', img= '' )
        animal14 = Animal(name='', lifespan='', scientific_name = '', about='', fun_fact = '', food = '', ocean = '', img= '' )
        animal14 = Animal(name='', lifespan='', scientific_name = '', about='', fun_fact = '', food = '', ocean = '', img= '' )
        animal15 = Animal(name='', lifespan='', scientific_name = '', about='', fun_fact = '', food = '', ocean = '', img= '' )
        animal16 = Animal(name='', lifespan='', scientific_name = '', about='', fun_fact = '', food = '', ocean = '', img= '' )
        animal17 = Animal(name='', lifespan='', scientific_name = '', about='', fun_fact = '', food = '', ocean = '', img= '' )
        animal18 = Animal(name='', lifespan='', scientific_name = '', about='', fun_fact = '', food = '', ocean = '', img= '' )
        animal19 = Animal(name='', lifespan='', scientific_name = '', about='', fun_fact = '', food = '', ocean = '', img= '' )
        animal20 = Animal(name='', lifespan='', scientific_name = '', about='', fun_fact = '', food = '', ocean = '', img= '' )

